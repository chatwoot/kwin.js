import EventManager from './EventManager';
import FeatureManager from './FeatureManager';

class Kwin {
  eventManager: EventManager;

  constructor({ connectorType, connectorOptions }) {
    this.eventManager = new EventManager(connectorType, connectorOptions);
  }

  start = (featureName) => {
    const featureManager = new FeatureManager(featureName);
    featureManager.start();
    featureManager.on('stop', this.stop);
    return featureManager;
  };

  private stop = (featureManager: FeatureManager) => {
    this.eventManager.sendEvent(featureManager.event);
  };
}

export default Kwin;
