import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Terms from "./pages/Terms"
import Disclaimer from "./pages/Disclaimer"
import Guides from "./pages/Guides"
import Tools from "./pages/Tools"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/guides" element={<Guides />} />
      </Routes>
    </Router>
  )
}

export default App