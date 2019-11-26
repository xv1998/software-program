<template>
    <section id="login" class="user">
        <div class="user_options-container">
            <div class="user_options-text">
                <div class="user_options-unregistered">
                    <h2 class="user_unregistered-title">Don't have an account?</h2>
                    <button v-on:click="change" class="user_unregistered-signup" id="signup-button">Sign up</button>
                </div>

                <div class="user_options-registered">
                    <h2 class="user_registered-title">Have an account?</h2>
                    <button v-on:click="change" class="user_registered-login" id="login-button">Login</button>
                </div>
            </div>

            <div class="user_options-forms" id="user_options-forms"  :class="{ 'bounceLeft': isSign, 'bounceRight' :isLogin}">
                <div class="user_forms-login">
                    <h2 class="forms_title">Login</h2>
                    <form class="forms_form">
                        <fieldset class="forms_fieldset">
                            <div class="forms_field">
                                <input type="text"  v-model="loginMess.account" placeholder="account" class="forms_field-input" required autofocus/>
                            </div>
                            <div class="forms_field">
                                <input type="password"  v-model="loginMess.password" placeholder="Password" class="forms_field-input" required/>
                            </div>
                        </fieldset>
                        <div class="forms_buttons">
                            <button type="button" class="forms_buttons-forgot">Forgot password?</button>
                            <input type="submit" @click="login()" value="Log In" class="forms_buttons-action">
                        </div>
                    </form>
                </div>
                <div class="user_forms-signup">
                    <h2 class="forms_title">Sign Up</h2>
                    <form class="forms_form">
                        <fieldset class="forms_fieldset">
                            <div class="forms_field">
                                <input type="text" v-model="signMess.account" placeholder="Full Name" class="forms_field-input" required/>
                            </div>
                            <div class="forms_field">
                                <input type="tel"  v-model="signMess.phone" placeholder="Phone" class="forms_field-input" required/>
                            </div>
                            <div class="forms_field">
                                <input type="password"  v-model="signMess.password" placeholder="Password" class="forms_field-input" required/>
                            </div>
                            <div class="forms_field">
                                <input type="text"  v-model="signMess.code" placeholder="Verification code" class="forms_field-input" required/>
                            </div>
                        </fieldset>
                        <div class="forms_buttons">
                            <input @click="signUp()" type="submit" value="Sign up" class="forms_buttons-action">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            isSign:true,
            isLogin:false,
            signMess:{
                "account":"",
                "password":"",
                "phone":"",
                "code":""
            },
            loginMess:{
                "account":"",
                "password":""
            }

        };
    },
    methods: {
        change: function () {
            this.isSign = !this.isSign;
            this.isLogin = !this.isLogin;
        },
        signUp: function () {
            let formData = new FormData();
            for(let key in this.signMess){
                formData.append(key,this.signMess[key]);
            }
            window.console.log(this.signMess);
        },
        login:function () {
            let formData = new FormData();
            for(let key in this.loginMess){
                formData.append(key,this.loginMess[key]);
            }
            this.$router.push({name:'mainPage'})
            window.console.log(this.loginMess);
        }
    }
}
</script>

<style scoped>
button{
    background-color: transparent;
    padding: 0;
    border: 0;
    outline: 0;
    cursor: pointer;
}
input{
    background-color: transparent;
    padding: 0;
    border: 0;
    outline: 0;
}
input::placeholder {
    font-size: .85rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    letter-spacing: .1rem;
    color: #ccc;
}
.user {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}

.user_options-container {
    position: relative;
    width: 80%;
}

.user_options-text {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: rgba(34, 34, 34, .85);
    border-radius: 3px;
}

.user_options-registered,
.user_options-unregistered {
    width: 50%;
    padding: 75px 45px;
    color: #fff;
    font-weight: 300;
}

.user_registered-title,
.user_unregistered-title {
    margin-bottom: 15px;
    font-size: 1.66rem;
    line-height: 1em;
}

.user_unregistered-text,
.user_registered-text {
    font-size: .83rem;
    line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
    margin-top: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 10px 30px;
    color: #fff;
    text-transform: uppercase;
    line-height: 1em;
    letter-spacing: .2rem;
    transition: background-color .2s ease-in-out, color .2s ease-in-out;
}

.user_registered-login:hover,
.user_unregistered-signup:hover {
    color: rgba(34, 34, 34, .85);
    background-color: #ccc;
}

.user_options-forms {
    position: absolute;
    top: 50%;
    left: 30px;
    width: calc(50% - 30px);
    min-height: 420px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 2px 0 15px rgba(0, 0, 0, .25);
    overflow: hidden;
    transform: translate3d(100%, -50%, 0);
    transition: transform .4s ease-in-out;
}

.user_options-forms .user_forms-login {
    transition: opacity .4s ease-in-out, visibility .4s ease-in-out;
}

.user_options-forms .forms_title {
    margin-bottom: 45px;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1em;
    text-transform: uppercase;
    color: #e8716d;
    letter-spacing: .1rem;
}
/*.forms_fieldset{*/
/*    border: none;*/
/*}*/
.forms_field:not(:last-of-type) {
    margin-bottom: 20px;
}

.forms_field-input {
    width: 80%;
    border-bottom: 1px solid #ccc;
    padding: 6px 20px 6px 6px;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    color: #AFAFAF;
    letter-spacing: .1rem;
    transition: border-color .2s ease-in-out;
}

.forms_field-input:focus {
    border-color: #AFAFAF;
}

.forms_buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 35px;
}

.forms_buttons-forgot {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: .1rem;
    color: #ccc;
    text-decoration: underline;
    transition: color .2s ease-in-out;
}

.forms_buttons-forgot:hover {
    color: #C2C2C2;
}

.forms_buttons-action {
    background-color: #e8716d;
    border-radius: 3px;
    padding: 10px 35px;
    font-size: 1rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: .1rem;
    transition: background-color .2s ease-in-out;
}

.forms_buttons-action:hover {
    background-color: #D76C69;
}

.user_forms-signup,
.user_forms-login {
    position: absolute;
    top: 30px;
    left: 40px;
    width: calc(100% - 80px);
    opacity: 0;
    visibility: hidden;
    transition: opacity .4s ease-in-out, visibility .4s ease-in-out, transform .5s ease-in-out;
}

.user_forms-signup {
    transform: translate3d(120px, 0, 0);
}

.user_forms-login {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    visibility: visible;
}

.bounceLeft {
    animation: bounceLeft 1s forwards;
}

.bounceLeft .user_forms-signup {
    animation: showSignUp 1s forwards;
}

.bounceLeft .user_forms-login {
    opacity: 0;
    visibility: hidden;
    transform: translate3d(-120px, 0, 0);
}

.bounceRight {
    animation: bounceRight 1s forwards;
}

@keyframes showSignUp {
    100% {
        opacity: 1;
        visibility: visible;
        transform: translate3d(0, 0, 0);
    }
}
@keyframes bounceLeft {
    0% {
        transform: translate3d(100%, -50%, 0);
    }
    50% {
        transform: translate3d(-30px, -50%, 0);
    }
    100% {
        transform: translate3d(0, -50%, 0);
    }
}
@keyframes bounceRight {
    0% {
        transform: translate3d(0, -50%, 0);
    }
    50% {
        transform: translate3d(calc(100% + 30px), -50%, 0);
    }
    100% {
        transform: translate3d(100%, -50%, 0);
    }
}
</style>
