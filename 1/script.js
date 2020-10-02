'use strict';

// console.log('Запрос данных...');

// const req = new Promise((resolve, reject) => {
    
//     setTimeout(() => {
//         console.log('Подготовка данных...');

//         const product = {
//             name: 'TV',
//             price:2000
//         };

//         resolve(product);

//     }, 2000);
// });

// req.then((product) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             product.status = 'ordered';
            
//             reject();
//         }, 2000);
//     });

// }).then((data) => {
//     data.modify = true;
//     return data;
// }).then((data) => {
//     console.log(data);
// }).catch(() => {
//     console.error('Произошла ошибка');
// }).finally(() => {
//     console.log('Например, чистим форму в finally');
// });

// геттеры и сеттеры

const person = {
    name: 'Alex',
    age: 25,

    get userAge() {
        return this.age;
    },

    set userAge(age) {
        this.age = age;
    }
   
}

person.userAge = 30;
 
console.log(person.userAge);

class User {
    constructor(name, age) {
        this.name = name;
        this._age = age;
    }
    #surname = 'Petrychenko';
    say = () => {
        console.log(`Имя пользователя: ${this.name} ${this.#surname}, возраст ${this._age}`);
    }
    get age() {
        return this._age;
    }
    set age(age) {
        if (typeof age === 'number' && age > 0 && age < 110) {
            this._age = age;
        } else {
            console.log('Недопустимое значение!');
        }
    }
    get surname() {
        return this.#surname;
    }
    set surname(surname) {
        this.#surname = surname;
    }
}

const ivan = new User('Ivan', 27);
console.log(ivan.age);
console.log(ivan.surname);
ivan.surname('Bobko');
ivan.say();