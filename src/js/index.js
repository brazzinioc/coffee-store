
//Variables
const btnAuth = document.getElementById('auth');
const listAuthOptions = document.getElementById('auth-options');
const btnMenuMobile = document.getElementById('menu-hamb-mobile');
const btnMenuTablet = document.getElementById('menu-hamb-tablet');
const navNavigation = document.getElementById('navigation');
const btnNavCloser = document.getElementById('navigation-closer');
const header = document.getElementById('header');
const secAdvertisement = document.getElementById('sec-advertisements');
const navTop = document.getElementById('nav-top');
const divMenuTablet = document.getElementById('menu-tablet');

//Functions
function enableCarousel(carouselContainer, numSlidesToShow, dots, arrowPrev, arrowNext, responsiveConfig){
new Glider(document.querySelector(carouselContainer), {
		slidesToShow: numSlidesToShow,
		dots: dots,
		draggable: false,
		rewind: true,
		arrows: {
			prev: arrowPrev,
			next: arrowNext
		},
		responsive: responsiveConfig
	});
};

function showElement(element){
if(element.style.display === 'block'){
	element.style.display = 'none';
} else {
	element.style.display = 'block';
}
}

function enableIntersectionObs() {
	
	let observer = new IntersectionObserver( entries => {

		if(entries[0].isIntersecting){

			let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

			if(vw <= 480) header.classList.remove('p-fixed');

			if(vw > 480 && vw < 1200){
				navTop.classList.remove('d-none');
				menuTablet.classList.remove('p-fixed');
			}

			if(vw > 1200) navNavigation.classList.remove('p-fixed');

		} else {

			let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

			if(vw <= 480) header.classList.add('p-fixed');

			if(vw > 480 && vw < 1200){
				navTop.classList.add('d-none');
				divMenuTablet.classList.add('p-fixed');
			}

			if(vw > 1200) navNavigation.classList.add('p-fixed');
		}
	});

	observer.observe(secAdvertisement);
}

function showFooterList(iconElement, listElement){

	let element = document.getElementById(listElement);
	let icon = document.getElementById(iconElement);
	let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

	if(vw <= 768){
		if(element.style.display === 'block'){
			element.style.display = 'none';
			icon.style.transform = 'rotate(0deg)';
		} else {
			element.style.display = 'block';
			icon.style.transform = 'rotate(180deg)';
		}
	}
}

//Events
btnAuth.addEventListener('click', e => { 
	e.preventDefault(); 
	let headerHeight = document.getElementById('header').clientHeight;
	let menuTablet = document.getElementById('menu-tablet').clientHeight;
	let menuComputer = document.getElementById('navigation').clientHeight;

	listAuthOptions.style.top = `${headerHeight - menuComputer  - menuTablet - 1}px`;

	showElement(listAuthOptions); 

});

btnMenuMobile.addEventListener('click', e => { e.preventDefault(); showElement(navNavigation); });
btnNavCloser.addEventListener('click', e => { e.preventDefault(); showElement(navNavigation); });
btnMenuTablet.addEventListener('click', e => { e.preventDefault(); showElement(navNavigation); });



//Advertisements
enableCarousel('#advertisements', 1, '#advertisements-dots', '#btn-carousel-adv-prev', '#btn-carousel-adv-next', []);

//Featured Products
const fpCarouselConfig = [
	{
		// screens greater than >= 720px
		breakpoint: 768,
		settings: {
			// Set to `auto` and provide item width to adjust to viewport
			slidesToShow: 4,
			slidesToScroll: 'auto',
			itemWidth: 150,
			duration: 0.25
		}
	},{
		// screens greater than >= 1200px
		breakpoint: 1200,
		settings: {
			slidesToShow: 5,
			slidesToScroll: 1,
			itemWidth: 150,
			duration: 0.25
		}
	}];

enableCarousel('#featured-product', 3, '#featured-product-dots', '#btn-carousel-fp-prev', '#btn-carousel-fp-next', fpCarouselConfig);
enableCarousel('#testimonials', 1, '#testimonials-dots', '#btn-carousel-tss-prev', '#btn-carousel-tss-next', []);

enableIntersectionObs();
