export default function Zoom(activeZoom, modal) {
    if (!activeZoom) {
        modal.style.transform = 'scale(1.5)';
        return true;
    }
    else {
        modal.style.transform = 'scale(1)';
        return false;
    }
}
