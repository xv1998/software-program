<template>
    <div class="container">
        <div class="con"></div>
        <menuPage class="menu"></menuPage>
    </div>
</template>

<script>
    import menuPage from '../../components/common/menu'

    export default {
        name: "getBookRes",
        data() {
            return {
                oid: 0
            }
        },
        components: { menuPage },
        mounted: function () {
            this.oid = this.$route.params.oid
        }

    }
</script>

<style scoped>

</style>
