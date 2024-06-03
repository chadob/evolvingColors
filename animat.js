class Animat {
    constructor(game, automata, hue, mutation, maxEnergy, x, y) {
        this.game = game;
        this.automata = automata;
        this.hue = hue;
        this.mutation = mutation;
        this.picky = 20;
        this.energy = 0;
        this.maxEnergy = maxEnergy;
        this.x = x;
        this.y = y;
    }
    update() {
        let nearestNeighbor = Infinity;
        let moveX = -1;
        let moveY = -1;
        if (this.automata.plants[(this.y-1 + this.automata.height) % this.automata.height][(this.x-1 + this.automata.width) % this.automata.width] !== null) {
            let neighborDifference = Math.abs(this.automata.plants[(this.y-1 + this.automata.height) % this.automata.height][(this.x-1 + this.automata.width) % this.automata.width].hue - this.hue)
            if (neighborDifference < nearestNeighbor) {
                nearestNeighbor = neighborDifference;
                moveX = (this.x-1 + this.automata.width) % this.automata.width;
                moveY = (this.y-1 + this.automata.height) % this.automata.height;
            }
        } 
        if (this.automata.plants[(this.y-1 + this.automata.height) % this.automata.height][this.x] !== null) {
            let neighborDifference = Math.abs(this.automata.plants[(this.y-1 + this.automata.height) % this.automata.height][this.x].hue - this.hue)
            if (neighborDifference < nearestNeighbor) {
                nearestNeighbor = neighborDifference;
                moveX = this.x;
                moveY = (this.y-1 + this.automata.height) % this.automata.height;
            }
        } 
        if (this.automata.plants[(this.y-1 + this.automata.height) % this.automata.height][(this.x+1) % this.automata.width] !== null) {
            let neighborDifference = Math.abs(this.automata.plants[(this.y-1 + this.automata.height) % this.automata.height][(this.x+1) % this.automata.width].hue - this.hue)
            if (neighborDifference < nearestNeighbor) {
                nearestNeighbor = neighborDifference;
                moveX = (this.x+1) % this.automata.width;
                moveY = (this.y-1 + this.automata.height) % this.automata.height;
            }
        } 
        if (this.automata.plants[this.y][(this.x-1 + this.automata.width) % this.automata.width] !== null) {
            let neighborDifference = Math.abs(this.automata.plants[this.y][(this.x-1 + this.automata.width) % this.automata.width].hue - this.hue)
            if (neighborDifference < nearestNeighbor) {
                nearestNeighbor = neighborDifference;
                moveX = (this.x-1 + this.automata.width) % this.automata.width;
                moveY = this.y;
            }
        } 
        if (this.automata.plants[this.y][(this.x+1) % this.automata.width] !== null) {
            let neighborDifference = Math.abs(this.automata.plants[this.y][(this.x+1) % this.automata.width].hue - this.hue)
            if (neighborDifference < nearestNeighbor) {
                nearestNeighbor = neighborDifference;
                moveX = (this.x+1) % this.automata.width;
                moveY = this.y;
            }
        } 
        if (this.automata.plants[(this.y+1) % this.automata.height][(this.x-1 + this.automata.width) % this.automata.width] !== null) {
            let neighborDifference = Math.abs(this.automata.plants[(this.y+1) % this.automata.height][(this.x-1 + this.automata.width) % this.automata.width].hue - this.hue)
            if (neighborDifference < nearestNeighbor) {
                nearestNeighbor = neighborDifference;
                moveX = (this.x-1 + this.automata.width) % this.automata.width;
                moveY = (this.y+1) % this.automata.height;
            }
        } 
        if (this.automata.plants[(this.y+1) % this.automata.height][this.x] !== null) {
            let neighborDifference = Math.abs(this.automata.plants[(this.y+1) % this.automata.height][this.x].hue - this.hue)
            if (neighborDifference < nearestNeighbor) {
                nearestNeighbor = neighborDifference;
                moveX = this.x;
                moveY = (this.y+1) % this.automata.height;
            }
        } 
        if (this.automata.plants[(this.y+1) % this.automata.height][(this.x+1) % this.automata.width] !== null) {
            let neighborDifference = Math.abs(this.automata.plants[(this.y+1) % this.automata.height][(this.x+1) % this.automata.width].hue - this.hue)
            if (neighborDifference < nearestNeighbor) {
                nearestNeighbor = neighborDifference;
                moveX = (this.x+1) % this.automata.width;
                moveY = (this.y+1) % this.automata.height;
            }
        }
        if (moveX > -1) {
            this.move(moveX, moveY);
            //Eat the plant if hue is close enough
            if (Math.abs(this.hue - this.automata.plants[moveY][moveX].hue) < this.picky) {
                this.eat(moveX, moveY);
            }
        }
        
        //Mutate if energy is high enough
        if (this.energy > this.maxEnergy) {
            this.mutate();
        }
        //Die if energy is < 0 or if unlucky
        if (this.energy < 0 || Math.random() < .001) {
            this.die();
        }
    }        
    move(x, y) {
        this.x = x;
        this.y = y;
    }
    eat(x, y) {
        let plantHue = this.automata.plants[y][x].hue;
        //Adjust energy based on hue difference
        let hueDifference = Math.abs(plantHue - this.hue);
        if (hueDifference > this.hue / 2) {
            this.energy -= .01 * (359 / hueDifference);
        } else {
            this.energy += .01 *(359 / hueDifference);
        }
        //remove plant
        this.automata.plants[y][x].die();
    }

    mutate() {
        console.log("mutated")
        let newHue = this.hue + this.mutation;
        this.game.addEntity(new Animat(this.game, this.automata, newHue, this.mutation, this.maxEnergy, this.x, this.y));
    }
    die() {
        this.removeFromWorld = true;
    }
    draw(ctx) {
        ctx.fillStyle = hsl(this.hue,75,50);
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.ellipse((this.x + 1/2)*1000/ this.automata.width, (this.y + 1/2)*500/ this.automata.height, 1000/ this.automata.width/2, 500/ this.automata.height / 2, 0, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
    }
}