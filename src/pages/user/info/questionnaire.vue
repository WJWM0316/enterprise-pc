<template>
  <div class="questionNaire" v-if="JSON.stringify(all) !== '{}'">
    <div class="title">{{ all.examInfo.title }}</div>
    <div class="line"></div>
    <p class="score">{{ '用户姓名：' + personalInfoBase.realname + '&nbsp;&nbsp;&nbsp;&nbsp;' + '用户分数：' + all.examUserScore }}</p>
    <div class="questionNaire-main">
      <div class="questionNaire-main-list" v-for="(item, index) in all.examQuestionUserAnswer" :key="index">
        <div class="question">{{index+1 + '、' + item.title}} ( {{'分值: ' + item.score + ', 正确答案：' + item.itemCorrect}} )</div>
        <el-checkbox-group v-model="userAnswer[index]">
          <el-checkbox v-for="(item1, index1) in item.item" :label="item1.option" :key="index1" :class="!isAnswer[index] && item1.option === item.userAnswer.itemSelect ? 'questionNaire-activitie' : null">{{ item1.option + '、' + item1.text }}</el-checkbox>
        </el-checkbox-group>
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
      isAnswer: [] // 答案是否正确
    }
  },
  created () {
    const course_id = this.$route.query.id
    const userid = this.$route.query.uid
    getQuestionInfosApi({ 'course_id': course_id, 'userid': userid }).then(res => {
      this.all = res.data.data
      res.data.data.examQuestionUserAnswer.forEach((item, index) => {
        
        if (item.userAnswer.itemSelect === item.itemCorrect) {
          this.isAnswer.push(true)
          this.userAnswer.push([ item.userAnswer.itemSelect, item.itemCorrect ])
        } else {
          this.isAnswer.push(false)
          this.userAnswer.push([ item.userAnswer.itemSelect ])
        }
      })
    })
  },
  methods: {}
}
</script>

<style lang="scss">
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

.el-checkbox{
  margin: 10px 30px 10px 0 !important;
}

.is-checked{
  .el-checkbox__inner{
    background-color: green !important;
    border: green !important;
  }
  .el-checkbox__label{
    color: green !important;
  }
}
.questionNaire-activitie{
  .el-checkbox__inner{
    background-color: red !important;
    border: red !important;
  }
  .el-checkbox__label{
    color: red !important;
  }
}
</style>
