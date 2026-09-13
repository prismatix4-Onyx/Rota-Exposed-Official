/**
 * ROTA-SCAN Interactive Game Engine & Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMotionSystem();
  initNavigation();
  initProgressTracker();
  initSide1ChoiceSelector();
  initSide1Scenario();
  initSide2ProjectUnlocks();
  initSide2ScavengerHunt();
  initSide3Quiz();
  initSide4Wheel();
  initSide4IdeaForm();
});

/* ==========================================================================\n+   MOTION SYSTEM\n+   ========================================================================== */

function initMotionSystem() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.body.classList.add('motion-ready');
  const sections = document.querySelectorAll('.section');
  if (!sections.length) return;

  const reveal = section => section.classList.add('is-visible');
  if (!('IntersectionObserver' in window)) {
    sections.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   NAVIGATION & PROGRESS TRACKER
   ========================================================================== */

function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function initProgressTracker() {
  const currentPage = document.body.dataset.page || 'home';
  const progressKey = 'rotaScanProgress';
  let savedProgress = {};

  try {
    savedProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
  } catch (error) {
    localStorage.removeItem(progressKey);
  }

  const pageMap = {
    home: 'side1',
    work: 'side2',
    club: 'side3',
    connect: 'side4'
  };

  if (pageMap[currentPage]) {
    savedProgress[pageMap[currentPage]] = true;
    try {
      localStorage.setItem(progressKey, JSON.stringify(savedProgress));
    } catch (error) {
      // Progress remains available for the current page if storage is blocked.
    }
  }

  const visitedCount = Object.values(savedProgress).filter(Boolean).length;
  const totalSides = 4;

  // Update header text counter
  document.querySelectorAll('[data-progress-count]').forEach(el => {
    el.textContent = `${visitedCount} / ${totalSides}`;
  });

  // Update header dots
  document.querySelectorAll('[data-progress-dots]').forEach(container => {
    const sides = ['side1', 'side2', 'side3', 'side4'];
    container.innerHTML = sides.map(side => `
      <span class="progress-dot ${savedProgress[side] ? 'is-done' : ''}" title="${side.toUpperCase()}"></span>
    `).join('');
  });

  // Confetti celebration on completing all 4 sides on Side 4
  if (visitedCount === 4 && currentPage === 'connect') {
    const completeBanner = document.querySelector('[data-complete]');
    if (completeBanner) {
      completeBanner.hidden = false;
    }
  }
}

/* ==========================================================================
   SIDE 1: PICK YOUR MOVE & SCENARIOS
   ========================================================================== */

function initSide1ChoiceSelector() {
  const cards = document.querySelectorAll('.choice-card');
  const resultBox = document.querySelector('.choice-result');
  const scenarios = window.rotaScanData?.scenarios || [];

  if (!cards.length || !resultBox) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');

      const choiceId = card.dataset.choice;
      const scenarioData = scenarios.find(s => s.id === choiceId);

      if (scenarioData) {
        resultBox.hidden = false;
        resultBox.innerHTML = `
          <strong>${scenarioData.responseTitle}</strong>
          <p>${scenarioData.responseBody}</p>
        `;
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

function initSide1Scenario() {
  const buttons = document.querySelectorAll('.scenario-btn');
  const responseBox = document.querySelector('.scenario-response');

  if (!buttons.length || !responseBox) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');

      const title = btn.dataset.responseTitle || 'YOUR CHOICE MATTERS.';
      const msg = btn.dataset.responseMsg || 'Service starts when someone decides: "Someone should do something." Then becomes that someone.';

      responseBox.hidden = false;
      responseBox.innerHTML = `
        <strong>${title}</strong>
        <p>${msg}</p>
      `;
    });
  });
}

/* ==========================================================================
   SIDE 2: PROJECT UNLOCKS & SCAVENGER HUNT
   ========================================================================== */

function initSide2ProjectUnlocks() {
  const grid = document.querySelector('[data-project-grid]');
  const countNodes = document.querySelectorAll('[data-project-count]');
  const projects = window.rotaScanData?.projects || [];

  if (!grid) return;

  const storageKey = 'rotaScanProjectsUnlocked';
  let storedProjects = [];
  try {
    storedProjects = JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch (error) {
    localStorage.removeItem(storageKey);
  }
  const unlocked = new Set(Array.isArray(storedProjects) ? storedProjects : []);

  function updateCounter() {
    countNodes.forEach(node => {
      node.textContent = `${unlocked.size} / ${projects.length}`;
    });
  }

  grid.innerHTML = projects.map((proj, idx) => {
    const isUnlocked = unlocked.has(idx);
    return `
      <div class="unlock-card ${isUnlocked ? 'is-unlocked' : ''}" data-idx="${idx}">
        <span class="lock-icon">${isUnlocked ? '✦' : '🔒'}</span>
        <div>
          <span class="sticker-badge ${isUnlocked ? 'lime' : 'orange'}">${proj.number}</span>
          <strong style="margin-top: 10px;">${isUnlocked ? proj.name : 'LOCKED STORY'}</strong>
          <small>${isUnlocked ? proj.description : 'TAP CARD TO UNLOCK STORY'}</small>
        </div>
        <div class="unlock-detail">
          ${isUnlocked ? `<b>IMPACT: ${proj.impact}</b>` : 'Tap to reveal project impact.'}
        </div>
      </div>
    `;
  }).join('');

  updateCounter();

  grid.querySelectorAll('.unlock-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = Number(card.dataset.idx);
      unlocked.add(idx);
      try {
        localStorage.setItem(storageKey, JSON.stringify([...unlocked]));
      } catch (error) {
        // The card still unlocks for the current visit if storage is blocked.
      }

      const proj = projects[idx];
      card.classList.add('is-unlocked');
      card.querySelector('.lock-icon').textContent = '✦';
      card.querySelector('strong').textContent = proj.name;
      card.querySelector('small').textContent = proj.description;
      card.querySelector('.unlock-detail').innerHTML = `<b>IMPACT: ${proj.impact}</b>`;
      
      updateCounter();
      triggerConfettiBurst(card);
    });
  });
}

function initSide2ScavengerHunt() {
  const wrapper = document.querySelector('[data-hunt-wrapper]');
  const pin = document.querySelector('[data-hotspot]');
  const result = document.querySelector('[data-bonus-result]');
  const chaser = document.querySelector('[data-chaser]');
  const chaserLabel = document.querySelector('[data-chaser-label]');

  if (!wrapper || !pin) return;

  function updateChaserPosition(clientX, clientY) {
    const rect = wrapper.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Position scope ring relative to container
    if (chaser) {
      chaser.style.left = `${x}px`;
      chaser.style.top = `${y}px`;
      chaser.classList.add('is-active');
    }

    // Get pin center position
    const pinRect = pin.getBoundingClientRect();
    const pinCenterX = pinRect.left + pinRect.width / 2 - rect.left;
    const pinCenterY = pinRect.top + pinRect.height / 2 - rect.top;

    // Calculate Euclidean distance between pointer and pin center
    const dist = Math.hypot(x - pinCenterX, y - pinCenterY);

    if (dist < 70) {
      chaser?.classList.add('state-hot');
      chaser?.classList.remove('state-warm', 'state-cold');
      if (chaserLabel) chaserLabel.textContent = 'RADAR: PIN DETECTED! 🔥';
      pin.classList.add('is-near');
    } else if (dist < 170) {
      chaser?.classList.add('state-warm');
      chaser?.classList.remove('state-hot', 'state-cold');
      if (chaserLabel) chaserLabel.textContent = 'RADAR: WARM... 🎯';
      pin.classList.remove('is-near');
    } else {
      chaser?.classList.add('state-cold');
      chaser?.classList.remove('state-hot', 'state-warm');
      if (chaserLabel) chaserLabel.textContent = 'RADAR: SEARCHING...';
      pin.classList.remove('is-near');
    }
  }

  // Pointer / Mouse events
  wrapper.addEventListener('pointermove', (e) => {
    updateChaserPosition(e.clientX, e.clientY);
  });

  wrapper.addEventListener('pointerleave', () => {
    chaser?.classList.remove('is-active');
    pin.classList.remove('is-near');
  });

  // Touch device support for mobile
  wrapper.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      updateChaserPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // Pin activation click/tap handler
  pin.addEventListener('click', (e) => {
    e.stopPropagation();
    pin.classList.add('is-found');
    if (result) result.hidden = false;
    if (chaserLabel) chaserLabel.textContent = 'FOUND! 🎉';
    triggerConfettiBurst(pin);
  });
}

/* ==========================================================================
   SIDE 3: ROTARACTOR STYLE QUIZ
   ========================================================================== */

function initSide3Quiz() {
  const quizBox = document.querySelector('[data-quiz]');
  if (!quizBox) return;

  const questions = window.rotaScanData?.quizQuestions || [];
  const results = window.rotaScanData?.quizResults || {};
  let currentIdx = 0;
  const scores = { leader: 0, maker: 0, connector: 0, builder: 0 };

  const progressNode = quizBox.querySelector('[data-quiz-progress]');
  const questionNode = quizBox.querySelector('[data-quiz-question]');
  const optionsNode = quizBox.querySelector('[data-quiz-options]');
  const resultNode = quizBox.querySelector('[data-quiz-result]');

  function renderQuestion() {
    const q = questions[currentIdx];
    progressNode.textContent = `QUESTION ${currentIdx + 1} OF ${questions.length}`;
    questionNode.textContent = q.text;

    optionsNode.innerHTML = '';
    q.answers.forEach(([label, personaKey]) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.type = 'button';
      btn.textContent = label;

      btn.addEventListener('click', () => {
        scores[personaKey] += 1;
        currentIdx += 1;
        if (currentIdx < questions.length) {
          renderQuestion();
        } else {
          showResult();
        }
      });
      optionsNode.appendChild(btn);
    });
  }

  function showResult() {
    const topPersona = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];
    const outcome = results[topPersona] || results.maker;

    progressNode.textContent = 'YOUR ROTARACT STYLE';
    questionNode.textContent = 'YOUR PERSONA MATCH HAS BEEN UNLOCKED!';
    optionsNode.innerHTML = '';

    resultNode.hidden = false;
    resultNode.innerHTML = `
      <div class="quiz-result-box">
        <span class="sticker-badge orange">ROTARACT STYLE</span>
        <h3>${outcome.title}</h3>
        <p>${outcome.message}</p>
        <div class="result-strengths">
          ${outcome.strengths.map(str => `<span class="result-tag">${str}</span>`).join('')}
        </div>
      </div>
    `;
    triggerConfettiBurst(resultNode);
  }

  renderQuestion();
}

/* ==========================================================================
   SIDE 4: ACTION WHEEL & "CHANGE ONE THING" FORM
   ========================================================================== */

function initSide4Wheel() {
  const wheelBtn = document.querySelector('[data-spin-wheel]');
  const wheel = document.querySelector('[data-wheel]');
  const resultNode = document.querySelector('[data-wheel-result]');
  const labels = document.querySelectorAll('.wheel-label');
  const outcomes = window.rotaScanData?.wheelOutcomes || [];

  if (!wheelBtn || !wheel || !resultNode) return;

  let currentDegree = 0;

  wheelBtn.addEventListener('click', () => {
    // 3 to 5 full spins + random target degree angle
    const extraSpins = (3 + Math.floor(Math.random() * 3)) * 360;
    const targetAngle = Math.floor(Math.random() * 360);
    
    currentDegree += extraSpins + targetAngle;
    wheel.style.transform = `rotate(${currentDegree}deg)`;

    // Counter-rotate label text so labels STAY 100% HORIZONTAL and upright
    labels.forEach(label => {
      label.style.transform = `translate(-50%, -50%) rotate(${-currentDegree}deg)`;
    });

    // Calculate EXACT outcome landed under top pointer (12 o'clock)
    // Sector 0 (SERVE - Orange): 0°..90°
    // Sector 1 (LEARN - Blue): 90°..180°
    // Sector 2 (CONNECT - Lime): 180°..270°
    // Sector 3 (CREATE - Yellow): 270°..360°
    const normalizedAngle = (360 - (currentDegree % 360)) % 360;
    const sectorIndex = Math.floor(normalizedAngle / 90) % 4;
    const landedOutcome = outcomes[sectorIndex] || outcomes[0];

    setTimeout(() => {
      resultNode.hidden = false;
      resultNode.innerHTML = `
        <div class="wheel-result-box">
          <strong>${landedOutcome.title}</strong>
          <p style="margin-top: 8px;">${landedOutcome.message}</p>
        </div>
      `;
      triggerConfettiBurst(wheelBtn);
    }, 2900);
  });
}

function initSide4IdeaForm() {
  const form = document.querySelector('.idea-form');
  const successModal = document.querySelector('.idea-success-modal');

  if (!form || !successModal) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const textarea = form.querySelector('textarea');
    const userIdea = textarea?.value.trim();

    if (!userIdea) return;

    // Save idea locally
    let savedIdeas = [];
    try {
      savedIdeas = JSON.parse(localStorage.getItem('rotaScanIdeas') || '[]');
    } catch (error) {
      localStorage.removeItem('rotaScanIdeas');
    }
    if (!Array.isArray(savedIdeas)) savedIdeas = [];
    savedIdeas.push({ text: userIdea, timestamp: new Date().toISOString() });
    try {
      localStorage.setItem('rotaScanIdeas', JSON.stringify(savedIdeas));
    } catch (error) {
      // The success response still works when storage is blocked.
    }

    // Show celebratory response
    successModal.hidden = false;
    successModal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    triggerConfettiBurst(successModal);

    form.reset();
  });
}

/* ==========================================================================
   CONFETTI PARTICLE CELEBRATION
   ========================================================================== */

function triggerConfettiBurst(targetElement) {
  const rect = targetElement ? targetElement.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0 };
  const originX = rect.left + rect.width / 2;
  const originY = rect.top;

  const colors = ['#2563EB', '#FF5722', '#84CC16', '#FFD028', '#7C3AED'];

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    particle.style.left = `${originX + (Math.random() * 120 - 60)}px`;
    particle.style.top = `${originY}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 2500);
  }
}
