import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import WaitingRoom from "./pages/WaitingRoom";
import { io } from "socket.io-client";
import { WordChoice } from "./pages/WordChoice";
import { GameView } from "./pages/GameView";
import { createContext } from "react";
import GameResultsView from "./pages/GameResultsView";

export const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  upgrade: false,
});

export const SocketContext = createContext(socket);

socket.on("connection", (socketObj) => {
  console.log(socketObj.id);
});

const theme = extendTheme({
  colors: {
    primary: "#295784",
    secondary: "#fcfffe",
    third: "#78C0E0",
  },
});

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/room/:id", element: <WaitingRoom /> },
    { path: "/room/:id/wordChoice", element: <WordChoice /> },
    { path: "/room/:id/game", element: <GameView /> },
    { path: "/room/:id/results", element: <GameResultsView /> },
  ]);

  return (
    <ChakraProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <RouterProvider router={router}></RouterProvider>
      </SocketContext.Provider>
    </ChakraProvider>
  );
}

export default App;
