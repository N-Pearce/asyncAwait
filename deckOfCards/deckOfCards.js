const baseURL = 'https://deckofcardsapi.com/api/deck'

// 1.
async function drawOne(){
    let deck = await $.getJSON(`${baseURL}/new/draw/`);
    let {value, suit} = deck.cards[0]
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
}
drawOne()

// 2.
async function drawTwo(){
    let deck =  await $.getJSON(`${baseURL}/new/shuffle/`);
    let id = deck.deck_id
    
    let drawnCards = await Promise.all([
        $.getJSON(`${baseURL}/${id}/draw`),
        $.getJSON(`${baseURL}/${id}/draw`)
    ])

    for (let idx in drawnCards){
        let {value, suit} = drawnCards[idx].cards[0]
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}\n\n Deck ID: ${drawnCards[idx].deck_id}`)
    }
}
drawTwo()

// 3.
async function setupCards(){
    const $btn = $('button');
    const $cardArea = $('#cards');

    let deckData = await $.getJSON(`${baseURL}/new/shuffle`)
    $btn.show().on('click', async function(){
        let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw`)
        let cardImg = cardData.cards[0].image;
        let angle = Math.random() * 60 - 30;
        let randomX = Math.random() * 20 - 10;
        let randomY = Math.random() * 20 - 10;
        $cardArea.append(
            $('<img>', {
                src: cardImg,
                css: {
                    position: 'absolute',
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (cardData.remaining === 0) $btn.hide()
    })
}

setupCards()