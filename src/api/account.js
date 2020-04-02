import {
    instance
} from './index';
import CryptoJS from "crypto-js";
//登录
export const login = params => {
    let md5password = CryptoJS.MD5(params.password).toString()
    return instance.post(`/index.php/api/Public/login`, {
        username: params.username,
        password: md5password,
        is_web: 1
    })
}

// 获取手机验证码
export const getcode = params => {
    return instance.post(`/index.php/api/public/sms`, params)
}

// 验证手机验证码
export const checkcode = params => {
    return instance.post(`/index.php/api/public/resetPassword`, params)
}

// 修改密码
export const resetPassword = params => {
    let md5password = CryptoJS.MD5(params.password).toString()
    return instance.post(`/index.php/api/public/resetPassword`, {
        cellphone: params.cellphone,
        password: md5password,
        code: params.code
    })
}

// 首次登录修改初始密码、绑定手机号码
export const firstLogin = params => {
    let md5password = CryptoJS.MD5(params.password).toString()
    return instance.post(`/index.php/api/index/initialLogin`, {
        cellphone: params.phone,
        password: md5password,
        code: params.code
    })
}

// 获取个人信息
export const info = params => {
    return instance.get(`/index.php/api/user/personshow`, {
        params
    })
}

// 更新个人信息
export const update = params => {
    return instance.post(`/index.php/api/User/savePersonSetting`, params)
}

// 改密码
export const changepw = params => {
    let password = CryptoJS.MD5(params.password).toString()
    let old_password = CryptoJS.MD5(params.old_password).toString()
    return instance.post(`/index.php/api/base_data/changePassword`, {
        old_password,
        password
    })
}


// 获取部门信息
export const orgInfo = params => {
    return instance.get(`/index.php/api/base_data/getRoleMessage`, {
        params
    })
}

// 获取字典
export const kvp = params => {
    return instance.get(`/index.php/api/user/getdictdata`, {
        params
    })
}

// 无密码登录
export const loginNoPassword = params => {
    return instance.post(`/index.php/api/Public/loginNoPassword`, params)
}

// 获取身份列表
export const partyMemberShipList = params => {
    return instance.get(`/index.php/api/User/partyMemberShipList`, {
        params
    })
}

// 切换身份
export const changePartyMemberShip = params => {
    return instance.post(`/index.php/api/User/changePartyMemberShip`, params)
}
