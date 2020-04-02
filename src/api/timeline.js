import {instance} from './index';

//列表
export const list = params => {
  return instance.get(`/index.php/api/friend/index`, {params})
}

//我的
export const mylist = params => {
  return instance.get(`/index.php/api/friend/myfriend`, {params})
}

//发送
export const send = params => {
  return instance.post(`/index.php/api/friend/addfriend`, params)
}

//点赞
export const agree = params => {
  return instance.post(`/index.php/api/friend/agree`, params)
}

//取消点赞
export const cancelagree = params => {
  return instance.post(`/index.php/api/friend/cancelagree`, params)
}

//删除
export const del = params => {
  return instance.post(`/index.php/api/friend/deletefriend`, params)
}