import {instance} from './index';

//收/发件箱
export const receive = params => {
  return instance.get(`/index.php/api/notice/index`, {params})
}

//阅读回执
export const receipt = params => {
  return instance.get(`/index.php/api/notice/receiptlist`, {params})
}

//详情
export const detail = params => {
  return instance.get(`/index.php/api/notice/show`, {params})
}

//发送
export const send = params => {
  return instance.post(`/index.php/api/notice/addnotice`, params)
}

//回执
export const read = params => {
  return instance.post(`/index.php/api/notice/read`, params)
}
//已阅
export const isRead = params => {
  return instance.post(`/index.php/api/read/isRead`, params)
}