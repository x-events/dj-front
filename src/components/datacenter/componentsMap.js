// 动态组件注册

// 基本信息集
 const baseinfo = () => import('./baseinfo')

// 申请入党信息集
 const apply_party = () => import('./apply_party_info')

// 职称信息集
 const job_title = () => import('./job_title_info')

// 家庭成员信息集
 const family_member = () => import('./family_member_info')

// 学历学位信息集
 const degree_info = () => import('./degree_info')

// 党籍信息集
 const membership_info = () => import('./membership_info')

// 党内职务信息集
 const party_position_info = () => import('./party_position_info')

// 行政职务信息集
 const administrative_duties = () => import('./administrative_duties')

// 组织关系信息集
 const organizational_relationship = () => import('./organizational_relationship')

// 出国党员信息集
 const members_abroad = () => import('./members_abroad')

// 表彰信息集
 const commendation = () => import('./commendation')

// 惩戒信息集
 const discipline = () => import('./discipline')

// 离退信息集
 const retreat = () => import('./retreat')

// 困难党员信息集
 const difficult_member = () => import('./difficult_member')

// 困难党员享受帮扶信息集
 const help_memeber = () => import('./help_memeber')

// 困难党员脱贫脱困信息集
 const poverty_alleviation = () => import('./poverty_alleviation')

// 党员补充信息集
 const supplement_memeber = () => import('./supplement_memeber')

export const map = [
  {name: '基本信息集', component: baseinfo},
  {name: '申请入党信息集', component: apply_party},
  {name: '职称信息集', component: job_title},
  {name: '家庭成员信息集', component: family_member},
  {name: '学历学位信息集', component: degree_info},
  {name: '党籍信息集', component: membership_info},
  {name: '党内职务信息集', component: party_position_info},
  {name: '行政职务信息集', component: administrative_duties},
  {name: '组织关系信息集', component: organizational_relationship},
  {name: '出国党员信息集', component: members_abroad},
  {name: '表彰信息集', component: commendation},
  {name: '惩戒信息集', component: discipline},
  {name: '离退信息集', component: retreat},
  {name: '困难党员信息集', component: difficult_member},
  {name: '困难党员享受帮扶信息集', component: help_memeber},
  {name: '困难党员脱贫脱困信息集', component: poverty_alleviation},
  {name: '党员补充信息集', component: supplement_memeber},
]