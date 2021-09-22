"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDragAndDrop = void 0;
const handleDragAndDrop = (event) => {
    const chat = event.target;
    let shiftX = event.clientX - chat.getBoundingClientRect().left;
    let shiftY = event.clientY - chat.getBoundingClientRect().top;
    moveAt(event.pageX, event.pageY);
    function moveAt(pageX, pageY) {
        chat.style.left = pageX - shiftX + "px";
        chat.style.top = pageY - shiftY + "px";
    }
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }
    document.addEventListener("mousemove", onMouseMove);
    chat.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        chat.onmouseup = null;
    };
    chat.ondragstart = function () {
        return false;
    };
};
exports.handleDragAndDrop = handleDragAndDrop;
//# sourceMappingURL=dragAndDrop.js.map