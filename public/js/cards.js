//Card and Blackjack Logic

//Card Class
class card {
  constructor(value, suit) {
    if (value < 11) {
      this.rank = value;
    } else {
      const faceArray = ["jack", "queen", "king", "ace"];
      this.rank = faceArray[value - 11];
    }
    this.suit = suit;
    if (suit === "diamond" || suit === "heart") {
      this.color = "red";
    } else {
      this.color = "black";
    }
    this.image = this.rank + suit + ".png";
  }
}

//Deck Class
class deck {
  constructor() {
    this.cards = this.deckGenerator();
  }
  //Generates the deck
  deckGenerator() {
    const suitArray = ["heart", "club", "diamond", "spade"];
    const generatedDeck = [];
    suitArray.forEach(suit => {
      for (let i = 2; i <= 14; i++) {
        generatedDeck.push(new card(i, suit));
      }
    });
    return generatedDeck;
  }
  //Generates a random number up to randomMax
  randomUpTo(randomMax){
    return Math.floor(Math.random() * (randomMax + 1));
  }
  //Fisher-Yates shuffle
  shuffle() {
    for (let j = this.cards.length - 1; j > 0; j--) {
      const randomNum = this.randomUpTo(j);
      const stored = this.cards[randomNum];
      this.cards[randomNum] = this.cards[j];
      this.cards[j] = stored;
    }
  }
}

//Generates a random integer from 0 up to the value of randomMax.
function randomUpTo(randomMax) {}

//Class for card agent
class cardAgent {
  constructor(stand, score, bust, hand) {
    this.stand = stand;
    this.score = score;
    this.bust = bust;
    this.hand = hand;
  }
  //Sets this.stand to true to indicate player is satisfied with current score
  setStand() {
    this.stand = true;
  }
  drawCard(deck) {
    //Destroys a card in the provided deck, pushes it to hand
    this.hand.push(deck.cards.pop());
    //Rescores the player's hand
    this.scoreHand();
  }
  //Scores the player hand
  scoreHand() {
    let aceCount = 0;
    let score = 0;
    //Adds the score from number and face cards and counts the aces
    for (let i = 0; i < this.hand.length; i++) {
      if (typeof this.hand[i].rank === "number") {
        score += this.hand[i].rank;
      } else if (this.hand[i].rank === "ace") {
        aceCount += 1;
      } else {
        score += 10;
      }
    }
    //For each Ace, asks if adding 10 would cause the player to break and if so, adds 1 instead
    for (let j = 0; j < aceCount; j++) {
      if (score + 11 <= 21) {
        score += 11;
      } else {
        score += 1;
      }
    }
    this.score = score;
    //If player's score is greater than 21, player has busted
    if (score > 21) {
      this.bust = true;
    }
    if (score === 21) {
      this.setStand();
    }
  }
}

//Class for player
class player extends cardAgent {
  constructor(name, bank) {
    super(false, 0, false, []);
    this.name = name;
    this.bank = bank;
    this.currentBet = 0;
  }
  bet(amount) {
    this.bank -= amount;
    this.currentBet += amount;
  }
}

//Class for dealer
class dealer extends cardAgent {
  constructor() {
    super(false, 0, false, []);
    this.faceDown = [];
  }
  faceDownDraw(deck) {
    this.faceDown.push(deck.cards.pop());
  }
  turnOver() {
    this.hand.push(this.faceDown[0]);
    this.scoreHand();
  }
  dealerTurn(deck) {
    //If it's the first turn, draws a card face down and card into its hand
    if (this.faceDown.length === 0) {
      this.faceDownDraw(deck);
      this.drawCard(deck);
    }
    //If hand length and face down length are equal to 1, indicating dealer is on their second turn, dealer turns over face down card
    else if (this.faceDown.length === 1 && this.hand.length === 1) {
      this.turnOver();
    }
    //If the score of cards in hand is less than 17, draws another
    else if (this.score < 17) {
      this.drawCard(deck);
    } else {
      // Dealer stands if they're 17 or higher
      this.setStand();
    }
  }
}

//module.exports = { card, deck, cardAgent, player, dealer };
