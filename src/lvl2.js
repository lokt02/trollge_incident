import 'phaser';
import background from './assets/images/red_wall.png';
import trollgeRes from './assets/images/trollge.json';
import trollgePNG from './assets/images/trollge.png';
import bloodRoad from './assets/images/blood_road.png';
import handPNG from './assets/images/hand.png';

export default class lvl2 extends Phaser.Scene{

    constructor(){
        super({key:'lvl2'});
    }

    preload(){
        console.log('preload');
        this.load.image('background', background);
        this.load.atlas('trollgeatlas', trollgePNG, trollgeRes);
        this.load.image('hand', handPNG);
        this.load.image('blood_road', bloodRoad);
        this.load.audio('foot', 'src/assets/audio/footstep.mp3');
        this.load.audio('danger', 'src/assets/audio/danger.mp3');
    }

    create(){
        this.footstep = this.sound.add('foot');
        
        this.stepTwo = this.sound.add('step2');
        this.stepTwo.play();

        this.dan = this.sound.add('danger');
        this.dan.play();

        for(let i = 0; i < 8; i++) this.add.sprite(400 * (i), 300, 'background');
        for(let i = 0; i < 8; i++) this.add.sprite(400 * (i), 900, 'background');
        for(let i = 0; i < 8; i++) this.add.sprite(400 * (i), 470, 'blood_road');
        this.add.text(100, 150, 'Step 2: Try to fight with your inner demon.');

        this.enemy = this.add.sprite(-600, 440, 'hand');

        this.headOffset = 136;
        this.yCoord = 400;
        this.xCoord = 350;
        this.player = {
            bodyIdle: this.add.sprite(this.xCoord, this.yCoord, 'trollgeatlas', 'stay-0.png'),
            bodyWalking: this.add.sprite(this.xCoord, this.yCoord, 'trollgeatlas', 'run-0.png'),
            head: this.add.sprite(this.xCoord, this.yCoord - this.headOffset, 'trollgeatlas', 'faces-4.png')
        };
        this.player.bodyWalking.alpha = 0;
        
        this.walking = this.anims.create({
            key: 'walk',
            repeat: -1,
            duration: 1000,
            frames: this.anims.generateFrameNames('trollgeatlas', {
                prefix: 'run-',
                suffix: '.png',
                start: 0,
                end: 1
            })
        });
        this.idle = this.anims.create({
            key: 'idle',
            repeat: -1,
            duration: 1000,
            frames: this.anims.generateFrameNames('trollgeatlas', {
                prefix: 'stay-',
                suffix: '.png',
                start: 0,
                end: 1
            })
        })
        this.player.bodyIdle.anims.play('idle');
        this.player.bodyWalking.anims.play('walk');
        this.player.bodyWalking.anims.timeScale = 0.2;
        this.player.bodyIdle.anims.timeScale = 0.1;

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.scaleX = 1;
        this.scaleY = 1;
        this.SetPlayerScale(0.5);
        this.cameras.main.startFollow(this.player.head);
    }

    
    WalkAnim(){
        this.player.bodyWalking.alpha = 1;
        this.player.bodyIdle.alpha = 0;
    }

    IdleAnim(){
        this.player.bodyWalking.alpha = 0;
        this.player.bodyIdle.alpha = 1;
    }

    SetPlayerScaleX(scale){
        this.player.bodyWalking.scaleX = scale;
        this.player.bodyIdle.scaleX = scale;
        this.player.head.scaleX = scale;
        this.scaleX = Math.abs(scale);
        return scale;
    }
    SetPlayerScaleY(scale){
        this.player.bodyWalking.scaleY = scale;
        this.player.bodyIdle.scaleY = scale;
        this.player.head.scaleY = scale;
        this.headOffset = this.headOffset * scale;
        this.scaleY = Math.abs(scale);
        return scale;
    }
    SetPlayerScale(scale){
        this.SetPlayerScaleX(scale);
        this.SetPlayerScaleY(scale);
    }

    update(delta){
        var speed = 10;
        this.enemy.x += 11;
        if(this.keyA.isDown && this.xCoord > 350){
            this.xCoord -= speed;
            this.SetPlayerScaleX(-this.scaleX);
        }
        if(this.keyD.isDown && this.xCoord < 2600){
            this.xCoord += speed;
            this.SetPlayerScaleX(this.scaleX);
        }
        if(this.keyW.isDown && this.yCoord > 380){
            this.yCoord -= speed/4;
        }
        if(this.keyS.isDown && this.yCoord < 420){
            this.yCoord += speed/4;
        }

        if(this.keyA.isUp || this.keyD.isUp || this.keyW.isUp || this.keyS.isUp){
            this.IdleAnim();
        }
        if (this.keyA.isDown || this.keyD.isDown || this.keyW.isDown || this.keyS.isDown){
            if(!this.footstep.isPlaying){this.footstep.play()}
            this.WalkAnim();
        }
        if(this.enemy.x > this.xCoord){
            this.dan.stop();
            this.scene.stop('lvl2');
            this.scene.start('lvl3');
        }

        this.player.head.y = this.yCoord - this.headOffset;
        this.player.head.x = this.xCoord;
        
        this.player.bodyWalking.y = this.yCoord;
        this.player.bodyWalking.x = this.xCoord;
        this.player.bodyIdle.y = this.yCoord;
        this.player.bodyIdle.x = this.xCoord;
    }
}