import { Color, PieceSymbol, Square } from "chess.js";

const ChessBoard = ({
  board,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
}) => {
  return (
    <div className="text-white-200">
      {board.map((row, i) => {
        return (
          <div className="flex" key={i}>
            {row.map((square, j) => {
              return (
                <div
                  key={j}
                  className={`w-8 h-8 ${
                    square ? "bg-green-500" : "bg-green-300"
                  }`}
                >
                  {square ? square.type : ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
