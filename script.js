// 'use strict';
let money, 
    time,
    str1,
    appData;

function start() {
    money = +prompt('Ваш бюджет на месяц?');
    while(isNaN(money) || money == '' || money == null) {
        alert('сумма бюджета обязательна к заполению только числом')
        money = +prompt('Ваш бюджет на месяц?');
    }
    time = prompt('Введите дату в формате YYYY-MM-DD');
    detectDayBudget();
}


function detectDayBudget() {
    appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: chooseOptExpenses(),
        income: chooseIncome(),
        savings: true
    }    
    appData.moneyPerDay = (appData.budget/30).toFixed(2);
}

function detectLevel(summ) {

    if(summ < 100) {
       return 'Доход низкий'; 
    }
    if(summ > 100 && summ < 1000) {
        return 'Доход средний'; 
    }
    if(summ > 1000) {
        return 'Доход высокий'; 
    }

}

function chooseOptExpenses() {
    let optExpenses = {};
    for (let i = 0; i < 3; i++) {
        a = prompt('Статья необязательных расходов?', '');
        if(typeof(a) === 'string' && typeof(a) != null  
            && a != '' && a.length < 50) {
                optExpenses[i] = a;
        } 
        else {
            alert('Вы ввели данные в неверном формате, повторите ввод');
            i -= 1;
        }
    }
    return optExpenses; 
}

function chooseIncome() {
    
    let addIncome = [];
    let b;
    do {
        let a = prompt('Укажите источник дополнительного дохода?', '');
        while(!isNaN(a) || a == '' || a == null) {
            alert('В поле ввода допускаются только строковые данные');
            a = prompt('Источник дополнительного дохода?', '');
        }
        b = prompt('У вас есть еще доп. доход (y/n) ?', '');
        while (!((b == 'y') || (b == 'n'))) {
            alert('В поле ввода допускаются только y - да или n - нет');
            b = prompt('У вас есть еще доп. доход (y/n) ?', '');
        }
    addIncome.push(a);
    } while (b != 'n');
    let str = "Способы доп. заработка: \n";
    addIncome.forEach(function(el, i) {
        str += (++i + ': ' + el + '\n')
    });
    alert(str);
    return addIncome; 
}

function checkSavings() {
    if(appData.savings == true) {
        let save = +prompt('Какова сумма накоплений?'),
            percent = +prompt('Под какой % ?');
        appData.monthIncome = save/100/12*parseInt(percent);
        alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
    }
}

start();
checkSavings();
alert('Ваш бюджет на 1 день составляет ' + appData.moneyPerDay + appData.monthIncome/30 + ' гривен');
str1 = "Наша программа включает в себя данные: \n";
for(key in appData) {
    str1 += (key + ': ' + appData[key] + '\n');
}
console.log(str1);