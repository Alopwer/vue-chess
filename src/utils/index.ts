import { BOARD_LENGTH } from "@/store/data";
import { PieceData, PiecePosition } from "@/store/types";

export const filterPiecesByExistence = (pieceKey: string, pieces: PieceData) => {
  return (pieces[pieceKey] as PiecePosition).every((num: number) => num !== null)
}

export const getPiecesByColor = (pieces: PieceData, color: 'WHITE' | 'BLACK') => {
  return Object.keys(pieces)
    .filter(key => (pieces[key] as PiecePosition).every((num: number) => num !== null) && key.includes(color));
}

export const getRandomWhitePiece = (pieces: PieceData) => {
  const keys = getPiecesByColor(pieces, 'WHITE')
  return keys[keys.length * Math.random() << 0];
};

export const getRandomBlackPiece = (pieces: PieceData) => {
  const keys = getPiecesByColor(pieces, 'BLACK')
  return keys[keys.length * Math.random() << 0];
};

export const getKnightPosition = ([rowIdx, cellIdx]: PiecePosition) => {
  const newPositionList: PiecePosition[] = []
  const diffList = [
    { cellDiff: 1, rowDiff: -2 },
    { cellDiff: 2, rowDiff: -1 },
    { cellDiff: 1, rowDiff: 2 },
    { cellDiff: 2, rowDiff: 1 },
    { cellDiff: -1, rowDiff: 2 },
    { cellDiff: -2, rowDiff: 1 },
    { cellDiff: -2, rowDiff: -1 },
    { cellDiff: -1, rowDiff: -2 },
  ]
  diffList.forEach(({ cellDiff, rowDiff }) => {
    if (
      cellIdx + cellDiff < BOARD_LENGTH && 
      cellIdx + cellDiff >= 0 &&
      rowIdx + rowDiff < BOARD_LENGTH &&
      rowIdx + rowDiff >= 0
    ) {
      newPositionList.push([rowIdx + rowDiff, cellIdx + cellDiff])
    }
  })
  return newPositionList
}

const composeBishopPosition = (
  [rowIdx, cellIdx]: PiecePosition,
  blockerPositionList: Array<PiecePosition>,
  counter: 1 | -1
) => {
  let i = cellIdx + 1;
  let j = cellIdx - 1;
  const newPositionList: PiecePosition[] = []
  while (rowIdx + counter < BOARD_LENGTH && rowIdx + counter >= 0) {
    if (i < BOARD_LENGTH) {
      newPositionList.push([rowIdx + counter, i])
      blockerPositionList.some(position => position[0] === rowIdx + counter && position[1] === i)
        ? i = BOARD_LENGTH
        : i++
    }
    if (j >= 0) {
      newPositionList.push([rowIdx + counter, j])
      blockerPositionList.some(position => position[0] === rowIdx + counter && position[1] === j)
        ? j = -1
        : j--
    }
    counter > 0 ? counter++ : counter--
  }
  return newPositionList
}

export const getBishopPosition = (
  [rowIdx, cellIdx]: PiecePosition,
  blockerPositionList: Array<PiecePosition> 
) => {
  const newPositionList: PiecePosition[] = [
    ...composeBishopPosition([rowIdx, cellIdx], blockerPositionList, 1),
    ...composeBishopPosition([rowIdx, cellIdx], blockerPositionList, -1)
  ]
  return newPositionList
}

const composeQueenPosition = (
  [rowIdx, cellIdx]: [number, number],
  blockerPositionList: Array<PiecePosition>,
  reversed = false
) => {
  const newPositionList: Array<PiecePosition> = []
  let i = cellIdx + 1;
  let j = cellIdx - 1;
  while (i < BOARD_LENGTH && j >= 0) {
    const movePositions: Array<PiecePosition> = [
      reversed ? [i, cellIdx] : [rowIdx, i],
      reversed ? [j, cellIdx] : [rowIdx, j],
    ]
    newPositionList.push(...movePositions)
    blockerPositionList.some(position => position[0] === movePositions[0][0] && position[1] === movePositions[0][1])
      ? i = BOARD_LENGTH
      : i++
    blockerPositionList.some(position => position[0] === movePositions[1][0] && position[1] === movePositions[1][1])
      ? j = -1
      : j--
  }
  return newPositionList;
}

export const getQueenPosition = (
  [rowIdx, cellIdx]: PiecePosition,
  blockerPositionList: Array<PiecePosition>
) => {
  const newPositionList: Array<PiecePosition> = [
    ...getBishopPosition([rowIdx, cellIdx], blockerPositionList),
    ...composeQueenPosition([rowIdx, cellIdx], blockerPositionList),
    ...composeQueenPosition([rowIdx, cellIdx], blockerPositionList, true)
  ]
  return newPositionList
}

export const getRandomPosition = (positionList: Array<PiecePosition>) => {
  return positionList[Math.floor(Math.random() * positionList.length)]
}

export const getNewPosition = ({ 
  pieceName,
  piecePosition
}: {
  pieceName: string,
  piecePosition: Record<string, PiecePosition>
}) => {
  const currentPosition = piecePosition[pieceName]
  let positionList: Array<PiecePosition> = []
  const blockerPositionList: Array<PiecePosition> = Object.keys(piecePosition)
    .filter(piece => piece !== pieceName)
    .map(piece => piecePosition[piece])
  if (pieceName.includes('KNIGHT')) {
    positionList = getKnightPosition(currentPosition)
  }
  if (pieceName.includes('BISHOP')) {
    positionList = getBishopPosition(currentPosition, blockerPositionList)
  }
  if (pieceName.includes('QUEEN')) {
    positionList = getQueenPosition(currentPosition, blockerPositionList)
  }
  return getRandomPosition(positionList)
}

export default {
  getPiecesByColor
}