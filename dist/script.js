import Zoom from "./zoom.js";
let active = false, activeZoom = false, modal = document.querySelector('.modal'), backModal = document.querySelector('.blackback'), pressStartTime = 0, modalPressStartTime = 0, context = {
    "FO": {
        "content": "Понеділок,Алгебра,Українська мова,Фізична культура,Іноземна мова,Інформатика,Історія України",
        "type": 1,
        "start": 2
    },
    "SO": {
        "content": "Вівторок,Інформатика,Геометрія,Фізика,Хімія,Зарубіжна література,Алгебра",
        "type": 1,
        "start": ""
    },
    "TO": {
        "content": "Середа,Українська мова,Іноземна мова,Географія,Фізика,Хімія,Алгебра,Зарубіжна література",
        "type": "a",
        "start": 5
    },
    "FoO": {
        "content": "Четвер,Історія України,Всесвітня Історія,Хімія,Біологія,Географія,Фізична культура,Українська література",
        "type": "I",
        "start": 10
    },
    "FiO": {
        "content": "Пʼятниця,Алгебра,Іноземна мова,Українська література,Фізика,Геометрія,Біологія,Фізична культура",
        "type": "i",
        "start": ""
    }
};
document.querySelectorAll('.space').forEach((container) => {
    const _container = container;
    _container.addEventListener('mousemove', (e) => {
        const containerRect = container.getBoundingClientRect();
        const deltaX = (e.clientX - containerRect.left) - (containerRect.width / 2);
        const deltaY = (e.clientY - containerRect.top) - (containerRect.height / 2);
        _container.style.transform = `perspective(200px) rotateX(${deltaY * 0.001}deg) rotateY(${-deltaX * 0.001}deg) translateZ(10px)`;
        _container.style.boxShadow = '0px 0px 3px 3px black';
    });
    _container.addEventListener('mouseleave', () => {
        _container.style.transform = '';
        _container.style.boxShadow = '';
    });
    _container.addEventListener('pointerdown', () => {
        pressStartTime = Date.now();
    });
    _container.addEventListener('pointerup', (event) => {
        if (Date.now() - pressStartTime < 200) {
            const clickedElement = event.target, currContainer = clickedElement.closest('.space').getAttribute('context'), dataContext = currContainer === null ? null : context[currContainer]['content'].toString().split(',');
            let stringOfData = '';
            if (!active && currContainer !== null && dataContext) {
                for (let i = 1; i < dataContext.length; i++) {
                    stringOfData += `<li>${dataContext[i]}</li>`;
                }
                modal.innerHTML = `
          <ul>
            <li>${dataContext[0]}</li>
            <ol type="${context[currContainer]['type']}" ${context[currContainer]['start'] === "" ? "" : `start="${context[currContainer]['start']}"`}>
              ${stringOfData}
            </ol>
          </ul>
        `;
                backModal.style.opacity = '1';
                backModal.style.visibility = 'visible';
                _container.style.transform = '';
                _container.style.boxShadow = '';
                modal.style.transform = 'scale(1)';
                active = true;
            }
        }
    });
});
document.querySelectorAll('[data-scroll-target]').forEach((item) => {
    item.addEventListener('click', () => {
        const _item = item, target = document.querySelector(_item.dataset.scrollTarget);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
document.addEventListener('click', (event) => {
    const curr = event.target;
    if (active && curr.contains(backModal)) {
        backModal.style.opacity = '0';
        backModal.style.visibility = 'hidden';
        modal.style.transform = 'scale(0)';
        modal.innerHTML = '';
        active = false;
    }
});
modal.addEventListener('pointerdown', () => {
    modalPressStartTime = Date.now();
});
modal.addEventListener('pointerup', (event) => {
    if (Date.now() - modalPressStartTime < 200) {
        activeZoom = Zoom(activeZoom, modal);
    }
});
