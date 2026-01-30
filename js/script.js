// ===============================
// HAMBURGER MENU (MOBILE FIX)
// ===============================
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

if (hamburger && menu) {
  hamburger.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
}

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('show');
  });
});

// ===============================
// INIT MAP CONFIG
// ===============================
const DEFAULT_CENTER = [-6.2, 106.816666];
const DEFAULT_ZOOM = 5;

const map = L.map('map').setView(DEFAULT_CENTER, DEFAULT_ZOOM);

// ===============================
// TILE LAYERS
// ===============================
const streetLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  { maxZoom: 19 }
);

const satelliteLayer = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { maxZoom: 19 }
);

// Default layer
streetLayer.addTo(map);

// ===============================
// MAP TOGGLE CONTROL (TOP RIGHT)
// ===============================
const mapToggle = L.control({ position: 'topright' });

mapToggle.onAdd = () => {
  const div = L.DomUtil.create('div', 'map-toggle');

  div.innerHTML = `
    <button id="streetBtn" class="active" title="Street Map">🗺️</button>
    <button id="satBtn" title="Satellite">🛰️</button>
  `;

  L.DomEvent.disableClickPropagation(div);
  return div;
};

mapToggle.addTo(map);

// Toggle logic
const streetBtn = document.getElementById('streetBtn');
const satBtn = document.getElementById('satBtn');

streetBtn.onclick = () => {
  map.addLayer(streetLayer);
  map.removeLayer(satelliteLayer);
  streetBtn.classList.add('active');
  satBtn.classList.remove('active');
};

satBtn.onclick = () => {
  map.addLayer(satelliteLayer);
  map.removeLayer(streetLayer);
  satBtn.classList.add('active');
  streetBtn.classList.remove('active');
};

// ===============================
// FLOATING FOCUS BUTTON (BOTTOM RIGHT)
// ===============================
const focusControl = L.control({ position: 'bottomright' });

focusControl.onAdd = () => {
  const div = L.DomUtil.create('div', 'map-focus-btn');
  div.title = 'Reset View';
  div.innerHTML = '🎯';

  L.DomEvent.disableClickPropagation(div);
  L.DomEvent.on(div, 'click', () => {
    map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, {
      animate: true,
      duration: 0.8
    });
  });

  return div;
};

focusControl.addTo(map);

// ===============================
// MARKER FUNCTION
// ===============================
function addMarker(lat, lng, title) {
  L.marker([lat, lng]).addTo(map).bindPopup(`
    <div class="map-popup">
      <b>${title}</b><br>
      <a 
        href="https://www.google.com/maps?q=${lat},${lng}" 
        target="_blank"
      >
        📍 Buka di Google Maps
      </a>
    </div>
  `);
}

// ===============================
// MARKERS
// ===============================
addMarker(-6.256018264998483, 106.99183829811967, 'Kantor Bekasi');
addMarker(-7.257472, 112.752088, 'Kantor Surabaya');

// ===============================
// CARD SCROLL ANIMATION (FIX)
// ===============================
const features = document.querySelectorAll('.feature');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

features.forEach(feature => observer.observe(feature));
