<template>
    <div class="modal fade show" role="dialog" tabindex="-1" aria-modal="true" aria-hidden="false" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <center>                        
                        <!-- <h3 class="mt-5 mb-3 text-danger fw-bolder">This is an error message</h3>
                        <small class="text-muted"></small> -->
                        <slot/>

                        <center class="mt-3">
                            <button class="mb-2 rounded-pill btn btn-light px-4" @click="toggleInfo()">
                                Ok, Got it
                            </button>
                        </center>
                    </center>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" @click="toggleInfo()"></div>
</template>

<script>
export default {
    name : "Info_modal",
    props : ['toggleInfo']
}
</script>