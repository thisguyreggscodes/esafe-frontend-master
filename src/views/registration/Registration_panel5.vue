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
                    <div class="progress-bar rounded-pill bg-main" role="progressbar" style="width: 89%;" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="bar-value text-maincolor fw-bold">89%</small>
            </span>
        </div>

        <div class="form-container p-4 mt-3">
            <div class="mx-auto" style="max-width:680px;">
                <p class="fw-bold text-boldcolor fs-5">Your counseling sessions</p>
                <p class="fw-light">
                    Let’s set up your counseling session preferences. You can modify these anytime in your settings.
                </p>
                
                <span>
                    <label class="fw-bold text-boldcolor mt-3 mb-3" style="font-size: .8em !important;">
                        <span class="fw-bold">Your Scope of Practice</span>&nbsp;
                        <span class="text-muted">Check all that apply</span>
                    </label>
                    <div class="">
                        <div class="form-check me-2 d-inline-block">
                            <input v-model.trim="lang" class="form-check-input rounded-circle" type="checkbox" value="Filipino/Tagalog" id="lang">
                            <label class="form-check-label" for="lang" style="font-size: .9em;">
                                Filipino/Tagalog
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block">
                            <input v-model.trim="lang" class="form-check-input rounded-circle" type="checkbox" value="English" id="lang2">
                            <label class="form-check-label" for="lang2" style="font-size: .9em;">
                                English
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block">
                            <input v-model.trim="lang" class="form-check-input rounded-circle" type="checkbox" value="Other" id="lang3">
                            <label class="form-check-label" for="lang3" style="font-size: .9em;">
                                Other languages
                            </label>
                        </div>
                    </div>

                    <input type="text" v-model.trim="otherLang" id="other_lang" class="mt-3 form-control input-mainbg py-2 px-3" placeholder="Specify language(s). You can use commas to separate multiple languages.">
                </span>
                
                <hr class="mt-4 bg-opacity-25 border-bottom border-top border-1">

                <span>
                    <label class="fw-bold text-boldcolor mt-3 mb-3" style="font-size: .8em !important;">
                        <span class="fw-bold">I can provide therapy via</span>&nbsp;
                        <span class="text-muted">Check all that apply</span>
                    </label>
                    <div class="">
                        <div class="form-check me-2 d-inline-block">
                            <input v-model.trim="therapy_via" class="form-check-input rounded-circle" type="checkbox" value="Video call" id="via">
                            <label class="form-check-label" for="via" style="font-size: .9em;">
                                Video Call
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block">
                            <input v-model.trim="therapy_via" class="form-check-input rounded-circle" type="checkbox" value="Online Chat" id="via2">
                            <label class="form-check-label" for="via2" style="font-size: .9em;">
                                Online Chat
                            </label>
                        </div>
                        
                        <div class="form-check me-2 d-inline-block">
                            <input v-model.trim="therapy_via" class="form-check-input rounded-circle" type="checkbox" value="Chat" id="via3">
                            <label class="form-check-label" for="via3" style="font-size: .9em;">
                                Chat
                            </label>
                        </div>
                    </div>
                </span>

                <hr class="mt-4 bg-opacity-25 border-bottom border-top border-1">
                
                <p class="fw-bold text-boldcolor fs-5">Your rate</p>
                <p class="fw-light">
                    Your rate can depend on many factors, from your specialty to the demand of users. The rate you set is subject for assessment. Once you’re finished setting up, we’ll let you know when you can start accepting sessions.
                </p>
                
                <div class="d-grid grid-col2 grid-gap3 mt-3 mb-3">
                    <span>
                        <label for="rate" class="fw-bold text-boldcolor mb-2">Your starting rate</label>
                        <input type="number" id="rate" v-model.trim="inputs.rate" v-on:input="setPercentage()" class="form-control input-mainbg py-2 px-3" min="0">
                    </span>
                    <span>
                        <label class="fw-bold text-boldcolor mb-2">Care Seekers will pay</label>
                        <span class="d-flex">
                            <p class="text-maincolor m-0 fw-bold">₱ {{percentage.toFixed(2)}}</p> &nbsp;
                            <small class="text-muted">per hour/session</small>
                        </span>
                        <small style="font-size:.75em">
                            (Your rate +25% management fee)
                        </small>
                    </span>
                </div>
                
                <div class="mb-3 mt-4">
                    <label for="expectation" class="fw-bold text-boldcolor mb-2">What should your clients expect from you?</label>
                    <textarea id="expectation" v-model.trim="inputs.client_expectation" class="form-control input-mainbg py-2 px-3" v-on:input="textArea()" placeholder="Write about your style here" style="height:120px"></textarea>
                    <div class="d-flex justify-content-end mt-2">
                        <small class="fw-bolder text-muted">{{(remainingText > 0) ? remainingText : ''}}</small>
                    </div>
                </div>

                
                <div class="form-check me-2 mt-5">
                    <input class="form-check-input rounded-circle" v-model.trim="inputs.allow1" type="checkbox" value="true" id="allow">
                    <label class="form-check-label" for="allow" style="font-size: .9em;">
                        I agree that eSafeTalk allows Clients to schedule up to three (3) deferred payments for their therapy sessions.
                    </label>
                </div>
                
                <div class="form-check me-2 mt-3">
                    <input class="form-check-input rounded-circle" v-model.trim="inputs.allow2" type="checkbox" value="true" id="allow1">
                    <label class="form-check-label" for="allow1" style="font-size: .9em;">
                        I agree to eSafeTalk's <a href="https://esafetalk.com/privacy-policy/" target="_blank" class="text-maincolor fw-bold">Terms and Conditions.</a>
                    </label>
                </div>
                
                <div class="form-check me-2 mt-3">
                    <input class="form-check-input rounded-circle" v-model.trim="inputs.allow3" type="checkbox" value="true" id="allow2">
                    <label class="form-check-label" for="allow2" style="font-size: .9em;">
                        I agree to eSafeTalk's <a href="https://esafetalk.com/terms-of-use/" target="_blank" class="text-maincolor fw-bold">Privacy Policy.</a>
                    </label>
                </div>
            </div>

            <div class="navigate-btn-container d-flex justify-content-between align-items-center my-5 px-5 py-3">
                <RouterLink to="/careprovider/registration/references" class="rounded-pill btn bg-secondary bg-opacity-25 text-dark fw-bold py-3 px-4">
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
import Header from '../../components/Header.vue'
import ErrorModal from '../../components/ErrorModal.vue'

export default {
    name : 'RegistrationSession',
    components : {
        Header,
        ErrorModal
    },
    data () {
        return {
            inputs : {
                lang : [],
                therapy_via : [],
                rate : 0,
                client_expectation : null,
                allow1 :null,
                allow2 :null,
                allow3 :null
            },
            percentage : 0,
            lang : [],
            otherLang : null,
            therapy_via : [],
            error : {
                status : false,
                title : null,
                message : null
            },
            textAreaLength : 0,
            remainingText : 500
        }
    },
    methods : {
        textArea () {
            let _len = this.inputs.client_expectation.length || 0

            this.remainingText = 500 - _len
        },
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
        setPercentage(){
            this.percentage = (parseFloat(this.inputs.rate) + ((this.inputs.rate/100) * 25)) || 0
        },
        async shareData () {
            if(this.remainingText > 0){
                this.error.status = true
                this.error.title = ""
                this.error.message = "Minimum 500 characters, You still have "+this.remainingText+" left."
                return
            }

            this.inputs.therapy_via = this.therapy_via.map(item => {
                return ({ via : item })
            })
            
            this.inputs.lang = this.lang.map(item => {
                return({language : item})
            })

            this.inputs.lang.push({language:this.otherLang})

            let validate = await this.checkProperties(this.inputs)
                        
            if(!validate) {
                this.error.status = true
                this.error.title = "Incomplete fields"
                this.error.message = "Please complete the fields to proceed."
                return
            }

            delete this.inputs.allow1
            delete this.inputs.allow2
            delete this.inputs.allow3

            localStorage.setItem('careprovider_reg_session',JSON.stringify(this.inputs))
            
            this.$router.push({
                name : 'RegistrationSuccess'
            })

        },
        async LoadData () {
            try{
                if(localStorage.getItem('careprovider_reg_session')){
                    let storage = JSON.parse(localStorage.getItem('careprovider_reg_session'))
                    this.inputs.client_expectation = storage.client_expectation
                    this.inputs.rate = storage.rate
                    this.therapy_via = storage.therapy_via.map(each => each.via)
                    this.lang = storage.lang.map(each => each.language)

                    this.setPercentage()
                    this.textArea()
                    console.log(storage)
                }
            }
            catch(err){
                console.error(err)
            }
        }
    },
    created(){
        if(!(localStorage.getItem('careprovider_reg_experience'))){
            this.$router.push({
                name : 'RegistrationReferences'
            })
        }
        this.LoadData()
    }
}
</script>