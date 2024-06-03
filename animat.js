class Animat {
    constructor(game, automata, hue, mutation, maxEnergy, x, y) {
        this.game = game;
        this.automata = automata;
        this.hue = hue;
        this.mutation = mutation;
        this.picky = 50;
        this.energy = 0;
        this.maxEnergy = maxEnergy;
        this.x = x;
        this.y = y;
    }
    update() {
        let nearestNeighbor = Infinity;
        let moveX = -1;
        let moveY = -1;
        // Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Capture the current context
  const self = this;
  
  //Chat GPT helped me convert the following from a standard if else to an array of conditions
  // Array of condition-action pairs
  const conditions = [
    {
      condition: () => self.automata.plants[(self.y-1 + self.automata.height) % self.automata.height][(self.x-1 + self.automata.width) % self.automata.width] !== null,
      action: () => {
        let neighborDifference = Math.abs(self.automata.plants[(self.y-1 + self.automata.height) % self.automata.height][(self.x-1 + self.automata.width) % self.automata.width].hue - self.hue);
        if (neighborDifference < nearestNeighbor) {
          nearestNeighbor = neighborDifference;
          moveX = (self.x-1 + self.automata.width) % self.automata.width;
          moveY = (self.y-1 + self.automata.height) % self.automata.height;
        }
      }
    },
    {
      condition: () => self.automata.plants[(self.y-1 + self.automata.height) % self.automata.height][self.x] !== null,
      action: () => {
        let neighborDifference = Math.abs(self.automata.plants[(self.y-1 + self.automata.height) % self.automata.height][self.x].hue - self.hue);
        if (neighborDifference < nearestNeighbor) {
          nearestNeighbor = neighborDifference;
          moveX = self.x;
          moveY = (self.y-1 + self.automata.height) % self.automata.height;
        }
      }
    },
    {
      condition: () => self.automata.plants[(self.y-1 + self.automata.height) % self.automata.height][(self.x+1) % self.automata.width] !== null,
      action: () => {
        let neighborDifference = Math.abs(self.automata.plants[(self.y-1 + self.automata.height) % self.automata.height][(self.x+1) % self.automata.width].hue - self.hue);
        if (neighborDifference < nearestNeighbor) {
          nearestNeighbor = neighborDifference;
          moveX = (self.x+1) % self.automata.width;
          moveY = (self.y-1 + self.automata.height) % self.automata.height;
        }
      }
    },
    {
      condition: () => self.automata.plants[self.y][(self.x-1 + self.automata.width) % self.automata.width] !== null,
      action: () => {
        let neighborDifference = Math.abs(self.automata.plants[self.y][(self.x-1 + self.automata.width) % self.automata.width].hue - self.hue);
        if (neighborDifference < nearestNeighbor) {
          nearestNeighbor = neighborDifference;
          moveX = (self.x-1 + self.automata.width) % self.automata.width;
          moveY = self.y;
        }
      }
    },
    {
      condition: () => self.automata.plants[self.y][(self.x+1) % self.automata.width] !== null,
      action: () => {
        let neighborDifference = Math.abs(self.automata.plants[self.y][(self.x+1) % self.automata.width].hue - self.hue);
        if (neighborDifference < nearestNeighbor) {
          nearestNeighbor = neighborDifference;
          moveX = (self.x+1) % self.automata.width;
          moveY = self.y;
        }
      }
    },
    {
      condition: () => self.automata.plants[(self.y+1) % self.automata.height][(self.x-1 + self.automata.width) % self.automata.width] !== null,
      action: () => {
        let neighborDifference = Math.abs(self.automata.plants[(self.y+1) % self.automata.height][(self.x-1 + self.automata.width) % self.automata.width].hue - self.hue);
        if (neighborDifference < nearestNeighbor) {
          nearestNeighbor = neighborDifference;
          moveX = (self.x-1 + self.automata.width) % self.automata.width;
          moveY = (self.y+1) % self.automata.height;
        }
      }
    },
    {
      condition: () => self.automata.plants[(self.y+1) % self.automata.height][self.x] !== null,
      action: () => {
        let neighborDifference = Math.abs(self.automata.plants[(self.y+1) % self.automata.height][self.x].hue - self.hue);
        if (neighborDifference < nearestNeighbor) {
          nearestNeighbor = neighborDifference;
          moveX = self.x;
          moveY = (self.y+1) % self.automata.height;
        }
      }
    },
    {
      condition: () => self.automata.plants[(self.y+1) % self.automata.height][(self.x+1) % self.automata.width] !== null,
      action: () => {
        let neighborDifference = Math.abs(self.automata.plants[(self.y+1) % self.automata.height][(self.x+1) % self.automata.width].hue - self.hue);
        if (neighborDifference < nearestNeighbor) {
          nearestNeighbor = neighborDifference;
          moveX = (self.x+1) % self.automata.width;
          moveY = (self.y+1) % self.automata.height;
        }
      }
    }
  ];
  
  // Shuffle the conditions array
  shuffle(conditions);
  
  // Execute the conditions in random order
  for (const condition of conditions) {
    if (condition.condition()) {
      condition.action();
      break; // Exit the loop once a condition is met and action is taken
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
            console.log("mutate")
            this.mutate();
        }
        //Die if energy is < 0 or if unlucky
        if (this.energy < 0 || Math.random() < .001) {
            this.die();
        }
    }
    chooseDirection() {
        
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
        this.automata.removePlant(x,y)
    }

    mutate() {
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