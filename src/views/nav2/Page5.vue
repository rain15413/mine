<template>
    <div>
        <!-- 导出按钮 -->
        <div class="toexcel">
            <el-button @click="exportExcel" type="primary" class="button" style="width:70px;">导出</el-button>
            <el-button @click="manage" type="primary" class="button" style="width:70px;">管理</el-button>
            <el-button @click="save" type="primary" class="button" style="width:70px;">保存</el-button>
        </div>
        <el-table row-key="id" class="table" :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row, scope.$index)" type="text" size="small">上移</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="form-box">
          <el-form ref="formRef" :rules="rules" :model="formData" label-width="80px">
            <el-form-item label="活动价" prop="price">
              <el-input @blur="getDayPrice" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="6" v-model="formData.price"></el-input>
            </el-form-item>
            <el-form-item label="原价" prop="oldPrice">
              <el-input @blur="getPrice" oninput="value=value.replace(/[^\d.]/g,'')" maxlength="6" v-model="formData.oldPrice"></el-input>
            </el-form-item>
            <el-form-item label="日价格" prop="dayPrice">
              <el-input :disabled='true' oninput="value=value.replace(/[^\d.]/g,'')" maxlength="6" v-model="formData.dayPrice"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import Sortable from 'sortablejs'
export default {
  data() {
    let validatePrice = (rule, value, callback) => {
      console.log('validatePrice', value, this.formData.oldPrice, this.priceNew, this.priceOld)
      let exp = /^(([1-9]\d*)|\d)(\.\d{1})?$/;
      let long = value.split(' ').join('').length
      if (long == 0 || value == '') {
        if (this.priceOld) {
          callback('请输入套餐原价')
        } else if (this.priceNew) {
          callback('请输入套餐优惠价')
        }
      } else if (!exp.test(value)) {
        callback('金额格式有误，最多保留一位小数')
      } else if (value == 0) {
        callback('金额不能为0')
      } else {
        callback()
      }
      // let 
    }
    let validateDayPrice = function(rule, value, callback) {
      console.log('validateDayPrice', value)
      let exp = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/;
      let long = value.split(' ').join('').length
      if (long == 0 || value == '') {
        callback('请输入套餐折合价格')
      } else if (!exp.test(value)) {
        callback('金额格式有误，最多保留两位小数')
      } else {
        callback()
      }
      // let 
    }
    return {
        tableData: [{
          id: 0,
          date: '2016-05-02',
          name: '王小虎0',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 1,
          date: '2016-05-04',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 2,
          date: '2016-05-01',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 3,
          date: '2016-05-03',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableObject: '',
        pulling: false,
        formData: {
          price: '',
          oldPrice: '',
          dayPrice: ''
        },
        rules: {
          price: [
            { required: true, validator: validatePrice, trigger: 'blur' }
          ],
          oldPrice: [
            { required: true, validator: validatePrice, trigger: 'blur' },
          ],
          dayPrice: [
            { required: true, validator: validateDayPrice, trigger: 'blur' },
          ],
        },
        priceOld: false,
        priceNew: false
    };
  },
  mounted() {
    // this.rowDrop()
    let num = 5
    let numFix = num.toFixed(1)
    let num1 = 6.12
    let numFix1 = num1.toFixed(1)
    console.log(num, numFix, num1, numFix1)
  },
  methods: {
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      this.tableObject = Sortable.create(tbody, {
        animation: 150,
        ghostClass: 'blue-background-class',
        onEnd({ newIndex, oldIndex }) {
          console.log(newIndex, oldIndex)
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
          //   let temp = _this.tableData[oldIndex]
          //   _this.tableData.splice(oldIndex, 1)
          //   _this.tableData.splice(newIndex, 0, temp)
          //   // _this.$set(_this.tableData, oldIndex, _this.tableData[newIndex])
          //   // _this.$set(_this.tableData, newIndex, temp)
          console.log('tableDataFn', _this.tableData)
          let arr = []
          for (var j = 0; j < _this.tableData.length; j++) {
             arr.push(_this.tableData[j].name)
          } 
          console.log(arr);
        }
      })
      console.log('tableData', this.tableData)
    },
    getDayPrice() {
      this.priceOld = false
      this.priceNew = true
      let price = this.formData.price
      if (price == 0) {
        this.formData.dayPrice = ''
        return
      }
      this.formData.dayPrice = price / 30
      let dayPrice = this.formData.dayPrice.toFixed(2)
      console.log(price, this.formData.dayPrice, dayPrice);
      // formData.price=formData.price.replace(/[^\d.]/g,'')
    },
    getPrice () {
      this.priceOld = true
      this.priceNew = false
    },
    manage() {
      this.pulling = true
      this.rowDrop()
    },
    save() {
      // this.pulling = false
      this.tableObject.destroy()
    },
    // 导出表格所用
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
      var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
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
    handleClick(e, ii) {
      console.log(e, ii)
      if (ii == 0) {
        return
      }
      // let index = e.index
      let i = this.tableData[ii - 1]
      this.$set(this.tableData, ii - 1, this.tableData[ii])
      this.$set(this.tableData, ii, i)
      console.log(this.tableData)
    }
  }
};
</script>
<style>
/* 导出按钮 */
.toexcel {
  cursor: pointer;
  cursor: hand;
  width: 70px;
  height: 34px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.blue-background-class{
  background: rgb(21, 21, 75)!important;
}
.form-box{
  margin: 20px auto;
  width: 500px;
}
</style>