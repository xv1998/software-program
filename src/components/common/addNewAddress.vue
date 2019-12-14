<template>
    <section>
    <VDistpicker></VDistpicker>
    <el-form ref="form" :model="form">
        <el-form-item>
            <el-input v-model="form.address"></el-input>
        </el-form-item>
    </el-form>
    </section>
</template>

<script>
    import VDistpicker from 'v-distpicker'

    export default {
        name: "addNewAddress",
        data() {
            return {
                form:{

                }
            }
        },
        components: {
            VDistpicker
        }
    }
</script>

<style scoped>

</style>
