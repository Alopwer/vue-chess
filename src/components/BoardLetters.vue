<template>
  <div class="flex board_part">
    <div v-for="letter in boardLetters" :key="letter">{{ letter }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { boardLetters } from '@/store/data';

export default defineComponent({
  name: 'BoardLetters',
  setup () {
    return {
      boardLetters
    }
  }
})
</script>