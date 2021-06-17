import 'phaser';
import menuIMG from './assets/images/menu.png';
export default class Menu extends Phaser.Scene{

    constructor(){
        super({key:'menu'});
    }

    preload(){
        console.log('preload');
        this.load.image('menuIMG', menuIMG);
    }

    create(){
        this.image = this.add.sprite(400, 300, 'menuIMG');
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if(this.space.isDown){
            this.scene.stop('menu');
            this.scene.start('intro');
        }
    }
}