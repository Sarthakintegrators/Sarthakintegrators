document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => setTimeout(() => loader?.classList.add('is-hidden'), 300));
  setTimeout(() => loader?.classList.add('is-hidden'), 1800);

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const header = document.getElementById('siteHeader');
  const backTop = document.getElementById('backTop');
  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    backTop?.classList.toggle('is-visible', window.scrollY > 520);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  const sections = document.querySelectorAll('main section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`));
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  sections.forEach(section => activeObserver.observe(section));

  const revealTargets = document.querySelectorAll('.reveal, .partner-card, .mission-card, .system-card');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((target, index) => {
    target.style.transitionDelay = `${Math.min(index % 6, 5) * 60}ms`;
    revealObserver.observe(target);
  });

  const systems = [
    {
      code: 'SYS-01',
      name: 'Coastal Surveillance Radar',
      domain: 'Maritime Domain Awareness',
      partner: 'Indigenous · Sarthak R&D',
      metric: 'DEPLOYED ×3',
      icon: '◉',
      image: 'assets/images/systems/sys-coastal-radar.jpg',
      desc: 'Coastal monitoring radar capability for maritime domain awareness, vessel detection and shore-based surveillance operations.',
      specs: ['Deployed ×3', 'Maritime surveillance', 'Indigenous integration']
    },
    {
      code: 'SYS-02',
      name: 'Underwater Weapon Systems',
      domain: 'Strategic Partner · Heuronics',
      partner: 'Heuronics · underwater weapon systems',
      metric: 'HEURONICS',
      icon: '◌',
      image: 'assets/images/systems/sys-underwater-weapons.jpg',
      desc: 'Naval underwater weapon systems portfolio supported through Heuronics partnership and India-focused integration.',
      specs: ['Underwater systems', 'Partner-led execution', 'Naval capability support']
    },
    {
      code: 'SYS-03',
      name: 'Inspection, Mapping & Minehunting',
      domain: 'Underwater · Idrobotica SA',
      partner: 'Idrobotica SA · Switzerland',
      metric: '1000m+',
      icon: '◎',
      image: 'assets/images/systems/sys-minehunting.jpg',
      desc: 'ROV-based underwater inspection, mapping, EOD assistance and minehunting capability for maritime operations.',
      specs: ['1000m+ class capability', 'Inspection & mapping', 'Minehunting support']
    },
    {
      code: 'SYS-04',
      name: 'Software-Defined Radios',
      domain: 'Strategic Partner · VRMS RF',
      partner: 'VRMS RF',
      metric: 'VRMS RF',
      icon: '▣',
      image: 'assets/images/systems/sys-sdr.jpg',
      desc: 'Secure tactical radio communication with software-defined architecture, encrypted voice and mission data support.',
      specs: ['Secure voice & data', 'Software-defined', 'Tactical communications']
    },
    {
      code: 'SYS-05',
      name: 'High-Altitude Pseudo-Satellite',
      domain: 'Strategic Partner · Dashagriv',
      partner: 'Dashagriv',
      metric: 'DASHAGRIV',
      icon: '△',
      image: 'assets/images/systems/sys-haps.jpg',
      desc: 'High-altitude pseudo-satellite platform for persistent aerial coverage, wide-area observation and communication relay roles.',
      specs: ['Persistent coverage', 'Aerial platform', 'Communication relay']
    },
    {
      code: 'SYS-06',
      name: 'CBRN & Damage Control',
      domain: 'Strategic Partner · CHEM Defense',
      partner: 'CHEM Defense',
      metric: 'CHEM DEFENSE',
      icon: '✚',
      image: 'assets/images/systems/sys-cbrn.jpg',
      desc: 'Chemical, biological, radiological and nuclear protection portfolio with damage control and response readiness.',
      specs: ['CBRN protection', 'Damage control', 'Response readiness']
    },
    {
      code: 'SYS-07',
      name: 'Unmanned & Light Strike Vehicle',
      domain: 'Strategic Partner · Cirus',
      partner: 'Cirus · Manesar, Gurugram',
      metric: 'CIRUS',
      icon: '◆',
      image: 'assets/images/systems/sys-lsv.jpg',
      desc: 'Unmanned and light strike vehicle capability for tactical mobility, rapid deployment and ground operations.',
      specs: ['Light strike mobility', 'Unmanned platform', 'Ground tactical role']
    },
    {
      code: 'SYS-08',
      name: 'Missile Systems',
      domain: 'Strategic Partner · Tarkx Defense',
      partner: 'Tarkx Defense · Jaipur',
      metric: 'TARKX DEFENSE',
      icon: '➤',
      image: 'assets/images/systems/sys-missile.jpg',
      desc: 'Missile systems portfolio supported through Tarkx Defense Systems for defence programme integration and execution.',
      specs: ['Missile systems', 'Jaipur partnership', 'Programme integration']
    }
  ];

  const systemsNav = document.getElementById('systemsNav');
  const systemsFeature = document.getElementById('systemsFeature');
  const systemsCards = document.getElementById('systemsCards');
  let activeIndex = 0;
  let timer;

  function renderFeature(index) {
    const s = systems[index];
    systemsFeature.innerHTML = `
      <div class="system-feature__image">
        <img src="${s.image}" alt="${s.name} illustration" loading="lazy" />
        <span class="system-feature__badge">${s.code} / ACTIVE PROFILE</span>
        <span class="system-feature__scan" aria-hidden="true"></span>
      </div>
      <div class="system-feature__body">
        <p class="system-feature__kicker">${s.domain}</p>
        <span class="system-feature__metric">${s.metric}</span>
        <h3 class="system-feature__title">${s.name}</h3>
        <p class="system-feature__desc">${s.desc}</p>
        <div class="system-feature__specs">
          ${s.specs.map((spec, i) => `<div class="spec"><span>Capability ${i + 1}</span><strong>${spec}</strong></div>`).join('')}
        </div>
      </div>
    `;
  }

  function setSystem(index, shouldRestart = true) {
    activeIndex = index;
    document.querySelectorAll('.systems-nav__item').forEach((btn, i) => btn.classList.toggle('is-active', i === index));
    document.querySelectorAll('.system-card').forEach((card, i) => card.classList.toggle('is-active', i === index));
    renderFeature(index);
    if (shouldRestart) startAuto();
  }

  if (systemsNav && systemsFeature && systemsCards) {
    systemsNav.innerHTML = systems.map((s, index) => `
      <button class="systems-nav__item${index === 0 ? ' is-active' : ''}" type="button" data-index="${index}">
        
        <span class="systems-nav__name">${s.name}</span>
        <span class="systems-nav__domain">${s.domain}</span>
      </button>
    `).join('');

    systemsCards.innerHTML = systems.map((s, index) => `
      <button class="system-card${index === 0 ? ' is-active' : ''}" type="button" data-index="${index}">
        <span class="system-card__thumb"><img src="${s.image}" alt="${s.name}" loading="lazy" /></span>
        <span class="system-card__domain">${s.domain}</span>
        <h3>${s.name}</h3>
        <p>${s.metric} · ${s.partner}</p>
      </button>
    `).join('');

    renderFeature(0);
    document.querySelectorAll('[data-index]').forEach(btn => btn.addEventListener('click', () => setSystem(Number(btn.dataset.index))));
    systemsFeature.addEventListener('mouseenter', () => clearInterval(timer));
    systemsFeature.addEventListener('mouseleave', () => startAuto());
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => setSystem((activeIndex + 1) % systems.length, false), 6000);
  }
  startAuto();
});
