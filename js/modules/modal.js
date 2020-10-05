export function closeModal() {
    modal.classList.toggle('show');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

export function openModal() {
    modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    
}



export function modal() {

    // modalWindow

    const btns = document.querySelectorAll('button');
    const modal = document.querySelector('.modal');
    
    
    
    btns.forEach(btn => {
        if (btn.hasAttribute('data-modal')) {
            btn.addEventListener('click', openModal);
        }
    });

    
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //const modalTimerId = setTimeout(openModal, 50000); 

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

}

