import { type Server } from "socket.io";
import { type RoutesInvalidator } from "~/utils/api";

export const emitInvalidateQueries = (
  wss: Server,
  room: string,
  queries: RoutesInvalidator
) => {
  wss.to(room).emit("invalidateQueries", queries);
};
