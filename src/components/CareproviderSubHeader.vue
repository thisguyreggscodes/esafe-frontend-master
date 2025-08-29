<template>
    <div class="container py-3 mt-3">
        <div class="d-flex align-items-center">
            <h1 class="ff-restora me-3 text-boldcolor">My Profile</h1>
            <section>
                <RouterLink to="/careprovider/edit/profile" :class="`text-decoration-none text-muted border-bottom border-2 me-3 ${section == 'profile' ? 'border-maincolor' : 'border-colornone'} fw-bolder`">
                    <small>
                        <i class="bi bi-pencil-square me-1"></i>
                        Edit Profile
                    </small>
                </RouterLink>
                <RouterLink to="/careprovider/edit/info" :class="`text-decoration-none text-muted border-bottom border-2 me-3 ${section == 'accountinfo' ? 'border-maincolor' : 'border-colornone'} fw-bolder`">
                    <small>
                        <i class="bi bi-person me-1"></i>
                        Account Info
                    </small>
                </RouterLink>
                <RouterLink to="/careprovider/edit/billing" :class="`text-decoration-none text-muted border-bottom border-2 me-3 ${section == 'billing' ? 'border-maincolor' : 'border-colornone'} fw-bolder`">
                    <small>
                        <i class="bi bi-credit-card me-1"></i>
                        Billing Details
                    </small>
                </RouterLink>
                <RouterLink to="/careprovider/edit/credentials" :class="`text-decoration-none text-muted border-bottom border-2 me-3 ${section == 'credentials' ? 'border-maincolor' : 'border-colornone'} fw-bolder`">
                    <small>
                        <i class="bi bi-box me-1"></i>
                        Credentials
                    </small>
                </RouterLink>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    name : "CareproviderSubHeader",
    props : ["section"]
}
</script>