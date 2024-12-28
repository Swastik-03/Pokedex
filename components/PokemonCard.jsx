'use client'

import { useState } from 'react'
import { fetchPokemonDetails } from '@/utils/api'
import PokemonModal from './PokemonModal'
import { Heart, Shield, Zap } from 'lucide-react'

export default function PokemonCard({ pokemon, isFavorite, toggleFavorite }) {
  const [showModal, setShowModal] = useState(false)
  const [pokemonDetails, setPokemonDetails] = useState(null)

  const handleCardClick = async () => {
    if (!pokemonDetails) {
      const details = await fetchPokemonDetails(pokemon.name, pokemon.url)
      setPokemonDetails(details)
    }
    setShowModal(true)
  }

  return (
    <>
      <div
        className="rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"  style={{background:'#f0f0f0'}}
        onClick={handleCardClick}
      >
        {console.log(pokemon)}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          width={200}
          height={200}
          className="mx-auto w-52 h-52 object-contain"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg?height=200&width=200'
          }}
        />
        <div className="flex justify-center mt-2 flex-wrap gap-2">
          {pokemon.types.map(type => (
            <span
              key={type}
              className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-semibold text-center mt-4 capitalize">{pokemon.name}</h2>

        <button
          className={`mt-4 w-full py-2 px-4 rounded-full flex items-center justify-center text-gray-700`}
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(pokemon.name)
          }}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : ''} mr-2`} />
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
      {showModal && pokemonDetails && (
        <PokemonModal pokemon={pokemonDetails} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}

