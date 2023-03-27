import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Person = {
    name: string;
    birth_year: string;
    height: string;
    mass: string;
    eye_color: string;
    hair_color: string;
    skin_color: string;
    gender: string;
};

type Props = {
    title: string;
};

const StarTrekApiPeople: React.FC<Props> = ({ title }) => {
    const [people, setPeople] = useState<Person[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [personSearchQuery, setPersonSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const peopleResponse = await axios.get('http://localhost:4000/api/people');
            setPeople(peopleResponse.data);
        };
        fetchData();
    }, []);

    const handlePersonClick = (person: Person) => {
        setSelectedPerson(person);
    };

    const filteredPeople = people.filter(person => person.name.toLowerCase().includes(personSearchQuery.toLowerCase()));

    return (
        <div className="grid grid-cols-2 w-4/5 bg-slate-200 gap-6 text-slate-700 text-2xl border border-slate-700 rounded-lg  mx-auto h-80 mb-10">
            <div className="p-4">
                <h2 className="text-2xl text-sky-400 font-extrabold mb-2">{title}</h2>
                <input
                    type="text"
                    placeholder="Search for a person"
                    value={personSearchQuery}
                    onChange={e => setPersonSearchQuery(e.target.value)}
                    className="mb-2 border border-slate-700 rounded-lg pl-2 w-full bg-slate-50"
                />
                <div className='border border-slate-700 rounded-lg overflow-hidden bg-slate-50'>
                    <ul className="max-h-52 overflow-y-scroll p-2">
                        {filteredPeople.map((person) => (
                            <li key={person.name} onClick={() => handlePersonClick(person)} style={{ cursor: 'pointer' }}>
                                {person.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="p-4">
                {selectedPerson && (
                    <>
                        <h2 className="text-2xl text-sky-400 font-extrabold text-left mb-2 ml-14">Person Details</h2>
                        <div className="flex border border-slate-700 rounded-lg w-3/4 mx-auto h-60 bg-slate-50 p-2">
                            <div className="flex flex-col text-base text-left mr-24 pt-2">
                                <p>Name:</p>
                                <p>Height:</p>
                                <p>Mass:</p>
                                <p>Hair Color:</p>
                                <p>Skin Color:</p>
                                <p>Eye Color:</p>
                                <p>Birth Year:</p>
                                <p>Gender:</p>
                            </div>
                            <div className="flex flex-col text-base text-left pt-2">
                                <p>{selectedPerson.name}</p>
                                <p>{selectedPerson.height}</p>
                                <p>{selectedPerson.mass}</p>
                                <p className="capitalize">{selectedPerson.hair_color}</p>
                                <p className="capitalize">{selectedPerson.skin_color}</p>
                                <p className="capitalize">{selectedPerson.eye_color}</p>
                                <p>{selectedPerson.birth_year}</p>
                                <p className="capitalize">{selectedPerson.gender}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default StarTrekApiPeople;
