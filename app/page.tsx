import PokemonList from '@/components/PokemonList'

export default function Home() {
  return (
    <div>
    <h1 className="md:text-5xl text-3xl font-bold mb-8 text-center flex items-center justify-center">
      <img src="./pokeball.png" alt="pokeball" style={{ height: '4rem',marginRight:'15px' }} /> 
      <span className="text-red-500 mr-3">Pokedex</span>
      <span className="text-white"> Lite</span>
    </h1>
    <PokemonList />
  </div>
  
  )
}

