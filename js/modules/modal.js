export function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.toggle('show');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

export function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
}



export function modal(triggerSelector, modalSelector) {

    // modalWindow

    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    
    
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector));
    });

    
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    //const modalTimerId = setTimeout(openModal, 50000); 

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal(modalSelector);
                window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    
}

