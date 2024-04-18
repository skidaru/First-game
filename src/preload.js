/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */

export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }


  preload() {
    this.load.atlas(
        'girls',
        'Assets/girls/girls.png',
        'Assets/girls/girls.json');

    this.load.atlas(
        'GUI',
        'Assets/gui/GUI.png',
        'Assets/gui/GUI.json');

    this.load.atlas(
        'interiors',
        'Assets/interiors/interiors.png',
        'Assets/interiors/interiors.json');

    this.load.atlas(
        'rebith',
        'Assets/gui/rebith.png',
        'Assets/gui/rebith.json');
  }

  create() {
    this.scene.start('Scene1');
  }
}
