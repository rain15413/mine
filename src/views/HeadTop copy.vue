<template>
	<div class="headTop">
		<!-- <div style="margin-bottom: 20px;">
			<el-button
				size="small"
				@click="addTab(editableTabsValue)">
				add tab
			</el-button>
		</div> -->
		<el-tabs v-model="editableTabsValue" type="card" @tab-click="handleClick" closable @tab-remove="removeTab">
			<el-tab-pane
        class="tags"
				v-for="item in getTagList"
				:key="item.path"
				:label="item.name"
				:name="item.name">
				<!-- {{item.content}} -->
			</el-tab-pane>
		</el-tabs>
	</div>
	
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        // editableTabsValue: this.getCurrent,
        activeIndex: 'Table', //激活状态
        val: {},
        // editableTabs: [{
        //   title: 'Tab 1',
        //   name: '1',
        //   content: 'Tab 1 content'
        // }, {
        //   title: 'Tab 2',
        //   name: '2',
        //   content: 'Tab 2 content'
        // }],
        tabIndex: 2
      }
    },
    computed: {
      // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters({
        getTag: 'getTag',
        getTagList: 'getTagList'
        // editableTabsValue: 'getCurrent'
      }),
      editableTabsValue: {
        get () {
          // console.log(this.$store.getters.getCurrent)
          return this.$store.getters.getCurrent
        },
        set () {
          // console.log(this.val)
          // this.$store.commit('ADD_TAG', this.val)
          this.$store.state.tag = this.val
        }
      }
    },
    methods: {
      // addTab(targetName) {
      //   let newTabName = ++this.tabIndex + '';
      //   this.editableTabs.push({
      //     title: 'New Tab',
      //     name: newTabName,
      //     content: 'New Tab content'
      //   });
      //   this.editableTabsValue = newTabName;
      // },
      removeTab(tab) {
        let targetName = tab
        let tabs = this.getTagList
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          })
        }
        
        this.editableTabsValue = activeName;
        // this.getTagList = tabs.filter(tab => tab.name !== targetName);
        this.$store.commit('CLOSE_TAG', tab)
        // sessionStorage.setItem('tagList',JSON.stringify(this.getTagList))
      },
      handleClick (tab, event) {
        // console.log(tab, event)
        // console.log(this.editableTabsValue)
        this.getTagList.forEach(item => {
          if (item.name == tab.name) {
            this.val = item
            this.editableTabsValue = item.name
            this.$store.commit('ADD_TAG', item)
            this.$router.push({path: item.path})
          }
        })
      }
    }
  }
</script>
<style>

  .headTop{
    width: 100%;
    position: relative;
    z-index: 999;
  }
  .el-tabs__item{
    height: 30px;
    line-height: 30px;
  }

</style>
