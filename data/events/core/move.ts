export default function Move(container: Element, _container: HTMLElement, e: MouseEvent) {
    const containerRect = container.getBoundingClientRect();

    const deltaX = (e.clientX - containerRect.left) - (containerRect.width / 2);
    const deltaY = (e.clientY - containerRect.top) - (containerRect.height / 2);
    
    _container.style.transform = `perspective(200px) rotateX(${deltaY * 0.001}deg) rotateY(${-deltaX * 0.001}deg) translateZ(10px)`;
    _container.style.boxShadow = '0px 0px 3px 3px black';
}