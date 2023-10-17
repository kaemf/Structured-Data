var active = false, activeZoom = false, modal = document.querySelector('.modal'), backModal = document.querySelector('.blackback'), spaceInView = false, context = {
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
document.querySelectorAll('.space').forEach(function (container) {
    container.addEventListener('mousemove', function (e) {
        var containerRect = container.getBoundingClientRect();
        var deltaX = (e.clientX - containerRect.left) - (containerRect.width / 2);
        var deltaY = (e.clientY - containerRect.top) - (containerRect.height / 2);
        container.style.transform = "perspective(800px) rotateX(".concat(deltaY * 0.1, "deg) rotateY(").concat(-deltaX * 0.1, "deg) translateZ(50px)");
        container.style.boxShadow = '0px 0px 3px 3px black';
    });
    container.addEventListener('mouseleave', function () {
        container.style.transform = '';
        container.style.boxShadow = '';
    });
    container.addEventListener('click', function (event) {
        var _a;
        var clickedElement = event.target, currContainer = (_a = clickedElement.closest('.space')) === null || _a === void 0 ? void 0 : _a.getAttribute('context'), dataContext = currContainer === null ? null : context[currContainer]['content'].split(',');
        var stringOfData = '';
        if (!active && currContainer !== null) {
            for (var i = 1; i < dataContext.length; i++) {
                stringOfData += "<li>".concat(dataContext[i], "</li>");
            }
            modal.innerHTML = "\n          <ul>\n            <li>".concat(dataContext[0], "</li>\n            <ol type=\"").concat(context[currContainer]['type'], "\" ").concat(context[currContainer]['start'] === "" ? "" : "start=\"".concat(context[currContainer]['start'], "\""), ">\n              ").concat(stringOfData, "\n            </ol>\n          </ul>\n        ");
            backModal.style.opacity = '1';
            backModal.style.visibility = 'visible';
            container.style.transform = '';
            container.style.boxShadow = '';
            modal.style.transform = 'scale(1)';
            active = true;
        }
    });
});
document.querySelectorAll('[data-scroll-target]').forEach(function (item) {
    item.addEventListener('click', function () {
        var target = document.querySelector(item.dataset.scrollTarget);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
document.addEventListener('click', function (event) {
    var curr = event.target;
    if (active && curr.contains(backModal)) {
        backModal.style.opacity = '0';
        backModal.style.visibility = 'hidden';
        modal.style.transform = 'scale(0)';
        modal.innerHTML = '';
        active = false;
    }
});
modal.addEventListener('click', function (event) {
    if (!activeZoom) {
        modal.style.transform = 'scale(1.5)';
        activeZoom = true;
    }
    else {
        modal.style.transform = 'scale(1)';
        activeZoom = false;
    }
});
