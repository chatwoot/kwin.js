import getUuid from './utils'

class MeasurementManager {
  private eventId: string
  private featureName: string
  private startMark: string
  private endMark: string
  private markIdentifier: string
  private performanceMeasure!: PerformanceMeasure

  constructor(featureName) {
    this.eventId = getUuid()
    this.featureName = featureName
    this.markIdentifier = `${this.featureName}-${this.eventId}`
    this.startMark = `${this.markIdentifier}-start`
    this.endMark = `${this.markIdentifier}-end`
  }

  public get measure() {
    if (!this.performanceMeasure) {
      return {}
    }
    return {
      featureName: this.featureName,
      duration: this.performanceMeasure.duration,
      startTime: this.performanceMeasure.startTime
    }
  }

  start() {
    performance.mark(this.startMark)
  }

  stop() {
    performance.mark(this.endMark)
    this.performMeasurement()
  }

  performMeasurement() {
    this.performanceMeasure = performance.measure(this.markIdentifier, this.startMark, this.endMark)
  }
}

export default MeasurementManager
