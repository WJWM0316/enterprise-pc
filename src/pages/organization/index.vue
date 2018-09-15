<template>
  <div id="organization">
  	<div class="page-position">组织管理</div>
  	<el-row class="organization-base">
		  <el-col :span="12" class="left-content">
		  	<h1>老虎科技有限公司</h1>
  			<span class="number">（130人）</span>
		  </el-col>
		  <el-col :span="12" class="right-content">
		  	<el-button type="primary" class="click-item">添加新成员</el-button>
		  	<el-button type="primary" class="click-item">设置分组</el-button>
		  </el-col>
		</el-row>
		<div class="group-type-list">
			<el-button
        size="large"
        v-for="(groupItem, groupIndex) in groupList"
        :key="groupIndex">
          {{groupItem.text}}
      </el-button>
		</div>
		<div class="dropdown-select">
			<el-select v-model="value" placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		</div>
		<table-list
    :list="courseList"
    :fields="fields"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'"></div>
        <!-- 其他列按后端给回的字段显示 -->
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>
    </table-list>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'

@Component({
	components: {
    TableList
  }
})
export default class pageOrganization extends Vue {
	groupList = [
		{
			id: 1,
			text: '所有人'
		},
		{
			id: 2,
			text: '运营组'
		},
		{
			id: 3,
			text: '技术组'
		},
		{
			id: 4,
			text: '产品组'
		},
		{
			id: 5,
			text: '开发组'
		},
		{
			id: 6,
			text: '人力资源组'
		},
		{
			id: 7,
			text: '广告组'
		},
		{
			id: 8,
			text: '商务BD组'
		},
		{
			id: 9,
			text: '设计组'
		},
		{
			id: 10,
			text: '营销组'
		}		
	]
	options = [
		{
			value: '选项1',
      label: '黄金糕'
		}
	]
	value = ''
	// 表单数据
  courseList = []
   // 表格字段
  fields = [
  	{
      prop: 'menber',
      label: '成员',
      align: 'center'
    },
  	{
      prop: 'organization',
      label: '所属组织',
      align: 'center'
    },
    {
      prop: 'degree',
      label: '职位',
      align: 'center'
    },
    {
      prop: 'auth',
      label: '权限',
      align: 'center',
      showTips: 'no'
    },
    {
      prop: 'phone',
      label: '手机号码',
      align: 'center',
      showTips: 'no'
    },
    {
      prop: 'email',
      label: '邮箱',
      align: 'center',
      showTips: 'no'
    },
    {
      prop: 'weixin',
      label: '微信',
      showTips: 'no'
    }
  ]
	created() {
    for (let i = 0; i < 5; i++) {
      this.courseList.push({
        menber: '大众',
        organization: '开发组',
        degree: '技术员',
        auth: '超级管理员',
        phone: '15999972494',
        email: '550083126@qq.com',
        weixin: '15999972494'
      })
    }
  }
}
</script>
<style lang="scss">
#organization {
	background: #fff;
	.organization-base {
		line-height: 35px;
		margin-bottom: 25px;
		h1{
			margin: 0;
			padding: 0;
			float: left;
			line-height: 40px;
			vertical-align: middle;
			font-size:30px;
			font-weight:500;
			color:rgba(53,64,72,1);
		}
		.number {
			font-size:16px;
			font-weight:400;
			color:rgba(146,146,146,1);
			margin-left: 10px;
			vertical-align: -webkit-baseline-middle;
		}
		.left-content {
			text-align: left;
		}
		.right-content {
			text-align: right;
		}
		.click-item {
			color:rgba(53,64,72,1);
		}
	}
	.group-type-list {
		.el-button{
			width: 128px;
			padding: 10px 20px;
			margin: 0px 16px 16px 0px;
		}
	}
	.dropdown-select {
		margin: 24px 0 16px 0;
	}
}
</style>