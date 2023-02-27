const board = document.getElementById("chess-board");
const parentRect = board.getBoundingClientRect() 
let nodeArray = [] 


let distanceX = parentRect.x
let distanceY = parentRect.y 

let chessBoard = {}


for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    let square = document.createElement("div");
    
    square.className = "chess-block";
    square.id = `${i}${j}`;
    if ((i + j) % 2 != 0) {
      square.style.backgroundColor = "#000";
    }
    nodeArray.push(square)
    board.appendChild(square);
  }
}

//_______________________________________Initialization complete________________________________

let figures = {
  pawn:{
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/wp.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "pawn")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      //b.setAttribute('id','pawn')


      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)

   
    },
    take: function(){}, 
    move: function(element, Placedwanted){
      //make sure you run the placement function for the placedwanted argument 
      let currentposition = element.getAttribute("place")
      currentposition =   Number(currentposition)
      if((currentposition + 8)  == Placedwanted){
        return true
      }else if((parseInt(element.getAttribute("move")) == 0) && ((currentposition + 16)  == Placedwanted)){
        return true 
      }else{
        console.log();
        return false
      }
    },
    //replace the big if statement in the valid functio with just the move function 
    valid: function(wantedPosition, piece){


      if(figures.pawn.move((piece), placement(wantedPosition))){
          return true
        }else{
          return false
        }

    }
  }
}

let test = figures.pawn.create(1)


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
  let pieceplacement = elmnt.getAttribute("place")
  if(valid(elmnt) && figures[elmnt.getAttribute("pieceinfo")].valid(nodeArray[placement(elmnt)] , elmnt)){
      let next = placement(elmnt)
      let howmany = Number(elmnt.getAttribute("move"))
      elmnt.style.left = nodeArray[next].offsetLeft + 'px'
      elmnt.style.top = nodeArray[next].offsetTop + 'px'
      elmnt.setAttribute("place", next)
      elmnt.setAttribute("move", howmany+1) 
     
    }else{
      elmnt.style.top = nodeArray[pieceplacement].offsetTop + 'px'
      elmnt.style.left = nodeArray[pieceplacement].offsetLeft + 'px'
      console.log();
    }
    
    document.onmouseup = null;
    document.onmousemove = null;
   
    
  }
}


//_________________________________window logic___________________________________________


const windowRef = window; 
let pagewidth = windowRef.innerWidth; 


windowRef.addEventListener('resize', function() {
  if (windowRef.innerWidth !== pagewidth) {
    console.log('Page width has changed!');
    everything = document.querySelectorAll(".piece")
    
    for(let o = 0; o < everything.length; o++){
      suposedtobe = everything[o].getAttribute("place")
      console.log(suposedtobe);
      everything[o].style.left = nodeArray[suposedtobe].offsetLeft + 'px'
      everything[o].style.top = nodeArray[suposedtobe].offsetTop + 'px'

    }
    pagewidth = windowRef.innerWidth;
  }
});


//NOTES FOR THE FUTURE 

//my two problems are:
//1. lastx and lasty don't work when resizing --- solved
//2. the attribute place does not change  -- working on it 
//3. don't know how to change the move attribute -- working on it


//Future: 

//for the check function use a for loop to just check all of the pieces takind moves and if the king is on those take squares 

