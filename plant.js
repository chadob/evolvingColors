class Plant {
    constructor(game, automata, x, y, hue, mutation, maxEnergy) {
        this.game = game;
        this.automata = automata;
        this.hue = hue;
        this.mutation = mutation
        this.maxEnergy = maxEnergy;
        this.energy = 0;
        this.x = x;
        this.y = y;
    }
    growPlant() {
        let mutateDifference = Math.random() * this.mutation;
        let flippedCoin = Math.random();
        let newHue = this.hue;
        if (flippedCoin > .5) {
            newHue += mutateDifference;
        } else {
            newHue -= mutateDifference;
        }
        if (this.automata.plants[(this.y-1 + this.automata.height) % this.automata.height][(this.x-1 + this.automata.width) % this.automata.width] === null) {
            let newPlant = new Plant(this.game, this.automata, (this.x-1 + this.automata.width) % this.automata.width, (this.y-1 + this.automata.height) % this.automata.height, newHue, this.mutation, this.maxEnergy);
            this.game.addEntity(newPlant);
            this.automata.plants[(this.y-1 + this.automata.height) % this.automata.height][(this.x-1 + this.automata.width) % this.automata.width] = newPlant;
        } 
        else if (this.automata.plants[(this.y-1 + this.automata.height) % this.automata.height][this.x] === null) {
            let newPlant = new Plant(this.game, this.automata, this.x, (this.y-1 + this.automata.height) % this.automata.height, newHue, this.mutation, this.maxEnergy);
            this.game.addEntity(newPlant);
            this.automata.plants[(this.y-1 + this.automata.height) % this.automata.height][this.x] = newPlant;
        } 
        else if (this.automata.plants[(this.y-1 + this.automata.height) % this.automata.height][(this.x+1) % this.automata.width] === null) {
            let newPlant = new Plant(this.game, this.automata, (this.x+1) % this.automata.width, (this.y-1 + this.automata.height) % this.automata.height, newHue, this.mutation, this.maxEnergy);
            this.game.addEntity(newPlant);
            this.automata.plants[(this.y-1 + this.automata.height) % this.automata.height][(this.x+1) % this.automata.width] = newPlant;
        } 
        else if (this.automata.plants[this.y][(this.x-1 + this.automata.width) % this.automata.width] === null) {
            let newPlant = new Plant(this.game, this.automata, (this.x-1 + this.automata.width) % this.automata.width, this.y, newHue, this.mutation, this.maxEnergy);
            this.automata.plants[this.y][(this.x-1 + this.automata.width) % this.automata.width] = newPlant;
            this.game.addEntity(newPlant);
        } 
        else if (this.automata.plants[this.y][(this.x+1) % this.automata.width] === null) {
            let newPlant = new Plant(this.game, this.automata, (this.x+1) % this.automata.width, this.y, newHue, this.mutation, this.maxEnergy);
            this.automata.plants[this.y][(this.x+1) % this.automata.width] = newPlant;
            this.game.addEntity(newPlant);
        } 
        else if (this.automata.plants[(this.y+1) % this.automata.height][(this.x-1 + this.automata.width) % this.automata.width] === null) {
            let newPlant = new Plant(this.game, this.automata, (this.x-1 + this.automata.width) % this.automata.width, (this.y+1) % this.automata.height, newHue, this.mutation, this.maxEnergy);
            this.automata.plants[(this.y+1) % this.automata.height][(this.x-1 + this.automata.width) % this.automata.width] = newPlant;
            this.game.addEntity(newPlant);
        } 
        else if (this.automata.plants[(this.y+1) % this.automata.height][this.x] === null) {
            let newPlant = new Plant(this.game, this.automata, this.x, (this.y+1) % this.automata.height, newHue, this.mutation, this.maxEnergy);
            this.automata.plants[(this.y+1) % this.automata.height][this.x] = newPlant;
            this.game.addEntity(newPlant);
        } 
        else if (this.automata.plants[(this.y+1) % this.automata.height][(this.x+1) % this.automata.width] === null) {
            let newPlant = new Plant(this.game, this.automata, (this.x+1) % this.automata.width, (this.y+1) % this.automata.height, newHue, this.mutation, this.maxEnergy);
            this.automata.plants[(this.y+1) % this.automata.height][(this.x+1) % this.automata.width] = newPlant;
            this.game.addEntity(newPlant);
        } 
    }
    die() {
        this.removeFromWorld = true;
        this.automata.removePlant(this.x, this.y);
    }
    update() {
        this.energy++;
        if (this.energy >= this.maxEnergy) {
            this.growPlant();
            this.energy = 0;
        }
        this.energy+=1;
        if (Math.random() < .001) {
            this.die();
        }
    }
    draw(ctx) {
        ctx.fillStyle = hsl(this.hue, 100,50);
		ctx.fillRect(this.x * 1000/ this.automata.width, this.y * 500/ this.automata.height, 1000/ this.automata.width, 500 / this.automata.height);
    }
}