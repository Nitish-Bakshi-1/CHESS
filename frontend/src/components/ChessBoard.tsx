import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

const ChessBoard = ({
  board,
  socket,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);

  return (
    <div className="text-white-200">
      {board.map((row, i) => {
        return (
          <div className="flex" key={i}>
            {row.map((square, j) => {
              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(square?.square ?? null);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            from,
                            to: square?.square,
                          },
                        })
                      );
                      setFrom(null);
                      console.log({
                        from,
                        to,
                      });
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 ${
                    (i + j) % 2 === 0 ? "bg-[#729452]" : "bg-[#EBECD0]"
                  }`}
                >
                  <div className="w-full h-full flex justify-center">
                    <div className="h-full justify-center flex flex-col ">
                      {square ? square.type : ""}
                    </div>
                  </div>
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
