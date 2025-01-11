import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER } from "./Messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
  }
  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    if (this.board.moves.length % 2 === 0 && socket != this.player1) {
      return;
    }
    if (this.board.move.length % 2 === 1 && socket != this.player2) {
      return;
    }
    try {
      this.board.move(move);
    } catch (e) {
      return;
    }
    if (this.board.isGameOver()) {
      this.player1.emit(
        JSON.stringify({
          type: GAME_OVER,
        })
      );
      return;
    }
  }
}
