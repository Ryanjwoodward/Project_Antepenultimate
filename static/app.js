// This code will run once the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const createNewBracketButton = document.getElementById('create-new-bracket');
    const createBracketSection = document.getElementById('create-bracket');
    const initSelectionWindow = document.getElementById('initial-selection-window');

    createNewBracketButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the form from submitting

        initSelectionWindow.style.display = 'none';
        createBracketSection.style.display = 'block'; // Show the create-bracket section
    });
});

function createPlayerCharacterForm(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect data from the create-game-form
    const numEntrants = document.getElementById('total-entrants').value;
    const numPlayers = document.getElementById('num-players').value;
    const numCharacters = 1;
    //const numCharacters = document.getElementById('num-characters').value;
    const ssbVersion = document.getElementById('ssb-version').value;

    const setupForm = document.getElementById('setup-characters-form');
    const createBracketDiv = document.getElementById('create-bracket');
    const setupCharsPlayers = document.getElementById('setup-characters-players');

    // Store this data for later use
    const tournamentConfig = {
        numEntrants: numEntrants,
        numPlayers: numPlayers,
        numCharacters: numCharacters,
        ssbVersion: ssbVersion,
        players: [] // We'll populate this in the next step
    };

    setupForm.innerHTML = ''; // Clear previous entries

    // Create player and character input fields dynamically
    for (let i = 0; i < numPlayers; i++) {
        const playerFieldContainer = document.createElement('div');
        playerFieldContainer.className = 'form-field-container';
        playerFieldContainer.innerHTML = `
            <label class="player-name-label" for="player-name-${i}">Player ${i + 1}:</label>
            <input class="form-field" type="text" id="player-name-${i}" name="playerName-${i}" placeholder="Enter player name" required>
        `;
        setupForm.appendChild(playerFieldContainer);

        // Create Text Fields for Characters
        const characters = [];
        for (let j = 0; j < numCharacters; j++) {
            const characterFieldContainer = document.createElement('div');
            characterFieldContainer.className = 'form-field-container';

            characterFieldContainer.innerHTML = `
                <label for="character-name-${i}-${j}">Character ${j + 1}:</label>
                <input class="form-field" type="text" id="character-name-${i}-${j}" name="character-${i}-${j}" placeholder="Enter character name" required>
            `;
            setupForm.appendChild(characterFieldContainer);
        }
    }

    const submitButtonContainer = document.createElement('div');
    submitButtonContainer.className = 'form-field-container';
    submitButtonContainer.innerHTML = `
        <input id="submit-setup-button" type="submit" value="Submit Setup">
    `;
    setupForm.appendChild(submitButtonContainer);

    // Hide the create bracket div
    createBracketDiv.style.display = 'none';
    // Display the next window
    setupCharsPlayers.style.display = 'block';

    // Add event listener to the submit button for the setup form
    setupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Collect data from player and character fields
        for (let i = 0; i < numPlayers; i++) {
            const playerName = document.getElementById(`player-name-${i}`).value;
            const player = {
                name: playerName,
                characters: []
            };

            for (let j = 0; j < numCharacters; j++) {
                const characterName = document.getElementById(`character-name-${i}-${j}`).value;
                player.characters.push(characterName);
            }

            tournamentConfig.players.push(player);
        }

        // Call the prepareTournamentConfig function with collected data
        prepareTournamentConfig(tournamentConfig);

        // Optionally hide the setup characters players div or transition to another step
        setupCharsPlayers.style.display = 'none';
    });
}

function prepareTournamentConfig(tournamentData) {
    
    // Extract the required data
    const numEntrants = tournamentData.numEntrants;
    const numPlayers = tournamentData.numPlayers;
    const numCharacters = tournamentData.numCharacters;

    // Create the playersData array
    const playersData = [];

    // Populate playersData with each player's name and their characters
    tournamentData.players.forEach(player => {
        const playerInfo = {
            name: player.name,         // Player's name
            characters: []             // Array to store player's characters
        };

        // Add each selected character to the player's characters array
        player.characters.forEach(character => {
            playerInfo.characters.push(character);
        });

        // Add the player object to playersData
        playersData.push(playerInfo);
    });

    // Log the tournament configuration for debugging purposes
    console.log("Tournament Configuration:", tournamentData);
    
    // Log the playersData array that contains player names and characters
    console.log("Players Data:", playersData);

    // Call setupTournament with the collected data (you might need to adjust this function as well)
    setupTournament(numEntrants, numPlayers, numCharacters, playersData);
}


