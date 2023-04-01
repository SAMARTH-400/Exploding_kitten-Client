export default function generateDeck() {
    const cardObject = { 1: 'shuffle', 2:'explode', 3:'defuse', 4:'cat' };
    let arr = [];
    const numberOfCard = 5;
    const getRandomNumber = () => Math.floor(Math.random() * (5 - 1) + 1);
    for (let index = 0; index < numberOfCard; index++) arr.push(cardObject[getRandomNumber()]);
    return arr;
} ;

