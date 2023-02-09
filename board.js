var board = document.getElementById("chess-board");


for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    var square = document.createElement("div");
    square.className = "chess-block";
    square.id = `${i}${j}`;
    if ((i + j) % 2 == 0) {
      square.style.backgroundColor = "#000";
    }
    board.appendChild(square);
  }
}

const placement = function (pos){

return(Math.round(pos/60)*60)
};

dragElement(document.querySelector('.piece'))

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    
    elmnt.style.top = (elmnt.offsetTop - pos2) > 480 ? elmnt.style.top : elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos2) > 480 ? elmnt.style.left : elmnt.style.left = (elmnt.offsetLeft- pos1) + "px";
    //elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement(e) {
    /* stop moving when mouse button is released:*/
    elmnt.style.top = placement(elmnt.offsetTop - pos2)+10 + "px";
    elmnt.style.left = placement(elmnt.offsetLeft - pos1)+7 + "px";
    console.log(elmnt.style.left)
    document.onmouseup = null;
    document.onmousemove = null;
    
    
  }
}











