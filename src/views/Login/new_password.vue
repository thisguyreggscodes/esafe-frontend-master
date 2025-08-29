<template>
    <div class="container">
        <div v-if="done == false" class="login-form mt-5 rounded bg-white p-5 mx-auto shadow shadow-sm" style="max-width:600px">
            <div class="mb-3">
                <label for="password" class=" text-boldcolor fw-bold mb-2">New password</label>
                <input type="password" v-model.trim="password" name="password" id="password" class="form-control " required>

            </div>
            <button @click="savePass()" class="bg-main btn px-4 py-3 text-light fw-bold rounded-pill d-block w-100 mb-3">
                Change password
            </button>
        </div>
        <center v-if="done == true">
            <a href="http://cp.esafetalk.com:3003/login" class="btn btn-primary px-5">
                Redirect to login
            </a>
        </center>
    </div>
    <SuccessModal v-if="success.status" v-bind:toggleSuccess="() => success.status = false">
        <small class="text-muted">{{success.message}}</small>
    </SuccessModal>
    
    <ErrorModal v-if="error.status" v-bind:toggleError="() => error.status = false">
        <h3 class="mt-5 mb-3 text-danger fw-bolder">{{error.title}}</h3>
        <small class="text-muted">{{error.message}}</small>
    </ErrorModal>
</template>

<script>

import axios from 'axios'
import SuccessModal from '../../components/SuccessModal.vue'
import ErrorModal from '../../components/ErrorModal.vue'
export default {
    name : "Forgotpassword",
    components : {
        SuccessModal,
        ErrorModal
    },
    data(){
        return {
            password : null,
            success : {
                status : false,
                title : null,
                message : null
            },
            error : {
                status : false,
                message : null
            },
            done : false
        }
    },
    methods : {
        async savePass (){
            try{
                const entry = await axios.put(this.env.forgetpasswordchangepassword+"?"+"email="+this.$route.query.email+"&token="+this.$route.query.token,{
                    password : this.password
                },{
                    headers : {
                        "content-type" : "application/json"
                    }
                })

                if(entry.data.status){
                    this.done = true
                    this.success.status = true,
                    this.success.message = "Password changed"
                }
                else{
                    this.error.status = true,
                    this.error.title = "Error occured"
                    this.error.message = entry.data.error
                }
            }
            catch(error){
                console.log(error)
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
            }
        }
    },
    created(){
        console.log(this.$route.query)
    }
}
</script>
