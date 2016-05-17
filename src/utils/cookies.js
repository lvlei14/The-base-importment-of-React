/**
 * 获取 cookie 值
 * @param name
 * @returns {*}
 */
export function getCookie(name) {
  let arr;
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if (arr = document.cookie.match(reg))
    return arr[2];
  else {
    return null;
  }
}


/**
 * 设置 cookie
 * @param name
 * @param value
 * @param time
 */
export function setCookie(name, value, time) {
  let exp = new Date();
  exp.setTime(exp.getTime() + time * 1);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
