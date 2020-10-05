import {closeModal, openModal} from './modal';

export function forms() {

    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...',
    }


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

    
}

