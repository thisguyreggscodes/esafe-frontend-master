s<template>
    <div class="bg-white shadow shadow-sm">
        <div class="container py-3 d-flex align-items-center justify-content-between" v-if="!changeNav">
            <div class="d-flex align-items-center">
                <img src="@/assets/img/logo_minimal_colored.png" alt="" class="d-block me-3" style="height:40px;">
                
                <section>
                    <RouterLink to="/careprovider/dashboard" :class="`text-decoration-none text-muted border-bottom border-2 me-3 ${section != 'dashboard' ? 'border-colornone':'border-maincolor'} fw-bolder`">
                        <small>
                            Dashboard
                        </small>
                    </ROuterLink>
                    <RouterLink to="/careprovider/edit/profile" :class="`text-decoration-none text-muted border-bottom border-2 me-3 ${section != 'profile' ? 'border-colornone':'border-maincolor'} fw-bolder`">
                        <small>
                            Profile
                        </small>
                    </RouterLink>
                    <!-- /careprovider/session/history -->
                    <!-- /coming-soon -->
                    <RouterLink to="/careprovider/session/history" :class="`text-decoration-none text-muted border-bottom border-2 me-3 border-colornone  fw-bolder ${section != 'session' ? 'border-colornone':'border-maincolor'}`">
                        <small>
                            My Sessions
                        </small>
                    </RouterLink>
                    <RouterLink to="/careprovider/messages" :class="`text-decoration-none text-muted border-bottom border-2 me-3 ${section != 'messages' ? 'border-colornone':'border-maincolor'} fw-bolder`">
                        <small>
                            Messages
                        </small>
                    </RouterLink>
                    <a href="/coming-soon" class="text-decoration-none text-muted border-bottom border-2 me-3 border-colornone fw-bolder">
                        <small>
                            My Points
                        </small>
                    </a>
                </section>
            </div>

            <div class="flex-fill d-flex justify-content-end align-items-center">
                <div class="rounded-circle overflow-hidden border border-maincolor me-3" style="height:50px;width:50px;">
                    <img v-if="img" :src="`${img}`" class="d-block w-100"/>
                </div>
                <div class="dropdown">
                    <div class="dropdown-toggle" type="button" id="my_acc_dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <small>My Account</small>
                    </div>
                    <ul class="dropdown-menu" aria-labelledby="">
                        <li><span @click="logout()" class="dropdown-item btn btn-outline-danger" href="#">Sign out</span></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="container py-3 d-flex align-items-center justify-content-between" v-if="changeNav">
            <div class="d-flex align-items-center">
                <img src="@/assets/img/logo_minimal_colored.png" alt="" class="d-block me-3" style="height:50px;">
            </div>

            <div class="flex-fill d-flex justify-content-end align-items-center">
                <div class="rounded-pill border p-2 d-flex align-items-center">
                    <div class="rounded-circle overflow-hidden border border-maincolor me-3" style="height:50px;width:50px;">
                        <img v-if="img" :src="`${img}`" class="d-block w-100"/>
                    </div>
                    
                    <div class="p-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <i class=" fw-bolder bi bi-list fs-3"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
        <img src="@/assets/img/logo_minimal_colored.png" alt="" class="d-block me-3" style="height:50px;">

        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <section>
            <RouterLink to="/careprovider/dashboard" :class="`d-block text-decoration-none text-muted fs-1 mb-3 ${section != 'dashboard' ? '':'text-maincolor'} fw-bolder`">
                <small class="ff-restora">
                    Dashboard
                </small>
            </ROuterLink>
            <RouterLink to="/careprovider/edit/profile" :class="`d-block text-decoration-none text-muted fs-1 mb-3 ${section != 'profile' ? '':'text-maincolor'} fw-bolder`">
                <small class="ff-restora">
                    Profile
                </small>
            </RouterLink>
            <!-- /careprovider/session/history -->
            <!-- /coming-soon -->
            <RouterLink to="/careprovider/session/history" :class="`d-block text-decoration-none text-muted fs-1 mb-3 border-colornone  fw-bolder ${section != 'session' ? '':'text-maincolor'}`">
                <small class="ff-restora">
                    My Sessions
                </small>
            </RouterLink>
            <a href="/coming-soon" class="d-block text-decoration-none text-muted fs-1 mb-3 border-colornone fw-bolder">
                <small class="ff-restora">
                    Messages
                </small>
            </a>
            <a href="/coming-soon" class="d-block text-decoration-none text-muted fs-1 mb-3 border-colornone fw-bolder">
                <small class="ff-restora">
                    My Points
                </small>
            </a>
        </section>
    </div>
    </div>
</template>
<script>

import Helpers from '../views/helpers/helper'

import axios from 'axios'

export default {
    name : "CareproviderHeader",
    props : ["section"],
    data() {
        return{
            img : null,
            changeNav : false
        }
    },
    methods : {
        r (condition) {
            console.log(condition)
            if(condition == true){
                this.changeNav = true
            }
            else{
                this.changeNav = false
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
                    this.img = entry.data.data.img[0]?.filename ? this.env.storage+"/"+entry.data.data.img[0].filename : ""

                    return
                }

            }
            catch(error){
                console.error(error)
            }
        },
        logout(){
            document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
            this.$router.push({
                name : 'Login'
            })
        }
    },
    created () {
        this.loadData()

        this.r(window.matchMedia('(max-width: 600px)').matches)

        window.addEventListener('resize',(e) => {
            this.r(window.innerWidth <= 600)
        })
    }
}
</script>