<template>
    <div v-if="show">
        <div class="fullbg"></div>
        <div class="cards">
            <div class="upper">
                <img src="../../assets/bookCover.jpg"/>
                <h2>{{bookName}}</h2>
            </div>
            <div class="lower">
                <div class="nav">
                    <img class="cancel" @click="close()" src="../../assets/cancel.png"/>
                </div>
                <div class="description">
                    <div class="info">
                        <section>{{ bookIntro }}</section>
                    </div>
                    <button>buy</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "bookDetailPage",
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        bookId: {
            type: Number,
            required: true
        },
        bookName: {
            type: String,
            default: '人间失格'
        },
        bookIntro: {
            type: String,
            default: '全书由作者的序言、后记，以及主角大庭叶藏的三个手札组成，描写主角从青少年到中年，为了逃避现实而不断沉沦，经历自我放逐、酗酒、自杀、用药物麻痹自己，终于一步步走向自我毁灭的悲剧,全书由作者的序言、后记，以及主角大庭叶藏的三个手札组成，描写主角从青少年到中年，为了逃避现实而不断沉沦，经历自我放逐、酗酒、自杀、用药物麻痹自己，终于一步步走向自我毁灭的悲剧,全书由作者的序言、后记，以及主角大庭叶藏的三个手札组成，描写主角从青少年到中年，为了逃避现实而不断沉沦，经历自我放逐、酗酒、自杀、用药物麻痹自己，终于一步步走向自我毁灭的悲剧,全书由作者的序言、后记，以及主角大庭叶藏的三个手札组成，描写主角从青少年到中年，为了逃避现实而不断沉沦，经历自我放逐、酗酒、自杀、用药物麻痹自己，终于一步步走向自我毁灭的悲剧,全书由作者的序言、后记，以及主角大庭叶藏的三个手札组成，描写主角从青少年到中年，为了逃避现实而不断沉沦，经历自我放逐、酗酒、自杀、用药物麻痹自己，终于一步步走向自我毁灭的悲剧,全书由作者的序言、后记，以及主角大庭叶藏的三个手札组成，描写主角从青少年到中年，为了逃避现实而不断沉沦，经历自我放逐、酗酒、自杀、用药物麻痹自己，终于一步步走向自我毁灭的悲剧,全书由作者的序言、后记，以及主角大庭叶藏的三个手札组成，描写主角从青少年到中年，为了逃避现实而不断沉沦，经历自我放逐、酗酒、自杀、用药物麻痹自己，终于一步步走向自我毁灭的悲剧,全书由作者的序言、后记，以及主角大庭叶藏的三个手札组成，描写主角从青少年到中年，为了逃避现实而不断沉沦，经历自我放逐、酗酒、自杀、用药物麻痹自己，终于一步步走向自我毁灭的悲剧,全书由作者的序言、后记，以及主角大庭叶藏的三个手札组成，描写主角从青少年到中年，为了逃避现实而不断沉沦，经历自我放逐、酗酒、自杀、用药物麻痹自己，终于一步步走向自我毁灭的悲剧'
        }
    },
    data() {
        return {
            show: this.showDialog
        }
    },
    watch: {
        'showDialog'(showDialog) {
            this.show = showDialog
        }
    },
    methods: {
        close() {
            this.show = false
            this.$emit('close', this.show)
        }
    }
}
</script>


<style scoped>
.fullbg {
    background-color: #6d6d66;
    left: 0;
    opacity: 0.5;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    filter: alpha(opacity=50);
}
.cards{
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
}
.cards{
    animation:mymove 5s infinite;
}
@keyframes mymove {
    0% {
        transform: translateY(5px);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(5px);
    }
}
.cards {
    width: 650px;
    height: 450px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 2;
}

.upper {
    width: 650px;
    height: 450px;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    -moz-transform-style: preserve-3d;
    -moz-backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
}

.upper img {
    width: 650px;
    height: 400px;
}

.upper h2 {
    left: 0;
    top: 0;
    color: #515151;
    margin: 0;
    text-transform: uppercase;
    font-weight: 500;
}

.cards:hover div.lower {
    -moz-transform: rotateY(0);
    -webkit-transform: rotateY(0);
}

.cards:hover div.upper {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
}

.lower, .upper {
    position: absolute;
    transition: 1.5s ease-in-out;
    opacity: 0.9;
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    z-index: 2;
    background: #fff;
}

.lower {
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    padding: 10px;
    width: 650px;
    height: 450px;
    -moz-transform-style: preserve-3d;
    -moz-backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-transform: rotateY(-180deg);
    -webkit-transform: rotateY(-180deg);
}
.lower::before,
.lower::after {
    content: "";
    width: 2rem;
    height: 2rem;
    border: 2px solid rgba(255, 255, 255, 0.72);
    position: absolute;
    z-index: -5;
    opacity: .3;
    transition: .3s;
}
.lower::before {
    top: 1.2em;
    right: 1.2em;
    border-bottom-width: 0;
    border-left-width: 0;
}
.lower::after {
    bottom: 1.2em;
    left: 1.2em;
    border-top-width: 0;
    border-right-width: 0;
}
.cards:hover .lower::before,
.cards:hover .lower::after {
    width: calc(100% - 2.5em);
    height: calc(100% - 2.5em);
}

.nav {
    margin: 20px 20px 0 20px;
    color: #727272;
    text-transform: uppercase;
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.72);
    font-size: 12px;
}

.nav .cancel {
    z-index: 10;
    height: 20px;
    width: 20px;
    float: right;
    margin-top: -10px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.description {
    z-index: 10;
    margin: 0 20px;
    position: relative!important;
    height: 350px;
    display: flex;
    flex-direction: column;
}
.description section{
    margin-top: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    height: 300px;
    text-shadow:none;
    font-family: cursive;
    font-size: 14px;
    line-height: 20px;
    color: #727272;
}
.description section::-webkit-scrollbar
{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: rgba(0,0,0,0);
}
.description section::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: black;
}
.description button {
    outline: 0;
    text-align: center;
    background: none;
    border: 1px solid #d9d9d9;
    padding: 8px 0px;
    color: #515151;
    text-transform: uppercase;
    width: 125px;
    font-family: inherit;
    margin: 15px auto 0 auto;
    transition: all 0.3s ease;
    font-weight: 500;
}

.description button:hover {
    background: darken(white, 2%);
    border: 1px solid #aedaa6;
    color: #aedaa6;
    cursor: pointer;
}

</style>
