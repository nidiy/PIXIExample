import * as PIXI from 'pixi.js';
/**
 * 2D场景网格
 */
export class GridBackground extends PIXI.Container {
  public static readonly GRID_BACKGROUND_COLOR: number = 0xefefef;  // 画布背景色
  public static readonly GRID_SIZE: number = 800;
  public static readonly GRID_GAP: number = 40;
  // 网格线色
  public static readonly DEFAULT_GRID_COLOR: number = 0xcdcdcd;  // 网格颜色
  public static readonly DEFAULT_GRID_AXIS_COLOR: number = 0xc3c3c3; // 网格主轴(x,y)颜色
  protected backgroundGrid: PIXI.Graphics;

  constructor() {
    super();
    this.backgroundGrid = new PIXI.Graphics();
    this.addChild(this.backgroundGrid);
    this.draw();
  }
  public draw() {
    this.backgroundGrid.clear();
    const ww: number = GridBackground.GRID_SIZE * 0.5;
    // 填充背景
    this.backgroundGrid.beginFill(GridBackground.GRID_BACKGROUND_COLOR, 1.0);
    this.backgroundGrid.drawRect(-ww, -ww, GridBackground.GRID_SIZE, GridBackground.GRID_SIZE);
    this.backgroundGrid.endFill();
    // 绘制网格
    let i: number;
    this.backgroundGrid.lineStyle(1.0, GridBackground.DEFAULT_GRID_COLOR, 1.0);
    for (i = -ww; i <= ww; i += GridBackground.GRID_GAP) {
      this.backgroundGrid.moveTo(-ww, i);
      this.backgroundGrid.lineTo(ww, i);

      this.backgroundGrid.moveTo(i, -ww);
      this.backgroundGrid.lineTo(i, ww);
    }
    this.backgroundGrid.lineStyle(2.0, GridBackground.DEFAULT_GRID_AXIS_COLOR, 1.0);
    this.backgroundGrid.moveTo(-ww, 0);
    this.backgroundGrid.lineTo(ww, 0);
    this.backgroundGrid.moveTo(0, -ww);
    this.backgroundGrid.lineTo(0, ww);
    this.backgroundGrid.endFill();

  }
}
