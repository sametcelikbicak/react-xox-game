import { useState } from "react";
import Board from "./board";
import { calculateWinner } from "./helper";
import { History } from "./types";

const Game: React.FC = () => {
    const initialHistory: History[] = [
        {
            squares: Array(9).fill(null)
        }
    ];

    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [history, setHistory] = useState<History[]>(initialHistory);
    const [showPlayerSelection, setShowPlayerSelection] = useState(true);

    const handleClick = (i: number): void => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";
        setHistory(newHistory.concat([
            {
                squares: squares
            }
        ]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
        setShowPlayerSelection(false);
    }

    const jumpTo = (step: number): void => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    let isStepLeft = true;
    const moves = history.map((step, move) => {
        isStepLeft = step.squares.some(square => square === null);
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (isStepLeft) {
        status = "Next player: " + (xIsNext ? "X" : "O");
    } else {
        status = "Nobody won :(";
    }

    return (
        <div className="game">
            {showPlayerSelection && <div className="players">
                <button onClick={() => {
                    setXIsNext(true);
                    setShowPlayerSelection(false);
                }}>Player X</button>
                <button onClick={() => {
                    setXIsNext(false);
                    setShowPlayerSelection(false);
                }}>Player O</button>
            </div>}
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                {(winner || !isStepLeft) && <button onClick={() => {
                    jumpTo(0);
                    setHistory(initialHistory);
                    setShowPlayerSelection(true);
                }}>Start new game</button>}
                <ol>{moves}</ol>
            </div>
        </div>
    );

}

export default Game;