import { useState } from 'react'; // Import useState
import './style/global.css'
import './style/normalize.css'

import Sidebar from './components/layout/sidebar/Sidebar.tsx'
import MainContent from './components/sections/home/MainContent.tsx' // Assuming MainContent is for the Home page

// You will likely create other components for Projects, Services, and About Me later
function ProjectsContent() { return <h2>Projects Page</h2>; }
function ServicesContent() { return <h2>Services Page</h2>; }
function AboutMeContent() { return <h2>About Me Page</h2>; }


function App() {
  // Define state to keep track of the active page
  const [activePage, setActivePage] = useState('Home');

  // Function to render the correct content based on the active page
  const renderContent = () => {
    switch (activePage) {
      case 'Home':
        return <MainContent />;
      case 'Projects':
        return <ProjectsContent />;
      case 'Services':
        return <ServicesContent />;
      case 'About me':
        return <AboutMeContent />;
      default:
        return <MainContent />; // Default to Home
    }
  };

  return (
    <div className="container">
      {/* Pass activePage and setActivePage to Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {/* Render content based on the active page state */}
      {renderContent()}
    </div>
  )
}

export default App
