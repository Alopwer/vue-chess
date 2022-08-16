import { filterPiecesByExistence, getNewPosition, getRandomBlackPiece, getRandomWhitePiece } from '@/utils'
import { createStore } from 'vuex'
import { boardLetters, BOARD_LENGTH, getDefaultState } from './data'
import { MutationTypes } from './mutation-types'
import { History, PiecePosition, PIECE_TYPE } from './types'

export const gameBoard: Array<Array<string>> = []
for (let i = 0; i < BOARD_LENGTH; i++) {
  const boardRow: Array<string> = []
  for (let j = 0; j < BOARD_LENGTH; j++) {
    boardRow[j] = boardLetters[j] + (i + 1)
  }
  gameBoard.push(boardRow)
}

export default createStore<{
  piecePosition: Record<string, PiecePosition | [null, null]>,
  history: History,
  currentHistory: History,
}>({
  state: getDefaultState(),
  getters: {
    getPieceByCellPosition: (state) => ([x, y]: PiecePosition) => {
      const piece = Object.keys(state.piecePosition).find(
        pieceKey => state.piecePosition[pieceKey][0] === x && state.piecePosition[pieceKey][1] === y
      )
      if (!piece) return '-'
      const pieceNameList = piece.split('_')
      return pieceNameList[0][0] + pieceNameList[1][0]
    },
  },
  mutations: {
    [MutationTypes.SETUP_PIECES_ON_BOARD] (state) {
      const pieceList = Array.from(Object.values(PIECE_TYPE))
      let counter = 0;
      while (counter !== 6) {
        const randomRowIdx = Math.floor(Math.random() * BOARD_LENGTH)
        const randomCellIdx = Math.floor(Math.random() * BOARD_LENGTH)
        if (
          !Object.values(state.piecePosition).find(
            position => position[0] === randomRowIdx && position[1] === randomCellIdx
          )
        ) {
          const pieceName = pieceList.pop() as PIECE_TYPE
          state.piecePosition[pieceName] = [randomRowIdx, randomCellIdx]
          counter++
        }
      }
    },
    [MutationTypes.START_GAME] (state) {
      state.history = [...state.history.slice(0, state.currentHistory.length)]
      const pieces = Object.keys(state.piecePosition)
        .filter(key => filterPiecesByExistence(key, state.piecePosition))
      if (
        pieces.length > 1 &&
        pieces.filter(piece => piece.includes('WHITE')).length !== 0 &&
        pieces.filter(piece => piece.includes('BLACK')).length !== 0
      ) {
        const pieceName = state.history.length % 2 === 0
          ? getRandomWhitePiece(state.piecePosition) 
          : getRandomBlackPiece(state.piecePosition)
        const newPosition = getNewPosition({
          pieceName,
          piecePosition: (state.piecePosition as Record<string, PiecePosition>)
        })
        const capturedPiece = Object.keys(state.piecePosition)
          .find(
            piece => state.piecePosition[piece][0] === newPosition[0] && state.piecePosition[piece][1] === newPosition[1]
          ) || null
        const historyStep = {
          piece: pieceName,
          from: (state.piecePosition[pieceName] as PiecePosition),
          to: newPosition,
          capturedPiece,
          capturedPiecePosition: capturedPiece 
            ? state.piecePosition[capturedPiece] 
            : [null, null] as [null, null]
        }
        state.history.push(historyStep)
        state.currentHistory.push(historyStep)
        state.piecePosition[pieceName] = newPosition
        if (capturedPiece) {
          state.piecePosition[capturedPiece] = [null, null]
        }
      }
    },
    [MutationTypes.UNDO_HISTORY] (state, payload) {
      const historyCopy = state.history
      const isNextStep = payload.idx > state.currentHistory.length - 1
      const startIdx = isNextStep 
        ? state.currentHistory.length 
        : state.currentHistory.length - 1
      for (
        let i = startIdx;
        isNextStep ? i <= payload.idx : i >= payload.idx;
        isNextStep ? i++ : i--
      ) {
        const stepState = historyCopy[i]
        const { to, from, piece, capturedPiece, capturedPiecePosition } = stepState
        state.piecePosition[piece] = isNextStep 
          ? to 
          : from
        isNextStep
          ? state.currentHistory.push(stepState)
          : state.currentHistory.pop()
        if (capturedPiece) {
          state.piecePosition[capturedPiece] = isNextStep
            ? [null, null]
            : capturedPiecePosition
        }
      }
    },
    [MutationTypes.RESTART_GAME] (state) {
      Object.assign(state, getDefaultState())
    }
  },
  actions: {
  },
  modules: {
  }
})
