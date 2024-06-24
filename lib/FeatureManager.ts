import KwinEventEmitter, { type KwinEventTypes } from './KwinEventEmitter';
import getUuid from './utils';

class FeatureManager extends KwinEventEmitter<KwinEventTypes> {
  private id: string;
  private featureName: string;
  private startMark: string;
  private endMark: string;
  private markIdentifier: string;
  private performanceMeasure!: PerformanceMeasure;
  private intermediateMarks: String[] = [];

  constructor(featureName) {
    super();
    this.id = getUuid();
    this.featureName = featureName;
    this.markIdentifier = `${this.featureName}-${this.id}`;
    this.startMark = `${this.markIdentifier}-start`;
    this.endMark = `${this.markIdentifier}-end`;
  }

  public get event() {
    const intermediateMarkEvents = this.intermediateMarks.reduce((acc, markName) => {
      const performanceMeasure = performance.measure(
        `${this.markIdentifier}-${markName}-measure`,
        this.startMark,
        `${this.markIdentifier}-${markName}`
      );
      return {
        ...acc,
        [`start:${markName}`]: performanceMeasure.duration
      };
    }, {});
    return {
      id: this.id,
      featureName: this.featureName,
      duration: this.performanceMeasure?.duration,
      startTime: this.performanceMeasure?.startTime,
      ...intermediateMarkEvents,
    };
  }

  start() {
    performance.mark(this.startMark);
  }

  mark(markName: String) {
    this.intermediateMarks.push(markName);
    performance.mark(`${this.markIdentifier}-${markName}`);
  }

  stop() {
    performance.mark(this.endMark);
    this.performMeasurement();
    this.emit('stop', this);
  }

  performMeasurement() {
    this.performanceMeasure = performance.measure(
      this.markIdentifier,
      this.startMark,
      this.endMark
    );
  }
}

export default FeatureManager;
