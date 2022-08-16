<template>
  <table>
    <thead>
      <th>Piece</th>
      <th>from</th>
      <th>to</th>
    </thead>
    <tbody>
      <tr v-for="(record, idx) in history" :key="record.piece + record.prev + record.to" @click="undoHistory(idx)">
        <td>{{ record.piece }}</td>
        <td>{{ gameBoard[record.from[0]][record.from[1]] }}</td>
        <td>{{ gameBoard[record.to[0]][record.to[1]] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { MutationTypes } from '@/store/mutation-types';
import { gameBoard } from '@/store';

export default defineComponent({
  name: 'HistoryTable',
  emits: ['onPauseHandler'],
  setup (_props, { emit }) {
    const { state, commit } = useStore()
    const history = computed(() => state.history)

    const undoHistory = (idx: number) => {
      emit('onPauseHandler')
      commit(MutationTypes.UNDO_HISTORY, { idx })
    }

    return {
      history,
      undoHistory,
      gameBoard
    }
  }
})
</script>