<template>
    <Header/>
    <div class="container mt-4 mb-5 shadow bg-white rounded-3" v-on:keyup.enter="shareData()">
        <div class="form-navigation p-4 border-bottom">
            <small>
                <span class="text-subcolor">Tell us about you</span> &nbsp;
                <span class="fw-bold text-boldcolor">General Information</span>
            </small>
            <span class="d-flex align-items-center mt-2">
                <div class="progress flex-fill me-3" style="height:8px">
                    <div class="progress-bar rounded-pill bg-main" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="bar-value text-maincolor fw-bold">25%</small>
            </span>
        </div>
        <div class="form-container p-4 mt-3">
            <h1 class="display-5 text-center mt-3">
                <span class="text-boldcolor ff-restora">Be a</span>&nbsp;
                <span class="text-maincolor ff-restora">Care Provider</span>
            </h1>
            <p class="mx-auto text-center text-subcolor mt-3" style="max-width:510px">
                We’re always happy to have people join us and help our cause. Please fill-up the details for your application.
            </p>

            <div class="mx-auto" style="max-width:680px;">
                <div class="d-grid grid-col2 grid-gap3 mt-5 mb-3">
                    <span>
                        <label for="fname" class="fw-bold text-boldcolor mb-2">First Name</label>
                        <input type="text" id="fname" v-model.trim="inputs.firstname" class="form-control input-mainbg py-2 px-3" placeholder="Enter your first name" required>
                    </span>
                    <span>
                        <label for="lname" class="fw-bold text-boldcolor mb-2">Last Name</label>
                        <input type="text" id="lname" v-model.trim="inputs.lastname" class="form-control input-mainbg py-2 px-3" placeholder="Enter your last name" required>
                    </span>
                </div>
                
                <div class="mb-3 mt-4">
                    <label for="title" class="fw-bold text-boldcolor mb-2">Title</label>
                    <input type="text" id="title" v-model.trim="inputs.title" class="form-control input-mainbg py-2 px-3" placeholder="e.g. RGC, PsyhD, RPsy" required>
                </div>

                <div class="mb-3 mt-4">
                    <label for="city" class="fw-bold text-boldcolor mb-2">City</label>
                    <input type="text" id="city" v-model.trim="inputs.city" class="form-control input-mainbg py-2 px-3" placeholder="Enter your city" required>
                </div>
                
                <div class="mb-3 mt-4">
                    <label for="address" class="fw-bold text-boldcolor mb-2">Address</label>
                    <textarea id="address" v-model.trim="inputs.address" class="form-control input-mainbg py-2 px-3" placeholder="Enter your address" style="height:120px" required></textarea>
                </div>
            </div>

            <div class="d-flex justify-content-end my-5 px-5 py-3 navigate-btn-container">
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
    name : "RegistrationGeneral",
    components : {
        Header,
        ErrorModal
    },
    data () {
        return {
            inputs : {
                firstname : null,
                lastname : null,
                title : null,
                address : null,
                city: null
            },
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
                if(!(value) && (except.indexOf(key) == -1) ) return false
            }

            return true
            
        },
        async shareData () {
            let validate = await this.checkProperties(this.inputs)

            if(!validate) {
                this.error.status = true
                this.error.title = "Incomplete fields"
                this.error.message = "Please complete the fields to proceed."
                return
            }

            localStorage.setItem('careprovider_reg_general', JSON.stringify(this.inputs))

            this.$router.push({
                name : 'RegistrationAccount'
            })
        }
    },
    created(){

        if(localStorage.getItem('careprovider_reg_general')){
            let storage = JSON.parse(localStorage.getItem('careprovider_reg_general'))
            this.inputs.firstname = storage.firstname
            this.inputs.lastname = storage.lastname
            this.inputs.title = storage.title
            this.inputs.city = storage.city
            this.inputs.address = storage.address
            
        }
    }
}
</script>