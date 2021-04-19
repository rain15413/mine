<template>
    
    <el-dialog title="编辑" :visible.sync="dialogVisible" @open="fillIn" :before-close="handleClose" :close-on-click-modal="false">
        <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio class="radio" :label="1">男</el-radio>
                    <el-radio class="radio" :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input-number v-model="ruleForm.age" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="生日" prop="birth">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth"></el-date-picker>
            </el-form-item>
            <el-form-item label="地址" prop="addr">
                <el-input type="textarea" v-model="ruleForm.addr"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
        </div>
    </el-dialog>
    
</template>
<script>
import { editGet, editUser } from '../../api/api';
import util from '../../common/js/util'
export default {
    data () {
        var valueCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('不能为空'))
            } else {
                callback()
            }
        }
        return {
            ruleForm: {
                name: '',
                sex: '',
                age: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: [
                    { validator: valueCheck, trigger: 'blur' }
                ],
                age: [
                    { validator: valueCheck, trigger: 'blur' }
                ],
                addr: [
                    { validator: valueCheck, trigger: 'blur' }
                ]
            },
            editLoading: false
        }
    },
    props: {  
        // 子组件接收父组件的传值， 需要注意传值 和传引用的default 写法区别，
        // object array 属于传引用
        // Number String Boolean 属于传值
        dialogVisible: {
            type: Boolean,
            default: false
        }
        // dialogVisible: {  // 传数组
        //     type: Array,
        //     default: () => {
        //         return [];
        //     }
        // },
        // dialogVisible: {  // 传对象
        //     type: Object,
        //     default: () => {
        //         return {};
        //     }
        // }
    },
    methods: {
        handleClose () {
            this.$refs['ruleForm'].clearValidate()
            this.$refs['ruleForm'].resetFields()
            this.$emit('dealEdit')
        },
        closeDialog () {
            this.$refs['ruleForm'].clearValidate()
            this.$refs['ruleForm'].resetFields()
            this.$emit('dealEdit')
        },
        fillIn () {
            var params=this.$parent.rowId
            console.log(params)
            let that=this
            editGet(params).then(res => {
                console.log(res)
                that.ruleForm=res.data.users
            })
        },
        editSubmit: function () {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {
                        
                    }).then(() => {
                        this.editLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.ruleForm);
                        para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                        editUser(para).then((res) => {
                            this.editLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['ruleForm'].resetFields();
                            this.$emit('getNew')
                        });
                    }).catch(() => {
                        return false
                    });
                }
            });
        }
    }
}
</script>
<style>

</style>


