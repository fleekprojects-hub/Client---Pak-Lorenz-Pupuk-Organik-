/**
 * ============================================================
 * FLEEK AGRI-DISTRIBUTION OMNI-CORE // PAK LORENZ EDITION
 * Anime.js Slide Morphing Deck, B2B Google Maps Scraper Simulator,
 * WhatsApp Agri Frontline Simulator & OpEx Calculator
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const printBtn = document.getElementById('printBtn');
  const navToggleBtn = document.getElementById('navToggleBtn');
  const navDrawer = document.getElementById('navDrawer');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const deckToast = document.getElementById('deckToast');
  const deckToastText = document.getElementById('deckToastText');

  // --- Typewriter Word & Letter Wrapper ---
  const animateTexts = document.querySelectorAll('.animate-text');
  animateTexts.forEach(el => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    let wrappedHTML = '';
    
    words.forEach((wordText, wordIdx) => {
      let wordHTML = '<span class="word">';
      for (let i = 0; i < wordText.length; i++) {
        wordHTML += `<span class="letter">${wordText[i]}</span>`;
      }
      wordHTML += '</span>';
      wrappedHTML += wordHTML;
      if (wordIdx < words.length - 1) {
        wrappedHTML += ' ';
      }
    });
    
    el.innerHTML = wrappedHTML;
  });

  // Slide IDs for navigation (12 slides)
  const slideIds = [
    'opening',
    'problem',
    'architecture',
    'offensive-scraper',
    'demo-scraper',
    'demo-whatsapp',
    'knowledge-base',
    'e2e-journey',
    'limitation-matrix',
    'commercial-quote',
    'timeline',
    'closing-cta'
  ];

  let currentIndex = 0;
  let isTransitioning = false;
  const cooldownMs = 600;

  // --- Anime.js Entry Animation Trigger ---
  function triggerAnimeAnimations(content) {
    if (!window.anime) return;

    // 1. Letters Stagger
    const letters = content.querySelectorAll('.letter');
    if (letters.length > 0) {
      anime.remove(letters);
      anime.set(letters, { opacity: 0, translateY: 16 });
      anime({
        targets: letters,
        opacity: [0, 1],
        translateY: [16, 0],
        delay: anime.stagger(10),
        duration: 650,
        easing: 'easeOutElastic(1, .8)'
      });
    }

    // 2. Cyber cards staggered entry
    const cards = content.querySelectorAll('.cyber-decor, .pricing-card');
    if (cards.length > 0) {
      anime.remove(cards);
      anime.set(cards, { opacity: 0, translateY: 24 });
      anime({
        targets: cards,
        opacity: [0, 1],
        translateY: [24, 0],
        delay: anime.stagger(60, { start: 150 }),
        duration: 550,
        easing: 'easeOutCubic'
      });
    }
  }

  // --- Go To Slide Logic ---
  window.goToSlide = function(index) {
    if (index < 0 || index >= slideIds.length || isTransitioning) return;
    isTransitioning = true;

    const currentSlide = document.getElementById(slideIds[currentIndex]);
    const nextSlide = document.getElementById(slideIds[index]);

    // Animate out current
    if (window.anime && currentSlide) {
      anime({
        targets: currentSlide,
        opacity: [1, 0],
        translateY: [0, -15],
        duration: 250,
        easing: 'easeInQuad',
        complete: () => {
          currentSlide.classList.remove('active');
          activateNextSlide();
        }
      });
    } else {
      if (currentSlide) currentSlide.classList.remove('active');
      activateNextSlide();
    }

    function activateNextSlide() {
      currentIndex = index;
      nextSlide.classList.add('active');

      // Update Header & Progress
      updateDeckUI();

      if (window.anime) {
        anime.set(nextSlide, { opacity: 0, translateY: 15 });
        anime({
          targets: nextSlide,
          opacity: [0, 1],
          translateY: [15, 0],
          duration: 350,
          easing: 'easeOutQuad',
          complete: () => {
            triggerAnimeAnimations(nextSlide);
            setTimeout(() => { isTransitioning = false; }, 50);
          }
        });
      } else {
        triggerAnimeAnimations(nextSlide);
        isTransitioning = false;
      }
    }
  };

  function updateDeckUI() {
    // 1. Progress Bar
    const progressPercent = ((currentIndex + 1) / slideIds.length) * 100;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progressPercent}%`;
    }

    // 2. Nav Counter
    const deckNavCounter = document.getElementById('deckNavCounter');
    if (deckNavCounter) {
      const curStr = String(currentIndex + 1).padStart(2, '0');
      const totStr = String(slideIds.length).padStart(2, '0');
      deckNavCounter.textContent = `${curStr} / ${totStr}`;
    }

    // 3. Drawer Links
    navLinks.forEach((link, idx) => {
      if (idx === currentIndex) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // 4. Update Header Subtitle
    const currentSlideEl = document.getElementById(slideIds[currentIndex]);
    const headerSub = document.querySelector('.brand-sub');
    if (headerSub && currentSlideEl) {
      const slideMeta = currentSlideEl.querySelector('.sect-meta');
      if (slideMeta) {
        headerSub.textContent = slideMeta.textContent.replace('//', '').trim();
      }
    }
  }

  // --- Keyboard & Wheel Navigation ---
  window.nextSlide = function() {
    if (currentIndex < slideIds.length - 1) {
      window.goToSlide(currentIndex + 1);
    }
  };

  window.prevSlide = function() {
    if (currentIndex > 0) {
      window.goToSlide(currentIndex - 1);
    }
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      window.nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      window.prevSlide();
    }
  });

  // Wheel with cooldown
  let wheelTimer = null;
  window.addEventListener('wheel', (e) => {
    if (isTransitioning) return;
    if (wheelTimer) return;

    if (e.deltaY > 35) {
      window.nextSlide();
      wheelTimer = setTimeout(() => { wheelTimer = null; }, cooldownMs);
    } else if (e.deltaY < -35) {
      window.prevSlide();
      wheelTimer = setTimeout(() => { wheelTimer = null; }, cooldownMs);
    }
  }, { passive: true });

  // Touch swipe support
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY - touchEndY;
    if (Math.abs(diffY) > 50 && !isTransitioning) {
      if (diffY > 0) {
        window.nextSlide();
      } else {
        window.prevSlide();
      }
    }
  }, { passive: true });

  // --- Drawer Interactions ---
  if (navToggleBtn && navDrawer && navOverlay) {
    navToggleBtn.addEventListener('click', () => {
      navDrawer.classList.toggle('open');
      navOverlay.classList.toggle('open');
    });

    navOverlay.addEventListener('click', () => {
      navDrawer.classList.remove('open');
      navOverlay.classList.remove('open');
    });

    const closeNavBtn = document.getElementById('closeNavBtn');
    if (closeNavBtn) {
      closeNavBtn.addEventListener('click', () => {
        navDrawer.classList.remove('open');
        navOverlay.classList.remove('open');
      });
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(link.getAttribute('data-index'), 10);
        window.goToSlide(targetIdx);
        navDrawer.classList.remove('open');
        navOverlay.classList.remove('open');
      });
    });
  }

  // --- Theme Toggle ---
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      showToast(`Tema beralih ke: ${newTheme.toUpperCase()} MODE`);
    });
  }

  // --- Print / Export PDF ---
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // --- Toast Helper ---
  function showToast(msg) {
    if (!deckToast || !deckToastText) return;
    deckToastText.textContent = msg;
    deckToast.classList.add('show');
    setTimeout(() => {
      deckToast.classList.remove('show');
    }, 2800);
  }

  // ============================================================
  // 🔥 INTERACTIVE DEMO 1: B2B GOOGLE MAPS SCRAPER SIMULATOR
  // ============================================================
  const sampleScraperData = {
    'jabar': [
      { name: 'Kios Pupuk Sumber Makmur', category: 'Kios Pupuk & Bibit', region: 'Karawang Timur', phone: '0812-8921-xxxx', status: 'VERIFIED', rating: '4.8 ★ (120 ulasan)' },
      { name: 'KUD Tani Sejahtera', category: 'Koperasi Unit Desa (KUD)', region: 'Rengasdengklok', phone: '0857-7712-xxxx', status: 'VERIFIED', rating: '4.6 ★ (85 ulasan)' },
      { name: 'Toko Pertanian Agro Barokah', category: 'Toko Tani & Pestisida', region: 'Subang Kota', phone: '0813-1120-xxxx', status: 'VERIFIED', rating: '4.7 ★ (64 ulasan)' },
      { name: 'Poultry & Feed Mitra Tani', category: 'Toko Pakan Ternak', region: 'Cikampek Barat', phone: '0819-0544-xxxx', status: 'VERIFIED', rating: '4.9 ★ (210 ulasan)' },
      { name: 'Kios Saprotan Subur Abadi', category: 'Kios Pupuk Non-Subsidi', region: 'Pagaden Subang', phone: '0821-3490-xxxx', status: 'VERIFIED', rating: '4.5 ★ (42 ulasan)' }
    ],
    'jateng': [
      { name: 'Kios Tani Bawang Jaya', category: 'Kios Saprotan Bawang', region: 'Brebes Kota', phone: '0812-9988-xxxx', status: 'VERIFIED', rating: '4.9 ★ (150 ulasan)' },
      { name: 'KUD Tani Makmur Larangan', category: 'Koperasi Tani', region: 'Larangan, Brebes', phone: '0858-6611-xxxx', status: 'VERIFIED', rating: '4.5 ★ (70 ulasan)' },
      { name: 'Toko Pupuk & Benih Sri Rejeki', category: 'Kios Pupuk Resmi', region: 'Slawi, Tegal', phone: '0813-2890-xxxx', status: 'VERIFIED', rating: '4.8 ★ (110 ulasan)' },
      { name: 'Agro Poultry Center Tegal', category: 'Toko Pakan Ternak', region: 'Adiwerna, Tegal', phone: '0819-3321-xxxx', status: 'VERIFIED', rating: '4.7 ★ (95 ulasan)' }
    ],
    'jatim': [
      { name: 'Kios Apel & Sayur Makmur', category: 'Toko Tani Hortikultura', region: 'Batu, Malang', phone: '0812-4455-xxxx', status: 'VERIFIED', rating: '4.9 ★ (230 ulasan)' },
      { name: 'KUD Sumber Pangan Pujon', category: 'Koperasi Peternak & Tani', region: 'Pujon, Malang', phone: '0857-8899-xxxx', status: 'VERIFIED', rating: '4.8 ★ (180 ulasan)' },
      { name: 'Toko Saprotan Bunga Indah', category: 'Kios Pupuk Organik', region: 'Bumiaji, Batu', phone: '0813-7766-xxxx', status: 'VERIFIED', rating: '4.6 ★ (60 ulasan)' }
    ]
  };

  window.renderScraperTable = function(regionKey = 'jabar') {
    const tableBody = document.getElementById('scraperTableBody');
    const regionBadge = document.getElementById('scraperRegionBadge');
    const totalCountBadge = document.getElementById('scraperCountBadge');
    if (!tableBody) return;

    const items = sampleScraperData[regionKey] || sampleScraperData['jabar'];
    tableBody.innerHTML = '';

    items.forEach((item, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="font-family:var(--font-mono); color:var(--agri-green);">${idx + 1}</td>
        <td><b style="color:#fff;">${item.name}</b><br><span style="font-size:0.65rem; color:var(--home-fg-3);">${item.category}</span></td>
        <td>${item.region}</td>
        <td style="font-family:var(--font-mono);">${item.phone}</td>
        <td><span style="color:#fbbf24; font-size:0.68rem;">${item.rating}</span></td>
        <td><span style="background:var(--agri-green-dim); color:var(--agri-green); font-size:0.62rem; padding:2px 6px; border-radius:3px; font-weight:700;">${item.status}</span></td>
      `;
      tableBody.appendChild(row);
    });

    if (regionBadge) {
      const names = { 'jabar': 'Jawa Barat (Karawang & Subang)', 'jateng': 'Jawa Tengah (Brebes & Tegal)', 'jatim': 'Jawa Timur (Malang & Batu)' };
      regionBadge.textContent = names[regionKey] || 'Jawa Barat';
    }

    if (totalCountBadge) {
      totalCountBadge.textContent = `${items.length} Target Terverifikasi`;
    }
  };

  window.triggerScraperRegion = function(regionKey, btnEl) {
    const chipBtns = document.querySelectorAll('.scraper-region-chip');
    chipBtns.forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    const statusLog = document.getElementById('scraperStatusLog');
    if (statusLog) {
      statusLog.innerHTML = `<span style="color:var(--agri-green);">⚡ B2B Google Maps Scraper berjalan...</span> Mengambil data titik toko pupuk & KUD di area target...`;
    }

    setTimeout(() => {
      window.renderScraperTable(regionKey);
      if (statusLog) {
        statusLog.innerHTML = `<span style="color:#4ade80;">✓ Selesai:</span> Data toko pertanian berhasil diekstrak dan tersinkronisasi ke Google Sheets!`;
      }
      showToast(`Google Maps Scraper berhasil menarik data ${regionKey.toUpperCase()}`);
    }, 450);
  };

  window.exportToSheetSim = function() {
    showToast('✓ Data berhasil diexport otomatis ke Google Sheets!');
  };

  // ============================================================
  // 🔥 INTERACTIVE DEMO 2: WHATSAPP AGRI FRONTLINE SIMULATOR
  // ============================================================
  const waChatBody = document.getElementById('waChatBody');
  const waScenarioBadge = document.getElementById('waScenarioBadge');

  window.triggerWaScenario = function(type) {
    if (!waChatBody) return;
    waChatBody.innerHTML = '';

    let userMsg = '';
    let aiReply = '';
    let scenarioLabel = '';
    let noteText = '';

    if (type === 'dosis') {
      scenarioLabel = 'Skenario 1: Tanya Dosis Padi (Singkat & To-The-Point)';
      userMsg = 'Halo min, mau tanya pupuk cair organiknya buat padi takarannya berapa ya per tangki?';
      aiReply = 'Pagi Pak! Untuk padi, takarannya cukup <b>3 tutup botol (~30 ml)</b> per tangki semprot 16 liter. Semprot merata pagi hari tiap 7–10 hari sekali setelah masa tanam. Mau coba 1 botol (1 Liter) dulu Pak?';
      noteText = '<b>Karakter Bot:</b> Jawaban to-the-point, hanya 2 baris, bahasa mudah dipahami petani tanpa teori kimia berbelit-belit.';
    } else if (type === 'ternak') {
      scenarioLabel = 'Skenario 2: Campuran Pakan Ternak (Ayam & Kambing)';
      userMsg = 'Siang, denger2 pupuk ini bisa dicampur pakan ayam broiler ya? Aman ga buat hewan?';
      aiReply = 'Siang Pak! Betul sekali, produk kami <b>100% organik alami</b> tanpa zat kimia beracun, aman dicampur air minum atau pakan ternak (1 tutup untuk 10 liter air). Membantu penyerapan nutrisi dan mengurangi bau kotoran kandang.';
      noteText = '<b>Karakter Bot:</b> Menjawab keraguan keamanan produk organik multi-fungsi (tanaman + peternakan) secara membumi.';
    } else if (type === 'skeptis') {
      scenarioLabel = 'Skenario 3: Uji Kasus Negatif (Petani Skeptis / Mahal)';
      userMsg = 'Kok pupuk organiknya mahal banget ya seliter 95 ribu? Pupuk kimia subsidi cuma 30 ribuan!';
      aiReply = 'Paham Pak, sekilas terlihat beda harga. Tapi pupuk organik kami <b>konsentrat murni</b>: 1 botol bisa untuk 30 tangki semprot (cukup untuk 1–2 hektar). Petani di Karawang justru hemat biaya pupuk kimia sampai 40% dan tanah tetap subur jangka panjang Pak. Mau kami kirimkan foto hasil panen petani sebelah?';
      noteText = '<b>Negative Case Proof:</b> Bot tidak panik, merespons skeptisisme dengan komparasi efisiensi biaya per hektar tanpa banting harga.';
    } else if (type === 'grosir') {
      scenarioLabel = 'Skenario 4: Order Partai Besar (Handover ke Sales Manusia)';
      userMsg = 'Sore mas, saya dari Gapoktan Subang mau ambil 500 botol untuk 20 hektar sawah, ada diskon distributor?';
      aiReply = 'Sore Bapak/Ibu! Untuk pengambilan partai besar <b>500 botol (tingkat distributor/koperasi)</b>, kami hubungkan langsung dengan <b>Pak Hendra (PIC Tim Lapangan Kami)</b> via WhatsApp untuk negosiasi harga dan penjadwalan demo uji coba lahan ya Pak. Mohon tunggu sebentar 🙏';
      noteText = '<b>Human Escalation:</b> Transaksi partai besar otomatis di-handover ke tim manusia. AI dilarang memvalidasi pembayaran.';
    }

    if (waScenarioBadge) {
      waScenarioBadge.textContent = scenarioLabel;
    }

    // Render Inbound Bubble (User)
    const inboundEl = document.createElement('div');
    inboundEl.className = 'wa-bubble inbound';
    inboundEl.innerHTML = `${userMsg} <div class="wa-time">10:14</div>`;
    waChatBody.appendChild(inboundEl);

    // Typing simulation
    setTimeout(() => {
      const outboundEl = document.createElement('div');
      outboundEl.className = 'wa-bubble outbound';
      outboundEl.innerHTML = `${aiReply} <div class="wa-time">10:14 ✓✓</div>`;
      waChatBody.appendChild(outboundEl);
      waChatBody.scrollTop = waChatBody.scrollHeight;

      const waReasoningNote = document.getElementById('waReasoningNote');
      if (waReasoningNote) {
        waReasoningNote.innerHTML = noteText;
      }
    }, 450);
  };

  // ============================================================
  // OPEX CALCULATOR (SLIDE 10)
  // ============================================================
  window.updateAgriCostCalculation = function(val) {
    const chatCount = parseInt(val, 10);
    const chatDisplay = document.getElementById('chatVolumeDisplay');
    const totalCostDisplay = document.getElementById('totalOpexDisplay');
    const tokenDisplay = document.getElementById('tokenCostDisplay');

    if (chatDisplay) chatDisplay.textContent = `${chatCount.toLocaleString('id-ID')} chat/bln`;

    // VPS Fixed ~150k
    const vps = 150000;
    // Token Gemini ~250 IDR per complex turn
    const token = Math.round(chatCount * 220);
    const total = vps + token;

    if (tokenDisplay) tokenDisplay.textContent = `~Rp ${token.toLocaleString('id-ID')}`;
    if (totalCostDisplay) totalCostDisplay.textContent = `~Rp ${total.toLocaleString('id-ID')}`;
  };

  // Initial Load
  updateDeckUI();
  window.renderScraperTable('jabar');
  window.triggerWaScenario('dosis');
});
