<template>
  <div class="modal-content-wrapper">
    <header class="apo-modal__header">面談のご予約</header>
    <div class="apo-modal__body">
      <div>ご希望の面談方法をお選びの上、日程をご選択下さい。</div>
      <div class="apo-annotation">※お選び頂いた選択肢に応じて、面談可能な日程が変化致しますので、<br>ご希望の日時が見つからなかった場合は他の面談方法もお試し下さい。</div>
      <transition mode="out-in">
        <div 
          v-if="!responseReceived" 
          key="icon" 
          class="loading-icon-wrapper">
          <LineSpinFadeLoader/>
        </div>
        <div 
          v-if="responseReceived" 
          key="content">
          <div class="meeting-icontext-wrapper">
            <div class="meeting-icontext-wrapper__col">
              <label>
                <input 
                  :disabled="!responseReceived" 
                  type="radio" 
                  name="radio" 
                  class="fake-radio" 
                  @click="selectSkype()">
                <i class="fab fa-skype col__icon"/>
              </label>
              <div class="col__text">Skype</div>
            </div>
            <div class="meeting-icontext-wrapper__col">
              <label>
                <input 
                  :disabled="!responseReceived" 
                  type="radio" 
                  name="radio" 
                  class="fake-radio" 
                  @click="selectOffice()">
                <i class="fas fa-building col__icon"/>
              </label>
              <div class="col__text">オフィスにおいで</div>
            </div>
            <div class="meeting-icontext-wrapper__col">
              <label>
                <input 
                  :disabled="!responseReceived" 
                  type="radio" 
                  name="radio" 
                  class="fake-radio" 
                  @click="selectLunch()">
              <i class="fas fa-utensils col__icon"/></label>
              <div class="col__text">ランチのついで</div>
            </div>
          </div>
          <div class="row">
            <el-date-picker
              v-model="apoDate"
              :picker-options="pickerOption"
              :disabled="!iconsSelected"
              type="date"
              placeholder="ご希望の日時"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"/>
          </div>
          <div class="row">
            <el-input 
              v-model="place" 
              :disabled="!iconsSelected || apoType === 'skype'" 
              placeholder="場所" 
              style="width: 220px;"/>
          </div>
          <button 
            v-if="!whileLoading" 
            :disabled="disabledCondition" 
            class="button" 
            @click="makeAppointment(); showLoadingIcon()">
            <i class="far fa-envelope button__icon"/>
          </button>
          <div 
            v-if="whileLoading" 
            class="loading-icon-wrapper">
            <LineSpinFadeLoader/>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment-timezone'
import { fireFunc } from '~/plugins/firebase-setting'

export default {
  name: 'MakeAppointment',
  data () {
    return {
      apoDate: null,
      apoType: null,
      reservedDatesForMeeting: [],
      reservedDatesForSkype: [],
      calcedReservedDates: [],
      responseReceived: false,
      iconsSelected: false,
      whileLoading: false,
      reserveTime: null,
      place: null
    }
  },
  computed: {
    pickerOption () {
      const reservedDates = this.calcedReservedDates

      return {
        disabledDate (time) {
          const targetDate = moment(time, 'ddd MMM DD YYYY').tz('Asia/Tokyo').startOf('day')
          const threeDaysLater = moment().tz('Asia/Tokyo').startOf('day').add(3, 'days')
          const twoWeeksLater = moment().tz('Asia/Tokyo').startOf('day').add(14, 'days')

          if (targetDate.isBefore(threeDaysLater) || targetDate.isAfter(twoWeeksLater)) {
            return true
          }

          for (let elem of reservedDates) {
            const date = moment(elem, 'YYYY/MM/DD').tz('Asia/Tokyo').startOf('day')

            if (targetDate.isSame(date)) {
              return true
            }
          }

          return false
        }
      }
    },
    disabledCondition () {
      if (!this.apoType) {
        return true
      }

      if ((this.apoType === 'office' || this.apoType === 'lunch') &&
        (!this.apoDate || !this.place)) {
        return true
      }

      if (this.apoType === 'skype' && !this.apoDate) {
        return true
      }

      return false
    }
  },
  created () {
    this.getReservedDates()
  },
  methods: {
    async getReservedDates () {
      const func = fireFunc.httpsCallable('getReservedDates')

      const result = (await func()).data
      this.reservedDatesForMeeting = result.reservedDatesForMeeting
      this.reservedDatesForSkype = result.reservedDatesForSkype
      this.responseReceived = true
    },
    selectSkype () {
      this.apoType = 'skype'
      this.apoDate = null
      this.place = null
      this.iconsSelected = true
      this.calcedReservedDates = this.reservedDatesForSkype
    },
    selectOffice () {
      this.apoType = 'office'
      this.apoDate = null
      this.iconsSelected = true
      this.calcedReservedDates = this.reservedDatesForMeeting
    },
    selectLunch () {
      this.apoType = 'lunch'
      this.apoDate = null
      this.iconsSelected = true
      this.calcedReservedDates = this.reservedDatesForMeeting
    },
    async makeAppointment () {
      const func = fireFunc.httpsCallable('makeAppointment')

      try {
        await func({
          type: this.apoType,
          date: this.apoDate,
          place: this.place
        })

        this.$store.commit('updateReservationState', true)
        this.$emit('done')
      } catch (err) {
        this.$emit('error')
      }
    },
    showLoadingIcon () {
      this.whileLoading = true
    }
  }
}
</script>

<style scoped>
.apo-modal__header {
  flex: 0;
  flex-basis: 8vh;
  background-color: #3E5A72;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.apo-modal__body {
  flex: 1;
  padding: 10px 20px;
}
.apo-annotation {
  margin: 1rem auto 0 auto;
  font-size: .8em;
}
.meeting-icontext-wrapper {
  width: 80%;
  margin: 1em auto 0 auto;
  display: flex;
  justify-content: center;
}
.meeting-icontext-wrapper__col {
  width: 110px;
  margin: 0 10px;
}
.col__icon {
  font-size: 3em;
  cursor: pointer;
  color: #b4d2ed;
  transition: color .2s linear;
}
.fake-radio {
  display: none;
}
.fake-radio:checked + .col__icon {
  color: inherit;
}
.fake-radio[disabled] + .col__icon {
  color: #edb4b4;
}
.col__text {
  margin-top: 1em;
  font-size: .8em;
}
.line-spin-fade-loader >>> * {
  background-color: #3E5A72;
}
.loading-icon-wrapper {
  width: 55px;
  height: 55px;
  margin: 30px auto 0 auto;
}
.row {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.button {
  width: 50px;
  height: 50px;
  border-radius: 27px;
  margin: 30px auto 0 auto;
  background-color: #3E5A72;
  border: 2px solid #3E5A72;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color .3s ease, opacity .5s ease,
  border-color .3s ease, opacity .5s ease;
}
.button:hover:not(.button[disabled]) {
  background: white;
}
.button[disabled] {
  cursor: not-allowed;
  border-color: #b4d2ed;
  background: #b4d2ed;
}
.button__icon {
  color: white;
  font-size: 1.5em;
  transition: color .3s ease;
}
.button:hover:not(.button[disabled]) > .button__icon {
  color: #3E5A72;
}
.button:not([disabled]):hover {
  background: white;
}
.button:not([disabled]):hover > .button__icon {
  color: #3E5A72;
}
.button:focus {
  outline: 0;
}
.v-enter-active, .v-leave-active {
  transition: opacity .3s;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
