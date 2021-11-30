<template>
    <div class="home">
        <div >
            <headed></headed>
            <div class="content clear-radius">
                <div class="top w-auto">
                    <!--基础信息-->
                    <div class="message clearfix pt30">
                        <div class="border-box bg-color" style="height: 4rem">
                            <div class="box-content" ref="notarySevenDays">
                                <p class="box-title-name">Overview message</p>
                                <div class="data-list">
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Message ID</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.msg_cid}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Block height</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.height}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Time</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{ messages.height_time }}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Sender</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.msg_from}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Receiver</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.msg_to}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Receiver</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.msg_method_name}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Amount</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.msg_value}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Status</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.exit}}</div></el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content content2">
                <div class="top w-auto">
                    <div class="message clearfix pt30">
                        <div class="border-box bg-color " style="height: 4rem">
                            <div class="box-content" ref="notarySevenDays">
                                <p class="box-title-name">Other message</p>
                                <div class="data-list">
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Label(API)</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.msg_nonce}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Gas Fee Cap</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.msg_gas_fee_cap}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Gas Premium</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.msg_gas_premium}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Gas Gas limit</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.msg_gas_limit | changeSize}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Gas Usage</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.gascost_gas_used | changeSize}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">GBurn Fee</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.base_fee}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Parameter</div></el-col>
                                        <el-col :span="20">
                                            <div class="data-list-right">
                                                {{messages.msg_params}}
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4"><div class="data-list-left">Return value</div></el-col>
                                        <el-col :span="20"><div class="data-list-right">{{messages.msg_return}}</div></el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div >
            <footed></footed>
        </div>
    </div>
</template>
<script>
    import api from "@/api/api.js";
    import headed from "@/components/headed";
    import footed from "@/components/footed";
    import { sizeStorage } from "../assets/common";

    export default {
        name: "home",
        components:{
            headed,
            footed,
        },
        data() {
            return {
                messages: "",
            };
        },
        filters: {

        },
        computed:{

        },
        created() {

        },
        mounted () {
            this.messagesList();//消息详情
        },
        methods: {
            messagesList() {
                api.query_msg({
                    msg_cid: this.$route.query.id
                }).then( res => {
                    if (res.code === 0) {
                        this.messages = res.data;
                    }
                });
            }
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
