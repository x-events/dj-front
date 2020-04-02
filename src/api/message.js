import {instance} from './index';

//获取未读消息
export const unread = params => {
  return instance.get(`/message/unread`, {params})
}
