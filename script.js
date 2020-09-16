// 'use strict';

function detectDayBudget() {
    let money, time;

        money = +prompt('Ваш бюджет на месяц?');
        time = prompt('Введите дату в формате YYYY-MM-DD');
            
        let appData = {
            budget: money,
            timeData: time,
            expenses: {},
            optionalExpenses: chooseOptExpenses(),
            income: [],
            savings: false 
        }

    appData.moneyPerDay = (appData.budget/30).toFixed(2);
    alert('Ваш бюджет на 1 день составляет ' + appData.moneyPerDay + ' гривен');
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
            alert('Вы ввели данные в неверном формате, повторите ввод')
            i -= 1;
            continue;
        }
    }
    return optExpenses; 
}

detectDayBudget();