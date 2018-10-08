<template>
  <section class="help-asider">
  	<ul>
			<li
				class="zike-collapse-box"
				v-for="(navParentItem, navParentIndex) in navigation"
				:key="navParentItem.id">
					<div
						class="zike-collapse-parant-item" 
						@click="onTabClick(navParentIndex)">
							{{navParentItem.name}}
							<i class="el-icon-arrow-down" :class="{rotate: navParentItem.active}"></i>
					</div>
					<dl
						class="zike-collapse-children"
						:class="{'zike-collapse-children-show': navParentItem.active}">
					  	<dd
					  		class="zike-collapse-child-item"
					  		v-for="navChildItem in navParentItem.children"
					  		:key="navChildItem.id">
					  			{{navChildItem.name}}
					  	</dd>
					</dl>
			</li>
  	</ul>
  </section>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class ComponentAsider extends Vue {
	navigation = [
		{
			id: '1',
			name: '管理员端如何新建课程？',
			active: false,
			children: [
				{
					id: '1-1',
					name: '管理员端如何新建课程？',
					active: false,
				},
				{
					id: '1-2',
					name: '管理员端如何新建课程？',
					active: false,
				},
				{
					id: '1-3',
					name: '管理员端如何新建课程？',
					active: false,
				}
			]
		},
		{
			id: '2',
			name: '管理员端如何新建课程？',
			active: false,
			children: [
				{
					id: '2-1',
					name: '管理员端如何新建课程？',
					active: false,
				},
				{
					id: '2-2',
					name: '管理员端如何新建课程？',
					active: false,
				},
				{
					id: '2-3',
					name: '管理员端如何新建课程？',
					active: false,
				}
			]
		},
		{
			id: '3',
			name: '管理员端如何新建课程？',
			active: false,
			children: [
				{
					id: '3-1',
					name: '管理员端如何新建课程？',
					active: false,
				},
				{
					id: '3-2',
					name: '管理员端如何新建课程？',
					active: false,
				},
				{
					id: '3-3',
					name: '管理员端如何新建课程？',
					active: false,
				}
			]
		}
	]
	onTabClick(index) {
		this.navigation.map((field, i) => {
			if(i === index) {
				field.active = !field.active
			}
		})
	}
}
</script>
<style lang="scss">
.help-asider {
	width: 250px;
	border-right: 1px solid #EBEEF5;
	> ul {
		padding-top: 50px;
	}
	.zike-collapse-box {
		line-height: 56px;
		position: relative;
		cursor: pointer;
	}
	.zike-collapse-box-active {
		line-height: 56px;
		position: relative;
	}
	.zike-collapse-parant-item {
		margin: 0;
		padding-left: 30px;
		font-size:14px;
		font-weight:500;
		color:#354048;
		position: relative;
		.el-icon-arrow-down {
			position: absolute;
			top: 50%;
			right: 20px;
			transform: translateY(-50%) rotate(0deg);
			transition: all ease .4s;
		}
		.rotate {
			position: absolute;
			top: 50%;
			right: 20px;
			transform: translateY(-50%) rotate(180deg);
			transition: all ease .4s;
		}
	}
	.zike-collapse-children {
		margin: 0;
		max-height: 0;
		overflow: hidden;
		transition: all ease .4s;
		will-change: max-height;
	}
	.zike-collapse-children-show {
		max-height: 300px;
	}
	.zike-collapse-child-item {
		height:56px;
		line-height: 56px;
		position: relative;
		overflow: hidden;
		margin: 0;
		padding-left: 50px;
		font-size:14px;
		font-weight:400;
		color:#666666;
		cursor: pointer;
		transition: all ease .4s;
		&:after {
      width: 0;
      height: 0;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent transparent #FFE266;
      display: block;
      content: '';
      opcity: 0;
      visibility: hidden;
      transition: all ease .4s;
    }
    &:before {
      background: #FFE266;
      content: '';
      display: block;
      left: 0;
      position: absolute;
      height: 100%;
      width:4px;
			opcity: 0;
      visibility: hidden;
      transition: all ease .4s;
    }
    &:hover{
			background: rgba(255,226,102,0.12);
			&:after {
	      opcity: 1;
	      visibility: visible;
	    }
	    &:before {
	      opcity: 1;
	      visibility: visible;
	    }
    };
	}
	.zike-collapse-child-active {
		.zike-collapse-children {
			height: 100%;
		}
		background: rgba(255,226,102,0.12);
		&:after {
      opcity: 1;
      visibility: visible;
    }
    &:before {
      opcity: 1;
      visibility: visible;
    }
	}
}
</style>