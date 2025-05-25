import './style/global.css'
import './style/normalize.css'

import Sidebar from './components/layout/sidebar/Sidebar.tsx'
import MainContent from './components/sections/home/MainContent.tsx'

function App() {
  return (
    <div className="container">
      <Sidebar />
      <MainContent />
    </div>
  )
}

export default App
