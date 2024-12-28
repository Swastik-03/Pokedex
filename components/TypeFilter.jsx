import { useState, useEffect } from 'react'
import { fetchPokemonTypes } from '@/utils/api'
import { Heart } from 'lucide-react'


export default function TypeFilter({ selectedTypes, setSelectedTypes, showFavorites, setShowFavorites }) {
  const [types, setTypes] = useState([])

  useEffect(() => {
    const loadTypes = async () => {
      const fetchedTypes = await fetchPokemonTypes()
      setTypes(fetchedTypes)
    }
    loadTypes()
  }, [])

  const handleTypeToggle = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const handleFavoritesToggle = () => {
    setShowFavorites(prevState => !prevState);
  };


  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-2">
          <span className="text-white">Filter by</span> <span className="text-red-500">Type:</span>
        </h3>
        {/* <button onClick={handleFavoritesToggle}>
          <h3 className="text-lg font-semibold mb-2 flex items-center group mr-7">
            <Heart className="w-5 h-5 mr-2 text-red-500 group-hover:fill-red-500" />
            <span className="text-white group-hover:text-red-500">Favorites</span>
          </h3>
        </button> */}

<button onClick={handleFavoritesToggle}>
  <h3 className="text-lg font-semibold mb-2 flex items-center group mr-7">
    <Heart
      className={`w-5 h-5 mr-2 
        ${showFavorites ? 'fill-red-500 group-hover:text-white group-hover:fill-none' : 'text-white group-hover:fill-red-500 group-hover:text-red-500'}
      `}
    />
    <span
      className={`
        ${showFavorites ? 'text-red-500 group-hover:text-white group-hover:fill-none' : 'text-white group-hover:text-red-500'}
      `}
    >
      Favorites
    </span>
  </h3>
</button>


      </div>



      <div className="flex flex-wrap gap-2">
        {types.map(type => (
          <button
            key={type}
            onClick={() => handleTypeToggle(type)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedTypes.includes(type)
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}

