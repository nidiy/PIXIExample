import * as PIXI from 'pixi.js';
import {Scene2D} from '../scene/Scene2D';
import {SceneCamera2D} from '../camera2d/SceneCamera2D';
import {Camera2D} from '../camera2d/Camera2D';

export class DesignScene {
  public app: PIXI.Application;
  public scene2D: Scene2D;
  public camera2d: SceneCamera2D;
  protected onResizeEvent = (event: UIEvent) => {
    this.app.renderer.resize(this.app.view.clientWidth, this.app.view.clientHeight);
    this.app.stage.x = this.app.view.clientWidth / 2;
    this.app.stage.y = this.app.view.clientHeight / 2;
  };

  constructor() {
    this.app = new PIXI.Application({
      view: document.getElementById('scene2D') as HTMLCanvasElement,
      backgroundColor: 0xFFFFFF,
      antialias: true
    });
    this.initObject();
    window.addEventListener('resize', this.onResizeEvent);
    this.onResizeEvent(null);
  }

  protected initObject(): void {
    this.scene2D = new Scene2D();
    this.app.stage.addChild(this.scene2D);
    this.camera2d = new SceneCamera2D(this.scene2D, this.app.view);
    this.camera2d.enable = true;
    this.camera2d.on(Camera2D.CHANGE, this.camer2dChange, this);
  }

  protected camer2dChange(): void {
    console.log('当前相机缩放=>', this.camera2d.scale);
  }
}
