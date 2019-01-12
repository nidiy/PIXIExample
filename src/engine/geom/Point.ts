import * as PIXI from 'pixi.js';
import {CMath} from '../utils/CMath';
/**
 * 2D向量类
 */
export class Point extends PIXI.Point {
  constructor(x?: number, y?: number) {
    super(x, y);
  }

  /**
   * 从 (0,0) 到此点的线段长度。
   */
  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * [静态] 返回 pt1 和 pt2 之间的距离。
   * @param pt1
   * @param pt2
   * @returns {number}
   */
  static distance(pt1: Point, pt2: Point): number {
    return Math.sqrt((pt1.x - pt2.x) * (pt1.x - pt2.x) + (pt1.y - pt2.y) * (pt1.y - pt2.y));
  }

  static middle(p1: Point, p2: Point): Point {
    return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
  }

  /**
   *  将另一个点的坐标添加到此点的坐标以创建一个新点。
   * @param v Point
   */
  add(v: Point): Point {
    return new Point(this.x + v.x, this.y + v.y);
  }

  /**
   * 将源 Point 对象中的所有点数据复制到调用方 Point 对象中。
   * @param sourcePoint 目标point
   */
  copyFrom(sourcePoint: Point): void {
    this.x = sourcePoint.x;
    this.y = sourcePoint.y;
  }

  /**
   * 将 (0,0) 和当前点之间的线段缩放为设定的长度。
   * @param thickness
   */
  normalize(thickness: number): Point {
    const ll: number = this.length;
    if (ll === 0)
      return this;
    this.x *= thickness / ll;
    this.y *= thickness / ll;
    return this;
  }

  /**
   * 按指定量偏移 Point 对象。dx 的值将添加到 x 的原始值中以创建新的 x 值。dy 的值将添加到 y 的原始值中以创建新的 y 值。
   */
  offset(dx: number, dy: number): Point {
    this.x += dx;
    this.y += dy;
    return this;
  }

  /**
   * 将 Point 的成员设置为指定值
   * @param x
   * @param y
   */
  setTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  /**
   * 从此点的坐标中减去另一个点的坐标以创建一个新点。
   * @param v
   * @returns {Point}
   */
  subtract(v: Point): Point {
    return new Point(this.x - v.x, this.y - v.y);
  }

  /**
   * 缩放
   * @param {number} scale
   * @returns {Point}
   */
  multipliedScale(scale: number): Point {
    return new Point(this.x * scale, this.y * scale);
  }

  /**
   *  点乘
   * @param {Point} v
   * @returns {number}
   */
  dot(v: Point): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * 交
   * @param {Point} v
   * @returns {number}
   */
  crossVector(v: Point): number {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * 返回向量的角度
   * @returns {number}
   */
  angle(): number {
    let angle = Math.atan2(this.y, this.x);
    if (angle < 0) angle += 2 * Math.PI;
    return angle;
  }

  /**
   * 向量之间的夹角
   * @param {Point} v
   * @returns {number}
   */
  angleTo(v: Point) {

    let theta: number = this.dot(v) / (Math.sqrt(this.length * v.length));
    let angle:number = Math.acos(CMath.clamp(theta, -1, 1));
    let dir:number = this.crossVector(v);
    if (dir < 0) {
      angle = Math.PI * 2 - angle;
    }
    return angle;

  }

  /**
   * 返回包含 x 和 y 坐标的值的字符串。
   * @param precision  小数精度
   * @returns {string}
   */
  toString(precision?: number): string {
    if (!isNaN(precision)) {
      return '(x=' + this.x.toPrecision(precision) + ', y=' + this.y.toPrecision(precision) + ')';
    } else {
      return '(x=' + this.x.toString() + ', y=' + this.y.toString() + ')';
    }
  }

  /**
   * 复制一个向量
   * @returns {Point}
   */
  clone(): Point {
    return new Point(this.x, this.y);
  }
}
