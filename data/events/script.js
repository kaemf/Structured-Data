var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Viewer from "./viewer.js";
import Zoom from "./zoom.js";
import FetchJSON from "./jsonfetch.js";
import Move from "./move.js";
let active = false, activeZoom = false, modal = document.querySelector('.modal'), backModal = document.querySelector('.blackback'), pressStartTime = 0, modalPressStartTime = 0;
document.querySelectorAll('.space').forEach((container) => {
    const _container = container;
    _container.addEventListener('mousemove', (e) => Move(container, _container, e));
    _container.addEventListener('mouseleave', () => {
        _container.style.transform = '';
        _container.style.boxShadow = '';
    });
    _container.addEventListener('pointerdown', () => pressStartTime = Date.now());
    _container.addEventListener('pointerup', (event) => __awaiter(void 0, void 0, void 0, function* () {
        const context = yield FetchJSON();
        if (Date.now() - pressStartTime < 200) {
            const clickedElement = event.target, currContainer = clickedElement.closest('.space').getAttribute('context'), dataContext = currContainer === null ? null : context[currContainer]['content'].toString().split(',');
            if (!active && currContainer !== null && dataContext) {
                active = Viewer(dataContext, modal, backModal, _container, context, active, currContainer);
            }
        }
    }));
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
