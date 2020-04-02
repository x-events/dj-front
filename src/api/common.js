import {
    instance
} from './index';
import {
    baseURL
} from './index';
import * as util from "@/assets/util"

// store
let store = {
    state: {
        priority: [],
        org: {},
        role: []
    },
    setPriority(newVal) {
        this.state.priority = newVal
    },
    setOrg(newVal) {
        this.state.org = newVal
    },
    setRole(newVal) {
        this.state.role = newVal
    }
}

//优先级
export const level = params => {
    if (store.state.priority.length) {
        return new Promise(resolve => resolve({
            data: {
                data: store.state.priority
            }
        }))
    }
    return instance.get(`/index.php/api/base_data/level`, {
        params
    }).then(res => {
        store.setPriority(res.data.data);
        return new Promise(resolve => resolve(res))
    })
}

//账号角色
export const role = params => {
    if (store.state.role.length) {
        return new Promise(resolve => resolve({
            data: {
                data: store.state.role
            }
        }))
    }
    return instance.get(`/index.php/api/base_data/role`, {
        params
    }).then(res => {
        store.setRole(res.data.data);
        return new Promise(resolve => resolve(res))
    })
}

//组织结构
export const org = params => {
    
    // if (store.state.org.length) {
    //     return new Promise(resolve => resolve(util.deepcopy({
    //         data: {
    //             data: store.state.org
    //         }
    //     })))
    // }
    return instance.get(`/index.php/api/User/org`, {
        params
    }).then(res => {
        let data = util.buildMenu(res.data.data)
        store.setOrg(data);
        return new Promise(resolve => resolve({
            data: {
                data
            }
        }))
    })
}

//组织结构 2019-05-30
export const orglist = params => {
    return instance.get(`/index.php/api/org/org_by_id`, {params})
}
//组织结构 数据中心身份权限筛选 2019-07-10
export const orglist_power = params => {
    return instance.get(`/index.php/api/org/org_role`, {params})
}

//所有组织
export const allorg = params => {
    return instance.get(`/index.php/api/User/subOrg`, {
        params
    }).then(res => {
        let data = util.buildMenu(res.data.data)
        return new Promise(resolve => resolve({
            data: {
                data
            }
        }))
    })
}
//根据组织查党员
export const members = params => {
    return instance.get(`/index.php/api/User/org_user`, {
        params
    })
}

//上传图片
export const uploadImg = params => {
    return instance.post(`/index.php/api/uploader/saveimgfile`, params)
}

//文件上传地址
export const upload = `${baseURL}/index.php/api/uploader/saveFile`

// 根据uid查用户信息
export const memberinfo = params => {
    return instance.get(`/index.php/api/base_data/getmemberinfo`, {
        params
    })
}

//获取党组织类型分类
export const orgtype = params => {
    return instance.get(`/index.php/api/map/orgtype`, {params})
}

//账号权限下的组织树
export const getRoleTree = params => {
    return instance.get(`/index.php/api/base_data/getRoleTree`, {params}).then(res => {
        let data = util.buildMenu(res.data.data)
        return new Promise(resolve => resolve({
            data: {
                data
            }
        }))
    })
}

// 省市区
export const area = params => {
    return instance.get(`/index.php/api/base_data/getarea`, {
        params
    })
}

//网站基本信息
export const config = params => {
    return instance.get(`/index.php/api/Public/config`, {params})
}

// 数据字典树
export const getDictData_tree = params => {
    return instance.get(`/index.php/api/user/getDictData_tree`, {params})
}

// 数据字典分层级获取
export const get_dict = params => {
    return instance.get(`/index.php/api/org/get_dict`, {params})
}

// 获取网站配置
export const getConfig = params => {
    return instance.get(`/index.php/api/Config/getConfigByName`, {params})
}


