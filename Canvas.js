class Grid
{   constructor(x, y, width, height)
    {   this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "";
    }
    draw()
    {   if(this.color != "")
        {   context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

class PixelArt
{   constructor()
    {   this.width = 32;
        this.height = 32;
        this.art = [];
        this.drawColor = "#000000";

        this.gridWidth = canvas.width/this.width;
        this.gridHeight = canvas.height/this.height;

        if(this.gridWidth > this.gridHeight)
        {   this.gridWidth = this.gridHeight;
            canvas.width = canvas.height;
        }
        else
        {   this.gridHeight = this.gridWidth;
            canvas.height = canvas.width;
        }

        for(let i = 0; (i < this.height); i++)
        {   this.art.push([])
            for(let i2 = 0; (i2 < this.width); i2++)
            {   this.art[i].push(new Grid(this.gridWidth*i2, this.gridHeight*i, this.gridWidth, this.gridHeight));
            }
        }
    }
    draw()
    {   for(let i = 0; (i < this.art.length); i++)
        {   for(let i2 = 0; (i2 < this.art[i].length); i2++)
            {   this.art[i][i2].draw();
            }
        }
    }
}
        
class Tools
{   constructor()
    {   this.allTools = [new Pencil(), new Rubber(), new Bucket(), new ColorPicker()];
        this.tool = this.allTools[0];
    }
    switchTool(newTool)
    {   this.tool = this.allTools[newTool]
    }
}
class Tool
{   constructor()
    {   this.points = [];
    }
    clicked()
    {   console.log("em desenvolvimento!")
    }
}
class Pencil extends Tool
{   constructor()
    {   super();
    }
    clicked()
    {   let dx = this.points[1].x - this.points[0].x
        let dy = this.points[1].y - this.points[0].y
        let testePoints = [{x: this.points[0].x, y: this.points[0].y}, {x: this.points[1].x, y: this.points[1].y}];

        if(Math.abs(dx) > Math.abs(dy))
        {   if(testePoints[0].x > testePoints[1].x)
            {   let troca = testePoints[0].x;
                testePoints[0].x = testePoints[1].x;
                testePoints[1].x = troca;
                troca = testePoints[0].y;
                testePoints[0].y = testePoints[1].y;
                testePoints[1].y = troca;
            }
            let a = dy/dx;
            let y = testePoints[0].y
            for(let x = testePoints[0].x; (x <= testePoints[1].x); y += a, x++)
            {   if(pixelArt.art[Math.round(y)]?.[Math.round(x)])
                    pixelArt.art[Math.round(y)][Math.round(x)].color = pixelArt.drawColor;
            }

        }
        else
        {   if(testePoints[0].y > testePoints[1].y)
            {   let troca = testePoints[0].y;
                testePoints[0].y = testePoints[1].y;
                testePoints[1].y = troca;
                troca = testePoints[0].x;
                testePoints[0].x = testePoints[1].x;
                testePoints[1].x = troca;
            }
            let a = dx/dy;
            let x = testePoints[0].x
            for(let y = testePoints[0].y; (y <= testePoints[1].y); x += a, y++)
            {   if(pixelArt.art[Math.round(y)]?.[Math.round(x)])
                    pixelArt.art[Math.round(y)][Math.round(x)].color = pixelArt.drawColor;
            }
        }
    }
}
class Rubber extends Tool
{   constructor()
    {   super();
    }
    clicked()
    {   let dx = this.points[1].x - this.points[0].x
        let dy = this.points[1].y - this.points[0].y
        let testePoints = [{x: this.points[0].x, y: this.points[0].y}, {x: this.points[1].x, y: this.points[1].y}];

        if(Math.abs(dx) > Math.abs(dy))
        {   if(testePoints[0].x > testePoints[1].x)
            {   let troca = testePoints[0].x;
                testePoints[0].x = testePoints[1].x;
                testePoints[1].x = troca;
                troca = testePoints[0].y;
                testePoints[0].y = testePoints[1].y;
                testePoints[1].y = troca;
            }
            let a = dy/dx;
            let y = testePoints[0].y
            for(let x = testePoints[0].x; (x <= testePoints[1].x); y += a, x++)
            {   if(pixelArt.art[Math.round(y)]?.[Math.round(x)])
                    pixelArt.art[Math.round(y)][Math.round(x)].color = "";
            }

        }
        else
        {   if(testePoints[0].y > testePoints[1].y)
            {   let troca = testePoints[0].y;
                testePoints[0].y = testePoints[1].y;
                testePoints[1].y = troca;
                troca = testePoints[0].x;
                testePoints[0].x = testePoints[1].x;
                testePoints[1].x = troca;
            }
            let a = dx/dy;
            let x = testePoints[0].x
            for(let y = testePoints[0].y; (y <= testePoints[1].y); x += a, y++)
            {   if(pixelArt.art[Math.round(y)]?.[Math.round(x)])
                    pixelArt.art[Math.round(y)][Math.round(x)].color = "";
            }

        }
    }
}
class Bucket extends Tool
{   constructor()
    {   super();
    }
    clicked()
    {   if(pixelArt.art[this.points[0].y][this.points[0].x] === undefined) return;
        let initalColor = pixelArt.art[this.points[0].y][this.points[0].x].color;
        let switchColors = [[this.points[0].x, this.points[0].y]];
        let visitedPositions = [];
        while(switchColors.length > 0)
        {   let xA = switchColors[0][0];
            let yA = switchColors[0][1];
            if(!visitedPositions.includes(`${xA},${yA}`))
            {   let row = pixelArt?.art?.[yA];
                let pixel = row?.[xA];
                if(pixel)
                {   if(pixelArt.art[yA][xA].color == initalColor)
                    {   pixelArt.art[yA][xA].color = pixelArt.drawColor;
                        switchColors.push([xA, yA-1], [xA-1, yA], [xA+1, yA], [xA, yA+1]);
                    }
                }
                visitedPositions.push(`${xA},${yA}`)
            }
            switchColors.shift();
        }
    }
}


class ColorPicker extends Tool
{   constructor()
    {   super();
    }
    clicked()
    {   if (pixelArt.art[this.points[1].y]?.[this.points[1].x]?.color === undefined) return;
        let color = pixelArt.art[this.points[1].y][this.points[1].x].color
        pixelArt.drawColor = color;
        document.getElementById("colorSelector").value = color;
    }
}
