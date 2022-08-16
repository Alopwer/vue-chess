<template>
  <div class="board_part">
    <div v-for="num in Array.from({length: BOARD_LENGTH}, (_, i) => i + 1)" :key="num">{{ num }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { BOARD_LENGTH } from '@/store/data';

export default defineComponent({
  name: 'BoardNumbers',
  setup () {
    return {
      BOARD_LENGTH
    }
  }
})
</script>