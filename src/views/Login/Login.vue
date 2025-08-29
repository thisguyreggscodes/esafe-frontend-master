<template>
    <Header/>
    <div class="container" v-on:keyup.enter="shareData()">
        <div class="display-5 ff-restora text-center text-maincolor mt-3 pt-5">
            Welcome back!
        </div>

        <div class="login-form mt-5 rounded bg-white p-5 mx-auto shadow shadow-sm" style="max-width:600px">
            <RouterLink to="/home" class=" btn shadow-md shadow rounded-circle border">
                <i class="bi bi-arrow-left m-0 p-0 fs-5"></i>
            </RouterLink>
            <h3 class="ff-restora text-boldcolor mt-5 mb-4">
                Sign in with your account
            </h3>
            <div class="mb-3">
                <label for="email" class=" text-boldcolor fw-bold mb-2">Email Address</label>
                <input type="email" @keyup.enter.native="shareData" name="email" v-model.trim="inputs.email" id="email" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="password" class="text-boldcolor fw-bold mb-2">Password</label>
                <input type="password" @keyup.enter.native="shareData" name="password" id="password" v-model.trim="inputs.password" class="form-control">
            </div>
            <div class="d-flex justify-content-end mt-3 align-items-center mb-5">
                <small class="m-0 text-muted me-3">Forgot your password?</small>
                <RouterLink to="/forgotpassword" class="fw-bolder btn border-maincolor border px-4 rounded-pill">
                    <small>Reset password</small>
                </RouterLink>
            </div>

            <!-- SANDBOX BUTTON -->
            <button
                type="button"
                class="bg-secondary btn px-4 py-3 text-light fw-bold rounded-pill d-block w-100 mb-3"
                @click="fillSandbox"
            >
                Use Sandbox Account
            </button>

            <button class="bg-main btn px-4 py-3 text-light fw-bold rounded-pill d-block w-100 mb-3" @click="shareData()" v-on:keyup.enter="shareData">
                Login
                <kbd class="ms-2 text-muted bg-light">
                    <small>
                        <i class="bi bi-arrow-return-left me-1"></i>Enter
                    </small>
                </kbd>
            </button>
        </div>
    </div>
    <Footer/>
    
    <ErrorModal v-if="error.status" v-bind:toggleError="() => error.status = false">
        <h3 class="mt-5 mb-3 text-danger fw-bolder">{{error.title}}</h3>
        <small class="text-muted">{{error.message}}</small>
    </ErrorModal>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import axios from 'axios'
import ErrorModal from '../../components/ErrorModal.vue'

export default {
    name : "Login",
    components : {
        Header,
        Footer,
        ErrorModal,
    },
    data(){
        return {
            inputs : {
                email : null,
                password : null,
            },
            error : {
                status : false,
                title : null,
                message : null
            }
        }
    },
    
    methods : {
        async checkProperties(obj,except = []) {
            for(const [key, value] of Object.entries(obj)){
                if(!(value) && (except.indexOf(key) == -1) ) return false
            }
            return true
        },

        fillSandbox() {
            // Temporary sandbox credentials
            this.inputs.email = "sandbox@example.com";
            this.inputs.password = "sandbox123";

            // Optional: auto-login after filling
            // this.shareData();
        },

        async shareData () {
            let validate = await this.checkProperties(this.inputs)

            if(!validate) {
                this.error.status = true
                this.error.title = "Incomplete fields"
                this.error.message = "Please complete the fields to proceed."
                return
            }
             if (this.inputs.email === "sandbox@example.com" && this.inputs.password === "sandbox123") {
                document.cookie = "token=dev-sandbox-token;" // fake token
                this.$router.push({ name: 'Dashboard' })
                return
            }

            try{
                const data = await axios.post(this.env.login,{
                    email : this.inputs.email,
                    password : this.inputs.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if(data.data.status){
                    console.log(data.data)
                    document.cookie = "token="+data.data.token+";"
                    
                    this.$router.push({
                        name : 'Dashboard'
                    })

                    return
                }
                
                this.error.status = true
                this.error.title = "Ooops"
                this.error.message = data.data.error
            }
            catch(error){
                console.log(error)
                this.error.status = true
                this.error.title = "Ooops"
                this.error.message = error
            }
        }
    },
    created(){}
}

</script>
