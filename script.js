// 'use strict';

let money, time, stage, amount;

    money = prompt('Ваш бюджет на месяц?');
    stage = prompt('Введите обязательную статью расходов в этом месяце');
    amount = prompt('Во сколько обойдется?');
    time = prompt('Введите дату в формате YYYY-MM-DD');
    
    let appData = {
        money: money,
        timeData: time,
        expenses: {
                stage: amount
            },
        optionalExpenses: '',
        income: '',
        savings: false 
    }

alert('бюджет на 1 день ' + Math.round(appData['money']/30, 2));


