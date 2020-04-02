import {
    instance
} from './index';

// 为民办实事列表
export const lists = params => {
    return instance.get(`/index.php/api/Work/lists`, {
        params
    })
}

// 添加为民办实事
export const add_info = params => {
    return instance.post(`/index.php/api/Work/add_info`, params)
}

// 编辑为民办实事
export const edit_info = params => {
    return instance.post(`/index.php/api/Work/edit`, params)
}

// 删除为民办实事
export const del_info = params => {
    return instance.post(`/index.php/api/Work/del`, params)
}

// 规章制度列表
export const rules = params => {
    return instance.get(`/index.php/api/form_record_rules/index`, {
        params
    })
}
// 删除规章制度
export const delRules = params => {
    return instance.post(`/index.php/api/form_record_rules/del`, params)
}
// 新增规章制度
export const addRules = params => {
    return instance.post(`/index.php/api/form_record_rules/add`, params)
}

// 党员联系群众列表
export const memContact = params => {
    return instance.get(`/index.php/api/record/servelist2`, {
        params
    })
}
// // 删除党员联系群众
// export const delMemContact = params => {
//     return instance.post(`/index.php/api/form_record_pm_contact/del`, params)
// }
// // 新增党员联系群众
// export const addMemContact = params => {
//     return instance.post(`/index.php/api/form_record_pm_contact/add`, params)
// }

// 班子成员接访列表
export const interview = params => {
    return instance.get(`/index.php/api/form_record_pm_interview/index`, {
        params
    })
}
// 删除班子成员接访
export const delInterview = params => {
    return instance.post(`/index.php/api/form_record_pm_interview/del`, params)
}
// 新增班子成员接访
export const addInterview = params => {
    return instance.post(`/index.php/api/form_record_pm_interview/add`, params)
}

// 党代表联系记录列表
export const contact = params => {
    return instance.get(`/index.php/api/form_record_pr_contact/index`, {
        params
    })
}
// 删除党代表联系记录
export const delContact = params => {
    return instance.post(`/index.php/api/form_record_pr_contact/del`, params)
}
// 新增党代表联系记录
export const addContact = params => {
    return instance.post(`/index.php/api/form_record_pr_contact/add`, params)
}


// 为民服务队伍列表
export const service = params => {
    return instance.get(`/index.php/api/form_record_pc_service/index`, {
        params
    })
}
// 删除为民服务队伍
export const delService = params => {
    return instance.post(`/index.php/api/form_record_pc_service/del`, params)
}
// 新增为民服务队伍
export const addService = params => {
    return instance.post(`/index.php/api/form_record_pc_service/add`, params)
}
// 编辑为民服务队伍
export const editService = params => {
    return instance.post(`/index.php/api/form_record_pc_service/edit`, params)
}

// 活动情况列表
export const active = params => {
    return instance.get(`/index.php/api/form_record_pc_activity/index`, {
        params
    })
}
// 删除活动情况
export const delActive = params => {
    return instance.post(`/index.php/api/form_record_pc_activity/del`, params)
}
// 新增活动情况
export const addActive = params => {
    return instance.post(`/index.php/api/form_record_pc_activity/add`, params)
}
// 编辑活动情况
export const editActive = params => {
    return instance.post(`/index.php/api/form_record_pc_activity/edit`, params)
}

// 所有队伍列表
export const teamList = params => {
    return instance.get(`/index.php/api/form_record_pc_service/all`, {params})
}

// 为民服务项目列表
export const serveItems = params => {
    return instance.get(`/index.php/api/form_record_pp_service/index`, {
        params
    })
}
// 删除为民服务项目
export const delServeItem = params => {
    return instance.post(`/index.php/api/form_record_pp_service/del`, params)
}
// 新增为民服务项目
export const addServeItem = params => {
    return instance.post(`/index.php/api/form_record_pp_service/add`, params)
}
// 编辑为民服务项目
export const editServeItem = params => {
    return instance.post(`/index.php/api/form_record_pp_service/edit`, params)
}


// 满意度测评列表
export const satisfaction = params => {
    return instance.get(`/index.php/api/form_record_pm_satisfaction/index`, {
        params
    })
}
// 删除满意度测评
export const delSatisfaction = params => {
    return instance.post(`/index.php/api/form_record_pm_satisfaction/del`, params)
}
// 新增满意度测评
export const addSatisfaction = params => {
    return instance.post(`/index.php/api/form_record_pm_satisfaction/add`, params)
}
// 编辑满意度测评
export const editSatisfaction = params => {
    return instance.post(`/index.php/api/form_record_pm_satisfaction/edit`, params)
}



// 谈心谈话记录
export const talk = params => {
    return instance.get(`/index.php/api/form_record_hth_talk/index`, {params})
}
// 删除谈心谈话记录
export const delTalk = params => {
    return instance.post(`/index.php/api/form_record_hth_talk/del`, params)
}
// 新增谈心谈话记录
export const addTalk = params => {
    return instance.post(`/index.php/api/form_record_hth_talk/add`, params)
}
// 编辑谈心谈话记录
export const editTalk = params => {
    return instance.post(`/index.php/api/form_record_hth_talk/edit`, params)
}

// 问需问政问策会
export const meeting = params => {
    return instance.get(`/index.php/api/form_record_pgg_meeting/index`, {params})
}
// 删除问需问政问策会
export const delMeeting = params => {
    return instance.post(`/index.php/api/form_record_pgg_meeting/del`, params)
}
// 新增问需问政问策会
export const addMeeting = params => {
    return instance.post(`/index.php/api/form_record_pgg_meeting/add`, params)
}
// 编辑问需问政问策会
export const editMeeting = params => {
    return instance.post(`/index.php/api/form_record_pgg_meeting/edit`, params)
}

// 解决实际问题
export const solution = params => {
    return instance.get(`/index.php/api/form_record_pgg_solution/index`, {params})
}
// 删除解决实际问题
export const delSolution = params => {
    return instance.post(`/index.php/api/form_record_pgg_solution/del`, params)
}
// 新增解决实际问题
export const addSolution = params => {
    return instance.post(`/index.php/api/form_record_pgg_solution/add`, params)
}
// 编辑解决实际问题
export const editSolution = params => {
    return instance.post(`/index.php/api/form_record_pgg_solution/edit`, params)
}