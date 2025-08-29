<template>
    <Header/>
    <div class="container mt-4 mb-5 shadow bg-white rounded-3" v-on:keyup.enter="shareData()">

        <div class="form-navigation p-4 border-bottom">
            <small>
                <span class="text-subcolor">Tell us about you</span> &nbsp;
                <span class="fw-bold text-maincolor">Done!</span>
            </small>
            <span class="d-flex align-items-center mt-2">
                <div class="progress flex-fill me-3" style="height:8px">
                    <div class="progress-bar rounded-pill bg-main" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="bar-value text-maincolor fw-bold">100%</small>
            </span>
        </div>
        <div class="form-container p-4 mt-3">
            <div class="mx-auto" style="max-width:680px;">
                <img src="@/assets/img/checklist.png" alt="" class="mx-auto mt-2 d-block">
                <h1 class="display-6 text-center mt-3" style="max-width:680px;">
                    <span class="text-boldcolor ff-restora">Your Care Provider application will be reviewed</span>
                </h1>
                <p class="mx-auto text-center text-subcolor mt-3">
                    For us to provide the best service to our Care Seekers, we review all Care Provider applications. Once you are qualified, we will get in touch with you via the contact details you’ve submitted.
                </p>
                <p class="mx-auto text-center text-subcolor mt-3">
                    By continuing with your registration, you agree that we will store your information in our database. For more information, read our Privacy Policy.
                </p>
            </div>

            <div class="register_confirmation_btn d-flex justify-content-center align-items-center my-5 px-5 py-3">
                <RouterLink to="/careprovider/registration/session" class="rounded-pill btn bg-secondary bg-opacity-25 text-dark fw-bold py-3 px-4 me-5 register_confirmation_back_btn">
                    <small>Go Back</small>
                </RouterLink>
                
                <button @click="shareData()" class="bg-main btn px-4 py-3 text-light fw-bold rounded-pill">
                    I agree, submit my registration
                </button>
            </div>
        </div>
    </div>
    <SuccessModal v-if="success.status" v-bind:toggleSuccess="() => success.status = false">
        <h3 class="mt-5 mb-3 text-success fw-bolder">Yeheey!</h3>
        <small class="text-muted">{{success.message}}</small>
    </SuccessModal>
    
    <ErrorModal v-if="error.status" v-bind:toggleError="() => error.status = false">
        <h3 class="mt-5 mb-3 text-danger fw-bolder">{{error.title}}</h3>
        <small class="text-muted">{{error.message}}</small>
    </ErrorModal>
</template>

<script>
import axios from 'axios'
import ErrorModal from '../../components/ErrorModal.vue'
import Header from '../../components/Header.vue'
import SuccessModal from '../../components/SuccessModal.vue'

export default {
    name : 'RegistrationSuccess',
    components : {
        Header,
        SuccessModal,
        ErrorModal
    },
    data(){
        return {
            success : {
                status : false,
                title : null,
                message : null
            },
            error : {
                status : false,
                title : null,
                message : null
            }
        }
    },
    methods : {
        async shareData () {

            let allObject = {
                ...JSON.parse(localStorage.getItem('careprovider_reg_experience')),
                ...JSON.parse(localStorage.getItem('careprovider_reg_general')),
                ...JSON.parse(localStorage.getItem('careprovider_reg_account')),
                ...JSON.parse(localStorage.getItem('careprovider_reg_references')),
                ...JSON.parse(localStorage.getItem('careprovider_reg_session'))
            }

            const entry = await axios.post(
                this.env.register_endpoint,
                allObject,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if(entry.data.status){
                localStorage.clear()
                this.success.status = true
                this.success.message = "Your account will be review by the admin."
                this.$router.push({
                    name : 'Home'
                })
            }
            else{
                this.error.status = true
                this.error.title = "Error"
                this.error.message = entry.data.error
                return
            }

            return console.log(allObject)
        }
    },
    created(){
        if(!(localStorage.getItem('careprovider_reg_session'))){
            this.$router.push({
                name : 'RegistrationSession'
            })
        }
    }
}
</script>