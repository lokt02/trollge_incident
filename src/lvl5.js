import 'phaser';
import img1 from './assets/images/Psycho_killer.png';
export default class lvl5 extends Phaser.Scene{

    constructor(){
        super({key:'lvl5'});
    }

    preload(){
        this.load.image('img1', img1);
        
    }

    create(){
        this.image = this.add.sprite(400, 300, 'img1');
        this.image.alpha = 0;
        
    }

    update(){
        this.image.alpha += 0.01;
        if(this.image.alpha >= 1){
            this.triggerTimer = this.time.addEvent({
                callback: ()=>{
                    this.scene.stop('lvl5');
                    this.scene.start('lvl6');
                },
                callbackScope: this,
                delay: 3000,
                loop: false
            });
        }

    }
}