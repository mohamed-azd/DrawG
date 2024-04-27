import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import WaitingRoom from './pages/WaitingRoom'

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
