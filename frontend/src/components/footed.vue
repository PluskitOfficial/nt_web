<template>
    <div class="footed">
        <div class="w-auto">
            <p class="box clearfix">
                <img  src="@/assets/img/logo.png" class="fl logo">
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "footed",
        data() {
            return {
                detailInfo: {},
            };
        },
        created() {
            let timer = null;
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(function fn(){
                var oTop = document.body.scrollTop || document.documentElement.scrollTop;
                if(oTop > 0){
                    document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
                    timer = requestAnimationFrame(fn);
                }else{
                    cancelAnimationFrame(timer);
                }
            });
        },
        mounted() {

        },
        methods:{

        }
    };
</script>

<style scoped>

</style>
