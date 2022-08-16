export enum PIECE_TYPE {
  W_KNIGHT = 'WHITE_KNIGHT',
  W_BISHOP = 'WHITE_BISHOP',
  W_QUEEN = 'WHITE_QUEEN',
  B_KNIGHT = 'BLACK_KNIGHT',
  B_BISHOP = 'BLACK_BISHOP',
  B_QUEEN = 'BLACK_QUEEN',
}

export type History = Array<{
  piece: string,
  from: PiecePosition,
  to: PiecePosition,
  capturedPiece: string | null,
  capturedPiecePosition: PiecePosition | [null, null]
}>

export type PiecePosition = [number, number]

export type PieceData = Record<string, PiecePosition | [null, null]>