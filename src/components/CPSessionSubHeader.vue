<template>
    <div class="container py-3 mt-3">
        <div class="d-flex align-items-center" id="sub-header">
            <h1 class="ff-restora me-3 text-boldcolor">My Sessions</h1>
            <section>
                <RouterLink :to="`/careprovider/session/calendar/${firstday}`" :class="`text-decoration-none text-muted border-bottom border-2 me-3 ${section == 'calendar' ? 'border-maincolor' : 'border-colornone'} fw-bolder`">
                    <small>
                        My Calendar
                    </small>
                </RouterLink>
                <RouterLink to="/careprovider/session/history" :class="`text-decoration-none text-muted border-bottom border-2 me-3 ${section == 'history' ? 'border-maincolor' : 'border-colornone'} fw-bolder`">
                    <small>
                        Session History
                    </small>
                </RouterLink>
            </section>
        </div>
    </div>
</template>
<style scoped>
    @media only screen and (max-width: 600px) {
        #sub-header{
            flex-direction:column !important;
            align-items:unset !important;
        }
    }
</style>
<script>
export default {
    name : "CPSessionSubHeader",
    props : ["section"],
    data() {
            return {
                firstday: ''
            }
    },
    created() {
             this.getDay()
    },
    methods: {
        getDay() {
            var curr = new Date; // get current date
            var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
            this.firstday = new Date(curr.setDate(first));
            console.log(this.firstday)
        }
    },
}
</script>