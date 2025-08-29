<template>
    <!-- START OF SUNDAY COLUMN -->
    <div class="half-hour-container" @click="openModal(item.first, week, mydate)" :data-time="`${mydate.myday}_${item.first.time[0]}`" >
                        <div v-if="item.first.status == 'Closed'" class="closed-sched" data-toggle="modal" data-target="#modalSched">
                        <h4>Closed</h4>
                        <div class="more-btn">
                            <span class="material-icons"> more_horiz </span>
                        </div>
                    </div>
                    <!-- START OF RESERVED -->
                    <div v-if="item.first.status == 'Reserved' && item.first.clickActive" class="active-sched" data-toggle="modal" data-target="#modalSched">
                        <div v-for="(insideSessionType,indexSession) in item.first.session_type" :key="indexSession" :class="`${insideSessionType}-btn`">
                            <img :src="`/assets/img/icon-gray-${insideSessionType}-enable.svg`" alt="">
                        </div>
                        <h4 v-if="item.first.singleitem.session_set">{{item.first.singleitem.session_set.cs_id.profile.firstname}}</h4>
                    </div>

                     <div v-if="item.first.status == 'Reserved' && !item.first.clickActive" class="active-sched">
                        <div v-for="(insideSessionType,indexSession) in item.first.session_type" :key="indexSession" :class="`${insideSessionType}-btn`">
                            <img :src="`/assets/img/icon-gray-${insideSessionType}-enable.svg`" alt="">
                        </div>
                        <h4 v-if="item.first.singleitem.session_set">{{item.first.singleitem.session_set.cs_id.profile.firstname}}</h4>
                    </div>
                        <!-- END OF RESERVED -->
                        <!-- START OF open-sched -->
                    <div v-if="item.first.status == 'Open'" class="open-sched" data-toggle="modal" data-target="#modalSched">
                        <h4 class="me-2">Open
                        </h4>
                       <div v-for="(session,sessionIndex) in item.first.session_type" :key="sessionIndex" :class="`${session}-btn`">
                            <img style="width : 12px; text-align: center; margin-left: 1px;" :src="`/assets/img/icon-gray-${session}-enable.svg`" alt="" />
                        </div>
                    </div>
                    <!-- END OF open-sched -->
                </div>
   
    
</template>

	
<script>
import moment from 'moment';

export default {
    name : "CareproviderHeader",
    props : ["item"],
    data() {
        return{
          
        }
    },
    methods : {

        openModal(item, week, mydate) {
            console.log('Open Modal')
            console.info(item.singleitem)
            this.$parent.cpStatus = item.status
            this.$parent.activeDate = mydate.myday
            this.$parent.singleitem = item.singleitem
            this.$parent.activeWeek = moment(mydate.myday).format('dddd')
            if(item.status == 'Closed'){
                item.singleitem =  {
                    session_set: { cs_id : { _id: '0', profile: { firstname: ''} } }
                }
            }
            this.$parent.activeItem = item
            this.$forceUpdate()
        },
    },
    created () {
        
    }
}
</script>