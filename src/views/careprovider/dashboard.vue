<template>
    <CareproviderHeader section="dashboard"/>
    <div class="container my-5">
        <div class="d-grid greet-grid grid-gap3">
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

            <div class="d-grid grid-gap3 greet-grid-right" v-if="(details) && details?.steps[4]?.status != 'Completed'">
            <small> You need to fill this form for background check</small>
                <span>
                    <a target="_blank" href="https://esafetalkassets.s3.ap-southeast-1.amazonaws.com/VSSI-ISMS-OPS-Job+Application+Form+and+LOA+for+eSafeTalk.pdf" download class="btn bg-main text-decoration-none text-light">
                        <small>DOWNLOAD VANGUARD PDF FORM</small>
                    </a>
                </span>
                <span>
                    <label for="vanguard_upload" class="btn text-maincolor border rounded border-maincolor me-2 mb-0">
                        <small>{{ file ? file.name : "UPLOAD PDF TO VANGUARD"}}</small>
                    </label>
                    <input type="file" class="d-none" id="vanguard_upload" @change="filePreview">
                    <button class="bg-main btn text-light" @click="vanguardUpload">
                        {{ isLoading ? "Submitting..." : ""}}
                        <i class="bi bi-upload" v-if="!isLoading"></i>
                    </button>
                </span>
            </div>
        </div>

        <div class="rounded-3 bg-white mt-3 p-2 mb-3">
            <div class="dashboard--profile">
                <div class="dashboard--profile--content">
                    <h1 v-if="details.stepsPercentage <= 99">Your profile is almost complete! <span>{{details.stepsPercentage}}%</span></h1>
                    <h1 v-else>Hooray!! Your profile is complete!</h1>
                    <p v-if="details.stepsPercentage <= 99">Please complete your profile to start conducting sessions</p>
                    <a href="/careprovider/edit/profile"  class="continue-btn">Continue</a>
                </div>

                <div class="dashboard--profile--indicator">
                    <div class="pt-2 pb-3 border position-relative rounded">
                        <span class="bg-white rounded py-1 px-2 border position-absolute top-0" style="left: 50%; transform: translate(-50%, -50%);">
                            <small class="text-secondary fw-bolder" style="font-size: 0.7em;">
                                PROFILE COMPLETION {{details.stepsPercentage}}%</small></span>

                            <div class="step progress-5">
                            <p v-for="(item,index) in details.steps" :key="index" :class="item.status">
                                {{item.title}}
                            </p>
                            </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-lg-15 mb-5">
              <div v-for="today in sessionData" :key="today._id">                  
                <div class="card border-green-3 border-radius-10" v-if="new Date().setHours(0,0,0,0) == new Date(today.date).setHours(0,0,0,0)">
                  <div class="card-body" > 
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle r="19" transform="matrix(-1 0 0 1 20 20)" fill="#DFF2EE" stroke="white" stroke-width="2"/>
                      <path d="M16.0879 11.2305H23.3876C26.9812 11.2305 30 14.2268 30 17.7654V17.9528C30 20.9061 27.8571 23.3865 25.7143 24.1285V24.3604V26.8277C25.7143 27.3149 25.0071 27.707 24.5169 27.707C24.2669 27.707 23.8867 27.4882 23.7264 27.3266L20.4429 24.1273H20.196H16.0879C12.4943 24.1273 10 21.4919 10 17.9528V17.7654C10 14.2268 12.4943 11.2305 16.0879 11.2305ZM23.6026 16.7088C22.9871 16.7088 22.4879 17.2008 22.4879 17.8074C22.4879 18.414 22.9869 18.9055 23.6026 18.9055C24.2186 18.9055 24.7186 18.414 24.7186 17.8074C24.7186 17.2008 24.2186 16.7088 23.6026 16.7088ZM19.5879 18.9057C20.2038 18.9057 20.7033 18.4142 20.7033 17.8076C20.7033 17.201 20.2038 16.709 19.5879 16.709C18.9719 16.709 18.4731 17.201 18.4731 17.8076C18.4733 18.4142 18.9719 18.9057 19.5879 18.9057ZM15.5729 18.9057C16.1888 18.9057 16.6879 18.4142 16.6879 17.8076C16.6879 17.201 16.1888 16.709 15.5729 16.709C14.9574 16.709 14.4574 17.201 14.4574 17.8076C14.4574 18.4142 14.9574 18.9057 15.5729 18.9057Z" fill="#3AC2B2"/>
                    </svg>
                    <div class="ms-1 ff-poppins">
                      <h1 class="fw-bold">
                        <span class="fw-bolder text-boldcolor ff-poppins fs-4">Today’s session</span>                     
                      </h1>
                      <!-- <h1 class="fw-bold start-30mins">
                        <span class="text-green fs-6">Starts in 30 mins.</span>                     
                      </h1> -->
                      <h1 class="fs-5 mt-3">
                        <span class="text-muted">{{new Date(today.date).toDateString()}}</span>                     
                        <span class="text-muted me-2 ms-2">•</span>                     
                        <span class="text-muted">{{today.time_start}} - {{today.time_end}}</span>                     
                      </h1>
                    </div> 
                      <hr class="mt-5">
                      <div class="row">
                        <div class="col-sm-10">
                          <div class="d-flex">
                            <div>
                              <img src="../../assets/images/profile.png" class="rounded-circle">
                            </div>
                              <div>
                                <div class="class-sm-2 ff-poppins">
                                  <div class="ms-4 text-muted fw-500">
                                    Your Care Seeker
                                  </div>
                                  <div class="ms-4 text-muted fw-500 fw-bold fs-5 text-calm-blue">
                                    {{today.session_set.cs_id.profile.firstname}}
                                  </div>
                                </div>
                              </div>
                          </div>
                        </div>
                        <div class="col-sm-2 text-end">
                            <RouterLink :to="`/careprovider/session/calendar/${firstday}`">
                          <svg class="mt-2" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1.5" y="1.5" width="45" height="45" rx="22.5" fill="white"/>
                            <path d="M22.5 18.3438L28.1569 24.0006L22.5 29.6575" stroke="#2C576E" stroke-width="3"      stroke-linecap="round" stroke-linejoin="round"/>
                            <rect x="1.5" y="1.5" width="45" height="45" rx="22.5" stroke="#3AC2B2" stroke-width="3"/>
                          </svg>
                          </RouterLink>
                        </div>
                      </div>
                  </div>
                </div>
              
              </div>
              <div class="pe-4 ps-4" >
                <div class="card border-0 border-radius-10 next-session index-backdrop" >
                  <div class="card-body">
                      <div class="ms-1 ff-poppins">
                        <h1 class="">
                          <span v-if="sessionData.length > 0" class="fw-bold text-muted fs-5">Next session</span>                     
                          <span v-else class="fw-bold text-muted fs-5">No session found</span>                 
                        </h1>
                      </div>
                      <div v-for="session in sessionData" :key="session._id">
                          <div>
                            <div class="row">
                              <div class="col-sm-10">
                                <div class="d-flex">
                                  <div class="mt-2">               
                                    <img src="../../assets/images/profile.png" class="rounded-circle">
                                  </div>
                                    <div>
                                      <div class="class-sm-2 mt-2 ff-poppins">
                                        <div class="ms-4 text-muted fw-500 fs-5 fw-bolder text-boldcolor">
                                          {{session.session_set.cs_id.profile.firstname}}
                                        </div>
                                        <h1 class="fs-6 mt-1 ms-4">
                                          <span class="text-muted">{{new Date(session.date).toDateString()}}</span>                     
                                          <span class="text-muted me-2 ms-2">•</span>                     
                                          <span class="text-muted">{{session.time_start}} - {{session.time_end}}</span>                     
                                        </h1>
                                        </div>
                                      </div>
                                    <div>
                                  </div>
                                </div>                      
                              </div>

                              <div class="col-sm-2 text-end">
                                <RouterLink :to="`/careprovider/session/calendar/${firstday}`">
                                <svg class="mt-2" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect x="1.5" y="1.5" width="45" height="45" rx="22.5" fill="white"/>
                                  <path d="M22.5 18.3438L28.1569 24.0006L22.5 29.6575" stroke="#2C576E" stroke-width="3"      stroke-linecap="round" stroke-linejoin="round"/>
                                  <rect x="1.5" y="1.5" width="45" height="45" rx="22.5" stroke="#3AC2B2" stroke-width="3"/>
                                </svg>
                                </RouterLink>
                              </div>
                            </div>
                            <hr class="mt-3">                            
                          </div>
                      </div>
                  </div>
                </div>
              </div>  
            </div>
        </div>

        <!-- <div class="rounded-3 bg-white p-2 mb-3">
            <div class="no--session--note">
                <img src="../../assets/img/no-session.png" alt="">
            </div>
        </div> -->

        <div class="row align-items-stretch">
            <div class="col-md-6">
                <div class="rounded-3 bg-white basic--card">
                    <h1>Invoices</h1>
                    <div class="card--body">
                        <p>Find payment related documents here.</p>
                    </div>
                    <a href="#" class="card-button">Locked</a>
                </div>
            </div>
            <div class="col-md-6">
                <div class="rounded-3 bg-white basic--card">
                    <h1>MyPoints</h1>
                    <div class="card--body">
                        <p>Earn more with MyPoints. You earn points as you conduct sessions within our platform.</p>
                    </div>
                    <a href="#" class="card-button">Locked</a>
                </div>
            </div>
        </div>
    </div>
    
<!--     
    <ErrorModal v-if="error.status" v-bind:toggleError="() => error.status = false">
        <h3 class="mt-5 mb-3 text-danger fw-bolder">{{error.title}}</h3>
        <small class="text-muted">{{error.message}}</small>
    </ErrorModal> -->
        
    <SuccessModal v-if="success.status" v-bind:toggleSuccess="() => success.status = false">
        <h3 class="mt-5 mb-3 text-success fw-bolder">{{success.title}}</h3>
        <small class="text-muted">{{success.message}}</small>
    </SuccessModal>

    <RemindModel v-if="remind.status" v-bind:toggleRemind="() => remind.status = false">
        <h3 class="mt-5 mb-3 text-success fw-bolder">{{remind.title}}</h3>
        <small class="text-muted">{{remind.message}}</small>
    </RemindModel>
    
    <RemindModel v-if="remind1.status" v-bind:toggleRemind="() => remind1.status = false">
        <h3 class="mt-5 mb-3 text-success fw-bolder">{{remind1.title}}</h3>
        <small class="text-muted">{{remind1.message}}</small>
        
        <section class="mt-3 d-flex justify-content-center">
            <RouterLink to="/careprovider/edit/profile" class="my-2 rounded-pill btn btn-warning px-4 d-block">
                Go to profile
            </RouterLink>
        </section>
    </RemindModel>
</template>
<!-- Dont include this style -->
<style>
    .step {
    display: flex;
    justify-content: space-between;
    counter-reset: step;
    margin: 24px 10px;
    position: relative;
    }

    .step::before,
    .step::after {
    content: "";
    position: absolute;
    top: 0.75em;
    bottom: 0.75em;
    left: 0;
    right: 0;
    background: #CCC;
    }

    .step::after {
    background: #3AC2B2;
    transition: right 0.5s;
    }

    .step.progress-one::after {
    right: 100%;
    }

    .step.progress-two::after {
    right: 78%;
    }

    .step.progress-three::after {
    right: 58%;
    }

    .step.progress-four::after {
    right: 40%;
    }

    .step.progress-five::after {
    right: 22%;
    }

    .step.progress-six::after {
    right: 0%;
    }

    input {
    display: none;
    }

    .step p {
    color: rgba(45, 57, 64, 0.5);
    height: 2em;
    position: relative;
    z-index: 2;
    cursor: pointer;
    margin: 0;
    text-align: center;
    width: 110px;
    font-size: 13px;
    line-height: 16px;
    }

    .step p:first-of-type {
    background: linear-gradient(to right, white 50%, transparent 50%);
    }

    .step p:last-of-type {
    background: linear-gradient(to right, transparent 50%, white 50%);
    }

    .step p::before {
    content: '';
    display: flex;
    margin: 0 auto 0.5em;
    height: 2em;
    width: 2em;
    border-radius: 2em;
    justify-content: center;
    align-items: center;
    background: #CCC;
    }

    .forward .step p::before {
    transition: background 0 0.5s, color 0 0.5s;
    }

    p.ongoing, p.Completed {
    color: #2C576E;
    }

    p.ongoing::before {
    content: '●';
    color: white;
    background: #3AC2B2;
    }

    p.Completed::before {
    content: "✔︎";
    background: #3AC2B2;
    color: white;
    }
</style>
<!-- Dont include this style -->
<style scope>
.greet-grid{
    grid-template-columns: 1fr 1fr;
}
.greet-grid-right{
    justify-content:end;
}


@media only screen and (max-width: 950px) {
    .greet-grid{
        grid-template-columns:unset !important
    }
    .greet-grid-right{
        justify-content:unset !important;
    }
}
</style>

<!-- dashboard approve css -->
<style>
    .dashboard--profile {
        display: flex;
        align-items: center;
        padding: 20px 0px;
        justify-content: space-between;
    }
    .dashboard--profile--content {
        max-width: 388px;
        padding: 0px 15px;
        width: 100%;
    }
    .dashboard--profile--content h1 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        letter-spacing: -0.01em;
        color: #2C576E;
        margin-bottom: 8px;
    }
    .dashboard--profile--content h1 span {
        color: #3AC2B2;
    }
    .dashboard--profile--content p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 30px;
        letter-spacing: -0.01em;
        color: #485761;
    }
    .dashboard--profile--indicator {
        width: 100%;
        max-width: 827px;
        padding: 0px 15px;
    }
    .dashboard--profile--content .continue-btn {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        letter-spacing: -0.01em;
        color: white;
        width: 147px;
        height: 60px;
        background: #3AC2B2;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: unset;
        cursor: pointer;
    }
    .no--session--note {
        width: 386px;
        margin: 20px auto;
    }
    .basic--card {
        padding: 20px;
        height: 100%;
    }
    .basic--card h1 {
        font-family: 'Restora'!important;
        font-style: normal;
        font-weight: 700!important;
        font-size: 28px;
        line-height: 32px;
        letter-spacing: -0.02em;
        color: #2C576E;
    }
    .basic--card p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 30px;
        letter-spacing: -0.01em;
        color: #485761;
    }
    .basic--card .card--body {
        min-height: 200px;
        margin-bottom: 25px;
    }
    .basic--card .card-button {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        letter-spacing: -0.01em;
        color: #727272;
        background-color: rgb(235, 235, 235);
        width: 128px;
        height: 60px;
        text-decoration: unset;
        border-radius: 50px;
    }
</style>
<!-- dashboard approve css -->
<script>
import CareproviderHeader from '../../components/CareproviderHeader.vue'
import Footer from '../../components/Footer.vue'

import Helpers from '../helpers/helper'
import axios from 'axios'
import moment from 'moment'

import ErrorModal from '../../components/ErrorModal.vue'
import RemindModel from '../../components/RemindModel.vue'
import SuccessModal from '../../components/SuccessModal.vue'
export default {
    name : 'Dashboard',
    mounted(){
        this.session();
    },
    components : {
        CareproviderHeader,
        Footer,
        ErrorModal,
        SuccessModal,
        RemindModel
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
            remind : {
                status : false,
                title : null,
                message : null
            },
            remind1 : {
                status : false,
                title : null,
                message : null
            },
            firstname : null,
            month : null,
            day : null,
            today : null,
            ampm : null,
            details: {},
            file : null,
            isLoading : false,
            img : null,
            sessionData:[],
            firstday: ''
        }
    },
    methods : {
        token(){
            return Helpers.getToken("token")
        },
        getDay() {
            var curr = new Date; // get current date
            var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
            this.firstday = new Date(curr.setDate(first));
            this.firstday = moment(String(this.firstday)).format('YYYY-MM-DD'),
            console.log("test")
            console.log(this.firstday)
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
        async filePreview(event){
            try{
                console.log(event.target.files[0])
                this.file = event.target.files[0]
            }
            catch(error){
                console.log(error)
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
            }

        },
        async vanguardUpload() {
            if(!this.file){
                this.error.status = true,
                this.error.title = ""
                this.error.message = "Please choose a PDF file first!"
            }

            this.isLoading = true

            try{
                let form = new FormData()
                form.append('file', this.file)

                const entry = await axios.put(this.env.vanguardUpload,form,{
                    headers: {
                        'token': `${this.token()}`
                    }
                })

                console.log(entry)
                this.file = null
                this.success.status = true
                this.success.title = "Success"
                this.success.message = "Your file is submitted to Vanguard."
                this.isLoading = false
                this.loadData()
            }
            catch(error){
                console.log(error)
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
            }
        },
        async completeProfile(percent){
            console.log(percent)
            if(localStorage.getItem(this.details._id)) return
            if(percent != 100) return

            this.success.status = true,
            this.success.title = "Success"
            this.success.message = "You have successfully completed the last step of Registration. Thank you nd welcome to the eSafeTalk Family!"

            localStorage.setItem(this.details._id,"done")
        },
        async session(){
       const d = await axios.get(this.env.currentSession,             
              {
                  headers: {
                      "Content-Type": "application/json",
                        "token": `${this.token()}`
                  }
              })
        console.log("result");
        this.sessionInfo  = d.data.data;
        if (d.data.status) {
            var sessionInfo = d.data.data;
            console.log("sessionInfo");
            console.info(sessionInfo);
            this.sessionData = sessionInfo;
            const reversed = this.sessionData.reverse();
            console.log('reversed:', reversed);

            return true;
        }
        else{
          return false;
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
                    this.details = entry.data.data
                    this.firstname = entry.data.data.firstname

                    if(entry.data.data.vanguard_upload.length == 0){
                        this.remind.status = true,
                        this.remind.title = ""
                        this.remind.message = "Please upload PDF to vanguard."
                    }
                    
                    if(entry.data.data.img.length == 0){
                        this.remind1.status = true,
                        this.remind1.title = ""
                        this.remind1.message = "Please upload your profile picture."
                    }

                    this.completeProfile(this.details.stepsPercentage)
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
        this.getDay()
    }
}
</script>