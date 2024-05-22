import Server from "./server.js";
import dotenv from 'dotenv';
//configuramos  dot.env
dotenv.config();
const server = new Server();

server.listen();