# kwin.js

A simple JS/TS library to measure frontend performance. The connectors with NewRelic and Datadog allow you to directly push the metrics to your APM and helps you to build alerts and monitor performance.

Unlike most of the frontend monitoring tools which would measure the lighthouse score, this library would help you to measure your feature performance in-detail.

You can measure the duration between specific events. For example, if you want to know how much time a user takes to perform an action, you could start measuring when the user clicks a button and stop when the response appears on the UI. This approach allows you to see the total duration, including time spent on rendering, API calls, and other processes.

The library uses the performance object which would give you the accuracy of 5 µs (microseconds).

### Installation & Usage

```
pnpm add kwin.js
```

A simple implementation is given below.

```js
import Kwin from 'kwin.js'

const kwin = new Kwin({
  connectorType: 'newrelic',
  connectorOptions: {
    init: {},
    loader_config: {},
    info: {},
  },
});

const measure = kwin.start('feature-1');

measure.stop();
```


### Add custom measures within the same event

If you want to add custom measures within the same event so as to understand the entire event in detail, you can use the mark function.

```js
const measure = kwin.start('feature-1');

measure.mark('validation-complete')
measure.mark('api-call-start')
measure.mark('api-call-end')

measure.stop();
``

The above code would produce an event with following attributes.

```json
{
  "timestamp": 1719258904052,
  "duration": 3437,
  "startTime": 316644,
  "start:validation-complete": 102,
  "start:api-call-start": 402,
  "start:api-call-end": 502,
  "actionName": "feature:create-contact"
}
```
