export default class Bakery {

  static bake() {
    const year = 60*60*24*365;
    document.cookie = `smartbanner_exited=1; max-age=${year};`;
  }

  static unbake() {
    document.cookie = 'smartbanner_exited=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  static get baked() {
    let value = document.cookie.replace(/(?:(?:^|.*;\s*)smartbanner_exited\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    return value === '1';
  }

}
