import dayjs from 'dayjs'

class TimeHelper {
  getCurrentTime() {
    return dayjs()
  }

  addSeconds(time, seconds) {
    return dayjs(time).add(seconds, 'seconds')
  }

  minusSeconds(time, seconds) {
    return dayjs(time).subtract(seconds, 'seconds')
  }

  getAsISOString(time) {
    return dayjs(time).toISOString()
  }

  differenceInSeconds(time1, time2) {
    return dayjs(time1).diff(time2, 'seconds')
  }
}

export default TimeHelper