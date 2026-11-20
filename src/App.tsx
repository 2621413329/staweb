import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import World from './pages/World'
import Record from './pages/Record'
import Growth from './pages/Growth'
import Companion from './pages/Companion'
import Membership from './pages/Membership'
import Download from './pages/Download'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/world" element={<World />} />
        <Route path="/record" element={<Record />} />
        <Route path="/growth" element={<Growth />} />
        <Route path="/companion" element={<Companion />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/download" element={<Download />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  )
}
