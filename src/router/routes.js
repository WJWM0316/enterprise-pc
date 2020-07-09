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
      // 一级路由需要设置， 是否在侧边栏显示
      useNav: true,
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
      useNav: true,
      icon: 'icon-class',
      module: 'course'
    }
  },
  {
    path: '/course-list',
    name: 'courseList',
    component: () => import(/* webpackChunkName: "courseList" */ '@/pages/course/index/index.vue'),
    meta: {
      module: 'course',
      useNav: false
    }
  },
  {
    path: '/course-post',
    name: 'coursePost',
    component: () => import(/* webpackChunkName: "coursePost" */ '@/pages/course/post/index.vue'),
    meta: {
      module: 'course',
      useNav: false
    }
  },
  {
    path: '/course-update',
    name: 'courseUpdate',
    component: () => import(/* webpackChunkName: "courseUpdata" */ '@/pages/course/post/index.vue'),
    meta: {
      module: 'course',
      useNav: false
    }
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
      useNav: true,
      icon: 'icon-live',
      module: 'broadcast'
    },
  },
  {
    path: '/live-review-list',
    name: 'broadcastReviewList',
    component: () => import(/* webpackChunkName: "broadcastReviewList" */ '@/pages/broadcast/review/index.vue'),
    meta: {
      module: 'broadcast',
      useNav: false
    }
  },
  {
    path: '/live-response-list',
    name: 'broadcastResponseList',
    component: () => import(/* webpackChunkName: "broadcastResponseList" */ '@/pages/broadcast/response/index.vue'),
    meta: {
      module: 'broadcast',
      useNav: false
    }
  },
  {
    path: '/live-list',
    name: 'broadcastList',
    component: () => import(/* webpackChunkName: "broadcastList" */ '@/pages/broadcast/index/index.vue'),
    meta: {
      module: 'broadcast',
      useNav: false
    }
  },
  {
    path: '/live-post',
    name: 'broadcastPost',
    component: () => import(/* webpackChunkName: "broadcastPost" */ '@/pages/broadcast/post/index.vue'),
    meta: {
      module: 'broadcast',
      useNav: false
    }
  },
  {
    path: '/live-update',
    name: 'broadcastUpdate',
    component: () => import(/* webpackChunkName: "broadcastPost" */ '@/pages/broadcast/post/index.vue'),
    meta: {
      module: 'broadcast',
      useNav: false
    }
  },
  {
    path: '/work-zone',
    name: 'work-zone',
    title: '工作圈',
    component: () => import(/* webpackChunkName: "work-zone" */ '@/pages/work-zone/index.vue'),
    meta: {
      useNav: true,
      icon: 'icon-work',
      module: 'work-zone'
    },
    // 直接跳转列表页
    redirect: {
      name: 'workZoneList'
    }
  },
  // 工作圈入口
  {
    path: '/work-zone-list',
    name: 'workZoneList',
    component: () => import(/* webpackChunkName: "workZoneList" */ '@/pages/work-zone/index/index.vue'),
    meta: {
      module: 'work-zone',
      useNav: false
    }
  },
  // 帖子的入口
  {
    path: '/notes-list',
    name: 'notesList',
    component: () => import(/* webpackChunkName: "notesList" */ '@/pages/work-zone/notes/index.vue'),
    meta: {
      module: 'work-zone',
      useNav: false
    }
  },
  // 一级评论的入口
  {
    path: '/comment-list',
    name: 'commentList',
    component: () => import(/* webpackChunkName: "commentList" */ '@/pages/work-zone/comment-first/index.vue'),
    meta: {
      module: 'work-zone',
      useNav: false
    }
  },
  // 二级评论的入口
  {
    path: '/comments-list',
    name: 'commentSecondList',
    component: () => import(/* webpackChunkName: "commentSecondList" */ '@/pages/work-zone/comment-second/index.vue'),
    meta: {
      module: 'work-zone',
      useNav: false
    }
  },
  // 成员区的入口
  {
    path: '/zone-menber-list',
    name: 'menbersList',
    component: () => import(/* webpackChunkName: "menbersList" */ '@/pages/work-zone/menber/index.vue'),
    meta: {
      module: 'work-zone',
      useNav: false
    }
  },
  // 新增工作圈
  {
    path: '/work-zone-post',
    name: 'workZonePost',
    component: () => import(/* webpackChunkName: "workZonePost" */ '@/pages/work-zone/post/index.vue'),
    meta: {
      module: 'work-zone',
      useNav: false
    }
  },
  // 更新工作圈
  {
    path: '/work-zone-update',
    name: 'workZoneUpdate',
    component: () => import(/* webpackChunkName: "workZoneUpdata" */ '@/pages/work-zone/post/index.vue'),
    meta: {
      module: 'work-zone',
      useNav: false
    }
  },
  // {
  //   path: '/notice',
  //   name: 'notice',
  //   title: '通知',
  //   component: () => import(/* webpackChunkName: "notice" */ '@/pages/notice/index.vue'),
  //   meta: {
  
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
      useNav: true,
      icon: 'icon-organization',
      module: 'organization'
    },
    // 直接跳转列表页
    redirect: {
      name: 'memberList'
    }
  },
  {
    path: '/member-list',
    name: 'memberList',
    component: () => import( '@/pages/organization/index/index.vue'),
    meta: {
      module: 'organization',
      useNav: false
    }
  },
  {
    path: '/group-manage',
    name: 'groupManage',
    component: () => import( '@/pages/organization/groupManage/index.vue'),
    meta: {
      module: 'organization',
      useNav: false
    }
  },
  {
    path: '/add-group',
    name: 'addGroup',
    component: () => import( '@/pages/organization/groupPost/index.vue'),
    meta: {
      module: 'organization',
      useNav: false
    }
  },
  {
    path: '/edit-group',
    name: 'editGroup',
    component: () => import( '@/pages/organization/groupPost/index.vue'),
    meta: {
      module: 'organization',
      useNav: false
    }
  },
  {
    path: '/add-member',
    name: 'addMember',
    component: () => import( '@/pages/organization/memberPost/index.vue'),
    meta: {
      module: 'organization',
      useNav: false
    }
  },
  {
    path: '/edit-member',
    name: 'editMember',
    component: () => import( '@/pages/organization/memberPost/index.vue'),
    meta: {
      module: 'organization',
      useNav: false
    }
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
      useNav: true,
      icon: 'icon-teacher',
      module: 'tutor'
    }
  },
  {
    path: '/tutor-list',
    name: 'tutorList',
    component: () => import(/* webpackChunkName: "courseList" */ '@/pages/tutor/index/index.vue'),
    meta: {
      useNav: false,
      module: 'tutor'
    }
  },
  {
    path: '/tutor-post',
    name: 'tutorPost',
    component: () => import(/* webpackChunkName: "courseList" */ '@/pages/tutor/post/index.vue'),
    meta: {
      useNav: false,
      module: 'tutor'
    }
  },
  // 书籍管理 start
    {
      path: '/books',
      name: 'books',
      title: '职场书',
      component: () => import(/* webpackChunkName: "books" */ '@/pages/books/index.vue'),
      meta: {
        icon: 'icon-book',
        useNav: true,
        module: 'books'
      },
      // 直接跳转列表页
      redirect: {
        name: 'booksList'
      }
    },
    //书籍列表
    {
      path: '/books-list',
      name: 'booksList',
      component: () => import(/* webpackChunkName: "courseList" */ '@/pages/books/index/index.vue'),
      meta: {
        useNav: false,
        module: 'books'
      }
    },
  //数据统计
  {
    path: '/statistics',
    name: 'statistics',
    title: '统计',
    redirect: {
      name: 'statisticsCourse'
    },
    meta: {
      useNav: true,
      icon: 'icon-statistics',
      module: 'statistics'
    }
  },
  {
    path: '/statistics-live',
    name: 'statisticsLive',
    title: '统计-直播',
    component: () => import(/* webpackChunkName: "statisticsLive" */ '@/pages/statistics/live/index.vue'),
    meta: {
      useNav: false,
      module: 'statistics'
    }
  },
  {
    path: '/statistics-member',
    name: 'statisticsMember',
    title: '统计-课程',
    component: () => import(/* webpackChunkName: "statisticsCourse" */ '@/pages/statistics/member/index.vue'),
    meta: {
      useNav: false,
      module: 'statistics'
    }
  },
  {
    path: '/statistics-tutor',
    name: 'statisticsTutor',
    title: '统计-课程',
    component: () => import(/* webpackChunkName: "statisticsCourse" */ '@/pages/statistics/tutor/index.vue'),
    meta: {
      useNav: false,
      module: 'statistics'
    }
  },
  {
    path: '/statistics-zone',
    name: 'statisticsZone',
    title: '统计-课程',
    component: () => import(/* webpackChunkName: "statisticsCourse" */ '@/pages/statistics/zone/index.vue'),
    meta: {
      useNav: false,
      module: 'statistics'
    }
  },
  {
    path: '/statistics-course',
    name: 'statisticsCourse',
    title: '统计-课程',
    component: () => import(/* webpackChunkName: "statisticsCourse" */ '@/pages/statistics/course/index.vue'),
    meta: {
      useNav: false,
      module: 'statistics'
    }
  },
  {
    path: '/statistics-clock',
    name: 'statisticsClock',
    title: '统计-课程',
    component: () => import(/* webpackChunkName: "statisticsCourse" */ '@/pages/statistics/clock/index.vue'),
    meta: {
      useNav: false,
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
      useNav: false,
      icon: 'el-icon-circle-close',
      module: 'user'
    }
  },
  {
    path: '/user-infos',
    name: 'userInfos',
    component: () => import(/* webpackChunkName: "userInfos" */ '@/pages/user/info/index.vue'),
    meta: {
      module: 'user',
      useNav: false
    }
  },
  {
    path: '/question-naire',
    name: 'questionnaire',
    component: () => import(/* webpackChunkName: "userInfos" */ '@/pages/user/info/questionnaire.vue'),
    meta: {
      module: 'user',
      useNav: false
    }
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
      useNav: false,
      icon: 'el-icon-success',
      module: 'lesson'
    }
  },
  {
    path: '/lesson-list',
    name: 'lessonList',
    component: () => import(/* webpackChunkName: "lessonList" */ '@/pages/lesson/index/index.vue'),
    meta: {
      module: 'lesson',
      useNav: false
    }
  },
  {
    path: '/lesson-edit',
    name: 'lessonEdit',
    component: () => import(/* webpackChunkName: "lessonPost" */ '@/pages/lesson/post/index.vue'),
    meta: {
      module: 'lesson',
      useNav: false
    }
  },
  {
    path: '/lesson-add',
    name: 'lessonAdd',
    component: () => import(/* webpackChunkName: "lessonPost" */ '@/pages/lesson/post/index.vue'),
    meta: {
      module: 'lesson',
      useNav: false
    }
  },
  {
    path: '/punch-card',
    name: 'punchCard',
    component: () => import(/* webpackChunkName: "lessonPost" */ '@/pages/lesson/punchCard/index.vue'),
    meta: {
      module: 'lesson',
      useNav: false
    }
  },
  {
    path: '/lesson-comment',
    name: 'comment',
    component: () => import(/* webpackChunkName: "lessonPost" */ '@/pages/lesson/comment/index.vue'),
    meta: {
      module: 'lesson',
      useNav: false
    }
  },
  {
    path: '/lesson-second-comment',
    name: 'secondComment',
    component: () => import(/* webpackChunkName: "lessonPost" */ '@/pages/lesson/secondComment/index.vue'),
    meta: {

      module: 'lesson'
    }
  },
  // 登陆模块
  // {
  //   path: '/login',
  //   name: 'login',
  //   title: '登陆',
  //   component: () => import( webpackChunkName: "login"  '@/pages/auth/login.vue'),
  //   meta: {
  //     useNav: false
  //   }
  // },
  // 帮助页面
  {
    path: '/help',
    name: 'help',
    title: '帮助页',
    component: () => import(/* webpackChunkName: "help" */ '@/pages/help/index.vue'),
    meta: {
      useNav: false
    },
  },
  // 排序设置管理
  {
    path: '/setSort',
    name: 'setSort',
    title: '分类设置',
    component: () => import(/* webpackChunkName: "setSort" */ '@/pages/setSort/index.vue'),
    meta: {
      icon: 'icon-set',
      useNav: true
    },
  },
  
  {
    path: '*',
    redirect: {
      name: 'dashboard'
    },
    meta: {
      useNav: false
    }
  }
]
