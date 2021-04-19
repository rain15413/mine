<template>
	<section>
		<!-- <head-top></head-top> -->
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @submit.native.prevent>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="exportExcel">导出到excel</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="alertBox">alert</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		
		<myConfirm ref="myConfirm" @userBehavior="userBehaviorFun"></myConfirm>
		<!-- <my-confirm ref="myConfirm"></my-confirm> -->

		<!--列表 前端显示用-->
		<el-table :data="users" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column> -->
			<el-table-column type="index" label="序号" width="80">
				<template slot-scope="scope"><span>{{ (scope.$index + 1) + (page - 1) * pageSize }} </span></template>
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="100" sortable>
			</el-table-column>
			<!-- formatter 格式化内容 -->
			<el-table-column prop="sex" label="性别" width="100" sortable>
			<!-- <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable> -->
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100" sortable>
			</el-table-column>
			<el-table-column prop="birth" label="生日" width="120" sortable>
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
					<el-button size="small" @click="dealEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 列表 导出到excel用 -->
		<el-table style="width: 100%;display: none;" id="tableExport" :data="userExport" border highlight-current-row v-loading="listLoading" @selection-change="selsChange">
			<el-table-column prop="name" label="姓名" width="100" sortable>
			</el-table-column>
			<!-- formatter 格式化内容 -->
			<el-table-column prop="sex" label="性别" width="100" sortable>
			<!-- <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable> -->
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100" sortable>
			</el-table-column>
			<el-table-column prop="birth" label="生日" width="120" sortable>
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" sortable>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<!-- @dealEdit="dealEdit"传给子组件的方法并监听 -->
		<!-- @getNew="getNew"传给子组件的方法并监听 -->
		<!-- :dialogVisible='editFormVisible' 传值给子组件 -->
		<edit-table
			@dealEdit="dealEdit"  
			@getNew="getNew"
			:dialogVisible='editFormVisible'>
		</edit-table>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	import EditTable from './EditTable'
	import myConfirm from '@/components/myConfirm'
	import FileSaver from 'file-saver'
	import XLSX from 'xlsx'
	export default {
		components:{
			EditTable,
			myConfirm
		},
		data() {
			return {
				showTable: false,
				filters: {
					name: ''
				},
				users: [],
				userExport: [],
				total: 0,
				page: 1,
				pageSize: 10,
				listLoading: false,
				sels: [],//列表选中列
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				rowId: '',
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
			exportExcel() {
				// 设置当前日期
				let time = new Date();
				let year = time.getFullYear();
				let month = time.getMonth() + 1;
				let day = time.getDate();
				let name = year + "" + month + "" + day;
				// console.log(name)
				/* generate workbook object from table */
				//  .table要导出的是哪一个表格
				var wb = XLSX.utils.table_to_book(document.querySelector("#tableExport"));
				/* get binary string as output */
				var wbout = XLSX.write(wb, {
					bookType: "xlsx",
					bookSST: true,
					type: "array"
				});
				try {
					//  name+'.xlsx'表示导出的excel表格名字
					FileSaver.saveAs(
					new Blob([wbout], { type: "application/octet-stream" }),
					name + ".xlsx"
					);
				} catch (e) {
					if (typeof console !== "undefined") console.log(e, wbout);
				}
				return wbout;
			},
			alertBox () {
				// this.$refs.myConfirm.show('content', 'configObj')
				this.$refs.myConfirm.show('弹窗测试！', {
					type: 'confirm',
					cancelText: '取消',
					confirmText: '确定',
					titleText: '消息提示',
					data: '我是外界传进来的数据'
				})
			},
			userBehaviorFun (data) {
				console.log(data)
				if (data.type == 'clickConfirm') {
					alert('点击了确认！')
					console.log('点击了确认！')
				} else if (data.type == 'clickCancel') {
					alert('点击了取消！')
					console.log('点击了取消！')
				}
			},
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				console.log(this.page)
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name,
					size: this.pageSize
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					console.log(res)
					this.total = res.data.total;
					this.users = res.data.users.map(item => {
						return {
							name: item.name,
							sex: item.sex?'男':'女',
							age: item.age,
							birth: item.birth,
							addr: item.addr
						}
					});
					this.userExport = res.data.userExport.map(item => {
						return {
							name: item.name,
							sex: item.sex?'男':'女',
							age: item.age,
							birth: item.birth,
							addr: item.addr
						}
					});
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			dealEdit (id, data) {
				this.editFormVisible = !this.editFormVisible;
				this.rowId=id
				console.log(id)
				console.log(data)
			},
			//编辑完刷新页面
			getNew () {
				this.editFormVisible = !this.editFormVisible;
				this.getUsers()
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			// editSubmit: function () {
			// 	this.$refs.editForm.validate((valid) => {
			// 		if (valid) {
			// 			this.$confirm('确认提交吗？', '提示', {}).then(() => {
			// 				this.editLoading = true;
			// 				//NProgress.start();
			// 				let para = Object.assign({}, this.editForm);
			// 				para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
			// 				editUser(para).then((res) => {
			// 					this.editLoading = false;
			// 					//NProgress.done();
			// 					this.$message({
			// 						message: '提交成功',
			// 						type: 'success'
			// 					});
			// 					this.$refs['editForm'].resetFields();
			// 					this.editFormVisible = false;
			// 					this.getUsers();
			// 				});
			// 			});
			// 		}
			// 	});
			// },
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (aa) {
				console.log(aa)
				this.sels = aa;
			},
			//批量删除
			batchRemove: function () {
				// var ids = this.sels.map(item => item.id).toString();
				var ids = this.sels.map(item => item.id);
				console.log(ids)
				var ids = ids.toString();
				console.log(ids)
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>
	.tableStyle{
		display: none;
	}
</style>