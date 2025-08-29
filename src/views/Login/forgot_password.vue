<template>
    <Header/>
    <div class="container">
        <div class="display-5 ff-restora text-center text-maincolor mt-3 pt-5">
            Welcome back!
        </div>

        <div class="login-form mt-5 rounded bg-white p-5 mx-auto shadow shadow-sm" style="max-width:600px">
            <RouterLink to="/login" class=" btn shadow-md shadow rounded-circle border">
                <i class="bi bi-arrow-left m-0 p-0 fs-5"></i>
            </RouterLink>
            <h3 class="ff-restora text-boldcolor mt-5">
                Forgot your password?
            </h3>
            <p class="mt-4 mb-5 text-muted">
                Don't worry, it happens. Enter your registered email to receive the instructions on how to reset your password.
            </p>
            <div class="mb-3">
                <label for="email" class=" text-boldcolor fw-bold mb-2">Email Address</label>
                <input type="email" v-model.trim="email" name="email" id="email" :class="`${ error.extraClass } form-control `" required>
                <div v-if="error.status" class="invalid-feedback">
                    {{error.data}}
                </div>
            </div>
            <button @click="sendLink()" class="bg-main btn px-4 py-3 text-light fw-bold rounded-pill d-block w-100 mb-3">
                Reset password
            </button>
        </div>
    </div>
    <Footer/>
            
    <SuccessModal v-if="success.status" v-bind:toggleSuccess="() => success.status = false">
        <small class="text-muted">{{success.message}}</small>
    </SuccessModal>
</template>

<script>

import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import axios from 'axios'
import SuccessModal from '../../components/SuccessModal.vue'

export default {
    name : "Forgotpassword",
    components : {
        Header,
        Footer,
        SuccessModal
    },
    data(){
        return {
            email : null,
            error : {
                status : false,
                extraClass : ''
            },
            success : {
                status : false,
                message : null
            }
        }
    },
    methods : {
        async sendLink (){
            try{
                const entry = await axios.get(this.env.forgetpasswordlink+"?"+"email="+this.email)

                console.log(entry)
                if(entry.data.status){
                    this.success.status = true,
                    this.success.message = "Reset password link sent"
                    this.error.extraClass = ''
                    return
                }
                else{
                    console.info(entry.data)
                    this.error.data = entry.data.error
                    this.error.status = true
                    this.error.extraClass = 'is-invalid'
                }
            }
            catch(error){
                console.log(error)
                this.error.status = true
                this.error.extraClass = 'is-invalid'
            }
        }
    }
}
</script>