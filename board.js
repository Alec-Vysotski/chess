const board = document.getElementById("chess-board");
const parentRect = board.getBoundingClientRect() 
let nodeArray = [] 
let leftArray = []
let topArray = []

let distanceX = parentRect.x
let distanceY = parentRect.y 


for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    var square = document.createElement("div");
    nodeArray.push(square)
    square.className = "chess-block";
    square.id = `${i}${j}`;
    if ((i + j) % 2 == 0) {
      square.style.backgroundColor = "#000";
    }
    board.appendChild(square);
  }
}

for(let k = 0; k < nodeArray.length; k++){
  leftArray.push(nodeArray[k].offsetLeft)
  topArray.push(nodeArray[k].offsetTop)
}

const placement = function(pos){
  let closest = null 
  let minDist = 10000
  for(let p = 0; p < nodeArray.length; p++){
    const distX = Math.abs(pos.offsetLeft - leftArray[p]);
    const distY = Math.abs(pos.offsetTop - topArray[p]);
    const dist = Math.sqrt(distX * distX + distY * distY);
    if (dist < minDist) {
      minDist = dist;
      closest = p;
    }
    
  }
  return(closest)

}



const valid = function(piece){
  if((parseInt(piece.offsetTop) < (distanceY + 449)&&(parseInt(piece.offsetLeft) < (449 + distanceX)))
  &&((parseInt(piece.offsetTop) >= (0 + distanceY) )&&( parseInt(piece.offsetLeft) >= (0+distanceX)))){
    return true
    //you can later use this to check if the move is valid by the rules
  }else{
    return false
  }
  
}


dragElement(document.querySelector('.piece'))

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    let top = elmnt.style.top 
    let lefty = elmnt.style.left

  

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    ogx = e.clientX
    ogy = e.clientY
    document.onmouseup = closeDragElement;
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
    
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement(e) {
    /* stop moving when mouse button is released:*/
    if(valid(elmnt)){
      let next = placement(elmnt)
      elmnt.style.left = leftArray[next] + 'px'
      elmnt.style.top = topArray[next] + 'px'
    
    }else{
      elmnt.style.top = top 
      elmnt.style.left = lefty
    }
    
    document.onmouseup = null;
    document.onmousemove = null;
    top = elmnt.style.top 
    lefty = elmnt.style.left
    
  }
}











