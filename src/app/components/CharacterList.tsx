"use client";

import { useState, memo, useCallback, useMemo } from "react";
import * as Switch from "@radix-ui/react-switch";
import "./styles.css";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
}

interface CharacterListProps {
  data: Character[];
}

const CharacterCard = memo(function CharacterCard({ 
  character, 
  isSelected, 
  onSelect 
}: { 
  character: Character; 
  isSelected: boolean; 
  onSelect: (id: number) => void;
}) {
  const statusColor = useMemo(() => {
    switch (character.status) {
      case "Alive":
        return "bg-green-500";
      case "Dead":
        return "bg-red-500";
      case "unknown":
        return "bg-gray-500";
      default:
        return "bg-gray-400";
    }
  }, [character.status]);

  const statusIcon = useMemo(() => {
    switch (character.status) {
      case "Alive":
        return "🟢";
      case "Dead":
        return "💀";
      case "unknown":
        return "❓";
      default:
        return "❓";
    }
  }, [character.status]);

  return (
    <div 
      className={`
        relative group cursor-pointer transform transition-all duration-300 hover:scale-105
        bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl
        border border-white/20 hover:border-white/40
        ${isSelected ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}
      `}
      onClick={() => onSelect(character.id)}
    >
      {/* Status badge */}
      <div className="relative right-4 flex items-center space-x-2">
        <span className="text-2xl">{statusIcon}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${statusColor}`}>
          {character.status}
        </span>
      </div>

      {/* Character Image */}
      <div className="relative mb-6">
        <div className="w-full h-56 rounded-xl overflow-hidden shadow-lg">
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
      </div>

      {/* Character name */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
          {character.name}
        </h2>
        
        {/* Animated border */}
        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300 mx-auto"></div>
      </div>

      {/* Hover effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    </div>
  );
});

const CharacterList = memo(function CharacterList({ data }: CharacterListProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);

  const handleCharacterSelect = useCallback((id: number) => {
    setSelectedCharacter(id);
  }, []);

  const characterCards = useMemo(() => {
    return data.map((character) => (
      <CharacterCard
        key={character.id}
        character={character}
        isSelected={selectedCharacter === character.id}
        onSelect={handleCharacterSelect}
      />
    ));
  }, [data, selectedCharacter, handleCharacterSelect]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {characterCards}
        </div>
      </div>
    </div>
  );
});

export default CharacterList; 