<template>
    <div class="head">
        <div class="w-auto clearfix">
            <div class="clearfix">
                <img @click="clickHome()" src="@/assets/img/logo.png" class="fl logo">
                <el-tooltip class="item" effect="dark" content="Update time: 00:00 Beijing time" placement="right-start">
                    <img src="@/assets/img/tips.png" class="tips fl">
                </el-tooltip>
            </div>
            <div class="clearfix search-div">
                <el-select class="fl" v-model="search_select" @change="cSearch" placeholder="Please select" style="width: 2.4rem">
                    <el-option
                        v-for="item in search_list"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-show="!searchList" class="fl search-input" v-model="search_value" ref="focusC" placeholder="Address"></el-input>
                <el-select v-show="searchList" class="fl selects" v-model="search_value"  @change="cSelect"  ref="focusS" placeholder="Address/Name" filterable style="width: 9.51rem;left: -0.01rem">
                    <el-option
                            v-for="(item,index) in listData"
                            :key="index"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
                <el-button class="fl search-button" @click="searchAll" type="warning">Search</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import api from "@/api/api.js";
    import { setCookie, getCookie, delCookie } from "@/util/storage";
    export default {
        name: "headed",
        data() {
            return {
                search_select: "",
                search_selectStart: false,
                search_list: [{
                    value: '/user',
                    label: 'Client'
                }, {
                    value: '/provider',
                    label: 'Provider'
                }, {
                    value: '/notary',
                    label: 'Notary'
                }],
                search_value: this.$route.query.id,
                listData: [],
                searchList: false,
                select_value: this.$route.query.id,
                userList: [],
            };
        },
        created() {
            this.list();
            if(getCookie('searchV')) {
                let arrFilter = this.search_list.filter(ele => ele.value === getCookie('searchV'));
                this.search_select = arrFilter[0].label;
            }
        },
        mounted() {

        },
        watch: {

        },
        methods:{
            list() {
                api.get_name().then( res => {
                    if (res.code === 0) {
                        this.userList = res.data;
                        if(getCookie('searchV')) {
                            let arrFilter = this.search_list.filter(ele => ele.value === getCookie('searchV'));
                            if(arrFilter[0].value =="/notary") {
                                this.listData = this.userList.notary_list;
                                this.searchList = true;
                            }
                        }
                    }
                });
            },
            cSelect() {

            },
            cSearch() {

                this.search_selectStart = true;

                if(this.search_select=="/notary") {
                    this.listData = this.userList.notary_list;
                    this.searchList = true;
                    this.$nextTick(() => {
                        this.$refs['focusS'].focus();
                    });
                }else{
                    this.searchList = false;
                    this.$nextTick(() => {
                        this.$refs['focusC'].focus();
                    });
                }
            },
            searchAll() {
                if(this.search_select==='') {
                    return;
                }
                if (this.search_selectStart===false) {
                    let url = this.search_list.filter(ele => ele.label === this.search_select);

                    if (this.$route.path===url[0].value) {
                        if(!this.search_value == "") {
                            this.$emit("fMethod",this.search_value);
                        }
                    }else if(!this.search_value=="") {
                        setCookie('searchV', url[0].value, 12);
                        this.$router.push({
                            path: url[0].value,
                            query: {
                                id: this.search_value,
                            }
                        });
                    }
                }else {
                    if (this.$route.path===this.search_select) {
                        if(!this.search_value == "") {
                            this.$emit("fMethod",this.search_value);
                        }
                    }else if(!this.search_value=="") {
                        let arrFilter = this.search_list.filter(ele => ele.value === this.search_select);
                        setCookie('searchV', arrFilter[0].value, 12);
                        this.$router.push({
                            path: this.search_select,
                            query: {
                                id: this.search_value,
                            }
                        });
                    }
                }
            },
            clickHome() {
                if(this.$route.path==='/home'){
                    this.$emit("fMethod");
                    return;
                }
                delCookie("searchV");
                this.$router.push({
                    path: '/home',
                });
            },
        }
    };
</script>
<style>
    .head .el-input__inner:focus::placeholder {
        color: #F6843C;
    }
</style>
<style lang="scss">

</style>
