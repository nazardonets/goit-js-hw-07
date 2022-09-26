import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const galleryContainerEl = document.querySelector('.gallery');

const galleryItemTemplate = ({ preview, original, description }) =>
	`
	<div class="gallery__item">
		<a class="gallery__link" href="">
			<img
				class="gallery__image"
				src="${preview}"
				data-source="${original}"
				alt="${description}"
			/>
		</a>
	</div>
	`;

const renderUI = () => {
	const imagesListHtml = galleryItems
		.map((image) => galleryItemTemplate(image))
		.join('');
	galleryContainerEl.insertAdjacentHTML('beforeend', imagesListHtml);
};

renderUI();

let modalInstance;

const openModal = (image) => {
	modalInstance = basicLightbox.create(
		`<img src="${image.dataset.source}" alt="${image.alt}"/>`
	);

	modalInstance.show();
};

const closeModal = () => {
	modalInstance.close();
};

const handleClick = (e) => {
	e.preventDefault();

	if (e.target.nodeName === 'IMG' && basicLightbox.visible() === false) {
		return openModal(e.target);
	}

	if (basicLightbox.visible()) {
		return closeModal();
	}
};

const handleKeydown = (e) => {
	let currentIndex = galleryItems.findIndex(
		(elem) => elem.original === modalInstance.element().querySelector('img').src
	);
	let nextIndex = currentIndex + 1;
	let previousIndex = currentIndex - 1;

	if (e.code === 'Escape' && basicLightbox.visible()) {
		return modalInstance.close();
	}

	if (e.code === 'ArrowRight' && basicLightbox.visible() === true) {
		if (nextIndex > galleryItems.length - 1) {
			modalInstance.element().querySelector('img').src =
				galleryItems[0].original;
		} else {
			modalInstance.element().querySelector('img').src =
				galleryItems[currentIndex + 1].original;
		}
	}

	if (e.code === 'ArrowLeft' && basicLightbox.visible() === true) {
		if (previousIndex < 0) {
			modalInstance.element().querySelector('img').src =
				galleryItems[galleryItems.length - 1].original;
		} else {
			modalInstance.element().querySelector('img').src =
				galleryItems[currentIndex - 1].original;
		}
	}
};

galleryContainerEl.addEventListener('click', handleClick);
window.addEventListener('keydown', handleKeydown);
