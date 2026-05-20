import { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xTurn, setXTurn] = useState<boolean>(true);

  const patterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkWinner = (currentBoard: (string | null)[]) => {
    for ( const pattern of patterns) {
      const [a, b, c] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const winner = checkWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "It's a Draw!" 
    : `Next Player: ${xTurn ? "X" : "O"}`;

  const handleClick = (index: number) => {
    // Stop if cell is filled or game is won
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";
    setBoard(newBoard);
    setXTurn(!xTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans">
      <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Tic Tac Toe
      </h1>

      <div className={`mb-6 text-xl font-medium ${winner ? 'text-green-400 animate-bounce' : 'text-slate-300'}`}>
        {status}
      </div>

      <div className="grid grid-cols-3 gap-3 bg-slate-800 p-4 rounded-xl shadow-2xl">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-20 h-20 sm:w-24 sm:h-24 text-4xl font-bold flex items-center justify-center rounded-lg transition-all duration-200 
              ${!cell && !winner ? 'hover:bg-slate-700 bg-slate-700/50' : 'bg-slate-700'} 
              ${cell === 'X' ? 'text-cyan-400' : 'text-rose-400'}`}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-10 px-8 py-2 bg-blue-600 hover:bg-blue-500 rounded-full font-semibold transition-colors shadow-lg"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;