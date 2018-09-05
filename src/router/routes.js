export const routes = [
  {
    path: '/',
    // 默认进入控制台
    redirect: {
      name: 'dashboard'
    },
    meta: {
      useNav: false
    }
  },
  // 控制台
  {
    path: '/dashboard',
    name: 'dashboard',
    title: '工作台',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      // 一级路由需要设置， 是否在侧边栏显示
      useNav: true,
      // 对应的图标名称
      icon: 'el-icon-info',
      // 当前所属的模块
      module: 'dashboard'
    }
  },
  {
    path: '/course',
    name: 'course',
    title: '课程管理',
    // 支架跳转列表页
    redirect: {
      name: 'courseList'
    },
    component: () => import(/* webpackChunkName: "courseDefault" */ '@/pages/course/index.vue'),
    // 元信息
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-error',
      module: 'course'
    },
    children: [
      {
        path: 'index',
        name: 'courseList',
        component: () => import(/* webpackChunkName: "courseList" */ '@/pages/course/index/index.vue'),
        meta: {
          keepAlive: false,
          module: 'course'
        }
      },
      {
        path: 'post',
        name: 'coursePost',
        component: () => import(/* webpackChunkName: "coursePost" */ '@/pages/course/post/index.vue'),
        meta: {
          keepAlive: false,
          module: 'course'
        }
      },
      {
        path: 'update/:id',
        name: 'courseUpdate',
        component: () => import(/* webpackChunkName: "courseUpdata" */ '@/pages/course/post/index.vue'),
        meta: {
          keepAlive: false,
          module: 'course'
        }
      }
    ]
  },
  {
    path: '/broadcast',
    name: 'broadcast',
    title: '直播管理',
    // 引用的组件
    component: () => import(/* webpackChunkName: "broadcast" */ '@/pages/broadcast/index.vue'),
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-success',
      module: 'broadcast'
    }
  },
  {
    path: '/work-zone',
    name: 'work-zone',
    title: '工作圈管理',
    component: () => import(/* webpackChunkName: "work-zone" */ '@/pages/work-zone/index.vue'),
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-warning',
      module: 'work-zone'
    }
  },
  {
    path: '/notice',
    name: 'notice',
    title: '通知管理',
    component: () => import(/* webpackChunkName: "notice" */ '@/pages/notice/index.vue'),
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-question',
      module: 'notice'
    }
  },
  {
    path: '/organization',
    name: 'organization',
    title: '组织管理',
    component: () => import(/* webpackChunkName: "organization" */ '@/pages/organization/index.vue'),
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-star-on',
      module: 'organization'
    }
  },
  {
    path: '/tutor',
    name: 'tutor',
    title: '导师管理',
    component: () => import(/* webpackChunkName: "tutor" */ '@/pages/tutor/index.vue'),
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-message',
      module: 'tutor'
    }
  },
  {
    path: '/work-book',
    name: 'work-book',
    title: '职场书',
    component: () => import(/* webpackChunkName: "work-book" */ '@/pages/work-book/index.vue'),
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-remove',
      module: 'work-book'
    }
  },
  // 数据统计
  {
    path: '/statistics',
    name: 'statistics',
    title: '数据统计',
    component: () => import(/* webpackChunkName: "statistics" */ '@/pages/statistics/index.vue'),
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-circle-close',
      module: 'statistics'
    }
  },
  // 设置路由
  {
    path: '/setting',
    name: 'setting',
    title: '设置',
    component: () => import(/* webpackChunkName: "setting" */ '@/pages/setting/index.vue'),
    meta: {
      keepAlive: false,
      useNav: false,
      icon: 'el-icon-circle-close',
      module: 'setting'
    }
  },
  // 系统消息路由
  {
    path: '/system',
    name: 'system',
    title: '系统',
    component: () => import(/* webpackChunkName: "system" */ '@/pages/system/index.vue'),
    meta: {
      keepAlive: false,
      useNav: false,
      icon: 'el-icon-circle-close',
      module: 'system'
    }
  },
  // 个人中心路由
  {
    path: '/user',
    name: 'user',
    title: '个人中心',
    component: () => import(/* webpackChunkName: "user" */ '@/pages/user/index.vue'),
    meta: {
      keepAlive: false,
      useNav: false,
      icon: 'el-icon-circle-close',
      module: 'user'
    }
  },
  // 登陆模块
  {
    path: '/login',
    name: 'login',
    title: '登陆',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/auth/login.vue'),
    meta: {
      keepAlive: false,
      useNav: false
    }
  }
]
