<template>
    <div class="modal fade show" role="dialog" tabindex="-1" aria-modal="true" aria-hidden="false" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <center>
                        <img src="@/assets/img/error-icon.png" class="d-block" alt="" style="width:80px">
                        
                        <!-- <h3 class="mt-5 mb-3 text-danger fw-bolder">This is an error message</h3>
                        <small class="text-muted"></small> -->
                        <slot/>

                        <section class="mt-3">
                            <button class="mb-2 rounded-pill btn btn-danger px-4 me-3" @click="toggleError()">
                                Ok, Got it
                            </button>
                            <button class="mb-2 rounded-pill btn btn-light px-4" @click="toggleError()">
                                Go back
                            </button>
                        </section>
                    </center>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" @click="toggleError()"></div>
</template>

<script>
export default {
    name : "Error_modal",
    props : ['toggleError']
}
</script>