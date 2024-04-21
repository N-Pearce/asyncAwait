// 1.
async function getFact(){
    let url = 'http://numbersapi.com/67?json'
    let fact = await $.getJSON(url)
    console.log(fact.text)
}

getFact()

// 2.
async function getTwoFacts(){
    const $ul = $('#number-facts')

    let url1 = 'http://numbersapi.com/67?json'
    let url2 = 'http://numbersapi.com/76?json'
    let facts = await Promise.all([
        $.getJSON(url1),
        $.getJSON(url2)
    ]);

    for (let idx in facts){
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(facts[idx].text))
        $ul.append(li)
    }
}

getTwoFacts()

// 3. 
async function getFourFactsOfFav(){
    const $ul = $('#fav-num')

    let url = 'http://numbersapi.com/88?json'
    let facts = await Promise.all([
        $.getJSON(url),
        $.getJSON(url),
        $.getJSON(url),
        $.getJSON(url)
    ]);

    for (let idx in facts){
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(facts[idx].text))
        $ul.append(li)
        console.log(facts[idx].text)
    }
}

getFourFactsOfFav()