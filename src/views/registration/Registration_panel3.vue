<template>
    <Header/>
    <div class="container mt-4 mb-5 shadow bg-white rounded-3" v-on:keyup.enter="shareData()">
        <div class="form-navigation p-4 border-bottom">
            <small>
                <span class="text-subcolor">Tell us about you</span> &nbsp;
                <span class="fw-bold text-boldcolor">Experience</span>
            </small>
            <span class="d-flex align-items-center mt-2">
                <div class="progress flex-fill me-3" style="height:8px">
                    <div class="progress-bar rounded-pill bg-main" role="progressbar" style="width: 55%;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="bar-value text-maincolor fw-bold">55%</small>
            </span>
        </div>
        <div class="form-container p-4 mt-3">
            <div class="mx-auto" style="max-width:680px;">
                <span>
                    <label for="tertiary" class="fw-bold text-boldcolor mb-2">Tertiary Educational Background</label>
                    <input type="text" id="tertiary" v-model.trim="inputs.tertiary_educ" class="form-control input-mainbg py-2 px-3" placeholder="Provide your Tertiary Educational Background">
                </span>
                <hr class="mt-4 bg-opacity-25 border-bottom border-top border-1">

                <p class="fw-bold text-boldcolor fs-5">License Information</p>
                <p class="fw-light">
                    Please provide your professional license details.
                </p>

                <span>
                    <label class="fw-bold text-boldcolor mb-2">Choose your current license type</label>
                    <div class="">
                        <div class="form-check me-2 d-inline-block">
                            <input class="form-check-input rounded-circle" @change="loadData()" v-model.trim="inputs.license_type" type="radio" value="Psychiatrist" id="license_type">
                            <label class="form-check-label" for="license_type" style="font-size: .9em;">
                                Psychiatrist
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block">
                            <input class="form-check-input rounded-circle" @change="loadData()" v-model.trim="inputs.license_type" type="radio" value="License Psychologist" id="license_type2">
                            <label class="form-check-label" for="license_type2" style="font-size: .9em;">
                                Licensed Psychologist
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block">
                            <input class="form-check-input rounded-circle" @change="loadData()" v-model.trim="inputs.license_type" type="radio" value="Registered Guidance Counselor" id="license_type3">
                            <label class="form-check-label" for="license_type3" style="font-size: .9em;">
                                Registered Guidance Counselor
                            </label>
                        </div>
                    </div>
                </span>
                
                <div class="d-grid grid-col2 grid-gap3 mt-3 mb-3">
                    <span>
                        <label for="license_num" class="fw-bold text-boldcolor mb-2">License Number</label>
                        <input type="text" id="license_num" v-model.trim="inputs.license_num" class="form-control input-mainbg py-2 px-3" placeholder="e.g., 1234567890">
                    </span>
                    <span>
                        <label for="year_issued" class="fw-bold text-boldcolor mb-2">Year issued</label>
                        <input type="text" id="year_issued" v-model.trim="inputs.year_issued" class="form-control input-mainbg py-2 px-3" placeholder="e.g., 2001">
                    </span>
                </div>
                
                <hr class="mt-4 bg-opacity-25 border-bottom border-top border-1">
                
                <span>
                    <label class="fw-bold text-boldcolor mb-2">How long have you been practicing your profession?</label>
                    <div class="">
                        <div class="form-check me-2 d-inline-block">
                            <input class="form-check-input rounded-circle" type="radio" value="Less than 1 year"  v-model.trim="inputs.years_practicing" name="years_practicing">
                            <label class="form-check-label" style="font-size: .9em;">
                                Less than 1 year
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block">
                            <input class="form-check-input rounded-circle" type="radio" value="1 to 5 years"  v-model.trim="inputs.years_practicing" name="years_practicing">
                            <label class="form-check-label" style="font-size: .9em;">
                                1 to 5 years
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block">
                            <input class="form-check-input rounded-circle" type="radio" value="6 to 10 years"  v-model.trim="inputs.years_practicing" name="years_practicing">
                            <label class="form-check-label" style="font-size: .9em;">
                                6 to 10 years
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block">
                            <input class="form-check-input rounded-circle" type="radio" value="10+ years"  v-model.trim="inputs.years_practicing" name="years_practicing">
                            <label class="form-check-label" style="font-size: .9em;">
                                10+ years
                            </label>
                        </div>
                    </div>
                </span>

                <hr class="mt-4 bg-opacity-25 border-bottom border-top border-1">

                <span class="d-block">
                    <label class="fw-bold text-boldcolor mt-3 mb-2">
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
                    <label class="fw-bold text-boldcolor mt-5 mb-2">
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
                    <label class="fw-bold text-boldcolor mt-5 mb-2">
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


            <div class="navigate-btn-container d-flex justify-content-between align-items-center my-5 px-5 py-3">
                <RouterLink to="/careprovider/registration/account" class="rounded-pill btn bg-secondary bg-opacity-25 text-dark fw-bold py-3 px-4">
                    <small>Previous</small>
                </RouterLink>
                
                <button @click="shareData()" class="bg-main btn px-4 py-3 text-light fw-bold rounded-pill">
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
</template>

<script>
import axios from 'axios'
import Header from '../../components/Header.vue'
import ErrorModal from '../../components/ErrorModal.vue'

export default {
    name : 'RegistrationExperience',
    components : {
        Header,
        ErrorModal
    },
    data () {
        return {
            inputs : {
                tertiary_educ : null,
                license_type : null,
                license_num : null,
                year_issued : null,
                years_practicing : null,
                work_with : [],
                scope : [],
                core_service : []
            },
            work_with : [],
            scope : [],
            core_service : [],
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
                if((typeof value == 'object') && (value != null)){
                    if(value.length == 0 && (except.indexOf(key) == -1)) return false
                }
                else{
                    if(!(value) && (except.indexOf(key) == -1) ) return false
                }
            }

            return true
            
        },
        async shareData () {

            this.inputs.work_with = this.work_with.map((item) => {
                return item.extraClass == 'bg-main text-light' && ({title:item._id})
            }).filter(item => item != false)
            
            this.inputs.core_service = this.core_service.map((item) => {
                return item.extraClass == 'bg-main text-light' && ({title:item._id})
            }).filter(item => item != false)

            this.inputs.scope = this.scope.map((item) => {
                return item.extraClass == 'bg-main text-light' && ({title:item._id})
            }).filter(item => item != false)

            let validate = await this.checkProperties(this.inputs)

            if(!validate) {
                this.error.status = true
                this.error.title = "Incomplete fields"
                this.error.message = "Please complete the fields to proceed."
                return
            }

            console.log(this.inputs)
            localStorage.setItem('careprovider_reg_experience', JSON.stringify(this.inputs))

            this.$router.push({
                name : 'RegistrationReferences'
            })
        },
        async loadData () {

            try{
                if(!(this.inputs.license_type)) return

                const services = await axios.get(this.env.services+"/"+(this.inputs.license_type.replaceAll(' ','_').toLowerCase()))

                console.log(services)

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

                if(localStorage.getItem('careprovider_reg_experience')){
                    let storage = JSON.parse(localStorage.getItem('careprovider_reg_experience'))

                    this.inputs.tertiary_educ = storage.tertiary_educ
                    this.inputs.license_num = storage.license_num
                    this.inputs.license_type = storage.license_type
                    this.inputs.year_issued = storage.year_issued
                    this.inputs.years_practicing = storage.years_practicing
                    this.work_with.forEach((item) => {
                        storage.work_with.forEach((i) => {
                            return item._id == i.title && (item.extraClass = 'bg-main text-light')
                        })
                    })
                    this.core_service.forEach((item) => {
                        storage.core_service.forEach((i) => {
                            return item._id == i.title && (item.extraClass = 'bg-main text-light')
                        })
                    })
                    this.scope.forEach((item) => {
                        storage.scope.forEach((i) => {
                            return item._id == i.title && (item.extraClass = 'bg-main text-light')
                        })
                    })
                }
            }
            catch(err){
                console.error(err)
            }
        },
        selectedBtn (me) {
            if(me.extraClass == 'bg-light text-dark'){
                me.extraClass = 'bg-main text-light'
            }else{
                me.extraClass = 'bg-light text-dark'
            }
        }
    },
    created(){
        if(!(localStorage.getItem('careprovider_reg_account'))){
            this.$router.push({
                name : 'RegistrationAccount'
            })
        }

        this.loadData()
    }
}
</script>