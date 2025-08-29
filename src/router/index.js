import { createRouter, createWebHistory } from 'vue-router'
import Helpers from '../views/helpers/helper'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/careprovider/registration/general',
      name: 'RegistrationGeneral',
      meta : { needAuth : false },
      component: () => import ('../views/registration/Registration_panel1.vue'),
    },
    {
      path: '/careprovider/registration/account',
      name: 'RegistrationAccount',
      meta : { needAuth : false },
      component: () => import ('../views/registration/Registration_panel2.vue')
    },
    {
      path: '/careprovider/registration/experience',
      name: 'RegistrationExperience',
      meta : { needAuth : false },
      component: () => import ('../views/registration/Registration_panel3.vue')
    },
    {
      path: '/careprovider/registration/references',
      name: 'RegistrationReferences',
      meta : { needAuth : false },
      component: () => import ('../views/registration/Registration_panel4.vue')
    },
    {
      path: '/careprovider/registration/session',
      name: 'RegistrationSession',
      meta : { needAuth : false },
      component: () => import ('../views/registration/Registration_panel5.vue')
    },
    {
      path: '/careprovider/registration/done',
      name: 'RegistrationSuccess',
      meta : { needAuth : false },
      component: () => import ('../views/registration/Registration_success.vue')
    },
    {
      path: "/",
      name: 'Index',
      meta : { needAuth : false },
      component: () => import ('../views/home.vue')
    },
    {
      path: "/coming-soon",
      name: 'Soon',
      meta : { needAuth : false },
      component: () => import ('../views/coming_soon.vue')
    },
    {
      path: "/home",
      name: 'Home',
      meta : { needAuth : true },
      component: () => import ('../views/home.vue')
    },
    {
      path: "/login",
      name: "Login",
      meta : { needAuth : false },
      component: () => import ('../views/Login/Login.vue')
    },
    {
      path : "/forgotpassword",
      name : "Forgotpassword",
      meta : { needAuth : false },
      component: () => import ('../views/Login/forgot_password.vue')
    },
    {
      path : "/resetpassword",
      name : "newpassword",
      meta : { needAuth : false },
      component: () => import ('../views/Login/new_password.vue')
    },
    {
      path : "/careprovider/mysession",
      name : "My Session",
      meta : { needAuth : true },
      component : () => import ('../views/careprovider/mysession.vue')
    }, 
    {
      path : "/careprovider/session/calendar/:weekDate",
      name : "My Calendar",
      meta : { needAuth : true },
      component : () => import ('../views/careprovider/Calendar.vue')
    }, 
    {
      path : "/careprovider/dashboard",
      name : "Dashboard",
      meta : { needAuth : true },
      component : () => import ('../views/careprovider/dashboard.vue')
    },
    {
      path : "/careprovider/edit/info",
      name : "UpdateAccountInfo",
      meta : { needAuth : true },
      component: () => import ('../views/careprovider/updateaccountinfo.vue')
    },
    {
      path : "/careprovider/edit/billing",
      name : "UpdateBilling",
      meta : { needAuth : true },
      component: () => import ('../views/careprovider/updatebilling.vue')
    },
    {
      path : "/careprovider/edit/profile",
      name : "UpdateProfile",
      meta : { needAuth : true },
      component: () => import ('../views/careprovider/updateprofile.vue')
    },
    {
      path : "/careprovider/edit/credentials",
      name : "UpdateCredentials",
      meta : { needAuth : true },
      component: () => import ('../views/careprovider/updatecredentials.vue')
    },
    {
      path : "/careprovider/session/history",
      name : "SessionHistory",
      meta : { needAuth : true },
      component : () => import ('../views/careprovider/session-history.vue')
    },
    {
      path : "/careprovider/session/aboutcareseeker/:id",
      name : "AboutCareSeeker",
      component : () => import ('../views/careprovider/AboutCareSeeker.vue')
    },
    {
      path : "/careprovider/evaluation/:id",
      name : "EvaluationSheet",
      meta : { needAuth : true },
      component : () => import ('../views/careprovider/evaluation-sheet.vue')
    },
    {
      path : "/careprovider/messages",
      name : "Messages",
      meta : { needAuth : true },
      component : () => import ('../views/careprovider/messages.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // remove modal backdrop if one exists
  let modalBackground = document.querySelector('.modal-backdrop')
  if (modalBackground) {
    modalBackground.remove()
  }
  document.querySelector('body').style.overflow='auto'
  next()
})
// router.beforeEach((to , from, next) => {
//   let token_ = Helpers.getToken("token")
//   let needAuth = to.meta.needAuth

//   console.log("HAS TOKEN ? "+ token_)
//   console.log("NEED AUTH ? ", needAuth)
//   console.warn((token_ == '' && needAuth == true))
  
//   if(token_ == '' && needAuth == true){
//     return next({ name: 'Login' })
//   }
//   else if(token_ != '' && needAuth == false){
//     return next({ name : 'Dashboard' })
//   }
//   else if(token_ == '' && needAuth == false){
//     return next()
//   }
//   else if(token_ != '' && needAuth){
//     return next()
//   }
  
// })

export default router