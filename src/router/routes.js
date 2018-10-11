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
      icon: 'icon-worktable',
      // 当前所属的模块
      module: 'dashboard'
    }
  },
  {
    path: '/course',
    name: 'course',
    title: '课程',
    // 直接跳转列表页
    redirect: {
      name: 'courseList'
    },
    component: () => import(/* webpackChunkName: "courseDefault" */ '@/pages/course/index.vue'),
    // 元信息
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'icon-class',
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
    title: '直播',
    // 引用的组件
    component: () => import(/* webpackChunkName: "broadcast" */ '@/pages/broadcast/index.vue'),
    // 直接跳转列表页
    redirect: {
      name: 'broadcastList'
    },
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'icon-live',
      module: 'broadcast'
    },
    children: [
      {
        path: 'review/:id',
        name: 'broadcastReviewList',
        component: () => import(/* webpackChunkName: "broadcastReviewList" */ '@/pages/broadcast/review/index.vue'),
        meta: {
          keepAlive: false,
          module: 'broadcast'
        }
      },
      {
        path: 'response/:id',
        name: 'broadcastResponseList',
        component: () => import(/* webpackChunkName: "broadcastResponseList" */ '@/pages/broadcast/response/index.vue'),
        meta: {
          keepAlive: false,
          module: 'broadcast'
        }
      },
      {
        path: 'index',
        name: 'broadcastList',
        component: () => import(/* webpackChunkName: "broadcastList" */ '@/pages/broadcast/index/index.vue'),
        meta: {
          keepAlive: false,
          module: 'broadcast'
        }
      },
      {
        path: 'post',
        name: 'broadcastPost',
        component: () => import(/* webpackChunkName: "broadcastPost" */ '@/pages/broadcast/post/index.vue'),
        meta: {
          keepAlive: false,
          module: 'broadcast'
        }
      },
      {
        path: 'update/:id',
        name: 'broadcastUpdate',
        component: () => import(/* webpackChunkName: "broadcastPost" */ '@/pages/broadcast/post/index.vue'),
        meta: {
          keepAlive: false,
          module: 'broadcast'
        }
      }
    ]
  },
  {
    path: '/work-zone',
    name: 'work-zone',
    title: '工作圈',
    component: () => import(/* webpackChunkName: "work-zone" */ '@/pages/work-zone/index.vue'),
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'icon-work',
      module: 'work-zone'
    },
    // 直接跳转列表页
    redirect: {
      name: 'workZoneList'
    },
    children: [
      // 工作圈入口
      {
        path: 'index',
        name: 'workZoneList',
        component: () => import(/* webpackChunkName: "workZoneList" */ '@/pages/work-zone/index/index.vue'),
        meta: {
          keepAlive: false,
          module: 'work-zone'
        }
      },
      // 帖子的入口
      {
        path: 'notes/:id',
        name: 'notesList',
        component: () => import(/* webpackChunkName: "notesList" */ '@/pages/work-zone/notes/index.vue'),
        meta: {
          keepAlive: false,
          module: 'work-zone'
        }
      },
      // 一级评论的入口
      {
        path: 'comment/:id',
        name: 'commentList',
        component: () => import(/* webpackChunkName: "commentList" */ '@/pages/work-zone/comment-first/index.vue'),
        meta: {
          keepAlive: false,
          module: 'work-zone'
        }
      },
      // 二级评论的入口
      {
        path: 'comments/:id',
        name: 'commentSecondList',
        component: () => import(/* webpackChunkName: "commentSecondList" */ '@/pages/work-zone/comment-second/index.vue'),
        meta: {
          keepAlive: false,
          module: 'work-zone'
        }
      },
      // 成员区的入口
      {
        path: 'menber/:id',
        name: 'menbersList',
        component: () => import(/* webpackChunkName: "menbersList" */ '@/pages/work-zone/menber/index.vue'),
        meta: {
          keepAlive: false,
          module: 'work-zone'
        }
      },
      // 新增工作圈
      {
        path: 'post',
        name: 'workZonePost',
        component: () => import(/* webpackChunkName: "workZonePost" */ '@/pages/work-zone/post/index.vue'),
        meta: {
          keepAlive: false,
          module: 'work-zone'
        }
      },
      // 更新工作圈
      {
        path: 'update/:id',
        name: 'workZoneUpdate',
        component: () => import(/* webpackChunkName: "workZoneUpdata" */ '@/pages/work-zone/post/index.vue'),
        meta: {
          keepAlive: false,
          module: 'work-zone'
        }
      }
    ]
  },
  // {
  //   path: '/notice',
  //   name: 'notice',
  //   title: '通知',
  //   component: () => import(/* webpackChunkName: "notice" */ '@/pages/notice/index.vue'),
  //   meta: {
  //     keepAlive: false,
  //     useNav: true,
  //     icon: 'icon-message',
  //     module: 'notice'
  //   }
  // },
  {
    path: '/organization',
    name: 'organization',
    title: '组织',
    component: () => import(/* webpackChunkName: "organization" */ '@/pages/organization/index.vue'),
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'icon-organization',
      module: 'organization'
    },
    // 直接跳转列表页
    redirect: {
      name: 'memberList'
    },
    children: [
      {
        path: 'index',
        name: 'memberList',
        component: () => import( '@/pages/organization/index/index.vue'),
        meta: {
          keepAlive: false,
          module: 'organization'
        }
      },
      {
        path: 'groupManage',
        name: 'groupManage',
        component: () => import( '@/pages/organization/groupManage/index.vue'),
        meta: {
          keepAlive: false,
          module: 'organization'
        }
      },
      {
        path: 'addGroup',
        name: 'addGroup',
        component: () => import( '@/pages/organization/groupPost/index.vue'),
        meta: {
          keepAlive: false,
          module: 'organization'
        }
      },
      {
        path: 'editGroup/:groupId',
        name: 'editGroup',
        component: () => import( '@/pages/organization/groupPost/index.vue'),
        meta: {
          keepAlive: false,
          module: 'organization'
        }
      },
      {
        path: 'addMember',
        name: 'addMember',
        component: () => import( '@/pages/organization/memberPost/index.vue'),
        meta: {
          keepAlive: false,
          module: 'organization'
        }
      },
      {
        path: 'editMember',
        name: 'editMember',
        component: () => import( '@/pages/organization/memberPost/index.vue'),
        meta: {
          keepAlive: false,
          module: 'organization'
        }
      }
    ]
  },
  {
    path: '/tutor',
    name: 'tutor',
    title: '导师',
    // 直接跳转列表页
    redirect: {
      name: 'tutorList'
    },
    component: () => import(/* webpackChunkName: "tutor" */ '@/pages/tutor/index.vue'),
    meta: {
      keepAlive: false,
      useNav: true,
      icon: 'icon-teacher',
      module: 'tutor'
    },
    children: [
      {
        path: 'index',
        name: 'tutorList',
        component: () => import(/* webpackChunkName: "courseList" */ '@/pages/tutor/index/index.vue'),
        meta: {
          keepAlive: false,
          module: 'tutor'
        }
      },
      {
        path: 'post',
        name: 'tutorPost',
        component: () => import(/* webpackChunkName: "courseList" */ '@/pages/tutor/post/index.vue'),
        meta: {
          keepAlive: false,
          module: 'tutor'
        }
      }
    ]
  },
  // {
  //   path: '/work-book',
  //   name: 'work-book',
  //   title: '职场书',
  //   component: () => import(/* webpackChunkName: "work-book" */ '@/pages/work-book/index.vue'),
  //   meta: {
  //     keepAlive: false,
  //     useNav: true,
  //     icon: 'el-icon-remove',
  //     module: 'work-book'
  //   }
  // },
  // 数据统计
  // {
  //   path: '/statistics',
  //   name: 'statistics',
  //   title: '统计',
  //   component: () => import(/* webpackChunkName: "statistics" */ '@/pages/statistics/index.vue'),
  //   meta: {
  //     keepAlive: false,
  //     useNav: true,
  //     icon: 'icon-statistics',
  //     module: 'statistics'
  //   }
  // },
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
    title: '个人中心',
    component: () => import(/* webpackChunkName: "user" */ '@/pages/user/index.vue'),
    redirect: {
      name: 'userInfos'
    },
    meta: {
      keepAlive: false,
      useNav: false,
      icon: 'el-icon-circle-close',
      module: 'user'
    },
    children: [
      {
        path: 'info/:id',
        name: 'userInfos',
        component: () => import(/* webpackChunkName: "userInfos" */ '@/pages/user/info/index.vue'),
        meta: {
          keepAlive: false,
          module: 'user'
        }
      },
      {
        path: 'post',
        name: 'userPost',
        component: () => import(/* webpackChunkName: "userPost" */ '@/pages/user/post/index.vue'),
        meta: {
          keepAlive: false,
          module: 'user'
        }
      }
    ]
  },
  // 课节模块
  {
    path: '/lesson',
    name: 'lesson',
    title: '课节',
    // 引用的组件
    component: () => import(/* webpackChunkName: "lesson" */ '@/pages/lesson/index.vue'),
    // 直接跳转列表页
    redirect: {
      name: 'lessonList'
    },
    meta: {
      keepAlive: false,
      useNav: false,
      icon: 'el-icon-success',
      module: 'lesson'
    },
    children: [
      {
        path: 'index',
        name: 'lessonList',
        component: () => import(/* webpackChunkName: "lessonList" */ '@/pages/lesson/index/index.vue'),
        meta: {
          keepAlive: false,
          module: 'lesson'
        }
      },
      {
        path: 'lessonEdit/:id',
        name: 'lessonEdit',
        component: () => import(/* webpackChunkName: "lessonPost" */ '@/pages/lesson/post/index.vue'),
        meta: {
          keepAlive: false,
          module: 'lesson'
        }
      },
      {
        path: 'lessonAdd',
        name: 'lessonAdd',
        component: () => import(/* webpackChunkName: "lessonPost" */ '@/pages/lesson/post/index.vue'),
        meta: {
          keepAlive: false,
          module: 'lesson'
        }
      },
      {
        path: 'punchCard',
        name: 'punchCard',
        component: () => import(/* webpackChunkName: "lessonPost" */ '@/pages/lesson/punchCard/index.vue'),
        meta: {
          keepAlive: false,
          module: 'lesson'
        }
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import(/* webpackChunkName: "lessonPost" */ '@/pages/lesson/comment/index.vue'),
        meta: {
          keepAlive: false,
          module: 'lesson'
        }
      },
      {
        path: 'secondComment',
        name: 'secondComment',
        component: () => import(/* webpackChunkName: "lessonPost" */ '@/pages/lesson/secondComment/index.vue'),
        meta: {
          keepAlive: false,
          module: 'lesson'
        }
      }
    ]
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
  },
  // 帮助页面
  {
    path: '/help',
    name: 'help',
    title: '帮助页',
    component: () => import(/* webpackChunkName: "help" */ '@/pages/help/index.vue'),
    meta: {
      keepAlive: false,
      useNav: false
    },
  },
  // 排序设置管理
  {
    path: '/setSort',
    name: 'setSort',
    title: '排序设置',
    component: () => import(/* webpackChunkName: "setSort" */ '@/pages/setSort/index.vue'),
    meta: {
      icon: 'el-icon-circle-close',
      keepAlive: false,
      useNav: true
    },
  },
  {
    path: '*',
    redirect: {
      name: 'dashboard'
    },
    meta: {
      keepAlive: false,
      useNav: false
    }
  }
]
