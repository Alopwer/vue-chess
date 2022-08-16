<template>
  <div class="flex">
    <PiecesContainer color="WHITE" />
    <div>
      <BoardLetters />
      <div class="flex">
        <BoardNumbers />
        <div>
          <div v-for="(row, rowIdx) in gameBoard" :key="row[0]" class="row">
            <div v-for="(cell, cellIdx) in row" :key="cell" class="cell">
              {{ getPieceNaming([rowIdx, cellIdx]) }}
            </div>
          </div>
        </div>
        <BoardNumbers />
      </div>
      <BoardLetters />
    </div>
    <PiecesContainer color="BLACK" />
  </div>
  <button @click="onRestartGame">new simulation</button>
  <button @click="onStartHandler">start</button>
  <button @click="onPauseHandler">pause</button>
  <HistoryTable @onPauseHandler="onPauseHandler" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import { MutationTypes } from '@/store/mutation-types';
import { boardLetters } from '@/store/data';
import BoardLetters from '@/components/BoardLetters.vue';
import BoardNumbers from '@/components/BoardNumbers.vue';
import PiecesContainer from '@/components/PiecesContainer.vue';
import HistoryTable from '@/components/HistoryTable.vue';
import { gameBoard } from '@/store';

export default defineComponent({
  name: 'App',
  components: {
    BoardLetters,
    BoardNumbers,
    PiecesContainer,
    HistoryTable
  },
  setup () {
    const { commit, getters } = useStore()

    onBeforeMount(() => {
      commit(MutationTypes.SETUP_PIECES_ON_BOARD)
    })

    const interval = ref<number>()

    const onStartHandler = () => {
      if (!interval.value) {
        interval.value = setInterval(() => {
          commit(MutationTypes.START_GAME)
        }, 200)
      }
    }

    const onPauseHandler = () => {
      if(interval.value) {
        clearInterval(interval.value)
        interval.value = 0
      }
    }

    const onRestartGame = () => {
      onPauseHandler()
      commit(MutationTypes.RESTART_GAME)
      commit(MutationTypes.SETUP_PIECES_ON_BOARD)
    }

    return {
      gameBoard,
      history,
      boardLetters,
      getPieceNaming: getters.getPieceByCellPosition,
      onStartHandler,
      onPauseHandler,
      onRestartGame
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cell {
  padding: 10px;
  border: 1px solid black;
  width: 25px;
  height: 25px;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.board_part {
  div {
    height: 25px;
    width: 25px;
    padding: 10px;
  }
}
</style>
