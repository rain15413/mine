<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				<!-- {{collapsed?'':sysName}} -->
				<template v-if="!collapsed">
					<img class="imgA" src="../../static/img/rain.png" alt="">
					{{sysName}}
				</template>
				<template v-else>
					<img class="imgB" src="../../static/img/rain.png" alt="">
				</template>
			</el-col>
			<el-col :span="3">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="11" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<img :src="this.sysUserAvatar" /> 
						{{sysUserName}}
						</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside class="el-aside" :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!-- 导航-正常 -->
				<!-- 在<el-menu>中需要--:default-active="this.$route.path"。用来绑定路由表
				在<el-menu>中需要--router------或者router=true
				在<el-submenu>中的index不可缺少，为必须值，不过此处的index仅为索引，用来让当前元素下的子菜单收缩或释放。每一个submenu的index值只要不一样便可
				在<el-menu-item>中，index的值不可缺少，就是用这个来进行路由跳转，index的值为跳转的路径 -->
				<!-- default-openeds 默认展开项,:defaultOpeneds=['...'] 属性内容和下面的 <el-submenu index="..."> 里面的index内容是关联的，两个属性内容是一样的就可以关联了 -->
				<el-menu :default-openeds=openeds :default-active="$route.path" router 
					class="el-menu-vertical-demo" background-color="#f2f2f2" text-color="#000"
					@open="handleopen" @close="handleclose" @select="handleselect"
					unique-opened v-show="!collapsed">
					<template v-for="(item,index) in menuList">
						<el-submenu :index="index+''" v-if="!item.leaf" :key="index">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<template v-for="child in item.children">
								<el-menu-item :index="child.path" :key="child.name">
									{{child.name}}
								</el-menu-item>
							</template>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="item.children[0].name">
							<template slot="title"><i :class="item.iconCls"></i>{{item.children[0].name}}</template>
						</el-menu-item>	
					</template>
				</el-menu>
				<!-- 导航-折叠 -->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in menuList" class="el-submenu item" :key="item.name">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" :key="child.name" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<el-header class="headTop">
					<!-- 顶部标签栏 -->
					<head-top></head-top>
				</el-header>
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<!-- 面包屑 -->
						<!-- <el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.name">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb> -->
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	import HeadTop from './HeadTop'
	export default {
		components:{
			HeadTop
		},
		data() {
			return {
				sysName:'VUEADMIN',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				menuList: [],
				openeds: ['0'],
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
			this.getMenu(this.$router.options.routes)
			// console.log(this.$router.options.routes)
			// console.log(this.$route.matched)
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				// console.log('handleopen');
			},
			handleclose() {
				// console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			goUrl (path) {
				this.$router.push(path)
			},
			getMenu (obj) {
				// console.log(obj)
				var arr=[]
				for(let i=0;i<obj.length;i++){
					if(!obj[i].hide){
						var brr=obj[i].children.filter(item=>{
							return !item.hide
						})
						// console.log(brr)
						obj[i].children=brr
						arr.push(obj[i])
					}
				}
				// console.log(arr)
				this.menuList=arr
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					this.$store.commit('CLEAR_TAG')
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.el-aside{
		overflow-y: scroll;
		overflow-x: hidden;
		background-color: rgb(238, 241, 246);
	}
	.el-main{
		overflow: auto;
		// transition: all .2s ease;
		background-color: rgb(238, 241, 246);
		// border-right: 1px solid #f2f2f2;
	}
	// ::-webkit-scrollbar-track-piece {
	// 	background-color: transparent;
	// }
	// ::-webkit-scrollbar {
	// 	width: 7px;
	// 	height: 7px;
	// 	background-color: transparent;
	// }
	// ::-webkit-scrollbar-thumb {
	// 	border-radius: 5px;
	// 	background-color: hsla(220, 4%, 58%, .3);
	// }
	// ::-ms-scrollbar-track-piece {
	// 	background-color: transparent;
	// }
	// ::-ms-scrollbar {
	// 	width: 7px;
	// 	height: 7px;
	// 	background-color: transparent;
	// }
	// ::-ms-scrollbar-thumb {
	// 	border-radius: 5px;
	// 	background-color: hsla(220, 4%, 58%, .3);
	// }

	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			// background: $color-primary;
			background: #075690;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				text-align: center;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				position: relative;

				display: inline-block;
                vertical-align: middle;
				.imgA {
					vertical-align: middle;
					width: 40px;
					
					// top: 0;
					// right: 0;
					// bottom:0;
					// left:0;
					// margin: auto;
					// // float: left;
					// // margin: 10px 10px 10px 18px;
				}
				.imgB {
					position: absolute;
					width: 40px;
					top: 0;
					right: 0;
					bottom:0;
					left:0;
					margin: auto;
					// float: left;
					// margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
	
				/*以下打补丁的方式解决左侧菜单宽度显示不全*/
				.el-menu { 
					width: 100% !important;
				}
				.el-submenu .el-menu-item {
					min-width: 0px !important;
				}
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				// overflow: auto;
				padding: 10px;
				.headTop{
					background-color: #ffffff;
					height: 35px !important;
					padding: 0;
					margin-bottom: 10px;
				}
				.grid-content{
					width: 100%;
					height: 100%;
					overflow: auto;
					margin-top: 2px;
				}
				.breadcrumb-container {
					// border-bottom: 2px solid #f2f2f2;
					//margin-bottom: 15px;
					.title {
						height: 30px;
						line-height: 30px;
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>