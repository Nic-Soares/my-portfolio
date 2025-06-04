import { useState } from 'react'; // Import useState
import './style/global.css'
import './style/normalize.css'

import Sidebar from './components/layout/sidebar/Sidebar.tsx'
import Home from './components/sections/home/Home.tsx' // Assuming MainContent is for the Home page

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
        return <Home/>;
      case 'Projects':
        return <ProjectsContent />;
      case 'Services':
        return <ServicesContent />;
      case 'About me':
        return <AboutMeContent />;
      default:
        return <Home/>; // Default to Home
    }
  };

  return (
    <div className="container">
      {/* Pass activePage and setActivePage to Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {/* Render content based on the active page state */}
      <div className='content'>
        {renderContent()}
      </div>
    </div>
  )
}

export default App
