const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const filterButtons = document.querySelectorAll('.filters button');

let currentIndex = 0;
let images = Array.from(galleryItems);

// Show lightbox
function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = 'flex';
  lightboxImg.src = images[currentIndex].src;
}

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Navigate
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

// Open lightbox on image click
images.forEach((img, i) => {
  img.addEventListener('click', () => openLightbox(i));
});

// Filters
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none';
    });

    // Update image list for lightbox
    images = Array.from(document.querySelectorAll('.gallery-item'))
                  .filter(item => item.style.display !== 'none')
                  .map(item => item.querySelector('img'));
  });
});
