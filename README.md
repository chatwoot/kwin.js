# kwin.js

A simple JS/TS library to measure frontend performance. The connectors with NewRelic and Datadog allow you to directly push the metrics to your APM and helps you to build alerts and monitor performance.

Unlike most of the frontend monitoring tools which would measure the lighthouse score, this library would help you to measure your feature performance in-detail.

You can measure the duration between specific events. For example, if you want to know how much time a user takes to perform an action, you could start measuring when the user clicks a button and stop when the response appears on the UI. This approach allows you to see the total duration, including time spent on rendering, API calls, and other processes.

The library uses the performance object which would give you the accuracy of to 5 µs (microseconds).

A simple implementation is given below.

```js
const kwin = new Kwin({ provider: 'newrelic', key: 'xxx-yyy' })

const measure = kwin.start('feature-1')

measure.stop()
```
