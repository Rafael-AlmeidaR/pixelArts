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
    clicked()
    {   this.color = pixelArt.drawColor;
    }
}

class PixelArt
{   constructor()
    {   
        //this.width = Number(prompt("Largura?"));
        //this.height = Number(prompt("Altura?"));
        this.width = 16;
        this.height = 16;
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
        
        