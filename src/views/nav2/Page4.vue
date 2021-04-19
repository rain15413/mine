<template>
  <div>
    <h1>vuex 测试</h1>
    Clicked: {{ getCount }} times
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <div>
      <button @click="showDialog">显示dialog</button>
      <my-dialog @handleClose='closeDialog' :dialogVisible='dialogVisible' :showFoot='showFoot'></my-dialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import myDialog from '@/components/myDialog'
  export default {
    components: {
      myDialog: myDialog
    },
    data () {
      return {
        dialogVisible: false,
        showFoot: true
      }
    },
    computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters([
        'getCount'
        // ...
      ])
    },
    mounted() {
      let testData = [1, 2, 3, 4, 5]
      for (let i in testData) {
        console.log(i);
      }
    },
    methods: {
      ...mapActions([
        'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
        'decrement'
      ]),
      showDialog() {
        this.dialogVisible = true
      },
      closeDialog() {
        this.dialogVisible = false
      }
    }
  }

</script>