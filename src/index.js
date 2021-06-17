import 'phaser';
import Menu from './menu';
import Intro from './intro';
import lvl1 from './lvl1';
import lvl2 from './lvl2';
import lvl3 from './lvl3';
import lvl4 from './lvl4';
import lvl5 from './lvl5';
import lvl6 from './lvl6';
import End from './end';

// This is the entry point of your game.

const width = 800;
const height = 600;

const config = {
  width,
  height,
  type: Phaser.AUTO,
  backgroundColor: 0x000000,
  scene: [Menu, Intro, lvl1, lvl2, lvl3, lvl4, lvl5, lvl6, End],
};

const game = new Phaser.Game(config);
