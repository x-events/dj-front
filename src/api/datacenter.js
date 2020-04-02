import {instance, baseURL} from './index';

// 数据中心权限
export const center_auth = params => {
  return instance.get(`/index.php/api/CenterAdd/center_auth`, {params})
} 

// 党组织树
export const org = params => {
  return instance.get(`/index.php/api/DataCenter/orgtree`, {params})
} 

// 获取党组织信息列表
export const partyInfo = params => {
  return instance.get(`/index.php/api/data/get_org_list`, {params})
} 

// 党组织基本信息
export const org_info = params => {
  return instance.get(`/index.php/api/Data/org_info`, {params})
} 

// 获取党组织个人信息列表
export const person = params => {
  return instance.get(`/index.php/api/DataCenter/partyMemberInfo`, {params})
} 

// 获取党员详情信息
export const personDetail = params => {
  return instance.get(`/index.php/api/DataCenter/partyMemberDetail`, {params})
}

// 获取个人申请入党信息集
export const joinInfo = params => {
  return instance.get(`/index.php/api/Data/party_join_info`, {params})
} 

// 获取个人职称信息集
export const jobTitleInfo = params => {
  return instance.get(`/index.php/api/DataCenter/jobTitleInfo`, {params})
} 

// 获取个人家庭成员信息集
export const familyUser = params => {
  return instance.get(`/index.php/api/DataCenter/familyUser`, {params})
} 

// 获取个人学历学位信息集
export const educationInfo = params => {
  return instance.get(`/index.php/api/DataCenter/educationInfo`, {params})
} 

// 获取个人党籍信息集
export const party_membership = params => {
  return instance.get(`/index.php/api/Data/party_membership`, {params})
} 

// 获取个人行政职务信息集
export const administrationPost = params => {
  return instance.get(`/index.php/api/DataCenter/administrationPost`, {params})
} 

// 党内职务信息集
export const party_position = params => {
  return instance.get(`/index.php/api/Data/party_position`, {params})
} 

// 组织关系信息集
export const OrgRelationInfo = params => {
  return instance.get(`/index.php/api/DataCenter/OrgRelationInfo`, {params})
}

// 个人出国党员信息集
export const abroadPartyMember = params => {
  return instance.get(`/index.php/api/DataCenter/abroadPartyMember`, {params})
}

// 表彰信息集
export const commend = params => {
  return instance.get(`/index.php/api/DataCenter/commend`, {params})
}

// 惩戒信息集
export const discipline = params => {
  return instance.get(`/index.php/api/DataCenter/discipline`, {params})
}

// 离退信息集
export const retreat = params => {
  return instance.get(`/index.php/api/DataCenter/retreat`, {params})
}

// 困难党员信息集
export const member_poverty = params => {
  return instance.get(`/index.php/api/Data/member_poverty`, {params})
}

// 困难党员享受帮扶信息
export const member_helped = params => {
  return instance.get(`/index.php/api/Data/member_helped`, {params})
}

// 困难党员脱贫脱困信息
export const member_leave_povertyt = params => {
  return instance.get(`/index.php/api/Data/member_leave_poverty`, {params})
}

// 党员补充信息
export const member_sup_info = params => {
  return instance.get(`/index.php/api/Data/member_sup_info`, {params})
}

// 获取单位信息列表
export const unitinfo = params => {
  return instance.get(`/index.php/api/DataCenter/unitinfo`, {params})
} 

// 获取单位详细信息
export const unitDetail = params => {
  return instance.get(`/index.php/api/DataCenter/unitdetail`, {params})
} 

// 获取党建阵地列表
export const party_field_list = params => {
  return instance.get(`/index.php/api/Data/party_field_list`, {params})
} 

// 获取党建阵地详情
export const party_field_info = params => {
  return instance.get(`/index.php/api/Data/party_field_info`, {params})
} 

// 工会列表
export const org_union_list = params => {
  return instance.get(`/index.php/api/Data/org_union_list`, {params})
} 

// 工会详情
export const org_union_info = params => {
  return instance.get(`/index.php/api/Data/org_union_info`, {params})
} 

// 妇联列表
export const org_women_list = params => {
  return instance.get(`/index.php/api/Data/org_women_list`, {params})
} 

// 妇联详情
export const org_women_info = params => {
  return instance.get(`/index.php/api/Data/org_women_info`, {params})
} 

// 团组织列表
export const org_youth_list = params => {
  return instance.get(`/index.php/api/Data/org_youth_list`, {params})
} 

// 团组织详情
export const org_youth_info = params => {
  return instance.get(`/index.php/api/Data/org_youth_info`, {params})
} 

// 获取商务楼宇
export const building = params => {
  return instance.get(`/index.php/api/DataCenter/building`, {params})
} 

// 获取楼宇详情信息
export const buildingDetail = params => {
  return instance.get(`/index.php/api/DataCenter/buildingDetail`, {params})
} 

// 获取社会组织
export const org_social_list = params => {
  return instance.get(`/index.php/api/Data/org_social_list`, {params})
} 

// 获取社会组织信息
export const org_social_info = params => {
  return instance.get(`/index.php/api/Data/org_social_info`, {params})
} 

// 获取非公企业
export const nonPublicEnterprises = params => {
  return instance.get(`/index.php/api/DataCenter/nonPublicEnterprises`, {params})
} 

// 获取非公企业信息
export const nonPublicEnterprisesDetail = params => {
  return instance.get(`/index.php/api/DataCenter/nonPublicEnterprisesDetail`, {params})
} 



/* 2019-5-14 */
// 单位保存（添加、编辑）
export const unit_edit = params => {
    return instance.post(`/index.php/api/CenterAdd/unit_edit`, params)
}
// 单位删除
export const unit_del = params => {
  return instance.get(`/index.php/api/CenterAdd/unit_del`, {params})
} 
// 单位编辑时显示
export const unit_edit_info = params => {
  return instance.get(`/index.php/api/CenterAdd/unit_info`, {params})
} 
// 社会组织保存（添加、编辑）
export const social_edit = params => {
    return instance.post(`/index.php/api/CenterAdd/social_edit`, params)
}
// 社会组织删除
export const social_del = params => {
  return instance.get(`/index.php/api/CenterAdd/social_del`, {params})
} 
// 社会组织编辑时显示
export const social_edit_info = params => {
  return instance.get(`/index.php/api/CenterAdd/social_info`, {params})
} 
// 妇联保存（添加、编辑）
export const women_edit = params => {
    return instance.post(`/index.php/api/CenterAdd/women_edit`, params)
}
// 妇联删除
export const women_del = params => {
  return instance.get(`/index.php/api/CenterAdd/women_del`, {params})
} 
// 妇联编辑时显示
export const women_edit_info = params => {
  return instance.get(`/index.php/api/CenterAdd/women_info`, {params})
} 
// 妇联弹出框/查看
export const women_detail = params => {
  return instance.get(`/index.php/api/CenterAdd/women_detail`, {params})
} 
// 团组织保存（添加、编辑）
export const group_edit = params => {
    return instance.post(`/index.php/api/CenterAdd/youth_edit`, params)
}
// 团组织删除
export const group_del = params => {
  return instance.get(`/index.php/api/CenterAdd/youth_del`, {params})
} 
// 团组织编辑时显示
export const group_edit_info = params => {
  return instance.get(`/index.php/api/CenterAdd/youth_info`, {params})
} 
// 团组织弹出框/查看
export const youth_detail = params => {
  return instance.get(`/index.php/api/CenterAdd/youth_detail`, {params})
} 
// 党建阵地保存（添加、编辑）
export const party_edit = params => {
    return instance.post(`/index.php/api/CenterAdd/party_edit`, params)
}
// 党建阵地删除
export const party_del = params => {
  return instance.get(`/index.php/api/CenterAdd/party_del`, {params})
} 
// 党建阵地编辑时显示
export const party_edit_info = params => {
  return instance.get(`/index.php/api/CenterAdd/party_info`, {params})
} 
// 党建阵地 功能列表
export const party_func = params => {
  return instance.get(`/index.php/api/CenterAdd/party_func`, {params})
} 
// 党组织保存（添加、编辑）
export const org_edit = params => {
    return instance.post(`/index.php/api/CenterAdd/org_edit`, params)
}
// 党组织删除
export const org_del = params => {
  return instance.get(`/index.php/api/center_add/org_del`, {params})
} 
// 党组织编辑显示
export const org_edit_info = params => {
  return instance.get(`/index.php/api/CenterAdd/org_info`, {params})
} 
// 党组织弹出框/查看
export const org_detail = params => {
  return instance.get(`/index.php/api/center_add/org_detail`, {params})
} 
// 添加获取上级党组织
export const add_first_org = params => {
  return instance.get(`/index.php/api/CenterAdd/org_add`, {params})
} 
// 党组织变更
export const org_change = params => {
  return instance.get(`/index.php/api/center_add/org_change`, {params})
} 
// 撤销党组织
export const cancel_org_list = params => {
  return instance.get(`/index.php/api/center_add/get_cancel_org_list`, {params})
} 

// 党务工作者列表
export const worker_list = params => {
    return instance.get(`/index.php/api/party/worker_list`, {params})
} 
// 党务工作者查看、弹框、编辑显示
export const worker_info = params => {
  return instance.get(`/index.php/api/party/worker_info`, {params})
} 
// 党务工作者保存（添加、编辑）
export const worker_edit = params => {
    return instance.post(`/index.php/api/party/worker_edit`, params)
}
// 党务工作者保存验证（班子成员）
export const worker_check = params => {
    return instance.post(`/index.php/api/party/worker_check`, params)
}
// 党务工作者删除
export const worker_del = params => {
  return instance.get(`/index.php/api/party/worker_del`, {params})
} 

// 非公企业查看、弹窗、编辑显示
export const company_info = params => {
  return instance.get(`/index.php/api/party/company_info`, {params})
} 
// 非公企业保存（添加、编辑）
export const company_edit = params => {
    return instance.post(`/index.php/api/party/company_edit`, params)
}
// 非公企业删除
export const company_del = params => {
  return instance.get(`/index.php/api/party/company_del`, {params})
} 

// 党员查看、弹框、编辑显示
export const member_info = params => {
    return instance.get(`/index.php/api/party/member_info`, {params})
} 
// 党员保存（添加、编辑）
export const member_edit = params => {
    return instance.post(`/index.php/api/party/member_edit`, params)
}
// 党员列表删除
export const member_del = params => {
  return instance.post(`/index.php/api/party/member_del`, params)
} 
// 党员--党内职务列表
export const member_duty_list = params => {
    return instance.get(`/index.php/api/party/duty_list`, {params})
} 
// 党员--党内职务保存（添加、编辑）
export const member_duty_edit = params => {
    return instance.post(`/index.php/api/party/duty_edit`, params)
}
// 党员--党内职务编辑显示）
export const member_duty_info = params => {
    return instance.get(`/index.php/api/party/duty_info`, {params})
}
// 党员--党内职务删除
export const member_duty_del = params => {
  return instance.get(`/index.php/api/party/duty_del`, {params})
} 
// 党员--申请入党信息保存
export const member_apply_party_edit = params => {
    return instance.post(`/index.php/api/party/apply_party_edit`, params)
}
// 党员--申请入党查看、编辑显示
export const member_apply_party_info = params => {
    return instance.get(`/index.php/api/party/apply_party_info`, {params})
}
// 党员--职称保存
export const member_title_edit = params => {
    return instance.post(`/index.php/api/party/title_edit`, params)
}
// 党员--职称信息查看
export const member_title_info = params => {
    return instance.get(`/index.php/api/party/title_info`, {params})
}
// 党员--家庭成员信息保存
export const member_family_edit = params => {
    return instance.post(`/index.php/api/party/family_edit`, params)
}
// 党员--家庭成员信息
export const member_family_info = params => {
    return instance.get(`/index.php/api/party/family_info`, {params})
}
// 党员--学历信息保存
export const member_education_edit = params => {
    return instance.post(`/index.php/api/party/education_edit`, params)
}
// 党员--学历信息
export const member_education_info = params => {
    return instance.get(`/index.php/api/party/education_info`, {params})
}
// 党员--党籍信息保存
export const member_ship_edit = params => {
    return instance.post(`/index.php/api/party/membership_edit`, params)
}
// 党员--党籍信息
export const member_ship_info = params => {
    return instance.get(`/index.php/api/party/membership_info`, {params})
}
// 党员--行政职务保存
export const member_stration_edit = params => {
    return instance.post(`/index.php/api/party/stration_edit`, params)
}
// 党员--行政职务列表
export const member_stration_list = params => {
    return instance.get(`/index.php/api/party/stration_list`, {params})
}
// 党员--行政职务信息编辑展示
export const member_stration_info = params => {
    return instance.get(`/index.php/api/party/stration_info`, {params})
}
// 党员--行政职务删除
export const member_stration_del = params => {
  return instance.get(`/index.php/api/party/stration_del`, {params})
} 
// 党员--组织关系保存
export const member_relation_edit = params => {
    return instance.post(`/index.php/api/party/org_relation_edit`, params)
}
// 党员--组织关系列表
export const member_relation_list = params => {
    return instance.get(`/index.php/api/party/org_relation_list`, {params})
}
// 党员--组织关系编辑显示
export const member_relation_info = params => {
    return instance.get(`/index.php/api/party/org_relation_info`, {params})
}
// 党员--组织关系删除
export const member_relation_del = params => {
  return instance.get(`/index.php/api/party/org_relation_del`, {params})
} 
// 党员--出国信息保存
export const member_abroad_edit = params => {
    return instance.post(`/index.php/api/party/abroad_edit`, params)
}
// 党员--出国信息列表
export const member_abroad_list = params => {
    return instance.get(`/index.php/api/party/abroad_list`, {params})
}
// 党员--出国信息编辑展示
export const member_abroad_info = params => {
    return instance.get(`/index.php/api/party/abroad_info`, {params})
}
// 党员--出国信息删除
export const member_abroad_del = params => {
  return instance.get(`/index.php/api/party/abroad_del`, {params})
} 
// 党员--表彰信息保存
export const member_commend_edit = params => {
    return instance.post(`/index.php/api/party/commend_edit`, params)
}
// 党员--表彰信息列表
export const member_commend_list = params => {
    return instance.get(`/index.php/api/party/commend_list`, {params})
}
// 党员--表彰信息编辑展示
export const member_commend_info = params => {
    return instance.get(`/index.php/api/party/commend_info`, {params})
}
// 党员--表彰信息删除
export const member_commend_del = params => {
  return instance.get(`/index.php/api/party/commend_del`, {params})
} 
// 党员--惩戒信息保存
export const member_discipline_edit = params => {
    return instance.post(`/index.php/api/party/discipline_edit`, params)
}
// 党员--惩戒信息列表
export const member_discipline_list = params => {
    return instance.get(`/index.php/api/party/discipline_list`, {params})
}
// 党员--惩戒信息编辑展示
export const member_discipline_info = params => {
    return instance.get(`/index.php/api/party/discipline_info`, {params})
}
// 党员--惩戒信息删除
export const member_discipline_del = params => {
  return instance.get(`/index.php/api/party/discipline_del`, {params})
} 
// 党员--离退信息保存
export const member_retreat_edit = params => {
    return instance.post(`/index.php/api/party/retreat_edit`, params)
}
// 党员--离退信息编辑展示
export const member_retreat_info = params => {
    return instance.get(`/index.php/api/party/retreat_info`, {params})
}
// 党员--困难党员信息保存
export const member_poverty_edit = params => {
    return instance.post(`/index.php/api/party/poverty_edit`, params)
}
// 党员--困难党员编辑显示
export const member_poverty_info = params => {
    return instance.get(`/index.php/api/party/poverty_info`, {params})
}
// 党员--困难党员享受帮扶信息保存
export const member_helped_edit = params => {
    return instance.post(`/index.php/api/party/helped_edit`, params)
}
// 党员--困难党员享受帮扶信息列表
export const member_helped_list = params => {
    return instance.get(`/index.php/api/party/helped_list`, {params})
}
// 党员--困难党员享受帮扶信息编辑展示
export const member_helped_info = params => {
    return instance.get(`/index.php/api/party/helped_info`, {params})
}
// 党员--困难党员享受帮扶信息删除
export const member_helped_del = params => {
  return instance.get(`/index.php/api/party/helped_del`, {params})
} 
// 党员--困难党员脱贫信息保存
export const member_leave_poverty_edit = params => {
    return instance.post(`/index.php/api/party/leave_poverty_edit`, params)
}
// 党员--困难党员脱贫信息查看/编辑
export const member_leave_poverty_info = params => {
    return instance.get(`/index.php/api/party/leave_poverty_info`, {params})
}
// 党员--党员补充信息添加、编辑
export const member_supplement_edit = params => {
    return instance.post(`/index.php/api/party/sup_edit`, params)
}
// 党员--党员补充信息查看/编辑展示
export const member_supplement_info = params => {
    return instance.get(`/index.php/api/party/sup_info`, {params})
}

// 工会删除
export const union_del = params => {
    return instance.get(`/index.php/api/union/union_del`, {params})
}
// 工会信息查看/编辑展示
export const union_info = params => {
    return instance.get(`/index.php/api/union/union_info`, {params})
}
// 工会信息保存
export const union_edit = params => {
    return instance.post(`/index.php/api/union/union_edit`, params)
}
// 工会人员列表
export const union_member_list = params => {
    return instance.get(`/index.php/api/union/union_member_list`, {params})
}
// 工会人员编辑显示
export const union_member_info = params => {
    return instance.get(`/index.php/api/union/union_member_info`, {params})
}
// 工会人员信息保存（添加、编辑）
export const union_member_edit = params => {
    return instance.post(`/index.php/api/union/union_member_edit`, params)
}
// 工会人员信息删除
export const union_member_del = params => {
    return instance.get(`/index.php/api/union/union_member_del`, {params})
}

// 特色队伍列表
export const team_list = params => {
    return instance.get(`/index.php/api/union/team_list`, {params})
}
// 特色队伍信息删除
export const team_del = params => {
    return instance.get(`/index.php/api/union/team_del`, {params})
}
// 特色队伍信息编辑展示
export const team_info = params => {
    return instance.get(`/index.php/api/union/team_info`, {params})
}
// 特色队伍信息保存
export const team_edit = params => {
    return instance.post(`/index.php/api/union/team_edit`, params)
}
// 特色队伍人员列表
export const team_member_list = params => {
    return instance.get(`/index.php/api/union/team_member_list`, {params})
}
// 特色队伍人员信息编辑展示
export const team_member_info = params => {
    return instance.get(`/index.php/api/union/team_member_info`, {params})
}
// 特色队伍人员信息保存
export const team_member_edit = params => {
    return instance.post(`/index.php/api/union/team_member_edit`, params)
}
// 特色队伍人员信息删除
export const team_member_del = params => {
    return instance.get(`/index.php/api/union/team_member_del`, {params})
}
// 特色队伍活动列表
export const team_active_list = params => {
    return instance.get(`/index.php/api/union/team_active_list`, {params})
}

// 楼宇服务站信息编辑展示
export const building_info = params => {
    return instance.get(`/index.php/api/union/building_info`, {params})
}
// 楼宇服务站信息保存（添加、编辑）
export const building_edit = params => {
    return instance.post(`/index.php/api/union/building_edit`, params)
}
// 楼宇服务站信息删除
export const building_del = params => {
    return instance.get(`/index.php/api/union/building_del`, {params})
}
// 楼宇服务站活动图片列表
export const building_active_img = params => {
    return instance.get(`/index.php/api/union/building_active_img`, {params})
}
// 楼宇服务站活动列表
export const building_active_list = params => {
    return instance.get(`/index.php/api/union/building_active_list`, {params})
}


// 所属社区
export const get_community = params => {
    return instance.get(`/index.php/api/center_add/get_community`, {params})
} 
/* // 单位库
export const get_unit = params => {
    return instance.get(`/index.php/api/CenterAdd/get_unit`, {params})
} 
// 商务楼宇服务站数据
export const get_building = params => {
    return instance.get(`/index.php/api/party/get_building`, {params})
} 
// 社会组织数据
export const get_social = params => {
    return instance.get(`/index.php/api/party/get_social`, {params})
} 
// 党建阵地数据
export const get_party = params => {
    return instance.get(`/index.php/api/party/get_party`, {params})
} 
// 非公企业信息
export const get_company = params => {
    return instance.get(`/index.php/api/party/get_company`, {params})
}  */
/* 分页 */
// 单位库
export const get_unit = params => {
    return instance.get(`/index.php/api/org/get_unit`, {params})
} 
export const get_all_unit = params => {
  return instance.get(`/index.php/api/org/getUnit`, {params})
} 
// 商务楼宇服务站数据
export const get_building = params => {
    return instance.get(`/index.php/api/org/get_building`, {params})
} 
// 社会组织数据
export const get_social = params => {
    return instance.get(`/index.php/api/org/get_social`, {params})
} 
// 党建阵地数据
export const get_party = params => {
    return instance.get(`/index.php/api/org/get_party`, {params})
} 
// 非公企业信息
export const get_company = params => {
    return instance.get(`/index.php/api/org/get_company`, {params})
} 
// 籍贯树
export const get_native_place = params => {
    return instance.get(`/index.php/api/party/get_area`, {params})
} 
// 籍贯（一级一级获取）
export const get_native_first = params => {
    return instance.get(`/index.php/api/party/get_area_first`, {params})
} 

// 导出数据 公用
// type    party:党建阵地；unit:单位；women:妇联；social:社会组织；youth:团组织；org:党组织;worker:党务工作者；member:党员；company:非公企业；
export const datacenter_export = `${baseURL}/index.php/api/center_add/export`

// 模板下载 公用
// type    同上
export const datacenter_downtemplate = `${baseURL}/index.php/api/public/downtemplate`

// 导入 公用
// type    同上
export const datacenter_import = `${baseURL}/index.php/api/center_add/import`


// 党员列表
export const mem_list = params => {
    return instance.get(`/index.php/api/party/mem_list`, {params})
}

// 党员恢复
export const mem_recover = params => {
    return instance.get(`/index.php/api/party/mem_recover`, {params})
}

// 党员选择党组织恢复
export const member_change_org = params => {
    return instance.get(`/index.php/api/party/member_change_org`, {params})
}

// 党员彻底删除
export const mem_del = params => {
    return instance.get(`/index.php/api/party/mem_del`, {params})
}