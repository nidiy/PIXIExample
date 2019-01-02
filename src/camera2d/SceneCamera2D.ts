import * as PIXI from 'pixi.js';
import {Camera2D} from './Camera2D';

/**
 * 2D场景相机
 */
export class SceneCamera2D extends Camera2D {
  public scene: PIXI.Container;
  public canvas: HTMLCanvasElement;
  protected downPoint: PIXI.Point = new PIXI.Point();
  protected oldPoint: PIXI.Point = new PIXI.Point();
  protected newPoint: PIXI.Point = new PIXI.Point();
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
    this.point.set(event.clientX, event.clientY);
    this.scale = event.deltaY < 0 ? currentViewScale * 1.1 : currentViewScale / 1.1;
  };

  constructor(scene: PIXI.Container, canvas: HTMLCanvasElement) {
    super();
    this.scene = scene;
    this.canvas = canvas;
  }

  private _enable: boolean = false;
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

  /**
   * 释放相机
   */
  public dispose(): void {
    super.dispose();
    window.removeEventListener('pointermove', this.onMouseMove);
    window.removeEventListener('pointerup', this.onMouseUp);
    this.enable = false;
    this.scene = null;
    this.canvas = null;
  }

  protected updateDelta(): void {
    const delta: PIXI.Point = new PIXI.Point(this.newPoint.x - this.oldPoint.x, this.newPoint.y - this.oldPoint.y);
    delta.x /= this.scale;
    delta.y /= this.scale;
    this.x -= delta.x;
    this.y -= delta.y;
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
    if (!this.scene && !this.scene.parent)
      return;
    if (this.scale !== this.fromScale) {
      const p: PIXI.Point = this.scene.parent.toLocal(this.point);
      p.x -= this.scene.x;
      p.y -= this.scene.y;
      const p1: PIXI.Point = new PIXI.Point((this.scale / this.fromScale - 1) * p.x, (this.scale / this.fromScale - 1) * p.y);
      p1.x -= this.scene.x;
      p1.y -= this.scene.y;
      p1.x /= this.scale;
      p1.y /= this.scale;
      this._x = p1.x;
      this._y = p1.y;
    }
    this.scene.scale.x = this.scene.scale.y = this.scale;
    this.scene.x = -this.x * this.scale;
    this.scene.y = -this.y * this.scale;
    super.updateCamera2D();
  }
}
