"use client";

import { useState } from "react";
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

export default function CharacterList({ data }: CharacterListProps) {
  console.log(data);
  


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((character) => (
        <div key={character.id} className="border rounded-lg p-4 shadow-md flex justify-center items-center flex-col">
          <h2 className="text-xl font-bold mb-2">{character.name}</h2>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <label
              className="Label"
              htmlFor={`alive-${character.id}`}
              style={{ paddingRight: 15 }}
            >
              Alive
            </label>
            {character.status === "Alive" ? "✅" : "☠️"}
          </div>
          <img src={character.image} alt={character.name} className="w-32 h-32 object-cover rounded" />
        </div>
      ))}
    </div>
  );
} 