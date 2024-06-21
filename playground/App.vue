<script setup lang="ts">
import { ref } from 'vue'
import Kwin from '../lib'
const kwin = new Kwin()

const isClicked = ref(false)

const currentEvent = ref()

const measure = ref('')

const onClick = () => {
  if (!isClicked.value) {
    currentEvent.value = kwin.start('button-click')
    measure.value = ''
  } else {
    currentEvent.value.stop()
    measure.value = currentEvent.value.measure.duration + 'ms'
  }
  isClicked.value = !isClicked.value
}
</script>

<template>
  <button @click="onClick">{{ !isClicked ? 'Start Measure' : 'Stop Measure' }}</button>

  <div v-if="measure">Measure time = {{ measure }}</div>
  <div v-if="isClicked">Measuring...</div>
</template>
