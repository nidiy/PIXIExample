/**
 * 一个简单的注入框架
 * 利用装饰器特性实现
 * @author tanhaibin
 * @url https://www.tslang.cn/docs/handbook/decorators.html  装饰器介绍
 */
const injectableObjects: any = {};

/**
 * 类注入
 * @param configuration  相关配置(暂时保留)
 * @param args           传给类的初始化参数
 * @returns {(constructor: any) => void}
 */
export function injectable(configuration?: any, ...args) {
  return function (constructor: any) {
    injectableObjects[constructor] = new constructor(args)
    Object.seal(constructor);
    Object.seal(constructor.prototype);
  };
}

/**
 * 获取一个注入实例对像
 * @param classObject  对应的注入类
 * @returns {(target: any, targetKey: string, index?: (number | undefined)) => void}
 */
export function inject(classObject: any) {
  return function (target: any, targetKey: string, index?: number | undefined) {
    const object = injectableObjects[classObject];
    if (!object) {
      throw new Error(`${classObject}该类没有注入`);
    } else {
      target[targetKey] = object;
    }
  };
}
