import 'phaser';
import img from './assets/images/Scene.png';
export default class lvl3 extends Phaser.Scene{

    constructor(){
        super({key:'lvl3'});
    }

    preload(){
        console.log('preload');
        this.load.image('img', img);
    }

    create(){
        this.step3 = this.sound.add('step3');
        this.step3.play();
        this.image = this.add.sprite(400, 300, 'img');
        this.image.alpha = 0;
    }

    update(){
        this.image.alpha += 0.01;
        if(this.image.alpha >= 1){
            this.triggerTimer = this.time.addEvent({
                callback: ()=>{
                    this.scene.stop('lvl3');
                    this.scene.start('lvl4');
                },
                callbackScope: this,
                delay: 5000,
                loop: false
            });
        }
    }
}