import {showToast} from 'components/Toast';
const API_DOMAIN_NAME = 'https://api.bootcdn.cn';

export function request(path, body, isPost) {
    let url = API_DOMAIN_NAME + path;
    const options = {};
    if (isPost) {
      options.method = 'POST'
      options.headers = {
        'Content-Type': 'application/json',
      }
      options.body = JSON.stringify(body)
    } else if (body) {
      url += '?' + stringify(body)
    }
  
    return fetch(url, options)
      .then(res => res.json())
      .catch(err => {
        showToast('数据异常，请检查网络设置')
        // console.log('数据异常，请检查网络设置')
      })
  }