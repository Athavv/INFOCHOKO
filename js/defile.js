const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;

nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
        updateActiveSlide(currentIndex + 1);
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        updateActiveSlide(currentIndex - 1);
    }
});

function updateActiveSlide(newIndex) {
    slides[currentIndex].classList.remove('active');
    currentIndex = newIndex;
    slides[currentIndex].classList.add('active');
    const offset = calculateOffset(currentIndex);
    track.style.transform = `translateX(${offset}px)`;
}

function calculateOffset(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const containerWidth = track.parentElement.offsetWidth;
    const centerOffset = (containerWidth - slideWidth) / 2;
    return centerOffset - index * (slideWidth + 30); // 30 = margin
}

// Initial positioning
updateActiveSlide(0);
const indicators = document.querySelectorAll('.indicator');

function updateIndicators(index) {
  indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
  });
}

// Modifiez la fonction updateActiveSlide pour inclure les indicateurs
function updateActiveSlide(newIndex) {
  slides[currentIndex].classList.remove('active');
  currentIndex = newIndex;
  slides[currentIndex].classList.add('active');
  const offset = calculateOffset(currentIndex);
  track.style.transform = `translateX(${offset}px)`;
  updateIndicators(currentIndex);
}

// Initialisez les indicateurs
updateIndicators(0);