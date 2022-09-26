import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const galleryContainerEl = document.querySelector('.gallery');

const galleryItemTemplate = ({ preview, original, description }) =>
	`
		<a class="gallery__item" href="${original}">
			<img
				class="gallery__image"
				src="${preview}"
				data-source="${original}"
				alt="${description}"
			/>
		</a>
	`;

const renderUI = () => {
	const imagesListHtml = galleryItems
		.map((image) => galleryItemTemplate(image))
		.join('');
	galleryContainerEl.insertAdjacentHTML('beforeend', imagesListHtml);
};

renderUI();

let gallery = new SimpleLightbox('.gallery a', {
	overlayOpacity: 0.9,
	captionsData: 'alt',
	captionDelay: 250,
});
