(function () {
  const data = window.AMRUT;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rupees = (n) => "₹" + n.toLocaleString("en-IN");

  const allItems = data.menu.flatMap((c) => c.items.map((it) => ({ ...it, category: c.category })));
  const findItem = (name) => allItems.find((it) => it.name === name);

  // State: the dishes on the ticket, in the order they were added
  let selected = data.sampleQuote.dishes.map(findItem).filter(Boolean);

  const guestsEl = $("guests");
  const dateEl = $("date");
  const categoryEl = $("category");
  const dishEl = $("dish");

  // Defaults
  guestsEl.value = data.sampleQuote.guests;
  const today = new Date();
  const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateEl.min = iso(today);
  dateEl.value = iso(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14));

  categoryEl.innerHTML =
    '<option value="">Choose a category</option>' +
    data.menu.map((c) => `<option>${esc(c.category)}</option>`).join("");

  function fillDishes() {
    const cat = data.menu.find((c) => c.category === categoryEl.value);
    dishEl.disabled = !cat;
    if (!cat) { dishEl.innerHTML = '<option value="">Choose a category first</option>'; return; }
    const left = cat.items.filter((it) => !selected.some((s) => s.name === it.name));
    dishEl.innerHTML = left.length
      ? '<option value="">Choose a dish</option>' +
        left.map((it) => `<option value="${esc(it.name)}">${esc(it.name)}${it.price == null ? " (priced on request)" : ", " + rupees(it.price)}</option>`).join("")
      : '<option value="">Every dish here is on your tray</option>';
    dishEl.disabled = !left.length;
  }

  const guests = () => Math.max(0, parseInt(guestsEl.value, 10) || 0);

  function render() {
    const g = guests();
    $("guest-note").textContent = g ? `for ${g.toLocaleString("en-IN")} guests` : "";
    $("add-title").textContent = selected.length ? "Add another dish" : "Add a dish";

    $("lines").innerHTML = selected.length
      ? selected
          .map(
            (it) =>
              `<li class="line">
                 <div class="line-text">
                   <p class="line-name">${esc(it.name)}</p>
                   <p class="small muted">${esc(it.category)}, ${it.price == null ? "priced on request" : rupees(it.price) + " a plate"}</p>
                 </div>
                 <span class="price">${it.price == null ? "On request" : rupees(it.price * g)}</span>
                 <button class="remove" type="button" data-name="${esc(it.name)}" aria-label="Remove ${esc(it.name)}">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
                 </button>
               </li>`
          )
          .join("")
      : '<li class="empty">Your tray is empty. Pick a category below to add the first dish.</li>';

    const priced = selected.filter((it) => it.price != null);
    const unpriced = selected.length - priced.length;
    const total = priced.reduce((sum, it) => sum + it.price, 0) * g;
    $("total-label").textContent = unpriced ? "Total so far" : "Grand total";
    $("total-value").textContent = rupees(total);
    $("total-note").textContent = !selected.length
      ? ""
      : unpriced
      ? `${unpriced === 1 ? "One dish is" : unpriced + " dishes are"} priced on request. We confirm the full price when we call you.`
      : `An estimate for ${g.toLocaleString("en-IN")} guests. We confirm the final price when we call you.`;

    if (selected.length) $("err-dishes").hidden = true;
    $("wa-quote").href = `https://wa.me/${data.outlet.whatsapp}?text=${encodeURIComponent(summary())}`;
    fillDishes();
  }

  function summary() {
    const lines = selected.map((it) => `- ${it.name}`).join("\n");
    return `Hi Amrut Eleven, I’d like a party quote.\nGuests: ${guests()}\nDate: ${dateEl.value}\nDishes:\n${lines || "- not chosen yet"}`;
  }

  categoryEl.addEventListener("change", fillDishes);
  dishEl.addEventListener("change", () => {
    const it = findItem(dishEl.value);
    if (!it) return;
    selected.push(it);
    render();
    dishEl.focus();
  });
  $("lines").addEventListener("click", (e) => {
    const btn = e.target.closest(".remove");
    if (!btn) return;
    selected = selected.filter((it) => it.name !== btn.dataset.name);
    render();
  });
  guestsEl.addEventListener("input", render);
  dateEl.addEventListener("change", render);

  // Submit
  function setError(input, errEl, bad, message) {
    if (input) input.setAttribute("aria-invalid", bad ? "true" : "false");
    if (message) errEl.textContent = message;
    errEl.hidden = !bad;
    return bad;
  }

  $("quote-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nameEl = $("name");
    const phoneEl = $("phone");
    const digits = phoneEl.value.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");

    const badGuests = guests() < 1;
    const badDate = !dateEl.value || dateEl.value < dateEl.min;
    guestsEl.setAttribute("aria-invalid", badGuests ? "true" : "false");
    dateEl.setAttribute("aria-invalid", badDate ? "true" : "false");
    const eventBad = setError(null, $("err-event"), badGuests || badDate,
      badGuests ? "Enter how many guests you expect." : "Choose a date from today onwards.");
    const nameBad = setError(nameEl, $("err-name"), nameEl.value.trim().length < 2);
    const phoneBad = setError(phoneEl, $("err-phone"), !/^[6-9]\d{9}$/.test(digits));
    const dishBad = setError(null, $("err-dishes"), selected.length === 0);

    if (eventBad || nameBad || phoneBad || dishBad) {
      const first = [badGuests && guestsEl, badDate && dateEl, nameBad && nameEl, phoneBad && phoneEl, dishBad && categoryEl].find(Boolean);
      first.focus();
      return;
    }

    // Prototype only: this is where the request would be posted to the API
    console.log("Quote request", { name: nameEl.value.trim(), phone: digits, guests: guests(), date: dateEl.value, dishes: selected.map((s) => s.name) });

    $("sent-text").textContent = `Thanks, ${nameEl.value.trim()}. We’ll call ${phoneEl.value.trim()} to confirm the price for ${guests()} guests.`;
    $("actions").hidden = true;
    $("sent").hidden = false;
    $("sent").focus();
  });

  $("edit-again").addEventListener("click", () => {
    $("sent").hidden = true;
    $("actions").hidden = false;
  });

  render();
})();
