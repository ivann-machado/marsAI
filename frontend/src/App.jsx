import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage.jsx'
import Gallery from './pages/galery/galery.jsx'

import VideoDetail from "./pages/VideoDetail";
import Footer from "./components/Footer/Footer";




function App() {
  return (
    
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/video/:videoId" element={<VideoDetail />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
