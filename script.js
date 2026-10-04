/**
 * BNR FITNESS STUDIO — JAVASCRIPT ENGINE
 * Luxury Interactivity, Spotlight Trainer Stage, and Seamless Responsiveness
 */

document.addEventListener('DOMContentLoaded', () => {
  initLuxuryCursor();
  initNavbar();
  initAudioSynthesizer();
  initSpotlightTrainerStage();
  initMembershipToggle();
  initBespokeCalculator();
  initGalleryFiltersAndLightbox();
  initScheduleFilter();
  initModals();
  initConcierge();
  initScrollAnimations();
  initLiveGymStatus();
});

/* ==========================================================================
   1. CUSTOM LUXURY GOLD CURSOR
   ========================================================================== */
function initLuxuryCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const follower = document.createElement('div');
  follower.className = 'custom-cursor-follower';
  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(renderFollower);
  }
  renderFollower();

  const interactiveElements = document.querySelectorAll('a, button, input, select, .gallery-card, .trainer-tab-item, .pillar-card, .tier-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
  });
}

/* ==========================================================================
   2. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.luxury-navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* ==========================================================================
   3. WEB AUDIO SYNTHESIZER (LUXURY HAPTIC SOUND)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudioSynthesizer() {
  const toggleBtn = document.getElementById('soundToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      toggleBtn.innerHTML = soundEnabled 
        ? '<i class="fa-solid fa-volume-high"></i> Luxury Sound: ON'
        : '<i class="fa-solid fa-volume-xmark"></i> Sound: OFF';
      if (soundEnabled) playLuxuryChime(520, 'sine', 0.05);
    });
  }

  document.querySelectorAll('.btn-luxury, .gallery-filter-btn, .day-btn, .gender-btn, .trainer-tab-item, .stage-arrow-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (soundEnabled) playLuxuryChime(440, 'triangle', 0.04);
    });
  });
}

function playLuxuryChime(freq = 440, type = 'sine', duration = 0.05) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio restricted prior to gesture
  }
}

/* ==========================================================================
   4. SPOTLIGHT TRAINER STAGE (1 TRAINER AT A TIME WITH ANIMATION & SCROLL)
   ========================================================================== */
const trainersData = [
  {
    id: 0,
    name: "Rahul",
    role: "Head of Strength & Olympic Conditioning",
    badge: "Director of Strength",
    photo: "rahul.jpg",
    exp: "8+ Years",
    transformations: "350+",
    rating: "4.98 ★",
    quote: "“Strength is the master quality. When you build pure foundational force, every aspect of physical performance and aesthetic symmetry follows naturally.”",
    bio: "Rahul leads high-performance strength architecture at BNR Fitness Studio. Specializing in barbell biomechanics, powerlifting mechanics, and maximum neuromuscular force development for athletes and executives.",
    skills: [
      { name: "Barbell & Olympic Lifting Mechanics", pct: "99%" },
      { name: "Hypertrophy & Neuromuscular Force", pct: "96%" },
      { name: "Competitive Powerlifting Prep", pct: "98%" }
    ]
  },
  {
    id: 1,
    name: "Aravind",
    role: "Lead Functional & Athletic Conditioning Coach",
    badge: "Master Specialist",
    photo: "aravind.jpg",
    exp: "7+ Years",
    transformations: "280+",
    rating: "4.95 ★",
    quote: "“Conditioning is about building an unbreakable engine. We train for power, speed, agility, and real-world athletic dominance.”",
    bio: "Architect of metabolic threshold conditioning at BNR. Aravind specializes in high-intensity kinetic circuits, VO2 max elevation, and explosive agility that incinerates fat while forging lean, functional power.",
    skills: [
      { name: "Metabolic Threshold & VO2 Max", pct: "98%" },
      { name: "Functional Kinetic Conditioning", pct: "97%" },
      { name: "Explosive Athletic Agility", pct: "95%" }
    ]
  },
  {
    id: 2,
    name: "Bharath",
    role: "Master Body Re-Engineering & Metabolic Lead",
    badge: "Body Architect",
    photo: "bharath.JPG",
    exp: "6+ Years",
    transformations: "400+",
    rating: "4.97 ★",
    quote: "“Precision nutrition paired with targeted mechanical tension re-engineers your physique faster, safer, and more sustainably than anything else.”",
    bio: "Bharath specializes in rapid body recomposition, subcutaneous fat loss, and muscle density sculpting. Renowned for creating tailored lifestyle systems that yield dramatic physical transformations.",
    skills: [
      { name: "Body Recomposition & Definition", pct: "99%" },
      { name: "Metabolic Fat Oxidation Protocol", pct: "98%" },
      { name: "Nutritional Periodization", pct: "95%" }
    ]
  },
  {
    id: 3,
    name: "Kishore",
    role: "Lead Biomechanist & Orthopedic Mobility Specialist",
    badge: "Lead Biomechanist",
    photo: "kishore.png",
    exp: "9+ Years",
    transformations: "300+",
    rating: "4.99 ★",
    quote: "“True longevity is lifting heavy without breaking down. We unlock your joint kinematics so you move freely, perform at peak, and stay pain-free.”",
    bio: "Kishore focuses on structural posture correction, joint longevity, kinetic chain optimization, and pain-free lifting. He helps members eliminate chronic aches while maximizing active range of motion.",
    skills: [
      { name: "Orthopedic Mobility & Joint Care", pct: "99%" },
      { name: "Kinetic Posture & Alignment", pct: "97%" },
      { name: "Injury Prevention & Corrective Exercise", pct: "96%" }
    ]
  }
];

let currentTrainerIdx = 0;
let autoPlayInterval = null;
let progressVal = 0;

function initSpotlightTrainerStage() {
  const tabs = document.querySelectorAll('.trainer-tab-item');
  const stageCard = document.getElementById('trainerStageCard');
  const prevBtn = document.getElementById('prevTrainerBtn');
  const nextBtn = document.getElementById('nextTrainerBtn');
  const progressBar = document.getElementById('trainerProgressBar');

  if (!stageCard) return;

  function renderTrainer(index, isAnimated = true) {
    currentTrainerIdx = index;
    const trainer = trainersData[index];

    // Update active tab styling
    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });

    // Populate Visual Deck (Left)
    const visualDeck = document.getElementById('trainerVisualDeck');
    const photoEl = document.getElementById('trainerPhoto');
    const badgeEl = document.getElementById('trainerBadge');
    const statExpEl = document.getElementById('trainerStatExp');
    const statTransEl = document.getElementById('trainerStatTrans');
    const statRatingEl = document.getElementById('trainerStatRating');

    if (photoEl) photoEl.src = trainer.photo;
    if (photoEl) photoEl.alt = `${trainer.name} - ${trainer.role}`;
    if (badgeEl) badgeEl.textContent = trainer.badge;
    if (statExpEl) statExpEl.textContent = trainer.exp;
    if (statTransEl) statTransEl.textContent = trainer.transformations;
    if (statRatingEl) statRatingEl.textContent = trainer.rating;

    // Populate Dossier (Right)
    const indexTagEl = document.getElementById('trainerIndexTag');
    const nameEl = document.getElementById('trainerName');
    const roleEl = document.getElementById('trainerRole');
    const quoteEl = document.getElementById('trainerQuote');
    const bioEl = document.getElementById('trainerBio');
    const skillsWrap = document.getElementById('trainerSkillsWrap');
    const bookBtn = document.getElementById('trainerBookBtn');

    if (indexTagEl) indexTagEl.innerHTML = `<i class="fa-solid fa-crown text-gold"></i> DOSSIER 0${index + 1} / 04`;
    if (nameEl) nameEl.textContent = trainer.name;
    if (roleEl) roleEl.textContent = trainer.role;
    if (quoteEl) quoteEl.textContent = trainer.quote;
    if (bioEl) bioEl.textContent = trainer.bio;

    if (skillsWrap) {
      skillsWrap.innerHTML = trainer.skills.map(s => `
        <div class="skill-row">
          <div class="skill-header">
            <span>${s.name}</span>
            <span style="color: var(--gold-400);">${s.pct}</span>
          </div>
          <div class="skill-track">
            <div class="skill-fill" style="width: ${s.pct};"></div>
          </div>
        </div>
      `).join('');
    }

    if (bookBtn) {
      bookBtn.dataset.coach = trainer.name;
      bookBtn.innerHTML = `<i class="fa-solid fa-calendar-check"></i> Book Consultation with ${trainer.name}`;
      bookBtn.onclick = () => window.openVipModal(trainer.name);
    }

    // Apply animation trigger
    if (isAnimated) {
      stageCard.classList.remove('animate-trainer-in');
      void stageCard.offsetWidth; // Force reflow
      stageCard.classList.add('animate-trainer-in');
    }

    progressVal = 0;
  }

  // Click handler for tab items
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.index, 10);
      renderTrainer(idx, true);
      resetAutoPlay();
    });
  });

  // Next / Prev button controls
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextIdx = (currentTrainerIdx + 1) % trainersData.length;
      renderTrainer(nextIdx, true);
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const prevIdx = (currentTrainerIdx - 1 + trainersData.length) % trainersData.length;
      renderTrainer(prevIdx, true);
      resetAutoPlay();
    });
  }

  // Touch Swipe Support for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  stageCard.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  stageCard.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swiped Left -> Next
      const nextIdx = (currentTrainerIdx + 1) % trainersData.length;
      renderTrainer(nextIdx, true);
      resetAutoPlay();
    }
    if (touchEndX > touchStartX + 50) {
      // Swiped Right -> Prev
      const prevIdx = (currentTrainerIdx - 1 + trainersData.length) % trainersData.length;
      renderTrainer(prevIdx, true);
      resetAutoPlay();
    }
  }

  // Gentle Auto-Play with Progress Bar
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      progressVal += 1.5;
      if (progressBar) progressBar.style.width = `${progressVal}%`;
      if (progressVal >= 100) {
        progressVal = 0;
        const nextIdx = (currentTrainerIdx + 1) % trainersData.length;
        renderTrainer(nextIdx, true);
      }
    }, 100);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    progressVal = 0;
    if (progressBar) progressBar.style.width = '0%';
    startAutoPlay();
  }

  stageCard.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
  stageCard.addEventListener('mouseleave', () => startAutoPlay());

  // Initialize first trainer
  renderTrainer(0, false);
  startAutoPlay();
}

/* ==========================================================================
   5. MEMBERSHIP TIERS SWITCHER
   ========================================================================== */
function initMembershipToggle() {
  const toggle = document.getElementById('billingPeriodToggle');
  if (!toggle) return;

  const prices = {
    monthly: {
      silver: '3,500',
      gold: '6,500',
      black: '12,000',
      period: '/ month'
    },
    annual: {
      silver: '2,800',
      gold: '5,200',
      black: '9,600',
      period: '/ mo (billed annually)'
    }
  };

  const silverAmount = document.getElementById('priceSilver');
  const goldAmount = document.getElementById('priceGold');
  const blackAmount = document.getElementById('priceBlack');
  const periodEls = document.querySelectorAll('.tier-period');
  const monthlyLabel = document.getElementById('labelMonthly');
  const annualLabel = document.getElementById('labelAnnual');

  toggle.addEventListener('change', () => {
    const isAnnual = toggle.checked;
    const mode = isAnnual ? 'annual' : 'monthly';

    if (silverAmount) silverAmount.textContent = prices[mode].silver;
    if (goldAmount) goldAmount.textContent = prices[mode].gold;
    if (blackAmount) blackAmount.textContent = prices[mode].black;

    periodEls.forEach(el => el.textContent = prices[mode].period);

    if (isAnnual) {
      annualLabel?.classList.add('active');
      monthlyLabel?.classList.remove('active');
    } else {
      monthlyLabel?.classList.add('active');
      annualLabel?.classList.remove('active');
    }
  });
}

/* ==========================================================================
   6. BESPOKE METABOLIC & CALORIE ARCHITECT
   ========================================================================== */
function initBespokeCalculator() {
  let selectedGender = 'male';

  const genderBtns = document.querySelectorAll('.gender-btn');
  genderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      genderBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedGender = btn.dataset.gender;
      calculateMetrics();
    });
  });

  const ageInput = document.getElementById('calcAge');
  const weightInput = document.getElementById('calcWeight');
  const heightInput = document.getElementById('calcHeight');
  const goalSelect = document.getElementById('calcGoal');
  const activitySelect = document.getElementById('calcActivity');

  [ageInput, weightInput, heightInput, goalSelect, activitySelect].forEach(input => {
    if (input) {
      input.addEventListener('input', calculateMetrics);
      input.addEventListener('change', calculateMetrics);
    }
  });

  function calculateMetrics() {
    const age = parseFloat(ageInput?.value) || 28;
    const weight = parseFloat(weightInput?.value) || 75;
    const height = parseFloat(heightInput?.value) || 178;
    const goal = goalSelect?.value || 'recomp';
    const activity = parseFloat(activitySelect?.value) || 1.4;

    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = selectedGender === 'male' ? bmr + 5 : bmr - 161;

    const tdee = Math.round(bmr * activity);
    let targetCalories = tdee;
    let protein = Math.round(weight * 2.2); // 2.2g per kg
    let fats = Math.round((tdee * 0.25) / 9);
    let carbs = 0;

    let blueprintTitle = "Executive Hypertrophy & Athletic Recomposition";
    let blueprintText = "Target 4 days/week strength split with progressive overload, followed by contrast thermal spa recovery.";

    if (goal === 'cut') {
      targetCalories = Math.round(tdee - 450);
      blueprintTitle = "Metabolic Shred & High-Definition Protocol";
      blueprintText = "Hypertrophy resistance + 20 min Zone 2 cardio post-workout. Focus on 2.4g/kg protein and cryotherapy recovery.";
    } else if (goal === 'bulk') {
      targetCalories = Math.round(tdee + 350);
      blueprintTitle = "Heavy Iron & Muscular Density Architecture";
      blueprintText = "Heavy compound movements with progressive overload. Ingest 45g protein post-session at our Organic Fuel Bar.";
    } else if (goal === 'endurance') {
      targetCalories = Math.round(tdee);
      blueprintTitle = "Hybrid Athletic Performance & VO2 Max Engine";
      blueprintText = "Functional conditioning, kettlebell circuits, and VO2 max interval training combined with mobility therapy.";
    }

    carbs = Math.max(50, Math.round((targetCalories - (protein * 4) - (fats * 9)) / 4));

    // Update UI elements
    const calTargetEl = document.getElementById('calcResultCalories');
    const proteinEl = document.getElementById('calcResultProtein');
    const carbsEl = document.getElementById('calcResultCarbs');
    const fatsEl = document.getElementById('calcResultFats');
    const blueprintTitleEl = document.getElementById('calcBlueprintTitle');
    const blueprintTextEl = document.getElementById('calcBlueprintText');

    if (calTargetEl) calTargetEl.textContent = targetCalories.toLocaleString();
    if (proteinEl) proteinEl.textContent = `${protein}g`;
    if (carbsEl) carbsEl.textContent = `${carbs}g`;
    if (fatsEl) fatsEl.textContent = `${fats}g`;
    if (blueprintTitleEl) blueprintTitleEl.innerHTML = `<i class="fa-solid fa-crown text-gold"></i> Recommended: ${blueprintTitle}`;
    if (blueprintTextEl) blueprintTextEl.textContent = blueprintText;

    // Update WhatsApp link
    const sendBtn = document.getElementById('btnSendCalcToWhatsApp');
    if (sendBtn) {
      const msg = `Hi BNR Fitness Studio Concierge! I computed my custom fitness protocol on your website:\n• Target Daily Calories: ${targetCalories} kcal\n• Macros: ${protein}g Protein, ${carbs}g Carbs, ${fats}g Fats\n• Goal: ${goal.toUpperCase()}\nI would like to schedule my free InBody 770 assessment & private tour!`;
      sendBtn.href = `https://wa.me/919550999868?text=${encodeURIComponent(msg)}`;
    }
  }

  calculateMetrics();
}

/* ==========================================================================
   7. SANCTUARY SPACES GALLERY & LIGHTBOX
   ========================================================================== */
function initGalleryFiltersAndLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;
      galleryCards.forEach(card => {
        if (filterValue === 'all' || card.dataset.category === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'popIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('sanctuaryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg) {
    galleryCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const title = card.querySelector('.gallery-card-title')?.textContent || 'Sanctuary Space';
        if (img) {
          lightboxImg.src = img.src;
          if (lightboxCaption) lightboxCaption.textContent = title;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
}

/* ==========================================================================
   8. SCHEDULE / TIMETABLE
   ========================================================================== */
const scheduleData = {
  mon: [
    { time: '06:00 AM', name: 'Olympic Iron & Hypertrophy Split', coach: 'Rahul', intensity: 'High Intensity' },
    { time: '07:30 AM', name: 'Athletic Conditioning & Metabolic Burn', coach: 'Aravind', intensity: 'High Intensity' },
    { time: '11:00 AM', name: 'Executive Posture & Orthopedic Mobility', coach: 'Kishore', intensity: 'Recovery & Flow' },
    { time: '05:30 PM', name: 'Heavy Barbell Precision & Deadlift Lab', coach: 'Rahul', intensity: 'High Intensity' },
    { time: '07:00 PM', name: 'Body Re-engineering & Core Ignition', coach: 'Bharath', intensity: 'Peak Power' }
  ],
  tue: [
    { time: '06:00 AM', name: 'Functional Kettlebell & Kinetic Flow', coach: 'Aravind', intensity: 'Functional' },
    { time: '08:00 AM', name: 'Metabolic Fat Oxidation Protocol', coach: 'Bharath', intensity: 'High Burn' },
    { time: '05:00 PM', name: 'Spinal Decompression & Deep Mobility', coach: 'Kishore', intensity: 'Recovery' },
    { time: '06:30 PM', name: 'Upper Body Architectural Hypertrophy', coach: 'Rahul', intensity: 'High Intensity' },
    { time: '08:00 PM', name: 'Cardio Engine & High-Lactate Circuits', coach: 'Aravind', intensity: 'Peak Power' }
  ],
  wed: [
    { time: '06:00 AM', name: 'Glute & Posterior Chain Mastery', coach: 'Bharath', intensity: 'Strength' },
    { time: '07:30 AM', name: 'HIIT Sanctuary & Biometric Sprint Zone', coach: 'Aravind', intensity: 'Extreme Burn' },
    { time: '11:00 AM', name: 'Orthopedic Joint Care & Myofascial Release', coach: 'Kishore', intensity: 'Recovery' },
    { time: '06:00 PM', name: 'Squat Architecture & Core Bracing', coach: 'Rahul', intensity: 'High Intensity' },
    { time: '07:30 PM', name: 'Full-Body Metabolic Hypertrophy', coach: 'Bharath', intensity: 'Peak Power' }
  ],
  thu: [
    { time: '06:00 AM', name: 'Chest & Deltoid Sculpting Clinic', coach: 'Rahul', intensity: 'Strength' },
    { time: '08:00 AM', name: 'Combat Conditioning & Striking Circuits', coach: 'Aravind', intensity: 'High Power' },
    { time: '05:30 PM', name: 'Biomechanics Alignment & Rehab Drills', coach: 'Kishore', intensity: 'Mobility' },
    { time: '07:00 PM', name: 'Metabolic Matrix & Tabata Burn', coach: 'Bharath', intensity: 'High Burn' }
  ],
  fri: [
    { time: '06:00 AM', name: 'Total Body Armageddon & Olympic Lifting', coach: 'Rahul', intensity: 'Peak Strength' },
    { time: '07:30 AM', name: 'Endurance Threshold & VO2 Max Engine', coach: 'Aravind', intensity: 'Extreme Burn' },
    { time: '06:00 PM', name: 'Hypertrophy Density & Vascular Pump', coach: 'Bharath', intensity: 'High Intensity' },
    { time: '07:30 PM', name: 'Weekend Warmup & Kinetic Mobility', coach: 'Kishore', intensity: 'Mobility' }
  ],
  sat: [
    { time: '07:00 AM', name: 'Master Coaches Team Challenge', coach: 'All Coaches', intensity: 'Signature VIP' },
    { time: '09:00 AM', name: 'Powerlifting Fundamentals & PR Lab', coach: 'Rahul', intensity: 'Strength' },
    { time: '11:00 AM', name: 'Infrared & Deep Foam Rolling Spa Flow', coach: 'Kishore', intensity: 'Luxury Spa' },
    { time: '05:30 PM', name: 'Metabolic Conditioning Blitz', coach: 'Aravind', intensity: 'High Intensity' }
  ],
  sun: [
    { time: '07:30 AM', name: 'Sunday Sunrise Kinetic Mobility', coach: 'Kishore', intensity: 'Gentle Flow' },
    { time: '09:30 AM', name: 'Open Sanctuary Lift & Biometric Scans', coach: 'Duty Coach', intensity: 'Open Gym' },
    { time: '05:00 PM', name: 'Thermal Hydrotherapy & Contrast Recovery', coach: 'Recovery Team', intensity: 'Pure Spa' }
  ]
};

function initScheduleFilter() {
  const dayBtns = document.querySelectorAll('.day-btn');
  const tableWrap = document.getElementById('scheduleRowsContainer');

  if (!tableWrap) return;

  function renderDaySchedule(day) {
    const classes = scheduleData[day] || scheduleData['mon'];
    tableWrap.innerHTML = classes.map(c => `
      <div class="schedule-row">
        <div class="schedule-time"><i class="fa-regular fa-clock" style="margin-right: 6px; font-size: 0.85rem;"></i>${c.time}</div>
        <div class="schedule-class-name">${c.name}</div>
        <div class="schedule-coach"><i class="fa-solid fa-user-tie text-gold"></i> Coach: <strong>${c.coach}</strong></div>
        <div><span class="schedule-intensity">${c.intensity}</span></div>
        <div>
          <button class="btn-luxury btn-glass btn-sm open-vip-modal-btn" data-class="${c.name}" style="width: 100%;">
            Reserve Spot
          </button>
        </div>
      </div>
    `).join('');

    attachModalTriggers();
  }

  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDaySchedule(btn.dataset.day);
    });
  });

  renderDaySchedule('mon');
}

/* ==========================================================================
   9. MODALS (VIP PASS & COACH CONSULTATION)
   ========================================================================== */
function initModals() {
  const vipModal = document.getElementById('vipPassModal');
  const closeBtn = document.getElementById('vipModalClose');
  const vipForm = document.getElementById('vipRegistrationForm');
  const coachSelect = document.getElementById('modalCoachSelect');

  window.openVipModal = function(preferredCoach = '') {
    if (vipModal) {
      if (preferredCoach && coachSelect) {
        coachSelect.value = preferredCoach;
      }
      vipModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeVipModal = function() {
    if (vipModal) {
      vipModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeVipModal);
  if (vipModal) {
    vipModal.addEventListener('click', (e) => {
      if (e.target === vipModal) closeVipModal();
    });
  }

  if (vipForm) {
    vipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName')?.value || 'Guest';
      const phone = document.getElementById('modalPhone')?.value || '';
      const coach = document.getElementById('modalCoachSelect')?.value || 'Any';
      const slot = document.getElementById('modalSlotSelect')?.value || 'Morning';

      const successMsg = `🎉 Thank you, ${name}! Your VIP Pass request has been received.\n\nOur BNR Concierge will connect with you on WhatsApp at ${phone} to confirm your appointment.`;
      alert(successMsg);

      const waMsg = `Hi BNR Fitness Studio, I just submitted my VIP pass request:\n• Name: ${name}\n• Phone: ${phone}\n• Preferred Coach: ${coach}\n• Preferred Time: ${slot}\nPlease confirm my booking!`;
      window.open(`https://wa.me/919550999868?text=${encodeURIComponent(waMsg)}`, '_blank');

      closeVipModal();
      vipForm.reset();
    });
  }

  attachModalTriggers();
}

function attachModalTriggers() {
  document.querySelectorAll('.open-vip-modal-btn').forEach(btn => {
    btn.onclick = () => {
      const coach = btn.dataset.coach || '';
      window.openVipModal(coach);
    };
  });
}

/* ==========================================================================
   10. FLOATING CONCIERGE
   ========================================================================== */
function initConcierge() {
  const triggerBtn = document.getElementById('conciergeTriggerBtn');
  const popup = document.getElementById('conciergePopup');
  const closeBtn = document.getElementById('conciergeClose');

  if (triggerBtn && popup) {
    triggerBtn.addEventListener('click', () => {
      popup.classList.toggle('active');
    });
  }

  if (closeBtn && popup) {
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
    });
  }
}

/* ==========================================================================
   11. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.pillar-card, .trainer-stage-card, .tier-card, .amenity-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(styleSheet);

/* ==========================================================================
   12. LIVE SANCTUARY OPERATING STATUS (MADHAPUR)
   ========================================================================== */
function initLiveGymStatus() {
  const statusEl = document.getElementById('liveSanctuaryStatus');
  if (!statusEl) return;

  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();

  let isOpen = false;
  if (day === 0) {
    // Sunday: 6:00 AM - 9:00 PM
    isOpen = hours >= 6 && hours < 21;
  } else {
    // Mon-Sat: 5:00 AM - 11:00 PM
    isOpen = hours >= 5 && hours < 23;
  }

  if (isOpen) {
    statusEl.innerHTML = `<span class="status-dot"></span> Studio Open Now • Welcoming Members`;
  } else {
    statusEl.innerHTML = `<span class="status-dot" style="background: #eab308; box-shadow: 0 0 8px #eab308;"></span> Studio Closed • Reopening at 5:00 AM`;
  }
}
