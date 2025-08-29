<template>
    <CareproviderHeader section="profile"/>
    <CareproviderSubHeader section="profile"/>
    <div class="container">
        <div class="mx-auto" style="max-width:800px;width:100%">
            <div class="rounded shadow shadow-sm bg-white p-4 mt-5">
                <p class="fw-bolder text-boldcolor">Edit Profile</p>

                <div class="d-flex align-items-center">
                    <div class="me-3 border border-maincolor border-2 overflow-hidden" style="height:150px;width:150px;border-top-left-radius: 200px;border-top-right-radius: 200px;">
                        <!-- IMAGE HERE -->
                        <img v-if="img" :src="`${img}`" class="d-block w-100"/>
                    </div>
                    <span>
                        <small class="d-block fw-bold text-boldcolor">Profile Photo</small>
                        <input type="file" id="img" class="d-none" @change="previewFiles">
                        <label for="img" class="border-2 text-maincolor fw-bolder shadow shadow-sm border-maincolor py-2 px-4 mt-2 rounded-pill bg-white border">Change Profile Photo</label>
                        <small class="text-muted d-block mt-2">Recommended size: 512 x 512 pixels</small>
                    </span>
                </div>
                <br>
                <br>
                <div class="mb-3">
                    <label for="name" class="text-muted fw-bolder mb-2">Full name</label>
                    <input type="text" name="name" v-model.trim="inputs.fullname" id="name" class="input-mainbg py-2 px-3 form-control">
                </div>
                <div class="d-grid grid-col2 grid-gap3">
                    <div class="mb-3">
                        <label for="nickname" class="text-muted fw-bolder mb-2">Nickname</label>
                        <input type="text" name="nickname" v-model.trim="inputs.nickname" id="nickname" class="input-mainbg py-2 px-3 form-control">
                    </div>
                    
                    <div class="mb-3">
                        <label for="title" class="text-muted fw-bolder mb-2">Title</label>
                        <input type="text" name="title" v-model.trim="inputs.title" id="title" class="input-mainbg py-2 px-3 form-control">
                    </div>
                </div>
                <div class="mb-3">
                    <label for="phone" class="text-muted fw-bolder mb-2">Mobile / Telephone Number</label>
                    <input type="text" name="phone" v-model.trim="inputs.phone" id="phone" class="input-mainbg py-2 px-3 form-control">
                </div>
                <div class="mb-3">
                    <label for="city" class="text-muted fw-bolder mb-2">City</label>
                    <input type="text" name="city" v-model.trim="inputs.city" id="city" class="input-mainbg py-2 px-3 form-control">
                </div>
                <div class="mb-3">
                    <label for="address" class="text-muted fw-bolder mb-2">Address</label>
                    <textarea name="address" v-model.trim="inputs.address" id="address" class="input-mainbg py-2 px-3 form-control" style="height:120px"></textarea>
                </div>
                
                <div class="d-flex mt-5">
                    <button @click="submit()" class="btn btn-sm bg-main text-white fw-bolder px-5 rounded-pill py-3 mb-3 me-3">
                        Save changes
                    </button>
                    <button @click="loadData()" class="btn btn-sm rounded-pill btn bg-secondary mb-3 bg-opacity-25 text-dark fw-bold px-4">
                        Cancel
                    </button>
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
    name : 'UpdateProfile',
    components : {
        CareproviderHeader,
        CareproviderSubHeader,
        Footer,
        ErrorModal,
        SuccessModal
    },
    data(){
        return {
            inputs : {
                fullname : null,
                nickname : null,
                title : null,
                phone : null,
                address : null,
                city: null
            },
            img : null,
            error : {
                status : false,
                title : null,
                message : null
            },
            success : {
                status : false,
                title : null,
                message : null
            }
        }
    },
    methods : {
        async previewFiles(event){
            try{
                let form = new FormData()
                form.append('img', event.target.files[0])

                const entry = await axios.put(this.env.updatePic,form,{
                    headers: {
                        'token': `${this.token()}`
                    }
                })

                console.log(entry)
                this.success.status = true
                this.success.title = "Success"
                this.success.message = "New profile picture saved successfully!"

                this.loadData()
            }
            catch(error){
                console.log(error)
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
            }

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

                if(entry.data.status){
                    this.inputs.fullname = entry.data.data.fullname
                    this.inputs.nickname = entry.data.data.nickname
                    this.inputs.title = entry.data.data.title
                    this.inputs.city = entry.data.data.city
                    this.inputs.address = entry.data.data.address
                    this.inputs.phone = entry.data.data.phone
                    this.img = entry.data.data.img[0]?.filename ? this.env.storage+"/"+entry.data.data.img[0].filename : ""

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
        async submit(){
            try{

                const entry = await axios.put(this.env.updateProfile,{
                    fullname : this.inputs.fullname,
                    nickname : this.inputs.nickname,
                    title : this.inputs.title,
                    city : this.inputs.city,
                    address : this.inputs.address,
                    phone : this.inputs.phone,
                },{
                    headers : {
                        'token' : this.token(),
                        "content-type" : "application/json"
                    }
                })

                console.log(entry)
                this.success.status = true
                this.success.title = "Success"
                this.success.message = "Changes saved successfully!"
            }
            catch(error){
                console.log(error)
                this.error.status = true,
                this.error.title = "Error occured"
                this.error.message = error
            }
        }
    },
    created () {
        this.loadData()
    }
}
</script>