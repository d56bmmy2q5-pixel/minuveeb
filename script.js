const boxes = document.querySelectorAll(".box");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbDesc = document.getElementById("lb-desc");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

let currentImages = [];
let currentIndex = 0;

// Slidrite automaatne vahetus
document.querySelectorAll(".slider").forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    if (slides.length <= 1) return;
    
    const desc = slider.getAttribute("data-description") || "";
    const title = slider.getAttribute("data-title") || "";

    // MÄÄRAME REEGLID:
    // 1. Ainult esimene box (Poetry booklet) -> LIIGUB
    // 2. Ainult Projekt 6 -> LIIGUB
    // Kõik teised (sh Exhibition design, Boat Stories jne) -> EI LIIGU
    
    const shouldAnimate = 
        desc.includes("Poetry booklet") || 
        title === "Projekt 6";

    if (shouldAnimate) {
        let sIdx = 0;
        setInterval(() => {
            slides[sIdx].classList.remove("active");
            sIdx = (sIdx + 1) % slides.length;
            slides[sIdx].classList.add("active");
        }, 3000);
    }
});

function updateLightbox() {
    lbImg.src = currentImages[currentIndex].src;
    prevBtn.style.display = currentImages.length > 1 ? "flex" : "none";
    nextBtn.style.display = currentImages.length > 1 ? "flex" : "none";
}

function openLightbox(targetBox) {
    currentImages = Array.from(targetBox.querySelectorAll(".slide"));
    if (currentImages.length === 0) return;
    currentIndex = 0;

    const shortDesc = targetBox.getAttribute("data-description") || "";
    if(lbDesc) lbDesc.textContent = shortDesc;

    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box.dataset.targetBox !== undefined) {
            const targetIdx = parseInt(box.dataset.targetBox);
            const allSliders = document.querySelectorAll('.slider');
            openLightbox(allSliders[targetIdx]);
        } else {
            openLightbox(box);
        }
    });
});

nextBtn.onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightbox();
};

prevBtn.onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightbox();
};

document.querySelector(".lightbox-close").onclick = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
};

// About sektsiooni loogika
const aboutTrigger = document.getElementById('about-trigger');
const aboutPanel = document.getElementById('about-panel');
const rightColumn = document.getElementById('right-column');

if (aboutTrigger) {
    aboutTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        aboutPanel.classList.toggle('active');
        rightColumn.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        document.querySelector(".lightbox-close").click();
        if (aboutPanel) aboutPanel.classList.remove("active");
    }
    if (lightbox.classList.contains("active")) {
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
    }
});