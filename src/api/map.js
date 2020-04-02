import { instance } from './index';

//获取党组织列表
export const partyorglist = params => {
    return instance.get(`/index.php/api/map/partyorglist`, {
        params
    })
}

//获取群团组织列表
export const grouporglist = params => {
    return instance.get(`/index.php/api/map/grouporglist`, {
        params
    })
}

//获取党建阵地列表
export const partyfieldlist = params => {
    return instance.get(`/index.php/api/map/partyfieldlist`, {
        params
    })
}

//可视窗口地图
export const communityorg = params => {
    return instance.get(`/index.php/api/map/communityorg`, {
        params
    })
}

//可视窗口统计数据
export const count = params => {
    return instance.get(`/index.php/api/map/count`, {
        params
    })
}

//获取组织信息
export const getOrgMessage = params => {
    return instance.get(`/index.php/api/Organization/getOrgMessage`, {
        params
    })
}
