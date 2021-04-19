<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chartColumn" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartMultipleLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartDot" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="24">
                <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'

    export default {
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
                chartMultipleLine: null
            }
        },

        methods: {
            drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                  title: { text: 'Column Chart' },
                  tooltip: {},
                  xAxis: {
                      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                  },
                  yAxis: {},
                  series: [{
                      name: '销量',
                      type: 'bar',
                      data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                this.chartBar.setOption({
                    title: {
                        text: 'Bar Chart',
                        subtext: '数据来自网络'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['2011年', '2012年']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
                    },
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            data: [18203, 23489, 29034, 104970, 131744, 630230]
                        },
                        {
                            name: '2012年',
                            type: 'bar',
                            data: [19325, 23438, 31000, 121594, 134141, 681807]
                        }
                    ]
                });
            },
            drawLineChart() {
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                this.chartLine.setOption({
                    title: {
                        text: 'Line Chart'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告', '搜索引擎']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '搜索引擎',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                });
            },
            drawMultipleLine () {
                function getDataArr () {
                    var arr = []
                    for (let i = 0; i < 12; i++) {
                        arr.push(Math.random().toFixed(1)*200 + 10)
                    }
                    console.log(arr)
                    return arr
                }
                var data1 = getDataArr()
                var data2 = getDataArr()
                var data3 = getDataArr()
                this.chartMultipleLine = echarts.init(document.getElementById('chartMultipleLine'));
                this.chartMultipleLine.setOption({
                    tooltip: {
                        show: true,
                        trigger: 'none',
                        axisPointer: {
                            type: 'line'
                        }
                    },
                    legend: {
                        data:['2015 流星数', '2016 流星数', '2017 流星数']
                    },
                    grid: {
                        top: 70,
                        bottom: 50
                    },
                    xAxis: {
                        axisLabel:{    
                            rotate:45,//倾斜度 -90 至 90 默认为0
                        },
                        boundaryGap: false,
                        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'2015 流星数',
                            type:'line',
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: '#8ec6ad'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#8ec6ad'
                                    }, {
                                        offset: 1,
                                        color: '#8ec6af'
                                    }])
                                }
                            },
                            data: data1
                        },
                        {
                            name:'2016 流星数',
                            type:'line',
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: '#d68262'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#d68262'
                                    }, {
                                        offset: 1,
                                        color: '#ffe'
                                    }])
                                }
                            },
                            data: data2
                        },
                        {
                            name:'2017 流星数',
                            type:'line',
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: '#075690'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#075690'
                                    }, {
                                        offset: 1,
                                        color: '#ffe'
                                    }])
                                }
                            },
                            data: data3
                        }
                    ]
                })
            },
            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: 'Pie Chart',
                        subtext: '纯属虚构',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                { value: 335, name: '直接访问' },
                                { value: 310, name: '邮件营销' },
                                { value: 234, name: '联盟广告' },
                                { value: 135, name: '视频广告' },
                                { value: 1548, name: '搜索引擎' }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawDotChart () {
                this.chartDot = echarts.init(document.getElementById('chartDot'));
                this.chartDot.setOption({
                    title: {
                        text: '域名时延'
                    },
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'line'
                        }
                    },
                    xAxis: {
                        axisLine:{
                            lineStyle:{
                                color:'#1B2D41'
                                // width:8,//这里是为了突出显示加上的
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel:{
                            align: 'right',
                            rotate: 30,//倾斜度 -90 至 90 默认为0
                            fontSize: 10 // x轴字体大小
                        },
                        // boundaryGap: false,
                        data: ['down.qq.com','ied-tqos-tgp.com','www.wegame.com.cn','wegame.gtimg.com','wup.browser.qq.com','ossweb-img.qq.com','t.tdm.qq.com','pingfore.qq.com','tgccfg.qq.com','ptligin2.qq.com']
                    },
                    yAxis: {
                        axisLine:{
                            lineStyle:{
                                color:'#1B2D41'
                                // width:8,//这里是为了突出显示加上的
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    legend: {
                        right: 'left',
                        data: ['本网时延', '出口时延', '应用时延']
                    },
                    series: [
                        {
                            name: '本网时延',
                            type: 'scatter',
                            symbolSize: 10,
                            itemStyle: {
                                normal: {
                                    color: '#35FFEB'
                                }
                            },
                            data: [
                                ["down.qq.com", 8.04],
                                ["ied-tqos-tgp.com", 6.95],
                                ["www.wegame.com.cn", 7.58],
                                ["wegame.gtimg.com", 8.81],
                                ["wup.browser.qq.com", 8.33],
                                ["ossweb-img.qq.com", 9.96],
                                ["t.tdm.qq.com", 7.24],
                                ["pingfore.qq.com", 4.26],
                                ["tgccfg.qq.com", 10.84],
                                ["ptligin2.qq.com", 4.82]
                            ]
                        },
                        {
                            name: '出口时延',
                            type: 'scatter',
                            symbolSize: 10,
                            itemStyle: {
                                normal: {
                                    color: '#FFEA00'
                                }
                            },
                            data: [
                                ["down.qq.com", 9.04],
                                ["ied-tqos-tgp.com", 45.95],
                                ["www.wegame.com.cn", 36.58],
                                ["wegame.gtimg.com", 78.81],
                                ["wup.browser.qq.com", 23.33],
                                ["ossweb-img.qq.com", 78.96],
                                ["t.tdm.qq.com", 17.24],
                                ["pingfore.qq.com", 24.26],
                                ["tgccfg.qq.com", 30.84],
                                ["ptligin2.qq.com", 14.82]
                            ]
                        },
                        {
                            name: '应用时延',
                            type: 'scatter',
                            symbolSize: 10,
                            itemStyle: {
                                normal: {
                                    color: '#49AB14'
                                }
                            },
                            data: [
                                ["down.qq.com", 14.04],
                                ["ied-tqos-tgp.com", 25.95],
                                ["www.wegame.com.cn", 26.58],
                                ["wegame.gtimg.com", 58.81],
                                ["wup.browser.qq.com", 33.33],
                                ["ossweb-img.qq.com", 48.96],
                                ["t.tdm.qq.com", 27.24],
                                ["pingfore.qq.com", 24.26],
                                ["tgccfg.qq.com", 10.84],
                                ["ptligin2.qq.com", 18.82]
                            ]
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawColumnChart()
                this.drawBarChart()
                this.drawLineChart()
                this.drawPieChart()
                this.drawMultipleLine()
                this.drawDotChart()
            },
        },

        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
