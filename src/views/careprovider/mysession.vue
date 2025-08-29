<template>
    <CareproviderHeader section="mysession"/>
    <div class="container my-5">
        <div class="greetings mb-3">
            <div class="d-flex align-items-center">
                <div class="bg-white rounded me-3 p-3 d-flex flex-column align-items-center">
                    <small class="fw-bolder text-uppercase">{{month}}</small>
                    <small class="text-maincolor fw-bolder">{{day}}</small>
                    <small class="text-muted fw-bolder m-0 text-uppercase">{{today}}</small>
                </div>
                <div class="greet d-flex align-items-center fw-bolder text-boldcolor ff-restora fs-3">
                    {{ampm}},&nbsp;<span class="text-maincolor ff-restora">{{firstname}} !</span>
                </div>
            </div>
        </div>

        <div class="mb-3 rounded-3 bg-white p-2">
            <!-- IF HAVE TODAY SESSION -->
            <div class="border border-3 border-maincolor rounded-3 p-3 bg-white" style="transform:scale(1.05)">
                <p class="mb-2 fw-bolder text-boldcolor">Today's session</p>
                <small class="d-block text-maincolor">starts in 30mins.</small>
                <small class="d-block text-maincolor mb-5">Aug 31 2021 - 10:00 AM - 11:30 AM </small>
                <hr>
                <div class="d-flex align-items-center justify-content-between">
                    <div class="p-2 d-flex align-items-center">
                        <div class="me-3 rounded-circle bg-light overflow-hidden d-flex align-items-center justify-content-center" style="width:50px;height:50px">
                            <!-- IMAGE HERE -->
                        </div>
                        <section>
                            <small class="d-block text-muted">Care Seeker</small>
                            <small class="d-block text-boldcolor fw-bolder">Andrew E.</small>
                        </section>
                    </div>
                    <div class="me-3 rounded-circle border border-3 border-maincolor overflow-hidden d-flex align-items-center justify-content-center" style="width:40px;height:40px">
                        <i class="bi bi-chevron-right text-boldcolor fw-bolder"></i>
                    </div>
                </div>
            </div>
            <!-- Classic session card -->
            <div class="px-3 pt-2">
                <h6 class="text-muted fw-bolder border border-3 border-colornone rounded p-3 bg-white m-0">Next sessions</h6>
                <div class="d-flex align-items-center justify-content-between">
                    <div class="p-2 d-flex align-items-center">
                        <div class="me-3 rounded-circle bg-light overflow-hidden d-flex align-items-center justify-content-center" style="width:50px;height:50px">
                            <!-- IMAGE HERE -->
                        </div>
                        <section>
                            <small class="d-block text-muted">Care Seeker</small>
                            <small class="d-block text-boldcolor fw-bolder">Andrew E.</small>
                        </section>
                    </div>
                    <div class="me-3 rounded-circle border border-3 border-maincolor overflow-hidden d-flex align-items-center justify-content-center" style="width:40px;height:40px">
                        <i class="bi bi-chevron-right text-boldcolor fw-bolder"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-grid grid-gap3 custom-grid mt-3" style="grid-template-columns:1fr 1fr 1fr">
            <div class="rounded p-3 d-flex flex-column justify-content-between bg-white">
                <span>
                    <h3 class="mb-2 ff-restora text-boldcolor fw-bolder">Profile</h3>
                    <small class="d-block mb-2">Having a detailed profile allows you to get accurately matched to Care Seekers who may be needing your specialized help.</small>
                    <small class="text-maincolor">Please fill up details on your profile</small>
                </span>
                <span>
                    <RouterLink to="/careprovider/edit/profile" class="rounded-pill btn border-maincolor border-3 mt-5 btn-sm px-4">
                        Edit Profile
                    </RouterLink>
                </span>
            </div>
            <div class="rounded p-3 d-flex flex-column justify-content-between bg-white">
                <span>
                    <h3 class="mb-2 ff-restora text-boldcolor fw-bolder">Invoices</h3>
                    <small class="d-block mb-2">Find payment related documents here.</small>
                    <small class="text-maincolor">You have 1 invoice to be paid</small>
                </span>
                <span>
                <a href="/coming-soon">
                    <button class="rounded-pill btn border-maincolor border-3 mt-5 btn-sm px-4">
                        View Invoices
                    </button>
                </a>
                </span>
            </div>
            <div class="rounded p-3 d-flex flex-column justify-content-between bg-white">
                <span>
                    <h3 class="mb-2 ff-restora text-boldcolor fw-bolder">MyPoints</h3>
                    <small class="d-block mb-2">Earn more with MyPoints. You earn points as you conduct sessions within our platform.</small>
                </span>
                <span>
                <a href="/coming-soon">
                    <button class="rounded-pill btn border-maincolor border-3 mt-5 btn-sm px-4">
                        Learn more
                    </button>
                    </a>
                </span>
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

<style scoped>
    
@media only screen and (max-width: 800px) {
    .custom-grid{
        grid-template-columns:unset !important;
    }
}
</style>

<script>
import CareproviderHeader from '../../components/CareproviderHeader.vue'
import Footer from '../../components/Footer.vue'

import Helpers from '../helpers/helper'
import axios from 'axios'

import ErrorModal from '../../components/ErrorModal.vue'
import SuccessModal from '../../components/SuccessModal.vue'
export default {
    name : 'Dashboard',
    components : {
        CareproviderHeader,
        Footer,
        ErrorModal,
        SuccessModal
    },
    data(){
        return {
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
            firstname : null,
            month : null,
            day : null,
            today : null,
            ampm : null
        }
    },
    methods : {
        token(){
            return Helpers.getToken("token")
        },
        today_() {
            const today = ["sun","mon","tue","wed","thurs","fri","sat"]
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sepy', 'Oct', 'Nov', 'Dec'];
            const date = new Date();

            this.month = months[date.getMonth()]
            this.day = date.getDate()
            this.today = today[date.getDay()]

            if (date.getHours() < 12) {
                this.ampm = 'Good Morning'
            } else if (date.getHours() < 18) {
                this.ampm = 'Good Afternoon'
            } else {
                this.ampm = 'Good Evening'
            }
        },
        async loadData(){
            try{
                const entry = await axios.get(this.env.currentUser,{
                    headers: {
                        'token': `${this.token()}`
                    }
                })
                console.log(entry.data.data)
                if(entry.data.status){
                    this.firstname = entry.data.data.firstname
                    return
                }

                this.$router.push({
                    name : 'Login'
                })
                return 

            }
            catch(error){
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
            }
        }
    },
    created () {
        this.loadData()
        this.today_()
    }
}
</script>