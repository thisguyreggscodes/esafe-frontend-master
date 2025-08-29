import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import router from './router'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App)
console.log('Document Location')
console.info(document.location.hostname)
var path = '/'
if(document.location.hostname == 'localhost'){
    path = 'http://localhost:3001'
}

const global = {
    data(){
        return {
            env : {
                send_email_code : path + "/esafetalk/api/code/email",
                verify_email : path + "/esafetalk/api/code/verifyemail",
                send_sms_code : path + "/esafetalk/api/code/sms",
                verify_sms : path + "/esafetalk/api/code/verifysms",
                register_endpoint : path + "/esafetalk/api/user/register",
                services : path + "/esafetalk/api/services",
                login : path + "/esafetalk/api/user/login",
                currentUser : path + "/esafetalk/api/user/current",
                storage : "https://e-safetalk.herokuapp.com/esafetalk/uploads",
                updatePic : path + "/esafetalk/api/user/profile/pic",
                updateProfile : path + "/esafetalk/api/user/profile/info",
                forgetpasswordlink : path + "/esafetalk/api/user/forgetpassword/link",
                forgetpasswordchangepassword : path + "/esafetalk/api/user/forgetpassword/changepassword",
                updateAccountInfo : path + "/esafetalk/api/user/profile/account_info",
                changePassword : path + "/esafetalk/api/user/profile/changepassword",
                changeEmail : path + "/esafetalk/api/user/profile/changeemail",
                // billing : path + "/esafetalk/api/user/profile/billing/manual",
                billing : path + "/esafetalk/api/user/profile/billing/manual",
                credentials : path + "/esafetalk/api/user/profile/credentials",
                vanguardUpload : path + "/esafetalk/api/user/vanguard-upload",
                createSchedule : path + "/esafetalk/api/user/scheduler/create",
                scheduleWeekly : path + "/esafetalk/api/user/scheduler/weekly",
                csUser : path + "/esafetalk/api/user/cs",
                sessionHistory : path + "/esafetalk/api/user/schedule/paginate",
                getSessionById : path + "/esafetalk/api/user/schedule/view",
                evaluation : path + "/esafetalk/api/user/schedule/evaluation/",
                messengerList: path + "/esafetalk/api/user/messenger/list",
                sendMessage: path + "/esafetalk/api/user/messenger/send",
                conversation: path + "/esafetalk/api/user/messenger/c",
                currentSession : path + "/esafetalk/api/user/schedule/nearest",
                getcancelSession: path + "/esafetalk/api/user/schedule/cancel",
                closeSchedule: path + "/esafetalk/api/user/schedule/close"
            }
        }
    },
    methods: {
        showNotif: function (message) {
            this.$toast.success(message, {
                // override the global option
                position: 'top' //test
            });
        }
    }
}

app.use(createPinia())
app.use(router)
app.use(VueToast);
app.mount('#app')
app.mixin(global)

import 'bootstrap/dist/js/bootstrap.js'

