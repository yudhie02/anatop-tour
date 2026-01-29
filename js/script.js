// // Hamburger menu toggle
// const hamburger = document.querySelector('.hamburger');
// const menu = document.querySelector('.menu');
// hamburger.addEventListener('click', () => menu.classList.toggle('show'));

// // Navbar scroll effect
// const navbar = document.querySelector('.navbar');
// window.addEventListener('scroll', () => {
//   if(window.scrollY > 50) navbar.classList.add('scrolled');
//   else navbar.classList.remove('scrolled');
// });

// // Scroll animation for cards
// const features = document.querySelectorAll('.feature');
// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if(entry.isIntersecting) entry.target.classList.add('show');
//   });
// },{ threshold:0.2 });
// features.forEach(f => observer.observe(f));

// // Leaflet map
// const map = L.map('map').setView([-6.2,106.816666],5);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ maxZoom:19 }).addTo(map);
// L.marker([-6.200000,106.816666]).addTo(map).bindPopup("Kantor Jakarta");
// L.marker([-7.257472,112.752088]).addTo(map).bindPopup("Kantor Surabaya");

// Init map
  const map = L.map('map').setView([-6.2, 106.816666], 5);

  // Layers
  const street = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { maxZoom: 19 }
  );

  const satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 19 }
  );

  street.addTo(map);

  // Custom toggle control
  const toggle = L.control({ position: 'topright' });
  toggle.onAdd = () => {
    const div = L.DomUtil.create('div', 'map-toggle');

    div.innerHTML = `
      <button id="streetBtn" class="active" title="Street Map">🗺️</button>
      <button id="satBtn" title="Satellite">🛰️</button>
    `;

    L.DomEvent.disableClickPropagation(div);
    return div;
  };
  toggle.addTo(map);

  // Toggle logic
  const streetBtn = document.getElementById('streetBtn');
  const satBtn = document.getElementById('satBtn');

  streetBtn.onclick = () => {
    map.addLayer(street);
    map.removeLayer(satellite);
    streetBtn.classList.add('active');
    satBtn.classList.remove('active');
  };

  satBtn.onclick = () => {
    map.addLayer(satellite);
    map.removeLayer(street);
    satBtn.classList.add('active');
    streetBtn.classList.remove('active');
  };

  // Marker function
  function addMarker(lat, lng, title) {
    return L.marker([lat, lng]).addTo(map).bindPopup(`
      <div class="map-popup">
        <b>${title}</b><br>
        <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank">
          📍 Buka di Google Maps
        </a>
      </div>
    `);
  }

  // Markers
  addMarker(-6.256162241867565, 106.99124821212646, 'Kantor Jakarta');
  addMarker(-7.257472, 112.752088, 'Kantor Surabaya');