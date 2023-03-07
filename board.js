const board = document.getElementById("chess-board");
const parentRect = board.getBoundingClientRect() 
let nodeArray = [] 
let howmany = 0
let HowManyMoves = 0

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    let square = document.createElement("div");
    square.className = "chess-block";
    square.id = `${i}${j}`;
    square.setAttribute("number", howmany)
    howmany++
    if ((i + j) % 2 != 0) {
      square.style.backgroundColor = "#747270";
    }
    nodeArray.push(square)
    board.appendChild(square);
  }
}

//_______________________________________Initialization complete________________________________
function checkpossibleMoves(piece, PlacedWantedpos){

  piecePlace = nodeArray[piece.getAttribute("place")].getAttribute("id")

  if((piece.getAttribute("color") == "w") && (HowManyMoves % 2 != 0)){
    return false
  }

  if((piece.getAttribute("color") == "b") && (HowManyMoves % 2 == 0)){
    return false
  }

  let startx = piecePlace.slice(0,1) 
  let starty = piecePlace.slice(1,2)


  let finishx = PlacedWantedpos.id.slice(0,1)
  let finishy = PlacedWantedpos.id.slice(1,2)

  let everyPiece = document.querySelectorAll(".piece")
  let goingBackwardsY = starty > finishy
  let goingBackwardsX = startx > finishx 

  let row = Math.abs(startx - finishx)
  let rowy = Math.abs(starty - finishy);
  let biggest = Math.max(row,rowy)

  for(let h = 0; h < biggest; h++){
  
    if((rowy > 0 ) && (!goingBackwardsY)){
      starty++ 
      rowy--
    }

    if((row > 0) &&(!goingBackwardsX)){
      startx++
      row--
    }

    if((rowy > 0)&& (goingBackwardsY)){
      starty--
      rowy--
    } 
    if((row > 0)&&(goingBackwardsX)){
      startx--
      row--
    }

    let theBlocksPlace = document.getElementById(`${startx}${starty}`).getAttribute("number") 
    console.log(document.getElementById(`${startx}${starty}`));
    
    for(let i = 0; i < everyPiece.length; i++){
      let comparingPiece = everyPiece[i].getAttribute("place")
      if((comparingPiece == theBlocksPlace)&&(theBlocksPlace != PlacedWantedpos.getAttribute("number"))){
        console.log(theBlocksPlace, PlacedWantedpos);
        console.log("falsy");
        console.log(document.getElementById(`${startx}${starty}`).getAttribute("number") );
        return false        
      }
      if((comparingPiece == theBlocksPlace)&&((piece.getAttribute("color")==everyPiece[i].getAttribute("color"))||(!figures[piece.getAttribute("pieceinfo")].take(piece, PlacedWantedpos.getAttribute("number"), everyPiece[i])))){
        console.log("bro is testing friendly fire");
        return false
      }
    } 

  } 
  for(let i = 0; i < everyPiece.length; i++){
    let comparingPiece = everyPiece[i].getAttribute("place")
    if((comparingPiece == PlacedWantedpos.getAttribute("number")) && (figures[piece.getAttribute("pieceinfo")].take(piece, PlacedWantedpos.getAttribute("number"), everyPiece[i]))){
      everyPiece[i].remove()
      console.log("deleted");
      return true 
    }}

  if(figures[piece.getAttribute("pieceinfo")].move(piece, PlacedWantedpos.getAttribute("number")) == false){
    ("not happening")
    return false
  }
  


  return true

}

//coments for this function:
//it only works for pawns and with my bishop I can just skip over everything. Also the if statement
//checking if the move is legal is not only not doing its job but also messing up

//___________________________________________Main Figures_________________________

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
      b.setAttribute("color", "w")
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
    },

    take: function(piece, placedwanted, otherpiece){
      //might have to give the wanted position the piece in question to check its color 
      let color = piece.getAttribute("color")
      let othercolor = otherpiece.getAttribute("color")
      let piecepos = Number(piece.getAttribute("place"))
      if((color != othercolor)&&((piecepos+7 == placedwanted) || (piecepos+9 == placedwanted))){
        return true
      }else{
        return false
      }
      
    }, 

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
      
      if(checkpossibleMoves(piece, wantedPosition)){
          return true
        }else{
          return false
        }
      
      }
    },


  bPawn: {
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/bp.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "bPawn")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      b.setAttribute("color","b")
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
    },

    take: function(piece, placedwanted, otherpiece){
      //might have to give the wanted position the piece in question to check its color 
      let color = piece.getAttribute("color")
      let othercolor = otherpiece.getAttribute("color")
      let piecepos = Number(piece.getAttribute("place"))
      if((color != othercolor)&&(((piecepos-7 )== placedwanted) || ((piecepos-9) == placedwanted))){
        return true
      }else{
        return false
      }
      
    }, 

    move: function(element, Placedwanted){
      //make sure you run the placement function for the placedwanted argument 
      currentposition = Number(element.getAttribute("place"))
      //doesn't work for taking but works for collision ?????
      if((((currentposition - 8)  == Placedwanted)||((parseInt(element.getAttribute("move")) == 0) && ((currentposition - 16)  == Placedwanted)))){
        return true
      }else{
        console.log(element, Placedwanted);
        return false
      }
    },
    valid: function(wantedPosition, piece){
      
      if(checkpossibleMoves(piece, wantedPosition)){
          return true
        }else{
          return false
        }
      
      }
  }, 

  wBishop: {
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/wb.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "wBishop")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      b.setAttribute("color", "w")
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
      
    },
    take: function(){
      return true
    }, 
    move: function(element, Placedwanted){
      
      let piecePlaces = nodeArray[element.getAttribute("place")].getAttribute("id")
      let PlacedWantedpos = nodeArray[Placedwanted].getAttribute("id")
      console.log(PlacedWantedpos);


      let startx = piecePlaces.slice(0,1) 
      let starty = piecePlaces.slice(1,2)
    
      let finishx = PlacedWantedpos.slice(0,1)
      let finishy = PlacedWantedpos.slice(1,2)

      if((Math.abs(startx - finishx))==(Math.abs(starty - finishy))){
        return true 
      }else{
        return false
      }

    },
    valid: function(wantedPosition, piece){
      if(checkpossibleMoves(piece, wantedPosition)){
        return true
      }else{
        return false
      }
    }

    
  },

  bBishop: {
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/bb.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "bBishop")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      b.setAttribute("color", "b")
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
      
    },
    take: function(){
      return true
    }, 
    move: function(element, Placedwanted){
      
      let piecePlaces = nodeArray[element.getAttribute("place")].getAttribute("id")
      let PlacedWantedpos = nodeArray[Placedwanted].getAttribute("id")
      console.log(PlacedWantedpos);


      let startx = piecePlaces.slice(0,1) 
      let starty = piecePlaces.slice(1,2)
    
      let finishx = PlacedWantedpos.slice(0,1)
      let finishy = PlacedWantedpos.slice(1,2)

      if((Math.abs(startx - finishx))==(Math.abs(starty - finishy))){
        return true 
      }else{
        return false
      }

    },
    valid: function(wantedPosition, piece){
      if(checkpossibleMoves(piece, wantedPosition)){
        return true
      }else{
        return false
      }
    }

    
  },
  wRook:{
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/wr.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "wRook")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      b.setAttribute("color", "w")
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
    },
    take: function(){
      return true
    }, 
    move: function(element, Placedwanted){
      
      let piecePlaces = nodeArray[element.getAttribute("place")].getAttribute("id")
      let PlacedWantedpos = nodeArray[Placedwanted].getAttribute("id")
      console.log(PlacedWantedpos);


      let startx = piecePlaces.slice(0,1) 
      let starty = piecePlaces.slice(1,2)
    
      let finishx = PlacedWantedpos.slice(0,1)
      let finishy = PlacedWantedpos.slice(1,2)

      if((startx == finishx)&&(starty != finishy)){
        return true 
      }else if((starty == finishy)&&(startx != finishx)){
        return true
      }else{
        return false
      }

    },
    valid: function(wantedPosition, piece){
      if(checkpossibleMoves(piece, wantedPosition)){
        return true
      }else{
        return false
      }
    }
  }
  
  }
  

figures.wPawn.create(10)
figures.wPawn.create(1)
figures.bPawn.create(34)
figures.bPawn.create(41)
figures.wBishop.create(25)
figures.bBishop.create(45)
figures.wRook.create(0)

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
      HowManyMoves++

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

//for the upgrading pawn function create a text box and whichever piece they select first 
//remove the pawn and then create that piece in the same position (also if you want to make it easier on yourself
//just automatically promote it to a queen