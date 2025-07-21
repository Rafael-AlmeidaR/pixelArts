class Grid
{   constructor(x, y, width, height)
    {   this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "";
    }
    draw()
    {   
        // context.strokeStyle = "black";
        // context.strokeRect(this.x, this.y, this.width, this.height)
        
        if(this.color != "")
        {   context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

class PixelArt
{   constructor()
    {   
        //this.width = Number(prompt("Largura?"));
        //this.height = Number(prompt("Altura?"));
        this.width = 32;
        this.height = 32;
        this.art = [];
        this.drawColor = "rgba(0, 0, 0)";

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
    {   this.allTools = [new Pencil(), new Rubber(), new Bucket()];
        this.actualTool = 2;
        this.tool = this.allTools[this.actualTool];
    }
    switchTool()
    {   this.tool = this.allTools[this.actualTool]
    }
}
class Tool
{   constructor()
    {   
    }
    clicked(x, y, cell)
    {   console.log("em desenvolvimento!")
    }
}
class Pencil extends Tool
{   constructor()
    {   super();
    }
    clicked(x, y, cell)
    {   cell.color = pixelArt.drawColor;
    }
}
class Rubber extends Tool
{   constructor()
    {   super();
    }
    clicked(x, y, cell)
    {   cell.color = "";
    }
}
class Bucket extends Tool
{   constructor()
    {   super();
    }
    clicked(x, y, cell)
    {   let initalColor = cell.color;
        let switchColors = [[x, y]];
        let visitedPositions = [];
        while(switchColors.length > 0)
        {   let xA = switchColors[0][0];
            let yA = switchColors[0][1];
            if(!visitedPositions.includes(`${xA},${yA}`))
            {   let row = pixelArt?.art?.[xA];
                let pixel = row?.[yA];
                if(pixel)
                {   if(pixelArt.art[xA][yA].color == initalColor)
                    {   pixelArt.art[xA][yA].color = pixelArt.drawColor;
                        switchColors.push([xA, yA-1], [xA-1, yA], [xA+1, yA], [xA, yA+1]);
                    }
                }
                visitedPositions.push(`${xA},${yA}`)
            }
            switchColors.shift();
            
            console.log(switchColors);
        }
        if(pixelArt.art[x][y].color == initalColor)
        {   pixelArt.art[x][y].color = pixelArt.drawColor;
        }
    }
}


// teste
// class Bucket extends Tool
// {   constructor()
//     {   super();
//         this.switchColors;
//         this.visitedPositions;
//         this.initalColor;
//         this.needUpdate = false;
//     }
//     clicked(x, y, cell)
//     {   this.initalColor = cell.color;
//         this.switchColors = [[x, y]];
//         this.visitedPositions = [];
        
//         let xA = this.switchColors[0][0];
//         let yA = this.switchColors[0][1];
//         if(!this.visitedPositions.includes(`${xA},${yA}`))
//         {   let row = pixelArt?.art?.[xA];
//             let pixel = row?.[yA];
//             if(pixel)
//             {   if(pixelArt.art[xA][yA].color == this.initalColor)
//                 {   pixelArt.art[xA][yA].color = pixelArt.drawColor;
//                     this.switchColors.push([xA, yA-1], [xA-1, yA], [xA+1, yA], [xA, yA+1]);
//                 }
//             }
//             this.visitedPositions.push(`${xA},${yA}`)
//         }
//         this.switchColors.shift();
            
//             // console.log(switchColors);
        
//         if(pixelArt.art[x][y].color == this.initalColor)
//         {   pixelArt.art[x][y].color = pixelArt.drawColor;
//         }
//         this.needUpdate = true;
//     }
//     update()
//     {   if(this.switchColors.length > 0)
//         {   let xA = this.switchColors[0][0];
//             let yA = this.switchColors[0][1];
//             if(!this.visitedPositions.includes(`${xA},${yA}`))
//             {   let row = pixelArt?.art?.[xA];
//                 let pixel = row?.[yA];
//                 if(pixel)
//                 {   if(pixelArt.art[xA][yA].color == this.initalColor)
//                     {   pixelArt.art[xA][yA].color = pixelArt.drawColor;
//                         this.switchColors.push([xA, yA-1], [xA-1, yA], [xA+1, yA], [xA, yA+1]);
//                     }
//                 }
//                 this.visitedPositions.push(`${xA},${yA}`)
//             }
//             this.switchColors.shift();
            
//             // console.log(switchColors);
//         }
//         if(pixelArt.art[x][y].color == this.initalColor)
//         {   pixelArt.art[x][y].color = pixelArt.drawColor;
//         }
//     }
// }
