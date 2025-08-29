<template>
    <!-- START OF SUNDAY COLUMN -->
    <li :data-weekday="week.day">
        <ul>
            <!-- START OF hourly-container -->
            <li v-for="(item,index) in SUNDAY" :key="index" class="hourly-container">
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
                    <!-- CANCELLED -->
                    <div v-if="item.first.status == 'Cancelled'" class="Cancelled-sched" data-toggle="modal" data-target="#modalSched">
                        <h4 class="me-2">Cancelled</h4>

                    </div>
                    <!-- CANCELLED -->
                    <div v-if="item.first.status == 'No_show'" class="Cancelled-sched" data-toggle="modal" data-target="#modalSched">
                        <h4 class="me-2">No Show</h4>
                    </div>
                  <!-- In Progress -->
                    <div v-if="item.first.status == 'In_progress'" class="open-sched" data-toggle="modal" data-target="#modalSched">
                        <h4 class="me-2">In Progress</h4>
                        <div v-for="(session,sessionIndex) in item.first.session_type" :key="sessionIndex" :class="`${session}-btn`">
                            <img style="width : 12px; text-align: center; margin-left: 1px;" :src="`/assets/img/icon-gray-${session}-enable.svg`" alt="" />
                        </div>
                    </div>
                    <!-- Completed -->
                    <div v-if="item.first.status == 'Completed'" class="open-sched" data-toggle="modal" data-target="#modalSched">
                        <h4 class="me-2">Completed</h4>
                    </div>
                      <div v-if="item.first.status == 'No_booking'" class="Cancelled-sched">
                        <h4 class="me-2">No Booking</h4>
                    </div>
                </div>
                    <div class="half-hour-container" @click="openModal(item.second, week,mydate )" :data-time="`${mydate.myday}_${item.first.time[0]}`" >
                    <div v-if="item.second.status == 'Closed'" class="closed-sched" data-toggle="modal" data-target="#modalSched">
                        <h4>Closed</h4>
                        <div class="more-btn">
                            <span class="material-icons"> more_horiz </span>
                        </div>
                    </div>
                    <!-- START OF RESERVED -->
                    <div v-if="item.second.status == 'Reserved' && item.second.clickActive" class="active-sched" data-toggle="modal" data-target="#modalSched">
                        <div v-for="(insideSessionType,indexSession) in item.second.session_type" :key="indexSession" :class="`${insideSessionType}-btn`">
                            <img :src="`/assets/img/icon-gray-${insideSessionType}-enable.svg`" alt="">
                        </div>
                        <h4 v-if="item.second.singleitem.session_set">{{item.second.singleitem.session_set.cs_id.profile.firstname}}</h4>
                    </div>
                      <div v-if="item.second.status == 'Reserved' && !item.second.clickActive" class="active-sched" >
                        <div v-for="(insideSessionType,indexSession) in item.second.session_type" :key="indexSession" :class="`${insideSessionType}-btn`">
                            <img :src="`/assets/img/icon-gray-${insideSessionType}-enable.svg`" alt="">
                        </div>
                        <h4 v-if="item.second.singleitem.session_set">{{item.second.singleitem.session_set.cs_id.profile.firstname}}</h4>
                    </div>
                        <!-- END OF RESERVED -->
                        <!-- START OF open-sched -->
                    <div v-if="item.second.status == 'Open'" class="open-sched" data-toggle="modal" data-target="#modalSched">
                        <h4 class="me-2">Open</h4>
                        <div v-for="(session,sessionIndex) in item.second.session_type" :key="sessionIndex" :class="`${session}-btn`">
                            <img style="width : 12px; text-align: center; margin-left: 1px;" :src="`/assets/img/icon-gray-${session}-enable.svg`" alt="" />
                        </div>
                    </div>
                    <!-- END OF open-sched -->
                    <!-- CANCELLED -->
                    <div v-if="item.second.status == 'Cancelled'" class="Cancelled-sched" data-toggle="modal" data-target="#modalSched">
                        <h4 class="me-2">Cancelled</h4>
                    </div>
                    <!-- CANCELLED -->
                    <div v-if="item.second.status == 'No_show'" class="Cancelled-sched" data-toggle="modal" data-target="#modalSched">
                        <h4 class="me-2">No Show</h4>
                        
                    </div>
                       <!-- In Progress -->
                       <div v-if="item.second.status == 'In_progress'" class="open-sched" data-toggle="modal" data-target="#modalSched">
                        <h4 class="me-2">In Progress</h4>
                        <div v-for="(session,sessionIndex) in item.second.session_type" :key="sessionIndex" :class="`${session}-btn`">
                            <img style="width : 12px; text-align: center; margin-left: 1px;" :src="`/assets/img/icon-gray-${session}-enable.svg`" alt="" />
                        </div>
                    </div>
                    <!-- Completed -->
                    <div v-if="item.second.status == 'Completed'" class="open-sched" data-toggle="modal" data-target="#modalSched">
                        <h4 class="me-2">Completed</h4>
                    </div>
                     <div v-if="item.second.status == 'No_booking'" class="Cancelled-sched">
                        <h4 class="me-2">No Booking</h4>
                        
                    </div>
                </div>
            </li>
            <!-- END OF hourly-container -->
        </ul>
    </li>
   
    
</template>

	
<script>
import moment from 'moment';

export default {
    name : "CareproviderHeader",
    props : ["times","week","day","mydate", "sched"],
    data() {
        return{
            SUNDAY: [],
            showModal: false,
            activeTime: '',
            activeDate: '',
            activeWeek: 'test'
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
        fetchSchedule() {
            //TODO: Create a component for this and fetch each day only, pass only the times, date
            var i = 0
            var self = this
            while(this.times.length > i){
                if((i < 23)){
                    var firstTime = [this.times[i].firstTime, this.times[i + 1].firstTime];
                    var secondTime = [this.times[i].secondTime, this.times[i + 1].secondTime];
                }else{
                    var firstTime = [this.times[i].firstTime, this.times[0].firstTime];
                    var secondTime = [this.times[i].secondTime, this.times[0].secondTime];
                }
                

                // console.log('This')
                    // console.info(this.week.sched)
                    var schedFirst = {status: 'Closed', time: firstTime}
                    var schedSecond = {status: 'Closed', time: secondTime}
                    
                    
                    this.SUNDAY[i] = ({first: schedFirst, second: schedSecond })
                
                i++;
            }
            // this.SUNDAY[2] = {first: {status: 'Open', time: firstTime}, second: schedSecond }
            
            this.sched.forEach(function(item) {
                //  var mySunday = self.SUNDAY.filter(funtion(sundayItem) {
                //      return sundayItem.firstTime == 
                //  })

                self.SUNDAY.forEach(function(sundayItem, index) {
                    // let itemDate = moment(String(item.date)).format('MMMM D, YYYY')
                    
                    if(item.status == 'Reserved'){
                    //console.log('Sunday Item')
                      //  console.info(item)
                    }
                        if(sundayItem.first.time[0] == item.time_start) {
                            sundayItem.first.status = item.status
                            sundayItem.second.status = item.status
                            sundayItem.first.session_type = item.session_type
                            sundayItem.second.session_type = item.session_type
                            sundayItem.first.date = item.date
                            sundayItem.second.date = item.date
                            sundayItem.first.singleitem = item
                            sundayItem.second.singleitem = item
                            sundayItem.first.clickActive = true
                            sundayItem.second.clickActive = false

                        }
                        if(sundayItem.second.time[0] == item.time_start) {
                            sundayItem.second.status = item.status
                            self.SUNDAY[index + 1].first.status = item.status
                            sundayItem.second.session_type = item.session_type
                            self.SUNDAY[index + 1].first.session_type = item.session_type
                            sundayItem.second.date = item.date
                            self.SUNDAY[index + 1].first.date = item.date
                            sundayItem.second.singleitem = item
                            self.SUNDAY[index + 1].first.singleitem = item

                            sundayItem.second.clickActive = true
                            self.SUNDAY[index + 1].first.clickActive = false

                        }
                        

                })
            })
           
        }
    },
    created () {
        var self = this
              setTimeout(myFunction, 2000)
              function myFunction() {
		self.fetchSchedule()
				}
        
    }
}
</script>