async function loadAllClubs() {
    const page = document.getElementById("clubs-page")
    const errorSection = document.getElementById("errorSection")
    page.innerText = ""

    const h1 = document.createElement('h1')
    h1.innerText = "All Clubs"
    page.appendChild(h1)

    try {
        const response = await Get("api/clubs")
        if (response.errors) {
            HandleErrors(data.errors, errorSection)
            page.appendChild(errorSection)
            return;
        }
        const clubs = response.clubs


        for (const club of clubs) {

            const card = document.createElement('div')
            card.classList.add('card')

            const cardContent = document.createElement('div')
            cardContent.classList.add('cardContent')

            const clubName = document.createElement('p')
            clubName.classList.add('title')
            clubName.innerText = club.name

            clubName.addEventListener('click', (event) => {
                event.preventDefault()
                const uri = "/posts/" + club.name
                newPage(uri)
            })

            cardContent.appendChild(clubName)
            card.appendChild(cardContent)
            page.appendChild(card)
        }

    } catch (error) {
        page.appendChild(errorSection)
    }

}