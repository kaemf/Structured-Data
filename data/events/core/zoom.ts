export default function Zoom(activeZoom : Boolean, modal : HTMLElement){
    if (!activeZoom){
        modal.style.transform = 'scale(1.5)';
        return true
    }
    else{
        modal.style.transform = 'scale(1)';
        return false;
    }
}