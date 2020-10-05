export function slider() {

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

