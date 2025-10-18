import { describe, it, expect, beforeEach } from 'vitest'
import TimeHelper from '../../../utils/time_helper.js'
import dayjs from 'dayjs'

describe('TimeHelper', () => {
  let timeHelper

  beforeEach(() => {
    timeHelper = new TimeHelper()
  })

  describe('getCurrentTime', () => {
    it('should return current time as dayjs object', () => {
      const result = timeHelper.getCurrentTime()

      expect(result).toBeDefined()
      expect(dayjs.isDayjs(result)).toBe(true)
    })

    it('should return a time close to now', () => {
      const before = dayjs()
      const result = timeHelper.getCurrentTime()
      const after = dayjs()

      expect(result.isAfter(before) || result.isSame(before)).toBe(true)
      expect(result.isBefore(after) || result.isSame(after)).toBe(true)
    })
  })

  describe('addSeconds', () => {
    it('should add seconds to a given time', () => {
      const baseTime = dayjs('2024-01-01T00:00:00.000Z')
      const result = timeHelper.addSeconds(baseTime, 30)

      expect(result.toISOString()).toBe('2024-01-01T00:00:30.000Z')
    })

    it('should handle adding zero seconds', () => {
      const baseTime = dayjs('2024-01-01T00:00:00.000Z')
      const result = timeHelper.addSeconds(baseTime, 0)

      expect(result.toISOString()).toBe(baseTime.toISOString())
    })

    it('should handle adding negative seconds', () => {
      const baseTime = dayjs('2024-01-01T00:01:00.000Z')
      const result = timeHelper.addSeconds(baseTime, -30)

      expect(result.toISOString()).toBe('2024-01-01T00:00:30.000Z')
    })

    it('should handle large number of seconds', () => {
      const baseTime = dayjs('2024-01-01T00:00:00.000Z')
      const result = timeHelper.addSeconds(baseTime, 3600) // 1 hour

      expect(result.toISOString()).toBe('2024-01-01T01:00:00.000Z')
    })

    it('should accept string time input', () => {
      const result = timeHelper.addSeconds('2024-01-01T00:00:00.000Z', 30)

      expect(result.toISOString()).toBe('2024-01-01T00:00:30.000Z')
    })
  })

  describe('minusSeconds', () => {
    it('should subtract seconds from a given time', () => {
      const baseTime = dayjs('2024-01-01T00:01:00.000Z')
      const result = timeHelper.minusSeconds(baseTime, 30)

      expect(result.toISOString()).toBe('2024-01-01T00:00:30.000Z')
    })

    it('should handle subtracting zero seconds', () => {
      const baseTime = dayjs('2024-01-01T00:00:00.000Z')
      const result = timeHelper.minusSeconds(baseTime, 0)

      expect(result.toISOString()).toBe(baseTime.toISOString())
    })

    it('should handle subtracting negative seconds (acts like addition)', () => {
      const baseTime = dayjs('2024-01-01T00:00:00.000Z')
      const result = timeHelper.minusSeconds(baseTime, -30)

      expect(result.toISOString()).toBe('2024-01-01T00:00:30.000Z')
    })

    it('should handle large number of seconds', () => {
      const baseTime = dayjs('2024-01-01T01:00:00.000Z')
      const result = timeHelper.minusSeconds(baseTime, 3600) // 1 hour

      expect(result.toISOString()).toBe('2024-01-01T00:00:00.000Z')
    })

    it('should accept string time input', () => {
      const result = timeHelper.minusSeconds('2024-01-01T00:01:00.000Z', 30)

      expect(result.toISOString()).toBe('2024-01-01T00:00:30.000Z')
    })
  })

  describe('getAsISOString', () => {
    it('should convert dayjs object to ISO string', () => {
      const time = dayjs('2024-01-01T12:30:45.000Z')
      const result = timeHelper.getAsISOString(time)

      expect(result).toBe('2024-01-01T12:30:45.000Z')
    })

    it('should convert string time to ISO string', () => {
      const result = timeHelper.getAsISOString('2024-01-01T12:30:45.000Z')

      expect(result).toBe('2024-01-01T12:30:45.000Z')
    })

    it('should handle different date formats', () => {
      const result = timeHelper.getAsISOString('2024-01-01')

      // Result should be a valid ISO string (timezone conversion may apply)
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)

      // Parse the result back to verify it's a valid date
      const parsed = dayjs(result)
      expect(parsed.isValid()).toBe(true)
    })

    it('should return a valid ISO 8601 string', () => {
      const time = dayjs()
      const result = timeHelper.getAsISOString(time)

      // ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    })
  })

  describe('differenceInSeconds', () => {
    it('should calculate positive difference in seconds', () => {
      const time1 = dayjs('2024-01-01T00:01:00.000Z')
      const time2 = dayjs('2024-01-01T00:00:00.000Z')
      const result = timeHelper.differenceInSeconds(time1, time2)

      expect(result).toBe(60)
    })

    it('should calculate negative difference in seconds', () => {
      const time1 = dayjs('2024-01-01T00:00:00.000Z')
      const time2 = dayjs('2024-01-01T00:01:00.000Z')
      const result = timeHelper.differenceInSeconds(time1, time2)

      expect(result).toBe(-60)
    })

    it('should return zero for same times', () => {
      const time1 = dayjs('2024-01-01T00:00:00.000Z')
      const time2 = dayjs('2024-01-01T00:00:00.000Z')
      const result = timeHelper.differenceInSeconds(time1, time2)

      expect(result).toBe(0)
    })

    it('should handle large time differences', () => {
      const time1 = dayjs('2024-01-02T00:00:00.000Z')
      const time2 = dayjs('2024-01-01T00:00:00.000Z')
      const result = timeHelper.differenceInSeconds(time1, time2)

      expect(result).toBe(86400) // 24 hours = 86400 seconds
    })

    it('should accept string time inputs', () => {
      const result = timeHelper.differenceInSeconds(
        '2024-01-01T00:01:00.000Z',
        '2024-01-01T00:00:00.000Z'
      )

      expect(result).toBe(60)
    })

    it('should handle mixed input types (dayjs and string)', () => {
      const time1 = dayjs('2024-01-01T00:01:00.000Z')
      const result = timeHelper.differenceInSeconds(time1, '2024-01-01T00:00:00.000Z')

      expect(result).toBe(60)
    })
  })

  describe('Integration tests', () => {
    it('should work with getCurrentTime and addSeconds together', () => {
      const currentTime = timeHelper.getCurrentTime()
      const futureTime = timeHelper.addSeconds(currentTime, 100)
      const diff = timeHelper.differenceInSeconds(futureTime, currentTime)

      expect(diff).toBe(100)
    })

    it('should work with getCurrentTime and minusSeconds together', () => {
      const currentTime = timeHelper.getCurrentTime()
      const pastTime = timeHelper.minusSeconds(currentTime, 100)
      const diff = timeHelper.differenceInSeconds(currentTime, pastTime)

      expect(diff).toBe(100)
    })

    it('should maintain consistency across operations', () => {
      const baseTime = dayjs('2024-01-01T00:00:00.000Z')
      const added = timeHelper.addSeconds(baseTime, 50)
      const subtracted = timeHelper.minusSeconds(added, 50)

      expect(subtracted.toISOString()).toBe(baseTime.toISOString())
    })

    it('should handle full workflow: get time, modify, convert to ISO', () => {
      const currentTime = timeHelper.getCurrentTime()
      const modifiedTime = timeHelper.addSeconds(currentTime, 30)
      const isoString = timeHelper.getAsISOString(modifiedTime)

      expect(isoString).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)

      const diff = timeHelper.differenceInSeconds(modifiedTime, currentTime)
      expect(diff).toBe(30)
    })
  })
})
