export const routes = [
  {
    // 路由的路径
    path: '/',
    redirect: {
      name: 'dashboard'
    },
    meta: {
      useNav: false
    }
  },
  {
    // 路由的路径
    path: '/dashboard',
    // 路由名称
    name: 'dashboard',
    // 页面的标题
    title: '工作台',
    // 引用的组件
    component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-info',
      modules: 'dashboard'
    }
  },
  {
    // 路由的路径
    path: '/course',
    // 路由名称
    name: 'course',
    // 页面的标题
    title: '课程',
    // 引用的组件
    component: () => import(/* webpackChunkName: "course" */ '@/pages/course/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-error',
      modules: 'course'
    }
  },
  {
    // 路由的路径
    path: '/broadcast',
    // 路由名称
    name: 'broadcast',
    // 页面的标题
    title: '直播',
    // 引用的组件
    component: () => import(/* webpackChunkName: "broadcast" */ '@/pages/broadcast/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-success',
      modules: 'broadcast'
    }
  },
  {
    // 路由的路径
    path: '/work-zone',
    // 路由名称
    name: 'work-zone',
    // 页面的标题
    title: '工作圈',
    // 引用的组件
    component: () => import(/* webpackChunkName: "work-zone" */ '@/pages/work-zone/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-warning',
      modules: 'work-zone'
    }
  },
  {
    // 路由的路径
    path: '/notice',
    // 路由名称
    name: 'notice',
    // 页面的标题
    title: '通知',
    // 引用的组件
    component: () => import(/* webpackChunkName: "notice" */ '@/pages/notice/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-question',
      modules: 'notice'
    }
  },
  {
    // 路由的路径
    path: '/organization',
    // 路由名称
    name: 'organization',
    // 页面的标题
    title: '组织',
    // 引用的组件
    component: () => import(/* webpackChunkName: "organization" */ '@/pages/organization/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-star-on',
      modules: 'organization'
    }
  },
  {
    // 路由的路径
    path: '/tutor',
    // 路由名称
    name: 'tutor',
    // 页面的标题
    title: '导师',
    // 引用的组件
    component: () => import(/* webpackChunkName: "tutor" */ '@/pages/tutor/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-message',
      modules: 'tutor'
    }
  },
  {
    // 路由的路径
    path: '/work-book',
    // 路由名称
    name: 'work-book',
    // 页面的标题
    title: '职场书',
    // 引用的组件
    component: () => import(/* webpackChunkName: "work-book" */ '@/pages/work-book/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-remove',
      modules: 'work-book'
    }
  },
  // 数据统计
  {
    // 路由的路径
    path: '/statistics',
    // 路由名称
    name: 'statistics',
    // 页面的标题
    title: '统计',
    // 引用的组件
    component: () => import(/* webpackChunkName: "statistics" */ '@/pages/statistics/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      useNav: true,
      icon: 'el-icon-circle-close',
      modules: 'statistics'
    }
  },
  // 设置路由
  {
    // 路由的路径
    path: '/setting',
    // 路由名称
    name: 'setting',
    // 页面的标题
    title: '设置',
    // 引用的组件
    component: () => import(/* webpackChunkName: "setting" */ '@/pages/setting/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      useNav: false,
      icon: 'el-icon-circle-close',
      modules: 'setting'
    }
  },
  // 系统消息路由
  {
    // 路由的路径
    path: '/system',
    // 路由名称
    name: 'system',
    // 页面的标题
    title: '设置',
    // 引用的组件
    component: () => import(/* webpackChunkName: "system" */ '@/pages/system/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      useNav: false,
      icon: 'el-icon-circle-close',
      modules: 'system'
    }
  },
  // 个人中心路由
  {
    // 路由的路径
    path: '/user',
    // 路由名称
    name: 'user',
    // 页面的标题
    title: '设置',
    // 引用的组件
    component: () => import(/* webpackChunkName: "user" */ '@/pages/user/index.vue'),
    // 元信息
    meta: {
      // 页面是否需要缓存
      keepAlive: false,
      useNav: false,
      icon: 'el-icon-circle-close',
      modules: 'user'
    }
  }
]
