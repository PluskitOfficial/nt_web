<template>
    <div class="home">
        <headed @fMethod="fMethod"></headed>
        <div class="content">
            <div class="top w-auto">
                <div class="notary-list clearfix pt30">
                    <div class="border-box bg-color">
                        <div class="box-content" ref="notarySevenDays">
                            <p class="box-title-name">Basic information
                                <el-tooltip class="item" effect="dark" content="Source: Github Repositories" placement="right-start">
                                    <img src="@/assets/img/tips.png" class="tips4">
                                </el-tooltip>
                            </p>
                            <div class="data-list">
                                <el-row>
                                    <el-col :span="8"><div class="data-list-left">Address</div></el-col>
                                    <el-col :span="16">
                                        <div class="data-list-right">
                                            <span v-if="notaryListStart">{{notaryList.notary_info.address?notaryList.notary_info.address:"----"}}</span>
                                            <span v-if="!notaryListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><div class="data-list-left">Name 0f Notary</div></el-col>
                                    <el-col :span="16">
                                        <div class="data-list-right">
                                            <span v-if="notaryListStart">{{notaryList.notary_info.name?notaryList.notary_info.name:"----"}}</span>
                                            <span v-if="!notaryListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><div class="data-list-left">Region</div></el-col>
                                    <el-col :span="16">
                                        <div class="data-list-right">
                                            <span v-if="notaryListStart">{{notaryList.notary_info.region?notaryList.notary_info.region:"----"}}</span>
                                            <span v-if="!notaryListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><div class="data-list-left">Total Shares</div></el-col>
                                    <el-col :span="16">
                                        <div class="data-list-right">
                                            <span v-if="notaryListStart">{{notaryList.notary_info.total?notaryList.notary_info.total:"0"  | changeSize}}</span>
                                            <span v-if="!notaryListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><div class="data-list-left">Applications</div></el-col>
                                    <el-col :span="16">
                                        <div class="data-list-right">
                                            <span v-if="notaryListStart">{{notaryList.notary_info.req_time?notaryList.notary_info.req_time:"----"}}
                                                <img v-if="notaryList.notary_info.req_time" @click="githubUrlTwo(notaryList.notary_info.github_name)" style="margin-left: 0.2rem; cursor: pointer;" class="icon" src="@/assets/img/icon-7.png"></span>
                                            <span v-if="!notaryListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><div class="data-list-left">Allocated</div></el-col>
                                    <el-col :span="16">
                                        <div class="data-list-right">
                                            <span v-if="notaryListStart">{{notaryList.notary_info.allow?notaryList.notary_info.allow:"0" | changeSize}}</span>
                                            <span v-if="!notaryListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><div class="data-list-left">Unallocated</div></el-col>
                                    <el-col :span="16">
                                        <div class="data-list-right">
                                            <span v-if="notaryListStart">{{notaryList.rate_dict.unallow?notaryList.rate_dict.unallow:"0" | changeSize}}</span>
                                            <span v-if="!notaryListStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                    <div class="border-box bg-color">
                        <div class="border-name">UseSituation
                            <el-tooltip class="item" effect="dark" content="Source: Github Repositories" placement="right-start">
                                <img src="@/assets/img/tips.png" class="tips4">
                            </el-tooltip>
                        </div>
                        <div class="box-content useSituation" ref="useSituation"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content content2">
            <div class="top w-auto">
                <div class="user-detail clearfix">
                    <div class="border-box mt30" :style="providerListStart===true?'height: 6.8rem':''">
                        <div class="box-content">
                            <p class="box-title-name">Application Record
                                <el-tooltip class="item" effect="dark" content="Source: Github Repositories" placement="right-start">
                                    <img src="@/assets/img/tips.png" class="tips4">
                                </el-tooltip>
                            </p>
                            <div class="table-list">
                                <div class="pl10 pr10 table-bg">
                                    <el-table :data="notaryDataS" style="width: 100%" :stripe="false" :border="false" :highlight-current-row="false">
                                        <el-table-column prop="assignor" label="IssueId" align="center" width="90px;">
                                            <template slot-scope="scope">
                                                <div class="blue cursor" @click="githubUrl(scope.row.url)"><img class="icon" src="@/assets/img/icon-7.png">{{scope.row.issue_id}}</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="name" label="Client" align="center">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.name.length>40">
                                                    <div class="cursor" style="line-height: 15px; height: 32px;overflow: hidden;">
                                                        {{scope.row.name}}
                                                    </div>
                                                </div>
                                                <div v-if="scope.row.name.length<40">
                                                    {{scope.row.name}}
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="Website" align="center">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.media.length>40">
                                                    <div class="cursor" style="line-height: 15px; height: 32px;overflow: hidden;">
                                                        {{scope.row.media?scope.row.media:"----"}}
                                                    </div>
                                                </div>
                                                <div v-if="scope.row.media.length<40">
                                                    {{scope.row.media?scope.row.media:"----"}}
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="apply_address" label="Address" align="center" width="170px;">
                                            <template slot-scope="scope">
                                                <div class="cursor" v-if="scope.row.apply_address">
                                                    <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.apply_address">
                                                        <div @click="clickUser(scope.row.apply_address)"  v-if="scope.row.apply_address"
                                                             slot="reference" class="blue">{{scope.row.apply_address?scope.row.apply_address: "----" | substring10}}</div>
                                                        <div v-if="!scope.row.apply_address" slot="reference" class="blue">----</div>
                                                    </el-popover>
                                                </div>
                                                <div class="cursor" v-if="!scope.row.apply_address">
                                                    <span class="blue">----</span>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="created_at" label="Application Time" align="center" width="180px;"></el-table-column>
                                        <!--<el-table-column prop="region" label="Region" align="center" width="150px;">-->
                                        <!--<template slot-scope="scope">-->
                                        <!--{{scope.row.region?scope.row.region: "----"}}-->
                                        <!--</template>-->
                                        <!--</el-table-column>-->
                                        <el-table-column prop="allocated_datacap" label="DataCap Requested" align="center" width="100px;">
                                            <template slot-scope="scope">
                                                {{scope.row.request_datacap?scope.row.request_datacap: "0" | changeSize}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="assignor" label="Status" align="center" width="120px;">
                                            <template slot-scope="scope">
                                                <span class="fb" v-if="scope.row.status===2"><img class="icon" src="@/assets/img/icon-5.png">Granted</span>
                                                <span class="fc" v-if="scope.row.status===1"><img class="icon" src="@/assets/img/icon-6.png">Verifying</span>
                                                <span class="" v-if="scope.row.status===0"><img class="icon" src="@/assets/img/icon-4.png">Closed</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="assignor" label="Datacap Allocated" align="center" width="90px;">
                                            <template slot-scope="scope">
                                            <span v-if="scope.row.status===2">
                                                <span v-if="scope.row.allocated_datacap=='0'">
                                                    NaNB
                                                    <el-tooltip class="item" effect="dark" content="Please click the link of related message id to identify DataCap allocated." placement="top-start">
                                                        <i class="el-icon-warning ml5" style="color: #e6a23c;"></i>
                                                    </el-tooltip>
                                                </span>
                                                <span v-if="scope.row.allocated_datacap!='0'">{{scope.row.allocated_datacap?scope.row.allocated_datacap: "0" | changeSize}}</span>
                                            </span>
                                                <span v-if="scope.row.status===0">
                                                <span v-if="scope.row.allocated_datacap=='0'">----</span>
                                                <span v-if="scope.row.allocated_datacap!='0'">{{scope.row.allocated_datacap?scope.row.allocated_datacap: "0" | changeSize}}</span>
                                            </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="msg_cid" label="Message ID" align="center" width="170px;">
                                            <template slot-scope="scope">
                                                <div class="cursor" v-if="scope.row.msg_cid">
                                                    <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.msg_cid">
                                                        <div @click="messagesUrl(scope.row.msg_cid, scope.row.height)" v-if="scope.row.msg_cid" slot="reference"
                                                             class="blue">{{scope.row.msg_cid?scope.row.msg_cid: "----" | substring10}}</div>
                                                        <div v-if="!scope.row.msg_cid" slot="reference" class="blue">----</div>
                                                    </el-popover>
                                                </div>
                                                <div class="cursor" v-if="!scope.row.msg_cid">
                                                    <span class="blue">----</span>
                                                </div>
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
    import { sizeStorage } from "@/assets/common";
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
                notaryList: {
                    notary_info: "",
                    rate_dict: "",
                },
                notaryDataS: [],
                pager1: {
                    pageNumber: 1,
                    pageSize: this.$store.state.pageSizeFirst,
                    total: 0,
                },
                notaryListStart: false,
                providerListStart: false,
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
                            left: 'center',//
                            top: 'middle' //配置图片居中
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
            this.notary();//公证人信息
            this.notaryData();//公证人申请记录
        },
        methods: {
            githubUrl(url) {
                window.open(url);
            },
            githubUrlTwo(name) {
                window.open("https://github.com/filecoin-project/filecoin-plus-client-onboarding/issues/assigned/" +name);
            },
            /*跳转消息*/
            /*跳转消息*/
            messagesUrl (order, height){
                if(height) {
                    window.open("https://www.atpool.com/zh/chain/msg/"+order+"-"+height);
                }else {
                    window.open("https://www.atpool.com/zh/chain/msg/"+order+"-1153243");
                }
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
                this.notary();
                this.notaryData();
            },
            pagingChange1 (data) {
                this.pager1.pager = data.pageSize;
                this.pager1.pageNumber = data.pageNumber;
                this.notaryData();
            },
            //公证人申请记录
            notaryData() {
                api.notary_req({
                    name: this.$route.query.id,
                    page_index: this.pager1.pageNumber,
                    page_size: 10,
                }).then( res => {
                    if (res.code === 0) {
                        if(res.data.total>10) {
                            this.providerListStart = true;
                        }
                        this.notaryDataS = res.data.data;
                        this.pager1.total = res.data.total;
                    }else {
                        this.notaryDataS = [];
                        this.pager1.total = res.data.total;
                    }
                });
            },
            /*存储用户*/
            notary () {
                this.notaryListStart = false;
                let myChart = echarts.init(this.$refs.useSituation);
                myChart.showLoading({
                    text: 'Loading...', //字体
                    color: "#ffcdad",  //字体颜色
                });
                myChart.clear();
                api.notary_info({
                    name: this.$route.query.id
                }).then( res => {
                    this.notaryListStart = true;
                    if (res.code === 0) {
                        this.notaryList = res.data;
                        if(res.data.rate_dict) {
                            this.useSituation(res.data.rate_dict, myChart);
                        }else {
                            myChart.hideLoading();
                            myChart.setOption(this.setOptionData);
                        }
                    }else {
                        this.notaryList.notary_info = "";
                        myChart.hideLoading();
                        myChart.setOption(this.setOptionData);
                        this.$notify({
                            title: 'Error',
                            message: 'Unable to search for this content',
                            type: 'warning'
                        });
                    }
                });
            },
            //公证人使用情况
            useSituation(data, myChart) {
                let dataN = [], num = 0;
                for(let key  in data){
                    let name= {
                        name: key,
                        value: data[key],
                    };
                    num+= parseInt(data[key]);
                    dataN.push(name);
                }

                myChart.setOption({
                    title: {
                        text: sizeStorage(num.toString()),
                        textStyle: {
                            fontStyle: "normal",
                            fontWeight: 'lighter',
                            fontSize: 12
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
                                    if(params.name=="unallow") {
                                        return params.name+'\n'+params.percent+'%';
                                    }else {
                                        let name = params.name.substring(0,10)+"****"+params.name.substring(params.name.length-5,params.name.length);
                                        return name+'\n'+params.percent+'%';
                                    }
                                }
                            },
                            itemStyle: {
                                color: function(params) {
                                    let colorList = [];
                                    if(dataN.length>2) {
                                        colorList = ['#73a0fa','#ff7a8c','#ff9f62','#52c1f5','#ffc542','#ffb383','#24d2d3','#F6843C','#ffc8a5','#73a0fa','#ff7a8c','#ff9f62','#52c1f5','#ffc542','#ffb383','#24d2d3','#F6843C','#ffc8a5','#73a0fa','#ff7a8c','#ff9f62','#52c1f5','#ffc542','#ffb383','#24d2d3','#F6843C','#ffc8a5','#73a0fa','#ff7a8c','#ff9f62','#52c1f5','#ffc542','#ffb383','#24d2d3','#F6843C','#ffc8a5','#73a0fa','#ff7a8c','#ff9f62','#52c1f5','#ffc542','#ffb383','#24d2d3','#F6843C','#ffc8a5'];
                                    }else {
                                        colorList = ['#ffa165','#d7d7d8'];
                                    }
                                    return colorList[params.dataIndex];
                                },
                            },
                        }
                    ]
                });
                myChart.hideLoading();
            },
            clickUser(adds) {
                setCookie('searchV', '/user', 12);
                this.$router.push({
                    path: "/user",
                    query: {
                        id: adds,
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
