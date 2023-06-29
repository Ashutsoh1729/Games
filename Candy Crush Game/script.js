const candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"]
const board = []
const rows = 9
const columns = 9
const score = 0

let currTile
let otherTile





window.onload = () => {
    StartGame()

    window.setInterval(() => {
        crushCandies()
        slideCandies()
        // generateCandy()
    },100)
}







function RandomImagae() {
    return candies[Math.floor(Math.random()*candies.length)]
}



function StartGame() {
    for (let r = 0; r < rows; r++){
        let columnArr = []            
        for (let c = 0; c < columns; c++){
            let tile = document.createElement("img")
            tile.id = r.toString() + "-" + c.toString()
            tile.src = "../Candy Crush Game/assets/" + RandomImagae() + ".png"


            tile.addEventListener("dragstart", dragStart)
            tile.addEventListener("dragover", dragOver)
            tile.addEventListener("dragenter", dragEnter)
            tile.addEventListener("dragleave", dragLeave)
            tile.addEventListener("drop", dragDrop)
            tile.addEventListener("dragend", dragEnd)
            

            document.getElementById("board").append(tile)
            columnArr.push(tile)
        }
        board.push(columnArr)
        
    }
}


function dragStart() {
    currTile = this
    // console.log(currTile);
}

function dragOver(e) {
    e.preventDefault()
}


function dragLeave() {
    
}


function dragEnter(e) {
    e.preventDefault();
}

function dragDrop() {
    otherTile = this
}



function dragEnd() {

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return
    }

    let currentCord = currTile.id.split("-")
    let r1 = currentCord[0]
    let c1 = currentCord[1]
    
    
    let otherCord = otherTile.id.split("-")
    let r2 = otherCord[0]
    let c2 = otherCord[1]

    const moveLeft = r2 == r1 && c2 == c1 - 1
    const moveRight = r2 == r1 && c1 == c2 -1 

    const moveUp = r2 == r1 - 1 && c2 == c1
    const moveDown = r1 == r2-1 && c2 == c1


    const isAdjacent = moveDown || moveLeft || moveUp || moveRight;
    console.log(isAdjacent);

    if (isAdjacent) {
        let currSrc = currTile.src
        let otherSrc = otherTile.src
        currTile.src = otherSrc
        otherTile.src = currSrc
    }

}


function crushCandies() {
    crushThree()
}


function crushThree() {
    
    // for rows

    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns - 2; c++){
            
            let candy1 = board[r][c]
            let candy2 = board[r][c+1]
            let candy3 = board[r][c + 2]

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                // console.log(true);
                candy1.src = "../Candy Crush Game/assets/" + 'blank' + ".png"
                candy2.src = "../Candy Crush Game/assets/" + 'blank' + ".png"
                candy3.src = "../Candy Crush Game/assets/" + 'blank' + ".png"
            }
        }
    }
    
    // For columns
    
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows - 2;r++){
            let candy1 = board[r][c]
            let candy2 = board[r+1][c]
            let candy3 = board[r + 2][c]
            
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "../Candy Crush Game/assets/" + 'blank' + ".png"
                candy2.src = "../Candy Crush Game/assets/" + 'blank' + ".png"
                candy3.src = "../Candy Crush Game/assets/" + 'blank' + ".png"
            }
        }
    }
    



}




// This function will fill the blanks if its above has a non-blank image


function slideCandies() {
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows-1; r++){
            let candy = board[r][c]
            if (!candy.src.includes("blank")) {
                if (board[r+1][c].src.includes("blank")) {
                    board[r+1][c].src = candy.src
                }
            }

        }
    }
}



// This function will generate candy images for blank images


function generateCandy() {
    for (let c = 0; c < columns; c++){
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "../Candy Crush Game/assets/" + RandomImagae() + ".png"
        }
    }
}






































