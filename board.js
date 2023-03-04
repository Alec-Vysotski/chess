const board = document.getElementById("chess-board");
const parentRect = board.getBoundingClientRect() 
let nodeArray = [] 
let howmany = 0

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    let square = document.createElement("div");
    square.className = "chess-block";
    square.id = `${i}${j}`;
    square.setAttribute("number", howmany)
    howmany++
    if ((i + j) % 2 != 0) {
      square.style.backgroundColor = "#000";
    }
    nodeArray.push(square)
    board.appendChild(square);
  }
}

//_______________________________________Initialization complete________________________________
function checkpossibleMoves(piece, PlacedWantedpos){
  //optimize it by putting the placed piece inside as an argument 
  piecePlace = nodeArray[piece.getAttribute("place")].getAttribute("id")

  let startx = piecePlace.slice(0,1) 
  let starty = piecePlace.slice(1,2)

  //it needs to gets its id since it doesn't have it rn

  let finishx = PlacedWantedpos.id.slice(0,1)
  let finishy = PlacedWantedpos.id.slice(1,2)

  let row = Math.abs(startx - finishx)
  let rowx = Math.abs(starty - finishy);
  let biggest = Math.max(row,rowx)
  console.log(biggest);
  for(let h = 0; h < biggest; h++){

    if(finishy >= starty){
      starty++
    } 
    if(finishx >= startx){
      startx++
    }

    let theBlocksPlace = document.getElementById(`${startx}${starty}`).getAttribute("number") - 1
    let everyPiece = document.querySelectorAll(".piece")

    for(let q = 0; q < everyPiece.length; q++){
      console.log("ran the for loop")
      console.log(everyPiece[q].getAttribute("place"), theBlocksPlace)

      if(everyPiece[q].getAttribute("place") == theBlocksPlace){
        console.log("falsy");
        return false        
      }
    }
    //returns how many blocks away?
  } 
  console.log("everything finished");
  return true
}




let figures = {
  valid: function(piece){
    let elementRect = piece.getBoundingClientRect()
    let divRect = board.getBoundingClientRect()

    if(elementRect.left >= (divRect.left -= 20) && elementRect.right <= (divRect.right+=20) &&
      elementRect.top >= divRect.top && elementRect.bottom <= (divRect.bottom += 20)){
        return true
      }else{
        return false
      }
  },
  wPawn:{
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/wp.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "wPawn")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
    },

    take: function(){}, 

    move: function(element, Placedwanted){
      //make sure you run the placement function for the placedwanted argument 
      currentposition = Number(element.getAttribute("place"))
      if((((currentposition + 8)  == Placedwanted)||((parseInt(element.getAttribute("move")) == 0) && ((currentposition + 16)  == Placedwanted)))){
        return true
      }else{
        return false
      }
    },
    valid: function(wantedPosition, piece){
      
      if(this.move((piece), placement(wantedPosition))&& checkpossibleMoves(piece, wantedPosition)){
          return true
        }else{
          return false
        }
      
      }
    }
  }
  

figures.wPawn.create(9)
figures.wPawn.create(1)


function placement(pos){
  let closest = null 
  let minDist = Infinity
  for(let p = 0; p < nodeArray.length; p++){
    const distX = Math.abs(pos.offsetLeft - nodeArray[p].offsetLeft);
    const distY = Math.abs(pos.offsetTop - nodeArray[p].offsetTop);
    const dist = Math.sqrt(distX * distX + distY * distY);
    if (dist < minDist) {
      minDist = dist;
      closest = p;
    }
    
  }
  return(closest)

}



//-------------------DRAG ELEMENT FUNCTION -------------------


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;    
         

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.zIndex = "100"
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  
    }

  function closeDragElement(e) {
  let pieceplacement = elmnt.getAttribute("place")
  if(figures.valid(elmnt) && figures[elmnt.getAttribute("pieceinfo")].valid(nodeArray[placement(elmnt)] , elmnt)){
      let next = placement(elmnt)
      let howmany = Number(elmnt.getAttribute("move"))
      elmnt.style.left = nodeArray[next].offsetLeft + 'px'
      elmnt.style.top = nodeArray[next].offsetTop + 'px'
      elmnt.setAttribute("place", next)
      elmnt.setAttribute("move", howmany+1) 
     
    }else{
      elmnt.style.top = nodeArray[pieceplacement].offsetTop + 'px'
      elmnt.style.left = nodeArray[pieceplacement].offsetLeft + 'px'
    }
    
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.zIndex = "10"
    
  }
}


//_________________________________window logic___________________________________________


const windowRef = window; 
let pagewidth = windowRef.innerWidth; 


windowRef.addEventListener('resize', function() {
  if (windowRef.innerWidth !== pagewidth) {
    everything = document.querySelectorAll(".piece")
    
    for(let o = 0; o < everything.length; o++){
      suposedtobe = everything[o].getAttribute("place")
      everything[o].style.left = nodeArray[suposedtobe].offsetLeft + 'px'
      everything[o].style.top = nodeArray[suposedtobe].offsetTop + 'px'

    }
    pagewidth = windowRef.innerWidth;

  }
});



//Future: 
//make black pieces 
//make moves over other pieces impossible 

//for the check function use a for loop to just check all of the pieces taking moves and if the king is on those take squares 
//test
