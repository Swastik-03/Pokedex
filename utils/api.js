export async function fetchPokemonList(page) {
    const limit = 20
    const offset = (page - 1) * limit
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    const data = await response.json()
  
    const pokemonList = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailsResponse = await fetch(pokemon.url)
        const details = await detailsResponse.json()
        return {
          name: pokemon.name,
          url: pokemon.url,
          image: data?.sprites?.other?.['official-artwork']?.front_shiny,
          types: details.types.map((type) => type.type.name)
        }
      })
    )
  
    return { results: pokemonList, count: data.count }
  }
  
  export async function fetchPokemonDetails(name, url) {
    let data;
    if (url) {
      // If we have the URL, we've already fetched this Pokemon's data once
      const response = await fetch(url);
      data = await response.json();
    } else {
      // If we don't have the URL, fetch by name
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      data = await response.json();
    }
  
    return {
      name: data.name,
      image: data?.sprites?.other?.['official-artwork']?.front_shiny,
      types: data.types.map((type) => type.type.name),
      abilities: data.abilities.map((ability) => ability.ability.name),
      stats: data.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat
      }))
    };
  }
  
  export async function fetchPokemonTypes() {
    const response = await fetch('https://pokeapi.co/api/v2/type')
    const data = await response.json()
    return data.results.map((type) => type.name)
  }
  
