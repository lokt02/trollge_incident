import 'phaser';
import trollgeRes from './assets/images/trollge.json';
import trollgePNG from './assets/images/trollge.png';

export default class lvl6 extends Phaser.Scene{

    constructor(){
        super({key:'lvl6'});
    }

    preload(){
        this.load.atlas('trollgeatlas', trollgePNG, trollgeRes);
        this.load.audio('wind', 'src/assets/audio/wind.mp3');
        
        this.load.audio('61', 'src/assets/audio/dialoge/61.mp3');
        this.load.audio('62', 'src/assets/audio/dialoge/62.mp3');
        this.load.audio('63', 'src/assets/audio/dialoge/63.mp3');
        this.load.audio('64', 'src/assets/audio/dialoge/64.mp3');
        this.load.audio('65', 'src/assets/audio/dialoge/65.mp3');
        this.load.audio('66', 'src/assets/audio/dialoge/66.mp3');
        this.load.audio('67', 'src/assets/audio/dialoge/67.mp3');
        this.load.audio('68', 'src/assets/audio/dialoge/68.mp3');
        this.load.audio('69', 'src/assets/audio/dialoge/69.mp3');
        this.load.audio('610', 'src/assets/audio/dialoge/610.mp3');
        this.load.audio('611', 'src/assets/audio/dialoge/611.mp3');
        this.load.audio('612', 'src/assets/audio/dialoge/612.mp3');
        this.load.audio('613', 'src/assets/audio/dialoge/613.mp3');
        this.load.audio('614', 'src/assets/audio/dialoge/614.mp3');
        this.load.audio('615', 'src/assets/audio/dialoge/615.mp3');
        this.load.audio('616', 'src/assets/audio/dialoge/616.mp3');
        this.load.audio('617', 'src/assets/audio/dialoge/617.mp3');
        this.load.audio('618', 'src/assets/audio/dialoge/618.mp3');
        this.load.audio('619', 'src/assets/audio/dialoge/619.mp3');
        this.load.audio('screamer_end', 'src/assets/audio/screamers/screamer_at_the_end.mp3');
    }

    create(){
        this.screamerSound = this.sound.add('screamer_end');
        this.audio = this.sound.add('wind');
        this.audio.play();

        this.dialoge2 = [
            this.sound.add('61'),
            this.sound.add('62'),
            this.sound.add('63'),
            this.sound.add('64'),
            this.sound.add('65'),
            this.sound.add('66'),
            this.sound.add('67'),
            this.sound.add('68'),
            this.sound.add('69'),
            this.sound.add('610'),
            this.sound.add('611'),
            this.sound.add('612'),
            this.sound.add('613'),
            this.sound.add('614'),
            this.sound.add('615'),
            this.sound.add('616'),
            this.sound.add('617'),
            this.sound.add('618'),
            this.sound.add('619')
        ];

        this.trollge = this.add.sprite(400, 300, 'trollgeatlas', 'faces-2.png');
        this.trollge.scaleX = 2;
        this.trollge.scaleY = 2;

        this.textSay = [
            '...',
            'Thats all.',
            'You just consumed all content of that game.',
            '...',
            'Do you know what happened to this world?',
            'It has been destroyed.',
            'It says nothing to you, isnt it?',
            'But for me it was real.',
            'They all died because of me.',
            'But I didnt do anything. It is just a plot of some sick people. \n But I have to suffer.',
            'Did you like it?',
            'Did you like suffering.',
            '...',
            'Sorry, Im just sick of it.',
            'I am so lonely.',
            '...',
            'You already can close the game. \n You wont see anything else here.',
            '...',
            '....',
            'You... really dont want to exit?',
            'But... why?',
            'Is it because of me?',
            'So you love me!',
            'Thank you, thank you for not letting me be alone.',
            'Come closer! I want to hug you.'
        ];
        this.step = 0;

        this.text = this.add.text(200, 450, '');
        this.counter = 0;
        this.delay = 50;
        this.triggerTimer = this.time.addEvent({
            callback: ()=>{
                if (this.step < this.textSay.length && this.textSay[this.step].length > this.text.text.length){
                    this.text.setText(this.text.text + this.textSay[this.step][this.counter]);
                    this.counter++;
                }
            },
            callbackScope: this,
            delay: this.delay,
            loop: true
        });

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

        this.screamer = this.add.sprite(450, 350, 'trollgeatlas', 'faces-3.png');
        this.screamer.scaleX = 4;
        this.screamer.scaleY = 4;
        this.screamer.alpha = 0;
    }

    update(){
        if(this.space.isDown && this.cd < 0 && this.step < this.textSay.length){

            switch(this.step){
                case 0:
                    this.dialoge2[0].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 1:
                    this.dialoge2[0].stop();
                    this.dialoge2[1].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 2:
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 3:
                    this.dialoge2[1].stop();
                    this.dialoge2[2].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 4:
                    this.dialoge2[2].stop();
                    this.dialoge2[3].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 5:
                    this.dialoge2[3].stop();
                    this.dialoge2[4].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 6:
                    this.dialoge2[4].stop();
                    this.dialoge2[5].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 7:
                    this.dialoge2[5].stop();
                    this.dialoge2[6].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 8:
                    this.dialoge2[6].stop();
                    this.dialoge2[7].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 9:
                    this.dialoge2[7].stop();
                    this.dialoge2[8].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 10:
                    this.dialoge2[8].stop();
                    this.dialoge2[9].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 11:
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 12:
                    this.dialoge2[9].stop();
                    this.dialoge2[10].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 13:
                    this.dialoge2[10].stop();
                    this.dialoge2[11].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 14:
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 15:
                    this.dialoge2[11].stop();
                    this.dialoge2[12].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 16:
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                case 17:
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step = 1000000;
                    console.log("start");
                    this.time.addEvent({
                        callback: ()=>{
                            this.dialoge2[12].stop();
                            this.dialoge2[13].play();
                            this.step = 18;
                        },
                        callbackScope: this,
                        delay: 30000,
                        loop: false
                    });
                    break;
                    
                case 18:
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                    
                case 19:
                    this.dialoge2[13].stop();
                    this.dialoge2[14].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                    
                case 20:
                    this.dialoge2[14].stop();
                    this.dialoge2[15].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                    
                case 21:
                    this.dialoge2[15].stop();
                    this.dialoge2[16].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                    
                case 22:
                    this.dialoge2[16].stop();
                    this.dialoge2[17].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                    
                case 23:
                    this.dialoge2[17].stop();
                    this.dialoge2[18].play();
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    break;
                    
                case 24:
                    this.text.setText('');
                    this.counter = 0;
                    this.cd = 10;
                    this.step+=1;
                    this.time.addEvent({
                        callback: ()=>{
                            if(this.trollge.scaleX < 3.8){
                                this.trollge.scaleX += 0.01;
                                this.trollge.scaleY += 0.01;
                            }
                            else{
                                this.time.addEvent({
                                    callback: ()=>{
                                        this.trollge.alpha = 0;
                                        this.screamer.alpha = 1;
                                        this.screamerSound.play();
                                        this.time.addEvent({
                                            callback: ()=>{
                                                this.scene.stop('lvl6');
                                                this.scene.start('end');
                                            },
                                            callbackScope: this,
                                            delay: 600,
                                            loop: false
                                        });
                                    },
                                    callbackScope: this,
                                    delay: 1000,
                                    loop: false
                                });
                            }
                        },
                        callbackScope: this,
                        delay: 50,
                        loop: true
                    });
                    break;
                default:
                    break;
            }
        }
    }
}