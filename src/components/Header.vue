<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header class="container">
        <div class="d-flex align-items-center justify-content-between py-3">
            <a href="/">
            <div class="custom-logo">
                <img :src="`${window.src}`" alt="" class="d-block" :style="`width:${window.width}`">
            </div>
            </a>
            <a href="/" class="rounded-pill btn bg-secondary bg-opacity-25 text-dark fw-bold py-2 px-4">
                <small>Back to Home</small> <!--replace href with the router-->
            </a>
        </div>
    </header>
</template>

<script>
export default {
    name : 'Header',
    data(){
        return {
            window : {
                src : '',
                width : ''
            }
        }
    },
    methods :{
        r (condition) {
            console.log(condition)
            if(condition == true){
                this.window.src='https://esafetalkassets.s3.ap-southeast-1.amazonaws.com/img/logo_minimal_colored.png'
                this.window.width='40px'
            }
            else{
                this.window.src='https://esafetalkassets.s3.ap-southeast-1.amazonaws.com/img/Logo+-+Full+Horizontal+Colored.png'
                this.window.width='300px'
            }
        }
    },
    created() {

        this.r(window.matchMedia('(max-width: 600px)').matches)

        window.addEventListener('resize',(e) => {
            this.r(window.innerWidth <= 600)
        })
    }
}
</script>