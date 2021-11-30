<template>
    <div>
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.pageNumber"
            :page-sizes="pageSizesList"
            :page-size="pager.pageSize"
            layout="prev, pager, next"
            :total="pager.total"
            :hide-on-single-page="true"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "pagination",
        props: {
            pager: Object
        },
        data() {
            return {
                pageSizesList: this.$store.state.pageList,
            };
        },
        methods: {
            handleSizeChange(val) {
                const data = {
                    pageSize: val,
                    pageNumber: 1
                };
                this.$emit("pagination", data);
            },
            handleCurrentChange(val) {
                const data = {
                    pageSize: this.pager.pageSize,
                    pageNumber: val
                };
                this.$emit("pagination", data);
            }
        }
    };
</script>

<style scoped></style>
