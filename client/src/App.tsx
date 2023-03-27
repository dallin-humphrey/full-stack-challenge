import { useState } from 'react';
import starWars from '../public/starWars.jpg';

import StarTrekApiPeople from './components/starTrekApiPeople';
import StarTrekApiPlanet from './components/starTrekApiPlanet';

const App: React.FC = () => {
  const [containerStyle, setContainerStyle] = useState<{ [key: string]: string }>({
    backgroundImage: `url(${starWars})`,
    opacity: '0.8',
  });

  return (
    <div className="min-h-screen" style={containerStyle}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-16">
          <StarTrekApiPeople title="Star Trek People" />
          <StarTrekApiPlanet title="Star Wars Planets" />
        </div>
      </div>
    </div>
  );
};

export default App;
