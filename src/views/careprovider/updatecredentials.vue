<template>
    <CareproviderHeader section="profile"/>
    <CareproviderSubHeader section="credentials"/>
    <div class="container">
        <div class="mx-auto" style="max-width:800px;width:100%">
            <div class="rounded shadow shadow-sm bg-white p-4 mt-5">

                <div class="accordion accordion-flush">
                    <div class="accordion-item">
                        <div class="accordion-header" id="panelsStayOpen-headingOne">
                            <div class="px-3 d-flex align-items-center justify-content-between mb-3" @click="accord1 = !accord1" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true">
                                <span :class="`fw-bolder ${accord1 ? 'text-maincolor' : 'text-boldcolor'}`">Educational Background</span>

                                <div class="rounded-circle border d-flex align-items-center justify-content-center" style="width:30px;height:30px">
                                    <i :class="`bi bi-${accord1 ? 'dash text-maincolor' : 'plus'} fs-5 `"></i>
                                </div>
                            </div>
                        </div>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                            <div class="accordion-body">
                                <div class="">
                                    <label for="tertiary" class="text-muted fw-bolder mb-2">Tertiary Educational Background</label>
                                    <input v-model.trim="inputs.tertiary_educ" type="text" id="tertiary" class="input-mainbg py-2 px-3 form-control" placeholder="Provide your Tertiary Educational Background">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header" id="panelsStayOpen-headingTwo">
                            <div class="px-3 d-flex align-items-center justify-content-between my-3" @click="accord2 = !accord2" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false">
                                <span :class="`fw-bolder ${accord2 ? 'text-maincolor' : 'text-boldcolor'}`">Credentials & License</span>

                                <div class="rounded-circle border d-flex align-items-center justify-content-center" style="width:30px;height:30px">
                                    <i :class="`bi bi-${accord2 ? 'dash text-maincolor' : 'plus'} fs-5 `"></i>
                                </div>
                            </div>
                        </div>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                            <div class="accordion-body">
                                <span>
                                    <label class="text-muted fw-bolder mb-2">Choose your current license type</label>
                                    <div class="">
                                        <div class="form-check me-2 d-inline-block">
                                            <input v-model.trim="inputs.license_type" @change="loadServices()" class="form-check-input rounded-circle" type="radio" value="Psychiatrist" id="license_type">
                                            <label class="form-check-label" for="license_type" style="font-size: .9em;">
                                                Psychiatrist
                                            </label>
                                        </div>
                                        
                                        <div class="form-check me-2 d-inline-block">
                                            <input v-model.trim="inputs.license_type" @change="loadServices()" class="form-check-input rounded-circle" type="radio" value="License Psychologist" id="license_type2">
                                            <label class="form-check-label" for="license_type2" style="font-size: .9em;">
                                                Licensed Psychologist
                                            </label>
                                        </div>
                                        
                                        <div class="form-check me-2 d-inline-block">
                                            <input v-model.trim="inputs.license_type" @change="loadServices()" class="form-check-input rounded-circle" type="radio" value="Registered Guidance Counselor" id="license_type3">
                                            <label class="form-check-label" for="license_type3" style="font-size: .9em;">
                                                Registered Guidance Counselor
                                            </label>
                                        </div>
                                    </div>
                                </span>
                                
                                <div class="d-grid grid-col2 grid-gap3 mt-3 mb-3">
                                    <span>
                                        <label for="license_num" class="text-muted fw-bolder mb-2">License Number</label>
                                        <input v-model.trim="inputs.license_num" type="text" id="license_num" class="form-control input-mainbg py-2 px-3" placeholder="e.g., 1234567890">
                                    </span>
                                    <span>
                                        <label for="year_issued" class="text-muted fw-bolder mb-2">Year issued</label>
                                        <input v-model.trim="inputs.year_issued" type="text" id="year_issued" class="form-control input-mainbg py-2 px-3" placeholder="e.g., 2001">
                                    </span>
                                </div>
                                
                                <hr class="mt-4 bg-opacity-25 border-bottom border-top border-1">
                                
                                <span>
                                    <label class="text-muted fw-bolder mb-2">How long have you been practicing your profession?</label>
                                    <div class="">
                                        <div class="form-check me-2 d-inline-block">
                                            <input v-model.trim="inputs.years_practicing" class="form-check-input rounded-circle" type="radio" value="Less than 1 year" name="years_practicing">
                                            <label class="form-check-label" style="font-size: .9em;">
                                                Less than 1 year
                                            </label>
                                        </div>
                                        
                                        <div class="form-check me-2 d-inline-block">
                                            <input v-model.trim="inputs.years_practicing" class="form-check-input rounded-circle" type="radio" value="1 to 5 years" name="years_practicing">
                                            <label class="form-check-label" style="font-size: .9em;">
                                                1 to 5 years
                                            </label>
                                        </div>
                                        
                                        <div class="form-check me-2 d-inline-block">
                                            <input v-model.trim="inputs.years_practicing" class="form-check-input rounded-circle" type="radio" value="6 to 10 years" name="years_practicing">
                                            <label class="form-check-label" style="font-size: .9em;">
                                                6 to 10 years
                                            </label>
                                        </div>
                                        
                                        <div class="form-check me-2 d-inline-block">
                                            <input v-model.trim="inputs.years_practicing" class="form-check-input rounded-circle" type="radio" value="10+ years" name="years_practicing">
                                            <label class="form-check-label" style="font-size: .9em;">
                                                10+ years
                                            </label>
                                        </div>
                                    </div>
                                </span>
                                
                                <div class="mt-3">
                                    <label for="expectation" class="fw-bold text-muted mb-2">What should your clients expect from you?</label>
                                    <textarea id="expectation" maxlength="500" v-on:input="textArea()" v-model.trim="inputs.client_expectation" class="form-control input-mainbg py-2 px-3" placeholder="Write about your style here" style="height:120px"></textarea>
                                    <div class="d-flex justify-content-end mt-2">
                                        <small class="fw-bolder text-muted">{{(remainingText > 0) ? remainingText : ''}}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header" id="panelsStayOpen-headingThree">
                            <div class="px-3 d-flex align-items-center justify-content-between my-3" @click="accord3 = !accord3" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" >
                                <span :class="`fw-bolder ${accord3 ? 'text-maincolor' : 'text-boldcolor'}`">Services</span>
                                
                                <div class="rounded-circle border d-flex align-items-center justify-content-center" style="width:30px;height:30px">
                                    <i :class="`bi bi-${accord3 ? 'dash text-maincolor' : 'plus'} fs-5 `"></i>
                                </div>
                            </div>
                        </div>
                        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
                            <div class="accordion-body">
                                <span class="d-block">
                                    <label class="fw-bold text-muted mt-3 mb-2">
                                        <span class="fw-bold">I work with...</span>&nbsp;
                                        <span class="text-muted">Check all that apply</span>
                                    </label>
                                    <br>
                                    <span v-for="ww in work_with" v-bind:key="ww._id">
                                        <button v-on:click="selectedBtn(ww)" :class="`${ ww.extraClass } btn px-4 py-2 fw-bold rounded-pill me-2 my-2 work_with_btn`">
                                            <small>{{ww.title}}</small>
                                        </button>
                                    </span>
                                </span>
                                <span class="d-block">
                                    <label class="fw-bold text-muted mt-5 mb-2">
                                        <span class="fw-bold">Your Core Services</span>&nbsp;
                                        <span class="text-muted">Check all that apply</span>
                                    </label>
                                    <br>
                                    <span v-for="cc in core_service" v-bind:key="cc._id">
                                        <button v-on:click="selectedBtn(cc)" :class="`${ cc.extraClass } btn px-4 py-2 fw-bold rounded-pill me-2 my-2 core_service_btn`">
                                            <small>{{cc.title}}</small>
                                        </button>
                                    </span>
                                </span>
                                
                                <span class="d-block">
                                    <label class="fw-bold text-muted mt-5 mb-2">
                                        <span class="fw-bold">Your Scope of Practice</span>&nbsp;
                                        <span class="text-muted">Check all that apply</span>
                                    </label>
                                    <br>
                                    <span v-for="sc in scope" v-bind:key="sc._id">
                                        <button v-on:click="selectedBtn(sc)" :class="`${ sc.extraClass } btn px-4 py-2 fw-bold rounded-pill me-2 my-2 scope_btn`">
                                            <small>{{sc.title}}</small>
                                        </button>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="d-flex mt-5">
                    <button @click="submit()" class="btn btn-sm bg-main text-white fw-bolder px-4 rounded-pill py-2 mb-3 me-3">
                        Save changes
                    </button>
                    <!-- <button class="btn btn-sm rounded-pill btn bg-secondary mb-3 bg-opacity-25 text-dark fw-bold px-4">
                        Cancel
                    </button> -->
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
    name : 'UpdateBilling',
    components : {
        CareproviderHeader,
        CareproviderSubHeader,
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
            accord1 : true,
            accord2 : false,
            accord3 : false,
            inputs : {
                tertiary_educ : null,
                license_num : null,
                license_type : null,
                year_issued : null,
                years_practicing : null,
                client_expectation : null,
                work_with : [],
                scope : [],
                core_service : []
            },
            work_with : [],
            scope : [],
            core_service : [],
            textAreaLength : 0,
            remainingText : 500
        }
    },
    methods : {

        textArea () {
            let _len = this.inputs.client_expectation.length || 0

            this.remainingText = 500 - _len
        },
        token(){
            return Helpers.getToken("token")
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
                    this.inputs.tertiary_educ = entry.data.data.tertiary_educ
                    this.inputs.license_num = entry.data.data.license.license_num
                    this.inputs.license_type = entry.data.data.license.license_type
                    this.inputs.year_issued = entry.data.data.license.year_issued
                    this.inputs.years_practicing = entry.data.data.license.years_practicing
                    this.inputs.client_expectation = entry.data.data.counseling_session.client_expectation
                    this.inputs.work_with = entry.data.data.services.work_with
                    this.inputs.scope = entry.data.data.services.scope
                    this.inputs.core_service = entry.data.data.services.core_service

                    this.loadServices()
                    this.textArea()
                    return
                }

                console.log(entry)
                this.$router.push({
                    name : 'Login'
                })
                return 

            }
            catch(error){
                console.log(error)
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
            }
        },
        selectedBtn (me) {
            if(me.extraClass == 'bg-light text-dark'){
                me.extraClass = 'bg-main text-light'
            }else{
                me.extraClass = 'bg-light text-dark'
            }
        },
        async loadServices () {
            try{
                if(!(this.inputs.license_type)) return

                const services = await axios.get(this.env.services+"/"+(this.inputs.license_type.replaceAll(' ','_').toLowerCase()))

                const data = services.data.data[0]
                if(!data){
                    this.work_with = []
                    this.core_service = []
                    this.scope = []
                    return
                }
                this.work_with = [...data.work_with]

                this.work_with = this.work_with.map((item) => {
                    return ({
                        ...item,
                        extraClass : 'bg-light text-dark'
                    })
                })

                this.core_service = [...data.core_service]

                this.core_service = this.core_service.map((item) => {
                    return ({
                        ...item,
                        extraClass : 'bg-light text-dark'
                    })
                })

                this.scope = [...data.scope]

                this.scope = this.scope.map((item) => {
                    return ({
                        ...item,
                        extraClass : 'bg-light text-dark'
                    })
                })

                this.work_with.forEach((item) => {
                    this.inputs.work_with.forEach((i) => {
                        return item._id == i.title && (item.extraClass = 'bg-main text-light')
                    })
                })
                this.core_service.forEach((item) => {
                    this.inputs.core_service.forEach((i) => {
                        return item._id == i.title && (item.extraClass = 'bg-main text-light')
                    })
                })
                this.scope.forEach((item) => {
                    this.inputs.scope.forEach((i) => {
                        return item._id == i.title && (item.extraClass = 'bg-main text-light')
                    })
                })
                return
            }
            catch(error){
                console.log(error)
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
            }
        },
        async submit () {
            if(this.remainingText > 0){
                this.error.status = true
                this.error.title = ""
                this.error.message = "Minimum 500 characters, You still have "+this.remainingText+" left."
                return
            }
            try{
                
                this.inputs.work_with = this.work_with.map((item) => {
                    return item.extraClass == 'bg-main text-light' && ({title:item._id})
                }).filter(item => item != false)
                
                this.inputs.core_service = this.core_service.map((item) => {
                    return item.extraClass == 'bg-main text-light' && ({title:item._id})
                }).filter(item => item != false)

                this.inputs.scope = this.scope.map((item) => {
                    return item.extraClass == 'bg-main text-light' && ({title:item._id})
                }).filter(item => item != false)

                const entry = await axios.put(this.env.credentials,{
                    tertiary_educ : this.inputs.tertiary_educ,
                    license_num : this.inputs.license_num,
                    license_type : this.inputs.license_type,
                    year_issued : this.inputs.year_issued,
                    years_practicing : this.inputs.years_practicing,
                    client_expectation : this.inputs.client_expectation,
                    work_with : this.inputs.work_with,
                    core_service : this.inputs.core_service,
                    scope : this.inputs.scope,
                },{
                    headers : {
                        'token' : this.token(),
                        "content-type" : "application/json"
                    }
                })

                this.success.status = true
                this.success.title = "Success"
                this.success.message = "Changes saved successfully!"
                console.log(entry)
            }
            catch(error){
                console.log(error)
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
            }
        },
    },
    created () {
        this.loadData()
    }
}
</script>