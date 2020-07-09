<template>
  <div class="questionNaire" v-if="JSON.stringify(all) !== '{}'">
    <div class="title">{{ all.examInfo.title }}</div>
    <div class="line"></div>
    <p class="score">{{ '用户姓名：' + personalInfoBase.realname + '&nbsp;&nbsp;&nbsp;&nbsp;' }}用户分数：{{ all.examUserScore }}</p>
    <div class="questionNaire-main">
      <div class="questionNaire-main-list" v-for="(item, index) in all.examQuestionUserAnswer" :key="index">
        <div class="question">{{index+1 + '、' + item.title}}</div>
        <el-radio-group :disabled="disabled" v-model="userAnswer[index]">
          <el-radio v-for="(item1, index1) in item.item" :key="index1" :label="item1.option">{{ item1.option + '、' + item1.text }}</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import { getQuestionInfosApi } from 'STORE/api/user.js'
export default {
  computed: {
    ...mapGetters([
      'personalInfoBase',
    ])
  },
  data () {
    return {
      all: {},
      userAnswer: [],
      disabled: false // 第一次进问卷是否禁用
    }
  },
  created () {
    const course_id = this.$route.query.id
    getQuestionInfosApi({ 'course_id': course_id }).then(res => {
      this.all = res.data.data
      res.data.data.examQuestionUserAnswer.forEach((item, index) => {
        if (item.userAnswer.itemSelect !== '') {
          this.disabled = true
        }
        this.userAnswer.push(item.userAnswer.itemSelect)
      })
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.questionNaire{
  background: white;
  .title{
    text-align: center;
    font-size: 22px;
    margin-top: 25px;
    position: relative;
    box-sizing: border-box;
  }
  .line{
    width: 780px;
    height: 1px;
    background: #999;
    margin: 25px auto 0 auto;
  }
  .score{
    margin: 0 auto;
    font-size: 16px;
    width: 780px;
    text-align: right;
    padding-right: 15px;
  }
  .questionNaire-main{
    width: 780px;
    margin: 0 auto;
  }
  .question{
    font-size: 18px;
    color: #333;
    margin: 15px 0;
  }
}
</style>
