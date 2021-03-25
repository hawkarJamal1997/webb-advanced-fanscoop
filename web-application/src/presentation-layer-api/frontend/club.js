async function loadAllClubs(){
    const page = document.getElementById("clubs-page")
    page.innerText = ""
    
    const h1 = document.createElement('h1')
    h1.innerText = "All Clubs"
    page.appendChild(h1)
    
    // TODO: Investigate how the code works when the backend is down.
    try {
        const data = await Get("api/clubs")
        if(data.errors) {
            HandleErrors(data.errors, page)
            return;
        }

        const clubs = data.clubs
            
        
        for(const club of clubs){

            const card = document.createElement('div')
            card.classList.add('card')

            const cardContent = document.createElement('div')
            cardContent.classList.add('cardContent')
            
            const clubName = document.createElement('a')
            clubName.href = `/posts/${club.name}`
            clubName.classList.add('title')
            clubName.innerText = club.name
            

            clubName.addEventListener('click', (e) => {
                e.preventDefault()
                showPage("/posts/"+club.name)									
            })
        
            
            cardContent.appendChild(clubName)
            card.appendChild(cardContent)
            page.appendChild(card)
            
        }
            
    } catch (error) {
        console.error("error ", error)
    }
    
}