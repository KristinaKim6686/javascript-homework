const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  modalLightbox: document.querySelector('.js-lightbox'),
  closeButton: document.querySelector('.lightbox__button'),
  galleryPreview: document.querySelector('.js-gallery'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightBoxImage: document.querySelector('.lightbox__image'),
  galleryPreviewImage: document.querySelectorAll('.gallery__image'),
  dataSource: [],
}
const makeGalleryMarkup = galleryItems => {
  const { preview, original, description } = galleryItems;
  return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
}
const MakeGalleryPreview = galleryItems
  .map(makeGalleryMarkup)
  .join('');

refs.galleryPreview.insertAdjacentHTML('beforeend', MakeGalleryPreview)


// listeners
refs.galleryPreview.addEventListener('click', onOpenModal);
refs.closeButton.addEventListener('click', onCloseModal);
refs.lightboxOverlay.addEventListener('click', onBackdropClick);

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  refs.modalLightbox.classList.add('is-open');

  refs.lightBoxImage.src = event.target.dataset.source;
  console.log(refs.lightBoxImage.src);
}

function onCloseModal() {
  refs.modalLightbox.classList.remove('is-open');
  refs.modalLightbox.setAttribute('src', '');
  // refs.modalLightbox.removeAttribute('src');
}
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    refs.modalLightbox.classList.remove('is-open');
  }
})

// slider
// document.addEventListener('keydown', (e) => {
//   const currentIndex = refs.galleryItems.src;
// });
// function onRightClick(currentIndex) {
//   let nextIndex = currentIndex ? currentIndex : 0;

//   if (nextIndex < refs.galleryItems.length - 1) {
//     nextIndex += 1;
//   } else {
//     nextIndex = 0;
//   }

//   if (e.key === 'ArrowRight') {
//     currentIndex+=1
//   }
// }
document.addEventListener('keydown', (e) => {
  const currentIndex = galleryItems.findIndex(
    (img) => img.original === refs.lightBoxImage.src
  );

  if (e.key === 'ArrowLeft') {
    leftClick(currentIndex);
  } else if (e.key === 'ArrowRight') {
    rightClick(currentIndex);
  }
});
function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex === -1) {
    nextIndex = refs.galleryPreviewImage.length - 1;
  }
  refs.lightBoxImage.src = galleryItems[nextIndex].original;
  refs.lightBoxImage.alt=galleryItems[nextIndex].alt
};
function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex === 0) {
    nextIndex +=galleryItems.length+1;
  }
  refs.lightBoxImage.src = galleryItems[nextIndex].original;
  refs.lightBoxImage.alt=galleryItems[nextIndex].alt
}
