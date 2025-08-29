<template>
    <CareproviderHeader section="mysession" />

    <!-- START OF CALENDAR -->
    <div class="container my-5">
        <div class="mb-3 rounded-3 bg-white">
            <div class="bt-calendar weekly-layout">
                <div class="calendar-wrapper">
                    <div class="calendar-table">
                        <!-- START OF calendar-month-zone (HEADER) -->
                        <div class="calendar-month-zone">
                            <div class="d-flex justify-content-between">
                                <div class="month">
                                    <div class="calendar--icon">
                                        <span class="material-icons"> calendar_month </span>
                                    </div>
                                    <select v-model="activeMonth" @change="changeMonth" class="form-select monthly-select">
                                        <option v-for="(item,cnt) in displayMonths" :key="cnt" :value="cnt">
                                            {{item}}
                                        </option>
                                    </select>
                                </div>
                                <div class="button-wrapper">
                                    <button @click="today" class="today-btn me-4">Today</button>
                                    <button @click="prevWeek" class="navigation-btn"><span class="material-icons">
                                            arrow_back_ios_new </span></button>
                                    <button @click="nextWeek" class="navigation-btn"><span class="material-icons">
                                            arrow_forward_ios </span></button>
                                </div>
                            </div>
                        </div>
                        <!-- START OF calendar-month-zone (HEADER) -->

                        <!-- Start of Days class="active" -->
                        <ul class="weekdays">
                            <li v-for="(item,index) in arrDays" :key="index" :data-weekday="item.day" class="">
                                <span class="week-day-item">{{item.day}}</span>
                                <span class="day-item">{{arrWeeks[index].getdate}}</span>

                            </li>
                        </ul>
                        <!-- End of Days -->

                        <!-- Start of Day Time -->
                        <ul class="day-time">
                            <li v-for="(item,index) in times" :key="index">{{item.firstTime}}</li>

                        </ul>
                        <!-- End of Day Time -->

                        <ul class="days">
                            <!-- START OF SUNDAY COLUMN -->
                            <DaySchedule v-for="(item,index) in arrDays" :key="`'days_${index}`"
                                :mydate="arrWeeks[index]" :times="times" :month="activeMonth" :week="item"
                                :day="item.day" :sched="item.sched" />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END OF CALENDAR -->
    <!-- Modal -->

    <div class="modal fade" id="activeSched" data-backdrop="static" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered cp-modal">
            <div class="modal-content py-3 px-4">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                    style="position: absolute;right: 10px;top: 10px;">
                    <span class="material-icons"> close </span>
                </button>
                <h3>{{activeWeek}}- A</h3>
                <h1>August 30, 2021</h1>
                <p>10:00 AM - 10:30 AM</p>
                <select class="cp-status">
                    <option selected>Reserved</option>
                </select>
                <hr>
            </div>
        </div>
    </div>

    <div class="modal fade show" id="modalSched" data-backdrop="static" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered cp-modal">
            <div class="modal-content py-3 px-4">
                <button @click="emptyActiveItem" ref="Close" type="button" class="close" data-dismiss="modal" aria-label="Close"
                    style="position: absolute;right: 10px;top: 10px;">
                    <span class="material-icons"> close </span>
                </button>
                <h3>{{activeWeek}}</h3>
                <h1>{{activeDate}}</h1>
                <p>{{activeItem.time[0]}} - {{activeItem.time[1]}}</p>
                <select v-model="activeItem.status" v-if="activeItem.status == 'Open' || activeItem.status == 'Closed'"
                    class="cp-status">
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    
                </select>
                <select v-model="activeItem.status" v-else class="cp-status">
                    <option :value="activeItem.status">{{activeItem.status.replace('_',' ')}}</option>
                </select>
                <hr>
                <!-- START OF ACTIVE-SCHED Modal -->
                <div class="px-2" v-if="activeItem.status != 'Open' && activeItem.status != 'Closed'">
                    <h3>Patient information</h3>
                    
                    <div class="row align-items-center mt-2">
                        <div class="col-2">
                            <img width="100%" class="img-fluid" src="@/assets/img/avatar-male.png" alt="">
                        </div>
                        <div class="col-8">
                            <h2 class="d-flex align-items-center"><span class="material-icons text-maincolor mr-1">
                                    person </span> {{activeItem.singleitem.session_set.cs_id.profile.firstname}}</h2>
                            <h3>{{activeItem.singleitem.session_set.cs_id.profile.age}} Years old</h3>
                            
                        </div>
                        <div class="col-2">
                            <a :href="`/careprovider/session/aboutcareseeker/${activeItem.singleitem.session_set.cs_id._id}`" target="_blank">
                            <button class="view--btn">View</button>
                            </a>
                        </div>
                    </div>
                    <div class="d-flex alig-items-center p-2 mt-2">
                        <img class="me-3" width="18px" src="@/assets/img/icon-gray-phone-enable.svg" alt="">
                        <!-- <a href="">+63 947 573 2884</a> -->
                    </div>
                   
                    <div v-if="activeItem.status == 'Reserved' || activeItem.status == 'In_progress'"  class="d-flex alig-items-center p-2 mt-2" >
                        
                        <img class="me-3" width="18px" src="@/assets/img/icon-gray-video-enable.svg" alt="">
                        <!-- {{activeItem}} -->
                        <a target="_blank" :href="`https://esafe-vcall.herokuapp.com/268801a4-2034-49b3-90d1-72eb0df8d756?schedule=${activeItem.singleitem._id}`">
                       Click this link to join the session</a>
                    </div>
                    <div class="text-center p-3">
                        <button v-if="activeItem.status == 'Reserved'" type="button" class="btn btn-danger-outline btn-lg text-danger font-poppins fw-bolder" data-toggle="modal" data-target="#exampleModal">
                        Cancel Session
                        </button>
                    </div>
                    
                </div>
                <!-- END OF ACTIVE-SCHED Modal -->
                <!-- START OF OPEN-SCHED Modal -->
                <div class="px-2" v-show="activeItem.status == 'Open'">
                    <h3 class="text-center">Open session for</h3>
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="custom--toggle">
                            <input v-model="activeSessionType" type="checkbox" id="video" name="video" value="video"
                                checked>
                            <label for="video"><img class="me-1" width="18px"
                                    src="@/assets/img/icon-msg-disable.svg" alt=""> Video</label>
                        </div>
                        <div class="custom--toggle">
                            <input v-model="activeSessionType" type="checkbox" id="voice" name="voice" value="voice">
                            <label for="voice"><img class="me-1" width="18px"
                                    src="@/assets/img/icon-msg-disable.svg" alt=""> Voice</label>
                        </div>
                        <div class="custom--toggle">
                            <input v-model="activeSessionType" type="checkbox" id="chat" name="chat" value="chat">
                            <label for="chat"><img class="me-1" width="18px" src="@/assets/img/icon-msg-disable.svg"
                                    alt=""> Chat</label>
                        </div>
                    </div>
                    <img class="d-block mx-auto my-4" width="80px" src="@/assets/img/couch.png" alt="">
                    <h2 style="max-width: 280px" class="text-maincolor text-center mx-auto">This timeslot is available
                        for video call sessions.</h2>
                    <p class="text-center mt-2">We’ll notify you when a client wants to book you for this session.
                        Please keep an eye out!</p>
                </div>
                <!-- END OF OPEN-SCHED Modal -->
                <!-- START OF CLOSE-SCHED Modal -->
                <div class="px-2" v-show="activeItem.status == 'Closed'">
                    <img class="d-block mx-auto my-3" src="@/assets/img/closed.png" alt="">
                    <h2 style="max-width: 280px" class="text-center mx-auto">This timeslot is closed.</h2>
                </div>
                <!-- END OF CLOSE-SCHED Modal -->
                <button @click="createSchedule" class="confirm--btn"
                    v-show="activeItem.status == 'Open'">CONFIRM</button>
                <button @click="closeSchedule" class="confirm--btn"
                    v-show="activeItem.status == 'Closed'">CONFIRM</button>
            </div>
        </div>
    </div>
    <ErrorModal v-if="error.status" v-bind:toggleError="() => error.status = false">
        <h3 class="mt-5 mb-3 text-danger fw-bolder">{{error.title}}</h3>
        <small class="text-muted">{{error.message}}</small>
    </ErrorModal>

    <!-- Cancel Session Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered cp-modal">
    <div class="modal-content py-3 px-4">
       <button ref="Close" type="button" class="btn-close" data-dismiss="modal" aria-label="Close"
                    style="position: absolute;right: 10px;top: 10px;">
                    <!-- <span class="material-icons"> close </span> -->
                </button>
      <div class="pt-3 pb-3 font-poppins">
        <p class="text-boldcolor fs-4 fw-bolder">Cancel session</p>
        <p class="pt-1">Are you sure you want to cancel this session?</p>
      </div>
      <div class="text-center">
        <button @click="cancelSession(activeItem.singleitem?._id)" type="button" class="btn btn-danger rounded-pill w-50 mb-3 px-1 py-2 mr-1">Cancel session</button>&nbsp;
        <button type="button" class="btn btn-secondary rounded-pill w-25 mb-3 px-1 py-2" data-dismiss="modal">Dismiss</button>
      </div>
    </div>
  </div>
</div>
    <Footer />

</template>



<script>
    import CareproviderHeader from '../../components/CareproviderHeader.vue'
    import DaySchedule from '../../components/DaySchedule.vue'
    import Footer from '../../components/Footer.vue'
    import axios from 'axios'
    import moment from 'moment';
    import Helpers from '../helpers/helper'
    import ErrorModal from '../../components/ErrorModal.vue'
    export default {
        name: 'Dashboard',
        components: {
            CareproviderHeader,
            Footer,
            DaySchedule,
            Helpers,
            ErrorModal
        },
        data() {
            return {
                activeWeek: 'Rey',
                singleitem: {},
                cpStatus: 'reserved',
                days: [],
                arrDays: [{
                        day: 'Sun',
                        sched: []
                    },
                    {
                        day: 'Mon',
                        sched: []
                    },
                    {
                        day: 'Tue',
                        sched: []
                    },
                    {
                        day: 'Wed',
                        sched: []
                    },
                    {
                        day: 'Thu',
                        sched: []
                    },
                    {
                        day: 'Fri',
                        sched: []
                    },
                    {
                        day: 'Sat',
                        sched: []
                    }
                ],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                    "October", "November", "December"
                ],
                displayMonths: [],
                activeMonth: 4,
                currMonthEnd: 30,
                activeYear: 2022,
                activeDate: '',
                activeItem: {
                    status: 'Open',
                    time: [0, 0],
                    singleitem: {
                        session_set: { cs_id : { _id: '0', profile: { firstname: ''} } }
                    }
                },
                activeSessionType: ['video'],
                lastDay: 0,
                firstday: 0,
                startIndex: 0,
                times: [],
                arrWeeks: [],
                activeDirection: 'right',
                error: {
                    status: false,
                    title: null,
                    message: null
                },
                schedules: [],
                startDate: ''
            }
        },
        created() {
            // this.$toast.open('You did it!');
            console.log('Started CP')
            this.startDate = this.$route.params.weekDate
            this.getDay()
            this.loopTime()
            this.fetchSchedule()
        },
        methods: {
            emptyActiveItem() {
                this.activeItem = {
                    status: 'Open',
                    time: [0, 0],
                    singleitem: {
                        session_set: { cs_id : { _id: '0', profile: { firstname: ''} } }
                    }
                }
            },
            reload(){
                window.location.reload()
            },
            async fetchSchedule() {
                var self = this
                self.schedules = []
                self.arrDays = [{
                        day: 'Sun',
                        sched: []
                    },
                    {
                        day: 'Mon',
                        sched: []
                    },
                    {
                        day: 'Tue',
                        sched: []
                    },
                    {
                        day: 'Wed',
                        sched: []
                    },
                    {
                        day: 'Thu',
                        sched: []
                    },
                    {
                        day: 'Fri',
                        sched: []
                    },
                    {
                        day: 'Sat',
                        sched: []
                    }
                ]
                try {
                    const entry = await axios.get(
                    `${this.env.scheduleWeekly}?start_date=${this.arrWeeks[0].myday}`, {
                        headers: {
                            'token': `${this.token()}`
                        }
                    })
                    if (entry.data.status) {
                        self.schedules = entry.data.data
                        console.info(this.schedules)
                        self.arrDays.forEach(function (day) {
                            day.sched = self.schedules.filter(function (item) {
                                var schedDate = moment(String(item.date)).format('ddd')
                                item.schedDate = schedDate
                                // console.info(schedDate+ ' - '+ day.day)
                                return schedDate === day.day
                            })

                        })
                        console.log('Arr Days')
                        console.info(self.arrDays)
                        this.$forceUpdate()
                        return true
                    }
                } catch (error) {
                    this.error.status = true,
                        this.error.title = "Error occured"
                    this.error.message = error
                }
            },
            token() {
                return Helpers.getToken("token")
            },
            loopTime() {
                console.log('Loop Time')
                var minutesToAdd = 60;
                var minutesToAdd2 = 30;
                var currentDate = new Date('Thu May 05 2022 04:30:00');
                for (var i = 0; i < 24; i++) {
                    var secondDate = new Date(currentDate.getTime() + minutesToAdd2 * 60000);
                    var firstTime = moment(String(secondDate)).format('hh:mm A')
                    var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
                    var secondTime = moment(String(futureDate)).format('hh:mm A')
                    currentDate = futureDate
                    var timesTwo = {
                        firstTime: firstTime,
                        secondTime: secondTime
                    }
                    this.times.push(timesTwo)
                }

            },
            async createSchedule() {
                var self = this
                if (self.activeSessionType.length <= 0) {
                    self.error.status = true
                    self.error.title = "Error"
                    self.error.message = 'Please provide session type'
                    return
                }
                try {
                    var params = {
                        "date": moment(String(self.activeDate)).format('Y-MM-DD'),
                        "time_start": self.activeItem.time[0],
                        "time_end": self.activeItem.time[1],
                        "session_type": self.activeSessionType
                    }
                    const d = await axios.post(this.env.createSchedule,
                        params, {
                            headers: {
                                'Content-Type': 'application/json',
                                'token': `${self.token()}`
                            }
                        })
                    console.info(d)

                    if (d.data.status) {
                        // this.success.status = true
                        // this.success.message = "Schedule Created"
                        this.showNotif('Schedule Created')
                        this.$refs.Close.click();
                        window.location.reload()
                        return
                    } else {
                        this.error.status = true
                        this.error.title = "Error"
                        this.error.message = d.data.error
                        return
                    }

                } catch (error) {
                    this.emailSending = false
                    console.log(error)
                }
            },
            async closeSchedule() {
                var self = this
                if (self.activeSessionType.length <= 0) {
                    self.error.status = true
                    self.error.title = "Error"
                    self.error.message = 'Please provide session type'
                    return
                }
                try {
                    
                    const d = await axios.get(this.env.closeSchedule + '?id=' + this.singleitem._id,
                         {
                            headers: {
                                'Content-Type': 'application/json',
                                'token': `${self.token()}`
                            }
                        })
                    console.info(d)

                    if (d.data.status) {
                        // this.success.status = true
                        // this.success.message = "Schedule Created"
                        this.showNotif('Schedule Closed')
                        this.$refs.Close.click();
                        window.location.reload()
                        return
                    } else {
                        this.error.status = true
                        this.error.title = "Error"
                        this.error.message = d.data.error
                        return
                    }

                } catch (error) {
                    this.emailSending = false
                    console.log(error)
                }
            },
            changeMonth(){
                var first_working_day = new moment([this.activeYear, this.activeMonth])
                while (first_working_day.day() % 6 == 0) {
                    first_working_day = first_working_day.add(1, 'day')
                }
                var weeknumber = moment(first_working_day, "MM-DD-YYYY").week();
                this.redirectSite(weeknumber)
                var startDate = moment().day("Sunday").week(weeknumber).format('YYYY-MM-DD');
                window.location.href = "/careprovider/session/calendar/" + startDate        
            },
            loopDay(direction) {
                console.info(this.firstday)
                var day = this.firstday;
                this.arrWeeks = []
                this.arrWeeks.push({
                    myday: moment(String(day)).format('MMMM D, YYYY'),
                    getdate: day.getDate(),
                    dddd: moment(String(day)).format('dddd')
                })
                for (var i = 0; i < 7; i++) {
                    var nextDay = new Date(day);
                    if (direction == 'left') {
                        nextDay.setDate(day.getDate() - 1);
                    } else {
                        nextDay.setDate(day.getDate() + 1);
                    }
                    this.arrWeeks.push({
                        myday: moment(String(nextDay)).format('MMMM D, YYYY'),
                        getdate: nextDay.getDate(),
                        dddd: moment(String(day)).format('dddd')
                    })
                    // console.log(nextDay); // May 01 2000    
                    day = nextDay
                }
                if (direction == 'left') {
                    this.arrWeeks.reverse()
                }
                //this.activeMonth = nextDay.getMonth();
                console.log('Loop Day')
                //console.info(this.activeMonth)
                this.displayMonths = this.months.slice(this.months[this.activeMonth])
                this.firstday = nextDay
            },
            prevWeek() {
               var nextDay = moment(String(this.startDate)).subtract(7, 'days');
                this.redirectSite(nextDay)
            },
            nextWeek() {
              var nextDay = moment(String(this.startDate)).add(7, 'days');
              this.redirectSite(nextDay)
            },
            redirectSite(nextDay){
                var startDate = moment(String(nextDay)).format('YYYY-MM-DD')
                window.location.href = "/careprovider/session/calendar/" + startDate
            },
            today() {
                 var curr = new Date; // get current date
                var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                var myFirstDay = new Date(curr.setDate(first));
            
                var startDate = moment(String(myFirstDay)).format('YYYY-MM-DD')
                window.location.href = "/careprovider/session/calendar/" + startDate
                console.info(test)
            },
            getDay() {
                this.firstday = new Date(this.startDate);
                this.activeMonth = moment(String(this.startDate)).add(7, 'days').format('M') - 1;
                this.loopDay('right')
            },
            async cancelSession(id){
            try{
            const entry = await axios.get(this.env.getcancelSession+"?id="+id,{
                headers: {
                    "Content-Type": "application/json",
                    "token": `${this.token()}`
                }
            })

            if(entry.data.status){
                var sessionData = entry.data.data;
                    console.log("sessionData");
                    console.info(sessionData);

                    this.showNotif('Session Cancelled')
                    this.$refs.Close.click();
                    window.location.reload()
                return
            }

            }
            catch (error) {
                console.log(error);
                this.error.status = true;
                this.error.title = "";
                this.error.message = error;
            }
        }
        },
    }
</script>