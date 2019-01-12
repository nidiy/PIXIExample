export class CMath {
  /**
   * 返回一个范围内的值
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  public static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
}
