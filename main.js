const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);
	

	let submitButton = document.getElementById("submitSettings");
	submitButton.addEventListener("click", ()=> {
		let plantTime = parseInt(document.getElementById("plantTime").value, 10);
		let plantDiff = parseInt(document.getElementById("plantDiff").value, 10);
		let animatMax = parseInt(document.getElementById("animatMax").value, 10);
		let animatDiff = parseInt(document.getElementById("animatDiff").value, 10);
		let width = parseInt(document.getElementById("width").value, 10);
		let height = parseInt(document.getElementById("height").value, 10);
		console.log("Plant Time to Mature: " + plantTime)
		console.log("Plant Hue Mutation: " + plantDiff)
		console.log("Max Animat Energy: " + animatMax)
		console.log("Animat Hue Mutation: " + animatDiff)
		console.log("Width: " + width)
		console.log("Height: " + height)
		document.getElementById("initSettings").remove();
		gameEngine.addEntity(new Automata(gameEngine, plantTime, plantDiff, animatMax, animatDiff, width, height));
		gameEngine.start();
	});

	
    
	
});