import { Routes, Route } from 'react-router-dom'
import ExecutiveWisdom from './pages/executive-wisdom'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/executive-wisdom" element={<ExecutiveWisdom />} />
        <Route path="/" element={<ExecutiveWisdom />} />
      </Routes>
    </div>
  )
}

export default App