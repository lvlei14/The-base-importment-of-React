import config from '../config';

const querystring = {
  stringify: (obj) => {
    let str = '';
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        str += key + '=' + obj[key] + '&';
      }
    }
    return str;
  }
};

export default function(redirect, state, scope) {
  const url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
  const info = {
    appid: config.wechatAppId,
    redirect_uri: redirect || config.wxRedirectUrl,
    response_type: 'code',
    scope: scope || 'snsapi_userinfo',
    state: state || ''
  };

  return url + '?' + querystring.stringify(info) + '#wechat_redirect';
}
