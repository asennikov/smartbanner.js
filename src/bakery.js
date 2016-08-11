export default class Bakery {

  static bake(duration) {
    document.cookie = `smartbanner_exited=1; max-age=${duration};`;
  }

  static unbake() {
    document.cookie = 'smartbanner_exited=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  static get baked() {
    let value = document.cookie.replace(/(?:(?:^|.*;\s*)smartbanner_exited\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    return value === '1';
  }

}
