<template>
    <div class="home">
        <headed @fMethod="fMethod"></headed>
        <div class="content clear-radius">
            <div class="top w-auto">
                <div class="userinfo message clearfix pt30">
                    <div class="border-box bg-color ">
                        <div class="box-content" ref="notarySevenDays">
                            <p class="box-title-name">Basic information
                                <el-tooltip class="item" effect="dark" content="Source: Github Repositories" placement="right-start">
                                    <img src="@/assets/img/tips.png" class="tips4">
                                </el-tooltip>
                            </p>
                            <div class="data-list">
                                <el-row>
                                    <el-col :span="4"><div class="data-list-left">Address</div></el-col>
                                    <el-col :span="20">
                                        <div class="data-list-right">
                                            <span v-if="userListStart">{{userList.basic_info.address?userList.basic_info.address:"----"}}</span>
                                            <span v-if="!userListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4"><div class="data-list-left">Name</div></el-col>
                                    <el-col :span="20">
                                        <div class="data-list-right">
                                            <span v-if="userListStart">{{userList.basic_info.name?userList.basic_info.name:"----"}}</span>
                                            <span v-if="!userListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4"><div class="data-list-left">Website</div></el-col>
                                    <el-col :span="20">
                                        <div class="data-list-right">
                                            <span v-if="userListStart">{{userList.basic_info.media?userList.basic_info.media:"----"}}</span>
                                            <span v-if="!userListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4"><div class="data-list-left">Github Nickname</div></el-col>
                                    <el-col :span="20">
                                        <div class="data-list-right">
                                            <span v-if="userListStart">{{userList.basic_info.github_account?userList.basic_info.github_account:"----"}}
                                                <img v-if="userList.basic_info.github_account" @click="githubUrl(userList.basic_info.user_url)" style="margin-left: 0.2rem; cursor: pointer;" class="icon" src="@/assets/img/icon-7.png"></span>
                                            <span v-if="!userListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4"><div class="data-list-left">Total application Shares</div></el-col>
                                    <el-col :span="20">
                                        <div class="data-list-right">
                                            <span v-if="userListStart">{{userList.basic_info.request_database?userList.basic_info.request_database:"0" | changeSize}}</span>
                                            <span v-if="!userListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4"><div class="data-list-left">Allocated</div></el-col>
                                    <el-col :span="20">
                                        <div class="data-list-right">
                                            <span v-if="userListStart">{{userList.basic_info.allocated_databse?userList.basic_info.allocated_databse:"0" | changeSize}}</span>
                                            <span v-if="!userListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4"><div class="data-list-left">Applications</div></el-col>
                                    <el-col :span="20">
                                        <div class="data-list-right">
                                            <span v-if="userListStart">{{userList.basic_info.apply_number?userList.basic_info.apply_number:"0" | changeSize}}</span>
                                            <span v-if="!userListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="notary-list clearfix mt30">
                    <div class="border-box">
                        <div class="border-name">Flow Direction
                            <el-tooltip class="item" effect="dark" content="Source: Blockchain" placement="right-start">
                                <img src="@/assets/img/tips.png" class="tips4">
                            </el-tooltip>
                        </div>
                        <div class="box-content flowDirection" ref="flowDirection"></div>
                    </div>
                    <div class="border-box">
                        <div class="border-name">Consumption
                            <el-tooltip class="item" effect="dark" content="Source: Blockchain" placement="right-start">
                                <img src="@/assets/img/tips.png" class="tips4">
                            </el-tooltip>
                        </div>
                        <div class="box-content" ref="consumption"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content content2">
            <div class="top w-auto">
                <div class="user-detail clearfix">
                    <div class="border-box mt30" :style="providerListStart===true?'height: 7rem':''">
                        <div class="box-content">
                            <p class="box-title-name">Detailed Consumption
                                <el-tooltip class="item" effect="dark" content="Source: Blockchain" placement="right-start">
                                    <img src="@/assets/img/tips.png" class="tips4">
                                </el-tooltip>
                            </p>
                            <div class="table-list pl10 pr10 table-bg">
                                <el-table :data="consumeList" style="width: 100%" :stripe="false" :border="false" :highlight-current-row="false">
                                    <el-table-column prop="deal_id" label="Order Id" align="center">
                                        <template slot-scope="scope">
                                            <div @click="orderUrl(scope.row.deal_id)" class="blue cursor">{{scope.row.deal_id}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="height_time" label="Creation Time" align="center"></el-table-column>
                                    <el-table-column prop="provider_id" label="Storage Provider" align="center">
                                        <template slot-scope="scope">
                                            <div @click="clickProvider(scope.row.provider_id)" class="blue cursor">{{scope.row.provider_id}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="file_size" label="File Size" align="center">
                                        <template slot-scope="scope">
                                            {{scope.row.file_size | changeSize}}
                                        </template>
                                    </el-table-column>
                                    <div slot="empty">
                                        <div class="loading" v-if="providerListStart">
                                            <span class="el-icon el-icon-loading"></span>
                                            <div>Loading</div>
                                        </div>
                                        <div class="NODATA" v-if="!providerListStart">
                                            <div class="dataN"><img src="@/assets/img/dataN.png"></div>
                                            <div class="textN"><span>No Data</span></div>
                                        </div>
                                    </div>
                                </el-table>
                                <div class="clearfix paginationALL" style="text-align: center; margin-top: 0.3rem; bottom: -0.4rem">
                                    <pagination :pager="pager1" @pagination="pagingChange1"></pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border-box mt30" :style="providerListStart2===true?'height: 7rem':''">
                        <div class="box-content">
                            <p class="box-title-name">Application Record
                                <el-tooltip class="item" effect="dark" content="Source: Github Repositories" placement="right-start">
                                    <img src="@/assets/img/tips.png" class="tips4">
                                </el-tooltip>
                            </p>
                            <div class="table-list">
                                <el-table :data="applyList" style="width: 100%" :stripe="false" :border="false" :highlight-current-row="false">
                                    <el-table-column prop="assignor" label="IssueId" align="center" width="90">
                                        <template slot-scope="scope">
                                            <div class="fc cursor blue" @click="githubUrl(scope.row.github_url)">
                                                <img class="icon" src="@/assets/img/icon-7.png">{{scope.row.issue_id}}</div>
                                            <!--<span class="fc">{{scope.row.assignor}}</span>-->
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="assignee" label="Name Of Notary" align="center" width="150">
                                        <template slot-scope="scope">
                                            <div v-if="!scope.row.notary">
                                                ----
                                            </div>
                                            <div v-if="scope.row.notary" @click="clickNotary(scope.row.notary)" style="color: #F6843C;">
                                                <div v-if="scope.row.notary.length>15">
                                                    <div class="cursor" style="line-height: 15px; height: 32px;overflow: hidden;">
                                                        {{scope.row.notary}}
                                                    </div>
                                                </div>
                                                <div v-if="scope.row.notary.length<15">
                                                    {{scope.row.notary}}
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <!--<el-table-column prop="assignor" label="Client" align="center">-->
                                        <!--<template slot-scope="scope">-->
                                            <!--<div style="line-height: 15px;">{{scope.row.name}}</div>-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                    <el-table-column label="Website" align="center">
                                        <template slot-scope="scope">
                                            <div style="line-height: 15px;">{{scope.row.media}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="created_at" label="Application Time" align="center"></el-table-column>
                                    <!--<el-table-column prop="region" label="Region" align="center"></el-table-column>-->
                                    <el-table-column prop="request_datacap" label="DataCap Requested" align="center" width="160">
                                        <template slot-scope="scope">
                                            {{scope.row.request_datacap  | changeSize}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="status" label="Status" align="center" width="100">
                                        <template slot-scope="scope">
                                            <span class="fb" v-if="scope.row.status===2"><img class="icon" src="@/assets/img/icon-5.png">Granted</span>
                                            <span class="fc" v-if="scope.row.status===1"><img class="icon" src="@/assets/img/icon-6.png">Verifying</span>
                                            <span class="" v-if="scope.row.status===0"><img class="icon" src="@/assets/img/icon-4.png">Closed</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="allocated_datacap" label="Allocated" align="center" width="100">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.allocated_datacap=='0'">NaNB</span>
                                            <span v-if="scope.row.allocated_datacap!='0'">{{scope.row.allocated_datacap | changeSize}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="msg_cid" label="Message ID" align="center">
                                        <template slot-scope="scope">
                                            <div class="cursor" v-if="scope.row.msg_cid">
                                                <el-popover placement="top-start" width="200" trigger="hover"
                                                            :content="scope.row.msg_cid">
                                                    <div @click="messagesUrl(scope.row.msg_cid,scope.row.height)" slot="reference" class="blue">{{scope.row.msg_cid?scope.row.msg_cid: "----" | substring10}}</div>
                                                </el-popover>
                                            </div>
                                            <div v-if="!scope.row.msg_cid">----</div>
                                        </template>
                                    </el-table-column>
                                    <div slot="empty">
                                        <div class="loading" v-if="providerListStart2">
                                            <span class="el-icon el-icon-loading"></span>
                                            <div>Loading</div>
                                        </div>
                                        <div class="NODATA" v-if="!providerListStart2">
                                            <div class="dataN"><img src="@/assets/img/dataN.png"></div>
                                            <div class="textN"><span>No Data</span></div>
                                        </div>
                                    </div>
                                </el-table>
                                <div class="clearfix paginationALL" style="text-align: center; margin-top: 0.3rem; bottom: -0.4rem">
                                    <pagination :pager="pager2" @pagination="pagingChange2"></pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footed></footed>
    </div>
</template>
<script>
    import api from "@/api/api.js";
    import headed from "@/components/headed";
    import footed from "@/components/footed";
    import pagination from "@/components/pagination";
    import { sizeStorage, sizeStorage1 } from "@/assets/common";
    import { setCookie, getCookie, delCookie } from "@/util/storage";
    const echarts = require('echarts');

    export default {
        name: "home",
        components:{
            headed,
            footed,
            pagination,
        },
        data() {
            return {
                consumeList: [],
                pager1: {
                    pageNumber: 1,
                    pageSize: this.$store.state.pageSizeFirst,
                    total: 0,
                },
                pager2: {
                    pageNumber: 1,
                    pageSize: this.$store.state.pageSizeFirst,
                    total: 0,
                },
                applyList: [],
                userList: {
                    assumption_data: [],
                    basic_info: "",
                    flow_data: [],
                },
                providerListStart: false,
                providerListStart2: false,
                userListStart: false,
                setOptionData: {
                    title: {
                        text: 'No Data',
                        textStyle: {
                            fontStyle: "normal",
                            color: '#141634',
                            fontWeight: 'lighter',
                            fontSize: 16,
                        },
                        x: "center",
                        y: "210",
                    },
                    graphic: {
                        elements: [{
                            type: 'image',
                            style: {
                                image: require("@/assets/img/dataN.png"),
                                width: 88,
                                height: 74
                            },
                            left: 'center',
                            top: 'middle'
                        }]
                    },
                },
            };
        },
        filters: {

        },
        computed:{

        },
        created() {

        },
        mounted () {
            this.user();
            this.consume();
            this.apply();
        },
        methods: {
            clickProvider(adds) {
                setCookie('searchV', '/provider', 12);
                this.$router.push({
                    path: "/provider",
                    query: {
                        id: adds,
                    }
                });
            },
            clickNotary(adds) {
                setCookie('searchV', '/notary', 12);
                this.$router.push({
                    path: "/notary",
                    query: {
                        id: adds,
                    }
                });
            },
            githubUrl(url) {
                window.open(url);
            },
            orderUrl (order){
                window.open("https://www.atpool.com/en/chain/order/"+order);
            },
            messagesUrl (order, height){
                if(height) {
                    window.open("https://www.atpool.com/zh/chain/msg/"+order+"-"+height);
                }else {
                    window.open("https://www.atpool.com/zh/chain/msg/"+order+"-1153243");
                }
            },
            pagingChange1 (data) {
                this.pager1.pager = data.pageSize;
                this.pager1.pageNumber = data.pageNumber;
                this.consume();
            },
            pagingChange2 (data) {
                this.pager2.pager = data.pageSize;
                this.pager2.pageNumber = data.pageNumber;
                this.apply();
            },
            fMethod(e) {
                if(e!==this.$route.query.id) {
                    this.$router.push({
                        path: this.$route.path,
                        query: {
                            id: e,
                        }
                    });
                }
                this.user();
                this.consume();
                this.apply();
            },
            user () {
                this.userListStart = false;
                let myChart = echarts.init(this.$refs.flowDirection);
                let myChart1 = echarts.init(this.$refs.consumption);
                myChart.showLoading({
                    text: 'Loading...',
                    color: "#ffcdad",
                });
                myChart1.showLoading({
                    text: 'Loading...',
                    color: "#ffcdad",
                });
                myChart.clear();
                myChart1.clear();
                api.user_info({
                    address: this.$route.query.id
                }).then( res => {
                    this.userListStart = true;
                    if (res.code === 0) {
                        this.userList = res.data;
                        if(res.data.flow_data.length>0) {
                            this.flowDirection(res.data.flow_data, myChart);
                        }else {
                            myChart.hideLoading();
                            myChart.setOption(this.setOptionData);
                        }
                        if(res.data.assumption_data.length>0) {
                            this.consumption(res.data.assumption_data, myChart1);
                        }else {
                            myChart1.hideLoading();
                            myChart1.setOption(this.setOptionData);
                        }
                    }else {
                        this.userList.basic_info = "";
                        myChart.hideLoading();
                        myChart1.hideLoading();
                        myChart.setOption(this.setOptionData);
                        myChart1.setOption(this.setOptionData);
                        this.$notify({
                            title: 'Error',
                            message: 'Unable to search for this content',
                            type: 'warning'
                        });
                    }
                });
            },
            flowDirection(data, myChart) {
                let dataN= [], num=0;
                for (let i=0; i<data.length;i++) {
                    let name= {
                        value: data[i].file_size,
                        name: data[i].provider,
                    };
                    num+=parseInt(data[i].file_size);
                    dataN.push(name);
                }

                myChart.setOption({
                    title: {
                        text: sizeStorage(num.toString()),
                        textStyle: {
                            fontStyle: "normal",
                            fontWeight: 'lighter',
                            fontSize: 12,
                        },
                        x: "center",
                        y: "center",
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter(params){
                            return params.name+'：'+sizeStorage(params.value.toString());
                        }
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: ['20%', '50%'],
                            center: ["50%", "50%"],
                            // roseType: 'area',
                            data: dataN,
                            label: {
                                formatter(params){
                                    return params.name+'\n'+params.percent+'%';
                                }
                            },
                            itemStyle: {
                                color: function(params) {
                                    let colorList = ['#F6843C','#ff9f62','#ffb383','#ffc8a5','#ffdbc3','#f9e4d6','#d7d7d8','#F6843C','#ff9f62','#ffb383','#ffc8a5','#ffdbc3','#f9e4d6','#d7d7d8','#F6843C','#ff9f62','#ffb383','#ffc8a5','#ffdbc3','#f9e4d6','#d7d7d8','#F6843C','#ff9f62','#ffb383','#ffc8a5','#ffdbc3','#f9e4d6','#d7d7d8','#F6843C','#ff9f62','#ffb383','#ffc8a5','#ffdbc3','#f9e4d6','#d7d7d8','#F6843C','#ff9f62','#ffb383','#ffc8a5','#ffdbc3','#f9e4d6','#d7d7d8'];
                                    return colorList[params.dataIndex];
                                },
                            },
                        }
                    ]
                });
                myChart.hideLoading();
            },
            consumption(data, myChart) {
                let name= [], dataN= [];
                for (let i=0; i<data.length;i++) {
                    name.push(data[i].date);
                    dataN.push(data[i].nums);
                }
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter(params){
                            // if(params[0].value==="") {
                            //     return params[0].name+'：0 TB';
                            // }else {
                            //     return params[0].name+'：'+(params[0].value)+" TB";
                            // }
                            return params[0].name+'：'+sizeStorage(params[0].value);
                        }
                    },
                    grid: {
                        x: 65,
                        y: 80,
                        x2: 40,
                        y2: 40
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: name
                        }
                    ],
                    yAxis: [{
                        type: 'value',
                        // name: "",
                        axisLabel: {
                            interval: 0,
                            formatter:function(value) {
                                return sizeStorage1(value)+ " TB";
                            }
                        },
                        splitLine: {
                            show: false,

                        },
                    }],
                    series: [
                        {
                            name: "Shortest consumption",
                            data: dataN,
                            smooth: true,
                            type: 'line',
                            barWidth: 10,
                            itemStyle: {
                                color: "#f6843c",
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    // { offset: 0, color: '#fdeee4' },
                                    // { offset: 1, color: '#fdf7f3' },
                                    { offset: 0, color: 'rgba(255, 161, 101, 0.3)' },
                                    { offset: 1, color: 'rgba(255, 161, 101, 0)' }
                                ])
                            },
                        },
                    ]
                });
                myChart.hideLoading();
            },
            consume() {
                api.assumption_details({
                    address: this.$route.query.id,
                    page_index: this.pager1.pageNumber,
                    page_size: 10,
                }).then( res => {
                    if (res.code === 0) {
                        if(res.data.total_count>10) {
                            this.providerListStart = true;
                        }else {
                            this.consumeList = [];
                            this.pager1.total = res.data.total_count;
                        }
                        this.consumeList = res.data.objs;
                        this.pager1.total = res.data.total_count;
                    }
                });
            },
            apply() {
                api.request_records({
                    address: this.$route.query.id,
                    page_index: this.pager2.pageNumber,
                    page_size: 10,
                }).then( res => {
                    if (res.code === 0) {
                        if(res.data.total_count>10) {
                            this.providerListStart2 = true;
                        }
                        this.applyList = res.data.objs;
                        this.pager2.total = res.data.total_count;
                    }else {
                        this.applyList = [];
                        this.pager2.total = res.data.total_count;
                    }
                });
            },
        },
    };
</script>
<style>
.el-select-dropdown__item.selected {
    color: #F6843C;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: #fdf7f3;
}
.el-select-dropdown {
    border: 1px solid #141634;
}
.el-popper[x-placement^="bottom"] .popper__arrow {
    border-bottom-color: #141634;
}

</style>
<style lang="scss">
@import '../styles/home';
</style>
