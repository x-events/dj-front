import {instance} from './index';

//获取群组列表
export const request = params => {
  return instance.get(`/index.php/api/im_group_list/getImGroupList`, {params})
}
//获取群成员
export const getmembers = params => {
  return instance.get(`/index.php/api/im_group_list/getmembers`, {params})
}
//创建单聊
export const createpersonconversation = params => {
  return instance.post(`/index.php/api/im_group_list/createpersonconversation`, params)
}

