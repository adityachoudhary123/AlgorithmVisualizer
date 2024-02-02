

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
let rows = 10;
let columns = 10;
let sourceSet = false;
let destinationSet = false;
let sourceR = 0;
let sourceC = 0;
let destR = 0;
let destC = 0;
var shortDist = [];
const set = new Set();

window.onload = function() {
    startGame();
}

function startGame() {

    //populate our board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

}


function clickTile() {

    let tile = this;
    let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
    if(!sourceSet) {
        tile.style.backgroundColor = "lightgreen";
        sourceSet = true;
        sourceR = parseInt(coords[0]);
        sourceC = parseInt(coords[1]);
    }
    else if(!destinationSet) {
        tile.style.backgroundColor = "#d66f8e";
        destinationSet = true;
        destR = parseInt(coords[0]);
        destC = parseInt(coords[1]);
    }
    else {
        tile.style.backgroundColor = "#615055";
        set.add(tile.id.toString());
    }
    

}

function submit() {
    if(!sourceSet) {
        alert("Please set source");
        return;
    }

    if(!destinationSet) {
        alert("Please set destination");
        return;
    }
    console.log(set);
    shortestPath();
    // console.log(shortDist);

}

function shortestPath() {
    var sx = sourceR; 
    var sy = sourceC;
    var dx = destR;
    var dy = destC;	
    //if start or end value is 0, return
    // if (matrix[sx][sy] == 0 || matrix[dx][dy] == 0) {
    //     console.log("There is no path.");
    //     return;  
    // }
    //initialize the cells 
    var m = 10;
    var n = 10;	    
    var cells = [];
    for (let i = 0; i < m; i++) {
        cells[i] = [];
        for (let j = 0; j < n; j++) {               
            if (!set.has(i + "-" + j)) {
                cells[i][j] = new Cell(i, j, Number.MAX_VALUE, null);                   
            }  
        }
    }
    //breadth first search
    var queue = [];       
    var src = cells[sx][sy];
    src.dist = 0;
    queue.push(src);
    var dest = null;
    var p;
    let index = 0;
    while ((p = queue.shift()) != null) {
        //find destination 
        if (p.x == dx && p.y == dy) { 
            dest = p;
            break;
        }
        let ids = p.x.toString() + "-" + p.y.toString();
        if(p.x == sx && p.y == sy) {
            //do nothing
        }
        else {
            setTimeout(() => {
                document.getElementById(ids).style.backgroundColor = "#d9bea5";
            },(index++)*100);
        }
        
        // moving up
        this.visit(cells, queue, p.x-1, p.y, p);    
        // moving left
        this.visit(cells, queue, p.x, p.y-1, p);     
        // moving down
        this.visit(cells, queue, p.x+1, p.y, p);             
        //moving right
        this.visit(cells, queue, p.x, p.y+1, p);
        // setTimeout(() => {
        //     document.getElementById(ids).style.backgroundColor = "lightgrey";
        // },(index++)*100);
    }
    
    //compose the path if path exists
    if (dest == null) {
        alert("there is no path.");
        return;
    } else {
        let path = [];
        p = dest;
        do {
            path.unshift(p);
        } while ((p = p.prev) != null);

        // console.log(`${path}`);
        
        for(let i = 1; i < path.length-1; i++) {
            let ids = path[i].x.toString() + "-" + path[i].y.toString();
            setTimeout(() => {
                document.getElementById(ids).style.backgroundColor = "#89bafa";
            },(index++)*100);
            
        }
        
    }
}

//function to update cell visiting status, Time O(1), Space O(1)
function visit(cells, queue, x, y, parent) { 
    //out of boundary
    if (x < 0 || x >= 10 || y < 0 || y >= 10 || cells[x][y] == null) {
        return;
    }    
    //update distance, and previous node
    var dist = parent.dist + 1;
    var p = cells[x][y];
    if (dist < p.dist) {
        p.dist = dist;
        p.prev = parent;
        queue.push(p);
    }
}




