import { useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { api, type QueriesSetter } from "../utils/api";

export const useSocketConnection = () => {
  const apiUtils = api.useContext();
  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (!socketRef.current) {
      const socket = io();
      socketRef.current = socket;
      socket.on("setQueries", (queriesSetter: QueriesSetter) => {
        Object.entries(queriesSetter).forEach(
          ([routeKey, proceduresSetter]) => {
            Object.entries(proceduresSetter).forEach(
              ([procedureKey, { input, data }]) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                apiUtils[routeKey][procedureKey].setData(input, data);
              }
            );
          }
        );
      });
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = undefined;
      }
    };
  }, [apiUtils]);
};
