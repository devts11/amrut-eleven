// Mock data for the Amrut Eleven prototype. Replace with API responses later.
window.AMRUT = {
  outlet: {
    name: "Amrut Eleven",
    phone: "+91 98765 00011",
    phoneHref: "+919876500011",
    whatsapp: "919876500011",
    email: "orders@amruteleven.in",
    address: "Plot 11, Infocity Road, Patia, Bhubaneswar 751024",
    hours: "Open 24 hours, every day",
    city: "Bhubaneswar",
  },

  banners: [
    {
      tag: "Order by 5 November",
      title: "Diwali sweets box, 24 pieces",
      text: "Kaju katli, motichoor laddu and gulab jamun, packed for gifting.",
      tone: "kumkum",
    },
    {
      tag: "Every weekend",
      title: "Biryani trays for 20",
      text: "One sealed handi of veg dum biryani with raita and salan.",
      tone: "mehendi",
    },
    {
      tag: "Office orders",
      title: "Lunch for the whole floor",
      text: "Starter, two mains, rice, roti and dessert for 30 guests or more.",
      tone: "ink",
    },
  ],

  // price: number in rupees per plate, or null when the outlet quotes it on request
  menu: [
    {
      category: "Starters",
      items: [
        { name: "Paneer tikka", desc: "Charred in the tandoor, mint chutney", price: 260 },
        { name: "Hara bhara kabab", desc: "Spinach and green pea patties", price: 210 },
        { name: "Dahi ke sholay", desc: "Crisp bread rolls, hung curd filling", price: 230 },
        { name: "Corn cheese balls", desc: "Sweet corn, molten cheese centre", price: 220 },
      ],
    },
    {
      category: "Main course",
      items: [
        { name: "Dal makhani", desc: "Black lentils, slow cooked overnight", price: 190 },
        { name: "Paneer butter masala", desc: "Tomato gravy, fresh cream", price: 240 },
        { name: "Kadai vegetable", desc: "Seasonal vegetables, crushed coriander seed", price: 200 },
        { name: "Malai kofta", desc: "Paneer dumplings, cashew gravy", price: 250 },
      ],
    },
    {
      category: "Rice and biryani",
      items: [
        { name: "Veg dum biryani", desc: "Layered and sealed, served with raita", price: 220 },
        { name: "Veg pulao", desc: "Basmati with peas, carrot and beans", price: 170 },
        { name: "Jeera rice", desc: "Basmati, cumin, ghee", price: 140 },
      ],
    },
    {
      category: "Desserts",
      items: [
        { name: "Rasmalai", desc: "Two pieces in saffron milk", price: 120 },
        { name: "Gajar halwa", desc: "Carrot, khoya, cashew", price: 110 },
        { name: "Gulab jamun", desc: "Two pieces, served warm", price: 90 },
      ],
    },
    {
      category: "Mojito and shakes",
      items: [
        { name: "Mango shake", desc: "Alphonso pulp, chilled milk", price: 140 },
        { name: "Cold coffee", desc: "Blended with vanilla ice cream", price: 130 },
        { name: "Mint mojito", desc: "Lime, mint, soda", price: 120 },
        { name: "Live juice counter", desc: "Staffed counter, priced by event size", price: null },
      ],
    },
  ],

  stats: [
    { value: "24", label: "hours a day, every day" },
    { value: "0", label: "meat, fish or egg" },
    { value: "500", label: "guests in our largest order" },
  ],

  chefs: [
    { initials: "BS", tone: "marigold", name: "Bikash Sahoo", role: "Head chef", bio: "Runs the kitchen and every party order. Eighteen years at the tandoor." },
    { initials: "MP", tone: "kumkum", name: "Meera Pradhan", role: "Sweets and desserts", bio: "Makes every sweet in house, from rasmalai to kaju katli." },
    { initials: "AN", tone: "mehendi", name: "Arjun Nayak", role: "Rice and biryani", bio: "Seals and slow cooks each dum biryani to order." },
    { initials: "SB", tone: "ink", name: "Sunita Behera", role: "Night kitchen lead", bio: "Keeps the kitchen cooking from midnight to morning." },
  ],

  rating: { average: "4.7", count: 212 },
  reviews: [
    { stars: 5, text: "Ordered for 120 guests at my sister’s sangeet. The food reached hot and ten minutes early.", name: "Ritika S.", event: "Sangeet, 120 guests" },
    { stars: 5, text: "My in-laws are strict about pure veg. They asked for the kitchen’s number before they left.", name: "Debasish P.", event: "Housewarming, 60 guests" },
    { stars: 4, text: "The biryani ran out first, so order more of it than you think. Everything else was spot on.", name: "Farheen K.", event: "Office lunch, 45 guests" },
    { stars: 5, text: "I changed the guest count the night before and they just handled it. No drama.", name: "Sourav M.", event: "Birthday, 35 guests" },
  ],

  areas: [
    { name: "Patia", pin: "751024", minutes: 20 },
    { name: "Chandrasekharpur", pin: "751016", minutes: 25 },
    { name: "Infocity", pin: "751024", minutes: 15 },
    { name: "Saheed Nagar", pin: "751007", minutes: 35 },
    { name: "Jaydev Vihar", pin: "751013", minutes: 30 },
    { name: "Nayapalli", pin: "751012", minutes: 35 },
    { name: "Rasulgarh", pin: "751010", minutes: 40 },
    { name: "Kalinga Nagar", pin: "751003", minutes: 45 },
    { name: "Khandagiri", pin: "751030", minutes: 50 },
    { name: "Old Town", pin: "751002", minutes: 50 },
  ],

  // Starting state of the quote page, so the prototype opens with a filled ticket
  sampleQuote: {
    guests: 80,
    dishes: ["Paneer tikka", "Veg dum biryani", "Gulab jamun"],
  },
};
