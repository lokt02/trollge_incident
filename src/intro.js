import 'phaser';
import background0 from './assets/images/chair/gark_room.png';
import ChairRes from './assets/images/chair/chair.json';
import ChairPNG from './assets/images/chair/chair.png';

export default class Intro extends Phaser.Scene {

    constructor(){
        super('intro');
    }

    preload(){
        this.load.image('background0', background0);
        this.load.atlas('chair', ChairPNG, ChairRes);
        this.load.audio('ambient', 'src/assets/audio/ambient.ogg');
        
        this.load.audio('step1', 'src/assets/audio/step1.wav');
        this.load.audio('step2', 'src/assets/audio/step2.wav');
        this.load.audio('step3', 'src/assets/audio/step3.wav');
        
        this.load.audio('i1', 'src/assets/audio/dialoge/i1.mp3');
        this.load.audio('i2', 'src/assets/audio/dialoge/i2.mp3');
        this.load.audio('i3', 'src/assets/audio/dialoge/i3.mp3');
        this.load.audio('i4', 'src/assets/audio/dialoge/i4.mp3');
        this.load.audio('i5', 'src/assets/audio/dialoge/i5.mp3');
        
        this.load.audio('11', 'src/assets/audio/dialoge/11.mp3');
        this.load.audio('12', 'src/assets/audio/dialoge/12.wav');
        this.load.audio('13', 'src/assets/audio/dialoge/13.mp3');
        this.load.audio('14', 'src/assets/audio/dialoge/14.wav');
        this.load.audio('15', 'src/assets/audio/dialoge/15.mp3');
        this.load.audio('16', 'src/assets/audio/dialoge/16.wav');
        this.load.audio('17', 'src/assets/audio/dialoge/17.mp3');
        this.load.audio('18', 'src/assets/audio/dialoge/18.wav');
        this.load.audio('19', 'src/assets/audio/dialoge/19.mp3');
        this.load.audio('110', 'src/assets/audio/dialoge/110.wav');
        
        this.load.audio('41', 'src/assets/audio/dialoge/41.wav');
        this.load.audio('42', 'src/assets/audio/dialoge/42.mp3');
        this.load.audio('43', 'src/assets/audio/dialoge/43.wav');
        this.load.audio('44', 'src/assets/audio/dialoge/44.mp3');
        this.load.audio('45', 'src/assets/audio/dialoge/45.wav');
        this.load.audio('46', 'src/assets/audio/dialoge/46.wav');
    }

    create(){
        this.audio = this.sound.add('ambient');
        this.audio.play();

        this.dialoge = [
            this.sound.add('i1'),
            this.sound.add('i2'),
            this.sound.add('i3'),
            this.sound.add('i4'),
            this.sound.add('i5')
        ];

        this.textSay = ['Mysterious figure: I caught you! You will not\n troll anybody, monster.',
                        'Trollge: Where am I? And what do you mean?\n I didnt do anything.',
                        'MF: So, you dont rember what did you do.',
                        'MF: Ahahah, so Im going to remind you all that things,\nall that despair and sufferings.',
                        'Trollge: What are you going to do? Stop, please!'];
        this.step = 0;

        this.background0 = this.add.sprite(400, 300, 'background0');
        this.trollge = {
            frame1: this.add.sprite(400, 300, 'chair', 'trollChair.png'),
            frame2: this.add.sprite(400, 294, 'chair', 'trollChair1.png')
        };
        this.opacity = true;
        this.trollge.frame1.alpha = 1;
        this.trollge.frame2.alpha = 0;
        this.triggerTimer = this.time.addEvent({
            callback: ()=>{
                this.trollge.frame1.alpha = this.opacity ? 1 : 0;
                this.trollge.frame2.alpha = this.opacity ? 0 : 1;
                this.opacity = !this.opacity;
            },
            callbackScope: this,
            delay: 1000,
            loop: true
        });


        this.text = this.add.text(200, 450, '');
        this.counter = 0;
        this.delay = 50;
        this.triggerTimer = this.time.addEvent({
            callback: ()=>{
                if(this.textSay[this.step].length > this.text.text.length){
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

        this.first = true;
    }

    update(){
        if(this.first){
            this.first = false;
            this.dialoge[0].play();
        }

        if(this.space.isDown && this.cd < 0 && this.step < this.textSay.length){
            console.log(this.step);
            this.step+=1;
            console.log(this.step);
            this.text.setText('');
            this.counter = 0;
            this.cd = 10;
            switch(this.step){
                case 0:
                    break;
                case 1:
                    this.dialoge[0].stop();
                    this.dialoge[1].play();
                    break;
                case 2:
                    this.dialoge[1].stop();
                    this.dialoge[2].play();
                    break;
                case 3:
                    this.dialoge[2].stop();
                    this.dialoge[3].play();
                    break;
                case 4:
                    this.dialoge[3].stop();
                    this.dialoge[4].play();
                    break;
            }
        }
        if(this.step >= this.textSay.length){
            this.audio.stop();
            this.dialoge[4].stop();
            this.scene.stop('intro');
            this.scene.start('lvl1');
        }
    }
}