import * as PIXI from 'pixi.js';

/**
 * 2D相机基础类
 * @author tanhaibin
 */
export class Camera2D extends PIXI.utils.EventEmitter {
  public static readonly CHANGE: string = 'change';
  protected fromScale: number = 1;

  constructor() {
    super();
  }

  protected _x: number = 0;
  /**
   * 相机的X坐标(注：该坐标为场景的本地坐标)
   * @returns {number}
   */
  get x(): number {
    return this._x;
  }

  set x(value: number) {
    if (this._x === value) return;
    this._x = value;
    this.updateCamera2D();
  }

  protected _y: number = 0;
  /**
   * 相机的坐标 (注：该坐标为场景的本地坐标)
   * @returns {number}
   */
  get y(): number {
    return this._y;
  }

  set y(value: number) {
    if (this._y === value) return;
    this._y = value;
    this.updateCamera2D();
  }

  protected _point: PIXI.Point = new PIXI.Point(0, 0);
  /**
   * 相机的缩放焦点
   * @returns {PIXI.Point}
   */
  get point(): PIXI.Point {
    return this._point;
  }

  set point(value: PIXI.Point) {
    this._point = value;
  }

  private _scale: number = 1;
  /**
   * 相机的缩入值
   * @returns {number}
   */
  get scale(): number {
    return this._scale;
  }

  set scale(value: number) {
    if (this._scale === value) return;
    this.fromScale = this._scale;
    this._scale = value;
    this.updateCamera2D();
    this.fromScale = this._scale;
  }

  private _maxScale: number = 3;
  /**
   * 最大缩放值
   * @returns {number}
   */
  get maxScale(): number {
    return this._maxScale;
  }

  set maxScale(value: number) {
    this._maxScale = value;
  }

  private _minScale: number = 0.1;
  /**
   * 最小缩放值
   * @returns {number}
   */
  get minScale(): number {
    return this._minScale;
  }

  set minScale(value: number) {
    this._minScale = value;
  }

  private _rectangle: PIXI.Rectangle;
  /**
   * 相机的活动范围(是相对场景空间范围)
   * @returns {PIXI.Rectangle}
   */
  get rectangle(): PIXI.Rectangle {
    return this._rectangle;
  }

  set rectangle(value: PIXI.Rectangle) {
    this._rectangle = value;
  }

  /**
   * 更新相信信息并派发消息
   */
  protected updateCamera2D(): void {
    this.emit(Camera2D.CHANGE);
  }

  /**
   * 释放相机
   */
  public dispose():void
  {

  }

}
