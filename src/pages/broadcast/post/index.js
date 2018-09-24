import Vue from 'vue'
import Component from 'vue-class-component'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import Editor from 'COMPONENTS/editor'
import Cropper from 'cropperjs'
import { editorRules } from 'FILTERS/rules'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  components: {
    ModalDialog,
    Editor,
    SearchBar
  },
  methods: {
    ...mapActions([
      'showMsg',
      'getGroupListsApi',
      'getMenberListsApi',
      'uploadApi',
      'getJobCircleDetailsApi',
      'getJobCircleHitListsApi',
      'getJobCircleOrganizationListsApi',
      'getCategoryListsApi',
      'getTutorListApi',
      'updateGroupListsApi',
      'updateCategoryListsApi',
      'postLiveApi',
      'putLiveApi',
      'getCategoryListsApi',
      'getLiveDetailApi',
      'getLiveMenberListApi',
      'getLiveInvisibleMenberListApi',
      'getTutorListApi'
    ])
  },
  computed: {
    ...mapGetters([
      'groupLists',
      'menberLists',
      'categoryList',
      'tutorLists',
      'liveDetails',
      'tutorLists'
    ])
  }
})
export default class BroadcastPost extends Vue {

  form = {
    // 直播名称
    liveName: '',
    // 直播主用户ID
    check_categoryList: '',
    categoryList: {
      value: [],
      tem: [],
      show: false
    },
    expectedStartTime: '',
    // 课程所属组织
    check_groupList: '',
    groupList: {
      tem: [],
      value: [],
      show: false
    },
    // 直播封面的id
    check_coverImgId: '',
    coverImgId: {
      value: '',
      tem: '',
      showError: false
    },
    // 直播成员
    check_uid: '',
    uid: {
      value: '',
      tem: [],
      show: false
    },
    // 请填写直播介绍
    intro: '',
    // 不可见直播成员
    check_memberList: '',
    memberList: {
      value: [],
      tem: [],
      show: false
    },
    // 不可见直播成员
    check_invisibleList: '',
    invisibleList: {
      value: [],
      tem: [],
      show: false
    },
    // 课程是否上线 1->上线 0->下线
    isOnline: 1,
    // 权重
    sort: ''
  }

  // 初始化裁剪对象
  cropper = null
  // 裁剪设置
  flag = {
    imgHasLoad: false,
    cropperHasInit: false,
    btnTips: {
      disable: false,
      value: '裁剪完成，立即上传'
    }
  }

  rules = {
    liveName: [
      { required: true, message: '请输入直播名称', trigger: 'blur' }
    ],
    check_categoryList: [
      { required: true, message: '请选择直播分类', trigger: 'blur' }
    ],
    check_groupList: [
      { required: true, message: '请选择组织', trigger: 'blur' }
    ],
    check_coverImgId: [
      { required: true, message: '请上传直播封面图片', trigger: 'blur' }
    ],
    check_uid: [
      { required: true, message: '请选择导师', trigger: 'blur' }
    ],
    expectedStartTime: [
      { type: 'date', required: true, message: '请选择时间', trigger: 'blur' }
    ]
  }

  // 确认信息弹窗
  models = {
    show: false,
    title: '提示',
    showClose: true,
    confirmText: '提交',
    currentModalName: '',
    type: 'confirm'
  }

  // 社区介绍富文本编辑器
  ContentEditor = {
    content: '',
    // path: `${config.host}/admin/common/editor/uploadImg`,
    height: 350
  }

  // 默认提交表单按钮可以点击
  submitBtnClick = true
  // 默认提交按钮的文案
  submitBtnTxt = '提交'
  restaurants = []
  timeout =  null
  temMenberLists = []
  temcategoryList = []
  temTutorLists = []
  tem_groupLists = []
  // 导师名称
  ownerUidName = ''
  visible2 = false
  input = ''
  // 分类弹窗显示
  categoryModal = {
    show: false,
    name: '',
    loading: false
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-17
   * @detail   检测提交的参数
   */
  checkSubmit() {
    this.$refs['form'].validate((valid) => {
      if (valid) {
        // 给提交按钮加个loading
        this.submitBtnClick = !this.submitBtnClick
        // 修改提交时按钮的文案
        this.submitBtnTxt = '正在提交'
        const need = [
          'liveName',
          'uid',
          'categoryList',
          'groupList',
          'expectedStartTime',
          'intro',
          'isOnline',
          'coverImgId',
          'memberList',
          'invisibleList',
          'sort'
        ]
        const action = this.$route.name === 'broadcastPost' ? 'postLiveApi' : 'putLiveApi'
        const params = this.transformData(this.form, need)
        this.submit(params, action)
      }
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   获取提交参数
   * @return   {[type]}   [description]
   */
  transformData(data, params) {
    const formData = {}
    params.map(field => {
      if(typeof data[field] != 'object') {
        formData[field] = data[field]
      } else {
        formData[field] = data[field].value
      }
    })
    formData.expectedStartTime = Date.parse(new Date(this.form.expectedStartTime)) / 1000
    formData.startTime = formData.expectedStartTime
    return formData
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-17
   * @detail   提交表单数据
   */
  submit(params, action) {
    this[action](params)
      .then(res => {
        this.$message({message: res.data.msg, type: 'success'})
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
        }, 3000)
      })
      .catch(err => {
        this.$message.error(`${err.msg}~`)
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
        }, 3000)
      })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-17
   * @detail   编辑器
   */
  handleContentEditorBlur() {
    // this.$refs.form.validateField('content')
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-17
   * @detail   搜索成员
   * @return   {[type]}   [description]
   */
  handleSearch() {
    // 获取成员列表
    this.getMenberListsApi({name: this.ownerUidName})
      .then(() => {
        this.temMenberLists = [...this.menberLists]
      })
  }

  created() {
    this.initPageByPost()
    this.initPageByUpdate()
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   打开弹窗model
   */
  openModal(type) {
  	switch(type) {
  		case 'categoryList':
  			this.models.title = '选择分类'
  			break
  		case 'uid':
  			this.models.title = '选择导师'
  			break
  		case 'groupList':
  			this.models.title = '选择组织'
  			break
  		case 'memberList':
  			this.models.title = '参与直播学员'
  			break
      case 'invisibleList':
        this.models.title = '对这些人不可见'
        break
  		default:
  			break
  	}
    this.models.currentModalName = type
    this.models.width = '860px'
    this.models.minHeight = '284px'
    this.temMenberLists = [...this.menberLists]
    this.models.show = true
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   初始化新增页面数据
   * @return   {[type]}   [description]
   */
  initPageByPost() {
    if(this.$route.name !== 'broadcastPost') return
    Promise.all([
      this.getGroupListsApi(),
      this.getMenberListsApi(),
      this.getCategoryListsApi(),
      this.getTutorListApi()
    ])
    .then(() => {
      this.temMenberLists = [...this.menberLists]
      this.temcategoryList = [...this.categoryList]
      this.temTutorLists = [...this.tutorLists]
      this.tem_groupLists = [...this.groupLists]
    })
    .catch((err) => {
      this.showMsg({ content: '初始化页面失败~', type: 'error', duration: 3000 })
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   编辑时初始化页面
   * @return   {[type]}   [description]
   */
  initPageByUpdate() {
    const params = {id: this.$route.params.id}
    if(this.$route.name !== 'broadcastUpdate') return
    Promise.all(
      [
        this.getLiveDetailApi(params),
        this.getLiveMenberListApi(params),
        this.getLiveInvisibleMenberListApi(params),
        this.getGroupListsApi(),
        this.getMenberListsApi(),
        this.getCategoryListsApi(),
        this.getTutorListApi()
      ]
    )
    .then((res) => {
      const {categoryList, groupList, info, invisibleList, memberList} = this.liveDetails

      // 分类的遍历
      categoryList.map(field => {
        this.form.categoryList.tem.push(field)
        this.form.categoryList.value.push(field.categoryId)
        this.form.categoryList.show = true
      })

      // 不可见学员
      invisibleList.map(field => {
        this.form.invisibleList.tem.push(field.realname)
        this.form.invisibleList.value.push(field.uid)
        this.form.invisibleList.show = true
      })

      // 必修学员
      memberList.map(field => {
        this.form.memberList.tem.push(field.realname)
        this.form.memberList.value.push(field.uid)
        this.form.memberList.show = true
      })

      // 组织的遍历
      groupList.map(field => {
        this.form.groupList.tem.push(field)
        this.form.groupList.value.push(field.groupId)
        this.form.groupList.show = true
      })

      // 导师的遍历
      this.tutorLists.map(field => {
        if(field.uid === info.masterUid) {
          this.form.uid.value = field.uid
          this.form.uid.tem = field
          this.form.uid.show = true
          this.form.check_uid = field.uid
        }
      })

      this.form.id = info.id
      this.form.expectedStartTime = info.createdAt
      this.form.coverImgId.value = info.coverImgId
      this.form.coverImgId.tem = info.coverImgId
      this.form.check_coverImgId = info.coverImgId
      this.form.sort = info.sort
      this.form.isOnline = info.isOnline
      this.form.liveName = info.liveName
      this.form.intro = info.intro
      this.form.groupList.value = this.form.groupList.value.join(',')
      this.form.check_groupList = this.form.groupList.value
      this.form.categoryList.value = this.form.categoryList.value.join(',')
      this.form.check_categoryList = this.form.categoryList.value
      this.form.invisibleList.value = this.form.invisibleList.value.join(',')
      this.form.check_invisibleList = this.form.invisibleList.value
      this.form.memberList.value = this.form.memberList.value.join(',')
      this.form.check_memberList = this.form.memberList.value
      this.ContentEditor.content = info.intro
    })
    .catch((err) => {
      this.$message.error('初始化页面失败~');
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   弹窗确定按钮
   * @return   {[type]}   [description]
   */
  confirm() {
    const type = this.models.currentModalName
    this.form[type].show = this.form[type].value ? true : false
    this.models.show = false
    this.ownerUidName = ''
    this.form[`check_${type}`] = this.form[type].value
    this.$refs.form.validateField(`check_${type}`)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   弹窗关闭按钮
   */
  cancel() {
    const type = this.models.currentModalName
    this.form[type].value = ''
    this.form[type].tem = []
    this.models.show = false
    this.ownerUidName = ''
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   移除选中的radio对象
   * @return   {[type]}   [description]
   */
  removeSingleChecked(type) {
    this.form[type].value = ''
    this.form[type].tem = []
    this.form[type].show = false
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   移除多选
   */
  removeMultipleCheck(type, index) {
    const value = this.form[type].value.split(',').splice(index, 1)
    this.form[type].tem.splice(index, 1)
    this.form[type].value = value.join(',')
    this.form[type].show = this.form[type].tem <= 0 ? false : true
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail  刷选组员数据
   * @return   {[type]}      [description]
   */
  filterWorkZoneMenber(type, id) {
    let menberLists = [...this.menberLists]
    menberLists = menberLists.filter(field => {
      return field.selfGroup.includes(id)
    })
    this.temMenberLists = menberLists
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   导师分类
   * @return   {[type]}   [description]
   */
  tutorClassification(type, item) {
    let list = [...this.tutorLists]
    if(Object.prototype.toString.call(item) === '[object String]') {
      list = list.filter(field => {
        return !field.group
      })
    } else {
      list = list.filter(field => {
        return field.group && field.selfGroup.includes(item.groupId)
      })
    }
    this.temTutorLists = list
  }


  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   选择分类
   * @return   {[type]}   [description]
   */
  selectCategory(item, key) {
    this.updateCategoryListsApi({categoryId: item.categoryId})
    const data = { show: false, tem: [], value: [] }
    this[key].map((field) => {
      if(field.active) {
        data.tem.push(field)
        data.value.push(field.categoryId)
      }
    })
    data.value = data.value.join(',')
    this.form.categoryList = data
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   选择直播组织
   * @return   {[type]}   [description]
   */
  seleteGroup(item, key) {
    this.updateGroupListsApi({groupId: item.groupId})
    const data = { show: false, tem: [], value: [] }
    this[key].map((field) => {
      if(field.active) {
        data.tem.push(field)
        data.value.push(field.groupId)
      }
    })
    data.value = data.value.join(',')
    this.form.groupList = data
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   单选
   */
  singleSelection(type, item) {
    this.form[type].tem = item
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   多选
   */
  multipleSelection(type, item) {
    const menberLists = [...this.menberLists]
    const value = []
    menberLists.map(field => {
      if(this.form[type].tem.includes(field.realname)) {
        value.push(field.uid)
      }
    })

    this.form[type].value = value.join(',')
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   成员分类
   * @return   {[type]}   [description]
   */
  memberClassification(type, groupId) {
    const tem = []
    const value = []
    const data = {
      tem: [],
      value: []
    }
    let menberLists = [...this.menberLists]
    menberLists.map(field => {
      if(field.selfGroup.includes(groupId)) {
        data.tem.push(field.realname)
        data.value.push(field.uid)
      }
    })
    if(groupId === 'all') {
      menberLists.map(field => {
        data.tem.push(field.realname)
        data.value.push(field.uid)
      })
    }
    data.value = data.value.join(',')
    this.form[type] = data
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   添加分类
   * @return   {[type]}   [description]
   */
  getCategory() {
    this.categoryModal.loading = true
    this.getCategoryApi({name: this.categoryModal.name})
        .then(() => {
          this.getCategoryListsApi()
              .then(() => {
                this.categoryModal.loading = false
                this.categoryModal.show = false
                this.temcategoryList = [...this.categoryList]
              })
        })
        .catch(err => {
          this.categoryModal.loading = false
          this.categoryModal.show = false
          this.showMsg({ content: `${err.msg}~`, type: 'error', duration: 3000 })
        })
  }
  /**
   * 用户点击头像
   */
  onSelectFile() {
    const el = this.$refs.hiddenFile
    if (!el) return
    el.click()
    el.value = ''
  }

  /**
   * 用户选择好文件了
   * @param  {Event} e  文件改变事件
   */
  onFileChange(e) {
    const files = e.target.files
    const len = files.length
    const fileName = files[0].name
    const ext = this.getFileExt(fileName)
    this.flag.file = files[0]

    // 允许上传文件尺寸上限 1M
    const ALLOW_MAX_SIZE = 1024 * 1024

    // 允许文件格式 jpg\png
    const ALLOW_FILE_TYPE = [
      'png',
      'jpeg',
      'jpg'
    ]

    // 文件数量一定要判断
    if (len > 0) {
      const file = files.item(0)
      if (ALLOW_FILE_TYPE.indexOf(ext) === -1) {
        this.showMsg({ content: '选择的文件格式不对~', type: 'error', duration: 3000 })
      } else if (file.size > ALLOW_MAX_SIZE) {
        this.showMsg({ content: '选择的文件太大啦~', type: 'error', duration: 3000 })
      } else {
        let inputImage = document.querySelector('#uplaod-file')
        let URL = window.URL || window.webkitURL
        let blobURL
        blobURL = URL.createObjectURL(file)
        this.flag.imgHasLoad = true

        if (!this.flag.cropperHasInit) {
          this.loadCropper()
          this.cropper.replace(blobURL)
          return
        }
        this.cropper.reset().replace(blobURL)
        inputImage.value = null
      }
    }
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   加载裁剪工具
   * @return   {[type]}   [description]
   */
  loadCropper() {
    const image = document.querySelector('#cropperBox > img')
    // const preview = document.querySelector('#cropperRes')
    // const previewImage = preview.getElementsByTagName('img').item(0)
    const options = {
      aspectRatio: 1 / 1,
      preview: '#cropperRes'
    }
    this.cropper = new Cropper(image, options)
    this.flag.cropperHasInit = true
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   完成裁剪，并输出裁剪结果，然后上传
   * @return   {[type]}   [description]
   */
  finishCropImage() {
    this.flag.btnTips.value = '正在上传，请稍等'
    this.flag.btnTips.disable = true
    const croppedCanvas = this.cropper.getCroppedCanvas()
    const croppedDataUrl = croppedCanvas.toDataURL()
    const blob = this.dataURLtoFile(croppedDataUrl)
    const formData = new FormData()
    formData.append('attach_type', 'img')
    formData.append('img1', blob)
    this.uploadApi(formData)
      .then((res) => {
        const infos = res.data.data[0]
        this.cropper.destroy()
        this.flag.imgHasLoad = false
        this.flag.imgHasLoad = false
        this.flag.btnTips.value = '裁剪完成，立即上传'
        this.flag.btnTips.disable = false
        this.form.coverImgId.value = infos.id
        this.form.coverImgId.tem = infos.url
        this.form.check_coverImgId = infos.id
        this.$refs.form.validateField('check_coverImgId')
      })
      .catch(err => {
        this.showMsg({ content: `${err.msg}~`, type: 'error', duration: 3000 })
      })
  }

  // dataUrl 转 blob
  dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-13
   * @detail   将base64转换成file对象
   * @return   {[type]}            [description]
   */
  dataURLtoFile (dataurl, filename = 'file') {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let suffix = mime.split('/')[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, {type: mime})
  }

  // 获取文件后缀名
  getFileExt(filename) {
    const tem = filename.split('.')
    return tem[tem.length-1]
  }
}