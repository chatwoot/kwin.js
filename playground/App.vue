<script setup lang="ts">
import { ref } from 'vue';
import Kwin from '../lib';

const kwin = new Kwin({
  connectorType: 'newrelic',
  connectorOptions: JSON.parse(import.meta.env.VITE_NEWRELIC_KEY),
});

const isClicked = ref(false);

const currentEvent = ref();

const measure = ref('');

const onClick = () => {
  if (!isClicked.value) {
    currentEvent.value = kwin.start('feature:create-contact');
    measure.value = '';
    setInterval(() => {
      currentEvent.value.mark(`mark-${new Date().getTime()}`);
    }, 100);
  } else {
    currentEvent.value.stop();
    measure.value = currentEvent.value.event.duration + 'ms';
  }
  isClicked.value = !isClicked.value;
};
</script>

<template>
  <button @click="onClick">{{ !isClicked ? 'Start Measure' : 'Stop Measure' }}</button>

  <div v-if="measure">Measure time = {{ measure }}</div>
  <div v-if="isClicked">Measuring...</div>
</template>
