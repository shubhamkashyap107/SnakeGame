let canvas = document.querySelector("canvas");
let pen = canvas.getContext("2d");

pen.fillStyle = "yellow";
pen.font = "40px cursive"
pen.fillText("Press Enter to Start..", 300, 300);


let cellSize = 50;
let boardWidth = 1000;
let boardHeight = 600;
let direction = "right";
let gameOver = false;
let foodCell = getFoodCells();
let score = 0;
let check = false;

setInterval(function(){
    if(check === true)
    {   
        location.reload();
    }
}, 8000);

function getFoodCells()
        {
            return [
                Math.round((Math.random() * (boardWidth - cellSize))  / cellSize) * cellSize,
                Math.round((Math.random() * (boardHeight - cellSize))  / cellSize) * cellSize
            ]
        }

let Cells = [[0,0], [50,0]];

document.addEventListener("keydown", function(event)
{
    if(event.key === "Enter")
    {
        pen.clearRect(0,0,1200,600);
        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowLeft")
            {
                direction = "left";
            }
            else if(event.key === "ArrowDown")
            {
                direction = "down";
            }
            else if(event.key === "ArrowUp")
            {
                direction = "up";
            }
            else if(event.key === "ArrowRight")
            {
                direction = "right";
            }
        });
        
        function draw()
        {
            if(gameOver === true)
            {
                clearInterval(intervalID);
                pen.fillStyle = "red";
                pen.font = "40px bold"
                pen.fillText("Game Over!!", 400, 300);
                check = true;
                return;
            }
            let idx = 0;
            pen.clearRect(0,0,boardWidth,boardHeight);
            for(let item of Cells)
            {
                if(idx === Cells.length - 1)
                {
                    pen.fillStyle = "red";
                }
                else
                {
                    pen.fillStyle = "yellow";
                }
                pen.fillRect(item[0],item[1], cellSize - 2, cellSize - 2);
                idx++;
            }
        
            pen.fillStyle = "#0D1282";
            pen.fillRect(foodCell[0], foodCell[1], cellSize - 2, cellSize - 2);
        
            pen.font = "22px cursive"
            pen.fillStyle = "red";
            pen.fillText(`Score : ${score}`, 50, 50);
        
        
        }
        
        function update()
        {
            let headX = Cells[Cells.length - 1][0];
            let headY = Cells[Cells.length - 1][1];
        
        
            let newX;
            let newY;
            if(direction === "down")
            {
                newX = headX;
                newY = headY + cellSize;
                if(newY === boardHeight || killYourself(newX, newY))
                {
                    gameOver = true;
                }
            }
            else if(direction === "up")
            {
                newX = headX;
                newY = headY - cellSize;
                if(newY < 0  || killYourself(newX, newY))
                {
                    gameOver = true;
                }
            }
            else if(direction === "left")
            {
                newX = headX - cellSize;
                newY = headY;
                if(newX < 0  || killYourself(newX, newY))
                {
                    gameOver = true;
                }
            }
            else
            {
                newX = headX + cellSize;
                newY = headY;  
                if(newX === boardWidth  || killYourself(newX, newY))
                {
                    gameOver = true;
                }
            }
        
            Cells.push([newX, newY]);
            if(newX === foodCell[0] && newY == foodCell[1])
            {
                foodCell = getFoodCells();
                score++;
            }
            else
            {
                Cells.shift();
            }
            
        }
        
        
        
        let intervalID = setInterval(function(){
                            update();
                            draw();
                        }, 200);
        
        
        function killYourself(x, y)
        {
            for(let item of Cells)
            {
                if(item[0] === x && item[1] === y)
                {
                    return true;
                }
            }
            return false;
        }
        
    }
    
})