import Preload from './src/preload.js';
import Menu from './src/menu.js';

class Main extends Phaser.Scene {
    constructor() {
        super('Main');
    }
    config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            Preload,
            Menu
        }
    };
    
    game = new Phaser.Game(config);
}





