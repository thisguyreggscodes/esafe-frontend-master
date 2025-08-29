<template>
<CareproviderHeader section="session" />
<CPSessionSubHeader section="history"/>
            <div class="container">
                <div class="row">
                    <div class="col md-10 px-5 ">
                        <div class="card shadow border-0 border-radius-10">
                            <div class="card-body py-0 my-3 mx-5">
                                 <div class="font-restora text-calm-blue mt-5">
                                     <small>Go Back</small>
                                     <h1 class="fw-bolder">About your Care Seeker</h1>
                                </div>
                                <div class="card shadow border-radius-10">
                                    <div class="car-body mb-3">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="row">
                                                    <div class="col-md-8">
                                                         <div class="d-flex">
                                                            <div class="mt-3 ms-3">
                                                                <img src="../../assets/images/profile.png">
                                                                <svg class="ms-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M5.38232 7.28125H10.7084C11.816 7.28125 12.7351 8.17678 12.7586 9.30797V13.9991C12.7586 15.1036 11.8632 15.9991 10.7586 15.9991H5.33203C4.22746 15.9991 3.33203 15.1036 3.33203 13.9991V9.33154C3.33203 8.20034 4.25113 7.28125 5.38232 7.28125Z" fill="#3AC2B2"/>
                                                                <path d="M8.04476 6.36296C9.80184 6.36296 11.2262 4.93856 11.2262 3.18148C11.2262 1.4244 9.80184 0 8.04476 0C6.28768 0 4.86328 1.4244 4.86328 3.18148C4.86328 4.93856 6.28768 6.36296 8.04476 6.36296Z" fill="#3AC2B2"/>
                                                                </svg> 
                                                            </div>
                                                            <div>
                                                                <div class="font-poppins">
                                                                    <h1 class="fs-6 mt-4 ms-2 pt-2">
                                                                        <span class="fw-bolder">{{user.firstname}}</span>                                         
                                                                        <span class="text-muted me-2 ms-3">{{user.age}} years old</span>                     
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div> 
                                   </div>
                                </div>
                                <div v-for="(item,index) in user.questionaires" :key="index">
                                    <div class="font-poppins">
                                        <h6 class="mt-5 mb-3">{{item.question.question}}</h6>
                                    </div>
                                    <div v-if="item.question.options.length <= 0">
                                        <div class="font-poppins">
                                                <div class="fw-bold pt-3 pb-3">
                                                    
                                                    <textarea 
                                        class="form-control" 
                                        v-model="item.answers" 
                                        :name="item.id" 
                                        style="height:150px"></textarea>
                                                </div>
                                        </div>
                                    </div>
                                    <div v-for="(option,answerIndex) in item.question.options" :key="answerIndex" class="col-lg-12 mb-4">
                                        <div v-if="item.answers.includes(option.opt)" @click="removeAnswer(option,item)" class="d-flex bg-mint-green border-radius-10">
                                        
                                            <div class="font-poppins px-2">
                                            <div class="fw-bold pt-3 pb-3">
                                                <span class="text-muted bg-white pe-3 ps-3 pt-1 pb-1 border-radius-10">{{answerIndex+1}}</span>
                                                <span class="text-green ms-3">{{option.opt}}</span>                         
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else @click="addAnswer(option,item)"  class="d-flex bg-soft-grey border-radius-10">
                                            <div class="font-poppins px-2 py-2">
                                                <div class="fw-bold pt-2 pb-2">
                                                    <span class="text-muted bg-white pe-3 ps-3 pt-1 pb-1 border-radius-10">{{answerIndex+1}}</span>
                                                    <span class="text-muted ms-3">{{option.opt}}</span>                         
                                                </div>
                                            </div>
                                        </div>

                                        
                                    </div>
                                </div> 
                                <hr class="mt-4 ms-5 me-5">
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
             <br>
        <br>
        <br>
</template>
<style scoped>
@font-face {
  font-family: Restora;
  src: url("./assets/fonts/restora/RestoraNeue-Bold.otf");
}
@font-face {
  font-family: Poppins;
  src: url("./assets/fonts/poppins/Poppins-Regular.ttf");
}
@media (min-width: 1400px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .container-xxl {
    max-width: 1600px;
  }
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: inherit;
  text-decoration: none;
}
.custom-badge {
  background-color: #3ac2b2 !important;
  color: white;
}
body {
  background-color: #f0f7f6 !important;
}

.active {
  font-weight: 600;
  border-bottom: 3px solid #3ac2b2;
}
.active-grey {
  font-weight: 600;
  border-bottom: 2px solid #e5e5e5;
}
.bg-none {
  background: none !important;
}
.footer-links {
  color: #2c576e;
}
.footer-card {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.border-green {
  border: 2px solid #11a694;
}
.border-green-3 {
  border: 3px solid #11a694;
}
.border-radius-10 {
  border-radius: 10px !important;
}
.fc-green,
.text-green {
  color: #11a694;
}
.fontsize {
  size: -15px !important;
}
.text-bubble {
  color: #3ac2b2;
}
.fc-calm-blue,
.text-calm-blue {
  color: #2c576e !important;
}
.text-light-grey {
  color: rgba(44, 87, 110, 0.65)!important;
}

.btn-green {
  border: 2px solid #11a694 !important;
  border-radius: 8px;
}

.btn-full-green {
  background-color: #11a694 !important;
  color: white !important;
}
.bg-full-green {
  background-color: #11a694 !important;
  color: white !important;
}
.bg-bubble-green {
  background-color: #3ac2b2 !important;
}
.bg-mint-green {
  background: #dff2ee;
  border: 3px solid #3ac2b2;
  cursor: pointer;
}
.bg-soft-grey {
  background-color: #f0f4f4;
  cursor: pointer;
}
.bg-light-green {
  background-color: #f1f8f7;
}
.fw-500 {
  font-weight: 500;
}
.text-time-new-roman {
  font-family: "Restora";
}
.start-30mins {
  margin-top: -20px;
}
.font-restora {
  font-family: Restora;
}
.font-poppins {
  font-family: Poppins;
}
.btn-bubble-green {
  background: #3ac2b2;
  color: white !important;
}
.btn-light-grey {
  background: rgba(45, 57, 64, 0.1);
  color: rgba(45, 57, 64, 0.5) !important;
}
.chat-badge {
  position: absolute;
  margin-top: 30px;
  margin-left: -15px;
}
.box-size {
  height: 160px;
}
.invoice {
  min-height: 806px;
}
.next-session {
  margin-top: -10px;
}
.index-backdrop {
  z-index: -1;
}
.footer-chat-badge {
  position: absolute;
  margin-top: -30px;
  right: 2px;
}
.profile {
  position: absolute;
  margin-top: -55px;
  right: 10px;
}
.need-help-label {
  padding-top: 90px !important;
  font-size: 15px;
}
.m-suggest-care {
  display: none;
}
.overflow-x {
  overflow-x: auto;
}
.invoices-col {
  height: 300px;
}
.payment-error {
  border: 2px solid rgba(239, 83, 80, 1);
  color: rgba(239, 83, 80, 1);
  background-color: rgba(239, 83, 80, 0.1);
  padding: 5px;
  border-radius: 10px;
}
.past-due {
  border: 2px solid rgba(242, 120, 51, 1);
  color: rgba(242, 120, 51, 1);
  background-color: rgba(242, 120, 51, 0.1);
  padding: 5px;
  border-radius: 10px;
}
.due-in {
  border: 2px solid #11a694;
  color: #11a694;
  background-color: #dff2ee;
  padding: 5px;
  border-radius: 10px;
}
.due {
  border: 2px solid #11a694;
  color: #11a694;
  background-color: #dff2ee;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 7px;
  font-size: smaller;
}
.paid {
  border: 2px solid #42c275;
  color: white;
  background-color: #42c275;
  padding: 5px;
  border-radius: 10px;
}
.w-150-px {
  width: 150px !important;
}
.w-270-px {
  width: 270px !important;
}
.w-200-px {
  width: 200px !important;
}

.pagination a {
  color: #2c576e;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: bold;
}
.active-paginator {
  background: #3ac2b2;
  color: white !important;
  border-radius: 50px;
}
.knowing-you-height {
  height: 750px;
}

.mt-n-8 {
  margin-top: -8px;
}
.form-control-xl {
  min-height: calc(1.5em + 1rem + 2px);
  padding: 0.9rem 1.5rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}
.list-msg {
  height: 700px;
  border-top-left-radius: 10px;
  border-right: 1px solid #eee;
  background: white;
  overflow: auto;
}
.list-msg-mobile {
  height: 700px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-right: 1px solid #eee;
  background: white;
  overflow: auto;
}
.msg-box {
  overflow: hidden;
}
.msg-box-mobile {
  overflow: hidden;
  display: none;
}
.msg-content {
  border-top-right-radius: 10px;
}
.selected-user * {
  background: #3ac2b2;
  color: white !important;
}
.cursor-pointer {
  cursor: pointer;
}
.msg-profile {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 2px;
  border: 2px solid rgba(58, 194, 178, 1);
}
.msg-play-ground {
  background: url("assets/images/message/background.png") no-repeat;
  background-size: cover;
  height: 75%;
}
.msg-play-ground-mobile {
  background: url("assets/images/message/background.png") no-repeat;
  background-size: cover;
  height: 80%;
  overflow-y: scroll;
}
.point-background {
  background: url("assets/images/point.png") no-repeat;
  background-size: cover;
  margin-top: -16px;
  margin-right: -16px; 
  padding-bottom: 200px;
}
.my-points {
  font-size: 70px;
}

.msg-details-to .convo {
  background: #ffffff;
  color: #485761;
  padding: 20px;
  border-radius: 25px;
}
.msg-details-from .convo {
  background-color: rgba(58, 194, 178, 1);
  color: white;
  padding: 20px;
  border-radius: 25px;
}
.msg-details-from div,
.msg-details-to div {
  font-family: Poppins;
}
.msg-details-from .date,
.msg-details-to .date {
  opacity: 0.75;
}
.text-msg {
  border-radius: 25px;
}
.mobile-msg-content {
  position: fixed;
  background-color: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 10000;
}

.pick-sched .btn-outline-secondary:hover {
  color: gray !important;
  background-color: white !important;
  border-color: #3ac2b2 !important;
  border:2px solid #3ac2b2;
  border-radius: 10px;
  z-index: 1000;
}
.day-calendar-container{
  box-shadow: 0 0 5px #ccc;
  overflow: hidden;
}
.slideRight{
  position: relative;
  float:right;
  margin-top:-90px;
  margin-right:-50px;
  z-index:1 !important;
}
.slideLeft{
  position: absolute;
  margin-top:-10px;
  margin-left:-50px;
  z-index:1 !important;
  transform: rotate(180deg);
}
.day-calendar{
  padding:10px;
}
.day-calendar:hover{
  border:3px solid rgba(58, 194, 178, 1) ;
}

.custom-btn-default{
  border: 1px solid #ccc;
  color: gray;
}
@media screen and (max-width: 1000px) {
  .want-to-talk {
    margin-top: 20px;
    padding-left: 35px;
    padding-right: 35px;
  }
  .find-the-right,
  .d-last-row {
    padding-left: 23px;
    padding-right: 23px;
  }
  .footer {
    padding-left: 35px !important;
    padding-right: 35px !important;
  }
  .height-300 {
    height: 190px;
  }
  .my-account-dropdown {
    position: absolute !important;
  }

}

@media screen and (max-width: 1204px) {
  .available-rewards{
    width: 600px !important;
  }
}


@media screen and (max-width: 766px) {
  .kn-mt-20 {
    margin-top: 20px;
  }
  .my-account,
  .footer-chat-badge,
  .d-suggest-care {
    display: none;
  }
  .m-suggest-care {
    display: inline;
  }
  .btn-pay {
    visibility: hidden;
  }
  .msg-box {
    display: none;
  }
  .msg-box-mobile {
    display: block;
  }
}



/**************************************
    CS REGISTRATION
**************************************/
#cs-registration-container .text-content {
  max-width: 420px;
  padding-top: 30px;
}
#cs-registration-container input[type=number]::-webkit-inner-spin-button, 
#cs-registration-container input[type=number]::-webkit-outer-spin-button {  
 opacity: 1;
}
.registration-footer {
  padding: 20px 25px;
}
.registration-footer h1 {
  width: 100%;
  max-width: 410px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.01em;
  color: #485761;
}
.registration-footer hr {
  height: 4px;
  color: #2D3940;
  opacity: .1;
  width: 37px;
}
.registration-footer .std--btn {
  font-family: 'Poppins'!important;
  font-weight: 600!important;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: #11A694;
  display: block;
  padding: 12px 16px;
  height: 52px;
  left: 0px;
  top: 198px;
  background: #DFF2EE;
  border: 2px solid #3AC2B2;
  border-radius: 8px;
}
#form--container {
  background: white;
  border-radius: 20px 20px 0px 0px;
  position: relative;
}
.radio--select {
  position: relative;
  margin-bottom: 20px;
}
.radio--select input[type="radio"], .radio--select input[type="checkbox"] {
  visibility: hidden;
  position: absolute
}
.radio--select input[type="radio"] + .radio-label, .radio--select input[type="checkbox"] + .radio-label {
  display: flex;
  align-items: center;
  padding: 12px;
  width: 100%;
  height: 56px;
  background: #F0F4F4;
  border: 3px solid #F0F4F4;
  border-radius: 8px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600!important;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: #485761;
  opacity: 0.7;
}
.radio--select input[type="radio"]:checked + .radio-label, .radio--select input[type="checkbox"]:checked + .radio-label {
  color: #3AC2B2;
  opacity: 1;
  background: #DFF2EE;
  border: 3px solid #3AC2B2;
  border-radius: 8px;
  padding: 12px;
}

.radio--select .radio-label span {
  width: 32px;
  height: 32px;
  background: #FFFFFF;
  border: 1px solid rgba(45, 57, 64, 0.08);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #485761;
  font-weight: 700!important;
  margin-right: 10px;
}

@media (min-width: 1200px) {
  #cs-registration-container .text-content h1 {
      font-weight: 700;
      font-size: 64px;
      line-height: 64px;
      letter-spacing: -0.03em;
  }
}

@media (min-width: 768px) {
  .registration-footer {
      position: absolute;
      left: 0px;
      bottom: 0px;
  }
  #cs-registration-container {
      width: 100%;
      padding-top: 100px;
  }
}
#form--container p {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 34px;
  letter-spacing: -0.01em;
  color: #485761;
  max-width: 450px;
  margin: 16px auto;
}

/* custom checkbox */
.round-checkbox {
  position: relative;
  padding: 10px;
}
.round-checkbox a{
  color: #3AC2B2;
}

.round-checkbox .custom-checkbox {
  background-color: #F0F7F6;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 28px;
  transform: translateY(-50%);
  left: 0px;
  position: absolute;
  top: 50%;
  width: 28px;
}

.round-checkbox .custom-checkbox:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: "";
  height: 6px;
  left: 7px;
  opacity: 0;
  position: absolute;
  top: 8px;
  transform: rotate(-45deg);
  width: 12px;
}

.round-checkbox input[type="checkbox"] {
  visibility: hidden;
}

.round-checkbox input[type="checkbox"]:checked + .custom-checkbox {
  background-color: #3AC2B2;
  border-color: #3AC2B2;
}

.round-checkbox input[type="checkbox"]:checked + .custom-checkbox + .formLabel {
  color: #3AC2B2;
}

.round-checkbox input[type="checkbox"]:checked + .custom-checkbox:after {
  opacity: 1;
}
/* css helper */


:root{
  --maincolor : #3AC2B2;
  --regularFont : 400;
  --mediumFont : 500;
  --boldFont : 600;
  --regularFF : poppins, sans-serif;
  --subFF : restora, sans-serif;
  --fontsubcolor : rgba(44, 87, 110, 0.65);
  --fontmaincolor : rgba(44, 87, 110, 1)
}
.material-icons {
  font-size: inherit;
}
.ff-restora {
  font-family: var(--subFF) !important;
}

.fw-bold{
  font-weight: var(--boldFont) !important;
}

.fw-medium{
  font-weight: var(--mediumFont) !important;
}
.bg-main{
  background-color: var(--maincolor);
}

.text-subcolor{
  color:var(--fontsubcolor) !important
}

.text-maincolor{
  color:var(--maincolor) !important
}

.text-boldcolor{
  color:var(--fontmaincolor) !important
}

/* Registration Home */
#cs-registration-home {
  margin-top: 70px;
}
.therapy-cards__container {
  position: relative;
  margin: 0 auto;
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0px 16px 28px rgba(44, 87, 110, 0.15);
  background-color: #FFFFFF;
  transition: all 200ms ease;
}
.therapy-cards__container > h3 {
  font-family: 'Restora';
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 64px;
  text-align: center;
  letter-spacing: -0.03em;
  color: #2C576E;
  max-width: 680px;
  margin: 20px auto;
}
.therapy-cards{
  max-width: 1120px;
  margin: 40px auto 20px;
}
.therapy-card {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 30px 24px 15px;
  width: 100%;
  border: 4px solid #3AC2B2;
  border-radius: 10px;
  background-color: #3AC2B2;
  transition: all 200ms ease;
}

.therapy-card__text {
  max-width: 210px;
  color: #FFFFFF;
}
.therapy-card__text span {
  display: inline-block;
}
.therapy-card__text span:first-child {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.therapy-card__text span:nth-child(2) {
  font-size: 20px;
  font-weight: 500;
}

.therapy-card__image {
  display: inline-block;
  opacity: 0;
  width: 81px;
  height: 120.04px;
}
.therapy-card__image > img {
  width: 100%;
}

.therapy-card:hover {
  background-color: #268075;
}
.therapy-card:hover .therapy-card__image {
  opacity: 1;
}

.therapy-card--blue {
  border: 4px solid #369FCC;
  background-color: #369FCC;
}
.therapy-card--blue:hover {
  background-color: #1E6C8D;
}

.therapy-card--purple {
  border: 4px solid #9471DF;
  background-color: #9471DF;
}
.therapy-card--purple .therapy-card__image {
  width: 135px;
}
.therapy-card--purple:hover {
  background-color: #674D9C;
}
.therapy-card__text h1 {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.01em;
  color: #FFFFFF;
}
.therapy-card__text h2 {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #FFFFFF;
  opacity: 0.8;
  margin-bottom: 0px;
}
.therapy-cards__container hr {
  max-width: 1120px;
  margin: 50px auto;
}
.therapy-cards__container h4 {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #2C576E;
  margin: 24px 0px;
}
.therapy-cards__container .sign--btn {
  padding: 14px 28px;
  width: fit-content;
  background: #FFFFFF;
  border: 3px solid #3AC2B2;
  border-radius: 132px;
  order: 1;
  flex-grow: 0;
  margin: 24px auto;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #11A694;
  display: block;
}
#header-sticky {
  position: sticky;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 9;
}
.cp-card {
  display: block;
  cursor: pointer;
}
.cp-img-container {
  width: 100%;
}
.cp-img-container .cp-img-responsive {
  width: 100%;
  padding-top: 110%;
  position: relative;
  border-top-right-radius: 170px;
  overflow: hidden;
  border-top-left-radius: 170px;
  border: solid 4px #f0f7f6;
}
.cp-card:hover .cp-img-container .cp-img-responsive {
  border: solid 4px #3AC2B2;
}
.cp-img-container .cp-img-responsive img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
  object-position: top;
  border: solid 4px #f0f7f6;
  border-top-right-radius: 170px;
  border-top-left-radius: 170px;
}


/* Browse Care Providers */
.browser-container {
  max-width: 1150px;
  margin: auto;
  padding: 0px 20px;
}
.browser-container .cp-card {
  display: block;
  max-width: 300px;
  margin: auto;
}
.browser-container .cp-card h5 {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: #2C576E;
  margin: 0px;
}
.browser-container .cp-card P {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #485761;
}

/* CP Profile */
#cp-profile .cp-profile-container {
  border: 1px solid rgba(45, 57, 64, 0.1);
  box-shadow: 0px 4px 12px rgba(44, 87, 110, 0.08);
  border-radius: 12px 12px 0px 0px;
}
#cp-profile .profile--header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}
#cp-profile .back--btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 288.31px;
  height: 60px;
  background: #FFFFFF;
  border: 2px solid rgba(45, 57, 64, 0.1);
  border-radius: 50px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: rgba(44, 87, 110, 0.65);
}

#cp-profile .cp-rate-box {
  width: 304px;
  background: #FFFFFF;
  border: 2px solid rgba(45, 57, 64, 0.1);
  box-shadow: 0px 8px 16px rgb(44 87 110 / 8%);
  border-radius: 8px;
  padding: 16px;
}
#cp-profile .cp-rate-box p {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(45, 57, 64, 0.5);
  margin: 0px;
}
#cp-profile .cp-rate-box span {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 34px;
  letter-spacing: -0.01em;
  color: #11A694;
}
#cp-profile .cp-rate-box button {
  background: #3AC2B2;
  border-radius: 50px;
  width: 100%;
  padding: 16px 0px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  margin-top: 8px;
  color: #FFFFFF;
  border: unset;
}
#cp-profile .profile-basic-info {
  padding: 20px;
}
#cp-profile .profile-basic-info .profile-img {
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
  overflow: hidden;
  max-width: 308px;
  margin: auto;
}
#cp-profile .profile-basic-info .profile-img .responsive {
  position: relative;
  padding-top: 110%;
}
#cp-profile .profile-basic-info .profile-img img {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#cp-profile .profile-basic-info .basic-info-container span {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #11A694;
}
#cp-profile .profile-basic-info .basic-info-container h1 {
  font-family: 'Restora';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 44px;
  letter-spacing: -0.025em;
  color: #2C576E;
}
#cp-profile .profile-basic-info .basic-info-container .verified-tag {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 10px;
  gap: 4px;
  background: #DFF2EE;
  border-radius: 8px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: #11A694;
  margin-right: 8px;
}
#cp-profile .profile-basic-info .basic-info-container .cp-location {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: rgba(45, 57, 64, 0.5);
}
#cp-profile .profile-basic-info .basic-info-container p {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.01em;
  color: #485761;
  margin-top: 14px;
}
#cp-profile .profile-basic-info .basic-info-container .session-completed-container {
  border: 1px solid rgba(45, 57, 64, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  width: fit-content;
}
#cp-profile .profile-basic-info .basic-info-container .session-completed-container .title {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: -0.01em;
  color: rgba(45, 57, 64, 0.5);
}
#cp-profile .profile-basic-info .basic-info-container .session-completed-container .details {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: #485761;
}
#cp-profile .profile-reviews .review-container {
  padding: 32px;
  background: #F1F8F7;
  border-radius: 16px;
  margin: 10px;
}
#cp-profile .profile-reviews .review-container .cp-ratings {
  display: flex;
  gap: 5px;
  align-items: center;
}
#cp-profile .profile-reviews .review-container .cp-ratings {
  width: 28px;
}
#cp-profile .profile-reviews .review-container .review-content {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: #485761;
  text-align: left;
  margin-top: 10px;
}
#cp-profile .profile-reviews .review-container .reviews-footer {
  display: flex;
  gap: 10px;
  align-items: center;
  text-align: left;
}
#cp-profile .profile-reviews .review-container .reviews-footer .maintext {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  display: flex;
  align-items: flex-end;
  letter-spacing: -0.01em;
  color: #2C576E;
}
#cp-profile .profile-reviews .review-container .reviews-footer .subtext {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: #485761;
}
#cp-profile .profile-reviews .review-container .reviews-footer .avatar {
  width: 64px;
  height: 64px;
  border-radius: 100%;
}
#cp-profile .profile-reviews .review-container .reviews-footer .avatar img{
  height: 100%;
  width: 100%;
  object-fit: cover;
}
#cp-profile .general-info{
  padding: 20px 40px;
  margin: 20px;
  background: #FFFFFF;
  border: 1px solid rgba(45, 57, 64, 0.1);
  border-radius: 16px;
}
#cp-profile .general-info .general-info-details {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.01em;
  color: #485761;
  padding: 0px 20px;
}
#cp-profile .general-info .general-info-details ul li {
  display: block;
  border-bottom: solid 1px rgb(45 57 64 / 11%);
  padding: 10px 0px;
}
#cp-profile .general-info .general-info-details ul li:last-child {
  border-bottom: unset;
}
#cp-profile .general-info .general-info-title {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.01em;
  color: #2C576E;
}
#cp-profile .more-cp-container {
  padding: 20px;
}
#cp-profile .more-cp-container h1 {
  font-family: 'Restora';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 40px;
  letter-spacing: -0.02em;
  color: #2C576E;
}
#cp-profile .more-cp-container .browse-all-btn {
  display: block;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: #2C576E;
  border: 3px solid #3AC2B2;
  border-radius: 50px;
  padding: 16px 24px;
  cursor: pointer;
}

/* booking */
#datePicker {
  background: #FFFFFF;
  border: 2px solid rgba(45, 57, 64, 0.1);
  border-radius: 12px;
  cursor: pointer;
}
#datePicker .carousel__viewport {
  border-radius: 12px;
}
#datePicker .carousel__prev, #datePicker .carousel__next {
  background: #FFFFFF;
  border: 2px solid rgba(45, 57, 64, 0.1);
  box-shadow: 0px 12px 24px rgba(44, 87, 110, 0.15);
  width: 48px;
  height: 48px;
}
#datePicker .carousel__icon {
  fill: rgba(44, 87, 110, 1);
  width: 38px;
  height: 38px;
}
#datePicker .selectdate-container {
  border-left: 1px solid rgba(45, 57, 64, 0.1);
  border-right: 1px solid rgba(45, 57, 64, 0.1);
  width: 100%;
  height: 100%;
  padding: 20px 10px;
}
#datePicker .selectdate-container.activeDate {
  background: #FFFFFF;
  border: 3px solid #3AC2B2;
  box-shadow: 0px 12px 24px rgba(44, 87, 110, 0.15);
  border-radius: 12px;
  position: absolute;
}
#datePicker .selectdate-container.activeDate > .text-center{
  color: rgba(58, 194, 178, 1)!important;
}
#datePicker .selectdate-container.disableDate{
  background: #e3e9e9;
  opacity: .5;
}
.activeTime {
  border: 3px solid #3AC2B2!IMPORTANT;
  color: #3AC2B2!IMPORTANT;
}
@media (max-width: 991px) {
  .therapy-cards {
    justify-content: center;
    margin-top: 15px;
    max-width: 553px;
  }
  .therapy-card {
    margin-top: 20px;
    padding: 24px 16px 9px;
  }
  .therapy-card__text h1 {
    font-size: 20px;
    line-height: 1;
}
  .therapy-cards__container > h3 {
    font-size: 48px;
    line-height: 48px;
    width: 543px;
    margin-bottom: 0px;
  }
  .therapy-cards__container h4 {
    font-size: 20px;
    line-height: 34px;
  }
  .therapy-cards__container hr {
    margin: 20px auto;
  }
  .therapy-card__image {
    width: 70px;
    height: 100px;
  }
  .therapy-card--purple .therapy-card__image {
    width: 125px;
  }
  .therapy-card__text {
    width: 110px;
  }
  .therapy-card__text h2 {
    margin-bottom: 10px;
  }
}
@media (max-width: 767px) {
  .therapy-cards__container > h3 {
    font-size: 32px;
    line-height: 32px;
    width: 100%;
  }
  .therapy-card__text {
    width: 180px;
  }
  .therapy-card__text h1 {
    font-size: 18px;
    line-height: 28px;
  }
  .therapy-card__text h2 {
    font-size: 12px;
    line-height: 12px;
  }
}
@media (max-width: 425px) {
  .browser-container {
    padding: 0px 10px;
  }
  #cp--details h2 {
    font-size: 16px;
    line-height: 24px;
  }
  #cp--details P {
    font-size: 14px;
    line-height: 20px;
  }
}

/***********************************************
***********************************************/

/* / CLASSES FOR USE TO CHANGE THINGS / */
.bt-calendar ul {
  list-style-type: none;
  padding: 0;
  margin: 0 ;
}

.bt-calendar .calendar-wrapper {
  width: 100%;
}

.bt-calendar .calendar-table {
width: 100%;
display: inline-block;
}


/* / calendar-month-zone header / */
.bt-calendar .calendar-table .calendar-month-zone {
  padding: 20px;
  width: auto;
  background: #fff;
  text-align: center;
  color: #222;
}
.bt-calendar .calendar-table .calendar-month-zone .month {
  display: flex;
  align-items: center;
}
.bt-calendar .calendar-table .calendar-month-zone .month .monthly-select {
  width: fit-content;
  border: unset;
  font-size: 24px;
  font-weight: 600;
  line-height: 34px;
  letter-spacing: -0.01em;
  color: #2C576E;
}
.calendar--icon {
  display: flex;
  justify-content: center;
  align-items: center;
  position: static;
  width: 42px;
  height: 42px;
  background: rgba(45, 57, 64, 0.1);
  border-radius: 100%;
  margin-right: 10px;
  color: rgba(44, 87, 110, 0.65);
  font-size: 22px;
}
.bt-calendar .calendar-table .calendar-month-zone .button-wrapper {
  display: flex;
  align-items: center;
}
.bt-calendar .calendar-table .calendar-month-zone .button-wrapper .navigation-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: static;
  width: 42px;
  height: 42px;
  background: rgba(45, 57, 64, 0.1);
  border-radius: 100%;
  margin-left: 8px;
  border: unset;
  color: rgba(44, 87, 110, 0.65);
  font-size: 26px;
}
.bt-calendar .calendar-table .calendar-month-zone .button-wrapper .today-btn {
  background: #DFF2EE;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  display: flex;
  align-items: flex-end;
  letter-spacing: -0.01em;
  color: #11A694;
  opacity: 0.7;
  border: unset;
}



/* / Weekdays (Mon-Sun) / */
.bt-calendar.weekly-layout .calendar-table .weekdays {
  padding-left: 10%;
  display: flex;
  border-bottom: 1px solid rgba(45, 57, 64, 0.1);
}

.bt-calendar.weekly-layout .calendar-table .weekdays li {
  display: flex;
  width: 14.283%;
  color: #666;
  text-align: center;
  font-size: 12px;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  height: 91px;
  border-left: solid 1px rgba(45, 57, 64, 0.1);
}
.bt-calendar.weekly-layout .calendar-table ul li.active .week-day-item,
.bt-calendar.weekly-layout .calendar-table ul li.active .day-item {
  color: #3AC2B2;
}
/**************************************
  CALENDAR WEEKLY LAYOUT
**************************************/

.bt-calendar.weekly-layout .calendar-table .days>li {
  list-style-type: none;
  position: relative;
  display: inline-block;
  width: 14.283%;
  text-align: center;
  float: left;
  margin: 0;
  padding: 0;
  min-height: 840px;
  line-height: 40px;
  font-size: 12px;
  color: #777;
  border-left: solid 1px #d7dbdb;
}
.bt-calendar.weekly-layout .calendar-table .days>li:first-child {
  border-left: unset;
}

.bt-calendar.weekly-layout .calendar-table ul.days {
  width: 90%;
  float: right;
}

.bt-calendar.weekly-layout .calendar-table ul.day-time {
  width: 10%;
  float: left;
  display: inline-block;
}

.bt-calendar.weekly-layout .calendar-table ul.day-time li {
  width: 100%;
  height: 91px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(45, 57, 64, 0.1);
}

.bt-calendar.weekly-layout .calendar-table ul li .week-day-item {
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #2D3940;
  opacity: 0.5;
}

.bt-calendar.weekly-layout .calendar-table .day-item {
  display: block;
  text-align: center;
  margin-top: 2px;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.01em;
  color: #485761;
}
.bt-calendar.weekly-layout .calendar-table ul.day-time li:last-child {
  border-bottom: none;
}

.bt-calendar.weekly-layout .calendar-table ul.days li ul li {
  height: 91px;
}
.hourly-container {
  border-bottom: solid 1px #d7dbdb;
}
.half-hour-container {
  cursor: pointer;
  background: rgba(45, 57, 64, 0.1);
  height: calc(100% / 2);
  border-bottom: solid 1px #d7dbdb;
}
.half-hour-container:hover {
  
  background: rgb(77, 181, 242);
  
}
.half-hour-container:last-child, .hourly-container:last-child {
  border-bottom: unset;
}

/* / scheds / */
.half-hour-container .more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.half-hour-container .video-btn,
.half-hour-container .voice-btn ,
.half-hour-container .chat-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 12px;
}

.closed-sched {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0px 10px;
}
.closed-sched h4 {
  margin: 0px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: flex-end;
  color: #2D3940;
  opacity: 0.5;
}
.active-sched {
  display: flex;
  align-items: center;
  padding: 0px 10px;
  position: static;
  background: #3AC2B2;
  height: 100%;
}
.active-sched h4 {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #FFFFFF;
  margin: 0px;
}
.unbooked-sched {
  display: flex;
  align-items: center;
  padding: 0px 10px;
  position: static;
  height: 100%;
}
.unbooked-sched h4 {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #2D3940;
  opacity: 0.5;
  margin: 0px;
}
.open-sched {
  display: flex;
  align-items: center;
  padding: 0px 10px;
  position: static;
  height: 100%;
  background: #FFFFFF;
}
.open-sched h4 {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #3AC2B2;
  margin: 0px;
}

/* / CP MODAL / */

.cp-modal h1 {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  display: flex;
  align-items: flex-end;
  letter-spacing: -0.01em;
  color: #2C576E;
  margin-bottom: 5px;
}
.cp-modal h2 {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: #2D3940;
  margin-bottom: 0px;
}
.cp-modal h3 {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.05em;
  color: #2D3940;
  opacity: 0.5;
  margin: 0px;
}
.cp-modal p {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.01em;
  color: #485761;
}
.cp-modal .cp-status {
  font-family: 'Poppins';
  background: #3AC2B2;
  border: 2px solid rgba(45, 57, 64, 0.1);
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  font-weight: 600;
  font-size: 18px;
  color: white;
}
.cp-modal .view--btn {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: flex-end;
  color: #2D3940;
  opacity: 0.5;
  padding: 8px 12px;
  border: 2px solid rgba(45, 57, 64, 0.1);
  box-sizing: border-box;
  border-radius: 8px;
}
.cp-modal a {
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: #485761;
  text-decoration: unset;
  border-bottom: 2px solid rgba(45, 57, 64, 0.1);
}

/* / Custom Toggle / */
.custom--toggle {
  position: relative;
  margin: 10px;
}
.custom--toggle input[type=checkbox] {
  position: absolute;
  visibility: hidden;
}

.custom--toggle input[type=checkbox] + label{
  display: flex;
  justify-content: center;
  align-items: center;
  position: static;
  width: 85px;
  height: 37px;
  left: 0px;
  top: 0px;
  border-radius: 38px;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  background: rgba(45, 57, 64, 0.1);
  color: #2D3940;
  opacity: 0.5;
}

.custom--toggle input[type=checkbox]:checked + label {
  background: #3AC2B2;
  color: #FFFFFF;
  opacity: 1;
}

.custom--toggle input[type=checkbox]:checked + label img {
  content: url(../assets/img/icon-msg-enable.svg);
}
.confirm--btn{
  background: #DFF2EE;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: #11A694;
  opacity: 0.7;
  border: unset;
  width: 200px;
  margin: auto;
}
.confirm--btn:hover {
  background: #11A694 ;
  color: #DFF2EE;
  opacity: 1;
}
/* Modal CSS for history */
#history-modal {
  padding: 20px;
  position: relative;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #485761;
  max-width: 400px;
  margin: auto;
}
#history-modal .btn-close {
  position: absolute;
  right: 10px;
  top: 10px;
}
#history-modal .h-date {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.01em;
  color: #2C576E;
  margin-bottom: 5px;
}
#history-modal .h-label {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: rgba(45, 57, 64, 0.5);
}
#history-modal .h-amount {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: #2D3940;
}
#history-modal .paid-tag {
  background: #42C275;
  border: 2px solid #42C275;
  border-radius: 8px;
  padding: 0px 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.01em;
  color: #FFFFFF;
  gap: 5px;
}
#history-modal .h-avatar {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 100%;
  margin-right: 10px;
}
#history-modal .h-cpName {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: #2D3940;
}
#history-modal .view-sheet {
  letter-spacing: -0.01em;
  color: #2C576E;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  gap: 10px;
  border: 3px solid #3AC2B2;
  border-radius: 50px;
  background: white;
}
.bookAsession-profile {
  background: #FFFFFF;
  border: 1px solid rgba(45, 57, 64, 0.1);
  border-radius: 16px;
  padding: 8px;
  max-width: 400px;
}
.bookAsession-profile .profile-avatar {
  width: 64px;
  height: 64px;
  overflow: hidden;
  border-radius: 100%;
  margin-right: 10px;
}
.bookAsession-profile .profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.select-session-type {
  max-width: 450px;
}
.session-type-icon {
  width: 24px;
  height: 24px;
}

    .save-changes{
        position: fixed;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
    
</style>
<script>
import CareproviderHeader from '../../components/CareproviderHeader.vue'
import CPSessionSubHeader from '../../components/CPSessionSubHeader.vue'
import axios from 'axios'
import Helpers from '../helpers/helper'

export default {
    name:'Aboutyou',
    components: {
        CareproviderHeader,
        CPSessionSubHeader
    },
      data(){
       return{
            user:[]
       }
    },
    created () {
        this.fetchAboutMe()
    },
    methods: {
        async saveChanges() {
            // var questions = this.user.questionaires.map(function(item) {
            //     item.question = item.question.question
            // })
            console.info(this.user.questionaires)
            var arrQuestion = []
            this.user.questionaires.map(function(item) {
                arrQuestion.push({question: item.question.question, answer: item.answers, _id: item.question_id})
            })
            console.log('Questions')
            var myQuestion = {
                    "questions": arrQuestion
            }
            console.info(myQuestion)
            var data = JSON.stringify(myQuestion);
            console.info(data)
            try{
                const entry = await axios.put(this.env.aboutMe,data,{
                        headers: {
                            'Content-Type': 'application/json',
                            'token': this.token()
                        }
                    }
                )
              this.showNotif('About You Page Saved')
                if(entry.data.status){
                  var sessionData = entry.data.data;
                    console.log("sessionData");
                    console.info(sessionData);
                    

                    if(!login.data.status){
                        this.error.status = true
                        this.error.title = ""
                        this.error.message = login.data.error
                    }
                    else{
                       
                    }
                }
                else{
                    this.error.status = true
                    this.error.title = ""
                    this.error.message = entry.data.error
                    return
                }
            }
            catch(error){
                this.error.status = true;
                this.error.title = "";
                this.error.message = error;
            }
        },
        addAnswer(option, item) {
            if(item.question.multiple){
                item.answers.push(option.opt)
            }else{
                item.answers = [option.opt]
            }
        },
        removeAnswer(option, item) {
            if(item.question.multiple){
                var index = item.answers.indexOf(option.opt);
                if (index !== -1) {
                item.answers.splice(index, 1);
                }
            }else{
                // item.answers = [option.opt]
            }
        },
          token(){
            return Helpers.getToken("careseeker")
        },
        async fetchAboutMe() {
        const id = this.$route.params.id;
        if (id){
        try{
                const d = await axios.get(this.env.csUser+"/"+id,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                this.user = d.data.data[0]
                console.log('User')
                console.info(this.user)
                return true
            }
            catch(error){
                console.log(error)
            }
    }
        }
  }
}
</script>