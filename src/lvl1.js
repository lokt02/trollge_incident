import 'phaser';
import background from './assets/images/red_wall.png';
import trollgeRes from './assets/images/trollge.json';
import trollgePNG from './assets/images/trollge.png';
import bloodRoad from './assets/images/blood_road.png';
import entityRes from './assets/images/entity/entity.json';
import entityPNG from './assets/images/entity/entity.png';

export default class lvl1 extends Phaser.Scene{
    
    constructor(){
        super({key:'lvl1'});
    }

    preload(){
        console.log('preload');
        this.load.image('background', background);
        this.load.atlas('trollgeatlas', trollgePNG, trollgeRes);
        this.load.atlas('evilatlas', entityPNG, entityRes);
        this.load.image('blood_road', bloodRoad);
        this.load.audio('foot', 'src/assets/audio/footstep.mp3');
    }

    create(){
        console.log('create');
        this.footstep = this.sound.add('foot');
        this.stepOne = this.sound.add('step1');
        this.stepOne.play();

        this.dialoge = [
            this.sound.add('11'),
            this.sound.add('12'),
            this.sound.add('13'),
            this.sound.add('14'),
            this.sound.add('15'),
            this.sound.add('16'),
            this.sound.add('17'),
            this.sound.add('18'),
            this.sound.add('19'),
            this.sound.add('110')
        ];

        for(let i = 0; i < 8; i++) this.add.sprite(400 * (i), 300, 'background');
        for(let i = 0; i < 8; i++) this.add.sprite(400 * (i), 900, 'background');
        for(let i = 0; i < 8; i++) this.add.sprite(400 * (i), 470, 'blood_road');
        this.add.text(100, 150, 'Step 1: Look deep in your mind and find your true essence.');

        this.playerText = this.add.text(2300, 250, '');
        this.monsterText = this.add.text(2530, 150, '', {font: '18px Arial', fill: '#000000'});

        this.textSay = [
            '',
            'What the hell are you and where am I?',
            'You even dont realise how many troubles\n you caused to this world.\n Do you want to die to make this world better?',
            'You didnt answer my questions, monster.',
            'This place is your mind... And I am you.',
            'You are not me. I am just\n human but you are monster.',
            'Are you sure about that? \n Do you remember what you have done, murderer? \n You are moster as me.',
            'NO! I AM HUMAN!',
            'Hey. Just relax, buddy. You tired.\n Give me control over you body.\n I will resolve all you problems, I promise.',
            'Just die, awful bieng!',
            'So, you dont want to accept me. \n Hah, that does not matter.\n I just take your body by myself.'
        ];

        this.entity = {
            idle_1: this.add.sprite(2800, 350, 'evilatlas', 'entity_idle1.png'),
            idle_2: this.add.sprite(2800, 350, 'evilatlas', 'entity_idle2.png'),
            smh_1: this.add.sprite(2800, 350, 'evilatlas', 'entity_smh1.png'),
            smh_2: this.add.sprite(2800, 350, 'evilatlas', 'entity_smh2.png'),
            laugh_1: this.add.sprite(2800, 350, 'evilatlas', 'entity_laugh1.png'),
            laugh_2: this.add.sprite(2800, 350, 'evilatlas', 'entity_laugh2.png')
        };
        this.entity.idle_2.alpha = 0;
        this.entity.smh_1.alpha = 0;
        this.entity.smh_2.alpha = 0;
        this.entity.laugh_1.alpha = 0;
        this.entity.laugh_2.alpha = 0;

        this.step = 0;
        this.opacity = true;
        this.step_entity = 0;
        this.triggerTimer = this.time.addEvent({
            callback: ()=>{
                switch(this.step_entity){
                    case 0:
                        this.entity.idle_1.alpha = this.opacity ? 1 : 0;
                        this.entity.idle_2.alpha = this.opacity ? 0 : 1;
                        this.entity.smh_1.alpha = 0;
                        this.entity.smh_2.alpha = 0;
                        this.entity.laugh_1.alpha = 0;
                        this.entity.laugh_2.alpha = 0;
                        break;
                    case 1:
                        this.entity.idle_1.alpha = 0;
                        this.entity.idle_2.alpha = 0;
                        this.entity.smh_1.alpha = this.opacity ? 1 : 0;
                        this.entity.smh_2.alpha = this.opacity ? 0 : 1;
                        this.entity.laugh_1.alpha = 0;
                        this.entity.laugh_2.alpha = 0;
                        break;
                    case 2:
                        this.entity.idle_1.alpha = 0;
                        this.entity.idle_2.alpha = 0;
                        this.entity.smh_1.alpha = 0;
                        this.entity.smh_2.alpha = 0;
                        this.entity.laugh_1.alpha = this.opacity ? 1 : 0;
                        this.entity.laugh_2.alpha = this.opacity ? 0 : 1;
                        break;
                    
                }
                this.opacity = !this.opacity;
            },
            callbackScope: this,
            delay: 1000,
            loop: true
        });

        this.turn = 0;
        this.counter = 0;
        this.triggerTimer = this.time.addEvent({
            callback: ()=>{
                switch(this.turn){
                    case 0:
                        this.monsterText.setText('');
                    if(this.textSay[this.step].length > this.playerText.text.length){
                        this.playerText.setText(this.playerText.text + this.textSay[this.step][this.counter]);
                        this.counter++;
                    }
                    break;
                    case 1:
                        this.playerText.setText('');
                    if(this.textSay[this.step].length > this.monsterText.text.length){
                        this.monsterText.setText(this.monsterText.text + this.textSay[this.step][this.counter]);
                        this.counter++;
                    }
                    break;
                }
            },
            callbackScope: this,
            delay: this.delay,
            loop: true
        });

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

        this.isCutscene = false;

        
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cd = 10;

        this.triggerTimer = this.time.addEvent({
            callback: ()=>{
                this.cd -= 1;
            },
            callbackScope: this,
            delay: 50,
            loop: true
        });
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
        var speed = 4;
        if(!this.isCutscene){
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
                this.WalkAnim();
                if(!this.footstep.isPlaying){this.footstep.play()}
            }

            if(this.xCoord >= 2595) this.isCutscene = true;
        }
        else{
            this.IdleAnim();
            if(this.space.isDown && this.cd < 0 && this.step < this.textSay.length){
                console.log(this.step);
                this.step+=1;
                console.log(this.step);
                this.playerText.setText('');
                this.monsterText.setText('');
                this.counter = 0;
                this.cd = 10;

                switch(this.step){
                    case 0:
                        break;
                    case 1:
                        this.turn = 0;
                        this.dialoge[0].play();
                        break;
                    case 2:
                        this.turn = 1;
                        this.dialoge[0].stop();
                        this.dialoge[1].play();
                        break;
                    case 3:
                        this.turn = 0;
                        this.dialoge[1].stop();
                        this.dialoge[2].play();
                        break;
                    case 4:
                        this.turn = 1;
                        this.dialoge[2].stop();
                        this.dialoge[3].play();
                        break;
                    case 5:
                        this.turn = 0;
                        this.dialoge[3].stop();
                        this.dialoge[4].play();
                        break;
                    case 6:
                        this.turn = 1;
                        this.dialoge[4].stop();
                        this.dialoge[5].play();
                        break;
                    case 7:
                        this.turn = 0;
                        this.dialoge[5].stop();
                        this.dialoge[6].play();
                        break;
                    case 8:
                        this.turn = 1;
                        this.dialoge[6].stop();
                        this.dialoge[7].play();
                        this.step_entity = 2;
                        break;
                    case 9:
                        this.turn = 0;
                        this.dialoge[7].stop();
                        this.dialoge[8].play();
                        break;
                    case 10:
                        this.turn = 1;
                        this.dialoge[8].stop();
                        this.dialoge[9].play();
                        this.step_entity = 1;
                        break;
                }
            }
            if(this.step >= this.textSay.length){
                this.dialoge[9].stop();
                this.scene.stop('lvl1');
                this.scene.start('lvl2');
            }
        }

        this.player.head.y = this.yCoord - this.headOffset;
        this.player.head.x = this.xCoord;
        
        this.player.bodyWalking.y = this.yCoord;
        this.player.bodyWalking.x = this.xCoord;
        this.player.bodyIdle.y = this.yCoord;
        this.player.bodyIdle.x = this.xCoord;
    }
}