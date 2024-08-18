export default function Viewer(dataContext: string[], modal: HTMLElement, backModal: HTMLElement, _container: HTMLElement, context: any, active: Boolean, currContainer: string) {
  let stringOfData : string = '';
  
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
  _container.style.transform = '';
  _container.style.boxShadow = '';
  modal.style.transform = 'scale(1)';
  return true;
}