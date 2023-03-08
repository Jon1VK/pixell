import { useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { type RoutesInvalidator, api } from "../utils/api";

export const useImageSocketConnection = (imageId: string) => {
  const apiUtils = api.useContext();
  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (!socketRef.current) {
      const socket = io({ query: { imageId: imageId } });
      socketRef.current = socket;
      socket.on("invalidateQueries", (routesInvalidator: RoutesInvalidator) => {
        Object.entries(routesInvalidator).forEach(
          ([routeKey, proceduresInvalidator]) => {
            Object.entries(proceduresInvalidator).forEach(
              ([procedureKey, input]) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                apiUtils[routeKey][procedureKey].invalidate(
                  input === "invalidateAll" ? undefined : input
                );
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
  }, [apiUtils, imageId]);
};
