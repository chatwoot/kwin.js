import EventEmitter from 'events';

export type KwinEventTypes = {
  error: (error: any) => void;
  stop: (any) => void;
};

class KwinEventEmitter<KwinEvents extends Record<string, any>> {
  private emitter = new EventEmitter();

  emit<E extends keyof KwinEvents & string>(
    eventName: E,
    ...args: Parameters<KwinEvents[E]>
  ) {
    this.emitter.emit(eventName, ...args);
  }

  on<E extends keyof KwinEvents & string>(eventName: E, listener: KwinEvents[E]) {
    this.emitter.on(eventName, listener);
  }

  off<E extends keyof KwinEvents & string>(eventName: E, listener: KwinEvents[E]) {
    this.emitter.off(eventName, listener);
  }
}

export default KwinEventEmitter;
