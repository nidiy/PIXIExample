import * as PIXI from 'pixi.js';
import {Camera2D} from './Camera2D';

/**
 * 2D场景相机
 */
export class SceneCamera2D extends Camera2D {
  protected downPoint: PIXI.Point = new PIXI.Point();
  protected oldPoint: PIXI.Point = new PIXI.Point();
  protected newPoint: PIXI.Point = new PIXI.Point();

  get enable(): boolean {
    return this._enable;
  }

  set enable(value: boolean) {
    this._enable = value;
    this.removeEvent();
    if (this._enable) {
      this.addEvent();
    } else {
      this.removeEvent();
    }
  }

  public scene: PIXI.Container;
  public canvas: HTMLCanvasElement;
  private _enable: boolean = false;

  constructor(scene: PIXI.Container, canvas: HTMLCanvasElement) {
    super();
    this.scene = scene;
    this.canvas = canvas;
  }

  protected onMouseMove = (event: PointerEvent): void => {
    this.newPoint.set(event.clientX, event.clientY);
    this.updateDelta();
    this.oldPoint.copy(this.newPoint);
  };
  protected onMouseUp = (event: PointerEvent): void => {
    window.removeEventListener('pointermove', this.onMouseMove);
    window.removeEventListener('pointerup', this.onMouseUp);
  };
  protected onMouseDown = (event: PointerEvent): void => {
    this.downPoint.set(event.clientX, event.clientY);
    this.oldPoint.set(event.clientX, event.clientY);
    window.addEventListener('pointermove', this.onMouseMove);
    window.addEventListener('pointerup', this.onMouseUp);
  };
  protected onWheel = (event: WheelEvent): void => {
    const currentViewScale: number = this.scale;
    this.point.set(event.offsetX, event.offsetY);
    this.scale = event.deltaY < 0 ? currentViewScale * 1.1 : currentViewScale / 1.1;
    this.updateCamera2D();
  };

  protected updateDelta(): void {
    const delta: PIXI.Point = new PIXI.Point(this.newPoint.x - this.oldPoint.x, this.newPoint.y - this.oldPoint.y);
    delta.x /= this.scale;
    delta.y /= this.scale;
    this.x -= delta.x;
    this.y -= delta.y;
    this.updateCamera2D();
  }

  protected addEvent(): void {
    this.canvas.addEventListener('pointerdown', this.onMouseDown);
    this.canvas.addEventListener('wheel', this.onWheel);

  }

  protected removeEvent(): void {
    this.canvas.removeEventListener('pointerdown', this.onMouseDown);
    this.canvas.removeEventListener('wheel', this.onWheel);
  }
  protected updateCamera2D(): void {
    this.scene.scale.x = this.scene.scale.y = this.scale;
    this.scene.x = -this.x * this.scale;
    this.scene.y = -this.y * this.scale;
    super.updateCamera2D();
  }
}
