import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ToastProvider } from './components/common/ToastProvider'
import './App.css'

function App() {
  return <BrowserRouter><ToastProvider><AppRoutes /></ToastProvider></BrowserRouter>
}

export default App
