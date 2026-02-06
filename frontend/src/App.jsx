import './App.css'
import UploadPage from './pages/Upload_page';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage.jsx'
import Gallery from './pages/galery/galery.jsx'

import VideoDetail from "./pages/VideoDetail"

function App() {
  return (
    
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/video/:videoId" element={<VideoDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/participate" element={<UploadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
