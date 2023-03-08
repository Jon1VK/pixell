import { type Server } from "socket.io";
import { type QueriesSetter } from "~/utils/api";

export const emitSetQueries = (wss: Server, queries: QueriesSetter) => {
  wss.emit("setQueries", queries);
};
