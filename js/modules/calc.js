export function calc() {

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

