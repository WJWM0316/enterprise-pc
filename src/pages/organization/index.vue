<template>
  <div id="organization">
  	<div class="page-position">组织管理</div>
	<div class="group-type-list">
		<el-button
	        size="large"
	        v-for="(groupItem, groupIndex) in groupList"
	        :key="groupIndex">
	          {{groupItem.groupName}}
      	</el-button>
     	<el-row class="organization-base " style="margin-top: 14px">
	       <el-col :span="12" class="left-content">
	       	<el-button type="primary" class="click-item" @click="todoAction('set')">设置分组</el-button>
	       </el-col>
     	</el-row>

     	<div class="border"></div>
	</div>

	<el-row class="organization-base">
   		<el-col :span="12" class="left-content">
   			<h2 class="">
   				全部成员
   				<span class="number">（{{courseList.length}}人）</span>
   			</h2>
   		</el-col>
   		<el-col :span="12" class="right-content">
   			<el-button type="primary" class="click-item" @click="todoAction('add')">添加新成员</el-button>
   		</el-col>
	</el-row>
	

	
	<div class="dropdown-select">
		<el-select v-model="value" placeholder="选择权限">
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
      	<div class="btn-container" v-if="props.scope.column.property === 'groupName'">
      		<img :src="props.scope.row.avatar.smallUrl">
      		{{props.scope.row.realname}}
      		<!-- {{props.scope.column.group[0].groupName}} -->
      	</div>

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
import { getMemberListApi, getGroupListApi } from '@/store/api/organization.js'

@Component({
	components: {
    	TableList
  	},
  	watch: {
  	  groupList (val) {},
  	},
})
export default class pageOrganization extends Vue {
	groupList = [	
		{
			groupId: 10, 
			groupName: "所有人", 
			sort: 10, 
			count: 10
		}
	]
	options = [
		{
			value: '1',
  			label: '超级管理员'
		},
		{
			value: '2',
  			label: '后台管理员'
		},
		{
			value: '3',
  			label: '内容管理员'
		}
	]
	value = ''
	// 表单数据
  	courseList = [

  	]
   	// 表格字段
	fields = [
		{
			prop: 'groupName',
			label: '成员',
			align: 'center'
		},
		{
			prop: 'rolename',
			label: '职位',
			align: 'center'
		},
		{
		  prop: 'roleId',
		  label: '权限',
		  align: 'center',
		  showTips: 'no'
		},
		{
		  prop: 'mobile',
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
		  prop: 'wechat',
		  label: '微信',
		  showTips: 'no'
		}
	]

	created() {
	    this.getMsgList()
  	}

  	getMsgList() {
  		getMemberListApi().then( res => {
  			this.courseList = res.data.data
  		})

  		getGroupListApi().then( res => {
  			// console.log(res.data.data)
  			this.groupList = [...this.groupList,...res.data.data]
  		})
  	}

  	// 添加课程-跳转
  	addWorkZone() {
  	  	this.$router.push({ name: 'addMember'})
  	}

  	todoAction(type) {
  		console.log(type)
		switch(type) {
			case 'set':
				console.log(1)
			  this.$router.push({
			    name: 'groupManage'
			  })
			  break
			case 'add':
				console.log(1)
			    this.$router.push({
			      name: 'addMember'
			    })
			  break
			default:
			  break
		}
  	}
}
</script>
<style lang="scss">
.page-position {
	margin-bottom: 32px;
}
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
		h2 {
			margin: 0;
			line-height: 40px;
		}
		.number {
			font-size:16px;
			font-weight:400;
			color:rgba(146,146,146,1);
			margin-left: 10px;
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
		.border {
			width:100%;
			height:3px;
			border-bottom:1px dashed rgba(235,238,245,1);
			margin-bottom: 30px;
		}
	}
	.dropdown-select {
		margin: 24px 0 16px 0;
	}
}
</style>