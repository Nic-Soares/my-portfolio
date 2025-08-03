
import { useState } from 'react';
import './style/global.css';
import './style/normalize.css';

import Sidebar from '@/components/layout/sidebar/Sidebar';
import Home from '@/components/sections/home/Home';
import type { PageType } from '@shared/types/types';

// Placeholder components - será implementado futuramente
import Projects from '@/components/sections/projects/Projects';



import UnderConstruction from '@/components/pages/under-construction/UnderConstruction';

function App() {
  const [activePage, setActivePage] = useState<PageType>('Home');


  const renderContent = () => {
    switch (activePage) {
      case 'Home':
        return <Home />;
      case 'Projects':
        return <Projects />;
      case 'Services':
      case 'About me':
        return <UnderConstruction />;
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
