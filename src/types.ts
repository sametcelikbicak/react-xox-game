export type SquareType = "X" | "O" | null;

export interface SquareProps {
  value: SquareType;
  onClick(): void;
}

export interface BoardProps {
  squares: SquareType[];
  onClick(i: number): void;
}
