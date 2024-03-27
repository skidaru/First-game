

export default class Preload extends Phaser.Scene {
    constructor() {
        super('Preload');
    }

    
    preload(){

        this.load.atlas('girls', 'Assets/girls/girls.png', 'Assets/girls/girls.json');
        this.load.atlas('GUI', 'Assets/gui/GUI.png', 'Assets/gui/GUI.json');
        this.load.atlas('interiors', 'Assets/interiors/interiors.png', 'Assets/interiors/interiors.json');
        
        
    }

    create(){

        let currentSceneName = this.scene.key;
        console.log("Название текущей сцены: " + currentSceneName); 
        this.scene.start('Scene1');
        
    }
}