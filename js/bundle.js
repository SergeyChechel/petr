/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: calc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calc", function() { return calc; });
function calc() {

    // Calc

    const result = document.querySelector('.calculating__result span');
    let sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : 'female',
        height, weight, age,
        ratio = localStorage.getItem('ratio') ? localStorage.getItem('ratio') : 1.375;
    
    
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = ((447.6 + (9.2 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(0);
        } else {
            result.textContent = ((88.36 + (13.4 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(0);
        }

    }

    addActiveClass(ratio, sex)
    calcTotal();

    function addActiveClass(ratio, sex) {
        if (ratio) {
            const elements = document.querySelectorAll(`[data-ratio]`);
            elements.forEach(el => {
                if ((+el.dataset.ratio) == ratio)  {
                    if (!el.classList.contains('calculating__choose-item_active')) {
                        el.classList.add('calculating__choose-item_active');
                    }
                } else {
                    el.classList.remove('calculating__choose-item_active');
                }
            });
        }

        if (sex) {
            const elements = document.querySelectorAll(`#gender div`);
            elements.forEach(el => {
                if (el.id == sex) {
                    if (!el.classList.contains('calculating__choose-item_active')) {
                        el.classList.add('calculating__choose-item_active');
                    }
                } else {
                    el.classList.remove('calculating__choose-item_active');
                }
            });
        }
    } 
    
    function getStaticInfo(parentSelector, activeClass) {
        
        const elements = document.querySelectorAll(`${parentSelector} div`);
        document.querySelector(parentSelector).addEventListener('click', (e) => {
            if (e.target.classList.contains('calculating__choose-item')) {
                if (e.target.getAttribute('data-ratio')) {
                    ratio =  +e.target.dataset.ratio;
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
                console.log(ratio, sex);
                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            }
            
        });
    }

    getStaticInfo('#gender', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');
    
    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height': 
                    height = +input.value;
                    break;
                case 'weight': 
                    weight = +input.value;
                    break;
                case 'age': 
                    age = +input.value;
                    break;
            }
            calcTotal();
        });

    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');

}



/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: cards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cards", function() { return cards; });
function cards() {

    class Card {
    
        constructor(img, name, text, price, parentSel = '.menu .container', ...classes) {
            this.img = img;
            this.name = name;
            this.text = text;
            this.price = price;
            this.parent = document.querySelector(parentSel);
            this.classes = classes;
            this.transfer = 1;
            this.changeToUAH();
        }
    
        changeToUAH() {
            this.price *= this.transfer; 
        }
    
        renderCard() {
            const el = document.createElement('div');
            if(this.classes.length == 0) {
                el.classList.add('menu__item');
            } else {
                this.classes.forEach(className => el.classList.add(className));
            }
            el.innerHTML = this.create();
            this.parent.append(el);
        }
    
    
        create() {
            return `
                <img src="${this.img}">
                    <h3 class="menu__item-subtitle">${this.name}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            
        }
    
       
    }



        // create cards

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, title, descr, price}) => {
    //             new Card(img, title, descr, price).renderCard();

    //         })
    //     })

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data)); 

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, title, descr, price}) => {
                new Card(img, title, descr, price).renderCard();

            })
        })
    

    function createCard(data) {
        data.forEach(({img, title, descr, price}) => {
            const el = document.createElement('div');
            el.classList.add('menu__item');
            el.innerHTML = `
                <img src="${img}">
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `
            document.querySelector('.menu .container').append(el);
        });
            
    }

    

}



/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: forms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forms", function() { return forms; });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms() {

    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...',
    }


    forms.forEach(item => bindPostData(item));
    
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };
    
    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // const obj = {};
            // formData.forEach(function(value, key) {
            //     obj[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));



            postData('http://localhost:3000/requests', json/*JSON.stringify(obj)*/)
            .then(data => {
                console.log(data);
                showThenksModal(message.success, form);
                statusMessage.remove();
            }).catch(() => {
                showThenksModal(message.failure, form);
            }).finally(() => {
                form.reset();
            });

        });
    }


    function showThenksModal(message, form) {
        
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.toggle('hide');
        
        if (form.classList.contains('order__form')) {Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])();}
    
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title" >${message}</div>
            </div>
        `;
        
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])();
        }, 3000);
    }

    
}



/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: closeModal, openModal, modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modal", function() { return modal; });
function closeModal() {
    modal.classList.toggle('show');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal() {
    modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    
}



function modal() {

    // modalWindow

    const btns = document.querySelectorAll('button');
    const modal = document.querySelector('.modal');
    
    
    
    btns.forEach(btn => {
        if (btn.hasAttribute('data-modal')) {
            btn.addEventListener('click', openModal);
        }
    });

    
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //const modalTimerId = setTimeout(openModal, 50000); 

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

}



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: slider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slider", function() { return slider; });
function slider() {

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res))


    // Slider

    /*const slides = document.querySelectorAll('.offer__slide');
    const sliderCounter = document.querySelector('.offer__slider-counter');
    const _num = document.querySelector('#current');
    const total = document.querySelector('#total');

    sliderCounter.addEventListener('click', (event) => {
        if (event.target.classList.contains('offer__slider-prev') || 
            event.target.getAttribute('alt') == 'prev') {
                showSlide(changeIndex('PREV'));
        }
        if (event.target.classList.contains('offer__slider-next') || 
            event.target.getAttribute('alt') == 'next') {
                showSlide(changeIndex('NEXT'));
        }
    });
    
    function changeIndex(dir = null) {
        const num = +_num.innerText;
        let i = 0;
        if (dir === 'PREV') {
            if (num === 1) {
                i = slides.length - 1;
            } else {
                i = num - 2;
            }
        }
        if (dir === 'NEXT') {
            if (num == slides.length) {
                i = 0
            } else {
                i = num;
            }
        }
        _num.innerText = addZero(i + 1);
        
        return i;
    }

    function addZero(n) {
        let num = '';
        return n < 10 ? num = '0' + n : num += n;
    }

    function showSlide(i = 0) {
        total.innerText = addZero(slides.length);
        for(j = 0; j < slides.length; j++) {
            slides[j].classList.remove('active');
        }
        slides[i].classList.add('active');
    }
    
    
    showSlide();*/

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '.75s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => slide.style.width = width);

    next.addEventListener('click', () => {
        if (offset == parseInt(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        glowDot(slideIndex-1, null);
        current.textContent = addZero(slides.length, slideIndex);
    });
 

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = parseInt(width) * (slides.length - 1);
        } else {
            offset -= parseInt(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        glowDot(slideIndex-1, null);
        current.textContent = addZero(slides.length, slideIndex);
    });

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = `${slides.length}`;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }
    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = `${slideIndex}`;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n); 
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });
    
    // Пластинки навигации под слайдером

    const slider = document.querySelector('.offer__slider');
    const nav = document.createElement('div');
    const dots = [];
    nav.classList.add('carousel-indicators');
    
    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (+current.textContent == (i+1)) {
            dot.classList.add('active');
        }
        dot.setAttribute('data-slide', i+1);
        dot.addEventListener('click', event => showSli(event));
        dots.push(dot);
        nav.append(dot);
    }

    slider.insertAdjacentElement('beforeend', nav);

    function showSli(event) {
        const slide = event.target.dataset.slide;
        slideIndex = slide;
        glowDot(null, event);
        offset = (slide - 1) * parseInt(width);
        slidesField.style.transform = `translateX(-${offset}px)`;
        current.textContent = addZero(slides.length, slide);
    }

    function addZero(amount, index) {
        return amount < 10 ? `0${index}` : index;
    }

    function glowDot(index = null, event = null) {
        dots.forEach(dot => dot.classList.remove('active'));
        if (index || index == 0) {
            dots[index].classList.add('active');
        }
        if (event) {
            event.target.classList.add('active');
        }
    }


}



/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: tabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabs", function() { return tabs; });
function tabs() {

       // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}



/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: timer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return timer; });
function timer() {

        // Timer

        const deadline = '2020-10-30';

        function getTimeRemaining(endtime) {
            const  t = Date.parse(endtime) - Date.parse(new Date()),
                    days = Math.floor(t / (1000*60*60*24)),
                    hours = Math.floor((t / (1000*60*60)) % 24),
                    minutes = Math.floor((t / (1000*60)) % 60),
                    seconds = Math.floor((t / 1000) % 60);
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
    
        function getZero(num) {
            if(num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }
    
        function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                  days = timer.querySelector('#days'),
                  hours = timer.querySelector('#hours'),
                  minutes = timer.querySelector('#minutes'),
                  seconds = timer.querySelector('#seconds'),
                  timeInterval = setInterval(updateClock, 1000);
            
            updateClock();
    
            function updateClock() {
                const t = getTimeRemaining(endtime);  
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
    
                if(t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }      
    
        }
    
        setClock('.timer', deadline);
    

}



/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








window.addEventListener('DOMContentLoaded', () => {

    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["tabs"])();
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["modal"])();
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["timer"])();
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["cards"])();
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_4__["calc"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_5__["forms"])();
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_6__["slider"])();
    
});




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map