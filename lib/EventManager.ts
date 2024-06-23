import NewrelicConnector from './connectors/newrelic';

type ConnectorType = 'newrelic' | 'datadog';

type Event = {
  id: string
  featureName: string
  startTime: Number
  duration: Number
}

class EventManager {
  connector: NewrelicConnector;

  constructor(connectorType: ConnectorType, connectorOptions: any) {
    if (connectorType === 'newrelic') {
      this.connector = new NewrelicConnector(connectorOptions);
    } else {
      throw new Error('Invalid connector type');
    }
  }

  sendEvent = (event: Event) => {
    console.log(this.connector);
    this.connector.sendEvent(event);
  };
}

export default EventManager;
