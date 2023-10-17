let active : Boolean = false, activeZoom : Boolean = false,
modal : HTMLElement = document.querySelector('.modal') as HTMLElement,
backModal : HTMLElement = document.querySelector('.blackback') as HTMLElement,
spaceInView : Boolean = false,
context = {
  "FO": {
    "content" : "Понеділок,Алгебра,Українська мова,Фізична культура,Іноземна мова,Інформатика,Історія України",
    "type" : 1,
    "start" : 2
  },
  "SO": {
    "content" : "Вівторок,Інформатика,Геометрія,Фізика,Хімія,Зарубіжна література,Алгебра",
    "type" : 1,
    "start" : ""
  },
  "TO": {
    "content" : "Середа,Українська мова,Іноземна мова,Географія,Фізика,Хімія,Алгебра,Зарубіжна література",
    "type" : "a",
    "start" : 5
  },
  "FoO": {
    "content": "Четвер,Історія України,Всесвітня Історія,Хімія,Біологія,Географія,Фізична культура,Українська література",
    "type" : "I",
    "start" : 10
  },
  "FiO": {
    "content" : "Пʼятниця,Алгебра,Іноземна мова,Українська література,Фізика,Геометрія,Біологія,Фізична культура",
    "type" : "i",
    "start" : ""
  }
} as { [key : string] : string | { [key : string] : string | number } }

document.querySelectorAll('.space').forEach((container : HTMLDivElement) => {
    container.addEventListener('mousemove', (e : MouseEvent) => {
      const containerRect = container.getBoundingClientRect();

      const deltaX = (e.clientX - containerRect.left) - (containerRect.width / 2);
      const deltaY = (e.clientY - containerRect.top) - (containerRect.height / 2);
      
      container.style.transform = `perspective(800px) rotateX(${deltaY * 0.1}deg) rotateY(${-deltaX * 0.1}deg) translateZ(50px)`;
      container.style.boxShadow = '0px 0px 3px 3px black';
    });
    
    container.addEventListener('mouseleave', () => {
      container.style.transform = '';
      container.style.boxShadow = '';
    });

    container.addEventListener('click', (event : Event) => {
      const clickedElement: HTMLDivElement = event.target as HTMLDivElement,
      currContainer: string = clickedElement.closest('.space')?.getAttribute('context'),
      dataContext : Array<string> = currContainer === null ? null : context[currContainer]['content'].split(',');
      let stringOfData : string = '';

      if (!active && currContainer !== null){
        for (let i = 1; i < dataContext.length; i++){
          stringOfData += `<li>${dataContext[i]}</li>`;
        }
        modal.innerHTML = `
          <ul>
            <li>${dataContext[0]}</li>
            <ol type="${context[currContainer]['type']}" ${
              context[currContainer]['start'] === "" ? "" : `start="${context[currContainer]['start']}"`
            }>
              ${stringOfData}
            </ol>
          </ul>
        `;

        backModal.style.opacity = '1';
        backModal.style.visibility = 'visible';
        container.style.transform = '';
        container.style.boxShadow = '';
        modal.style.transform = 'scale(1)';
        active = true;
      }
    })
});

document.querySelectorAll('[data-scroll-target]').forEach((item : HTMLElement) => {
  item.addEventListener('click', () => {
    const target = document.querySelector(item.dataset.scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
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

modal.addEventListener('click', (event : Event) => {
  if (!activeZoom){
    modal.style.transform = 'scale(1.5)';
    activeZoom = true;
  }
  else{
    modal.style.transform = 'scale(1)';
    activeZoom = false;
  }
})