import * as PIXI from 'pixi.js';
import {GridBackground} from './GridBackground';

export class Scene2D extends PIXI.Container {
  constructor() {
    super();
    console.log('进入2D场景');
    this.initObject();
    this.addChild(new GridBackground());
  }

  protected initObject(): void {

  }
}
