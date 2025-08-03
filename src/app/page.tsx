"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import CharacterList from "./components/CharacterList";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Función para buscar personajes
  const searchCharacters = useCallback(async (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      // Si no hay búsqueda, cargar todos los personajes
      try {
        setLoading(true);
        const res = await fetch("https://rickandmortyapi.com/api/character");
        const data = await res.json();
        setCharacters(data.results);
      } catch (error) {
        console.error("Error loading characters:", error);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Buscar personajes específicos
    try {
      setLoading(true);
      const res = await fetch(`https://rickandmortyapi.com/api/character?name=${searchTerm}`);
      if (!res.ok) {
        setCharacters([]);
        return;
      }
      const data = await res.json();
      setCharacters(data.results);
    } catch (error) {
      console.error("Error searching characters:", error);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar personajes iniciales solo una vez
  useEffect(() => {
    searchCharacters("");
  }, []); 

  // Debounce para la búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchCharacters(search);
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [search]); 

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white">Cargando personajes...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Rick & Morty Universe
          </h1>
          <p className="text-xl text-gray-300 mb-6">Explora los personajes de la serie</p>
          
          {/* Barra de búsqueda */}
          <div className="relative max-w-md mx-auto">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar personaje..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        
        <CharacterList data={characters} />
      </div>
    </div>
  );
}
