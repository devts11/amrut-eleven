(function () {
  const data = window.AMRUT;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rupees = (n) => "₹" + n.toLocaleString("en-IN");
  const STAR = '<svg class="star%" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
  const stars = (n) => Array.from({ length: 5 }, (_, i) => STAR.replace("%", i < n ? "" : " star-off")).join("");

  // Banners: rotate every 6 seconds, pause for reduced motion
  let current = 0;
  let timer = null;
  function showBanner(i) {
    current = i;
    const b = data.banners[i];
    $("banner").innerHTML =
      `<div class="banner banner-${esc(b.tone)}">
         <span class="banner-tag">${esc(b.tag)}</span>
         <h2 class="h-section">${esc(b.title)}</h2>
         <p>${esc(b.text)}</p>
       </div>`;
    [...$("banner-dots").children].forEach((d, j) => d.setAttribute("aria-current", j === i ? "true" : "false"));
  }
  function startRotation() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clearInterval(timer);
    timer = setInterval(() => showBanner((current + 1) % data.banners.length), 6000);
  }
  $("banner-dots").innerHTML = data.banners
    .map((b, i) => `<button class="dot" type="button" data-i="${i}" aria-label="Show offer ${i + 1}: ${esc(b.title)}"></button>`)
    .join("");
  $("banner-dots").addEventListener("click", (e) => {
    const dot = e.target.closest(".dot");
    if (!dot) return;
    showBanner(Number(dot.dataset.i));
    startRotation();
  });
  showBanner(0);
  startRotation();

  // Menu
  $("menu-list").innerHTML = data.menu
    .map(
      (cat, i) =>
        `<details class="cat"${i === 0 ? " open" : ""}>
           <summary>
             <h3 class="h-card cat-name">${esc(cat.category)}</h3>
             <span class="small muted">${cat.items.length} dishes</span>
             <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
           </summary>
           <ul>${cat.items
             .map(
               (it) =>
                 `<li class="dish">
                    <span class="veg" role="img" aria-label="Vegetarian"></span>
                    <div class="dish-text"><p class="dish-name">${esc(it.name)}</p><p class="small muted">${esc(it.desc)}</p></div>
                    <span class="price">${it.price == null ? "On request" : rupees(it.price)}</span>
                  </li>`
             )
             .join("")}</ul>
         </details>`
    )
    .join("");
  $("menu-pdf").addEventListener("click", (e) => {
    e.preventDefault();
    alert("The menu PDF is not attached in this prototype.");
  });

  // Story
  $("stats").innerHTML = data.stats
    .map((s) => `<li><p class="stat-value">${esc(s.value)}</p><p class="stat-label small">${esc(s.label)}</p></li>`)
    .join("");

  // Chefs
  $("chef-list").innerHTML = data.chefs
    .map(
      (c) =>
        `<li class="card chef">
           <div class="avatar tone-${esc(c.tone)}" aria-hidden="true">${esc(c.initials)}</div>
           <h3 class="h-card">${esc(c.name)}</h3>
           <p class="role">${esc(c.role)}</p>
           <p class="muted">${esc(c.bio)}</p>
         </li>`
    )
    .join("");

  // Reviews
  $("rating").innerHTML =
    `<span class="stat-value">${esc(data.rating.average)}</span>
     <div><div class="stars stars-light" role="img" aria-label="${esc(data.rating.average)} out of 5">${stars(5)}</div>
     <p class="rating-text">Average from ${data.rating.count} party orders</p></div>`;
  $("review-list").innerHTML = data.reviews
    .map(
      (r) =>
        `<li class="card review">
           <div class="stars" role="img" aria-label="${r.stars} out of 5">${stars(r.stars)}</div>
           <p class="review-text">${esc(r.text)}</p>
           <div><p class="review-name">${esc(r.name)}</p><p class="small muted">${esc(r.event)}</p></div>
         </li>`
    )
    .join("");

  // Delivery areas
  $("area-list").innerHTML = data.areas.map((a) => `<li class="area">${esc(a.name)}</li>`).join("");
  $("area-input").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    const out = $("area-result");
    if (q.length < 3) { out.innerHTML = ""; return; }
    const hit = data.areas.find((a) => a.name.toLowerCase().startsWith(q) || a.pin === q);
    out.innerHTML = hit
      ? `<p class="result result-yes">We deliver to ${esc(hit.name)}<span>Party orders reach you in about ${hit.minutes} minutes.</span></p>`
      : `<p class="result result-no">We don’t list that area yet<span>Call ${esc(data.outlet.phone)} and we’ll tell you if we can reach you.</span></p>`;
  });

  // Contact
  const o = data.outlet;
  $("wa-link").href = `https://wa.me/${o.whatsapp}`;
  $("call-link").href = `tel:${o.phoneHref}`;
  $("call-link").textContent = `Call ${o.phone}`;
  const ICON = {
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  };
  const rows = [
    ["phone", "Phone and WhatsApp", o.phone, `tel:${o.phoneHref}`],
    ["mail", "Email", o.email, `mailto:${o.email}`],
    ["pin", "Kitchen", o.address, null],
    ["clock", "Hours", o.hours, null],
  ];
  $("details").innerHTML = rows
    .map(
      ([icon, label, value, href]) =>
        `<li class="detail">
           <span class="detail-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[icon]}</svg></span>
           <div><p class="small muted">${esc(label)}</p>${href ? `<a class="detail-value" href="${esc(href)}">${esc(value)}</a>` : `<p class="detail-value">${esc(value)}</p>`}</div>
         </li>`
    )
    .join("");
})();
