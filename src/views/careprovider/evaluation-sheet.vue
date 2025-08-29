<template>
    <CareproviderHeader section="session"/>
    <CPSessionSubHeader section="history"/>
    
    <div class="container shadow rounded bg-white p-3 py-5">
        <div class="d-flex">
            <div class="d-flex border rounded p-2" id="grid-item-top">
                <span class="border-bottom p-3 g-item">
                    <p class="m-0 fw-bolder text-boldcolor">{{new Date(inputs.date).toDateString()}}</p>
                    <small class="d-block text-muted" style="font-size:.8em">{{inputs.time_start}} - {{inputs.time_end}}</small>
                </span>
                <span class="d-flex align-items-center p-3 border-start g-item">
                    <div class="rounded-circle overflow-hidden border border-maincolor me-3" style="height:40px;width:40px;">
                        <!-- img src -->
                    </div>
                    <p class="fw-bolder text-boldcolor m-0 me-3">{{inputs.name}}</p>
                    <RouterLink :to="'/careprovider/session/aboutcareseeker/'+inputs.cs_id" class="btn btn-small border px-3 text-muted">
                        View
                    </RouterLink>
                </span>
            </div>
        </div>

        <content class="py-3 d-block mx-auto" style="max-width:550px">
            <h1 class="ff-restora text-boldcolor text-center py-3 mt-3">Post-Therapy Evaluation</h1>
            <p class="text-center">Please help us assess how our clients are experiencing your therapeutic work and improving outcomes through systematic feedback after each session.</p>
            <p class="text-center">This form will not be shared with other Care Providers or clients and has restricted viewing for only select eSafeTalk staff.</p>
        </content>

        <div class="border-top border-bottom py-3">
            <div class="form-check me-2 d-inline-block">
                <input v-model="model.is_showed_up" class="form-check-input rounded-circle" type="checkbox" value="true" id="show_up">
                <label class="form-check-label" for="show_up">
                    The client did not show up.
                </label>
            </div>
        </div>

        <div class=" border-bottom py-3">
            <p>1. In your opinion was the chosen mode of therapy (Video Chat) the best and safest option for your clients well-being at this time?</p><br>
            <div class="form-check me-2 d-inline-block">
                <input v-model="model.q1" class="form-check-input rounded-circle" type="radio" name="q1" value="yes">
                <label class="form-check-label" for="" style="font-size: .9em;">
                    Yes
                </label>
            </div>
            <div class="form-check me-2 d-inline-block">
                <input v-model="model.q1" class="form-check-input rounded-circle" type="radio" name="q1" value="no">
                <label class="form-check-label" for="">
                    No
                </label>
            </div>
            <div class="form-check me-2 d-inline-block">
                <input v-model="model.q1" class="form-check-input rounded-circle" type="radio" name="q1" value="Needs further evaluation" id="">
                <label class="form-check-label" for="">
                    Needs further evaluation
                </label>
            </div>
        </div>

        <div class=" border-bottom py-3">
            <p>2. Does the client need to increase therapy time?</p><br>
            <div class="form-check me-2 d-inline-block">
                <input v-model="model.q2" class="form-check-input rounded-circle" type="radio" name="q2" value="yes">
                <label class="form-check-label" for="">
                    Yes
                </label>
            </div>
            <div class="form-check me-2 d-inline-block">
                <input v-model="model.q2" class="form-check-input rounded-circle" type="radio" name="q2" value="no">
                <label class="form-check-label" for="">
                    No
                </label>
            </div>
            <div class="form-check me-2 d-inline-block">
                <input v-model="model.q2" class="form-check-input rounded-circle" type="radio" name="q2" value="Needs further evaluation" id="">
                <label class="form-check-label" for="">
                    Needs further evaluation
                </label>
            </div>
        </div>

        <div class=" border-bottom py-3">
            <p>3. Was the client receptive to therapy and were you able to achieve your therapy goal?</p><br>
            <div class="form-check me-2 d-inline-block">
                <input v-model="model.q3" class="form-check-input rounded-circle" type="radio" name="q3" value="yes">
                <label class="form-check-label" for="">
                    Yes, the client was receptive and goals are achieved
                </label>
            </div>
            <div class="form-check me-2 d-inline-block">
                <input v-model="model.q3" class="form-check-input rounded-circle" type="radio" name="q3" value="no">
                <label class="form-check-label" for="">
                    No, needs further evaluation
                </label>
            </div>
        </div>

        <div class=" py-3">
            <p>4. We need to anticipate that our client’s needs may change; at this time, do you recommend that your client be seen by another Care Provider (MD, RPsy, or RGC) in order to facilitate a more effective therapy outcome?</p><br>
            <div class="form-check me-2 d-inline-block">
                <input v-model="model.q4" class="form-check-input rounded-circle" type="radio" name="q4" value="yes">
                <label class="form-check-label" for="">
                    Yes
                </label>
            </div>
            <div class="form-check me-2 d-inline-block">
                <input v-model="model.q4" class="form-check-input rounded-circle" type="radio" name="q4" value="no">
                <label class="form-check-label" for="">
                    No
                </label>
            </div>
        </div>

        <input type="hidden" v-model="model.cs_id">

        <button @click="submit()" :class="`${hasEvaluation ? 'd-none' : 'd-block'} w-100 py-3 fw-bolder mt-5 text-light btn rounded-pill bg-main`">
            <h5>Submit Evaluation</h5>
        </button>
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
    .session-cards p,
    .session-cards small{
        font-size:.8em !important
    }
    .session-cards:nth-last-child(1){
        border:unset !important
    }
    
    @media only screen and (min-width: 600px) {
        .g-item:nth-last-child(2){
            border:unset !important
        }
    }

    @media only screen and (max-width: 600px) {
        .session-cards > div{
            flex-direction:column !important;
            justify-content:unset !important;
            align-items:unset !important;
        }
        #grid-item-top{
            flex-direction:column !important;
        }
        .g-item:nth-last-child(1){
            border:unset !important
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
export default {
    name : 'EvaluationSheet',
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
                name : null,
                cs_id : null
            },
            model : {
                is_showed_up : false,
                q1 : null,
                q2 : null,
                q3 : null,
                q4 : null,
                cs_id : null
            }
        }
    },
    methods : {
        token(){
            return Helpers.getToken("token")
        },
        async loadData(){
        const id = this.$route.params.id;
        if (id){
            try{
            const entry = await axios.get(this.env.getSessionById+"/"+id,{
                headers: {
                    'token': `${this.token()}`
                }
            })

            if(entry.data.status){
                var sessionData = entry.data.data;
                    console.log("sessionData");
                    console.info(sessionData);

                this.inputs.date = entry.data.data.date
                this.inputs.time_start = entry.data.data.time_start
                this.inputs.time_end = entry.data.data.time_end
                this.inputs.cs_id = entry.data.data.session_set.cs_id._id
                this.inputs.name = entry.data.data.session_set.cs_id.profile.firstname
                this.model.cs_id = entry.data.data.session_set.cs_id._id
                this.model.is_showed_up = entry.data.data?.eval_to_cs?.is_showed_up?.toString() || ""
                this.model.q1 = entry.data.data?.eval_to_cs?.q1?.toString() || ""
                this.model.q2 = entry.data.data?.eval_to_cs?.q2?.toString() || ""
                this.model.q3 = entry.data.data?.eval_to_cs?.q3?.toString() || ""
                this.model.q4 = entry.data.data?.eval_to_cs?.q4?.toString() || ""
                this.hasEvaluation = entry.data.data?.eval_to_cs

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
        async submit(){
        this.model.is_showed_up = this.model.is_showed_up?true:false
        const id = this.$route.params.id;
        if (id){
            try{
            const response = await axios.post(this.env.evaluation+id,this.model,{
            headers: {
                    'Content-Type': 'application/json',
                    'token': `${this.token()}`
                }
          })
          
          console.log(response)
          console.log(this.model)
                this.success.status = true
                this.success.title = "Success"
          
        } catch (error){
          console.log(error)
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
        }
        }
        }

    },
    created () {
    this.loadData()
    }
}
</script>