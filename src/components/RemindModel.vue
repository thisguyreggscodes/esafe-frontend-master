<template>
    <div class="modal fade show" role="dialog" tabindex="-1" aria-modal="true" aria-hidden="false" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <center>
                        <img src="@/assets/img/warning-icon.png" class="d-block" alt="" style="width:80px">

                        <!-- <h3 class="mt-5 mb-3 text-danger fw-bolder">This is an error message</h3>
                        <small class="text-muted"></small> -->
                        <slot/>

                        <section class="mt-3">
                            <button class="mb-2 rounded-pill btn btn-warning px-4 d-block" @click="toggleRemind()">
                                Ok, Got it
                            </button>
                        </section>
                    </center>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" @click="toggleRemind()"></div>
</template>

<script>

export default {
    name : "Remind_modal",
    props : ['toggleRemind']
}
</script>