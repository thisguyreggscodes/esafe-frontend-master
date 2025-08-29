<template>
    <CareproviderHeader section="profile"/>
    <CareproviderSubHeader section="billing"/>
    <div class="container">
        <div class="mx-auto" style="max-width:800px;width:100%">
            <div class="rounded shadow shadow-sm bg-white p-4 mt-5">
                <p class="fw-bolder text-boldcolor">Preferred Billing Method</p>

                <div class="form-check me-2 d-inline-block">
                    <input v-model.trim="inputs.preferred" class="form-check-input rounded-circle" name="billing_method" type="radio" value="E-Wallet" id="e_wallet">
                    <label class="form-check-label" for="e_wallet" style="font-size: .9em;">
                        E-Wallet
                    </label>
                </div>
                
                <div class="form-check me-2 d-inline-block">
                    <input v-model.trim="inputs.preferred" class="form-check-input rounded-circle" name="billing_method" type="radio" value="Local bank account" id="bank_transfer">
                    <label class="form-check-label" for="bank_transfer" style="font-size: .9em;">
                        Local bank account
                    </label>
                </div>

                <div class="form-check me-2 d-inline-block">
                    <input v-model.trim="inputs.preferred" class="form-check-input rounded-circle" name="billing_method" type="radio" value="G-Cash" id="gcash">
                    <label class="form-check-label" for="gcash" style="font-size: .9em;">
                        G-Cash
                    </label>
                </div>
                                
                <hr class="mt-4 bg-opacity-25 border-bottom border-top border-1">

                <p class="fw-bolder text-boldcolor">G-Cash</p>

                <div class="d-grid grid-col2 grid-gap3 mt-4 mb-2">
                    <div class="mb-3">
                        <label for="gcash_num" class="text-muted fw-bolder mb-2">Mobile Number</label>
                        <input v-model.trim="inputs.gcash.number" type="text" id="gcash_num" class="input-mainbg py-2 px-3 form-control">
                    </div>
                    <div class="mb-3">
                        <label for="gcash_name" class="text-muted fw-bolder mb-2">Account Name</label>
                        <input v-model.trim="inputs.gcash.name" type="text" name="gcash_name" id="gcash_name" class="input-mainbg py-2 px-3 form-control">
                    </div>
                </div>

                <small class="d-flex" style="opacity:.5">
                    <i class="bi bi-info-circle-fill text-secondary me-2"></i>Please make sure that the information you provide are correct.
                </small>

                <hr class="mt-4 bg-opacity-25 border-bottom border-top border-1">

                <p class="fw-bolder text-boldcolor">Local Bank</p>

                <div class="mb-3">
                    <label for="bank" class="text-muted fw-bolder mb-2">Bank  Name</label>
                    <input v-model.trim="inputs.local_bank.bank" type="text" name="bank" id="bank" class="input-mainbg py-2 px-3 form-control">
                </div>
                
                <div class="d-grid grid-col2 grid-gap3 mt-4 mb-2">
                    <div class="mb-3">
                        <label for="bank_name" class="text-muted fw-bolder mb-2">Full Name</label>
                        <input v-model.trim="inputs.local_bank.name" type="text" id="bank_name" class="input-mainbg py-2 px-3 form-control">
                    </div>
                    <div class="mb-3">
                        <label for="bank_num" class="text-muted fw-bolder mb-2">Account Number</label>
                        <input v-model.trim="inputs.local_bank.number" type="text" name="bank_num" id="bank_num" class="input-mainbg py-2 px-3 form-control">
                    </div>
                </div>
                
                <div class="mb-3">
                    <label for="bank_address" class="text-muted fw-bolder mb-2">Address</label>
                    <textarea v-model.trim="inputs.local_bank.address" type="text" id="bank_address" class="input-mainbg py-2 px-3 form-control" style="height:150px;"></textarea>
                </div>
                <small class="d-flex" style="opacity:.5">
                    <i class="bi bi-info-circle-fill text-secondary me-2"></i>Please make sure that the information you provide are correct.
                </small>

                <hr class="mt-4 bg-opacity-25 border-bottom border-top border-1">

                <p class="fw-bolder text-boldcolor">E-Wallet</p>

                <div class="mb-3">
                    <label for="ebank" class="text-muted fw-bolder mb-2">Bank code</label>
                    <select v-model.trim="inputs.e_wallet.bank" name="ebank" id="ebank" class="input-mainbg py-2 px-3 form-control">
                        <option value="test bank1">test Ewallet1</option>
                        <option value="test bank2">test Ewallet2</option>
                        <option value="test bank3">test Ewallet3</option>
                        <option value="test bank4">test Ewallet4</option>
                    </select>
                </div>
                
                <div class="d-grid grid-col2 grid-gap3 mt-4 mb-2">
                    <div class="mb-3">
                        <label for="ebank_name" class="text-muted fw-bolder mb-2">Full Name</label>
                        <input v-model.trim="inputs.e_wallet.name" type="text" id="ebank_name" class="input-mainbg py-2 px-3 form-control">
                    </div>
                    <div class="mb-3">
                        <label for="ebank_num" class="text-muted fw-bolder mb-2">Account Number</label>
                        <input v-model.trim="inputs.e_wallet.number" type="text" name="ebank_num" id="ebank_num" class="input-mainbg py-2 px-3 form-control">
                    </div>
                </div>
                
                <div class="mb-3">
                    <label for="ebank_address" class="text-muted fw-bolder mb-2">Address</label>
                    <textarea v-model.trim="inputs.e_wallet.address" type="text" id="ebank_address" class="input-mainbg py-2 px-3 form-control" style="height:150px;"></textarea>
                </div>
                <small class="d-flex" style="opacity:.5">
                    <i class="bi bi-info-circle-fill text-secondary me-2"></i>Please make sure that the information you provide are correct.
                </small>

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
            inputs : {
                preferred : null,
                gcash : {
                    number : null,
                    name : null
                },
                local_bank : {
                    bank : null,
                    name : null,
                    number : null,
                    address : null
                },
                e_wallet : {
                    bank : null,
                    name : null,
                    number : null,
                    address : null
                }
            }
        }
    },
    methods : {
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
                console.info(entry.data)
                if(entry.data.status){
                    if(entry.data.data.billing_method){
                        let obj = entry.data.data.billing_method

                        this.inputs.preferred = obj?.preferred
                        this.inputs.gcash.number = obj?.gcash?.number
                        this.inputs.gcash.name = obj?.gcash?.name
                        this.inputs.e_wallet.bank = obj?.e_wallet?.bank
                        this.inputs.e_wallet.name = obj?.e_wallet?.name
                        this.inputs.e_wallet.address = obj?.e_wallet?.address
                        this.inputs.e_wallet.number = obj?.e_wallet?.number
                        this.inputs.local_bank.bank = obj?.e_wallet?.bank
                        this.inputs.local_bank.name = obj?.e_wallet?.name
                        this.inputs.local_bank.address = obj?.e_wallet?.address
                        this.inputs.local_bank.number = obj?.e_wallet?.number
                        // this.bank.bank_type = entry.data.data.billing.bank_type
                        // this.bank.bank_name = entry.data.data.billing.bank_name
                        // this.bank.account_name = entry.data.data.billing.account_name
                        // this.bank.account_number = entry.data.data.billing.account_number
                    }
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
        async submit () {
            try{
                const entry = await axios.put(this.env.billing,this.inputs,{
                    headers : {
                        'token' : this.token(),
                        "content-type" : "application/json"
                    }
                })
                console.log(entry)
                // return console.log(this.inputs)
                if(entry.data.status){
                    this.success.status = true
                    this.success.title = "Success"
                    this.success.message = "Changes saved successfully!"
                    return
                }
                else{
                    this.error.status = true,
                    this.error.title = "Error occured"
                    this.error.message = entry.data.error
                    return
                }

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