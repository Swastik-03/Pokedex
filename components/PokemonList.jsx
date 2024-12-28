'use client'

import { useState, useEffect } from 'react'
import PokemonCard from './PokemonCard'
import SearchBar from './SearchBar'
import TypeFilter from './TypeFilter'
import Pagination from './Pagination'
import { Loader } from 'lucide-react'

const ITEMS_PER_PAGE = 12;

export default function PokemonList() {
  const [allPokemon, setAllPokemon] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const [displayedPokemon, setDisplayedPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const loadAllPokemon = async () => {
      try {
        setLoading(true)
        console.log('Starting to fetch Pokemon data...')
        let allPokemonList = []
        let nextUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20'  // Increased limit for faster loading

        while (nextUrl) {
          console.log(`Fetching from URL: ${nextUrl}`)
          const response = await fetch(nextUrl)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          console.log(`Fetched ${data.results.length} Pokemon`)
          
          const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon) => {
              const detailsResponse = await fetch(pokemon.url)
              if (!detailsResponse.ok) {
                throw new Error(`HTTP error! status: ${detailsResponse.status} for Pokemon: ${pokemon.name}`)
              }
              const details = await detailsResponse.json()
              return {
                name: pokemon.name,
                url: pokemon.url,
                image: details?.sprites?.other?.['official-artwork']?.front_shiny,
                types: details.types.map((type) => type.type.name)
              }
            })
          )
          allPokemonList = [...allPokemonList, ...pokemonDetails]
          console.log(`Total Pokemon fetched: ${allPokemonList.length}`)
          nextUrl = data.next
          
          // Break after fetching 2000 Pokemon to avoid overloading
          if (allPokemonList.length >= 2000) {
            console.log('Reached 2000 Pokemon, stopping fetch')
            break
          }
        }

        setAllPokemon(allPokemonList)
        setFilteredPokemon(allPokemonList)  // Initialize filteredPokemon with all Pokemon
        setLoading(false)
        console.log('Finished fetching all Pokemon data')
      } catch (err) {
        console.error('Error fetching Pokemon:', err)
        setError(`Failed to fetch Pokemon list: ${err instanceof Error ? err.message : String(err)}`)
        setLoading(false)
      }
    }

    loadAllPokemon()
  }, [])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    console.log('Filtering Pokemon...')
    const filtered = allPokemon.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTypes.length === 0 || selectedTypes.every(type => pokemon.types.includes(type)))
    )
    setFilteredPokemon(filtered)
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE))
    setCurrentPage(1)
    console.log(`Filtered Pokemon count: ${filtered.length}`)
  }, [allPokemon, searchTerm, selectedTypes])

  useEffect(() => {
    console.log(`Updating displayed Pokemon for page ${currentPage}`)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    setDisplayedPokemon(filteredPokemon.slice(startIndex, endIndex))
    console.log(`Displaying Pokemon from index ${startIndex} to ${endIndex}`)
  }, [filteredPokemon, currentPage])

  const toggleFavorite = (pokemonName) => {
    const newFavorites = favorites.includes(pokemonName)
      ? favorites.filter(name => name !== pokemonName)
      : [...favorites, pokemonName]
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader className="w-12 h-12 animate-spin text-red-500" />
    </div>
  )
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div className="space-y-8">
      <div className="rounded-lg shadow-md p-6 space-y-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      </div>
      {displayedPokemon.length === 0 ? (
        <div className="text-center text-gray-600">No Pokemon found matching your criteria.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedPokemon.map(pokemon => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              isFavorite={favorites.includes(pokemon.name)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
