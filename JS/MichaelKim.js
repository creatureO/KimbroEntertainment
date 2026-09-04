let currentImages = [];
let currentIndex = 0;

function openLightbox(el) {
  document.getElementById('lightbox-caption').innerHTML = el.dataset.caption;
  document.getElementById('lightbox').classList.remove('hidden');

  // Build the mixed-media array
  if (el.dataset.images) {
    currentImages = JSON.parse(el.dataset.images);
  } else if (el.dataset.youtube) {
    currentImages = [{ type: 'youtube', src: el.dataset.youtube }];
  } else if (el.dataset.video) {
    currentImages = [{ type: 'video', src: el.dataset.video }];
  } else {
    currentImages = [{ type: 'image', src: el.src }];
  }

  currentIndex = 0;
  showSlide();
}

function showSlide() {
  const img = document.getElementById('lightbox-img');
  const video = document.getElementById('lightbox-video');
  const youtube = document.getElementById('lightbox-youtube');

  // Reset all media, and pause/clear video so it doesn't keep playing in the background
  img.classList.add('hidden');
  video.classList.add('hidden');
  video.pause();
  video.src = '';
  youtube.classList.add('hidden');
  youtube.src = '';

  const slide = currentImages[currentIndex];

  if (slide.type === 'youtube') {
    youtube.src = `https://www.youtube.com/embed/${slide.src}?autoplay=1`;
    youtube.classList.remove('hidden');
  } else if (slide.type === 'video') {
    video.src = slide.src;
    video.classList.remove('hidden');
    video.play();
  } else {
    img.src = slide.src;
    img.classList.remove('hidden');
  }

  // hide arrows if there's only one slide
  const showArrows = currentImages.length > 1;
  document.getElementById('lightbox-prev').style.display = showArrows ? 'block' : 'none';
  document.getElementById('lightbox-next').style.display = showArrows ? 'block' : 'none';
}

function changeSlide(direction) {
  currentIndex += direction;
  if (currentIndex >= currentImages.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = currentImages.length - 1;
  showSlide();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.getElementById('lightbox-video').pause();
  document.getElementById('lightbox-video').src = '';
  document.getElementById('lightbox-youtube').src = '';
}

//home nav button
const button = document.querySelector('.summary-toggle');
const scrollButton = document.querySelector('.scroll-button');
const anchorBarBackground = document.querySelector('.details-wrapper');
button.addEventListener('click', (e) => {
  scrollButton.classList.toggle('is-open');
  button.classList.toggle('clicked');
  anchorBarBackground.classList.toggle('clicked');
  e.stopPropagation(); // prevents this same click from being seen as an "outside" click below
});
document.addEventListener('click', (e) => {
  const isOpen = scrollButton.classList.contains('is-open');
  const clickedInsideMenu = anchorBarBackground.contains(e.target);

  if (isOpen && !clickedInsideMenu) {
    scrollButton.classList.remove('is-open');
    button.classList.remove('clicked');
    anchorBarBackground.classList.remove('clicked');
  }
});