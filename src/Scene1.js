
const UPGRADE_MP = 1.155;
const UPGRADE_DRESS_MP = 13.155;
const UPGRADE_INTERIOR_MP = 19.342;

const AUTOCLICK_BASE_PRICE = 25;
const DRESS_BASE_PRICE = 5000;
const INTERIOR_BASE_PRICE = 15000;

export default class Scene1 extends Phaser.Scene {
    constructor() {
        
        super('Scene1');

        this.money = 99999999999999999;

        this.upgradeDressPrice = 5000;
        this.upgradeInteriorPrice = 15000;
        this.upgradeAutoclickPrice = 25;
        this.upgradeRebithPrice = 50000;

        this.upgradeAutoclickCount = 0;
        
        this.upgradeInteriorCount = 0;
        
        this.mpDress = 1;
        this.mpInterior = 1;
        this.mpRebith = 1;
        this.mpAll = this.mpDress * this.mpInterior * this.mpRebith;

        this.autoclickValue = 0;

        this.upgradeDressKeys = ['girl1.png', 'girl2.png', 'girl3.png', 'girl4.png', 'girl5.png', 'girl6.png',
         'girl7.png', 'girl8.png', 'girl9.png', 'girl10.png', 'girl11.png', 'girl12.png'];

        this.upgradeDressCurrentIndex = 0;

        
    }

    create(){

        this.managerSprite();

        this.managerText();

        this.managerButton();


        this.AutoclickLogic();

            
    }

    update(){

        this.numberShower(this.numberReducer(this.money), this.moneyText);
        this.numberShower(this.numberReducer(this.upgradeAutoclickPrice), this.upgradeAutoclickPriceText);
        this.numberShower(this.numberReducer(this.upgradeDressPrice), this.upgradeDressPriceText);
        this.numberShower(this.numberReducer(this.upgradeInteriorPrice), this.upgradeInteriorPriceText);

        this.mpInterior === 1 ? this.mpInteriorText.setText(0) : this.mpInteriorText.setText(this.mpInterior);
        this.mpRebith === 1 ? this.mpRebithText.setText(0) : this.mpRebithText.setText(this.mpRebith);
        this.mpDress === 1 ? this.mpDressText.setText(0) : this.mpDressText.setText(this.mpDress);

        

    }

//Dev

    managerSprite(){
        this.add.image(0,0, 'interiors', 'interior1.png')
        .setOrigin(0,0);

        this.currentDressGirl = this.add.image(719, 113, 'girls', 'girl1.png')
        .setOrigin(0,0)
        

        this.buttonAutoclickUpgrade = this.add.image(23, 25, 'GUI', 'Rectangle7.png')
        .setOrigin(0,0)
        .setInteractive();

        this.buttonGirlUpgrade = this.add.image(23, 149, 'GUI', 'Rectangle3.png')
        .setOrigin(0,0)
        .setInteractive();

        this.buttonInteriorUpgrade = this.add.image(223, 149, 'GUI', 'Rectangle3.png')
        .setOrigin(0,0)
        .setInteractive();

        this.buttonRebith = this.add.image(23, 261, 'GUI', 'Rectangle3.png')
        .setOrigin(0,0)
        .setInteractive();

        this.add.image(223, 261, 'GUI', 'Rectangle4.png')
        .setOrigin(0,0);

        this.add.image(23, 399, 'GUI', 'Rectangle5.png')
        .setOrigin(0,0);

        this.add.image(645, 12, 'GUI', 'Rectangle1.png')
        .setOrigin(0,0);

        this.add.image(234, 167, 'GUI', 'interiorButton.png')
        .setOrigin(0,0);

        this.add.image(74, 272, 'GUI', 'rebithButton.png')
        .setOrigin(0,0);

        this.add.image(274, 272, 'GUI', 'underConstruction.png')
        .setOrigin(0,0);

        this.buttonAd = this.add.image(418, 39, 'GUI', 'adButton.png')
        .setOrigin(0,0)
        .setInteractive();

        this.buttonSettings = this.add.image(496, 34, 'GUI', 'settingsButton.png')
        .setOrigin(0,0)
        .setInteractive();

        this.buttonSave = this.add.image(576, 34, 'GUI', 'saveButton.png')
        .setOrigin(0,0)
        .setInteractive();

        this.add.image(672, 25, 'GUI', 'coin.png')
        .setOrigin(0,0);


        this.buttonClickableArea = this.add.rectangle(406, 110, 874, 610, 0x111, 0)
        .setInteractive()
        .setOrigin(0,0); 
    }

    managerText(){


        this.add.text(53, 45, 'Улучшение', { fontSize: '31px', fill: '#000', 
        align: 'center', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);
        
        this.upgradeAutoclickPriceText =  this.add.text(264, 45, '1000', { fontSize: '31px', fill: '#000', 
        align: 'left', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);

        this.upgradeDressPriceText =  this.add.text(83, 170, '1000', { fontSize: '31px', fill: '#000', 
        align: 'left', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);

        this.upgradeInteriorPriceText =  this.add.text(294, 170, '1000', { fontSize: '31px', fill: '#000', 
        align: 'left', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);

        this.moneyText =  this.add.text(767, 36, '1000', { fontSize: '47px', fill: '#000', 
        align: 'left', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);

        this.add.text(77, 459, 'Множитель интерьера :', { fontSize: '17px', fill: '#000', 
        align: 'right', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);

        this.add.text(43, 502, 'Множитель перерождения :', { fontSize: '17px', fill: '#000', 
        align: 'right', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);

        this.add.text(91, 551, 'Множитель девушки :', { fontSize: '17px', fill: '#000', 
        align: 'right', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);

        this.add.text(98, 600, 'Прибыль с девушки :', { fontSize: '17px', fill: '#000', 
        align: 'right', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);

        this.mpInteriorText = this.add.text(301, 457, '0', { fontSize: '20px', fill: '#000', 
        align: 'right', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);

        this.mpRebithText = this.add.text(301, 499, '0', { fontSize: '20px', fill: '#000', 
        align: 'right', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);

        this.mpDressText = this.add.text(301, 548, '0', { fontSize: '20px', fill: '#000', 
        align: 'right', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);

        this.profit = this.add.text(301, 596, '0', { fontSize: '20px', fill: '#000', 
        align: 'right', fontFamily: 'ShantellSans' })
        .setOrigin(0,0);
        

    }


    managerButton(){

        this.buttonAd.on('pointerdown', (pointer) =>{
            if (pointer.event.button === 0) {
                
            }
        })

        this.buttonGirlUpgrade.on('pointerdown', (pointer) =>{
            if (pointer.event.button === 0) {
                this.upgradeDressBuy();
            }
        })

        this.buttonInteriorUpgrade.on('pointerdown', (pointer) =>{
            if (pointer.event.button === 0) {
                
            }
        })

        this.buttonRebith.on('pointerdown', (pointer) =>{
            if (pointer.event.button === 0) {
                
            }
        })

        this.buttonSave.on('pointerdown', (pointer) =>{
            if (pointer.event.button === 0) {
                
            }
        })

        this.buttonSettings.on('pointerdown', (pointer) =>{
            if (pointer.event.button === 0) {
                
            }
        })
        
        this.buttonClickableArea.on('pointerdown', (pointer) =>{
            
            if (pointer.event.button === 0) {
                this.money += 1 * this.mpAll;
                
            }
            
        })

        this.buttonAutoclickUpgrade.on('pointerdown', (pointer) =>{
            if (pointer.event.button === 0) {
                this.upgradeAutoclickBuy()
            }
        })


    }

    buttonRebithClick(){
        
    }

    numberReducer(numberToReduce){
        

        if (numberToReduce >=0 && numberToReduce < 1000){

            return this.numberRounder(numberToReduce, 2);   

        }else if (numberToReduce >=1000 && numberToReduce < 1000000){

            numberToReduce /= 1000;
            return this.numberRounder(numberToReduce, 2) + ' K';

        }else if (numberToReduce >=1000000 && numberToReduce < 1000000000){

            numberToReduce /= 1000000;
            return this.numberRounder(numberToReduce, 2) + ' M';

        }else if (numberToReduce >=1000000000 && numberToReduce < 1000000000000){

            numberToReduce /= 1000000000;
            return this.numberRounder(numberToReduce, 2) + ' B';

        }else if (numberToReduce >=1000000000000 && numberToReduce < 1000000000000000){

            numberToReduce /= 1000000000000;
            return this.numberRounder(numberToReduce, 2) + ' T';

        }else if (numberToReduce >=1000000000000000 && numberToReduce < 1000000000000000000){

            numberToReduce /= 1000000000000000;
            return this.numberRounder(numberToReduce, 2) + ' Q';

        }else if (numberToReduce >=1000000000000000000 && numberToReduce < 1000000000000000000000){

            numberToReduce /= 1000000000000000000;
            return this.numberRounder(numberToReduce, 2) + ' Qu';

        }else if (numberToReduce >=1000000000000000000000 && numberToReduce < 1000000000000000000000000){

            numberToReduce /= 1000000000000000000000;
            return this.numberRounder(numberToReduce, 2) + ' Se';

        }else if (numberToReduce >=1000000000000000000000000 && numberToReduce < 1000000000000000000000000000){

            numberToReduce /= 1000000000000000000000000;
            return this.numberRounder(numberToReduce, 2) + ' Sp';

        }else if (numberToReduce >=1000000000000000000000000000 && numberToReduce < 1000000000000000000000000000000){

            numberToReduce /= 1000000000000000000000000000;
            return this.numberRounder(numberToReduce, 2) + ' Oc';

        }else return 'infinity';
    }

    numberRounder(numberToRound, numbersAfterDot){
        if (numbersAfterDot >= 0){
            if (Number.isInteger(numberToRound)) return numberToRound
            else return numberToRound.toFixed(numbersAfterDot);

        }else console.log('error (numbersAfterDot is not valid), recieved ' + numbersAfterDot);
    }   

    numberShower(numberToShow, text){

        text.setText(numberToShow);
    }

    upgradeAutoclickBuy(){
        if(this.money >= this.upgradeAutoclickPrice){

            this.money -= this.upgradeAutoclickPrice;
            this.autoclickValue++;
            this.upgradeAutoclickPrice = AUTOCLICK_BASE_PRICE * (UPGRADE_MP ** this.autoclickValue);

        }
    }

    upgradeInteriorBuy(){
        if(this.money >= this.upgradeAutoclickPrice){

            this.money -= this.upgradeAutoclickPrice;
            this.autoclickValue++;
            this.upgradeAutoclickPrice = AUTOCLICK_BASE_PRICE * (UPGRADE_MP ** this.autoclickValue);

        }
    }

    upgradeDressBuy(){
        if(this.money >= this.upgradeDressPrice && this.upgradeDressCurrentIndex < this.upgradeDressKeys.length - 1){

            this.money -= this.upgradeDressPrice;
                
            this.upgradeDressCurrentIndex++;
            this.currentDressGirl.setFrame(this.upgradeDressKeys[this.upgradeDressCurrentIndex]);

            this.upgradeDressPrice = DRESS_BASE_PRICE * (UPGRADE_DRESS_MP ** this.upgradeDressCurrentIndex);

            
            

        }
    }


    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async AutoclickLogic(){
        while(true){
        await this.wait(10);   
        this.money += (this.autoclickValue * this.mpAll)/100;
        }
    }


    
}

