<template>
  <div class="pieces-container">
    <div v-for="piece in getUserPieces(color)" :key="piece">
      {{ piece }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/runtime-core";
import utils from '@/utils';
import { useStore } from "vuex";

export default defineComponent({
  name: 'PiecesContainer',
  props: {
    color: String
  },
  setup (props) {
    const { state } = useStore()
    const piecePosition = computed(() => state.piecePosition)

    const getUserPieces = (color: 'WHITE' | 'BLACK') => {
      return utils.getPiecesByColor(piecePosition.value, color)
    }

    return {
      getUserPieces,
      ...props
    }
  }
})
</script>

<style lang="scss">
.pieces-container {
  text-align: left;
}
</style>