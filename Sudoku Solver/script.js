

// Cell is to use the path obtained from BFS
class Cell  {
    constructor(x, y, dist, prev) {
        this.x = x;
        this.y = y;
        this.dist = dist; //distance
        this.prev = prev; //parent cell in the path
    }
	toString() {
		return "(" + this.x + ", " + this.y + ")";
	}
}

let board = [];
let mat = [];
let rows = 9;
let columns = 9;
const set = new Set();
let index = 1;
let count = 0;

window.onload = function() {
    startGame();
}

function startGame() {

    //populate our board
    for (let r = 0; r < rows; r++) {
        let row = [];
        let row_mat = [];
        for (let c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            if(r%3 == 0) {
                document.getElementById(tile.id).style.borderTop = "1px solid black";
            }
            if(c%3 == 0) {
                document.getElementById(tile.id).style.borderLeft = "1px solid black";
            }
            row.push(tile);
            row_mat.push(0);
        }
        board.push(row);
        mat.push(row_mat);
    }

}


function clickTile() {

    let tile = this;
    let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
    let r = coords[0];
    let c = coords[1];
    let value = prompt("value of cell");
    if(value === null) {
        return null;
    }
    else if(!isNaN(value) && value >= 1 && value <= 9) {
        document.getElementById(tile.id).innerHTML = value.toString();
        mat[r][c] = value.toString();
    }
    else {
        alert("Value is not permisible");
    }

}

function submit() {
    solveSudoku(mat,9);

}

function isSafe(mat, row, col, num)
{
     
    // Row has the unique (row-clash)
    for(let d = 0; d < mat.length; d++)
    {
         
        // Check if the number we are trying to
        // place is already present in
        // that row, return false;
        if (mat[row][d] == num)
        {
            return false;
        }
    }
 
    // Column has the unique numbers (column-clash)
    for(let r = 0; r < mat.length; r++)
    {
          
        // Check if the number
        // we are trying to
        // place is already present in
        // that column, return false;
        if (mat[r][col] == num)
        {
            return false;
        }
    }
 
    // Corresponding square has
    // unique number (box-clash)
    let sqrt = Math.floor(Math.sqrt(mat.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;
 
    for(let r = boxRowStart;
            r < boxRowStart + sqrt; r++)
    {
        for(let d = boxColStart;
                d < boxColStart + sqrt; d++)
        {
            if (mat[r][d] == num)
            {
                return false;
            }
        }
    }
 
    // If there is no clash, it's safe
    return true;
}
 
function solveSudoku(mat, n)
{
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
        {
            if (mat[i][j] == 0)
            {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty)
        {
            break;
        }
    }
 
    // No empty space left
    if (isEmpty)
    {
        for(let k = 0; k < 9; k++) {
            for(let p = 0; p < 9; p++){
                document.getElementById(k.toString() + "-" + p.toString()).innerHTML = mat[k][p].toString();
            }
            
         }
         console.log(count);
        return true;
    }
    
    // Else for each-row backtrack
    for(let num = 1; num <= n; num++)
    {
        if (isSafe(mat, row, col, num))
        {
            count++;
            mat[row][col] = num;
            // setTimeout(() => {
            //     document.getElementById(row.toString() + "-" + col.toString()).innerHTML = num.toString();
            // },(index++)*10);
            if (solveSudoku(mat, n))
            {
                //  for(let k = 0; k < 9; k++) {
                //     console.log(mat[k]);
                //  }
                // print(board, n);
                return true;
            }
            else
            {
                 
                // Replace it
                // setTimeout(() => {
                //     document.getElementById(row.toString() + "-" + col.toString()).innerHTML = '';
                // },(index++)*10);
                mat[row][col] = 0;
            }
        }
    }
    return false;
}
 

