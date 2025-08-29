<template>
    <Header/>

    <div class="container">
        <div class="display-5 ff-restora text-center text-boldcolor mt-5 pt-5">
            Welcome to your Safe Space
        </div>
        <div class="d-grid grid-col2 grid-gap3 mt-5 mx-auto" style="max-width:680px">
            <RouterLink to="/coming-soon" class="bg-white text-decoration-none main-hover border-hover rounded p-5 border border-4 border-colornone">
                <center>
                    <img src="@/assets/img/plant.png" alt="" class="d-block" style="width:30px">
                    <p class="mt-3 fw-bold text-muted" style="opacity:.5">SIGN UP AS A CLIENT</p>
                    <h3 class="ff-restora text-boldcolor">I'm looking for therapy</h3>
                </center>
            </RouterLink>
            <RouterLink to="/careprovider/registration/general" class="bg-white text-decoration-none main-hover border-hover rounded p-5 border border-4 border-colornone">
                <center>
                    <img src="@/assets/img/bag.png" alt="" class="d-block" style="width:30px">
                    <p class="mt-3 fw-bold text-muted" style="opacity:.5">SIGN UP AS A THERAPIST</p>
                    <h3 class="ff-restora text-boldcolor">I want to join the team</h3>
                </center>
            </RouterLink>
        </div>
        <br>
        <br>
        <hr class="mx-auto border-bottom border-secondary" style="max-width:680px;">
        <center class="my-5 d-block">
            <p class="text-bold text-boldcolor">Already have an account ?</p>

            <RouterLink to="/login" class="btn rounded-pill border-maincolor border border-3 text-main bg-white px-5 mb-5 mt-3">Sign in</RouterLink>
        </center>
    </div>

</template>

<script>
import Header from '../components/Header.vue'

export default {
    name : 'Home',
    components : {
        Header
    }
}
</script>