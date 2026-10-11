gsap.registerPlugin(ScrollTrigger);

// 1. Animasi Masuk Hero
gsap.from(".gsap-hero", {
  duration: 1.2,
  y: 60,
  opacity: 0,
  stagger: 0.3,
  ease: "power3.out"
});

// 2. Responsive GSAP (Horizontal Scroll untuk Desktop, Dimatikan di HP)
let mm = gsap.matchMedia();

// Khusus Desktop (Layar > 768px)
mm.add("(min-width: 769px)", () => {
  const container = document.querySelector(".horizontal-container");
  
  if (container) {
    let tween = gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-wrapper",
        start: "top top",
        end: () => "+=" + container.scrollWidth,
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    return () => {
      tween.kill();
    };
  }
});

// Khusus Mobile (Layar <= 768px) - Mengalir normal ke bawah tanpa horizontal scroll
mm.add("(max-width: 768px)", () => {
  // Kosongkan agar animasi pin horizontal tidak aktif di HP
});

// 3. Animasi Fade In untuk Section Lainnya
gsap.utils.toArray(".gsap-fade").forEach(element => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
});

// 4. Tombol Toggle Tema (Mode Terang / Gelap)
const btnTema = document.querySelector('#btnToggleTema');
const bodyHalaman = document.querySelector('body');

btnTema?.addEventListener('click', function () {
  bodyHalaman.classList.toggle('light-mode');

  if (bodyHalaman.classList.contains('light-mode')) {
    btnTema.textContent = '🌙 Mode Gelap';
  } else {
    btnTema.textContent = '☀️ Mode Terang';
  }
});

// 5. Modal Kontak
const btnBukaModal = document.querySelector('#btnKontak');
const elemenModal = document.querySelector('#modalKontak');
const btnTutupModal = document.querySelector('#btnTutupModal');

btnBukaModal?.addEventListener('click', function (event) {
  event.preventDefault();
  elemenModal?.classList.add('show');
});

btnTutupModal?.addEventListener('click', function () {
  elemenModal?.classList.remove('show');
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && elemenModal?.classList.contains('show')) {
    elemenModal.classList.remove('show');
  }
});

// 6. Auto Greeting Berdasarkan Waktu
function ubahGreetingOtomatis() {
  const jam = new Date().getHours();
  let ucapan = '';

  if (jam >= 5 && jam < 12) {
    ucapan = 'Selamat Pagi🌅';
  } else if (jam >= 12 && jam < 15) {
    ucapan = 'Selamat Siang☀️';
  } else if (jam >= 15 && jam < 18) {
    ucapan = 'Selamat Sore🌇';
  } else {
    ucapan = 'Selamat Malam🌙';
  }

  return ucapan;
}

const elemenRole = document.querySelector('#roleSiswa');
if (elemenRole) {
  elemenRole.textContent = ubahGreetingOtomatis();
}

// 7. Interaksi Avatar Profil Putar
const avatar = document.querySelector('#avatarProfil');

if (avatar) {
  avatar.addEventListener('click', function () {
    avatar.classList.add('putar-avatar');
    avatar.addEventListener(
      'animationend',
      function () {
        avatar.classList.remove('putar-avatar');
      },
      { once: true }
    );
  });
}