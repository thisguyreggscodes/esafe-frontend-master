<template>
    <div class="container">
        <div class="mt-5 mx-auto bg-white p-5 rounded shadow" style="max-width:600px">
            
            <center>
                <img src="@/assets/img/feature.png" alt="" class="d-block" style="width:120px">

                <h4 class="text-boldcolor fw-bolder pt-3">This feature is coming soon!</h4>

                <p class="m-0 pt-3">Our sincerest apologies for this inconvenience , we know how important it is that you find the Mental Health Care that you need and deserve, that is why we are preparing our services towards this goal. <br> <br>
Thank you for your patience and please check back with us soon</p>

                <a @click="goBack" class="rounded-pill px-5 btn bg-main text-light mt-5">
                    Go back
                </a>
            </center>

        </div>
    </div>

</template>

<script>

export default {
    name : 'Soon',
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>