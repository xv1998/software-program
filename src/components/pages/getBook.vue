<template>
    <section class="getBook_Container">
        <div class="bookContainer">
            <div class="book-pic-container">
                <img src="../../assets/bookCover.jpg"/>
            </div>
            <div class="bookInfo">
                <div class="bookname">{{bookName}}</div>
                <div class="bookdescription">{{bookdescript}}</div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "getBook",
        data() {
            return {
                bookName: "《活着》",
                bookdescript: "你好"
            }
        }
    }
</script>

<style scoped>

    @media screen and (min-width: 1921px) {

        .getBook_Container {
            font-size: 108px;
        }
    }

    @media screen and (max-width: 1920px) and (min-width: 1521px) {


        .getBook_Container {
            font-size: 100px;
        }

    }

    @media screen and (max-width: 1520px) and (min-width: 1281px) {
        body {
        }

        .getBook_Container {
            font-size: 80px;
        }
    }

    @media screen and (max-width: 1280px) and (min-width: 1024px) {
        body {
        }

        .getBook_Container {
            font-size: 66px;
        }
    }

    @media screen and (min-width: 1024px) {
        body {
        }
    }

    @media screen and (max-width: 1023px) {
        body {
        }
    }

    @media screen and (max-width: 1023px), screen and (max-height: 767px) {
        .getBook_Container{
            font-size:66px;
        }
    }
    .getBook_Container{
        padding:0 2em;
    }
    .bookContainer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .book-pic-container{
        height:5em;
        width:5em;
        border:0.01em rgba(119,136,153,0.4) bold;
    }
    .book-pic-container img{
        max-height:4.9em;
        max-width:4.9em;
        height:auto;
        width:auto;
    }
</style>
