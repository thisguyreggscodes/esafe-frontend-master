<template>
    <div class="border-top" id="footer">
        <div class="container pt-5">
            <div class="d-grid grid-col2 grid-gap3 align-items-end">
                <section>
                    <div class="d-flex pb-3">
                        <span class="me-3">
                            <img src="@/assets/img/logo_minimal_colored.png" alt="" style="width:30px">
                        </span>
                        <span>
                            <small class="text-muted d-block" style="width:200px">Copyright © 2021 eSafeTalk Inc. All rights reserved.</small>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <a href="https://esafetalk.com/privacy-policy" target="_blank" style="font-size:.88em" class="text-decoration-none me-3"><small class="text-boldcolor fw-bolder">Privacy Policy</small></a>
                                <a href="https://esafetalk.com/terms-of-use"  target="_blank" style="font-size:.88em" class="text-decoration-none"><small class="text-boldcolor fw-bolder">Terms of Conditions</small></a>
                            </div>
                        </span>
                    </div>
                </section>
                <section>
                    <div class="d-flex justify-content-end">
                        <div class="rounded bg-white p-3 position-relative" style="max-width:285px">
                            <section class="position-absolute end-0 top-0 pe-3" style="transform:translateY(-50%)">
                                <img src="@/assets/img/chat-icon.png" class="d-block" style="width:30px" alt="">
                            </section>
                            <small class="d-block mt-3 mb-2 text-secondary">If you need any help at all, you can email us at:</small>
                            <button class="btn border-maincolor border border-3 text-main bg-white d-block w-100">
                                <small><a href="mailto:support@esafetalk.com" class="text-decoration-none text-dark">support@esafetalk.com</a></small>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name : "Footer"
}
</script>