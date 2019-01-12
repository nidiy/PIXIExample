import * as PIXI from 'pixi.js';
import {PointerEvents} from '../engine/event/EventTypes';
import {Point} from '../engine/geom';

export class DrawBoardBase extends PIXI.Graphics {
  /**
   * 开始绘制
   * @type {string}
   */
  public static readonly START: string = 'startDraw';
  /**
   * 关闭绘制
   * @type {string}
   */
  public static readonly CLOSE: string = 'clodeDraw';
  /**
   * 正在绘制中……
   * @type {string}
   */
  public static readonly DRAWING: string = 'drawing';
  public points: Array<Point> = new Array<Point>();
  public backgroundColor: number = 0xFFFFFF;
  public backgroundAlpha: number = 0.1;
  /**
   * 当前绘制点
   */
  public drawPoint: Point = null;
  //是否自动开始
  protected isAutoStart: boolean = true;

  constructor(isAutoStart: boolean = true) {
    super();
    this.isAutoStart = isAutoStart;
    this.on('added', this.addedToStageHandler, this);
  }

  /**
   * 关闭绘制
   */
  public close(): void {

  }

  /**
   * 开始绘制
   */
  public start(): void {
    this.addDrawEvent();
  }

  public draw(): void {
    //
  }

  protected addedToStageHandler(event: PIXI.interaction.InteractionEvent): void {
    this.off('added', this.addedToStageHandler, this);
    this.on('removed', this.removedFromStageHandler, this);
    if (this.isAutoStart)
      this.start();

  }

  protected removedFromStageHandler(event: PIXI.interaction.InteractionEvent): void {
    this.on('added', this.removedFromStageHandler, this);
    this.removeDrawEvent();
  }

  protected addDrawEvent(): void {
    this.on(PointerEvents.POINTER_DOWN, this.onDrawBoardMouseDown, this);
    this.on(PointerEvents.POINTER_TAP, this.onClickHander, this);
  }

  protected removeDrawEvent(): void {

  }

  protected onClickHander(event: PIXI.interaction.InteractionEvent): void {

  }

  protected onDrawBoardMouseDown(event: PIXI.interaction.InteractionEvent): void {

  }
}
