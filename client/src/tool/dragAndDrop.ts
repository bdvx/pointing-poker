export const handleDragAndDrop = (event: any) => {
  const chat = event.target;
  if (!chat.classList.contains("draggable")) return;

  let shiftX = event.clientX - chat.getBoundingClientRect().left;
  let shiftY = event.clientY - chat.getBoundingClientRect().top;

  moveAt(event.pageX, event.pageY);
  function moveAt(pageX: number, pageY: number) {
    chat.style.left = pageX - shiftX + "px";
    chat.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event: any) {
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
