import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import WaitingRoom from './pages/WaitingRoom'
import { io } from "socket.io-client";

export const socket = io('http://localhost:3000')

socket.on('connection', (socketObj) => {
    console.log(socketObj.id)
})

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/room/:id", element: <WaitingRoom /> },
  ])

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
