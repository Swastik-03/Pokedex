import { Shield, Zap, X, Heart, Sword, ShieldPlus, Swords } from 'lucide-react'

export default function PokemonModal({ pokemon, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-200 rounded-lg p-8 max-w-md w-full m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold capitalize text-center flex-1 text-pink-900">{pokemon.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="mx-auto mb-4 w-40 h-40 object-contain"
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg?height=200&width=200'
                    }}
                />
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold mb-2 text-amber-900">Types:</h3>
                        <div className="flex flex-wrap gap-2">
                            {pokemon.types.map(type => (
                                <span key={type} className="px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full capitalize">
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 text-amber-900">Abilities:</h3>
                        <ul className="list-disc list-inside">
                            {pokemon.abilities.map(ability => (
                                <li key={ability} className="capitalize">{ability}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="font-semibold mb-2 text-amber-900">Stats:</h3>
                    <ul className="space-y-2">
                        {pokemon.stats.map(stat => (
                            <li key={stat.name} className="flex items-center">
                                {stat.name === 'hp' && <Heart className="w-4 h-4 mr-2 text-red-500" />}
                                {stat.name === 'attack' && <Sword className="w-4 h-4 mr-2 text-black-500" />}
                                {stat.name === 'defense' && <Shield className="w-4 h-4 mr-2 text-orange-950" />}
                                {stat.name === 'special-attack' && <Swords className="w-4 h-4 mr-2 text-yellow-500" />}
                                {stat.name === 'special-defense' && <ShieldPlus className="w-4 h-4 mr-2 text-red-600" />}
                                {stat.name === 'speed' && <Zap className="w-4 h-4 mr-2 text-yellow-500" />}

                                <span className="capitalize mr-2">{stat.name}:</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 rounded-full h-2"
                                        style={{ width: `${(stat.value / 255) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="ml-2">{stat.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

