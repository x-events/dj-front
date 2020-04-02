// 动态组件注册

// 基本信息集
const memberbaseinfo = () => import('./member_baseinfo')

// 党组织绑定楼宇信息
// const memberBuild = () => import('./member_building')

// 单位信息
// const memberUnit = () => import('./member_unit')

// 党建阵地
const memberPosititon = () => import('./member_position')

// 党组织中需要增加楼宇
// const memberNeed = () => import('./member_need')

// 党建阵地的属性
// const memberAttr = () => import('./member_attr')


export const memberMap = [
  {name: '基本信息集', component: memberbaseinfo},
  // {name: '党组织绑定楼宇信息', component: memberBuild},
  // {name: '单位信息', component: memberUnit},
  //{name: '党建阵地', component: memberPosititon},
  // {name: '党组织中需要增加楼宇', component: memberNeed},
  // {name: '党建阵地的属性', component: memberAttr},
]