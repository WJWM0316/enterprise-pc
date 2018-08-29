/**
 * 导航菜单配置
 */
import config from './index'

// 顶部栏
export const topbarMenus = [
  {
    name: '控制台',
    type: 1, // 跳转类型：0=>路由跳转 1=>原生链接跳转
    path: `${config.origin}/Audit/Index/console.html?mdm=169`, // 跳转路径，字符串或者对象
    meta: 'Console' // 模块唯一标识，大驼峰，当type为1时无效
  },
  {
    name: '业务管理',
    type: 1,
    path: `${config.origin}/Audit/userExamine/user_lists.html?mdm=238`
    // meta: 'Bussiness'
  },
  {
    name: '财务管理',
    type: 1,
    path: `${config.origin}/Audit/Transactions/lists.html?mdm=271`
    // meta: 'Bussiness'
  },
  {
    name: '数据管理',
    type: 1,
    path: `${config.origin}/Audit/Index/dataStatis.html?mdm=362`
    // meta: 'Bussiness'
  },
  {
    name: '微信公众号',
    type: 1,
    path: `${config.origin}/addon/Wecome/Wecome/config.html?mdm=188`
    // meta: 'Bussiness'
  },
  {
    name: '内容管理',
    type: 0,
    path: '/course',
    meta: 'Content'
  },
  {
    name: '营销管理',
    type: 0,
    path: '/marketing',
    meta: 'Marketing'
  },
  {
    name: '小灯塔',
    type: 0,
    path: '/columns',
    meta: 'Lighthouse'
  }
]

// 侧边栏
export const asideMenus = [
  {
    name: '知识管理',
    module: 'Content',
    items: [
      {
        name: '课程',
        type: 0, // 跳转类型：0=>路由跳转 1=>原生链接跳转
        path: {
          name: 'courseList'
        }, // 跳转路径，字符串或者对象
        meta: 'Course' // action唯一标识，大驼峰
      },
      {
        name: '电子书',
        type: 0,
        path: {
          name: 'bookList'
        },
        meta: 'Book'
      },
      {
        name: '文章',
        type: 0,
        path: {
          name: 'articleList'
        },
        meta: 'Article'
      },
      {
        name: '投稿内容',
        type: 0,
        path: {
          name: 'contributionList'
        },
        meta: 'Contribution'
      }
    ]
  },
  // {
  //   name: '社区管理',
  //   module: 'Content',
  //   items: [
  //     {
  //       name: '社区',
  //       type: 0,
  //       path: {
  //         name: 'communityList'
  //       },
  //       meta: 'Community'
  //     },
  //     {
  //       name: '精选动态',
  //       type: 0,
  //       path: {
  //         name: 'communitySelectionList'
  //       },
  //       meta: 'CommunitySelection'
  //     },
  //     {
  //       name: '建塔申请',
  //       type: 0,
  //       path: {
  //         name: 'communityCreateApplyList'
  //       },
  //       meta: 'CommunityCreateApply'
  //     }
  //   ]
  // },
  {
    name: '订单管理',
    module: 'Content',
    items: [
      {
        name: '课程',
        type: 0,
        path: {
          name: 'courseOrderList'
        },
        meta: 'CourseOrder'
      },
      {
        name: '电子书',
        type: 0,
        path: {
          name: 'bookOrderList'
        },
        meta: 'BookOrder'
      },
      {
        name: '充值订单',
        type: 0,
        path: {
          name: 'iapOrderList'
        },
        meta: 'IAPOrder'
      }
    ]
  },
  // {
  //   name: '促销折扣',
  //   module: 'Content',
  //   items: [
  //      {
  //       name: '限时特惠',
  //       type: 0,
  //       path: {
  //         name: 'flashsalesList'
  //       },
  //       meta: 'Flashsales'
  //     },
  //     {
  //       name: '小灯塔优惠券',
  //       type: 0,
  //       path: {
  //         name: 'couponsList'
  //       },
  //       meta: 'coupons'
  //     }
  //   ]
  // },
  // new item
  {
    name: '栏目管理',
    module: 'Lighthouse',
    items: [
      {
        name: '栏目',
        type: 0, // 跳转类型：0=>路由跳转 1=>原生链接跳转
        path: {
          name: 'columns'
        }, // 跳转路径，字符串或者对象
        meta: 'lighthouseIndex' // action唯一标识，大驼峰
      }
    ]
  },
  {
    name: '课程管理',
    module: 'Lighthouse',
    items: [
      {
        name: '课程',
        type: 0, // 跳转类型：0=>路由跳转 1=>原生链接跳转
        path: {
          name: 'lighthouseList'
        }, // 跳转路径，字符串或者对象
        meta: 'lighthouseList' // action唯一标识，大驼峰
      }
    ]
  },
  {
    name: '帖子管理',
    module: 'Lighthouse',
    items: [
      {
        name: '帖子',
        type: 0, // 跳转类型：0=>路由跳转 1=>原生链接跳转
        path: {
          name: 'noteList'
        }, // 跳转路径，字符串或者对象
        meta: 'NoteList' // action唯一标识，大驼峰
      }
    ]
  },
  // {
  //   name: '社区管理',
  //   module: 'Lighthouse',
  //   items: [
  //     {
  //       name: '社区',
  //       type: 0,
  //       path: {
  //         name: 'communityList'
  //       },
  //       meta: 'Community'
  //     },
  //     {
  //       name: '建塔申请',
  //       type: 0,
  //       path: {
  //         name: 'communityCreateApplyList'
  //       },
  //       meta: 'CommunityCreateApply'
  //     }
  //   ]
  // },
  {
    name: '社区管理',
    module: 'Lighthouse',
    items: [
      {
        name: '社区',
        type: 0,
        path: {
          name: 'communityList'
        },
        meta: 'Community'
      },
      {
        name: '精选动态',
        type: 0,
        path: {
          name: 'communitySelectionList'
        },
        meta: 'CommunitySelection'
      },
      {
        name: '建塔申请',
        type: 0,
        path: {
          name: 'communityCreateApplyList'
        },
        meta: 'CommunityCreateApply'
      }
    ]
  },
  {
    name: '订单管理',
    module: 'Lighthouse',
    items: [
      {
        name: '社区报名订单',
        type: 0,
        path: {
          name: 'communityApplyOrderList'
        },
        meta: 'CommunityApplyOrder'
      }
    ]
  },
  {
    name: '促销折扣',
    module: 'Lighthouse',
    items: [
      /* {
        name: '限时特惠',
        type: 0,
        path: {
          name: 'flashsalesList'
        },
        meta: 'Flashsales'
      }, */
      {
        name: '小灯塔优惠券',
        type: 0,
        path: {
          name: 'couponsList'
        },
        meta: 'coupons'
      }
    ]
  }
]
