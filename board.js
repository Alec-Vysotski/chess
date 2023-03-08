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

  if(piece.getAttribute("place")==(PlacedWantedpos.getAttribute("number"))){
    return false
  }
  console.log(PlacedWantedpos);
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
        //console.log(theBlocksPlace, PlacedWantedpos);
        console.log("falsy");
        //console.log(document.getElementById(`${startx}${starty}`).getAttribute("number") );
        return false        
      }
      if((comparingPiece == theBlocksPlace)&&((piece.getAttribute("color")==everyPiece[i].getAttribute("color"))||(!figures[piece.getAttribute("pieceinfo")].take(piece, PlacedWantedpos.getAttribute("number"))))){
        console.log("bro is testing friendly fire");
        return false
      }
    } 

  } 
  for(let i = 0; i < everyPiece.length; i++){
    let comparingPiece = everyPiece[i].getAttribute("place")
    let color = piece.getAttribute("color")
      let othercolor = everyPiece[i].getAttribute("color")
    if((comparingPiece == PlacedWantedpos.getAttribute("number")) && (figures[piece.getAttribute("pieceinfo")].take(piece, PlacedWantedpos.getAttribute("number")))&&(color != othercolor) ){
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

    take: function(piece, placedwanted,){
      //might have to give the wanted position the piece in question to check its color 
  
      let piecepos = Number(piece.getAttribute("place"))
      if(((piecepos+7 == placedwanted) || (piecepos+9 == placedwanted))){
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

    take: function(piece, placedwanted){
      //might have to give the wanted position the piece in question to check its color 

      let piecepos = Number(piece.getAttribute("place"))
      if((((piecepos-7 )== placedwanted) || ((piecepos-9) == placedwanted))){
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
    take: function(element, placedwanted){
      return this.move(element, placedwanted)
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
    take: function(element, placedwanted){
      return this.move(element, placedwanted)
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
    take: function(element, placedwanted){
      return this.move(element, placedwanted)
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
  },
  bRook:{
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/br.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "bRook")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      b.setAttribute("color", "b")
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
    },
    take: function(element, placedwanted){
      return this.move(element, placedwanted)
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
  },
  wQueen:{
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/wq.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "wQueen")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      b.setAttribute("color", "w")
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
    },
    take: function(element, placedwanted){
      return this.move(element, placedwanted)
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
      }else if((Math.abs(startx - finishx))==(Math.abs(starty - finishy))){
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
  bQueen:{
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/bq.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "bQueen")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      b.setAttribute("color", "b")
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
    },
    take: function(element, placedwanted){
      return this.move(element, placedwanted)
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
      }else if((Math.abs(startx - finishx))==(Math.abs(starty - finishy))){
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
  wKnight: {
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/wkn.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "wKnight")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      b.setAttribute("color", "w")
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
    },
    take: function(takingPiece){
      takingPiece.remove()
    }, 
    move: function(element, placedwanted){
      let piecepos = Number(element.getAttribute("place"))
      if((((piecepos-17 )== placedwanted) || ((piecepos-15) == placedwanted)||((piecepos-10) == placedwanted)||((piecepos+6) == placedwanted)||((piecepos+15) == placedwanted)||((piecepos+17) == placedwanted)||
      ((piecepos-6) == placedwanted)||((piecepos+10) == placedwanted))){
        return true
      }else{
        return false
      }
  },
  valid: function(wantedPosition, piece){
    if(HowManyMoves % 2 != 0){
      return false
    }
    let everyPiece = document.querySelectorAll(".piece")
    let wantedpos = placement(wantedPosition)
    for(let i = 0; i < everyPiece.length; i++ ){
      if((!this.move(piece, wantedpos))){
        return false
      }
      if((everyPiece[i].getAttribute("place") == wantedpos)&&(everyPiece[i].getAttribute("color")==piece.getAttribute("color"))){
        return false
      }if(everyPiece[i].getAttribute("place")==wantedpos){
        this.take(everyPiece[i])
      }
    }
    return true

  }
  },
  bKnight: {
    
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/bkn.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "bKnight")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      b.setAttribute("color", "b")
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
    },
    take: function(takingPiece){
      takingPiece.remove()
    }, 
    move: function(element, placedwanted){
      let piecepos = Number(element.getAttribute("place"))
      if((((piecepos-17 )== placedwanted) || ((piecepos-15) == placedwanted)||((piecepos-10) == placedwanted)||((piecepos+6) == placedwanted)||((piecepos+15) == placedwanted)||((piecepos+17) == placedwanted)||
      ((piecepos-6) == placedwanted)||((piecepos+10) == placedwanted))){
        return true
      }else{
        return false
      }
  },
  valid: function(wantedPosition, piece){
    if(HowManyMoves % 2 == 0){
      return false
    }
    let everyPiece = document.querySelectorAll(".piece")
    let wantedpos = placement(wantedPosition)
    for(let i = 0; i < everyPiece.length; i++ ){
      if((!this.move(piece, wantedpos))){
        return false
      }
      if((everyPiece[i].getAttribute("place") == wantedpos)&&(everyPiece[i].getAttribute("color")==piece.getAttribute("color"))){
        return false
      }if(everyPiece[i].getAttribute("place")==wantedpos){
        this.take(everyPiece[i])
      }
    }
    return true

  }
  },
  wKing: {
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/wk.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "wKing")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      b.setAttribute("color", "w")
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
    },
    take: function(element, placedwanted){
      return this.move(element, placedwanted)
    },  
    move: function(element, Placedwanted){
      //make sure you run the placement function for the placedwanted argument 
      currentposition = Number(element.getAttribute("place"))
      if(((currentposition + 8)  == Placedwanted)||((currentposition + 9)  == Placedwanted)
      ||((currentposition + 7)  == Placedwanted)||((currentposition + 1)  == Placedwanted)||
      ((currentposition -1 )  == Placedwanted)||((currentposition - 8)  == Placedwanted)||
      ((currentposition - 7)  == Placedwanted)||((currentposition - 9)  == Placedwanted)){ 
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
  bKing: {
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/bk.png")
      b.setAttribute('class', 'piece')
      b.setAttribute('pieceinfo', "bKing")
      b.setAttribute('move', 0)
      b.setAttribute('place', position)
      b.setAttribute("color", "b")
      b.style.left = nodeArray[position].offsetLeft + 'px'
      b.style.top = nodeArray[position].offsetTop + 'px'
      board.appendChild(b)
      dragElement(b)
    },
    take: function(element, placedwanted){
      return this.move(element, placedwanted)
    }, 
    move: function(element, Placedwanted){
      //make sure you run the placement function for the placedwanted argument 
      currentposition = Number(element.getAttribute("place"))
      if(((currentposition + 8)  == Placedwanted)||((currentposition + 9)  == Placedwanted)
      ||((currentposition + 7)  == Placedwanted)||((currentposition + 1)  == Placedwanted)||
      ((currentposition -1 )  == Placedwanted)||((currentposition - 8)  == Placedwanted)||
      ((currentposition - 7)  == Placedwanted)||((currentposition - 9)  == Placedwanted)){ 
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

  }
  

figures.wPawn.create(8)
figures.wPawn.create(9)
figures.wPawn.create(10)
figures.wPawn.create(11)
figures.wPawn.create(12)
figures.wPawn.create(13)
figures.wPawn.create(14)
figures.wPawn.create(15)
figures.wRook.create(0)
figures.wRook.create(7)
figures.wKnight.create(1)
figures.wKnight.create(6)
figures.wBishop.create(2)
figures.wBishop.create(5)
figures.wQueen.create(3)
figures.wKing.create(4)

figures.bPawn.create(48)
figures.bPawn.create(49)
figures.bPawn.create(50)
figures.bPawn.create(51)
figures.bPawn.create(52)
figures.bPawn.create(53)
figures.bPawn.create(54)
figures.bPawn.create(55)
figures.bRook.create(63)
figures.bRook.create(56)

figures.bKnight.create(57)
figures.bKnight.create(62)
figures.bBishop.create(58)
figures.bBishop.create(61)
figures.bQueen.create(60)
figures.bKing.create(59)


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
function upgrading(){
  let everyPiece = document.querySelectorAll(".piece")
  for(let i = 0; i < everyPiece.length; i++){
    let where = everyPiece[i].getAttribute("place")
    if(everyPiece[i].getAttribute("color")=="w"){
      if((everyPiece[i].getAttribute("pieceinfo")=="wPawn")&&(where>55)){
          everyPiece[i].remove()
          figures.wQueen.create(where)
        }
        
    }else{
      if((everyPiece[i].getAttribute("pieceinfo")=="bPawn")&&(where<8)){
        everyPiece[i].remove()
        figures.bQueen.create(where)
      }
    }

  }
      
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
      upgrading()
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
//create rules for check, checkmate and draws(when repeating moves)