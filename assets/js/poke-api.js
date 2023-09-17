
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.num_order = pokeDetail.order
    pokemon.name = pokeDetail.name
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

    const [type] = pokemon.types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertCompletePokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new ComletePokemon()
    pokemon.num_order = pokeDetail.order
    pokemon.name = pokeDetail.name
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

    const [type] = pokemon.types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.stats = pokeDetail.stats.map((statSlot) => [statSlot.base_stat, statSlot.stat.name])

    return pokemon
}

pokeApi.getCompletePokemonDetails = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}/`
    return fetch(url)
        .then((response) => response.json())
        .then(convertCompletePokeApiDetailToPokemon)
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokeApi.getPokemonDetails)))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
