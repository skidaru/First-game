/* eslint-disable linebreak-style */
import Preload from './src/preload.js';
import Scene1 from './src/Scene1.js';


const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [
    Preload,
    Scene1,
  ],
  scale: {
    // Fit to window
    mode: Phaser.Scale.FIT,
    // Center vertically and horizontally
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    mouse: {
      target: window,
      preventDefaultDown: false,
      preventDefaultUp: false,
      preventDefaultMove: false,
    },
  },
  plugins: {
    global: [{
    }],
  },
  pauseOnBlur: false,
  disableVisibilityChange: true,
};


// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);

