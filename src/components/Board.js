import Square from "./Square";

export default function Board({next, squares, onPlay}) {
    const board = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];
    const player = {
        true: "X",
        false: "O"
    };

    function calculatesWinner(squares){
        const lines = [
        [0, 1, 2], // First line
        [3, 4, 5], // Second line
        [6, 7, 8], // Third line
        [0, 3, 6], // First column
        [1, 4, 7], // Second column
        [2, 5, 8], // Third column
        [0, 4, 8], // Main diagonol
        [2, 4, 6]  // Secondary diagonol
        ];

        for (let i=0; i<lines.length; i++){
        const [a, b, c] = lines[i];

        if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c]){
            return squares[a];
        }
        }

        return null;
    }

    function handleClick(i){
        if (winner || squares[i]){
        return;
        }

        const nextSquares = squares.slice();
        nextSquares[i] = player[next];
        onPlay(nextSquares);
    }

    const winner = calculatesWinner(squares);
    let status = winner? "Winner: " + winner : "Next Player: " + player[next];

    return (
        <>
        <div className="status">{status}</div>
        
        {
        board.map((row, rowIndex) => (
            <div className="board-row" key={rowIndex}>
            {row.map((square, columnIndex) => (
                <Square value={squares[square]} onSquareClick={() => handleClick(square)} key={columnIndex} />
            ))}
            </div>
        ))
        }
    </>
    );
}