const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const bookingForm = document.getElementById("bookingForm");
const serviceSelect = document.getElementById("service");
const serviceButtons = document.querySelectorAll(".service-btn");

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

const backToTop = document.getElementById("backToTop");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedService = button.dataset.service;

    serviceSelect.value = selectedService;

    document.getElementById("booking").scrollIntoView({
      behavior: "smooth"
    });
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const selectedFilter = button.dataset.filter;

    galleryItems.forEach((item) => {
      const category = item.dataset.category;

      if (selectedFilter === "all" || category === selectedFilter) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("active");
    document.body.classList.add("no-scroll");
  });
});

function closeGalleryLightbox() {
  lightbox.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

closeLightbox.addEventListener("click", closeGalleryLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeGalleryLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeGalleryLightbox();
  }
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const location = document.getElementById("location").value.trim();
  const notes = document.getElementById("notes").value.trim();

  if (!name || !phone || !service || !date || !time || !location) {
    alert("Please complete all required fields.");
    return;
  }

  const message = `
Hello Luna Beauty Studio,

I would like to book a makeup session.

Name: ${name}
Phone: ${phone}
Service: ${service}
Event Date: ${date}
Event Time: ${time}
Location: ${location}
Notes: ${notes || "No additional notes"}
  `;

  const whatsappNumber = "201000000000";

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const dateInput = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateInput.min = today;