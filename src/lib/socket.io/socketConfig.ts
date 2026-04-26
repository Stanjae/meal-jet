import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2000, // wait 2s before retrying
  reconnectionDelayMax: 10000, // max 10s between retries
  timeout: 20000, // wait 20s before giving up
});
export default socket;
