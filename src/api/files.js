import {instance} from './index';
import {baseURL} from './index';

//收件箱
export const receive = params => {
  return instance.get(`/index.php/api/paper/index`, {params})
}

//阅读回执
export const receipt = params => {
  return instance.get(`/index.php/api/paper/receiptlist`, {params})
}

//发送
export const send = params => {
  return instance.post(`/index.php/api/paper/addpaper`, params)
}

//已阅
export const read = params => {
  return instance.post(`/index.php/api/paper/read`, params)
}

//下载
export const downloadUrl = `${baseURL}/index.php/api/paper/download`
