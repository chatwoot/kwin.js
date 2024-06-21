import MeasurementManager from './MeasurementManager'

class Kwin {
  start(featureName) {
    const measurementManager = new MeasurementManager(featureName)
    measurementManager.start()
    return measurementManager
  }
}

export default Kwin
