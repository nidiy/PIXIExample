import * as PIXI from 'pixi.js';
import {Scene2D} from '../scene/Scene2D';
import {SceneCamera2D} from '../camera2d/SceneCamera2D';

export class DesignScene {
  public app: PIXI.Application;
  public scene2D: Scene2D;
  public camera2d: SceneCamera2D;

  constructor() {
    this.app = new PIXI.Application({
      view: document.getElementById('scene2D') as HTMLCanvasElement,
      backgroundColor: 0xFFFFFF,
      antialias: true
    });
    this.initObject();
    window.addEventListener('resize', this.onResizeEvent);
    this.onResizeEvent(null);
    console.log(this.app);
  }

  protected onResizeEvent = (event: UIEvent) => {
    this.app.renderer.resize(this.app.view.clientWidth, this.app.view.clientHeight);
    this.app.stage.x = this.app.view.clientWidth / 2;
    this.app.stage.y = this.app.view.clientHeight / 2;
    this.app.render();
  };

  protected initObject(): void {
    this.scene2D = new Scene2D();
    this.app.stage.addChild(this.scene2D);
    this.camera2d = new SceneCamera2D(this.scene2D, this.app.view);
    this.camera2d.enable = true;
  }
}
