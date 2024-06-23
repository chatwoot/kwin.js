import { MicroAgent } from '@newrelic/browser-agent/loaders/micro-agent';
import { PageAction } from '@newrelic/browser-agent/features/page_action';

class NewrelicConnector {
  private agent: MicroAgent;

  constructor(newrelicOptions) {
    this.agent = new MicroAgent({
      ...newrelicOptions,
      features: [PageAction],
    });
  }

  sendEvent(event) {
    const { featureName: actionName, ...eventAttributes } = event;
    this.agent.addPageAction(`feature:${actionName}`, eventAttributes);
  }
}

export default NewrelicConnector;
