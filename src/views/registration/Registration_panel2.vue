<template>
    <Header/>
    <div class="container mt-4 mb-5 shadow bg-white rounded-3" v-on:keyup.enter="shareData()">
        <div class="form-navigation p-4 border-bottom">
            <small>
                <span class="text-subcolor">Tell us about you</span> &nbsp;
                <span class="fw-bold text-boldcolor">Account Information</span>
            </small>
            <span class="d-flex align-items-center mt-2">
                <div class="progress flex-fill me-3" style="height:8px">
                    <div class="progress-bar rounded-pill bg-main" role="progressbar" style="width: 35%;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="bar-value text-maincolor fw-bold">35%</small>
            </span>
        </div>
        <div class="form-container p-4 mt-3">
            <div class="mx-auto" style="max-width:680px;">
                <p class="fw-bold text-boldcolor fs-5">Contact details</p>
                <p class="fw-light">
                    This information will be used to login to your account. Please have them ready to receive verification codes once asked.
                </p>

                <div class="d-grid grid-col2 grid-gap3 mt-3 mb-3">
                    <span>
                        <label for="email" class="fw-bold text-boldcolor mb-2">Email</label>
                        <input v-if="!emailverified" type="email" id="email" v-model.trim="email"  class="form-control input-mainbg py-2 px-3" placeholder="Enter your email">
                        <input v-else type="email" disabled v-model.trim="email" class="form-control input-mainbg py-2 px-3" placeholder="Enter your email">
                    </span>
                    <span v-if="!emailverified">
                        <label for="v-code" class="fw-bold text-boldcolor mb-2">Enter verification code</label>
                        <div class="input-group">
                            <input type="password" id="v-code" v-model.trim="vcode"  class="form-control input-mainbg py-2 px-3" >
                            <button class="input-group-text" @click="verifyEmail()">
                                {{emailverified?"Verified":"Verify"}}
                            </button>
                        </div>
                        <small class="mt-2" style="font-size:.75em">
                            We will send you a verification code to this email.
                            The code will expire in 5 minutes. 
                            <span v-if="!emailSending" class="text-maincolor" style="cursor:pointer" @click="Send_email_code()">Send Code</span>
                            <span v-else class="text-maincolor">Sending Code to your email</span>
                        </small>
                    </span>
                    <span style="margin-top: 51px" class="text-maincolor" v-else>
                    Email Verified
                    </span>
                </div>
                
                <div class="d-grid grid-col2 grid-gap3 mt-3 mb-3 align-items-end">
                    <span>
                        <label for="phone" class="fw-bold text-boldcolor mb-2">Mobile Number</label>
                       <input v-model.trim="phone" type="text" id="phone" v-maska="'+63##########'" class="form-control input-mainbg py-2 px-3" placeholder="+63#########">
                    </span>
                    <span>
                        <input type="button" @click="Send_sms_code()" :value="!smsverified ? 'Get code':'Verified'" class="rounded-pill btn bg-secondary bg-opacity-25 text-muted fw-medium py-2 px-4" data-bs-toggle="modal" data-bs-target="#modal">
                    </span>
                </div>
                <div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body">
                                <label v-if="sendingSms" for="scode">Sending SMS Code</label>
                                <label v-else for="scode">TYPE 4 DIGIT SMS Code </label>
                                <input type="text" class="form-control" id="scode" v-model.trim="scode">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn rounded-pill btn-primary" @click="verifyPhone()">Verify</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="mt-4 bg-opacity-25 border-bottom border-top border-1">

                <p class="fw-bold text-boldcolor fs-5">Password</p>
                <p class="fw-light">
                    Please create a secure password consisting of at least 8 characters, at least 1 capital letter and at 1 numeric character.
                </p>

                <div class="d-grid grid-col2 grid-gap3 mt-3 mb-3">
                    <span>
                        <label for="password" class="fw-bold text-boldcolor mb-2">Password</label>
                        <input type="password" v-model.trim="inputs.password" id="password" class="form-control input-mainbg py-2 px-3">
                    </span>
                    <span>
                        <label for="repassword" class="fw-bold text-boldcolor mb-2">Confirm password</label>
                        <input type="password" id="repassword" v-model.trim="inputs.repassword" class="form-control input-mainbg py-2 px-3">
                    </span>
                </div>
            </div>

            <div class="navigate-btn-container d-flex justify-content-between align-items-center my-5 px-5 py-3">
                <RouterLink to="/careprovider/registration/general" class="rounded-pill btn bg-secondary bg-opacity-25 text-dark fw-bold py-3 px-4">
                    <small>Previous</small>
                </RouterLink>
                
                <button @click="shareData" class="bg-main btn px-4 py-3 text-light fw-bold rounded-pill">
                    Next 
                    <kbd class="ms-2 text-muted bg-light">
                        <small>
                            <i class="bi bi-arrow-return-left me-1"></i>Enter
                        </small>
                    </kbd>
                </button>
            </div>
        </div>
    </div>
    
    <ErrorModal v-if="error.status" v-bind:toggleError="() => error.status = false">
        <h3 class="mt-5 mb-3 text-danger fw-bolder">{{error.title}}</h3>
        <small class="text-muted">{{error.message}}</small>
    </ErrorModal>
    <SuccessModal v-if="success.status" v-bind:toggleSuccess="() => success.status = false">
        <h3 class="mt-5 mb-3 text-success fw-bolder">Yeheey!</h3>
        <small class="text-muted">{{success.message}}</small>
    </SuccessModal>
</template>

<script>
import Header from '../../components/Header.vue'
import SuccessModal from '../../components/SuccessModal.vue'
import ErrorModal from '../../components/ErrorModal.vue'
import axios from 'axios'
import { maska } from 'maska'


export default {
    name : 'RegistrationAccount',
    directives: {maska},
    components : {
        Header,
        ErrorModal,
        SuccessModal
        
    },
    data () {
        return {
            sendingSms: false,
            inputs : {
                email : null,
                phone : null,
                password : null,
                repassword : null
            },
            error : {
                status : false,
                title : null,
                message : null
            },
            success : {
                status : false,
                title : null,
                message : null
            },
            emailverified : false,
            smsverified : false,
            email : null,
            phone : null,
            vcode : null,
            scode : null,
            emailSending: false,
            smsModal: false
        }
    },
    methods : {
        showSmsModal() {
            this.smsModal = true
            this.Send_sms_code();
        },
        async Send_email_code(){
            try{
                this.emailSending = true
                const d = await axios.post(this.env.send_email_code,
                {email : this.email},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(d)
                this.emailSending = false
                if(d.data.status){
                    this.success.status = true
                    this.success.message = "Code has been sent to your Email."
                    
                    return
                }
                else{
                    if(d.data.error.code == "EENVELOPE"){
                        this.error.status = true
                        this.error.title = "Invalid Email"
                        this.error.message = "Please check the format of your email."
                        return
                    }

                    this.error.status = true
                    this.error.title = "Error"
                    this.error.message = d.data.error
                    return
                }
                
            }
            catch(error){
                this.emailSending = false
                console.log(error)
            }
        },
        async verifyEmail () {
            try{
                const d = await axios.put(this.env.verify_email,
                {email : this.email, code : this.vcode},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(d)
                if(d.data.status){
                    localStorage.setItem("cp_email_reg","true")
                    this.emailverified = true
                    this.inputs.email = this.email
                    this.success.status = true
                    this.success.message = "Your email is now verified."
                    return
                }
                else{
                    localStorage.setItem("cp_email_reg","")
                    this.error.status = true
                    this.error.title = "Error"
                    this.error.message = d.data.error
                    return
                }
            }
            catch(error){
                console.log(error)
            }
        },
        async Send_sms_code(){
            try{
                this.sendingSms  = true
                const d = await axios.post(this.env.send_sms_code,
                {phone : this.phone},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(d)
                this.sendingSms  = false
                if(d.data.status){
                    this.success.status = true
                    this.success.message = "Code has been sent to your phone."
                    return
                }
                else{
                    this.error.status = true
                    this.error.title = "Invalid Phone"
                    this.error.message = d.data.error
                    return
                }
            }
            catch(error){
                console.log(error)
            }
        },
        async verifyPhone () {
            try{
                const d = await axios.put(this.env.verify_sms,
                {phone : this.phone, code : this.scode},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(d)
                this.smsModal = false
                if(d.data.status){
                    localStorage.setItem("cp_phone_reg","true")
                    this.smsverified = true
                    this.inputs.phone = this.phone
                    this.success.status = true
                    this.success.message = "Your phone is now verified."
                    return
                }
                else{
                    localStorage.setItem("cp_phone_reg","")
                    this.error.status = true
                    this.error.title = "Error"
                    this.error.message = d.data.error
                    return
                }
            }
            catch(error){
                console.log(error)
            }
        },
        validateEmail(value){
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(value); 
        },
        async checkProperties(obj,except = []) {

            for(const [key, value] of Object.entries(obj)){
                if(!(value) && (except.indexOf(key) == -1) ) return false
            }

            return true
            
        },
        async shareData () {

            if(!(this.emailverified) || !(this.smsverified)){
                this.error.status = true
                this.error.title = "Verification error"
                this.error.message = "Your email/phone is not yet verified or already in used"
                return
            }

            if(this.validateEmail(this.inputs.email) == false){
                this.error.status = true
                this.error.title = "Invalid Email"
                this.error.message = "Please check the format of your email."
                return
            }

            const validate = await this.checkProperties(this.inputs)

            if(!validate) {
                this.error.status = true
                this.error.title = "Incomplete fields"
                this.error.message = "Please complete the fields to proceed."
                return
            }

            if(this.inputs.password != this.inputs.repassword) return alert("Password not match")

            delete this.inputs.repassword

            localStorage.setItem('careprovider_reg_account', JSON.stringify(this.inputs))

            this.$router.push({
                name : 'RegistrationExperience'
            })
        }
    },
    created(){
        if(!(localStorage.getItem('careprovider_reg_general'))){
            this.$router.push({
                name : 'RegistrationGeneral'
            })
        }

        if(localStorage.getItem('careprovider_reg_account')){
            let storage = JSON.parse(localStorage.getItem('careprovider_reg_account'))
            this.inputs.email = storage.email
            this.inputs.phone = storage.phone
            this.inputs.password = storage.password

            if(localStorage.getItem("cp_phone_reg")){
                this.emailverified = true
            }

            if(localStorage.getItem("cp_email_reg")){
                this.smsverified = true
            }
        }
    }
}
</script>
