(function () {
    const pokemonList = document.querySelector('ol#pokemons-list')
    let offset = 0
    let limit = 12
    const maxPokemons = 648

    function showContainerCompletePokemon(pokemon) {
        const section = document.createElement('section')
        section.id = 'complete-pokemon'

        const container = document.createElement('div')
        container.classList.add('container')

        const divTop = document.createElement('div')
        divTop.classList.add('top')
        divTop.innerHTML = `
                <h1 > details </h1>
                <div id=fechar> x </div>`

        const divBotton = document.createElement('div')
        divBotton.classList.add('pokemon-data', pokemon.type)
        divBotton.innerHTML = `
                <div class="image">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>

                <div class="data">
                    <h2> ${pokemon.name} </h2>
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}"> ${type} </li>`).join('')}
                    </ol>
                    <span> height: ${(pokemon.height / 10)}m </span>
                    <span> weight: ${(pokemon.weight) / 10} kg </span>
                </div>
                
                <div class="stats">
                    <h2> Stats </h2>
                    <ul>
                        ${pokemon.stats.map((stat) => `<li> <span>${stat[1]}:</span> <span>${stat[0]}</span> </li>`).join('')}
                    </ul>
                </div>
            `

        container.appendChild(divTop)
        container.appendChild(divBotton)
        section.appendChild(container)
        // document.body.appendChild(section)
        document.body.insertBefore(section, document.body.firstChild);

        divTop.querySelector('#fechar')
            .addEventListener('click', (e) => {
                e.preventDefault()
                document.body.querySelector('#complete-pokemon').remove()
            })
    }

    function eventShowDetailsPokemon() {
        document.querySelectorAll('ol>li.pokemon').forEach((pokemon) => {
            pokemon.addEventListener('click', () => {
                const pokemonName = pokemon.querySelector('.name').innerText.trim().toLowerCase()
                pokeApi.getCompletePokemonDetails(pokemonName).then((pokemon) => {
                    showContainerCompletePokemon(pokemon)

                })
            })
        })
    }

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

            eventShowDetailsPokemon()
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
