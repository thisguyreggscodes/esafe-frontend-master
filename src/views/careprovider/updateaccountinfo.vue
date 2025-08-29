<template>
    <CareproviderHeader section="profile"/>
    <CareproviderSubHeader section="accountinfo"/>
    <div class="container">
        <div class="mx-auto" style="max-width:800px;width:100%">
            <div class="rounded shadow shadow-sm bg-white p-4 mt-5">
                <p class="fw-bolder text-boldcolor">Account Information</p>

                <span>
                    <label class="fw-bold text-boldcolor mt-3 mb-3" style="font-size: .8em !important;">
                        <span class="text-muted">My Languages and/or Dialects Check all that apply</span>
                    </label>
                    <div class="">
                        <div class="form-check me-2 d-inline-block">
                            <input v-model.trim="lang" :checked="language.tagalog ? true : false" class="form-check-input rounded-circle" type="checkbox" value="Filipino/Tagalog" id="lang">
                            <label class="form-check-label" for="lang" style="font-size: .9em;">
                                Filipino/Tagalog
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block">
                            <input v-model.trim="lang" :checked="language.english ? true : false" class="form-check-input rounded-circle" type="checkbox" value="English" id="lang2">
                            <label class="form-check-label" for="lang2" style="font-size: .9em;">
                                English
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block">
                            <input v-model.trim="lang" :checked="language.other ? true : false" class="form-check-input rounded-circle" type="checkbox" value="Other" id="lang3">
                            <label class="form-check-label" for="lang3" style="font-size: .9em;">
                                Other languages
                            </label>
                        </div>
                    </div>

                    <input type="text" v-model.trim="language.other_input" id="other_lang" class="mt-3 form-control input-mainbg py-2 px-3" placeholder="Specify language(s). You can use commas to separate multiple languages.">
                </span>
                
                <span>
                    <label class="fw-bold text-boldcolor mt-3 mb-3 mt-5" style="font-size: .8em !important;">
                        <span class="text-muted">Modes of Therapy</span>
                    </label>
                    <div class="">
                        <div class="form-check me-2 d-inline-block p-0">
                            <input v-model.trim="therapy_via" @click="()=> modes.vc = !modes.vc" class="d-none" type="checkbox" value="Video call" :checked="modes.vc && true" id="via">
                            <label :class="`form-check-label rounded-pill px-4 py-2 border border-2 ${modes.vc ? 'border-maincolor bg-main text-light':'text-maincolor'}`" for="via" style="font-size: .9em;">
                                Video Call
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block p-0">
                            <input v-model.trim="therapy_via" @click="()=> modes.online_chat = !modes.online_chat" class="d-none" type="checkbox" value="Online Chat" :checked="modes.online_chat && true" id="via2">
                            <label :class="`form-check-label rounded-pill px-4 py-2 border border-2 ${modes.online_chat ? 'border-maincolor bg-main text-light':'text-maincolor'}`" for="via2" style="font-size: .9em;">
                                Online Chat
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block p-0">
                            <input v-model.trim="therapy_via" class="d-none" @click="()=> modes.chat = !modes.chat" type="checkbox" value="Chat" :checked="modes.chat && true" id="via3">
                            <label :class="`form-check-label rounded-pill px-4 py-2 border border-2 ${modes.chat ? 'border-maincolor bg-main text-light':'text-maincolor'}`" for="via3" style="font-size: .9em;">
                                Chat
                            </label>
                        </div>
                    </div>
                </span>
                
                <p class="fw-bold text-boldcolor fs-5 mt-5">Your rate</p>
                <small class="fw-light text-secondary">
                    Your rate can depend on many factors, from your specialty to the demand of users. The rate you set is subject for assessment. Once you’re finished setting up, we’ll let you know when you can start accepting sessions.
                </small>
                
                <div class="d-grid grid-col2 grid-gap3 mt-3 mb-3">
                    <span>
                        <label for="rate" class="fw-bold text-boldcolor mb-2">Your starting rate</label>
                        <input type="number" v-on:input="setPercentage()" v-model.trim="inputs.rate" id="rate" class="form-control input-mainbg py-2 px-3" min="0">
                    </span>
                    <span>
                        <label class="fw-bold text-boldcolor mb-2">Care Seekers will pay</label>
                        <span class="d-flex">
                            <p class="text-maincolor m-0 fw-bold">₱ {{percentage}}</p> &nbsp;
                            <small class="text-muted">per hour/session</small>
                        </span>
                        <small style="font-size:.75em">
                            (Your rate +25% management fee)
                        </small>
                    </span>
                </div>

                <div class="d-flex mt-5">
                    <button @click="submit()" class="btn btn-sm bg-main text-white fw-bolder px-4 rounded-pill py-2 mb-3 me-3">
                        Save changes
                    </button>
                    <button class="btn btn-sm rounded-pill btn bg-secondary mb-3 bg-opacity-25 text-dark fw-bold px-4">
                        Cancel
                    </button>
                </div>

                <hr class="mt-4 bg-opacity-25 border-bottom border-top border-1">

                <p class="fw-bolder text-boldcolor">Update Account</p>

                <div class="mb-4">
                    <div class="d-grid grid-col2 grid-gap3 align-items-end">
                        <span>
                            <label for="email" class="text-muted fw-bolder mb-2">Email</label>
                            <input v-model.trim="inputs.email" type="email" name="email" id="email" class="input-mainbg py-2 px-3 form-control">
                            
                            <div class="input-group mt-3" v-if="toggleChangeEmail">
                                <input v-model.trim="vcode" type="text" class="input-mainbg py-2 px-3 form-control" placeholder="Code">
                                <button class="btn bg-main text-light input-group-text" @click="verifyEmail()">Verify</button>
                            </div>
                        </span>
                        <span>
                            <button @click="Send_email_code()" class="rounded-pill fw-bolder px-4 py-2 border border-2 border-maincolor bg-white text-maincolor" style="font-size: .9em;">
                                {{sending ? "Sending verification code" : "Send code" }}
                            </button>
                        </span>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="d-grid grid-col2 grid-gap3 align-items-end">
                        <span>
                            <label for="password" class="text-muted fw-bolder mb-2">Password</label>
                            <input v-model.trim="inputs.pass" type="password" name="password" id="password" class="input-mainbg py-2 px-3 form-control">
                        </span>
                        <span>
                            <button @click="changePass()" class="rounded-pill fw-bolder px-4 py-2 border border-2 border-maincolor bg-white text-maincolor" style="font-size: .9em;">
                                Change Password
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>

    
    <ErrorModal v-if="error.status" v-bind:toggleError="() => error.status = false">
        <h3 class="mt-5 mb-3 text-danger fw-bolder">{{error.title}}</h3>
        <small class="text-muted">{{error.message}}</small>
    </ErrorModal>
        
    <SuccessModal v-if="success.status" v-bind:toggleSuccess="() => success.status = false">
        <h3 class="mt-5 mb-3 text-success fw-bolder">{{success.title}}</h3>
        <small class="text-muted">{{success.message}}</small>
    </SuccessModal>
</template>
<script>
import CareproviderHeader from '../../components/CareproviderHeader.vue'
import CareproviderSubHeader from '../../components/CareproviderSubHeader.vue'
import Footer from '../../components/Footer.vue'
import Helpers from '../helpers/helper'

import axios from 'axios'
import ErrorModal from '../../components/ErrorModal.vue'
import SuccessModal from '../../components/SuccessModal.vue'
export default {
    name : 'UpdateAccountInfo',
    components : {
        CareproviderHeader,
        CareproviderSubHeader,
        Footer,
        ErrorModal,
        SuccessModal
    },
    data(){
        return {
            inputs : {
                rate : 0,
                lang : [],
                therapy_via : [],
                pass : null,
                email : null
            },
            email : null,
            phone : null,
            percentage : 0,
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
            lang : [],
            therapy_via : [],
            language : {
                english : false,
                tagalog : false,
                other : false,
                other_input : null
            },
            modes : {
                vc : false,
                online_chat : false,
                chat : false
            },
            vcode : null,
            toggleChangeEmail : false,
            sending : false,
            emailverified : false
        }
    },
    methods : {
        setPercentage(){
            this.percentage = (parseFloat(this.inputs.rate) + ((this.inputs.rate/100) * 25)) || 0
        },
        token(){
            return Helpers.getToken("token")
        },
        async Send_email_code(){
            try{
                this.sending = true
                const d = await axios.post(this.env.send_email_code,
                {email : this.inputs.email},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(d)
                this.sending = false
                if(d.data.status){
                    this.success.status = true
                    this.success.message = "Code has been sent to your Email."
                    
                    this.toggleChangeEmail = true
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
                console.log(error)
            }
        },
        async verifyEmail () {
            try{
                const d = await axios.put(this.env.verify_email,
                {email : this.inputs.email, code : this.vcode},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(d)
                if(d.data.status){
                    this.emailverified = true
                    this.success.status = true
                    this.success.message = "Your email is now verified."

                    this.changeEmail()
                    return
                }
                else{
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
        async loadData(){
            try{
                const entry = await axios.get(this.env.currentUser,{
                    headers: {
                        'token': `${this.token()}`
                    }
                })

                console.log(entry)
                if(entry.data.status){
                    this.inputs.rate = entry.data.data.counseling_session.rate
                    this.lang = entry.data.data.counseling_session.lang
                    this.therapy_via = entry.data.data.counseling_session.therapy_via

                    this.lang = this.lang.map(e => e.language)
                    this.therapy_via = this.therapy_via.map(e => e.via)

                    this.lang = this.lang.map(each => {
                        if(each == "Filipino/Tagalog") {
                            this.language.tagalog = true
                            return each
                        }
                        else if(each == "English") {
                            this.language.english = true
                            return each
                        }
                        else if(each == "Other"){
                            this.language.other = true
                            return each
                        }
                        else{
                            this.language.other_input = each
                        }

                        return false
                    }).filter(e => e)

                    this.therapy_via.map(each => {
                        if(each == "Video call"){
                            this.modes.vc = true
                        }
                        else if(each == "Online Chat"){
                            this.modes.online_chat = true
                        }
                        else if(each == "Chat"){
                            this.modes.chat = true
                        }
                    })

                    this.setPercentage()
                    return
                }

                console.log(entry)
                this.$router.push({
                    name : 'Login'
                })
                return 

            }
            catch(error){
                console.error(error)
                // this.error.status = true,
                // this.error.title = "Error occured"
                // this.error.message = error
            }
        },
        async submit(){
            try{
                this.inputs.therapy_via = this.therapy_via.map(item => {
                    return ({ via : item })
                })
                
                this.inputs.lang = this.lang.map(item => {
                    return({language : item})
                })

                if(this.language.other_input) this.inputs.lang.push({language : this.language.other_input})

                const entry = await axios.put(this.env.updateAccountInfo,{
                    lang : this.inputs.lang,
                    therapy_via : this.inputs.therapy_via,
                    rate : this.inputs.rate
                },{
                    headers : {
                        'token' : this.token(),
                        "content-type" : "application/json"
                    }
                })

                console.log(entry)
                this.success.status = true
                this.success.title = "Success"
                this.success.message = "Changes saved successfully!"
            }
            catch(error){
                console.log(error)
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
            }
        },
        async changePass () {
            try{
                const entry = await axios.put(this.env.changePassword,{
                    pass : this.inputs.pass
                },{
                    headers : {
                        'token' : this.token(),
                        "content-type" : "application/json"
                    }
                })

                this.success.status = true
                this.success.title = "Success"
                this.success.message = "Changes saved successfully!"
                this.inputs.pass = null
            }
            catch(error){
                console.log(error)
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
            }
        },
        async changeEmail () {
            try{
                const entry = await axios.put(this.env.changeEmail,{
                    email : this.inputs.email
                },{
                    headers : {
                        'token' : this.token(),
                        "content-type" : "application/json"
                    }
                })

                console.log(entry)
                this.success.status = true
                this.success.title = "Success"
                this.success.message = "Changes saved successfully! Please login again."
                this.inputs.pass = null

                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

                setTimeout(t => {
                    this.$router.push({
                        name : 'Login'
                    })
                    return 
                },1500)
            }
            catch(error){
                console.log(error)
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
            }
        }
    },
    created () {
        this.loadData()
    }
}
</script>