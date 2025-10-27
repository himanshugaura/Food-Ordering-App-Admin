import type { Orders } from "@/types/type";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  placeOrder: (payload: { data: Orders; message: string }) => void;
}

interface ClientToServerEvents {
  joinRoom: (room: string) => void;
}

const SOCKET_URL =  import.meta.env.VITE_BASE_URL as string;

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
});

export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};