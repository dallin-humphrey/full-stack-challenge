import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Planet = {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
};

type Props = {
    title: string;
};

const StarTrekApiPlanet: React.FC<Props> = ({ title }) => {
    const [planets, setPlanets] = useState<Planet[]>([]);
    const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
    const [planetSearchQuery, setPlanetSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const planetsResponse = await axios.get('http://localhost:4000/api/planets');
            setPlanets(planetsResponse.data);
        };
        fetchData();
    }, []);

    const handlePlanetClick = (planet: Planet) => {
        setSelectedPlanet(planet);
    };

    const filteredPlanets = planets.filter(planet => planet.name.toLowerCase().includes(planetSearchQuery.toLowerCase()));

    return (
        <div className="grid grid-cols-2 w-4/5 bg-slate-200 gap-6 text-slate-700 text-2xl border border-slate-700 rounded-lg  mx-auto h-80 mb-10">
            <div className="p-4">
                <h2 className="text-2xl text-sky-400 font-extrabold mb-2">{title}</h2>
                <input
                    type="text"
                    placeholder="Search for a planet"
                    value={planetSearchQuery}
                    onChange={e => setPlanetSearchQuery(e.target.value)}
                    className="mb-2 border border-slate-700 rounded-lg pl-2 w-full bg-slate-50"
                />
                <div className='border border-slate-700 rounded-lg overflow-hidden bg-slate-50'>
                    <ul className="max-h-52 overflow-y-scroll p-2">
                        {filteredPlanets.map((planet) => (
                            <li key={planet.name} onClick={() => handlePlanetClick(planet)} style={{ cursor: 'pointer' }}>
                                {planet.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="p-4">
                {selectedPlanet && (
                    <>
                        <h2 className="text-2xl text-sky-400 font-extrabold mb-4 ml-14">Planet Details</h2>
                        <div className="flex border border-slate-700 rounded-lg w-3/4 mx-auto h-60 bg-slate-50 p-2">
                            <div className="flex flex-col text-base text-left w-1/2 pt-2">
                                <p>Name:</p>
                                <p>Rotation Period:</p>
                                <p>Orbital Period:</p>
                                <p>Diameter:</p>
                                <p>Climate:</p>
                                <p>Gravity:</p>
                            </div>
                            <div className="flex flex-col text-base text-left pt-2">
                                <p>{selectedPlanet.name}</p>
                                <p>{selectedPlanet.rotation_period}</p>
                                <p>{selectedPlanet.orbital_period}</p>
                                <p>{selectedPlanet.diameter}</p>
                                <p className="capitalize">{selectedPlanet.climate}</p>
                                <p>{selectedPlanet.gravity}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default StarTrekApiPlanet;
