import Viewer from "./viewer.js";
import Zoom from "./zoom.js";
import Context from "./context";
import FetchJSON from "./jsonfetch.js";
import Move from "./move.js";

let active : Boolean = false, activeZoom : Boolean = false,
  modal : HTMLElement = document.querySelector('.modal')!,
  backModal : HTMLElement = document.querySelector('.blackback')!,
  pressStartTime : number = 0,
  modalPressStartTime : number = 0;

document.querySelectorAll('.space').forEach((container) => {
  const _container = container as HTMLDivElement;

  _container.addEventListener('mousemove', (e : MouseEvent) => Move(container, _container, e));
  
  _container.addEventListener('mouseleave', () => {
    _container.style.transform = '';
    _container.style.boxShadow = '';
  });

  _container.addEventListener('pointerdown', () => pressStartTime = Date.now());

  _container.addEventListener('pointerup', async (event : Event) => {
    const context : Context = await FetchJSON();
    if (Date.now() - pressStartTime < 200){
      const clickedElement: HTMLDivElement = event.target as HTMLDivElement,
        currContainer: string = clickedElement.closest('.space')!.getAttribute('context')!,
        dataContext : string[] | null = currContainer === null ? null : context[currContainer]['content'].toString().split(',');
  
      if (!active && currContainer !== null && dataContext){
        active = Viewer(dataContext, modal, backModal, _container, context, active, currContainer);
      }
    }
  });
});

document.querySelectorAll('[data-scroll-target]').forEach((item) => {
  item.addEventListener('click', () => {
    const _item = item as HTMLElement,
      target = document.querySelector(_item.dataset.scrollTarget!);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener('click', (event : Event) => {
  const curr = event.target as HTMLElement;

  if (active && curr.contains(backModal)){
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

modal.addEventListener('pointerup', (event : Event) => {
  if (Date.now() - modalPressStartTime < 200){
    activeZoom = Zoom(activeZoom, modal);
  }
});