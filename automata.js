class Automata {
    constructor(game, plantTime, plantDiff, animatTime, animatDiff, width, height) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.plantTime = plantTime;
        this.plantDiff = plantDiff;
        this.animatTime = animatTime;
        this.animatDiff = animatDiff;
        this.plants = new Array(this.height);
        for (let i = 0; i < this.height; i++) {
            this.plants[i] = new Array(this.width).fill(null);
          }
        this.viewWidth = 1000;
        this.viewHeight = 1000;
        this.tickCount = 0;
        this.ticks = 0;
        this.addPlant(new Plant(this.game, this, 0, 0, 180, this.plantDiff, this.plantTime), 0,0);
        this.game.addEntity(new Animat(this.game, this, Math.random() * 180, this.animatDiff, this.animatTime, Math.ceil(this.width /2), Math.ceil(this.height/2)))
        this.game.addEntity(new Animat(this.game, this, Math.random() * 180, this.animatDiff, this.animatTime, 0, this.height - 1))
        this.game.addEntity(new Animat(this.game, this, Math.random() * 180, this.animatDiff, this.animatTime, this.width - 1, this.height - 1))
    }
    addPlant(plant, x, y) {
        this.plants[y][x] = plant;
        this.game.addEntity(plant);
    }
    removePlant(x, y) {
        this.plants[y][x] = null;
    }
    update() {
                  
    }
    draw(ctx) {
        
    }
}