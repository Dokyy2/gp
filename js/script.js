const galleryImages = [
  { src: "assets/images/coffins/coffin2.png", title: "تابوت أبيض فاخر بتفاصيل ذهبية", size: 560, poster: true },
  { src: "assets/images/coffins/coffin1.png", title: "تابوت أبيض فاخر", size: 620, poster: true },
  { src: "assets/images/coffins/coffin3.png", title: "تابوت مودرن", size: 500, poster: true },
  { src: "assets/images/coffins/coffin2.png", title: "تفاصيل تشطيب حقيقية", size: 430, poster: true },
  { src: "assets/images/coffins/coffin1.png", title: "جودة الخامات والتقفيل", size: 540, poster: true },
  { src: "assets/images/coffins/coffin2.png", title: "نماذج متوفرة من منتجاتنا", size: 610, poster: true },
  { src: "assets/images/coffins/coffin1.png", title: "تابوت بتصميم كلاسيكي", size: 450, poster: true },
  { src: "assets/images/coffins/coffin3.png", title: "تصميم عملي ومحترم", size: 520, poster: true },
  { src: "assets/images/coffins/coffin2.png", title: "منتجات مصورة من الواقع", size: 580, poster: true },
  { src: "assets/images/coffins/coffin1.png", title: "تشطيب أبيض فاخر", size: 470, poster: true },
  { src: "assets/images/coffins/coffin2.png", title: "مقاسات متعددة حسب الاحتياج", size: 640, poster: true },
  { src: "assets/images/coffins/coffin3.png", title: "معرض منتجات G.P", size: 420, poster: true },
  { src: "assets/images/coffins/coffin1.png", title: "تفاصيل ذهبية واضحة", size: 530, poster: true },
  { src: "assets/images/coffins/coffin2.png", title: "تابوت أبيض بتجهيز فاخر", size: 490, poster: true },
  { src: "assets/images/coffins/coffin3.png", title: "اختيارات متعددة للتوابيت", size: 570, poster: true },
  { src: "assets/images/vehicles/car1.png", title: "سيارة نقل مجهزة", size: 320 },
  { src: "assets/images/vehicles/car2.png", title: "خدمة نقل المتوفين", size: 300 },
  { src: "assets/images/vehicles/car3.png", title: "سيارة خدمة ثانوية", size: 340 },
  { src: "assets/images/coffins/coffin1.png", title: "صورة منتج حقيقية", size: 600, poster: true },
  { src: "assets/images/coffins/coffin2.png", title: "تفاصيل المنتج", size: 440, poster: true },
  { src: "assets/images/coffins/coffin3.png", title: "تابوت متوفر", size: 510, poster: true },
  { src: "assets/images/coffins/coffin1.png", title: "منتج جاهز للعرض", size: 460, poster: true },
  { src: "assets/images/coffins/coffin2.png", title: "تشطيب نظيف ومحترم", size: 550, poster: true },
  { src: "assets/images/coffins/coffin3.png", title: "كتالوج التوابيت", size: 410, poster: true }
];

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const gallery = document.querySelector("[data-gallery]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const closeBtn = document.querySelector("[data-lightbox-close]");
const prevBtn = document.querySelector("[data-lightbox-prev]");
const nextBtn = document.querySelector("[data-lightbox-next]");

let activeImageIndex = 0;

function setHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 18);
}

function renderGallery() {
  const fragment = document.createDocumentFragment();

  galleryImages.forEach((image, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `gallery-item reveal${image.poster ? " poster" : ""}`;
    button.style.setProperty("--gallery-height", `${image.size}px`);
    button.setAttribute("aria-label", `فتح الصورة: ${image.title}`);

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.title;
    img.loading = index < 6 ? "eager" : "lazy";

    const caption = document.createElement("span");
    caption.className = "gallery-caption";
    caption.textContent = image.title;

    button.append(img, caption);
    button.addEventListener("click", () => openLightbox(index));
    fragment.append(button);
  });

  gallery.append(fragment);
}

function openLightbox(index) {
  activeImageIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateLightbox() {
  const image = galleryImages[activeImageIndex];
  lightboxImg.src = image.src;
  lightboxImg.alt = image.title;
  lightboxCaption.textContent = image.title;
}

function moveLightbox(direction) {
  activeImageIndex = (activeImageIndex + direction + galleryImages.length) % galleryImages.length;
  updateLightbox();
}

function setupVehiclePreview() {
  document.querySelectorAll("[data-vehicle-image]").forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-vehicle-image");
      const index = galleryImages.findIndex((image) => image.src === src);
      if (index >= 0) openLightbox(index);
    });
  });
}

function setupRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", () => moveLightbox(-1));
nextBtn.addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(1);
  if (event.key === "ArrowRight") moveLightbox(-1);
});

window.addEventListener("scroll", setHeaderState, { passive: true });

renderGallery();
setupVehiclePreview();
setupRevealAnimation();
setHeaderState();
