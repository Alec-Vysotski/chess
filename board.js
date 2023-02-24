const board = document.getElementById("chess-board");
const parentRect = board.getBoundingClientRect() 
let nodeArray = [] 
let leftArray = []
let topArray = []

let distanceX = parentRect.x
let distanceY = parentRect.y 

let chessBoard = {}


for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    let square = document.createElement("div");
    
    square.className = "chess-block";
    square.id = `${i}${j}`;
    if ((i + j) % 2 == 0) {
      square.style.backgroundColor = "#000";
    }
    nodeArray.push(square)
    board.appendChild(square);
  }
}

for(let k = 0; k < nodeArray.length; k++){
  leftArray.push(nodeArray[k].offsetLeft)
  topArray.push(nodeArray[k].offsetTop)
}

let figures = {
  pawn:{
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/wp.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "pawn")
      b.setAttribute('move', 0)
      //b.setAttribute('id','pawn')

      b.style.left = leftArray[position] + 'px'
      b.style.top = topArray[position] + 'px'
      board.appendChild(b)
      //to track the pieces just add left and top to an array 
    },
    valid: function(wantedPosition, pieceLeft, pieceTop){
      if (((parseInt(pieceLeft)) === (wantedPosition.offsetLeft))){
        return true 
      }else{
        console.log(parseInt(pieceLeft))
        console.log(wantedPosition.offsetLeft);
        return false
      }

    }
  }
}

let test = figures.pawn.create(8)
// console.log(test);
// console.log(test.getAttribute("pieceinfo"))

function placement(pos){
  let closest = null 
  let minDist = Infinity
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



function valid(piece){
  if((parseInt(piece.offsetTop) < (distanceY + 480)&&(parseInt(piece.offsetLeft) < (480 + distanceX)))
  &&((parseInt(piece.offsetTop) >= (distanceY - 20) )&&( parseInt(piece.offsetLeft) >= (distanceX-20)))){
    return true
  }else{
    return false
  }
  
}




//-------------------DRAG ELEMENT FUNCTION -------------------

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


    if(valid(elmnt) && figures[elmnt.getAttribute("pieceinfo")].valid(nodeArray[placement(elmnt)] ,lefty, top)){
      let next = placement(elmnt)
      elmnt.style.left = leftArray[next] + 'px'
      elmnt.style.top = topArray[next] + 'px'
      elmnt.place = nodeArray[next].id.split(',')

     
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










//use $(x) to insert an element into 
