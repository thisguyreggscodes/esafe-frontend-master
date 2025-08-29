<template>
    <Header/>
    <div class="container mt-4 mb-5 shadow bg-white rounded-3" v-on:keyup.enter="shareData()">
        <div class="form-navigation p-4 border-bottom">
            <small>
                <span class="text-subcolor">Tell us about you</span> &nbsp;
                <span class="fw-bold text-boldcolor">References</span>
            </small>
            <span class="d-flex align-items-center mt-2">
                <div class="progress flex-fill me-3" style="height:8px">
                    <div class="progress-bar rounded-pill bg-main" role="progressbar" style="width: 79%;" aria-valuenow="79" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="bar-value text-maincolor fw-bold">79%</small>
            </span>
        </div>

        <div class="form-container p-4 mt-3">
            <div class="mx-auto" style="max-width:680px;">
                <p class="fw-bold text-boldcolor fs-5">Character References</p>
                <p class="fw-light">
                    Please provide two (2) reference people for background check. It can be former or current colleagues, patients, and/or employers.
                </p>

                <span class="mt-3">
                    <label class="fw-bold text-boldcolor mb-2">Full Name</label>
                    <input type="text" v-model.trim="inputs.character_ref[0].fullname" class="form-control input-mainbg py-2 px-3 character_ref_name" placeholder="Enter the person’s full name">
                </span>

                <div class="d-grid grid-col2 grid-gap3 mt-3 mb-3">
                    <span>
                        <label class="fw-bold text-boldcolor mb-2">Email Address</label>
                        <input type="email" v-model.trim="inputs.character_ref[0].email" class="form-control input-mainbg py-2 px-3 character_ref_email" placeholder="Enter the person's email">
                    </span>
                    <span>
                        <label class="fw-bold text-boldcolor mb-2">Relationship</label>
                        <input type="text" v-model.trim="inputs.character_ref[0].relationship" class="form-control input-mainbg py-2 px-3 character_ref_relationship" placeholder="Enter relationship with the person">
                    </span>
                </div>

                <hr class="mt-4 bg-opacity-25 border-bottom border-top border-1">

                <span class="mt-3">
                    <label class="fw-bold text-boldcolor mb-2">Full Name</label>
                    <input type="text" v-model.trim="inputs.character_ref[1].fullname" class="form-control input-mainbg py-2 px-3 character_ref_name" placeholder="Enter the person’s full name">
                </span>

                <div class="d-grid grid-col2 grid-gap3 mt-3 mb-3">
                    <span>
                        <label class="fw-bold text-boldcolor mb-2">Email Address</label>
                        <input type="email" v-model.trim="inputs.character_ref[1].email" class="form-control input-mainbg py-2 px-3 character_ref_email" placeholder="Enter the person's email">
                    </span>
                    <span>
                        <label class="fw-bold text-boldcolor mb-2">Relationship</label>
                        <input type="text" v-model.trim="inputs.character_ref[1].relationship" class="form-control input-mainbg py-2 px-3 character_ref_relationship" placeholder="Enter relationship with the person">
                    </span>
                </div>
                
                <div class="form-check me-2 mt-5">
                    <input class="form-check-input rounded-circle" v-model.trim="inputs.allow" type="checkbox" value="true" id="allow">
                    <label class="form-check-label text-maincolor fw-bold" for="allow" style="font-size: .9em;">
                        I allow eSafeTalk to perform a background check of me.
                    </label>
                </div>
            </div>

            <div class="navigate-btn-container d-flex justify-content-between align-items-center my-5 px-5 py-3">
                <RouterLink to="/careprovider/registration/experience" class="rounded-pill btn bg-secondary bg-opacity-25 text-dark fw-bold py-3 px-4">
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
    name : 'RegistrationReferences',
    components : {
        Header,
        ErrorModal
    },
    data () {
        return {
            inputs : {
                character_ref : [
                    {
                        fullname : null,
                        email : null,
                        relationship : null
                    },
                    {
                        fullname : null,
                        email : null,
                        relationship : null
                    }
                ],
                allow : null
            },
            error : {
                status : false,
                title : null,
                message : null
            }
        }
    },
    methods : {
        validateEmail(value){
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(value); 
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
        async shareData () {
            
            if((this.validateEmail(this.inputs.character_ref[0].email) == false)
                || (this.validateEmail(this.inputs.character_ref[1].email) == false)){
                this.error.status = true
                this.error.title = "Invalid Email"
                this.error.message = "Please check the format of your email."
                return
            }

            let validate = await this.checkProperties(this.inputs)
            
            if(!validate) {
                this.error.status = true
                this.error.title = "Incomplete fields"
                this.error.message = "Please complete the fields to proceed."
                return
            }

            delete this.inputs.allow

            localStorage.setItem('careprovider_reg_references', JSON.stringify(this.inputs))

            this.$router.push({
                name : 'RegistrationSession'
            })
        },
        async LoadData () {
            try{
                if(localStorage.getItem('careprovider_reg_references')){
                    let storage = JSON.parse(localStorage.getItem('careprovider_reg_references'))

                    this.inputs.character_ref = [...storage.character_ref]
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
                name : 'RegistrationExperience'
            })
        }

        this.LoadData()
    }
}
</script>