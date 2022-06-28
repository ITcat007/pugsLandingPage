/*
=================================
Слайдер в reviews c фиолетовыми кнопками
*/
const images = document.querySelectorAll('.reviews__photo img');
const sliderLine = document.querySelector('.reviews__photo');
let count = 0;
let width;

function init(){
	width = document.querySelector('.reviews__slider').offsetWidth;
	sliderLine.style.width = width*images.length + 'px';
	images.forEach(item =>{
		item.style.width = width + 'px';
		item.style.height = 'auto';
	})
	rollSlider();
}
window.addEventListener('resize', init);
init();

document.querySelector('.reviews__buttonPrev').addEventListener('click', function (){
	count--;
	if (count < 0){
		count = images.length - 1;
	}
	rollSlider();
});

document.querySelector('.reviews__buttonNext').addEventListener('click', function (){
	count++;
	if (count >= images.length){
		count = 0;
	}
	rollSlider();
});

/*
=================================
+ белые кнопки, размещенные поверх слайдера - для маленьких экранов
*/
document.querySelector('.reviews__button_min-Prev').addEventListener('click', function (){
	count--;
	if (count < 0){
		count = images.length - 1;
	}
	rollSlider();
});

document.querySelector('.reviews__button_min-Next').addEventListener('click', function (){
	count++;
	if (count >= images.length){
		count = 0;
	}
	rollSlider();
});

function rollSlider(){
	sliderLine.style.transform = 'translate(-'+count*width+'px)';
}

/*
=================================
"Липкая" (вторая) шапка
*/
let header = document.querySelector('.header-js');
let headerH = document.querySelector('.header-js').clientHeight;

document.onscroll = function(){
	let scroll = window.scrollY;
	if (scroll > headerH) {
		header.classList.add('fixed');
		
	} else {
		header.classList.remove('fixed');
	}
}

/*
=================================
определение touch-устройства
*/ 
const isMobile = {
	Android: function(){
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function(){
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function(){
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function(){
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function(){
		return navigator.userAgent.match(/IEMobile/i);
	},
	any:function(){
		return(
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()		
		);
	}
};

/*
=================================
Добавление классов touch, pc; active для li, если нажата стрелка
*/ 
if(isMobile.any()){
	document.body.classList.add('_touch');
	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0){
		for(let i = 0; i<menuArrows.length;i++){
			const menuArrow = menuArrows[i];
			menuArrow.addEventListener('click', function(e){
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	} 
}else{
	document.body.classList.add('_pc');	
}

/*
=================================
Добавление классов lock для body и active для меню (при его открытии)
*/ 
const burgerMenu = document.querySelector('.menu__burger');
const menuBody = document.querySelector('.menu__body');

if(burgerMenu){
	burgerMenu.addEventListener('click', function(e){
		document.body.classList.toggle('_lock');
		burgerMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

/*
=================================
Прокрутка до "якорей"
*/ 
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if(menuLinks.length > 0){
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkClick);
	});
	function onMenuLinkClick(e){
		const menuLink = e.target;  /*получаем цел.объект,на котором клик(ссылка)*/
		/*проверка заполнен ли атрибут goto и существует ли объект перехода*/
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			/*получаем S от верха браузера + кол-во прокруч.px - h шапки*/
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
			if(burgerMenu.classList.contains('_active')){
				document.body.classList.remove('_lock');
				burgerMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}
			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			/*отключение перехода href*/ 
			e.preventDefault();
			
		}
	}
}

