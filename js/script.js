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

window.addEventListener('DOMContentLoaded', () => {
    
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

    // Timer

    const deadline = '2020-09-30';

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

    // modalWindow

    const btns = document.querySelectorAll('button');
    const modal = document.querySelector('.modal');
    
    function closeModal() {
        modal.classList.toggle('show');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
    }
    
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
   
    // create cards

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, title, descr, price}) => {
    //             new Card(img, title, descr, price).renderCard();

    //         })
    //     })

    getResource('http://localhost:3000/menu')
        .then(data => createCard(data)); 

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

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...',
    }
    
    
    const forms = document.querySelectorAll('form');

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
        
        if (form.classList.contains('order__form')) {openModal();}
    
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
            closeModal();
        }, 3000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res))

 
});

