"use client";
import { useEffect, useState } from "react";
import CharacterList from "./components/CharacterList";

export default function Home() {
  const [data, setItems] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setItems(data.results));
  }, []);

  return (
    <div className="min-h-screen">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">Rick and Morty Characters</h1>
        <p className="text-gray-600">Lista de personajes de la serie</p>
      </div>
      <CharacterList data={data} />
    </div>
  );
}
