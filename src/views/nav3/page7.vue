<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-08-06 14:38:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-28 11:00:54
-->
<template>
  <div class="grouping">
    <el-button type="primary" @click="showDialog">显示</el-button>
    <el-dialog
      title="提示"
      @open='openDialog'
      @close='closeDialog'
      :close-on-click-modal='false'
      Width="500px"
      :visible.sync="dialogVisible">
      <el-transfer
        v-if="dialogVisible"
        :titles="['左标题', '右标题']"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市名称"
        v-model="appArr"
        :data="appData"
        @change='onChange'
        @left-check-change='leftChange'
        @right-check-change='rightChange'>
        <div class="transfer-footer" slot="left-footer">
          <div class="title-b">左标题</div>
        </div>
        <div class="transfer-footer" slot="right-footer">
          <div class="title-b">右标题</div>
        </div>
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      limit: 5, // 选择app的上限
      long: 0, // 一共选择了多少个app
      appData: [], // 选择器显示用
      appArr: [], // 请求接口用
      oldAppArr: [], // 需要新旧数据对比时用
      appParams: [], // 编辑时显示已经被选用的app
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    }
  },
  mounted () {
    // this.appData = this.generateData()
  },
  methods: {
    generateData () {
      const data = [];
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都', '香港', '福州', '广东', '珠海', '河南'];
      const pinyin = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都', '香港', '福州', '广东', '珠海', '河南'];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index],
          disabled: false,
          isCheck: false
        });
      });
      return data;
    },
    onChange(val, way, value) {
      console.log('change')
      console.log(val, way, value)
      this.long = val.length
      for (let j = 0; j < this.appData.length; j++) {
        this.appData[j].isCheck = false
        for (let k = 0; k < val.length; k++) {
          if (j == val[k]) {
            this.appData[j].isCheck = true
          }
        }
      }
      if (this.long < this.limit) {
        for (let i = 0; i < this.appData.length; i++) {
          this.appData[i].disabled = false
        }
      }
      // console.log(this.appArr)
    },
    leftChange(keyArr, nowVal) {
      console.log('left')
      console.log(keyArr, nowVal)
      if (keyArr != []) {
        if (keyArr.indexOf(nowVal[0]) > -1) {
          this.appData[nowVal[0]].isCheck = true
        } else {
          this.appData[nowVal[0]].isCheck = false
        }
      }
      console.log('data', this.appData)
      if (this.limit - keyArr.length == this.long) {
        for (let k = 0; k < this.appData.length; k++) {
          if (!this.appData[k].isCheck) {
            this.appData[k].disabled = true
          }
        }
      } else {
        for (let i = 0; i < this.appData.length; i++) {
          this.appData[i].disabled = false
        }
      }
    },
    rightChange(keyArr, nowVal) {
      console.log('right')
      console.log(keyArr, nowVal)
      // if (keyArr != []) {
      //   if (keyArr.indexOf(nowVal[0]) > -1) {
      //     this.appData[nowVal[0]].isCheck = false // 和leftChange时相反
      //   } else {
      //     this.appData[nowVal[0]].isCheck = true // 和leftChange时相反
      //   }
      // }
    },
    showDialog() {
      this.dialogVisible = true
      // this.long = 0
      // for (let i = 0; i < this.appData.length; i++) {
      //   this.appData[i].disabled = false
      //   this.appData[i].isCheck = false
      // }
    },
    closeDialog() {
      this.dialogVisible = false
      this.appArr = []
    },
    openDialog() {
      this.appData = this.generateData()
      console.log('openDialog')
      this.appArr = []
      this.long = 0
      if (this.appParams == []) {
        this.dialogVisible = true
      } else {
        this.dialogVisible = true
        for (let i = 0; i < this.appData.length; i++) {
          for (let j = 0; j < this.appParams.length; j++) {
            if (this.appData[i].label == this.appParams[j]) {
              this.appData[i].isCheck = true
              this.appArr.push(i) // 保存的是穿梭框的选项下标
              this.oldAppArr.push(i) // 保存的是穿梭框的选项下标
            } 
          }
        }
        this.long = this.appArr.length
        if (this.long == this.limit) {
          for (let k = 0; k < this.appData.length; k++) {
            this.appData[k].disabled = true
          }
          for (let i = 0; i < this.appData.length; i++) {
            for (let j = 0; j < this.appParams.length; j++) {
              if (this.appData[i].label == this.appParams[j]) {
                this.appData[i].isCheck = true
                this.appData[i].disabled = false
              } 
            }
          }
        }
      }
    },
    confirmDialog() {
      this.appParams = []
      this.dialogVisible = false
      console.log(this.appArr)
      console.log(this.appData)
      for (let i = 0; i < this.appData.length; i++) {
        for (let j = 0; j < this.appArr.length; j++) {
          if (i == this.appArr[j]) {
            this.appParams.push(this.appData[i].label)
          } 
        }
      }
    }
  }
}
</script>

<style>
.grouping .el-transfer {
  width: 560px!important;
  margin: 0 auto!important;
}
.grouping .el-transfer-panel{
  height: 320px!important;
  width: 230px!important;
}
.grouping .el-transfer-panel__body{
  /* height: 280px!important; */
}
.grouping .el-transfer-panel__list.is-filterable{
  height: 220px!important;
}
.grouping .el-transfer-panel .el-transfer-panel__footer{
  top: -2px!important;
  z-index: 300;
  background: none!important;
  border-top: none!important;
}
.grouping .el-transfer-panel .el-transfer-panel__footer::after{
  height: 0!important;
}
.grouping .el-transfer-panel__body.is-with-footer{
  padding-bottom: 0!important;
}
.grouping .el-transfer-panel .el-transfer-panel__footer .title-b{
  background: #f5f7fa!important;
  height: 41px;
  line-height: 41px;
  width: 70%;
  padding-left: 10px;
  box-sizing: border-box;
}
.grouping .el-transfer-panel:nth-of-type(3) .el-transfer-panel__filter{
  display: none;
}
.grouping .el-transfer-panel__item{
  width: 100%!important;
  box-sizing: border-box;
  margin-right: 0!important;
}
</style>