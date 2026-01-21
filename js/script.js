// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
hamburger.addEventListener('click', () => menu.classList.toggle('show'));

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Scroll animation for cards
const features = document.querySelectorAll('.feature');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
},{ threshold:0.2 });
features.forEach(f => observer.observe(f));

// Leaflet map
const map = L.map('map').setView([-6.2,106.816666],5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ maxZoom:19 }).addTo(map);
L.marker([-6.200000,106.816666]).addTo(map).bindPopup("Kantor Jakarta");
L.marker([-7.257472,112.752088]).addTo(map).bindPopup("Kantor Surabaya");
