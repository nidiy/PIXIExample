/**
 * 注册一个方法装饰器
 * @param {string} name
 * @returns {(target, propertyKey: string, descriptor: PropertyDescriptor) => any}
 */
export function cmd(name: string) {
  return function (target, propertyKey: string, descriptor: PropertyDescriptor): any {
    const oldValue = descriptor.value;
    descriptor.value = function () {
      const value = oldValue.apply(target, arguments);
      return value;
    };
    window[name] = descriptor.value;
    return descriptor;
  };
}
