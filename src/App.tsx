import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Download from './pages/Download'
import Terms from './pages/Terms'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </BrowserRouter>
  )
}
