const workers = [
  {
    id: 1,
    name: "Anita K.",
    role: "Home Cleaning",
    category: "cleaning",
    rating: 4.9,
    reviews: 124,
    price: "₹250/hr",
    location: "Andheri West, Mumbai",
    verified: true,
    bio: "Experienced home cleaner with 5+ years in deep cleaning, dusting, and kitchen care. Reliable and punctual.",
    services: [
      { name: "General Cleaning", price: "₹250/hr" },
      { name: "Deep Cleaning", price: "₹400/hr" },
      { name: "Kitchen Care", price: "₹200/hr" }
    ],
    availability: ["Mon · 9am–5pm", "Tue · 9am–5pm", "Wed · 9am–5pm", "Thu · 9am–5pm"]
  },
  {
    id: 2,
    name: "Rajesh M.",
    role: "Plumber & Repair",
    category: "repair",
    rating: 4.8,
    reviews: 87,
    price: "₹350/hr",
    location: "Bandra East, Mumbai",
    verified: true,
    bio: "Certified plumber specializing in leak repair, faucet installation, and bathroom fittings.",
    services: [
      { name: "Leak Repair", price: "₹350/hr" },
      { name: "Faucet Installation", price: "₹500/visit" },
      { name: "Pipe Fitting", price: "₹600/hr" }
    ],
    availability: ["Mon · 10am–6pm", "Wed · 10am–6pm", "Fri · 10am–6pm", "Sat · 10am–6pm"]
  },
  {
    id: 3,
    name: "Priya S.",
    role: "Cook & Tiffin",
    category: "cooking",
    rating: 4.7,
    reviews: 65,
    price: "₹300/hr",
    location: "Powai, Mumbai",
    verified: false,
    bio: "Home cook offering daily tiffin and custom meal planning for families and bachelors.",
    services: [
      { name: "Daily Tiffin", price: "₹300/day" },
      { name: "Custom Meals", price: "₹400/hr" },
      { name: "Party Cooking", price: "₹2,500/event" }
    ],
    availability: ["Tue · 8am–2pm", "Thu · 8am–2pm", "Sat · 8am–2pm"]
  },
  {
    id: 4,
    name: "Sunita D.",
    role: "Child & Elder Care",
    category: "childcare",
    rating: 4.9,
    reviews: 110,
    price: "₹280/hr",
    location: "Thane West, Mumbai",
    verified: true,
    bio: "Certified caregiver with experience in child care and elderly support. Patient and compassionate.",
    services: [
      { name: "Babysitting", price: "₹280/hr" },
      { name: "Elder Support", price: "₹300/hr" },
      { name: "Meal Prep for Seniors", price: "₹250/hr" }
    ],
    availability: ["Mon · 9am–5pm", "Tue · 9am–5pm", "Fri · 9am–5pm"]
  },
  {
    id: 5,
    name: "Kavita R.",
    role: "Beauty at Home",
    category: "beauty",
    rating: 4.6,
    reviews: 52,
    price: "₹450/hr",
    location: "Navi Mumbai",
    verified: true,
    bio: "Freelance beautician offering salon-quality services at your doorstep including bridal makeup.",
    services: [
      { name: "Bridal Makeup", price: "₹4,000/event" },
      { name: "Threading & Waxing", price: "₹200/hr" },
      { name: "Facial", price: "₹600/hr" }
    ],
    availability: ["Wed · 11am–7pm", "Fri · 11am–7pm", "Sun · 11am–7pm"]
  },
  {
    id: 6,
    name: "Amit P.",
    role: "Home Tutor",
    category: "tutoring",
    rating: 4.8,
    reviews: 91,
    price: "₹600/hr",
    location: "Borivali, Mumbai",
    verified: true,
    bio: "Maths and Science tutor for grades 6–12. Board exam preparation and daily homework help.",
    services: [
      { name: "Maths Tuition", price: "₹600/hr" },
      { name: "Science Tuition", price: "₹600/hr" },
      { name: "Board Exam Prep", price: "₹700/hr" }
    ],
    availability: ["Mon · 4pm–8pm", "Wed · 4pm–8pm", "Sat · 10am–2pm"]
  }
];

const categoryGrid = document.getElementById('categoryGrid');
const workerGrid = document.getElementById('workerGrid');
const resultCount = document.getElementById('resultCount');
const filterCategory = document.getElementById('filterCategory');
const filterRating = document.getElementById('filterRating');
const searchBtn = document.getElementById('searchBtn');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('header');

// Render category cards (already in HTML, but wire clicks)
categoryGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.category-card');
  if (!card) return;
  const cat = card.dataset.category;
  filterCategory.value = cat;
  renderWorkers();
  document.getElementById('workers').scrollIntoView({ behavior: 'smooth' });
});

// Render worker cards
function renderWorkers() {
  const catVal = filterCategory.value;
  const ratingVal = filterRating.value;

  const filtered = workers.filter(w => {
    if (catVal && w.category !== catVal) return false;
    if (ratingVal && w.rating < parseFloat(ratingVal)) return false;
    return true;
  });

  resultCount.textContent = `Showing ${filtered.length} verified worker${filtered.length !== 1 ? 's' : ''}`;
  workerGrid.innerHTML = filtered.map(w => `
    <article class="worker-card" data-id="${w.id}" draggable="true">
      <div class="worker-img">👩‍💼</div>
      <div class="worker-body">
        <div class="worker-top">
          <div>
            <div class="worker-name">${w.name}</div>
            <div class="worker-category">${w.role}</div>
          </div>
          <div class="worker-badge">${w.verified ? 'Verified' : 'Pending'}</div>
        </div>
        <div class="worker-rating">
          <span class="stars">${'★'.repeat(Math.floor(w.rating))}${'☆'.repeat(5 - Math.floor(w.rating))}</span>
          <span>(${w.reviews} reviews)</span>
        </div>
        <div class="worker-price">${w.price}</div>
        <div class="worker-actions">
          <button class="btn btn-outline" onclick="openWorker(${w.id})">Message</button>
          <button class="btn btn-whatsapp" onclick="event.stopPropagation(); contactWhatsApp('${w.location.replace(/'/g, "\\'")}')">WhatsApp</button>
          <button class="btn btn-primary" onclick="openWorker(${w.id})">Book</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Drag-to-select functionality for worker cards
let dragSource = null;

workerGrid.addEventListener('dragstart', (e) => {
  const card = e.target.closest('.worker-card');
  if (!card) return;
  dragSource = card;
  card.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', card.dataset.id);
});

workerGrid.addEventListener('dragend', (e) => {
  const card = e.target.closest('.worker-card');
  if (card) card.classList.remove('dragging');
  document.querySelectorAll('.worker-card.drag-over').forEach(c => c.classList.remove('drag-over'));
  dragSource = null;
});

workerGrid.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const card = e.target.closest('.worker-card');
  if (!card || card === dragSource) return;
  document.querySelectorAll('.worker-card.drag-over').forEach(c => c.classList.remove('drag-over'));
  card.classList.add('drag-over');
});

workerGrid.addEventListener('dragleave', (e) => {
  const card = e.target.closest('.worker-card');
  if (card) card.classList.remove('drag-over');
});

workerGrid.addEventListener('drop', (e) => {
  e.preventDefault();
  const card = e.target.closest('.worker-card');
  if (!card || !dragSource || card === dragSource) return;
  card.classList.remove('drag-over');
  card.classList.add('selected');
  dragSource.classList.remove('dragging');
  dragSource = null;
});

// Click to toggle selection
workerGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.worker-card');
  if (!card) return;
  // Don't toggle if clicking action buttons
  if (e.target.closest('.worker-actions')) return;
  card.classList.toggle('selected');
});

window.openWorker = function (id) {
  const w = workers.find(x => x.id === id);
  if (!w) return;

  document.getElementById('modalAvatar').textContent = w.name.charAt(0);
  document.getElementById('modalName').textContent = w.name;
  document.getElementById('modalBadge').textContent = w.verified ? 'Verified' : 'Pending Verification';
  document.getElementById('modalBadge').className = `badge ${w.verified ? 'badge-verified' : 'badge-pending'}`;
  document.getElementById('modalStars').textContent = '★'.repeat(Math.floor(w.rating)) + '☆'.repeat(5 - Math.floor(w.rating));
  document.getElementById('modalReviewCount').textContent = `${w.reviews} reviews`;
  document.getElementById('modalLocation').textContent = w.location;
  document.getElementById('modalBio').textContent = w.bio;

  document.getElementById('modalServices').innerHTML = w.services.map(s => `
    <div class="service-item"><span>${s.name}</span><span>${s.price}</span></div>
  `).join('');

  document.getElementById('modalAvailability').innerHTML = w.availability.map(a => `<span class="avail-slot">${a}</span>`).join('');

  document.getElementById('bookPrice').textContent = w.price.split('/')[0];

  const modal = document.getElementById('workerModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('workerModal').classList.remove('open');
  document.body.style.overflow = '';
});

document.getElementById('workerModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('workerModal')) {
    document.getElementById('workerModal').classList.remove('open');
    document.body.style.overflow = '';
  }
});

function openLogin(e) {
  e.preventDefault();
  document.getElementById('loginModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.getElementById('closeLogin').addEventListener('click', () => {
  document.getElementById('loginModal').classList.remove('open');
  document.body.style.overflow = '';
});

document.getElementById('loginModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('loginModal')) {
    document.getElementById('loginModal').classList.remove('open');
    document.body.style.overflow = '';
  }
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  alert(`Sign-in attempt for: ${email}\n\n(This is a frontend demo — no real authentication backend is connected.)`);
  document.getElementById('loginModal').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('loginForm').reset();
});

function contactWhatsApp(area) {
  const number = "919876543210";
  const text = `Hi, I saw your Apna Karobar profile for services in ${area}. I'd like to book a service.`;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

document.getElementById('closeChat').addEventListener('click', () => {
  document.getElementById('chatModal').classList.remove('open');
  document.body.style.overflow = '';
});

document.getElementById('chatModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('chatModal')) {
    document.getElementById('chatModal').classList.remove('open');
    document.body.style.overflow = '';
  }
});

document.getElementById('chatFab').addEventListener('click', () => {
  document.getElementById('chatModal').classList.add('open');
  document.body.style.overflow = 'hidden';
});

document.getElementById('sendChat').addEventListener('click', sendMessage);
document.getElementById('chatInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  const messages = document.getElementById('chatMessages');
  const sent = document.createElement('div');
  sent.className = 'msg msg-sent';
  sent.textContent = text;
  messages.appendChild(sent);
  input.value = '';
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    const replies = [
      "Thanks for messaging! I'm available this weekend.",
      "Sure, what service do you need?",
      "I can help with that. What's your address?",
      "Great, I'll confirm the timing shortly."
    ];
    const reply = document.createElement('div');
    reply.className = 'msg msg-received';
    reply.textContent = replies[Math.floor(Math.random() * replies.length)];
    messages.appendChild(reply);
    messages.scrollTop = messages.scrollHeight;
  }, 1200);
}

document.getElementById('confirmBook').addEventListener('click', () => {
  const date = document.getElementById('bookDate').value;
  const time = document.getElementById('bookTime').value;
  const address = document.getElementById('bookAddress').value;

  if (!date || !time || !address) {
    alert('Please fill in date, time, and address before confirming.');
    return;
  }

  alert(`Booking confirmed!\nDate: ${date}\nTime: ${time}\nAddress: ${address}\n\nWorker will contact you shortly.`);
  document.getElementById('workerModal').classList.remove('open');
  document.body.style.overflow = '';
});

// Filter listeners
filterCategory.addEventListener('change', renderWorkers);
filterRating.addEventListener('change', renderWorkers);

// Search button
searchBtn.addEventListener('click', () => {
  const what = document.getElementById('searchWhat').value.trim().toLowerCase();
  const where = document.getElementById('searchWhere').value.trim();
  if (!what && !where) {
    alert('Please enter what you need and your area.');
    return;
  }
  alert(`Searching for "${what}" near ${where || 'your area'}...\n\nShowing verified workers in your location.`);
  document.getElementById('workers').scrollIntoView({ behavior: 'smooth' });
});

// Mobile menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Initialize
renderWorkers();

// Mobile tabbar active state
const tabItems = document.querySelectorAll('.tab-item');
tabItems.forEach(item => {
  item.addEventListener('click', () => {
    tabItems.forEach(t => t.classList.remove('active'));
    item.classList.add('active');
  });
});
