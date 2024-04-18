'use strict';
/* eslint-disable require-jsdoc */

const UPGRADE_MP = 1.15;
const UPGRADE_DRESS_MP = 13.155;
const UPGRADE_INTERIOR_MP = 21.342;
const UPGRADE_REBITH_MP = 2.332;

const AUTOCLICK_BASE_PRICE = 15;
const DRESS_BASE_PRICE = 450;
const INTERIOR_BASE_PRICE = 750;
const REBITH_BASE_PRICE = 250;

export default class Scene1 extends Phaser.Scene {
  constructor() {
    super('Scene1');

    this.gameState = {

      upgradeInteriorCurrentIndex: 0,

      upgradeDressCurrentIndex: 0,

      money: 0,

      upgradeDressPrice: 450,

      upgradeInteriorPrice: 750,

      upgradeAutoclickPrice: 15,

      upgradeRebithPrice: 250,

      upgradeInteriorCount: 0,

      upgradeDressCount: 0,

      rebithCount: 0,

      mpDress: 1,

      mpInterior: 1,

      mpRebith: 1,

      autoclickValue: 0,

    };
  }

  create() {
    this.bridgeInitiate();

    this.spritesheetInitiate();

    this.managerSprite();

    this.managerText();

    this.managerButton();

    this.managerAnimation();

    this.autoclicker();

    // this.game.events.on('blur', () => {

    // });
    // this.game.events.on('focus', () => {

    // });
  }

  saveGameData() {
    this.bridge.storage.set([
      'upgradeInteriorCurrentIndex', 'upgradeDressCurrentIndex',
      'money', 'upgradeDressPrice', 'upgradeInteriorPrice',
      'upgradeAutoclickPrice', 'upgradeRebithPrice',
      'upgradeInteriorCount', 'upgradeDressCount', 'rebithCount',
      'mpDress', 'mpInterior', 'mpRebith', 'autoclickValue'],
    [this.gameState.upgradeInteriorCurrentIndex,
      this.gameState.upgradeDressCurrentIndex,
      this.gameState.money,
      this.gameState.upgradeDressPrice,
      this.gameState.upgradeInteriorPrice,
      this.gameState.upgradeAutoclickPrice,
      this.gameState.upgradeRebithPrice,
      this.gameState.upgradeInteriorCount,
      this.gameState.upgradeDressCount,
      this.gameState.rebithCount,
      this.gameState.mpDress,
      this.gameState.mpInterior,
      this.gameState.mpRebith,
      this.gameState.autoclickValue])
        .then(() => {
        // данные успешно сохранены
        })
        .catch((error) => {
        });
  }

  loadGameData() {
    this.bridge.storage.get([
      'upgradeInteriorCurrentIndex', 'upgradeDressCurrentIndex',
      'money', 'upgradeDressPrice', 'upgradeInteriorPrice',
      'upgradeAutoclickPrice', 'upgradeRebithPrice',
      'upgradeInteriorCount', 'upgradeDressCount', 'rebithCount',
      'mpDress', 'mpInterior', 'mpRebith', 'autoclickValue'])
        .then((data) => {
          this.gameState.upgradeInteriorCurrentIndex =
          data[0] !== undefined ? data[0] :
          this.gameState.upgradeInteriorCurrentIndex;

          this.gameState.upgradeDressCurrentIndex =
          data[1] !== undefined ? data[1] :
          this.gameState.upgradeDressCurrentIndex;

          this.gameState.money =
          data[2] !== undefined ? data[2] :
          this.gameState.money;

          this.gameState.upgradeDressPrice =
          data[3] !== undefined ? data[3] :
          this.gameState.upgradeDressPrice;

          this.gameState.upgradeInteriorPrice =
          data[4] !== undefined ? data[4] :
          this.gameState.upgradeInteriorPrice;

          this.gameState.upgradeAutoclickPrice =
          data[5] !== undefined ? data[5] :
          this.gameState.upgradeAutoclickPrice;

          this.gameState.upgradeRebithPrice =
          data[6] !== undefined ? data[6] :
          this.gameState.upgradeRebithPrice;

          this.gameState.upgradeInteriorCount =
          data[7] !== undefined ? data[7] :
          this.gameState.upgradeInteriorCount;

          this.gameState.upgradeDressCount =
          data[8] !== undefined ? data[8] :
          this.gameState.upgradeDressCount;

          this.gameState.rebithCount =
          data[9] !== undefined ? data[9] :
          this.gameState.rebithCount;

          this.gameState.mpDress =
          data[10] !== undefined ? data[10] :
          this.gameState.mpDress;

          this.gameState.mpInterior =
          data[11] !== undefined ? data[11] :
          this.gameState.mpInterior;

          this.gameState.mpRebith =
          data[12] !== undefined ? data[12] :
          this.gameState.mpRebith;

          this.gameState.autoclickValue =
          data[13] !== undefined ? data[13] :
          this.gameState.autoclickValue;

          this.variableStartManipulating();
        })
        .catch((error) => {
        });
  }

  update() {
    this.profit = this.gameState.autoclickValue * this.gameState.mpAll;

    // this.numberShower(
    //     this.profit,
    //     this.profitText,
    // );

    this.profitText.text = this.numberFormatter(this.profit) + ' /сек';

    this.numberShower(
        this.gameState.money,
        this.moneyText);

    this.numberShower(
        this.gameState.upgradeDressPrice,
        this.upgradeDressPriceText);

    this.numberShower(
        this.gameState.upgradeAutoclickPrice,
        this.upgradeAutoclickPriceText);

    this.numberShower(
        this.gameState.upgradeInteriorPrice,
        this.upgradeInteriorPriceText);

    this.numberShower(
        this.gameState.mpDress,
        this.mpDressText);

    this.numberShower(
        this.gameState.mpInterior,
        this.mpInteriorText);

    this.numberShower(
        this.gameState.mpRebith,
        this.mpRebithText);

    this.numberShower(
        this.gameState.upgradeRebithPrice,
        this.rebithMenuPriceText);
  }

  managerSprite() {
    this.currentInterior = this.add.image(
        0, 0,
        'interiors',
        'interior1.png')
        .setOrigin(0, 0)
        .setDepth(0);

    this.currentDressGirl = this.add.image(
        719, 113,
        'girls',
        'girl1.png')
        .setOrigin(0, 0)
        .setDepth(1);

    this.buttonAutoclickUpgrade = this.add.image(
        23, 25,
        'GUI',
        'rectangleAutoclick.png')
        .setOrigin(0, 0)
        .setInteractive()
        .setDepth(1);

    this.buttonGirlUpgrade = this.add.image(
        140, 192,
        'GUI',
        'buttonDress.png')
        .setInteractive()
        .setDepth(1);

    this.buttonInteriorUpgrade = this.add.image(
        140, 315,
        'GUI',
        'buttonInterior.png')
        .setInteractive()
        .setDepth(1);

    this.buttonRebith = this.add.image(
        311, 150,
        'GUI',
        'buttonRebith.png')
        .setOrigin(0, 0)
        .setInteractive()
        .setDepth(1);

    this.add.image(
        311, 273,
        'GUI',
        'buttonUnder.png')
        .setOrigin(0, 0)
        .setDepth(1);

    this.add.image(
        54, 420,
        'GUI',
        'rectangleInfo.png')
        .setOrigin(0, 0)
        .setDepth(1);

    this.add.image(
        645, 12,
        'GUI',
        'rectangleMoney.png')
        .setOrigin(0, 0)
        .setDepth(1);

    // this.buttonAd = this.add.image(
    //     418, 39,
    //     'GUI',
    //     'iconAd.png')
    //     .setOrigin(0, 0)
    //     .setInteractive()
    //     .setDepth(1);
    // this.centerSprite( this.buttonAd, 418, 39 );

    // this.buttonSettings = this.add.image(
    //     496, 34,
    //     'GUI',
    //     'iconSettings.png')
    //     .setOrigin(0, 0)
    //     .setInteractive()
    //     .setDepth(1);
    // this.centerSprite( this.buttonSettings, 496, 34 );

    this.buttonSave = this.add.image(
        576, 34,
        'GUI',
        'iconSave.png')
        .setOrigin(0, 0)
        .setInteractive()
        .setDepth(1);
    this.centerSprite( this.buttonSave, 576, 34 );


    this.add.image(
        672, 25,
        'GUI',
        'iconCoin.png')
        .setOrigin(0, 0)
        .setDepth(1);


    this.buttonClickableArea = this.add.rectangle(
        406, 110,
        874, 610,
        0x111, 0)
        .setInteractive()
        .setOrigin(0, 0);

    this.fade = this.add.image(
        0, 0,
        'rebith',
        'rebithFade.png')
        .setOrigin(0, 0)
        .setDepth(3);
    this.fade.visible = false;

    this.menuRebith = this.add.image(
        299, 97,
        'rebith',
        'rebithMenu.png')
        .setOrigin(0, 0)
        .setDepth(3);
    this.menuRebith.visible = false;

    this.menuRebithButtonRebith = this.add.image(
        392, 501,
        'rebith',
        'rebithMenuButton.png')
        .setInteractive()
        .setOrigin(0, 0)
        .setDepth(4);
    this.menuRebithButtonRebith.visible = false;
    this.centerSprite(this.menuRebithButtonRebith, 392, 501);

    this.menuRebithButtonExit = this.add.image(
        871, 113,
        'rebith',
        'rebithMenuButtonExit.png')
        .setInteractive()
        .setOrigin(0, 0)
        .setDepth(4);
    this.menuRebithButtonExit.visible = false;
    this.centerSprite(this.menuRebithButtonExit, 871, 113);
  }

  managerText() {
    this.upgradeAutoclickText = this.add.text(
        39, 42,
        'Улучшение',
        {fontSize: '31px', fill: '#000',
          align: 'center', fontFamily: 'ShantellSans'})
        .setOrigin(0, 0)
        .setDepth(2);
    // this.centerSprite(this.upgradeAutoclickText, 39, 42);

    this.upgradeAutoclickPriceText = this.add.text(
        232, 45,
        '1000',
        {fontSize: '31px', fill: '#000',
          align: 'center', fontFamily: 'ShantellSans'})
        .setOrigin(0, 0)
        .setDepth(2);
    this.centerSprite(this.upgradeAutoclickPriceText, 232, 45);

    this.upgradeDressPriceText = this.add.text(
        98, 170,
        'upgradeAutoclickPriceText ',
        {fontSize: '31px', fill: '#000',
          align: 'left', fontFamily: 'ShantellSans'})
        .setOrigin(0, 0)
        .setDepth(2);

    this.upgradeInteriorPriceText = this.add.text(
        100, 294,
        '1000',
        {fontSize: '31px', fill: '#000',
          align: 'left', fontFamily: 'ShantellSans'})
        .setOrigin(0, 0)
        .setDepth(2);

    this.moneyText = this.add.text(
        767, 36,
        '1000',
        {fontSize: '47px', fill: '#000',
          align: 'left', fontFamily: 'ShantellSans'})
        .setOrigin(0, 0)
        .setDepth(2);

    this.interierMPText = this.add.text(
        93, 489,
        'Множитель интерьера :',
        {fontSize: '17px', fill: '#000',
          align: 'left', fontFamily: 'ShantellSans'})
        .setOrigin(0, 0)
        .setDepth(2);

    this.interierMPText = this.add.text(
        69, 443,
        'Множитель перерождения :',
        {fontSize: '17px', fill: '#000',
          align: 'right', fontFamily: 'ShantellSans'})
        .setOrigin(0, 0)
        .setDepth(2);

    this.girlMPText = this.add.text(
        103, 538,
        'Множитель девушки :',
        {fontSize: '17px', fill: '#000',
          align: 'right', fontFamily: 'ShantellSans'})
        .setOrigin(0, 0)
        .setDepth(2);

    this.girlIncomeText = this.add.text(
        127, 577,
        'Прибыль девушки :',
        {fontSize: '17px', fill: '#000',
          align: 'right', fontFamily: 'ShantellSans'})
        .setOrigin(0, 0)
        .setDepth(2);

    this.mpInteriorText = this.add.text(
        328, 500,
        '0',
        {fontSize: '20px', fill: '#000',
          align: 'center', fontFamily: 'ShantellSans'})
        .setOrigin(0.5, 0.5)
        .setDepth(2);

    this.mpRebithText = this.add.text(
        328, 453,
        '0',
        {fontSize: '17px', fill: '#000',
          align: 'center', fontFamily: 'ShantellSans'})
        .setOrigin(0.5, 0.5)
        .setDepth(2);

    this.mpDressText = this.add.text(
        328, 549,
        '0',
        {fontSize: '20px', fill: '#000',
          align: 'right', fontFamily: 'ShantellSans'})
        .setOrigin(0.5, 0.5)
        .setDepth(2);

    this.profitText = this.add.text(
        210, 629,
        '0',
        {fontSize: '20px', fill: '#000',
          align: 'right', fontFamily: 'ShantellSans'})
        .setOrigin(0.5, 0.5)
        .setDepth(2);

    this.rebithMenuInfoText = this.add.text(
        640, 214,
        `Перерождение даёт дополнительный множитель
  к заработку. Внимание! взамен стираются 
   всe накопленные деньги и улучшения`,
        {fontSize: '25px', fill: '#000',
          align: 'center', fontFamily: 'ShantellSans'})
        .setOrigin(0.5, 0)
        .setDepth(5);
    this.rebithMenuInfoText.visible = false;

    this.RebithMenuTitleText = this.add.text(
        640, 134,
        `ПЕРЕРОЖДЕНИЕ`,
        {fontSize: '40px', fill: '#000',
          align: 'center', fontFamily: 'ShantellSans'})
        .setOrigin(0.5, 0)
        .setDepth(5);
    this.RebithMenuTitleText.visible = false;

    this.rebithMenuPriceText = this.add.text(
        640, 510,
        `999.99Oc`,
        {fontSize: '40px', fill: '#000',
          align: 'center', fontFamily: 'ShantellSans'})
        .setOrigin(0.5, 0)
        .setDepth(5);
    this.rebithMenuPriceText.visible = false;

    this.versionText = this.add.text(
        1280, 715,
        `v1.1.1 A`,
        {fontSize: '20px', fill: '#111',
          align: 'center', fontFamily: 'Open Sans'})
        .setOrigin(1, 1)
        .setDepth(5);
    this.rebithMenuPriceText.visible = false;
  }

  managerAnimation() {

  }

  managerButton() {
    // this.buttonAd.on('pointerdown', (pointer) =>{
    //   if (pointer.event.button === 0) {

    //   }
    // });

    // this.buttonAd.on('pointerover', () => {
    //   this.tweens.add({
    //     targets: this.buttonAd,
    //     scaleX: 1.03,
    //     scaleY: 1.03,
    //     ease: 'Power1',
    //     duration: 150,
    //   });
    // });

    // this.buttonAd.on('pointerout', () => {
    //   this.tweens.add({
    //     targets: this.buttonAd,
    //     scaleX: 1,
    //     scaleY: 1,
    //     ease: 'Power1',
    //     duration: 150,
    //   });
    // });

    this.buttonGirlUpgrade.on('pointerdown', (pointer) => {
      if (pointer.event.button === 0 || (pointer.isDown && pointer.wasTouch)) {
        this.upgradeDressBuy();
      }
    });

    // this.buttonGirlUpgrade.on('pointerover', () => {
    //   this.tweens.add({
    //     targets: this.buttonGirlUpgrade,
    //     scaleX: 1.03,
    //     scaleY: 1.03,
    //     ease: 'Power1',
    //     duration: 150,
    //   });
    // });

    // this.buttonGirlUpgrade.on('pointerout', () => {
    //   this.tweens.add({
    //     targets: this.buttonGirlUpgrade,
    //     scaleX: 1,
    //     scaleY: 1,
    //     ease: 'Power1',
    //     duration: 150,
    //   });
    // });


    this.buttonInteriorUpgrade.on('pointerdown', (pointer) =>{
      if (pointer.event.button === 0 || (pointer.isDown && pointer.wasTouch)) {
        this.upgradeInteriorBuy();
      }
    });

    // this.buttonInteriorUpgrade.on('pointerover', () => {
    //   this.tweens.add({
    //     targets: this.buttonInteriorUpgrade,
    //     scaleX: 1.03,
    //     scaleY: 1.03,
    //     ease: 'Power1',
    //     duration: 150,
    //   });
    // });

    // this.buttonInteriorUpgrade.on('pointerout', () => {
    //   this.tweens.add({
    //     targets: this.buttonInteriorUpgrade,
    //     scaleX: 1,
    //     scaleY: 1,
    //     ease: 'Power1',
    //     duration: 150,
    //   });
    // });


    this.buttonRebith.on('pointerdown', (pointer) =>{
      if (pointer.event.button === 0 || (pointer.isDown && pointer.wasTouch)) {
        this.menuRebithOpen();
      }
    });

    // this.buttonRebith.on('pointerover', () => {
    //   this.tweens.add({
    //     targets: this.buttonRebith,
    //     scaleX: 1.03,
    //     scaleY: 1.03,
    //     ease: 'Power1',
    //     duration: 150,
    //   });
    // });

    // this.buttonRebith.on('pointerout', () => {
    //   this.tweens.add({
    //     targets: this.buttonRebith,
    //     scaleX: 1,
    //     scaleY: 1,
    //     ease: 'Power1',
    //     duration: 150,
    //   });
    // });


    this.buttonSave.on('pointerdown', (pointer) =>{
      if (pointer.event.button === 0 || (pointer.isDown && pointer.wasTouch)) {
        this.saveGameData();
      }
    });

    this.buttonSave.on('pointerdown', () => {
      this.tweens.add({
        targets: this.buttonSave,
        scaleX: 0.8,
        scaleY: 0.8,
        ease: 'Power1',
        duration: 150,
      });
    });

    this.buttonSave.on('pointerup', () => {
      this.tweens.add({
        targets: this.buttonSave,
        scaleX: 1,
        scaleY: 1,
        ease: 'Power1',
        duration: 150,
      });
    });

    this.buttonSave.on('pointerout', () => {
      this.tweens.add({
        targets: this.buttonSave,
        scaleX: 1,
        scaleY: 1,
        ease: 'Power1',
        duration: 150,
      });
    });

    // this.buttonSettings.on('pointerdown', (pointer) =>{
    //   if (pointer.event.button === 0 || (pointer.isDown && pointer.wasTouch)) {

    //   }
    // });

    // this.buttonSettings.on('pointerover', () => {
    //   this.tweens.add({
    //     targets: this.buttonSettings,
    //     scaleX: 1.03,
    //     scaleY: 1.03,
    //     ease: 'Power1',
    //     duration: 150,
    //   });
    // });

    // this.buttonSettings.on('pointerout', () => {
    //   this.tweens.add({
    //     targets: this.buttonSettings,
    //     scaleX: 1,
    //     scaleY: 1,
    //     ease: 'Power1',
    //     duration: 150,
    //   });
    // });


    this.buttonClickableArea.on('pointerdown', (pointer) =>{
      if (pointer.event.button === 0 || (pointer.isDown && pointer.wasTouch)) {
        this.gameState.money += 1 * this.gameState.mpAll;
      }
    });

    this.buttonAutoclickUpgrade.on('pointerdown', (pointer) =>{
      if (pointer.event.button === 0 || (pointer.isDown && pointer.wasTouch)) {
        this.upgradeAutoclickBuy();
      }
    });


    this.menuRebithButtonExit.on('pointerdown', (pointer) =>{
      if (pointer.event.button === 0 || (pointer.isDown && pointer.wasTouch)) {
        this.menuRebithClose();
      }
    });

    this.menuRebithButtonRebith.on('pointerdown', (pointer) =>{
      if (pointer.event.button === 0 || (pointer.isDown && pointer.wasTouch)) {
        this.rebithButtonPressed();
      }
    });
  }

  mainButtonsInteractiveOff() {
    this.buttonAutoclickUpgrade.removeInteractive();
    this.buttonClickableArea.removeInteractive();
    this.buttonGirlUpgrade.removeInteractive();
    this.buttonInteriorUpgrade.removeInteractive();
    this.buttonRebith.removeInteractive();
    this.buttonSave.removeInteractive();
  }

  mainButtonsInteractiveOn() {
    this.buttonAutoclickUpgrade.setInteractive();
    this.buttonClickableArea.setInteractive();
    this.buttonGirlUpgrade.setInteractive();
    this.buttonInteriorUpgrade.setInteractive();
    this.buttonRebith.setInteractive();
    this.buttonSave.setInteractive();
  }

  numberFormatter(num) {
    if (num >= 1e36) {
      return (num / 1e36).toFixed(2).replace(/\.0$/, '') + 'Un';
    }
    if (num >= 1e33) {
      return (num / 1e33).toFixed(2).replace(/\.0$/, '') + 'Dc';
    }
    if (num >= 1e30) {
      return (num / 1e30).toFixed(2).replace(/\.0$/, '') + 'No';
    }
    if (num >= 1e27) {
      return (num / 1e27).toFixed(2).replace(/\.0$/, '') + 'Oc';
    }
    if (num >= 1e24) {
      return (num / 1e24).toFixed(2).replace(/\.0$/, '') + 'Sp';
    }
    if (num >= 1e21) {
      return (num / 1e21).toFixed(2).replace(/\.0$/, '') + 'Sx';
    }
    if (num >= 1e18) {
      return (num / 1e18).toFixed(2).replace(/\.0$/, '') + 'Qu';
    }
    if (num >= 1e15) {
      return (num / 1e15).toFixed(2).replace(/\.0$/, '') + 'q';
    }
    if (num >= 1e12) {
      return (num / 1e12).toFixed(2).replace(/\.0$/, '') + 'T';
    }
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(2).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(2).replace(/\.0$/, '') + 'K';
    }
    if (Number.isInteger(num)) {
      return num;
    }
    return num.toFixed(2);
  }

  numberShower(num, thistext) {
    thistext.text = this.numberFormatter(num);
  }

  upgradeAutoclickBuy() {
    if (this.gameState.money >= this.gameState.upgradeAutoclickPrice) {
      this.gameState.money -= this.gameState.upgradeAutoclickPrice;
      this.gameState.autoclickValue++;
      this.gameState.upgradeAutoclickPrice =
      AUTOCLICK_BASE_PRICE * (UPGRADE_MP ** this.gameState.autoclickValue);
      this.saveGameData();
    }
  }

  upgradeInteriorBuy() {
    if (
      this.gameState.money >= this.gameState.upgradeInteriorPrice &&
      this.gameState.upgradeInteriorCurrentIndex <
      this.upgradeInteriorKeys.length - 1) {
      this.gameState.money -= this.gameState.upgradeInteriorPrice;

      this.gameState.upgradeInteriorCurrentIndex++;

      this.gameState.upgradeInteriorCount++;

      this.gameState.mpInterior =
      this.gameState.upgradeInteriorCount * 0.75 + 1;


      this.currentInterior.setFrame(
          this.upgradeInteriorKeys[this.gameState.upgradeInteriorCurrentIndex]);

      this.gameState.upgradeInteriorPrice =
      INTERIOR_BASE_PRICE * (
        UPGRADE_INTERIOR_MP ** this.gameState.upgradeInteriorCurrentIndex);
      this.saveGameData();
    }
    this.gameState.mpAll = this.gameState.mpDress *
    this.gameState.mpInterior * this.gameState.mpRebith;
  }

  upgradeDressBuy() {
    if (
      this.gameState.money >= this.gameState.upgradeDressPrice &&
      this.gameState.upgradeDressCurrentIndex <
      this.upgradeDressKeys.length - 1) {
      this.gameState.money -= this.gameState.upgradeDressPrice;

      this.gameState.upgradeDressCurrentIndex++;

      this.gameState.upgradeDressCount++;

      this.gameState.mpDress = this.gameState.upgradeDressCount * 0.25 + 1;

      this.currentDressGirl.setFrame(
          this.upgradeDressKeys[this.gameState.upgradeDressCurrentIndex]);

      this.gameState.upgradeDressPrice =
      DRESS_BASE_PRICE * (
        UPGRADE_DRESS_MP ** this.gameState.upgradeDressCurrentIndex);

      this.gameState.mpAll = this.gameState.mpDress *
      this.gameState.mpInterior * this.gameState.mpRebith;
      this.saveGameData();
    }
  }

  menuRebithOpen() {
    if (this.menuRebithIsOpen === false) {
      this.menuRebithIsOpen = true;

      this.mainButtonsInteractiveOff();

      this.fade.visible = true;
      this.menuRebith.visible = true;
      this.menuRebithButtonExit.visible = true;
      this.menuRebithButtonRebith.visible = true;
      this.RebithMenuTitleText.visible = true;
      this.rebithMenuInfoText.visible = true;
      this.rebithMenuPriceText.visible = true;
      this.saveGameData();
    }
  }

  menuRebithClose() {
    if (this.menuRebithIsOpen === true) {
      this.menuRebithIsOpen = false;

      this.mainButtonsInteractiveOn();

      this.fade.visible = false;
      this.menuRebith.visible = false;
      this.menuRebithButtonExit.visible = false;
      this.menuRebithButtonRebith.visible = false;
      this.RebithMenuTitleText.visible = false;
      this.rebithMenuInfoText.visible = false;
      this.rebithMenuPriceText.visible = false;
      this.saveGameData();
    }
  }

  rebithButtonPressed() {
    if (this.gameState.money >= this.gameState.upgradeRebithPrice) {
      this.gameState.money = 0;

      this.gameState.upgradeInteriorCount = 0;

      this.gameState.mpInterior = 1;

      this.gameState.upgradeInteriorPrice = INTERIOR_BASE_PRICE;

      this.gameState.upgradeInteriorCurrentIndex = 0;

      this.currentInterior.setFrame(
          this.upgradeInteriorKeys[this.gameState.upgradeInteriorCurrentIndex]);

      this.gameState.upgradeDressCount = 0;

      this.gameState.mpDress = 1;

      this.gameState.upgradeDressPrice = DRESS_BASE_PRICE;

      this.gameState.upgradeDressCurrentIndex = 0;

      this.currentDressGirl.setFrame(
          this.upgradeDressKeys[this.gameState.upgradeDressCurrentIndex]);

      this.gameState.upgradeAutoclickCount = 0;

      this.gameState.autoclickValue = 0;

      this.gameState.upgradeAutoclickPrice = AUTOCLICK_BASE_PRICE;

      this.gameState.rebithCount++;

      this.gameState.mpRebith = this.gameState.rebithCount * 1 + 1;

      this.gameState.upgradeRebithPrice =
      REBITH_BASE_PRICE * (UPGRADE_REBITH_MP ** this.gameState.rebithCount);

      this.gameState.mpAll = this.gameState.mpDress *
      this.gameState.mpInterior * this.gameState.mpRebith;
      this.saveGameData();
    }
  }


  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  autoclickLogic() {
    this.gameState.money += (this.gameState.autoclickValue *
      this.gameState.mpAll) / 100;
  }

  centerSprite(sprite, x, y) {
    const centerX = x + sprite.displayWidth * 0.5;
    const centerY = y + sprite.displayHeight * 0.5;

    sprite.setOrigin(0.5, 0.5);

    sprite.setPosition(centerX, centerY);
  }


  autoclicker() {
    this.time.addEvent({
      delay: 10,
      callback: this.autoclickLogic,
      callbackScope: this,
      loop: true,
    });
  }

  bridgeInitiate() {
    this.bridge = window.bridge;
    this.bridge.initialize()
        .then(() => {
          bridge.platform.sendMessage('game_ready');
          this.loadGameData();
        })
        .catch((error) => {
          // ошибка, что-то пошло не так
        });
  }

  spritesheetInitiate() {
    this.upgradeDressKeys = [
      'girl1.png', 'girl2.png', 'girl3.png',
      'girl4.png', 'girl5.png', 'girl6.png',
      'girl7.png', 'girl8.png', 'girl9.png',
      'girl10.png', 'girl11.png', 'girl12.png'];

    this.upgradeInteriorKeys = [
      'interior1.png', 'interior2.png',
      'interior3.png', 'interior4.png',
      'interior5.png', 'interior6.png'];
  }

  variableStartManipulating() {
    this.gameState.mpAll = this.gameState.mpDress *
    this.gameState.mpInterior * this.gameState.mpRebith;

    this.menuRebithIsOpen = false;

    this.profit = 0;
    this.currentDressGirl.setFrame(
        this.upgradeDressKeys[this.gameState.upgradeDressCurrentIndex]);
    this.currentInterior.setFrame(
        this.upgradeInteriorKeys[this.gameState.upgradeInteriorCurrentIndex]);
  }
}
