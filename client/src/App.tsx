
import { useState } from 'react';
import './style/global.css';
import './style/normalize.css';

import Sidebar from '@/components/layout/sidebar/Sidebar';
import Home from '@/components/sections/home/Home';
import type { PageType } from '@shared/types/types';

// Placeholder components - será implementado futuramente
function ProjectsContent() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Projects Page</h2>
      <p>Em desenvolvimento...</p>
    </div>
  );
}

function ServicesContent() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Services Page</h2>
      <p>Em desenvolvimento...</p>
    </div>
  );
}

function AboutMeContent() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>About Me Page</h2>
      <p>Em desenvolvimento...</p>
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState<PageType>('Home');


  const renderContent = () => {
    switch (activePage) {
      case 'Home':
        return <Home />;
      case 'Projects':
        return <ProjectsContent />;
      case 'Services':
        return <ServicesContent />;
      case 'About me':
        return <AboutMeContent />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {renderContent()}
    </>
  );
}

export default App;
