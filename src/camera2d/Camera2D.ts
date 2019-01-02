import * as PIXI from 'pixi.js';

/**
 * 2D相机基础类
 * @author tanhaibin
 */
export class Camera2D extends PIXI.utils.EventEmitter {
  public static readonly CHANGE: string = 'change';

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  get point(): PIXI.Point {
    return this._point;
  }

  set point(value: PIXI.Point) {
    this._point = value;
  }

  get scale(): number {
    return this._scale;
  }

  set scale(value: number) {
    this._scale = value;
  }

  get maxScale(): number {
    return this._maxScale;
  }

  set maxScale(value: number) {
    this._maxScale = value;
  }

  get minScale(): number {
    return this._minScale;
  }

  set minScale(value: number) {
    this._minScale = value;
  }

  get rectangle(): PIXI.Rectangle {
    return this._rectangle;
  }

  set rectangle(value: PIXI.Rectangle) {
    this._rectangle = value;
  }

  private _x: number = 0;
  private _y: number = 0;
  private _point: PIXI.Point = new PIXI.Point();
  private _scale: number = 1;
  private _maxScale: number = 3;
  private _minScale: number = 0.1;
  private _rectangle: PIXI.Rectangle;

  constructor() {
    super();
  }
  protected updateCamera2D():void
  {
    this.emit(Camera2D.CHANGE);
  }

}
