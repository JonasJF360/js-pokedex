(function () {
    const pokemonList = document.querySelector('ol#pokemons-list')
    let offset = 0
    let limit = 12
    const maxPokemons = 648

    function loadPokemonsItens() {
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            pokemonList.innerHTML = pokemons.map(pokemon =>
                `
                <li class="pokemon ${pokemon.type}">
                        <span class="number"> #${(pokemon.num_order).toString().padStart(3, '0')} </span>
                        <span class="name"> ${pokemon.name} </span>

                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}"> ${type} </li>`).join('')}
                            </ol>
                            <img src="${pokemon.photo}"
                                alt="${pokemon.name}">
                        </div>
                    </li>
                `).join('')
        }).catch((erro) => console.log(erro))
    }

    function loadAndPageUo() {
        window.scrollTo({ top: 0, behavior: "smooth" })
        loadPokemonsItens()
    }

    document.querySelector('button#restartButton').addEventListener('click', (e) => {
        offset = 0
        loadAndPageUo()
    })

    document.querySelector('button#nextButton').addEventListener('click', (e) => {
        offset += limit
        if (offset > maxPokemons - limit) offset = 0
        loadAndPageUo()
    })

    document.querySelector('button#backButton').addEventListener('click', (e) => {
        offset -= limit
        if (offset < 0) offset = maxPokemons - limit
        loadAndPageUo()
    })

    loadPokemonsItens()

})();
