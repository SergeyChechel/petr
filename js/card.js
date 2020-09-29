export default class Card {

    constructor(img, name, text, price, parentSel, ...classes) {
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
