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

whosMove()
//_______________________________________Initialization complete________________________________
function checkpossibleMoves(piece, PlacedWantedpos){

  piecePlace = nodeArray[piece.getAttribute("place")].getAttribute("id")

  if(piece.getAttribute("place")==(PlacedWantedpos.getAttribute("number"))){
    return false
  }
 
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

    
    for(let i = 0; i < everyPiece.length; i++){
      let comparingPiece = everyPiece[i].getAttribute("place")
      if((comparingPiece == theBlocksPlace)&&(theBlocksPlace != PlacedWantedpos.getAttribute("number"))){
        return false        
      }
      if((comparingPiece == theBlocksPlace)&&((piece.getAttribute("color")==everyPiece[i].getAttribute("color"))||(!figures[piece.getAttribute("pieceinfo")].take(piece, PlacedWantedpos.getAttribute("number"))))){
        console.log("bro is testing friendly fire");
        return false
      }
    } 

  } 
  for(let i = 0; i < everyPiece.length; i++){
    let comparingPiece = Number(everyPiece[i].getAttribute("place"))
    let color = piece.getAttribute("color")
    let othercolor = everyPiece[i].getAttribute("color")

    if(piece.getAttribute("pieceinfo")==("wKing")&&(piece.getAttribute("move")==0)&&(everyPiece[i].getAttribute("move")==0)){
      console.log("castle");
    
      if((comparingPiece == (Number(PlacedWantedpos.getAttribute("number"))+1))&&(everyPiece[i].getAttribute("pieceinfo")=="wRook")){
        everyPiece[i].remove()
        piece.remove()
        figures.wKing.create(comparingPiece-2)
        figures.wRook.create(comparingPiece-3)
        return true
     }
      if((comparingPiece == (Number(PlacedWantedpos.getAttribute("number"))-1))&&(everyPiece[i].getAttribute("pieceinfo")=="wRook")){
        everyPiece[i].remove()
        figures.wRook.create(comparingPiece+2)
        return true
     }
    }

    if(piece.getAttribute("pieceinfo")==("bKing")&&(piece.getAttribute("move")==0)&&(everyPiece[i].getAttribute("move")==0)){
      console.log("castle");

      if((comparingPiece == (Number(PlacedWantedpos.getAttribute("number"))+1))&&(everyPiece[i].getAttribute("pieceinfo")=="bRook")){
         everyPiece[i].remove()
         piece.remove()
         figures.bKing.create(comparingPiece-2)
         figures.bRook.create(comparingPiece-3)
         return true
      }
      if((comparingPiece == (Number(PlacedWantedpos.getAttribute("number"))-1))&&(everyPiece[i].getAttribute("pieceinfo")=="bRook")){
        everyPiece[i].remove()
        figures.bRook.create(comparingPiece+2)
        return true
     }
    }


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


function whosMove(){
  if((HowManyMoves % 2 == 0)){
    board.style.backgroundColor = "white";
  }else{
    board.style.backgroundColor = "DarkSlateGray";
  }
}


function checkpossibleMovesNoTaking(piece, PlacedWantedpos){

  piecePlace = nodeArray[piece.getAttribute("place")].getAttribute("id")

  // if((piece.getAttribute("place")==(PlacedWantedpos.getAttribute("number")))){
  //   return false
  // }
 
  // if((piece.getAttribute("color") == "w") && (HowManyMoves % 2 != 0)){
  //   //console.log("color");
  //   return false
  // }

  // if((piece.getAttribute("color") == "b") && (HowManyMoves % 2 == 0)){
  //   return false
  // }

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
  
    
    for(let i = 0; i < everyPiece.length; i++){
      let color = piece.getAttribute("color")
      let othercolor = everyPiece[i].getAttribute("color")
      let comparingPiece = everyPiece[i].getAttribute("place")

      if(((piece.getAttribute("pieceinfo")=="wPawn")||(piece.getAttribute("pieceinfo")=="bPawn"))&&(everyPiece[i].getAttribute("place")==PlacedWantedpos.getAttribute("number"))&&(figures[piece.getAttribute("pieceinfo")].take(piece, everyPiece[i].getAttribute("place")))&&(color != othercolor)){

        console.log("take with the pawn");
        return true
      }
      if((comparingPiece == theBlocksPlace)&&(theBlocksPlace != PlacedWantedpos.getAttribute("number"))){
        console.log();
        return false        
      }
      if((comparingPiece == theBlocksPlace)&&((piece.getAttribute("color")==everyPiece[i].getAttribute("color"))||(!figures[piece.getAttribute("pieceinfo")].take(piece, PlacedWantedpos.getAttribute("number"))))){
        console.log("bro is testing friendly fire");
        return false
      }
    } 
    for(let i = 0; i < everyPiece.length; i++){
      let comparingPiece = everyPiece[i].getAttribute("place")
      let color = piece.getAttribute("color")
      let othercolor = everyPiece[i].getAttribute("color")
  
      if(figures[piece.getAttribute("pieceinfo")].move(piece, PlacedWantedpos.getAttribute("number")) == false){
        ("not happening")
        return false
      }
      
      if((comparingPiece == PlacedWantedpos.getAttribute("number")) && (figures[piece.getAttribute("pieceinfo")].take(piece, PlacedWantedpos.getAttribute("number")))&&(color != othercolor) ){
        //console.log(everyPiece[i]);
        console.log("can take");
        return true 
        //doesn't work
        }

        
      }
    }
  return true

  } 
  


  


function whiteCheckingChecks(){
  console.log("checking...");
  let King = Number(document.getElementById("white-king").getAttribute("place"))
  let theKingPos = nodeArray[King]
  let everyPiece = document.querySelectorAll(".piece")
  for(let i = 0; i < everyPiece.length; i++){
    if((everyPiece[i].getAttribute("color")!="w")){
      console.log("not white");
      if(checkpossibleMovesNoTaking(everyPiece[i], theKingPos)){
        return everyPiece[i]
      }
    }
  }

  return false


  }
  //return an array of all the pieces that can take

  

  function whiteCheckMate(){
    console.log("checkmate called...");
    //let theKing = document.getElementById("white-king")
    let theKingPos = Number(document.getElementById("white-king").getAttribute("place"))
    let theKingsPos = nodeArray[theKingPos].getAttribute("id")
    let everyPiece = document.querySelectorAll(".piece")
    let takingPiece = whiteCheckingChecks().getAttribute("place")
    let KingPossibleMoves = [theKingPos+8, theKingPos+9,theKingPos+7,theKingPos+1,theKingPos-1,theKingPos-8,theKingPos-7,theKingPos-9,]
    let takingSquare = nodeArray[takingPiece].getAttribute("id")
    //let canTheKingMove = false

    let startx = takingSquare.slice(0,1) 
    let starty = takingSquare.slice(1,2)


    let finishx = theKingsPos.slice(0,1)
    let finishy = theKingsPos.slice(1,2)

    let goingBackwardsY = starty > finishy
    let goingBackwardsX = startx > finishx 
  
    let row = Math.abs(startx - finishx)
    let rowy = Math.abs(starty - finishy);
    let biggest = Math.max(row,rowy)
  
    for(let h = 0; h < biggest; h++){
    
    let theBlocksPlace = document.getElementById(`${startx}${starty}`)
    //console.log(theBlocksPlace);
    for(let i = 0; i < everyPiece.length; i++){
     

      if((everyPiece[i].getAttribute("pieceinfo")!="wKing")&&(everyPiece[i].getAttribute("color")=='w')&&(checkpossibleMovesNoTaking(everyPiece[i], theBlocksPlace))){
        console.log(everyPiece[i])
        console.log("blockable");
        return false 
      }
      if(everyPiece[i].getAttribute("pieceinfo")=="wPawn"){
      }
      if((everyPiece[i].getAttribute("pieceinfo")=="wPawn")&&(checkpossibleMovesNoTaking(everyPiece[i], theBlocksPlace))){
        console.log("take with pawn");
        return false
        //this doesn't work
      }
      for(let k = 0; k < KingPossibleMoves.length; k++){
        let KingPos = Number(KingPossibleMoves[k])
        //console.log(KingPos);
          if((KingPos > 64)){
            KingPossibleMoves.splice(k, 1)
          }
          if((KingPos < 64)&&(checkpossibleMovesNoTaking(everyPiece[i], nodeArray[KingPos]))){
            KingPossibleMoves.splice(k, 1)
          }
          if(KingPossibleMoves[k]==everyPiece[i].getAttribute("place")){
            KingPossibleMoves.splice(k,1)
          }
        }
      }
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

    }
    
    if(KingPossibleMoves.length == 0){
      alert("this is check mate");
      return true
    }else{
      console.log("the king can move");
      console.log(KingPossibleMoves);
      return false
    }
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
      b.setAttribute('src', "images/wp.svg")
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

    take: function(piece, placedwanted){
      //might have to give the wanted position the piece in question to check its color 
  
      let piecepos = Number(piece.getAttribute("place"))
      if(((piecepos-7 == placedwanted) || (piecepos-9 == placedwanted))){
        return true
      }else{
        return false
      }
      
    }, 

    move: function(element, Placedwanted){
      //make sure you run the placement function for the placedwanted argument 
      currentposition = Number(element.getAttribute("place"))
      if((((currentposition - 8)  == Placedwanted)||((parseInt(element.getAttribute("move")) == 0) && ((currentposition - 16)  == Placedwanted)))){ 
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
      b.setAttribute('src', "images/bp.svg")
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
      if((((piecepos+7 )== placedwanted) || ((piecepos+9) == placedwanted))){
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

  wBishop: {
    create: function(position){
      let b = document.createElement('img')
      b.setAttribute('src', "images/wb.svg")
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
      b.setAttribute('src', "images/bb.svg")
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
      b.setAttribute('src', "images/wr.svg")
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
      b.setAttribute('src', "images/br.svg")
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
      b.setAttribute('src', "images/wq.svg")
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
      b.setAttribute('src', "images/bq.svg")
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
      b.setAttribute('src', "images/wkn.svg")
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
      b.setAttribute('src', "images/bkn.svg")
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
      b.setAttribute('id', 'white-king')
      b.setAttribute('src', "images/wk.svg")
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
      b.setAttribute('id', 'black-king')
      b.setAttribute('src', "images/bk.svg")
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
  

figures.bPawn.create(8)
figures.bPawn.create(9)
figures.bPawn.create(10)
figures.bPawn.create(11)
figures.bPawn.create(12)
figures.bPawn.create(13)
figures.bPawn.create(14)
figures.bPawn.create(15)
figures.bRook.create(0)
figures.bRook.create(7)
figures.bKnight.create(1)
figures.bKnight.create(6)
figures.bBishop.create(2)
figures.bBishop.create(5)
figures.bQueen.create(3)
figures.bKing.create(4)

figures.wPawn.create(48)
figures.wPawn.create(49)
figures.wPawn.create(50)
figures.wPawn.create(51)
figures.wPawn.create(52)
figures.wPawn.create(53)
figures.wPawn.create(54)
figures.wPawn.create(55)
figures.wRook.create(63)
figures.wRook.create(56)

figures.wKnight.create(57)
figures.wKnight.create(62)
figures.wBishop.create(58)
figures.wBishop.create(61)
figures.wQueen.create(59)
figures.wKing.create(60)


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
    board.classList.add("should-display-border")
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
      //console.log(howmany);
      elmnt.style.left = nodeArray[next].offsetLeft + 'px'
      elmnt.style.top = nodeArray[next].offsetTop + 'px'
      elmnt.setAttribute("place", next)
      elmnt.setAttribute("move", howmany+1) 
      HowManyMoves++
      upgrading()
      whosMove()
      if(whiteCheckingChecks() != false){
        whiteCheckMate()
      }
  
    }else{
      
      elmnt.style.top = nodeArray[pieceplacement].offsetTop + 'px'
      elmnt.style.left = nodeArray[pieceplacement].offsetLeft + 'px'
    }
    
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.zIndex = "10"
    board.classList.remove("should-display-border")
    
  
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





//What I am working on right now:
//check and checkmates work but the checking for check used the move function
//I changed that to the new function I created and now nothing works and 
//friendly fire gets called for no reason 