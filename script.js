// 'use strict';

let money, time, a1, a2, a3, a4;

    money = +prompt('Ваш бюджет на месяц?');
    time = prompt('Введите дату в формате YYYY-MM-DD');
        
    let appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false 
    }

    for (let i = 0; i < 2; i++) {
        a = prompt('Введите обязательную статью расходов в этом месяце', ''),
        b = prompt('Во сколько обойдется?', '');
        if(typeof(a) === 'string' && typeof(a) != null && typeof(b) != null 
            && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
        } else {
            alert('Вы ввели данные в неверном формате, повторите ввод')
            i -= 1;
            continue;
        }
        
    }   

appData.moneyPerDay = Math.round(appData.budget/30, 2);

console.log('бюджет на 1 день ', appData.moneyPerDay);
