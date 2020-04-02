import {
    instance
} from './index';
import * as util from "@/assets/util"

// 获取工作动态
export const dynamics = params => {
    return instance.get(`/index.php/api/Article/list_index`, {
        params
    })
}

// 工作动态-列表
export const dynamicsList = params => {
    return instance.get(`/index.php/api/Article/lists`, {
        params
    })
}

// 工作动态-详情
export const dynamicsDetail = params => {
    return instance.get(`/index.php/api/Article/view`, {
        params
    })
}

// 待办事项列表
export const scheduleList = params => {
    return instance.get(`/index.php/api/Process/Schedule`, {
        params
    })
}

// 通知列表
export const noticeList = params => {
    return instance.get(`/index.php/api/notice/index/`, {
        params
    })
}

// 流程分类树
export const typeTree = params => {
    return instance.get(`/index.php/api/process/gettreelist`, {
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

// 我的工作列表
export const myList = params => {
    return instance.get(`/index.php/api/process/mylist`, {
        params
    })
}


// 模板列表
export const templateList = params => {
    return instance.get(`/index.php/api/process/getprocesstemplate`, {
        params
    })
}

// 新建任务权限
export const createTaskRights = params => {
    return instance.get(`/index.php/api/form_category/index`, {
        params
    })
}

// 新建任务
export const createTask = params => {
    return instance.post(`/index.php/api/form_record/submitRecord`, params)
}

//工作指引
export const FormGuide = params => {
    return instance.get(`/index.php/api/FormGuide/view`, {
        params
    })
}


// 预览流程步骤
export const viewProcessStep = params => {
    return instance.get(`/index.php/api/process_nearest_step/index`, {
        params
    })
}

// 预览步骤行为
export const viewStepForm = params => {
    return instance.get(`/index.php/api/process_nearest_step/form`, {
        params
    })
}

// 新建流程步骤
export const newProcessStep = params => {
    return instance.get(`/index.php/api/process_step/index`, {
        params
    })
}

// 新建步骤行为
export const newStepForm = params => {
    return instance.get(`/index.php/api/process_step/form`, {
        params
    })
}

// 已有流程步骤
export const processStep = params => {
    return instance.get(`/index.php/api/process_step_log/index`, {
        params
    })
}

// 已有步骤行为
export const stepForm = params => {
    return instance.get(`/index.php/api/process_step_log/form`, {
        params
    })
}

// 保存
export const saveTask = params => {
    return instance.post(`/index.php/api/form_record/submit`, params)
}

// 流程终止
export const actDone = params => {
    return instance.post(`/index.php/api/process_log/back`, params)
}

// 驳回
export const actBack = params => {
    return instance.post(`/index.php/api/process_step_log/back`, params)
}

// 增加协作者
export const actAddActor = params => {
    return instance.post(`/index.php/api/process_step_log/addActor`, params)
}

// 任务指派
export const actAssignMember = params => {
    return instance.post(`/index.php/api/process_step_log/assignMember`, params)
}

// 转交下一步
export const deliverProcess = params => {
    return instance.post(`/index.php/api/process_step_log/deliver`, params)
}

// 流程完结
export const stopProcess = params => {
    return instance.post(`/index.php/api/process_log/stop`, params)
}

// 确认表单
export const confirmNext = params => {
    return instance.post(`/index.php/Api/process_step_log/checkRecord`, params)
}

// 党建资讯-列表
export const newsList = params => {
    return instance.get(`/index.php/Api/news/index`, {
        params
    })
}

// 党建资讯-详情
export const newsDetail = params => {
    return instance.get(`/index.php/Api/news/view`, {
        params
    })
}

// 我的工作 - 左侧树
export const myWorkTree = params => {
    return instance.get(`/index.php/api/task/mytree`, {
        params
    })
}
// 我的工作列表(全部)
export const myWork = params => {
    return instance.get(`/index.php/api/task/my`, {
        params
    })
}
// 我的工作列表(非全部)
export const catelist = params => {
    return instance.get(`/index.php/api/task/catelist`, {
        params
    })
}
// 我的工作列表删除
export const workdel = params => {
    return instance.post(`/index.php/api/task/workdel`, params)
}
// 典型选树-审核操作
export const honoraudit = params => {
    return instance.post(`/index.php/api/task/honoraudit`, params)
}

//获取记录表单
export const form_record = params => {
    return instance.get(`/index.php/api/form_record/form`, {
        params
    })
}

//工作指引
export const form_guide_view = params => {
    return instance.get(`/index.php/api/FormGuide/view`, {
        params
    })
}
//依托资源类别1
export const rely_on_resource1 = params => {
    return instance.get(`/index.php/Api/PartyField/componentIndex`, {
        params
    })
}
//依托资源类别2
export const rely_on_resource2 = params => {
    return instance.get(`/index.php/Api/Building/componentIndex`, {
        params
    })
}
//依托资源类别3
export const rely_on_resource3 = params => {
    return instance.get(`/index.php/Api/FormRecordResultTeam/componentIndex`, {
        params
    })
}
//获取当前组织党员列表
export const memberlist = params => {
    return instance.get(`/index.php/api/task/memberlist`, {
        params
    })
}
//党费收缴-党费情况
export const party_fee = params => {
    return instance.get(`/index.php/api/party_fee/componentIndex`, {
        params
    })
}

//民主评议-互评结果
export const memberEvaluation = params => {
    return instance.get(`/index.php/api/Evaluation/componentIndex`, {
        params
    })
}
//民主评议-综合结果
export const memberEvaluation2 = params => {
    return instance.get(`/index.php/api/Evaluation/componentIndex2`, {
        params
    })
}
//评语列表
export const commentlist = params => {
    return instance.get(`/index.php/api/task/comment`, {
        params
    })
}

//提交评语
export const addcomment = params => {
    return instance.post(`/index.php/api/task/commentadd`, params)
}
//删除评语
export const commentdel = params => {
    return instance.post(`/index.php/api/task/commentdel`, params)
}

//工作管理
export const workManageList = params => {
    return instance.get(`/index.php/api/process/workManageList`, {
        params
    })
}
//应到党员数
export const organization = params => {
    return instance.get(`/index.php/api/User/organization`, {
        params
    })
}

//工作管理工作类型筛选
export const mytree = params => {
    return instance.get(`/index.php/api/process/mytree`, {
        params
    })
}

//党员分流
export const orgMember = params => {
    return instance.get(`/index.php/api/Organization/organizationMembers`, {
        params
    })
}
//党组织分流
export const subOrg = params => {
    return instance.get(`/index.php/api/Organization/children`, {
        params
    })
}
//党组织分流
export const orgExcept = params => {
    return instance.get(`/index.php/api/org/orgExcept`, {
        params
    })
}
//下级党组织
export const orgChildren = params => {
    return instance.get(`/index.php/api/org/orgChildren`, {
        params
    })
}


//综合评价
export const org_evaluate = params => {
    return instance.get(`/index.php/api/evaluate/org_evaluate`, {
        params
    })
}
//满意度测评记录保存
export const satisfied_edit = params => {
    return instance.post(`/index.php/api/evaluate/satisfied_edit`, params)
}
//年终考评记录保存
export const evaluate_edit = params => {
    return instance.post(`/index.php/api/evaluate/evaluate_edit`, params)
}
//日常评价
export const work_evaluate = params => {
    return instance.get(`/index.php/api/evaluate/work_evaluate`, {params})
}
//处理详情 -评价+保存
export const evaluate_save = params => {
    return instance.post(`/index.php/api/evaluate/evaluate_save`, params)
}
//年终考评记录
export const evaluate = params => {
    return instance.get(`/index.php/api/evaluate/evaluate`, {params})
}
//满意度测评记录
export const satisfied = params => {
    return instance.get(`/index.php/api/evaluate/satisfied`, {params})
}

//处理详情 -评价
export const evaluate_detail = params => {
    return instance.get(`/index.php/api/evaluate/evaluate_detail`, {params})
}

//队伍管理 -队伍列表
export const team = params => {
    return instance.get(`/index.php/Api/FormRecordResultTeam/componentIndex`, {params})
}
//直系组织
export const partyMemberShipList = params => {
    return instance.get(`/index.php/api/Organization/lineAll`, {params})
}
