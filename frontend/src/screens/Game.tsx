import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import useSockets from "../hooks/useSockets";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

const Game = () => {
  const socket = useSockets();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          const newChess = new Chess();
          setChess(newChess);
          setBoard(newChess.board());
          break;

        case MOVE:
          const move = message.payload;
          if (chess.move(move)) {
            setBoard(chess.board());
            console.log("Move made");
          } else {
            console.error("Invalid move");
          }
          break;

        case GAME_OVER:
          console.log("Game over");
          break;

        default:
          console.warn("Unknown message type:", message.type);
      }
    };

    socket.onmessage = handleMessage;

    // Cleanup function to avoid memory leaks
    return () => {
      socket.onmessage = null;
    };
  }, [socket, chess]);

  if (!socket) {
    return <div>Connecting...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 w-full flex justify-center">
            <ChessBoard
              chess={chess}
              board={board}
              socket={socket}
              setBoard={setBoard}
            />
          </div>
          <div className="col-span-2 w-full h-full flex justify-center items-center">
            <Button
              onClick={() =>
                socket.send(
                  JSON.stringify({
                    type: INIT_GAME,
                  })
                )
              }
            >
              PLAY
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
