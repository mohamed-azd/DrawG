import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import WaitingRoom from './pages/WaitingRoom'
import { io } from "socket.io-client";
import { GameView } from './pages/GameView';

export const socket = io('http://localhost:3000')

socket.on('connection', (socketObj) => {
    console.log(socketObj.id)
})

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/room/:id", element: <WaitingRoom /> },
    { path: "/room/:id/game", element: <GameView /> },
  ])

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
