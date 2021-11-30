<template>
    <div class="home">
        <headed @fMethod="fMethod"></headed>
        <div class="content">
            <div class="top w-auto">
                <div class="notary-list clearfix pt30">
                    <div class="border-box bg-color">
                        <div class="box-content" ref="notarySevenDays">
                            <p class="box-title-name">Basic Info
                                <el-tooltip class="item" effect="dark" content="Source: Blockchain" placement="right-start">
                                    <img src="@/assets/img/tips.png" class="tips4">
                                </el-tooltip>
                            </p>
                            <div class="data-list">
                                <el-row>
                                    <el-col :span="8"><div class="data-list-left">ID</div></el-col>
                                    <el-col :span="16">
                                        <div class="data-list-right">
                                            <span v-if="listStart">{{providerList.basic_info.provider_id?providerList.basic_info.provider_id:"----"}}</span>
                                            <span v-if="!listStart" class="loading2"><span class="el-icon el-icon-loading"></span>
                                                <label class="loading-texts">loading</label>
                                            </span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><div class="data-list-left">Received Orders</div></el-col>
                                    <el-col :span="16">
                                        <div class="data-list-right">
                                            <span v-if="listStart">{{providerList.basic_info.num?providerList.basic_info.num:"----"}}</span>
                                            <span v-if="!listStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><div class="data-list-left">Verified Data Storage</div></el-col>
                                    <el-col :span="16">
                                        <div class="data-list-right">
                                            <span v-if="listStart">{{ providerList.basic_info.total_size?providerList.basic_info.total_size:"0" | changeSize }}</span>
                                            <span v-if="!listStart" class="loading2"><span class="el-icon el-icon-loading"></span><label class="loading-texts">loading</label></span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                    <div class="border-box bg-color">
                        <div class="border-name">
                            Consumption
                            <el-tooltip class="item" effect="dark" content="Source: Blockchain" placement="right-start">
                                <img src="@/assets/img/tips.png" class="tips4">
                            </el-tooltip>
                        </div>
                        <div class="box-content" ref="statisticOrders"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content content2">
            <div class="top w-auto">
                <div class="user-detail clearfix">
                    <div class="border-box mt30" :style="providerListStart2===true?'height: 6.8rem':''">
                        <div class="box-content">
                            <p class="box-title-name">Clients
                                <el-tooltip class="item" effect="dark" content="Source: Blockchain" placement="right-start">
                                    <img src="@/assets/img/tips.png" class="tips4">
                                </el-tooltip>
                            </p>
                            <div class="table-list">
                                <div class="pl10 pr10 table-bg">
                                    <el-table :data="userList" style="width: 100%" :stripe="false" :border="false" :highlight-current-row="false">
                                        <el-table-column prop="apply_address" label="Address" align="center" width="200">
                                            <template slot-scope="scope">
                                                <div @click="clickUser(scope.row.address)" class="fc cursor">
                                                    {{scope.row.address?scope.row.address: "----" | substring10}}
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="Stored Data" label="Stored Data" align="center" width="160">
                                            <template slot-scope="scope">
                                                {{scope.row.total_size?scope.row.total_size: "0" | changeSize}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="Orders" label="Orders" align="center" width="160">
                                            <template slot-scope="scope">
                                                {{scope.row.num}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="Total Granted" label="Total Granted" align="center" width="160">
                                            <template slot-scope="scope">
                                                {{scope.row.datacap?scope.row.datacap: "0" | changeSize}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="notaries" label="DataCap Source" align="center">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.notaries!==null">
                                                    <div v-if="scope.row.notaries.length>70">
                                                        <div style="line-height: 15px; height: 32px;overflow: hidden;">
                                                            {{scope.row.notaries}}
                                                            {{scope.row.notaries.length}}
                                                        </div>
                                                    </div>
                                                    <div v-if="scope.row.notaries.length<=70">
                                                        {{scope.row.notaries}}
                                                    </div>
                                                </div>
                                                <div v-if="scope.row.notaries===null">----</div>
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
                                        <pagination :pager="pager2" @pagination="pagingChange2"></pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border-box mt30" :style="providerListStart===true?'height: 6.8rem':''">
                        <div class="box-content">
                            <p class="box-title-name">Order List
                                <el-tooltip class="item" effect="dark" content="Source: Blockchain" placement="right-start">
                                    <img src="@/assets/img/tips.png" class="tips4">
                                </el-tooltip>
                            </p>
                            <div class="table-list">
                                <div class="pl10 pr10 table-bg">
                                    <el-table :data="providerAll" style="width: 100%" :stripe="false" :border="false" :highlight-current-row="false">
                                        <el-table-column prop="deal_id" label="Order Id" align="center">
                                            <template slot-scope="scope">
                                                <div @click="orderUrl(scope.row.deal_id)" class="blue cursor">{{scope.row.deal_id}}</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="height_time" label="Creation Time" align="center"></el-table-column>
                                        <el-table-column prop="notary" label="File Size" align="center">
                                            <template slot-scope="scope">
                                                <span >{{scope.row.file_size | changeSize}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="client_address" label="Client’s Address" align="center">
                                            <template slot-scope="scope">
                                                <div class="cursor">
                                                    <el-popover placement="top-start" width="200" trigger="hover"
                                                                :content="scope.row.client_address">
                                                        <div slot="reference" class="blue">{{scope.row.client_address?scope.row.client_address: "----" | substring10}}</div>
                                                    </el-popover>
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
    import { sizeStorage, sizeStorage1 } from "../assets/common";
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
                providerList: {
                    basic_info: "",
                    order_details_list: [],
                    order_stat: "",
                },
                providerAll: [],
                pager1: {
                    pageNumber: 1,
                    pageSize: this.$store.state.pageSizeFirst,
                    total: 0,
                },
                userList: [],
                pager2: {
                    pageNumber: 1,
                    pageSize: this.$store.state.pageSizeFirst,
                    total: 0,
                },
                providerListStart: false,
                providerListStart2: false,
                listStart: false,
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
            this.provider();
            this.providerLists();
            this.userStorage();
        },
        methods: {
            clickUser(adds) {
                setCookie('searchV', '/user', 12);
                this.$router.push({
                    path: "/user",
                    query: {
                        id: adds,
                    }
                });
            },
            orderUrl (order){
                window.open("https://www.atpool.com/en/chain/order/"+order);
            },
            messagesUrl (order){
                window.open("https://www.atpool.com/zh/chain/msg/"+order);
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
                this.provider();
                this.providerLists();
                this.userStorage();
            },
            pagingChange2 (data) {
                this.pager2.pager = data.pageSize;
                this.pager2.pageNumber = data.pageNumber;
                this.userStorage();
            },
            userStorage() {
                api.provider_info_client_list({
                    provider_id: this.$route.query.id,
                    page_index: this.pager2.pageNumber,
                    page_size: 10,
                }).then( res => {
                    if (res.code === 0) {
                        if(res.data.total>10) {
                            this.providerListStart2 = true;
                        }
                        this.userList = res.data.data;
                        this.pager2.total = res.data.total;
                    }else {
                        this.userList = [];
                        this.pager2.total = res.data.total;
                    }
                });
            },
            pagingChange1 (data) {
                this.pager1.pager = data.pageSize;
                this.pager1.pageNumber = data.pageNumber;
                this.providerLists();
            },
            providerLists() {
                api.provider_info_order_details_list({
                    provider_id: this.$route.query.id,
                    page_index: this.pager1.pageNumber,
                    page_size: 10,
                }).then( res => {
                    if (res.code === 0) {
                        if(res.data.total>10) {
                            this.providerListStart = true;
                        }
                        this.providerAll = res.data.data;
                        this.pager1.total = res.data.total;
                    }else {
                        this.providerAll = [];
                        this.pager1.total = res.data.total;
                    }
                });
            },
            provider () {
                this.listStart = false;
                let myChart = echarts.init(this.$refs.statisticOrders);
                myChart.showLoading({
                    text: 'Loading...',
                    color: "#ffcdad",
                });
                myChart.clear();
                api.provider_info_basic_info({
                    provider_id: this.$route.query.id
                }).then( res => {
                    this.listStart = true;
                    if (res.code === 0) {
                        this.providerList = res.data;
                        if(res.data.order_stat) {
                            this.statisticOrders(res.data.order_stat, myChart);
                        }else {
                            myChart.hideLoading();
                            myChart.setOption(this.setOptionData);
                        }
                    }else {
                        myChart.hideLoading();
                        myChart.setOption(this.setOptionData);
                        this.providerList.basic_info = "";
                        this.$notify({
                            title: 'Error',
                            message: 'Unable to search for this content',
                            type: 'warning'
                        });
                    }
                });
            },
            statisticOrders(data, myChart) {
                let dataN = [], name = [];
                for(let key  in data){
                    name.push(key);
                    dataN.push(data[key]);
                }

                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter(params){
                            return params[0].name+'：'+sizeStorage(params[0].value.toString());
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
                        axisLabel: {
                            interval: 0,
                            formatter:function(value) {
                                return sizeStorage1(value)+ " TB";
                            }
                        },
                    }],
                    series: [
                        {
                            name: "Consumption",
                            data: dataN,
                            smooth: true,
                            type: 'line',
                            barWidth: 10,
                            itemStyle: {
                                color: "#f6843c",
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: '#fdeee4' },
                                    { offset: 1, color: '#fdf7f3' }
                                ])
                            },
                        },
                    ]
                });
                myChart.hideLoading();
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
