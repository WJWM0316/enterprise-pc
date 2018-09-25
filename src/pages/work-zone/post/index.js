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
      'getJobCircleMemberListsApi',
      'postJobCircleApi',
      'putJobCircleApi',
      'showMsg',
      'getGroupListsApi',
      'getMenberListsApi',
      'postUploadConfigApi',
      'uploadApi',
      'getJobCircleDetailsApi',
      'getJobCircleHitListsApi',
      'getJobCircleOrganizationListsApi',
      'updateGroupListsApi'
    ])
  },
  computed: {
    ...mapGetters([
      'groupLists',
      'jobCircleMemberLists',
      'menberLists',
      'uploadConfig',
      'jobCircleDetails',
      'jobCircleOrganizationLists',
      'jobCircleHitLists'
    ])
  }
})
export default class WorkZonePost extends Vue {

  form = {
    // 工作圈名
    name: '',
    // 工作圈主用户ID
    check_owner_uid: '',
    owner_uid: {
      value: '',
      tem: {},
      show: false
    },
    // 课程所属组织
    check_organizations: '',
    organizations: {
      tem: [],
      value: '',
      show: false
    },
    // 工作圈封面的id
    check_cover_img_id: '',
    cover_img_id: {
      value: '',
      tem: '',
      showError: false
    },
    // 工作圈成员
    check_members: '',
    members: {
      value: '',
      tem: [],
      show: false
    },
    // 请填写工作圈介绍
    content: '',
    // 不可见工作圈成员
    check_hits: '',
    hits: {
      value: '',
      tem: [],
      show: false
    },
    // 课程是否上线 1->上线 0->下线
    status: 1,
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
    name: [
      { required: true, message: '请输入工作圈名称', trigger: 'blur' }
    ],
    check_owner_uid: [
      { required: true, message: '请选择工作圈主用户ID', trigger: 'blur' }
    ],
    check_organizations: [
      { required: true, message: '请选择组织', trigger: 'blur' }
    ],
    check_cover_img_id: [
      { required: true, message: '请上传工作圈封面图片', trigger: 'blur' }
    ],
    check_members: [
      { required: true, message: '请选择工作圈成员ID', trigger: 'blur' }
    ],
    content: [
      { required: true, message: '请填写社区介绍', trigger: 'click', validator: editorRules.validator }
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
  tem_groupLists = []
  // 导师名称
  ownerUidName = ''

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
        const need = ['name', 'owner_uid', 'organizations', 'cover_img_id', 'members', 'content', 'hits', 'status', 'sort', 'id']
        const action = this.$route.name === 'workZonePost' ? 'postJobCircleApi' : 'putJobCircleApi'
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
        this.$message.error(`${err.msg}~`);
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
    this.$refs.form.validateField('content')
  }

  loadAll() {
    return [
      { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' }
    ]
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
    this.restaurants = this.loadAll()
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
  		case 'owner_uid':
  			this.models.title = '选择工作圈圈主'
  			break
  		case 'members':
  			this.models.title = '选择工作圈成员'
  			break
  		case 'organizations':
  			this.models.title = '选择组织'
  			break
  		case 'hits':
  			this.models.title = '选择不可见成员'
  			break
  		default:
  			break
  	}
    this.models.currentModalName = type
    this.models.width = '860px'
    this.models.minHeight = '284px'
     // 获取成员列表
    this.getMenberListsApi()
      .then(() => {
        this.temMenberLists = [...this.menberLists]
        this.models.show = true
      })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   初始化新增页面数据
   * @return   {[type]}   [description]
   */
  initPageByPost() {
    if(this.$route.name !== 'workZonePost') return
    // 获取组列表
    this.getGroupListsApi()
    // 获取成员列表
    this.getMenberListsApi()
      .then(() => {
        this.temMenberLists = [...this.menberLists]
        this.tem_groupLists = [...this.groupLists]
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
    if(this.$route.name !== 'workZoneUpdate') return
    Promise.all(
      [
        this.getJobCircleDetailsApi(params),
        this.getJobCircleHitListsApi(params),
        this.getJobCircleOrganizationListsApi(params),
        this.getGroupListsApi(),
        this.getMenberListsApi(),
        this.getJobCircleMemberListsApi(params)
      ]
    )
    .then((res) => {
      const jobCircleDetails = {...this.jobCircleDetails}
      this.tem_groupLists = [...this.groupLists]
      this.form.name = jobCircleDetails.name
      this.form.content = jobCircleDetails.content
      this.ContentEditor.content = jobCircleDetails.content
      this.form.sort = jobCircleDetails.sort
      this.form.status = jobCircleDetails.status === '上线' ? 1 : 0
      this.form.owner_uid.value = jobCircleDetails.ownerUid
      this.form.cover_img_id.value = jobCircleDetails.coverImgId
      this.form.cover_img_id.tem = jobCircleDetails.coverImg.smallUrl
      this.form.id = jobCircleDetails.id
      this.form.check_cover_img_id = jobCircleDetails.coverImgId
      console.log(this.form)

      // 成员列表的遍历
      this.menberLists.map(field => {
        // 导师的筛选
        if(field.uid === jobCircleDetails.ownerUid) {
          this.form.owner_uid.tem = field
          this.form.owner_uid.show = true
          this.form.check_owner_uid = field.uid
        }
        // 工作圈成员
        if(this.jobCircleMemberLists.includes(field.uid)) {
          this.form.members.value += '' + field.uid
          this.form.members.tem.push(field.realname)
          this.form.members.show = true
          this.form.check_members += '' + field.uid
        }
        // 不可见学员
        if(this.jobCircleHitLists.includes(field.uid)) {
          this.form.hits.value += '' + field.uid
          this.form.hits.tem.push(field.realname)
          this.form.hits.show = true
        }
      })

      // 组织的遍历
      this.groupLists.map(field => {
        // 工作圈组织
        if(this.jobCircleOrganizationLists.includes(field.groupId)) {
          this.form.organizations.value += '' + field.groupId
          this.form.organizations.tem.push(field.groupName)
          this.form.organizations.show = true
          this.form.check_organizations += '' + field.groupId
        }
      })
    })
    .catch((err) => {
      this.showMsg({ content: '初始化页面失败~', type: 'error', duration: 3000 })
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
    console.log(this.form[type])
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
  filterWorkZoneMenber(item) {
    let menberLists = [...this.menberLists]
    menberLists = menberLists.filter(field => {
      return field.selfGroup.includes(item.groupId)
    })
    this.temMenberLists = menberLists
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
   * @detail   选择课程组织
   * @return   {[type]}   [description]
   */
  seleteGroup(item, key) {
    this.updateGroupListsApi({groupId: item.groupId})
    const data = { show: false, tem: [], value: [] }
    this[key].map((field) => {
      if(field.active) {
        data.tem.push(field.groupName)
        data.value.push(field.groupId)
      }
    })
    data.value = data.value.join(',')
    this.form.organizations = data
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
    const menberLists = [...this.menberLists]
    menberLists.map(field => {
      if(field.selfGroup.includes(groupId)) {
        tem.push(field.realname)
        value.push(field.uid)
      }
    })
    if(groupId === 'all') {
      menberLists.map(field => {
        tem.push(field.realname)
        value.push(field.uid)
      })
    }
    this.form[type] = {
      value: value.join(','),
      tem: tem
    }
  }

  // 添加课程分类
  addCourseType() {
    const courseTypeList = this.courseTypeList
    const bool = courseTypeList.some(field => {
      return field.label  === this.courseType
    })
    if(bool) {
      this.showMsg({ content: '请不要重复添加~', type: 'error', duration: 3000 })
    }
    // this.showCreateCourseTypeBox = !this.showCreateCourseTypeBox
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
        this.form.cover_img_id.value = infos.id
        this.form.cover_img_id.tem = infos.url
        this.form.check_cover_img_id = infos.id
        this.$refs.form.validateField('check_cover_img_id')
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