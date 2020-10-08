import 'nodelist-foreach-polyfill';
var Promise = require('es6-promise').Promise;
import {tabs} from './modules/tabs';
import {modal} from './modules/modal';
import {timer} from './modules/timer';
import {cards} from './modules/cards';
import {calc} from './modules/calc';
import {forms} from './modules/forms';
import {slider} from './modules/slider';


window.addEventListener('DOMContentLoaded', () => {

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal');
    timer('.timer', '2020-11-11');
    cards();
    calc();
    forms('form', '.modal');
    slider({
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    
});


