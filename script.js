const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-ET-WEB-PT-D';
// Use the APIURL variable for fetch requests
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const players = await fetch(API_URL)
        const formattedPlayers = await players.json()
        return(formattedPlayers)
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const result = await fetch(`${API_URL}/${playerId}`)
        const player = await result.json()
        return player.data.player
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
const newPlayer = await fetch(API_URL, {
    method: 'POST',
    body: json.stringify({
        id: playerId,
        name: name,
        breed: breed,
        status: status,
        imageUrl: imageUrl,
        createdAt: createdAt,
        updatedAt: updatedAt,
        teamId: teamId,
        cohortId: cohortId
    })
})
console.log(newPlayer)
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }

    const playerDetailsElement = document.createElement('div');
    playerDetailsElement.classList.add('player-details');
    playerDetailsElement.innerHTML = `
            <h2>${newPlayer.id}</h2>`

            playerContainer.appendChild(playerDetailsElement);
    
};

const removePlayer = async (playerId) => {
    try {
const remove = await fetch(`${API_URL}/${playerId}`, {
    method: 'DELETE'
})

    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the player ContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {
        const playerArray = playerList.map((puppy)=>{
           const puppyItem = document.createElement('ul');
           const puppyName = document.createElement('li');
           puppyName.innerHTML = puppy.name;

           const puppyImg = document.createElement('img');
           puppyImg.src = puppy.imageUrl;

           const playerButton = document.createElement('button')
           playerButton.innerHTML = 'viewplayer'
           playerButton.addEventListener('click', ()=>{renderSinglePlayer(puppy.id)})

           const removeButton = document.createElement('button')
           removeButton.innerHTML = 'removeplayer'
           removeButton.addEventListener('click', async ()=>{
            removePlayer(puppy.id)

            const players = await fetchAllPlayers();
    renderAllPlayers(players.data.players);

        })

           puppyItem.append(puppyName, puppyImg, playerButton, removeButton);
           playerContainer.append(puppyItem);
        })
        console.log(playerArray)
        // playerContainer.innerHTML = playerArray;
        
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};

const renderSinglePlayer = async (playerId) => {
    const singlePlayer = await fetchSinglePlayer(playerId);
    const playerItem = document.createElement('ul');
    const playerName = document.createElement('li');
    playerName.innerHTML = `name: ${singlePlayer.name}`;

    const puppyImg = document.createElement('img');
           puppyImg.src = singlePlayer.imageUrl;

    const playerBreed = document.createElement('li');
    playerBreed.innerHTML = `breed: ${singlePlayer.breed}`;
console.log(singlePlayer)
    // const playerButton = document.createElement('button')
    // playerButton.innerHTML = 'viewplayer'
    // playerButton.addEventListener('click', ()=>{renderSinglePlayer(puppy.id)})

    playerItem.append(playerName, playerBreed, puppyImg);
    playerContainer.prepend(playerItem);
}



/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
       
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players.data.players);

    renderNewPlayerForm();
}

init();