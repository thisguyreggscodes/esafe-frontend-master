<template>
    <CareproviderHeader section="session"/>
    <CPSessionSubHeader section="history"/>
    
    <div class="container shadow rounded bg-white p-3 py-5">
        <div class="session-cards border-bottom py-3">
            <div class="d-flex justify-content-between align-items-center mb-3" v-if="history.docs.length <=0">
            No Session History Found
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3" v-for="h in history.docs" :key="h._id">
                <span class="d-flex align-items-center">
                    <div class="rounded-circle overflow-hidden border border-maincolor me-3" style="height:50px;width:50px;">
                        <!-- img src -->
                        <img src="../../assets/images/profile.png" alt="user">
                    </div>
                    <span>
                        <p class="fw-bolder m-0">{{h.session_set.cs_id.profile.firstname}}</p>
                        <small class="text-muted">{{h.time_start}} - {{h.time_end}} | {{new Date(h.date).toDateString()}}</small>
                    </span>
                </span>

                <span class="d-flex justify-content-end align-items-center">
                    <div class="alert alert-success border p-1 m-0 me-3 border-success" role="alert">
                        <small>{{h.status}}</small>
                    </div>
                    <button @click="loadData(h._id)" data-bs-toggle="modal" data-bs-target="#modal" class="rounded-pill border fw-bolder btn px-4 py-2 btn-small border-maincolor">
                        <small>View details</small>
                    </button>
                </span>
            </div>
        </div>
        <div v-if="this.length >= 10" class="row border-top">
                    <div class="pagination justify-content-center font-poppins mt-5 ">
                        <a href="#" @click="prev()" v-if="hasPrevPage == true" class="btn shadow-md shadow rounded-circle border m-2"><i class="bi bi-arrow-left m-0 p-0 fs-5"></i></a>
                        <a href="#" class="active-paginator pb-1">{{page}}</a>
                        <a href="#" @click="next()" v-if="hasNextPage == true" class="btn shadow-md shadow rounded-circle border m-2"><i class="bi bi-arrow-right m-0 p-0 fs-5"></i></a>
                    </div>
        </div>
        <div v-else class="hidden"></div>
    </div>

    <Footer/>

    <div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header align-items-start">
                    <span>
                        <img src="@/assets/img/message-sm-icon.png"/><br/><br/>
                        <h5 class="text-boldcolor fw-bolder">{{new Date(inputs.date).toDateString()}}</h5>
                        <small class="text-muted">10:00 AM - 10:00 PM</small>
                    </span>
                    <span>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </span>
                </div>
                <div class="modal-body">
                    <p class="text-muted">Amount Requested</p>
                    <p>&#8369;{{inputs.amount}}</p>
                    <div class="d-flex border-bottom mb-3 pb-3">
                        <span>
                            <small class="text-muted">Status</small>
                            <div class="alert alert-success border p-1 m-0 me-3 border-success" role="alert">
                                <small>{{inputs.status}}</small>
                            </div>
                        </span>
                        <span>
                            <small class="text-muted d-block">Payment Due</small>
                            <p class="mb-0">Jan 9 2022</p>
                        </span>
                    </div>
                    <div class="pb-3">
                        <span class="d-flex align-items-center">
                            <div class="rounded-circle overflow-hidden border border-maincolor me-3" style="height:50px;width:50px;">
                                <!-- img src -->
                                <img src="../../assets/images/profile.png" alt="user">
                            </div>
                            <p class="m-0 fw-bolder text-boldcolor">{{inputs.name}}</p>&nbsp;&nbsp;&nbsp;&nbsp;
                            <RouterLink :to="'/careprovider/session/aboutcareseeker/'+inputs.cs_id" class="btn btn-small border px-3 text-muted">
                                View
                            </RouterLink>
                        </span>
                        <!-- <small class="text-muted d-block ml-5">
                            <i class="bi bi-envelope-fill text-boldcolor me-2"></i>
                            {{inputs.email}}
                        </small> -->
                    </div>
                    <div v-if="new Date() >= new Date( (new Date(inputs.date).toDateString()) +' '+ convertTime(inputs.time_start))">
                    <RouterLink :to="'/careprovider/evaluation/'+inputs.id" class="d-block w-100 py-3 text-light btn rounded-pill bg-main">
                        <i class="bi bi-file-text"></i>
                        Open Evaluation Sheet
                    </RouterLink>
                    </div>

                    <div v-else>
                    <RouterLink :to="`/careprovider/session/calendar/${firstday}`" class="d-block w-100 py-3 text-light btn rounded-pill bg-main">
                        <i class="bi bi-calendar"></i>
                        View Calendar
                    </RouterLink>
                    </div>
                    <!-- <small class="d-block mt-2 text-muted text-center">
                        <i class="bi bi-exclamation-circle-fill text-warning"></i>
                        Your evaluation for this session is pending.
                    </small> -->
                </div>
            </div>
        </div>
    </div>

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
    .session-cards p,
    .session-cards small{
        font-size:.8em !important
    }
    .session-cards:nth-last-child(1){
        border:unset !important
    }
    
    @media only screen and (max-width: 600px) {
        .session-cards > div{
            flex-direction:column !important;
            justify-content:unset !important;
            align-items:unset !important;
        }
        .session-cards > div span:nth-last-child(1){
            justify-content:unset !important;
            align-items:unset !important;
            margin-top:10px !important;
        }
    }
</style>
<script>
import CareproviderHeader from '../../components/CareproviderHeader.vue'
import CPSessionSubHeader from '../../components/CPSessionSubHeader.vue'
import Footer from '../../components/Footer.vue'
import Helpers from '../helpers/helper'
import axios from 'axios'
import ErrorModal from '../../components/ErrorModal.vue'
import SuccessModal from '../../components/SuccessModal.vue'
import moment from 'moment'
export default {
    name : 'SessionHistory',
    components : {
        CareproviderHeader,
        CPSessionSubHeader,
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
            inputs : {
                date : null,
                time_start : null,
                time_end : null,
                amount : null,
                status : null,
                name : null,
                id : null,
                email: null,
                cs_id: null
            },
            hasNextPage : false,
            hasPrevPage: false,
            page : 1,
            limit : 10,
            history: [],
            length: null,
            firstday: ''
        };
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
        convertTime(input) {
            return moment(input, 'h:mm a').format('HH:mm:ss');
        },
        viewDetails(data) {
            this.$refs["viewDetails"].show();
            console.log(data);
        },
        next(){
            this.page++
            this.loadSession()
        },
        prev(){
            this.page--
            this.loadSession()
        },
        async loadSession() {
            try {
                const d = await axios.get(`${this.env.sessionHistory}?limit=${this.limit}&page=${this.page}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "token": `${this.token()}`
                    }
                });
                console.log("result");
                console.log(d.data.status);
                if (d.data.status) {
                    var sessionData = d.data.data;
                    console.log("sessionData");
                    console.info(sessionData);
                    this.history = sessionData;
                    
                    this.hasNextPage = d.data.data.hasNextPage
                    this.hasPrevPage = d.data.data.hasPrevPage
                    this.page = d.data.data.page
                    this.length = d.data.data.docs.length
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.log(error);
                this.error.status = true;
                this.error.title = "";
                this.error.message = error;
            }
        },
        async loadData(id){
            try{
            const entry = await axios.get(this.env.getSessionById+"/"+id,{
                headers: {
                    'token': `${this.token()}`
                }
            })
            if(entry.data.status){
                var sessionID = entry.data.data;
                    console.log("sessionID");
                    console.info(sessionID);
                this.inputs.date = entry.data.data.date
                this.inputs.time_start = entry.data.data.time_start
                this.inputs.time_end = entry.data.data.time_end
                this.inputs.amount = entry.data.data.session_set.invoice.amount
                this.inputs.status = entry.data.data.status
                this.inputs.name = entry.data.data.session_set.cs_id.profile.firstname
                this.inputs.email = entry.data.data.session_set.cs_id.email
                this.inputs.id = entry.data.data._id
                this.inputs.cs_id = entry.data.data.session_set.cs_id._id
                console.log(this.inputs)
                return
            }
            }
            catch (error) {
                console.log(error);
                this.error.status = true;
                this.error.title = "";
                this.error.message = error;
            }
        }
    },
    created () {
        this.loadSession()
        this.getDay()
    }
}
</script>