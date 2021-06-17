import 'phaser';
export default class End extends Phaser.Scene{

    constructor(){
        super({key:'end'});
    }

    preload(){
    }

    create(){
        this.text = this.add.text(100, 300, '20.06.2021 "The Virtual Reality" incident', {fill: '#FFFFFF'});
    }

    update(){
    }
}