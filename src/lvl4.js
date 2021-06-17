import 'phaser';
import background0 from './assets/images/chair/gark_room.png';
import ChairRes from './assets/images/chair/chair.json';
import ChairPNG from './assets/images/chair/chair.png';
import trollgeRes from './assets/images/trollge.json';
import trollgePNG from './assets/images/trollge.png';

export default class lvl4 extends Phaser.Scene{

    constructor(){
        super({key:'lvl4'});
    }

    preload(){
        this.load.image('background0', background0);
        this.load.atlas('chair', ChairPNG, ChairRes);
        this.load.atlas('trollgeatlas', trollgePNG, trollgeRes);
        this.load.audio('ambient', 'src/assets/audio/ambient.ogg');
    }

    create(){
        this.audio = this.sound.add('ambient');
        this.audio.play();
        
        this.background0 = this.add.sprite(400, 300, 'background0');

        this.textSay = ['',
                        'Trollge: Yes, i remember. Thank you for reminding.',
                        'MF: So you admitted. Then I start punish you.',
                        'Trollge: Ahahah, punish? But for what?\n Did you see their faces?\n They were happy.',
                        'MF: HEY! How did you break free?',
                        'Trollge: How sad. You thought that remembering\n make me feel despair.\n But I am happy.',
                        'Trollge: Now, sorry, but there is step 4 that\n I am going to complete.\n Goodbye.'
                    ];
        this.step = 0;

        this.dialoge1 = [
            this.sound.add('41'),
            this.sound.add('42'),
            this.sound.add('43'),
            this.sound.add('44'),
            this.sound.add('45'),
            this.sound.add('46')
        ];

        this.trollgeFree1 = this.add.sprite(400, 300, 'trollgeatlas', 'stay-0.png');
        this.trollgeFree2 = this.add.sprite(400, 300, 'trollgeatlas', 'stay-1.png');
        this.head1 = this.add.sprite(400, 300 - 136 * 1.2, 'trollgeatlas', 'faces-1.png');
        this.head2 = this.add.sprite(400, 300 - 136 * 1.2, 'trollgeatlas', 'faces-2.png');

        this.trollgeFree1.scaleX = 1.2;
        this.trollgeFree1.scaleY = 1.2;
        
        this.trollgeFree2.scaleX = 1.5;
        this.trollgeFree2.scaleY = 1.5;

        this.trollgeFree1.alpha = 0;
        this.trollgeFree2.alpha = 0;
        this.head1.alpha = 0;
        this.head2.alpha = 0;


        this.trollge = {
            frame1: this.add.sprite(400, 300, 'chair', 'darkChair.png'),
            frame2: this.add.sprite(400, 294, 'chair', 'darkChair1.png')
        };
        this.opacity = true;
        this.trollge.frame1.alpha = 1;
        this.trollge.frame2.alpha = 0;
        this.triggerTimer1 = this.time.addEvent({
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

        this.postStep = 0;
    }

    update(){
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
                    this.dialoge1[0].play();
                    break;
                case 2:
                    this.dialoge1[0].stop();
                    this.dialoge1[1].play();
                    break;
                case 3:
                    this.dialoge1[1].stop();
                    this.dialoge1[2].play();
                    this.triggerTimer1.destroy();
                    this.trollge.frame1.alpha = 0;
                    this.trollge.frame2.alpha = 0;
                    this.trollgeFree1.alpha = 1;
                    this.head1.alpha = 1;
                    break;
                case 4:
                    this.dialoge1[2].stop();
                    this.dialoge1[3].play();
                    break;
                case 5:
                    this.dialoge1[3].stop();
                    this.dialoge1[4].play();
                    this.trollgeFree1.alpha = 0;
                    this.trollgeFree2.alpha = 1;
                    this.head1.alpha = 0;
                    this.head2.alpha = 1;
                    break;
                case 6:
                    this.dialoge1[4].stop();
                    this.dialoge1[5].play();
                    break;
            }
        }
        if(this.step >= this.textSay.length){
            this.screamer.alpha = 1;
            this.trollgeFree1.alpha = 0;
            this.trollgeFree2.alpha = 0;
            this.head1.alpha = 0;
            this.head2.alpha = 0;

            
            this.time.addEvent({
                callback: ()=>{
                    var rotate1 = 45;
                    var rotate2 = 48;
                    var rotate3 = 43;
                    var rotate4 = 46;
                    var rotate5 = 44;
                    switch(this.postStep){
                        case 0:
                            this.screamer.angle = rotate1;
                            this.postStep += 1;
                            break;
                        case 1:
                            this.screamer.angle = rotate2;
                            this.postStep += 1;
                            break;
                        case 2:
                            this.screamer.angle = rotate3;
                            this.postStep += 1;
                            break;
                        case 3:
                            this.screamer.angle = rotate4;
                            this.postStep += 1;
                            break;
                        case 4:
                            this.screamer.angle = rotate5;
                            this.postStep = 0;
                            break;
                    }
                },
                callbackScope: this,
                delay: 50,
                loop: true
            });
            this.time.addEvent({
                callback: ()=>{
                    this.audio.stop();
                    this.dialoge1[5].stop();
                    this.scene.stop('lvl4');
                    this.scene.start('lvl5');
                },
                callbackScope: this,
                delay: 300,
                loop: false
            });
        }
    }
}