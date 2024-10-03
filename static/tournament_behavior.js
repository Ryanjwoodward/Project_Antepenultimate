// here I need to generate the bracket with random characters and then
class Match {
    constructor(player1Name, player1Character, player2Name, player2Character) {
        this.player1 = {
            name: player1Name,
            character: player1Character
        };
        this.player2 = {
            name: player2Name,
            character: player2Character
        };
    }

    // Optionally, add a method to display match details
    displayMatch() {
        console.log(`${this.player1.name} (Character: ${this.player1.character}) vs ${this.player2.name} (Character: ${this.player2.character})`);
    }
}

const tournamentArry = [];
var _numberOfEntrants;
var _numberOfPlayers;
var _numberOfCharacters;
var _playersData;

const smashBrosCharacters = [
    "Mario", "Donkey Kong", "Link", "Samus", "Dark Samus", "Yoshi", "Kirby", 
    "Fox", "Pikachu", "Luigi", "Ness", "Captain Falcon", "Jigglypuff", 
    "Peach", "Daisy", "Bowser", "Ice Climbers", "Sheik", "Zelda", 
    "Dr Mario", "Pichu", "Falco", "Marth", "Lucina", "Young Link", 
    "Gannondorf", "Mewtwo", "Roy", "Chrom", "Mr Game & Watch", 
    "Meta Knight", "Pit", "Dark Pit", "Zero Suit Samus", "Wario", 
    "Snake", "Ike", "Pokemon Trainer", "Diddy Kong", "Lucas", 
    "Sonic", "King Dedede", "Olimar", "Lucario", "R.O.B.", 
    "Toon Link", "Wolf", "Villager", "Mega Man", "Wii Fit Trainer", 
    "Rosalina", "Little Mac", "Greninja", "Mii Brawler", 
    "Mii Swordfighter", "Mii Gunner", "Palutena", "Pac-Man", 
    "Robin", "Shulk", "Bowser Jr", "Duck Hunt", "Ryu", 
    "Ken", "Cloud", "Corrin", "Bayonetta", "Inkling", 
    "Ridley", "Simon", "Richter", "King K Rool", "Isabelle", 
    "Incineroar", "Piranha Plant", "Joker", "Hero", "Banjo & Kazooie", 
    "Terry", "Byleth", "Min Min", "Steve", "Sephiroth", 
    "Pyra & Mythra", "Kazuya", "Sora"
];

function setupTournament(numEntrants, numPlayers, numCharacters, playersData) {
    _numberOfCharacters = numCharacters;
    _numberOfEntrants = numEntrants;
    _numberOfPlayers = numPlayers;
    _playersData = playersData;
    
    createBracket(numEntrants);
    addPlayersToTournament(playersData);
}


// Function to get a random character from the array
function getRandomCharacter() {
    const randomIndex = Math.floor(Math.random() * smashBrosCharacters.length);
    return smashBrosCharacters[randomIndex];
}

// Function to create the tournament bracket
function createBracket(numEntrants) {
    let playerCount = 1;

    // For each match, create a pair of players until the tournament is filled
    for (let i = 1; i < numEntrants; i++) {
        // Generate player names and assign random characters
        const player1Name = `Computer_${playerCount++}`;
        const player1Character = getRandomCharacter();

        const player2Name = `Computer_${playerCount++}`;
        const player2Character = getRandomCharacter();

        // Create a new Match instance and add it to the tournament array
        const match = new Match(player1Name, player1Character, player2Name, player2Character);
        tournamentArry.push(match);
    }

}

function addPlayersToTournament(playersData) {
    const bracketSection = document.getElementById("thirty-two-bracket");
    bracketSection.innerHTML = ''; // Clear any existing content
    
    // Update the tournament matches with player data
    for (let i = 0; i < playersData.length; i++) {
        // Each player goes into a specific match based on their index
        const matchIndex = 2 * i; // Player 1 goes to match 0, Player 2 to match 2, etc.
        
        // Check if matchIndex is within bounds of tournamentArry
        if (matchIndex < tournamentArry.length) {
            tournamentArry[matchIndex].player1.name = playersData[i].name;
            tournamentArry[matchIndex].player1.character = playersData[i].characters[0]; // Assign the first character
        }
    }

    // Display the first 16 matches in the "thirty-two-bracket" section
    for (let i = 0; i < Math.min(16, tournamentArry.length); i++) {
        const match = tournamentArry[i];

        // Create the HTML elements for the match
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');

        // Player 1 section
        const player1Section = document.createElement('div');
        player1Section.classList.add('player-section');
        
        const player1CharacterName = document.createElement('h1');
        player1CharacterName.textContent = match.player1.character;
        
        const player1Name = document.createElement('p');
        player1Name.textContent = match.player1.name;
        
        const player1Image = document.createElement('img');
        player1Image.src = `/static/images/character_headshots/${match.player1.character}.jpeg`;
        player1Image.alt = match.player1.character;

        player1Section.appendChild(player1CharacterName);
        player1Section.appendChild(player1Name);
        player1Section.appendChild(player1Image);

        // Player 2 section
        const player2Section = document.createElement('div');
        player2Section.classList.add('player-section');
        
        const player2CharacterName = document.createElement('h1');
        player2CharacterName.textContent = match.player2.character;
        
        const player2Name = document.createElement('p');
        player2Name.textContent = match.player2.name;
        
        const player2Image = document.createElement('img');
        player2Image.src = `/static/images/character_headshots/${match.player2.character}.jpeg`;
        player2Image.alt = match.player2.character;

        player2Section.appendChild(player2CharacterName);
        player2Section.appendChild(player2Name);
        player2Section.appendChild(player2Image);

        // Add player sections to match div
        matchDiv.appendChild(player1Section);
        matchDiv.appendChild(player2Section);

        // Append match to the bracket section
        bracketSection.appendChild(matchDiv);
    }
    
    console.log("START OF THE ARRAY");
    tournamentArry.forEach((match, idx) => {
        console.log(`Match ${idx + 1}:`);
        match.displayMatch();
    });
}





