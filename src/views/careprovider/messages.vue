<template>
    <CareproviderHeader section="messages" />
    <div class="container">
        <div class="row mb-3 mt-5">
            <div class="col-md-1 w-150-px">
                <h1 class="ff-restora me-3 text-boldcolor">Messages</h1>
            </div>
        </div>
<!-- 
        for mobile -->
        <div class="row p-0 msg-box-mobile shadow">
            <div class="col-lg-12 p-0 col-md-12  list-msg-mobile font-poppins" style="">
                <div class="cursor-pointer" 
                    v-for="content,index in messageList" :key="index"
                    v-bind:class="{'selected-user': userID == this.current_chat.id}"
                    v-on:click="setCurrentChat(content);"                
                >
                    <div :class="content.active ? 'col-12 px-4 activeChat' : 'col-12 px-4 '">
                        <div class="row border-bottom mx-2 pb-3">
                            <div class="col-10 p-0">
                                <div class="d-flex">
                                    <div>
                                        <img  src="../../assets/images/profile.png" class="mt-3"> 
                                        <!-- <img  :src="content.image" class="mt-3">  -->
                                    </div>
                                    
                                    <div class="font-poppins mt-4 ms-3">
                                        <small  v-if="content.admin" class="text-muted opacity-75" >
                                                {{ content.admin.fullname }}
                                        </small>   
                                        <!-- <small  v-if="content.type == 'CP' && content.careprovider?.length > 0" class="text-muted opacity-75" >
                                                {{ content.careprovider[0].fullname }}
                                        </small>     -->
                                        <div class="fw-bold text-calm-blue ">
                                             See you soon!
                                        </div>        
                                    </div>
                                </div> 
                                                
                            </div>
                            <div class="col-2 text-end mt-4 p-0 opacity-75">
                                <small>
                                      {{ format_date(content.date_created) }} 
                                </small>    
                            </div>
                            <div>
                                <small cla>
                                {{content.message}}
                                </small>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mobile-msg-content" v-if="mobileMsgBox">
                  <div class="border-bottom">
                    <div class="row p-3 px-4">
                        <div class="col-6">
                            <div class="d-flex">
                                <div>
                                    <svg class="mt-2" v-on:click="closeConvo()" width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="16" cy="16.2363" r="16" fill="white"/>
                                            <circle cx="16" cy="16.2363" r="15.5" stroke="#2D3940" stroke-opacity="0.1"/>
                                            <path d="M17.3359 10.1738L11.2738 16.236L17.3359 22.2981" stroke="#2D3940" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>

                                </div>
                                <div>
                                    <div class="ms-3 msg-profile">
                                        <img  src="../../assets/images/profile.png">
                                        </div>
                                </div>
                                <div>
                                    <div class="ms-2 text-calm-blue fw-bold">{{this.current_chat.fullname}}</div>
                                    <div class="ms-2"><small>Active now</small></div>
                                </div>
                            </div>
                        </div>
                            <div class="col-6 text-end">
                                <svg width="32" class="mt-2" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16.2363" r="15" stroke="#2D3940" stroke-opacity="0.1" stroke-width="2"/>
                                    <rect x="8.01172" y="14.6348" width="4" height="4" rx="2" fill="#2D3940" fill-opacity="0.5"/>
                                    <rect x="14.0117" y="14.6348" width="4" height="4" rx="2" fill="#2D3940" fill-opacity="0.5"/>
                                    <rect x="20.0117" y="14.6348" width="4" height="4" rx="2" fill="#2D3940" fill-opacity="0.5"/>
                                </svg>
                         </div>
                    </div>
               </div>
                <div class="msg-play-ground-mobile p-3 ">
                       <div>
                           <!-- <label>
                               <b class="text-green me-2">Topic </b>
                               
                               <svg width="16" height="3" viewBox="0 0 16 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <line y1="1.47266" x2="16" y2="1.47266" stroke="#2D3940" stroke-opacity="0.1" stroke-width="2"/>
                                </svg>
                            <b class="text-calm-blue ms-2">See you soon</b>
                            </label> -->
                            <div class="conversation mt-4" v-for="convo in currentConvo " :key="convo._id">         

                                 <div class=" msg-details-from  mt-md-1  mb-md-1 mt-sm-3" v-if="convo.sender == 'CARESEEKER'">
                                    <div class="row ms-2">
                                        <div class="col-9 convo">
                                           <div>{{convo.message}}</div>
                                        
                                            <div class="date">
                                                {{ format_date2(convo.date_created) }}
                                            </div>
                                        </div>   
                                    </div>
                                </div>    <!-- END CS -->

                                <div class=" msg-details-from  mt-md-1  mb-md-1 mt-sm-3" v-if="convo.sender == 'ADMIN'">
                                    <div class="row ms-2">
                                        <div class="col-9 convo">
                                           <div>{{convo.message}}</div>
                                        
                                            <div class="date">
                                                {{ format_date2(convo.date_created) }}
                                            </div>
                                        </div>   
                                    </div>
                                </div>    <!-- END ADMIN -->

                                <div class=" msg-details-to  mt-md-1  mb-md-1 mt-sm-3" v-if="convo.sender == 'CAREPROVIDER'">
                                    <div class="row ms-2 justify-content-end">
                                        <div class="col-9 convo">
                                           <div>{{convo.message}}</div>
                                        
                                            <div class="date">
                                               {{ format_date2(convo.date_created) }}
                                            </div>
                                        </div>   
                                    </div>
                                    
                                </div> <!-- END CP -->

                                                            
                            </div>
                            
                       </div>
                       
                </div>
                <div>

                    <div class="d-flex bd-highlight p-3">
                        <div class="p-2 flex-grow-1">
                            <input v-model="sendChat.message" type="text" class="form-control py-2 text-msg" placeholder="Your text message">
                        </div>
                        <div @click="sendMessage()" v-on:keyup.enter="sendMessage" class="p-2 bd-highlight">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.640625" y="0.390625" width="39.3571" height="38.951" rx="19.4755" fill="#3AC2B2"/>
                                <path d="M27.1953 11.9902L12.6953 20.334C12.1328 20.6465 12.1953 21.459 12.7578 21.6777L16.1016 23.084L25.0703 15.1777C25.2266 15.0215 25.4766 15.2402 25.3203 15.4277L17.8203 24.584V27.1152C17.8203 27.8652 18.6953 28.1465 19.1328 27.6152L21.1328 25.1777L25.0078 26.834C25.4453 27.0215 25.9766 26.7402 26.0391 26.2402L28.2891 12.7402C28.4141 12.1152 27.7266 11.6777 27.1953 11.9902Z" fill="white"/>
                            </svg>

                        </div>
                    </div>
                    
                </div>  
            </div>
        </div>
        <!-- end for mobile -->
        <div class="row msg-box shadow" >
            <div class="col-lg-4 p-0 col-md-5  list-msg font-poppins" style="">
                <div v-if="messageList">
                    <div class="cursor-pointer" 
                    v-for="content,index in messageList" :key="index"
                    v-on:click="setCurrentChat(content)"         
                >
                    <div :class="content.active ? 'col-12 px-4 activeChat' : 'col-12 px-4 '">
                        <div class="row border-bottom mx-2 pb-3">
                            <div class="col-10 p-0">
                                <div class="d-flex">
                                    <div>
                                        <img   src="../../assets/images/profile.png" class="mt-3"> 
                                        <!-- <img  :src="content.image" class="mt-3"> -->
                                    </div>

                                    <div class="font-poppins mt-4 ms-3">
                                        <small  v-if="content.admin?.length > 0" class="text-muted opacity-75" >
                                                {{ content.admin[0].fullname }}
                                        </small>   
                                        <small  v-else-if="content.careprovider?.length > 0" class="text-muted opacity-75" >
                                                {{ content.careprovider[0].fullname }}
                                        </small>      
                                        <!-- <div class="fw-bold text-calm-blue ">
                                           See you soon!
                                            
                                        </div>         -->
                                    </div>
                                </div> 
                                                  
                            </div>
                            <div class="col-2 text-end mt-4 p-0 opacity-75">
                                <small>
                                     {{ format_date(content.date_created) }}   <!-- date_created -->  
                                </small>    
                            </div>
                            <div>
                                <small>
                                    {{ content.message }}
                                </small>     
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div v-else class="p-2 text-center">
                    No Messages found.
                </div>
            </div>
            <div class="col-lg-8 col-md-7 p-0 msg-content bg-white">
               <div class="border-bottom">
                    <div class="row p-3">
                        <div class="col-4">
                            <div class="d-flex">
                                <div>
                                    <svg class="mt-2" width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="16" cy="16.2363" r="16" fill="white"/>
                                            <circle cx="16" cy="16.2363" r="15.5" stroke="#2D3940" stroke-opacity="0.1"/>
                                            <path d="M17.3359 10.1738L11.2738 16.236L17.3359 22.2981" stroke="#2D3940" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>

                                </div>
                                <div>
                                    <div class="ms-3 msg-profile">
                                        <img  src="../../assets/images/profile.png">
                                        
                                        
                                        </div>
                                </div>
                                <div>
                                    <div class="ms-2 text-calm-blue fw-bold">{{this.current_chat.fullname}}</div>
                                    <div class="ms-2"><small>Active now</small></div>
                                </div>
                                
                            </div>
                        </div>
                            <div class="col-4 text-center">
                            <svg width="32" class="mt-2" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16.2363" r="15" stroke="#2D3940" stroke-opacity="0.1" stroke-width="2"/>
                                    <rect x="8.01172" y="14.6348" width="4" height="4" rx="2" fill="#2D3940" fill-opacity="0.5"/>
                                    <rect x="14.0117" y="14.6348" width="4" height="4" rx="2" fill="#2D3940" fill-opacity="0.5"/>
                                    <rect x="20.0117" y="14.6348" width="4" height="4" rx="2" fill="#2D3940" fill-opacity="0.5"/>
                                </svg>
                        </div>
                    </div>
               </div>
                <div id="messageBox1" class="msg-play-ground p-3" style="height: 70vh; overflow-y: scroll;">
                       <div id="messageBox2">
                           <!-- <label>
                               <b class="text-green me-2">Topic </b>
                               
                               <svg width="16" height="3" viewBox="0 0 16 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <line y1="1.47266" x2="16" y2="1.47266" stroke="#2D3940" stroke-opacity="0.1" stroke-width="2"/>
                                </svg>
                            <b class="text-calm-blue ms-2">See you soon</b>
                            </label> -->
                            <div class=" mt-4" v-for="convo in currentConvo " :key="convo._id">
                                
                                <div class="msg-details-from mt-md-1  mb-md-1" v-if="convo.sender == 'CARESEEKER'">
                                    <div class="col-4 convo">
                                        <div class="">
                                            {{convo.message}}
                                        </div>   
                                        <div class="date">
                                            {{ format_date2(convo.date_created) }}
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="msg-details-from mt-md-1  mb-md-1" v-if="convo.sender == 'ADMIN'">
                                    <div class="col-4 convo">
                                        <div class="">
                                            {{convo.message}}
                                        </div>   
                                        <div class="date">
                                            {{ format_date2(convo.date_created) }}
                                        </div>
                                    </div>
                                    
                                </div>     
                                <div class=" msg-details-to  mt-md-1  mb-md-1 mt-sm-3" v-if="convo.sender == 'CAREPROVIDER'">
                                    <div class="row justify-content-end">
                                        <div class="col-4 convo">
                                           <div> {{convo.message}} </div>
                                        
                                            <div class="date">
                                                {{ format_date2(convo.date_created) }}
                                            </div>
                                        </div>   
                                    </div>
                                    
                                </div>                           
                            </div>                            
                       </div>                       
                </div>
                <div>

                    <div class="d-flex bd-highlight p-3">
                        <div class="p-2 flex-grow-1">
                            <input v-on:keyup.enter="sendMessage" v-model="sendChat.message" type="text" class="form-control py-2 text-msg" placeholder="Your text message">
                        </div>
                        <div class="p-2 bd-highlight" @click="sendMessage()">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.640625" y="0.390625" width="39.3571" height="38.951" rx="19.4755" fill="#3AC2B2"/>
                                <path d="M27.1953 11.9902L12.6953 20.334C12.1328 20.6465 12.1953 21.459 12.7578 21.6777L16.1016 23.084L25.0703 15.1777C25.2266 15.0215 25.4766 15.2402 25.3203 15.4277L17.8203 24.584V27.1152C17.8203 27.8652 18.6953 28.1465 19.1328 27.6152L21.1328 25.1777L25.0078 26.834C25.4453 27.0215 25.9766 26.7402 26.0391 26.2402L28.2891 12.7402C28.4141 12.1152 27.7266 11.6777 27.1953 11.9902Z" fill="white"/>
                            </svg>

                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
         <ErrorModal v-if="error.status" v-bind:toggleError="() => error.status = false">
        <h3 class="mt-5 mb-3 text-danger fw-bolder">{{error.title}}</h3>
        <small class="text-muted">{{error.message}}</small>
    </ErrorModal>
    </div>
</template>

<script>
import CareproviderHeader from '../../components/CareproviderHeader.vue'
import ErrorModal from '../../components/ErrorModal.vue'
import Helpers from '../helpers/helper'
import axios from 'axios'
import moment from 'moment'
export default {
    name: 'Messages',
    components: {
        CareproviderHeader, ErrorModal
    },
     data() {
        return {
            timer: '',
            userID: '',
            mobileMsgBox: false,

            messageList: [],
            currentConvo: [],
            error: {
                status: false,
                title: null,
                message: null
            },
            current_chat: {
                id: null,
                type: null,
                image: null,
                name: null,
                sender_type: 'CAREPROVIDER'
            },
            sendChat: {
                message: null
            }
        }
    },
    created() {
        this.messengerList();
        this.userID = 1;

    },
    methods: {
        token(){
            return Helpers.getToken("token")
        },
        setCurrentChat(object) {
            console.log('Set Current Chat')
            console.log(object)
            this.messageList.map(function(item) {
                item.active = false
            })
           
            let role = {
                id : null,
                type : null,
                fullname : null,
                image : null
            }
            
            if(object?.admin?.length){
                role.id = object.admin[0]._id
                role.type = 'ADMIN'
                role.fullname = object.admin[0].fullname
            }else if(object?.careseeker?.length){
                role.id = object.careseeker[0]._id
                role.type = 'CARESEEKER'
                role.fullname = object.careseeker[0].profile.firstname
            }else
            {
                role.id = object.careprovider[0]._id
                role.type = 'CAREPROVIDER'
                role.fullname = object.careprovider[0].fullname
            }
            role.active = true
            role.sender_type = 'CAREPROVIDER'
             object.active = true
            this.current_chat = role
            console.log('This Current Chat Clicked')
            console.info(this.current_chat)
            this.messengerConvo(this.current_chat.id)
            this.msgsUser(this.current_chat.id)
            setTimeout(myFunction, 500)
            function myFunction() {
                    document.getElementById('messageBox1').scrollTo({
                        top: document.getElementById('messageBox1').clientHeight * 50,
                        bottom: 0,
                        behavior: 'smooth'})
            }
            
        },
        async messengerList() {
            try {
                const entry = await axios.get(this.env.messengerList, {
                    headers: {
                        "Content-Type": "application/json",
                        "token": `${this.token()}`
                    }
                })


                if (entry.data.status) {
                    this.messageList = entry.data.data
                    this.messageList.map(function(item) {
                        item.active = false
                    })
                    console.log(entry)
                    console.log(entry.data.data)
                    console.log("Messsage List Here-------")
                }

                else {
                    return false;
                }


            }
            catch (error) {
                this.error.status = true
                this.error.title = "Error Occured"
                this.error.message = error
                return console.log(error)
            }
        },
        async messengerConvo(id) {
            try {
                const entry = await axios.get(this.env.conversation + "/" + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${this.token()}`
                    }
                })

                if (entry.data.status) {

                    console.log(entry.data.data)
                    this.currentConvo = entry.data.data
                    const reversed = this.currentConvo.reverse();
                    console.log('reversed:', reversed);

                }

                else {
                    this.error.status = true
                    this.error.title = "Error Occured"
                    this.error.message = error
                    return console.log(error)
                }

            }
            catch (error) {
                this.error.status = true
                this.error.title = "Error Occured"
                this.error.message = error
                return console.log(error)
            }
        },
        async sendMessage() {

            try {
                let body = {
                    message: this.sendChat.message,
                    type: this.current_chat.type,
                    sender_type: this.current_chat.sender_type
                };

                if (this.current_chat.type == 'ADMIN') {
                    body['admin_id'] = this.current_chat.id
                }
                else if (this.current_chat.type == 'CARESEEKER') {
                    body['cs_id'] = this.current_chat.id
                }
                else if (this.current_chat.type == 'CAREPROVIDER') {
                    body['cp_id'] = this.current_chat.id
                }
                else return console.error("Receiver not found")

// console.log('Body Message')
// console.info(body)
// console.log('Active Chat')
// console.info(this.current_chat)


                const response = await axios.post(this.env.sendMessage, body,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': `${this.token()}`
                        }
                    })

                console.log(response)
                if(!response.data.status) throw response.error

                
                // this.setCurrentChat(activePerson)
                //window.location.reload()
                // this.messengerList()
                var self = this
                console.log('Current Chat Data')
                console.info(self.current_chat)
                var activePerson = this.messageList.filter(function(item) {
                    console.log('Item ID')
                    console.info(item)
                    if(self.current_chat.type == 'ADMIN'){
                        console.log('IM ADMIN- Checking')
                        console.log(item.admin[0]._id)
                        console.log(self.current_chat.id)
                        return item.admin[0]._id == self.current_chat.id
                    }
                    if(self.current_chat.type == 'CP'){
                        return item.careprovider[0]._id == self.current_chat.id
                    }
                    
                })
                
                console.log('Set Active Person')
                console.info(activePerson)
                activePerson[0].active = true
                this.sendChat.message = ''
                this.setCurrentChat(activePerson[0])
            } catch (error) {
                console.log('Error Here')
                console.info(error)
                this.error.status = true,
                this.error.title = "Error occured"
                // this.error.message = error.data
            }
        },
        msgsUser(data) {
            this.userID = data.id;

            if (this.isMobile()) {
                this.mobileMsgBox = true;
            }
        },
        isMobile() {
            if (screen.width <= 760) {
                return true;
            }
            else {
                return false;
            }
        },
        closeConvo() {
            this.mobileMsgBox = false;
        },
        format_date(value) {
            if (value) {
                return moment(String(value)).format('h:mm a')
            }
        },
        format_date2(value2) {
            if (value2) {
                return moment(String(value2)).format('MMM Do, YYYY · h:mm a')
            }
        },
    }
}
</script>
<style scoped>
.activeChat {
    background-color: #3ac2b2;
    color: white;
}
</style>