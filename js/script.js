const phoneNumber = "201098061106";

// أضف صور التوابيت الإسلامية هنا.
// حط الصورة داخل: assets/images/coffins
// ثم انسخ آخر سطر من القائمة وغير اسم الملف والعنوان.
const islamicCoffinImages = [
  { src: "assets/images/coffins/islamic-1.png", title: "تابوت إسلامي موديل 1" },
  { src: "assets/images/coffins/islamic-2.png", title: "تابوت إسلامي موديل 2" },
  { src: "assets/images/coffins/islamic-3.png", title: "تابوت إسلامي موديل 3" },
  { src: "assets/images/coffins/islamic-4.png", title: "تابوت إسلامي موديل 4" },
  { src: "assets/images/coffins/islamic-5.png", title: "تابوت إسلامي موديل 5" }
];

// أضف صور التوابيت المسيحية هنا.
// حط الصورة داخل: assets/images/coffins
// ثم انسخ آخر سطر من القائمة وغير اسم الملف والعنوان.
const christianCoffinImages = [
  { src: "assets/images/coffins/christian-1.png", title: "تابوت مسيحي موديل 1" },
  { src: "assets/images/coffins/christian-2.png", title: "تابوت مسيحي موديل 2" },
  { src: "assets/images/coffins/christian-3.png", title: "تابوت مسيحي موديل 3" },
  { src: "assets/images/coffins/christian-4.png", title: "تابوت مسيحي موديل 4" },
  { src: "assets/images/coffins/christian-5.png", title: "تابوت مسيحي موديل 5" },
  { src: "assets/images/coffins/christian-6.png", title: "تابوت مسيحي موديل 6" },
  { src: "assets/images/coffins/christian-7.png", title: "تابوت مسيحي موديل 7" },
  { src: "assets/images/coffins/christian-8.png", title: "تابوت مسيحي موديل 8" },
  { src: "assets/images/coffins/christian-9.png", title: "تابوت مسيحي موديل 9" },
  { src: "assets/images/coffins/christian-10.png", title: "تابوت مسيحي موديل 10" },
  { src: "assets/images/coffins/christian-11.png", title: "تابوت مسيحي موديل 11" },
  { src: "assets/images/coffins/christian-12.png", title: "تابوت مسيحي موديل 12" },
  { src: "assets/images/coffins/christian-13.png", title: "تابوت مسيحي موديل 13" },
  { src: "assets/images/coffins/christian-14.png", title: "تابوت مسيحي موديل 14" },
  { src: "assets/images/coffins/christian-15.png", title: "تابوت مسيحي موديل 15" },
  { src: "assets/images/coffins/christian-16.png", title: "تابوت مسيحي موديل 16" },
  { src: "assets/images/coffins/christian-17.png", title: "تابوت مسيحي موديل 17" },
  { src: "assets/images/coffins/christian-18.png", title: "تابوت مسيحي موديل 18" },
  { src: "assets/images/coffins/christian-19.png", title: "تابوت مسيحي موديل 19" },
  { src: "assets/images/coffins/christian-20.png", title: "تابوت مسيحي موديل 20" },
  { src: "assets/images/coffins/christian-21.png", title: "تابوت مسيحي موديل 21" },
  { src: "assets/images/coffins/christian-22.png", title: "تابوت مسيحي موديل 22" }
];

const coffinGalleries = {
  islamic: {
    title: "معرض التوابيت الإسلامية",
    images: islamicCoffinImages
  },
  christian: {
    title: "معرض التوابيت المسيحية",
    images: christianCoffinImages
  }
};

const vehicleImages = [
  { src: "assets/images/vehicles/car1.png", title: "سيارة نقل متوفين مجهزة" },
  { src: "assets/images/vehicles/car2.png", title: "سيارة نقل متوفين" },
  { src: "assets/images/vehicles/car3.png", title: "سيارة خدمة النقل والدعم" }
];

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const coffinModal = document.querySelector("[data-coffin-modal]");
const modalTitle = document.querySelector("[data-coffin-modal-title]");
const modalGrid = document.querySelector("[data-coffin-modal-grid]");
const closeModalBtn = document.querySelector("[data-close-coffin-modal]");
const farashaModal = document.querySelector("[data-farasha-modal]");
const openFarashaModalBtn = document.querySelector("[data-open-farasha-modal]");
const closeFarashaModalBtn = document.querySelector("[data-close-farasha-modal]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const closeBtn = document.querySelector("[data-lightbox-close]");
const prevBtn = document.querySelector("[data-lightbox-prev]");
const nextBtn = document.querySelector("[data-lightbox-next]");
const zoomInBtn = document.querySelector("[data-zoom-in]");
const zoomOutBtn = document.querySelector("[data-zoom-out]");
const zoomResetBtn = document.querySelector("[data-zoom-reset]");

let activeImages = [];
let activeImageIndex = 0;
let zoomLevel = 1;

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 18);
}

function requestUrl(item) {
  const message = `اريد تفاصيل عن هذا المنتج: ${item.title}`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function openCoffinModal(type) {
  const selectedGallery = coffinGalleries[type];
  if (!selectedGallery || !coffinModal || !modalGrid || !modalTitle) return;

  activeImages = selectedGallery.images;
  modalTitle.textContent = selectedGallery.title;
  modalGrid.innerHTML = "";

  const fragment = document.createDocumentFragment();

  selectedGallery.images.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "modal-product-card";

    const imageButton = document.createElement("button");
    imageButton.className = "modal-image-button";
    imageButton.type = "button";
    imageButton.setAttribute("aria-label", `فتح صورة ${item.title}`);
    imageButton.addEventListener("click", () => openLightbox(index, selectedGallery.images));

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title;
    img.loading = "lazy";

    const hint = document.createElement("span");
    hint.className = "image-click-hint";
    hint.textContent = "اضغط للتكبير";

    imageButton.append(img, hint);

    const copy = document.createElement("div");
    copy.className = "modal-product-copy";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const order = document.createElement("a");
    order.className = "order-now-button";
    order.href = requestUrl(item);
    order.target = "_blank";
    order.rel = "noopener";
    order.textContent = "اطلبه الآن";

    copy.append(title, order);
    card.append(imageButton, copy);
    fragment.append(card);
  });

  modalGrid.append(fragment);
  coffinModal.classList.add("open");
  coffinModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCoffinModal() {
  if (!coffinModal) return;
  coffinModal.classList.remove("open");
  coffinModal.setAttribute("aria-hidden", "true");
  if (!lightbox?.classList.contains("open")) document.body.style.overflow = "";
}

function openFarashaModal() {
  if (!farashaModal) return;
  farashaModal.classList.add("open");
  farashaModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeFarashaModal() {
  if (!farashaModal) return;
  farashaModal.classList.remove("open");
  farashaModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openLightbox(index, images) {
  if (!lightbox || !images?.length) return;
  activeImages = images;
  activeImageIndex = index;
  zoomLevel = 1;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  zoomLevel = 1;
  if (lightboxImg) lightboxImg.style.transform = "";
  if (!coffinModal?.classList.contains("open")) document.body.style.overflow = "";
}

function updateLightbox() {
  const image = activeImages[activeImageIndex];
  if (!image || !lightboxImg || !lightboxCaption) return;
  lightboxImg.src = image.src;
  lightboxImg.alt = image.title;
  lightboxCaption.textContent = image.title;
  lightboxImg.style.transform = `scale(${zoomLevel})`;
}

function moveLightbox(direction) {
  if (!activeImages.length) return;
  activeImageIndex = (activeImageIndex + direction + activeImages.length) % activeImages.length;
  zoomLevel = 1;
  updateLightbox();
}

function changeZoom(amount) {
  if (!lightboxImg) return;
  zoomLevel = Math.min(2.4, Math.max(0.8, zoomLevel + amount));
  lightboxImg.style.transform = `scale(${zoomLevel})`;
}

function setupCoffinButtons() {
  document.querySelectorAll("[data-open-coffin-gallery]").forEach((button) => {
    button.addEventListener("click", () => openCoffinModal(button.dataset.openCoffinGallery));
  });
}

function setupVehiclePreview() {
  document.querySelectorAll("[data-vehicle-image]").forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-vehicle-image");
      const index = vehicleImages.findIndex((image) => image.src === src);
      if (index >= 0) openLightbox(index, vehicleImages);
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

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

closeModalBtn?.addEventListener("click", closeCoffinModal);
coffinModal?.addEventListener("click", (event) => {
  if (event.target === coffinModal) closeCoffinModal();
});

openFarashaModalBtn?.addEventListener("click", openFarashaModal);
closeFarashaModalBtn?.addEventListener("click", closeFarashaModal);
farashaModal?.addEventListener("click", (event) => {
  if (event.target === farashaModal) closeFarashaModal();
});

closeBtn?.addEventListener("click", closeLightbox);
prevBtn?.addEventListener("click", () => moveLightbox(-1));
nextBtn?.addEventListener("click", () => moveLightbox(1));
zoomInBtn?.addEventListener("click", () => changeZoom(0.2));
zoomOutBtn?.addEventListener("click", () => changeZoom(-0.2));
zoomResetBtn?.addEventListener("click", () => {
  zoomLevel = 1;
  if (lightboxImg) lightboxImg.style.transform = "scale(1)";
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("open")) {
    closeLightbox();
    return;
  }

  if (event.key === "Escape" && coffinModal?.classList.contains("open")) {
    closeCoffinModal();
    return;
  }

  if (event.key === "Escape" && farashaModal?.classList.contains("open")) {
    closeFarashaModal();
    return;
  }

  if (!lightbox?.classList.contains("open")) return;

  if (event.key === "ArrowLeft") moveLightbox(1);
  if (event.key === "ArrowRight") moveLightbox(-1);
  if (event.key === "+") changeZoom(0.2);
  if (event.key === "-") changeZoom(-0.2);
});

window.addEventListener("scroll", setHeaderState, { passive: true });

setupCoffinButtons();
setupVehiclePreview();
setupRevealAnimation();
setHeaderState();
