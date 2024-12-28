import { useState, useEffect } from 'react'
import { fetchPokemonTypes } from '@/utils/api'

export default function TypeFilter({ selectedTypes, setSelectedTypes }) {
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

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2"><span className='text-white'>Filter by</span> <span className='text-red-500'>Type:</span></h3>
      <div className="flex flex-wrap gap-2">
        {types.map(type => (
          <button
            key={type}
            onClick={() => handleTypeToggle(type)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedTypes.includes(type)
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

