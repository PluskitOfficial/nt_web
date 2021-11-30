<template>
    <div class="home">
        <headed @fMethod="fMethod"></headed>
        <div class="content">
            <div class="top w-auto">
                <p class="title-name box"><img src="@/assets/img/icon-1.png">DataCap
                    <el-tooltip class="item" effect="dark" content="Source: Blockchain" placement="right-start">
                        <img src="@/assets/img/tips.png" class="tips">
                    </el-tooltip>
                </p>
                <div class="clearfix statistics-list">
                    <!--七日新增-->
                    <div class="border-box sevenDays" ref="sevenDays"></div>
                    <!--分配数据-->
                    <div class="border-box distributionData" ref="distributionData"></div>
                    <!--分布情况-->
                    <div class="border-box distribution" ref ='distribution'></div>
                </div>
                <p class="title-name box clearfix"><img src="@/assets/img/icon-8.png">Statistics
                    <el-tooltip class="item" effect="dark" content="Source: Blockchain" placement="right-start">
                        <img src="@/assets/img/tips.png" class="tips">
                    </el-tooltip>
                </p>
                <div class="statistics-list-details">
                    <div class="statistics-list-top clearfix list">
                        <div class="fl border-box">
                            <span>Total DataCap：</span>
                            <div class="clearfix statistics-title">
                                <label v-if="notaryDataStart">{{notaryData.total_data | changeSize}}</label>
                                <span v-if="!notaryDataStart" class="loading3" style="margin: 0;padding: 0">
                                    <span class="el-icon el-icon-loading" style="padding: 0;margin: 0; font-size: 20px; color: #848599;"></span>
                                    <label class="loading-texts">loading</label>
                                </span>
                            </div>
                        </div>
                        <div class="fl border-box">
                            <span>Active Notaries：</span>
                            <div class="clearfix statistics-title">
                                <label v-if="notaryDataStart">{{notaryData.nums}}</label>
                                <span v-if="!notaryDataStart" class="loading3" style="margin: 0;padding: 0">
                                    <span class="el-icon el-icon-loading" style="padding: 0;margin: 0; font-size: 20px; color: #848599;"></span>
                                    <label class="loading-texts">loading</label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="statistics-list-bottom list clearfix">
                        <div class="fl border-box">
                            <span>Regions：</span>
                            <div class="clearfix statistics-title">
                                <label v-if="notaryDataStart">{{notaryData.region_num}}</label>
                                <span v-if="!notaryDataStart" class="loading3" style="margin: 0;padding: 0">
                                    <span class="el-icon el-icon-loading" style="padding: 0;margin: 0; font-size: 20px; color: #848599;"></span>
                                    <label class="loading-texts">loading</label>
                                </span>
                            </div>
                        </div>
                        <div class="fl border-box">
                            <span>Notary Allocation in 24 Hours：</span>
                            <div class="clearfix statistics-title">
                                <label v-if="notaryDataStart">{{notaryData.distribution_data_1d | changeSize}}</label>
                                <span v-if="!notaryDataStart" class="loading3" style="margin: 0;padding: 0">
                                    <span class="el-icon el-icon-loading" style="padding: 0;margin: 0; font-size: 20px; color: #848599;"></span>
                                    <label class="loading-texts">loading</label>
                                </span>
                            </div>
                        </div>
                        <div class="fl border-box">
                            <span>Unallocated：</span>
                            <div class="clearfix statistics-title">
                                <label v-if="notaryDataStart">{{notaryData.undistribution | changeSize}}</label>
                                <span v-if="!notaryDataStart" class="loading3" style="margin: 0;padding: 0">
                                    <span class="el-icon el-icon-loading" style="padding: 0;margin: 0; font-size: 20px; color: #848599;"></span>
                                    <label class="loading-texts">loading</label>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="title-name box clearfix">
                    <img src="@/assets/img/icon-2.png">Notary
                    <el-tooltip class="item" effect="dark" content="Source: Github Repositories" placement="right-start">
                        <img src="@/assets/img/tips.png" class="tips">
                    </el-tooltip>
                </p>
                <div class="notary-list clearfix">
                    <div class="border-box" v-show="!notaryStart">
                        <div class="pl10 pr10 table-bg mt20 sort-list">
                            <!-- 前五公证人-->
                            <el-table :data="regionList" style="width: 100%" :stripe="false" :border="false"
                                      @sort-change="changeSort($event,'formData')">
                                <el-table-column label="Region" align="center" >
                                    <template slot-scope="scope">
                                        <div @click="clickNotary(scope.row.region)">
                                            <div v-if="scope.row.region.length>10">
                                                <div class="cursor fc" style="line-height: 15px; height: 32px;overflow: hidden;">
                                                    {{scope.row.region}}
                                                </div>
                                            </div>
                                            <div v-if="scope.row.region.length<10">
                                                <div class="cursor fc">
                                                    {{scope.row.region}}
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="num" label="Notories" align="center" width="105px;" sortable="custom">
                                </el-table-column>
                                <el-table-column prop="datacap" label="DataCaps" align="center" width="140px;" sortable="custom">
                                    <template slot-scope="scope">
                                        {{scope.row.datacap?scope.row.datacap: "0" | changeSize}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="allowance" label="Allocted" align="center" width="110px;" sortable="custom">
                                    <template slot-scope="scope">
                                        {{scope.row.allowance?scope.row.allowance: "0" | changeSize}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="handle_time" label="Efficiency" align="center" width="128px;" sortable="custom">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.handle_time}}</span> h
                                    </template>
                                </el-table-column>
                                <div slot="empty">
                                    <div class="loading" v-if="providerListStart4">
                                        <span class="el-icon el-icon-loading"></span>
                                        <div>Loading</div>
                                    </div>
                                    <div class="NODATA" v-if="!providerListStart4">
                                        <div class="dataN"><img src="@/assets/img/dataN.png"></div>
                                        <div class="textN"><span>No Data</span></div>
                                    </div>
                                </div>
                            </el-table>
                        </div>
                    </div>
                    <div class="border-box" ref="notarySevenDays" v-show="!notaryStart"></div>
                    <p class="clearfix back fl" @click="notaryStart=false" v-show="notaryStart">
                        <img class="fl" src="@/assets/img/back.png">
                        <span class="fl">back</span>
                    </p>
                    <div class="border-box notaryStart" style="" v-show="notaryStart">
                        <div class="pl10 pr10 table-bg mt20 sort-list">
                            <!-- 地区-前五公证人-->
                            <el-table :data="regionDetailsList" style="width: 100%" :stripe="false" :border="false"
                                      @sort-change="changeSort($event,'formDataTwo')">
                                <el-table-column label="Notary Name" align="center" >
                                    <template slot-scope="scope">
                                        <div @click="clickNotarys(scope.row.region)">
                                            <div v-if="scope.row.region.length>24">
                                                <div class="cursor fc" style="line-height: 15px; height: 32px;overflow: hidden;">
                                                    {{scope.row.region}}
                                                </div>
                                            </div>
                                            <div v-if="scope.row.region.length<=24">
                                                <div class="cursor fc">
                                                    {{scope.row.region}}
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="datacap" label="DataCaps" align="center" sortable="custom">
                                    <template slot-scope="scope">
                                        {{scope.row.datacap?scope.row.datacap: "0" | changeSize}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="allowance" label="Allocted" align="center" sortable="custom">
                                    <template slot-scope="scope">
                                        {{scope.row.allowance?scope.row.allowance: "0" | changeSize}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="available" label="DataCap Available" align="center"  sortable="custom">
                                    <template slot-scope="scope">
                                        {{scope.row.available?scope.row.available: "0" | changeSize}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="client_num" label="Allocted Clients" align="center" sortable="custom"></el-table-column>
                                <el-table-column prop="handle_time" label="Efficiency" align="center"  sortable="custom">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.handle_time}}</span> h
                                    </template>
                                </el-table-column>
                                <div slot="empty">
                                    <div class="loading" v-if="providerListStart5">
                                        <span class="el-icon el-icon-loading"></span>
                                        <div>Loading</div>
                                    </div>
                                    <div class="NODATA" v-if="!providerListStart5">
                                        <div class="dataN"><img src="@/assets/img/dataN.png"></div>
                                        <div class="textN"><span>No Data</span></div>
                                    </div>
                                </div>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content content2">
            <div class="top w-auto">
                <p class="title-name box"><img src="@/assets/img/icon-3.png">Ranking</p>
                <div class="notary-list clearfix hig">
                    <div class="border-box  border_bottom_left bg-c-w" style="width: 7.8rem; overflow: hidden" :style="providerListStart1===true?'height: 6.3rem':'height: auto'">
                        <div class="tips2">
                            <el-tooltip class="item" effect="dark" content="Source: Blockchain and Github Repositories" placement="right-start">
                                <img src="@/assets/img/tips.png" class="tips">
                            </el-tooltip>
                        </div>
                        <div class="box-content" style="border-bottom-left-radius: 0.6rem;">
                            <div class="pl10 pr10 table-bg mt20 sort-list">
                                <!-- 公证人 所属区域 平均处理时间 已分配 未分配   (平均处理时间Average processing time)-->
                                <el-table :data="applicationList" style="width: 100%" :stripe="false" :border="false"
                                          @sort-change="changeSort($event,'formData3')">
                                    <el-table-column prop="notary" label="Notary" align="center" >
                                        <template slot-scope="scope">
                                            <div @click="clickNotarys(scope.row.notary)">
                                                <div v-if="scope.row.notary.length>20">
                                                    <div class="cursor fc" style="line-height: 15px; height: 32px;overflow: hidden;">
                                                        {{scope.row.notary}}
                                                    </div>
                                                </div>
                                                <div v-if="scope.row.notary.length<20">
                                                    <div class="cursor fc">
                                                        {{scope.row.notary}}
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="region" label="Region" align="center" width="105px;">
                                    </el-table-column>
                                    <el-table-column prop="avg" label="Average Time" align="center" width="140px;" sortable="custom">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.avg}}</span> h
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="allocated_datacap" label="Allocated" align="center" width="110px;" sortable="custom">
                                        <template slot-scope="scope">
                                            {{scope.row.allocated_datacap?scope.row.allocated_datacap: "0" | changeSize}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="remain_datacap" label="Unallocated" align="center" width="128px;" sortable="custom">
                                        <template slot-scope="scope">
                                            {{scope.row.remain_datacap?scope.row.remain_datacap: "0" | changeSize}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="ratio" label="Ratio" align="center" width="100px;" sortable="custom">
                                        <template slot-scope="scope">
                                            {{scope.row.ratio | to2}}
                                        </template>
                                    </el-table-column>
                                    <div slot="empty">
                                        <div class="loading" v-if="providerListStart1">
                                            <span class="el-icon el-icon-loading"></span>
                                            <div>Loading</div>
                                        </div>
                                        <div class="NODATA" v-if="!providerListStart1">
                                            <div class="dataN"><img src="@/assets/img/dataN.png"></div>
                                            <div class="textN"><span>No Data</span></div>
                                        </div>
                                    </div>
                                </el-table>
                            </div>
                            <div class="clearfix paginationALL" style="text-align: center; bottom: 0.4rem; height: 30px; overflow: hidden;">
                                <pagination :pager="pager2" @pagination="pagingChange1"></pagination>
                            </div>
                        </div>
                    </div>
                    <div class="border-box border_bottom_right bg-c-w" style="width: 5.06rem;overflow: hidden" :style="providerListStart2===true?'height: 6.3rem':'height: auto'">
                        <div class="tips3">
                            <el-tooltip class="item" effect="dark" content="Source: Blockchain" placement="right-start">
                                <img src="@/assets/img/tips.png" class="tips">
                            </el-tooltip>
                        </div>
                        <div class="box-content" style="border-bottom-right-radius: 0.6rem;">
                            <!--<p class="box-title-name">List of orders received by storage supplier</p>-->
                            <div class="pl10 pr10 table-bg mt20 sort-list">
                                <!-- 存储供应商ID 接单数 平均处理时间-->
                                <el-table :data="supplierList" style="width: 100%" :stripe="false" :border="false" :highlight-current-row="false"
                                          @sort-change="changeSort($event,'formData4')">
                                    <el-table-column prop="provider" label="Storage Provider" align="center">
                                        <template slot-scope="scope">
                                            <span class="fc cursor" @click="clickProvider(scope.row.provider)">{{scope.row.provider}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="times" label="Storage Orders" align="center"  width="150px;" sortable="custom">
                                        <template slot-scope="scope">
                                            {{scope.row.times}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="file_size" label="Verified Data Storage" align="center" width="190px;" sortable="custom">
                                        <template slot-scope="scope">
                                            {{scope.row.file_size?scope.row.file_size: "0" | changeSize}}
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
                            </div>
                            <div class="clearfix paginationALL" style="text-align: center; bottom: 0.4rem; height: 30px; overflow: hidden;">
                                <pagination :pager="pager3" @pagination="pagingChange2"></pagination>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-box border_bottom_right border_bottom_left mt30 user-apply-list" :style="providerListStart3===true?'height: 6.4rem':'height: auto'">
                    <div class="box-content border_bottom_right border_bottom_left bg-bs">
                        <div class="tips3">
                            <el-tooltip class="item" effect="dark" content="Source: Github Repositories" placement="right-start">
                                <img src="@/assets/img/tips.png" class="tips">
                            </el-tooltip>
                        </div>
                        <div class="table-list pt30 sort-list" style="border-bottom-right-radius: 0.6rem;border-bottom-left-radius: 0.6rem;overflow: hidden">
                            <!--申请者 钱包地址 申请份额总量 已审核份额 申请次数-->
                            <el-table :data="userList" style="width: 100%" :stripe="false" :border="false" :highlight-current-row="false"
                                      @sort-change="changeSort($event,'formData5')">
                                <el-table-column prop="issue_id" label="Last IssueId" align="center" width="110">
                                    <template slot-scope="scope">
                                        <div class="fc cursor" @click="githubUrl(scope.row.github_url)"><img class="icon" src="@/assets/img/icon-7.png">{{scope.row.issue_id}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="Client" align="center" width="280">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.name.length>34">
                                            <div class="cursor" style="line-height: 15px; height: 32px;overflow: hidden;">
                                                {{scope.row.name}}
                                            </div>
                                        </div>
                                        <div v-if="scope.row.name.length<=34">
                                            {{scope.row.name}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="media" label="Website" align="center" width="280">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.media">
                                            <div v-if="scope.row.media.length>34">
                                                <div class="cursor" style="line-height: 15px; height: 32px;overflow: hidden;">
                                                    {{scope.row.media}}
                                                </div>
                                            </div>
                                            <div v-if="scope.row.media.length<=34">
                                                {{scope.row.media}}
                                            </div>
                                        </div>
                                        <div v-if="!scope.row.media">----</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="apply_address" label="Address" align="center">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.apply_address" @click="clickUser(scope.row.apply_address)" class="fc cursor">
                                            {{scope.row.apply_address?scope.row.apply_address: "----" | substring10}}
                                        </div>
                                        <div v-if="!scope.row.apply_address">----</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="request_datacap" label="Total Need" align="center" width="120" sortable="custom">
                                    <template slot-scope="scope">
                                        {{scope.row.request_datacap?scope.row.request_datacap: "0" | changeSize}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="allocated_datacap" label="Allocated" align="center" width="120" sortable="custom">
                                    <template slot-scope="scope">
                                        {{scope.row.allocated_datacap?scope.row.allocated_datacap: "0" | changeSize}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="times" label="Times" align="center" width="110" sortable="custom">
                                    <template slot-scope="scope">
                                        {{scope.row.times}}
                                    </template>
                                </el-table-column>
                                <div slot="empty">
                                    <div class="loading" v-if="providerListStart3">
                                        <span class="el-icon el-icon-loading"></span>
                                        <div>Loading</div>
                                    </div>
                                    <div class="NODATA" v-if="!providerListStart3">
                                        <div class="dataN"><img src="@/assets/img/dataN.png"></div>
                                        <div class="textN"><span>No Data</span></div>
                                    </div>
                                </div>
                            </el-table>
                            <div class="clearfix paginationALL paginationALL2" style="text-align: center; margin-top: 0.2rem; height: 0.4rem">
                                <pagination :pager="pager1" @pagination="pagingChange"></pagination>
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
    const echarts = require('echarts');
    import { setCookie, getCookie, delCookie } from "@/util/storage";

    // let myChart = echarts.init(this.$refs.chart);
    export default {
        name: "home",
        components:{
            headed,
            footed,
            pagination,
        },
        data() {
            return {
                /*分配效率榜*/
                pager2: {
                    pageNumber: 1,
                    pageSize: this.$store.state.pageSizeFirst,
                    total: 0,
                },
                applicationList: [],
                /*存储供应商接单榜*/
                pager3: {
                    pageNumber: 1,
                    pageSize: this.$store.state.pageSizeFirst,
                    total: 0,
                },
                supplierList: [],
                /*用户申请榜*/
                pager1: {
                    pageNumber: 1,
                    pageSize: this.$store.state.pageSizeFirst,
                    total: 0,
                },
                userList: [],
                /*公证人*/
                notary_list: [],
                notary_value: "",
                notaryData: "",
                notaryDataStart: false,
                providerListStart1: false,
                providerListStart2: false,
                providerListStart3: false,
                providerListStart4: false,
                providerListStart5: false,
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

                regionList: [],
                notaryStart: false,
                regionName: "",
                regionDetailsList: [],
                formData: {
                    sort_type: "",
                    num: "",
                    datacap: "",
                    allowance: "",
                    handle_time: "",
                },
                formDataTwo: {
                    sort_type: "",
                    client_num: "",
                    datacap: "",
                    allowance: "",
                    available: "",
                    handle_time: "",
                },
                formData3: {
                    sort_type: "",
                    avg: "",
                    allocated_datacap: "",
                    remain_datacap: "",
                    ratio: "",
                },
                formData4: {
                    sort_type: "",
                    times: "",
                    file_size: "",
                },
                formData5: {
                    sort_type: "",
                    request_datacap: "",
                    allocated_datacap: "",
                    times: "",
                },
            };
        },
        filters: {
            to2(e){
                let val = parseFloat(e).toFixed(2)+"%";
                return val;
            },
        },
        computed:{

        },
        created() {

        },
        mounted () {
            this.sevenDays(); //七日新增
            this.distributionData(); //分配数据
            this.distribution(); //分布情况
            this.notarySevenDays(); //公证人7日 处理效率
            this.notaryDistribution([]); //公证人分配情况
            this.application(); //分配效率榜
            this.supplier(); //供应商榜
            this.user(); //用户申请榜
            this.notaryList(); //公证人列表
            this.notarySeven(); //前五公证人
        },
        methods: {
            /*前五公证人*/
            notarySeven() {
                this.regionList = [];
                this.providerListStart4 = true;
                api.region_disribution_rate({
                    sort_type: this.formData.sort_type,
                }).then( res => {
                    if (res.code === 0) {
                        if(res.data.length) {
                            this.providerListStart4 = false;
                        }
                        this.regionList = res.data;
                    }else {
                        this.providerListStart4 = false;
                    }
                });
            },
            /*table 排序*/
            changeSort(column,form) {
                let fieldName = column.prop;
                let sortType = column.order;
                if(sortType==="ascending") {
                    // 升序
                    this[form][fieldName] = true;
                }else if(sortType==="descending") {
                    // 降序
                    this[form][fieldName] = false;
                }else {
                    // 没有排序
                    this[form][fieldName] = "";
                }

                if (form ==='formData') {
                    if(fieldName ==="num") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?1:2;
                    }else if(fieldName ==="datacap") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?3:4;
                    }else if(fieldName ==="allowance") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?5:6;
                    }else if(fieldName ==="handle_time") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?7:8;
                    }
                    this.notarySeven();
                }else if(form === 'formDataTwo') {
                    if(fieldName ==="client_num") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?1:2;
                    }else if(fieldName ==="datacap") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?3:4;
                    }else if(fieldName ==="allowance") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?5:6;
                    }else if(fieldName ==="available") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?7:8;
                    }else if(fieldName ==="handle_time") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?9:10;
                    }
                    this.regionDetails();
                }else if(form === 'formData3') {
                    if(fieldName ==="avg") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?1:2;
                    }else if(fieldName ==="allocated_datacap") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?3:4;
                    }else if(fieldName ==="remain_datacap") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?5:6;
                    }else if(fieldName ==="ratio") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?7:8;
                    }
                    this.application();
                }else if(form === 'formData4') {
                    if(fieldName ==="times") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?1:2;
                    }else if(fieldName ==="file_size") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?3:4;
                    }
                    this.supplier();
                }else if(form === 'formData5') {
                    if(fieldName ==="request_datacap") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?1:2;
                    }else if(fieldName ==="allocated_datacap") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?3:4;
                    }else if(fieldName ==="times") {
                        this[form].sort_type = this[form][fieldName]===""?"":this[form][fieldName]===true?5:6;
                    }
                    this.user();
                }
            },
            /*跳转用户*/
            clickUser(adds) {
                setCookie('searchV', '/user', 12);
                this.$router.push({
                    path: "/user",
                    query: {
                        id: adds,
                    }
                });
            },
            /*跳转公证人*/
            clickNotarys(adds) {
                setCookie('searchV', '/notary', 12);
                this.$router.push({
                    path: "/notary",
                    query: {
                        id: adds,
                    }
                });
            },
            /*跳转服务商*/
            clickProvider(adds) {
                setCookie('searchV', '/provider', 12);
                this.$router.push({
                    path: "/provider",
                    query: {
                        id: adds,
                    }
                });
            },
            /*公证人列表*/
            clickNotary(region) {
                this.notaryStart = true;
                this.regionName = region;
                this.formDataTwo.sort_type= "";
                this.regionDetails();
            },
            /*地区-公证人详情*/
            regionDetails() {
                this.regionDetailsList = [];
                this.providerListStart5 = true;
                api.region_notary_disribution_rate({
                    sort_type: this.formDataTwo.sort_type,
                    region: this.regionName,
                }).then( res => {
                    if (res.code === 0) {
                        if(res.data.length) {
                            this.providerListStart5 = false;
                        }
                        this.regionDetailsList = res.data;
                    }else {
                        this.providerListStart5 = false;
                    }
                });
            },
            githubUrl(url) {
                window.open(url);
            },
            fMethod() {
                this.sevenDays(); //七日新增
                this.distributionData(); //分配数据
                this.distribution(); //分布情况
                this.notarySevenDays(); //公证人7日 处理效率
                this.notaryDistribution(); //公证人分配情况
                this.application(); //分配效率榜
                this.supplier(); //供应商榜
                this.user(); //用户申请榜
                this.notaryList(); //公证人列表
            },
            /*公证人列表*/
            notaryList () {
                // api.show_notary_info_list().then( res => {
                //     if (res.code === 0) {
                //         this.notary_list = res.data;
                //     }
                // });
            },
            application() {
                api.notary_handle_efficiency_borad({
                    page_index: this.pager2.pageNumber,
                    page_size: 10,
                    sort_type: this.formData3.sort_type,
                }).then( res => {
                    if (res.code === 0) {
                        if(res.data.length>10) {
                            this.providerListStart1 = true;
                        }
                        this.applicationList = res.data.data;
                        this.pager2.total = res.data.length;
                    }
                });
            },
            pagingChange1 (data) {
                this.pager2.pager = data.pageSize;
                this.pager2.pageNumber = data.pageNumber;
                this.application();
            },
            /*供应商榜*/
            supplier() {
                api.provider_borad({
                    page_index: this.pager3.pageNumber,
                    page_size: 10,
                    sort_type: this.formData4.sort_type,
                }).then( res => {
                    if (res.code === 0) {
                        if(res.data.length>10) {
                            this.providerListStart2 = true;
                        }
                        this.supplierList = res.data.data;
                        this.pager3.total = res.data.length;
                    }
                });
            },
            pagingChange2 (data) {
                this.pager3.pager = data.pageSize;
                this.pager3.pageNumber = data.pageNumber;
                this.supplier();
            },
            /*用户申请榜*/
            user() {
                api.request_borad({
                    page_index: this.pager1.pageNumber,
                    page_size: 10,
                    sort_type: this.formData5.sort_type,
                }).then( res => {
                    if (res.code === 0) {
                        if(res.data.length>10) {
                            this.providerListStart3 = true;
                        }
                        this.userList = res.data.data;
                        this.pager1.total = res.data.length;
                    }
                });
            },
            pagingChange (data) {
                this.pager1.pager = data.pageSize;
                this.pager1.pageNumber = data.pageNumber;
                this.user();
            },
            //七日新增
            sevenDays () {
                let myChart = echarts.init(this.$refs.sevenDays);
                myChart.showLoading({
                    text: 'Loading...', //字体
                    color: "#ffcdad",  //字体颜色
                });
                myChart.clear();
                api.new_seven_data().then( res => {
                    if (res.code === 0) {
                        if(res.data) {
                            let dataN = [], nameN= [], count= [];
                            for(let i=0;i<res.data.length;i++){
                                dataN.push(res.data[i].allowance);
                                nameN.push(res.data[i].time);
                                count.push(res.data[i].count);
                            }
                            this.sevenDaysEcharts(nameN,dataN, count, myChart);
                        }else {
                            myChart.hideLoading();
                            myChart.setOption(this.setOptionData);
                        }
                    }else {
                        myChart.setOption(this.setOptionData);
                        myChart.hideLoading();
                    }
                });
            },
            sevenDaysEcharts(name, data, count, myChart) {
                myChart.setOption({
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: name,
                            axisLabel: {
                                color: "rgba(0,0,0,0)"
                            },
                        },
                    ],
                    grid: {
                        x: 64,
                        y: 70,
                        x2: 64,
                        y2: 20, //距离下边的距离
                        // containLabel: true,
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter(params){
                            let data = params[0].name+'<br/>';
                            data+= "Allocated："+sizeStorage(params[0].value.toString())+'<br/>';
                            data+= "Times："+params[1].value+'<br/>';
                            return data;
                        },
                    },
                    yAxis: [
                        {
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
                        },
                        {
                            type: 'value',
                            nameTextStyle: {
                                color: '#ffffff'
                            },
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                interval: 0,
                                formatter:function(value) {
                                    return value+ " Times";
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            type: 'bar',
                            yAxisIndex: 0,
                            barWidth: '30%',
                            data: data,
                            //配置样式
                            itemStyle: {
                                normal: {
                                    color: "#F6843C"
                                },
                            },
                        },
                        {
                            yAxisIndex: 1,
                            color: '#FDD866',
                            symbol: 'circle',     //设定为实心点
                            symbolSize: 8,   //设定实心点的大小
                            lineStyle: {
                                normal: {
                                    color: "#FDD866",
                                    width: 3,
                                },
                            },
                            type: 'line',
                            data: count
                        }
                    ]
                });
                myChart.hideLoading();
            },
            //分配数据
            distributionData() {
                let myChart = echarts.init(this.$refs.distributionData);
                myChart.showLoading({
                    text: 'Loading...', //字体
                    color: "#ffcdad",  //字体颜色
                });
                myChart.clear();
                api.distribution_data().then( res => {
                    if (res.code === 0) {
                        if(res.data) {
                            this.distributionDataEcharts(parseInt(res.data.total_data)-parseInt(res.data.distribution_data),res.data.distribution_data,res.data.total_data, myChart);
                        }else {
                            myChart.hideLoading();
                            myChart.setOption(this.setOptionData);
                        }
                    }else {
                        myChart.hideLoading();
                        myChart.setOption(this.setOptionData);
                    }
                });
            },
            distributionDataEcharts(Undistributed,Distributed,All, myChart) {
                myChart.setOption({
                    title: {
                        text: sizeStorage(All.toString()),
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
                            data: [
                                {value: Distributed, name: 'Allocated'},
                                {value: Undistributed, name: 'Unallocated'},
                            ],
                            label: {
                                formatter(params){
                                    return params.name+'\n'+params.percent+'%';
                                },
                                color: "#ffa165"
                            },
                            itemStyle: {
                                color: function(params) {
                                    let colorList = ['#ffa165','#d7d7d8'];
                                    return colorList[params.dataIndex];
                                },
                            },
                        }
                    ]
                });
                myChart.hideLoading();
            },
            //分布情况
            distribution() {
                let myChart = echarts.init(this.$refs.distribution);
                myChart.showLoading({
                    text: 'Loading...', //字体
                    color: "#ffcdad",  //字体颜色
                });
                myChart.clear();
                api.notary_region_rate().then( res => {
                    if (res.code === 0) {
                        if(res.data) {
                            let dataN = [], num = 0;
                            for(let key  in res.data){
                                let obj = {};
                                obj.name = key;
                                obj.value = res.data[key];
                                dataN.push(obj);
                                num+=parseInt(res.data[key]);
                            }
                            this.distributionEcharts(dataN, sizeStorage(num.toString()), myChart);
                        }else {
                            myChart.hideLoading();
                            myChart.setOption(this.setOptionData);
                        }
                    }else {
                        myChart.hideLoading();
                        myChart.setOption(this.setOptionData);
                    }
                });
            },
            distributionEcharts(data, All, myChart) {
                myChart.setOption({
                    title: {
                        text: All,
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
                            data: data,
                            label: {
                                formatter(params){
                                    return params.name+'\n'+params.percent+'%';
                                },
                                color: "#ffa165"
                            },
                            itemStyle: {
                                color: function(params) {
                                    let colorList = ['#F6843C','#ffb383','#ffc8a5','#ffdbc3','#d7d7d8'];
                                    return colorList[params.dataIndex];
                                },
                            },
                        }
                    ]
                });
                myChart.hideLoading();
            },
            //公证人处理效率
            notarySevenDays(e) {
                let myChart = echarts.init(this.$refs.notarySevenDays);
                myChart.showLoading({
                    text: 'Loading...', //字体
                    color: "#ffcdad",  //字体颜色
                });
                myChart.clear();
                let data = [];
                for(let key  in e){
                    data.push(e[key]);
                }
                api.handle_efficiency().then( res => {
                    if (res.code === 0) {
                        if(res.data.length) {
                            let max = [], avg = [], min= [], nameN= [];
                            for(let key  in res.data){
                                nameN.push(res.data[key].name);
                                max.push(res.data[key].max);
                                avg.push(res.data[key].avg);
                                min.push(res.data[key].min);
                            }
                            this.notarySevenDaysEcharts(nameN,max,avg,min, myChart);
                        }else {
                            myChart.hideLoading();
                            myChart.setOption(this.setOptionData);
                        }
                    }else {
                        myChart.hideLoading();
                        myChart.setOption(this.setOptionData);
                    }
                });
            },
            notarySevenDaysEcharts(name,max,avg,min, myChart) {
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter(params){
                            let data = params[0].axisValueLabel+'<br/>';
                            for (let i=0;i<params.length;i++) {
                                data+= params[i].marker+params[i].seriesName+'：'+params[i].value+' hours<br/>';
                            }
                            return data;
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: name,
                            axisLabel: {
                                color: "rgba(0,0,0,0)"
                            },
                        }
                    ],
                    legend: {
                        data: ['Longest', 'Average', 'Shortest'],
                        // orient: 'vertical',  //垂直显示
                        y: '20',    //延Y轴居中
                        right: '5',
                        itemWidth: 16, // 图例标记的图形宽度。
                        itemHeight: 8, //  图例标记的图形高度。

                    },
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            interval: 0,
                            formatter:function(value) {
                                return value+ " Hour";
                            }
                        },
                        splitLine: {
                            show: false,
                        },
                    }],

                    grid: {
                        x: 80,
                        y: 60,
                        x2: 40,
                        y2: 20 //距离下边的距离
                    },
                    series: [
                        {
                            name: "Longest", //最长消耗时长Longest consumption time
                            data: max,
                            type: 'bar',
                            barGap: 0,
                            // barWidth: 10,
                            itemStyle: {
                                color: "#d3d3d5",
                            },
                        },
                        {
                            name: "Average", //平均处理时长Average processing time
                            data: avg,
                            type: 'bar',
                            // barWidth: 10,
                            itemStyle: {
                                color: "#ffa165",
                            },
                        },
                        {
                            name: "Shortest", //最短消耗时长Shortest consumption time
                            data: min,
                            type: 'bar',
                            // barWidth: 10,
                            itemStyle: {
                                color: "#f6843c",
                            },
                        },
                    ]
                });
                myChart.hideLoading();
            },
            //公证人分配情况
            notaryDistribution(e) {
                let data = [];
                for(let key  in e){
                    data.push(e[key]);
                }
                api.notary_distribution_data().then( res => {
                    if (res.code === 0) {
                        this.notaryData = res.data;
                        this.notaryDataStart = true;
                    }
                });
            },
        },
    };
</script>
<style lang="scss">
    @import '../styles/home';
</style>
<style>
    .el-table .ascending .sort-caret.ascending {
        border-bottom-color: #F6843C;
    }
    .el-table .descending .sort-caret.descending {
        border-top-color: #F6843C;
    }
    .sort-list .el-table .cell {
        line-height: 34px;
    }
</style>
