async function loadAllPosts(clubName) {

    const club = await Get(`api/posts/${clubName}`)
    if (club.errors) {
        HandleErrors(errors, page)
        return;
    }

    const page = document.getElementById("club-posts-page")
    page.innerText = ""

    const h1 = document.getElementsByTagName("h1")[2]
    h1.innerText = `All posts of ${clubName}`
    page.appendChild(h1)

    const createPostPageButton = document.createElement('button')
    createPostPageButton.classList.add("button")
    createPostPageButton.classList.add("is-success")

    createPostPageButton.innerText = "Create post"

    const isLoggedIn = localStorage.getItem("accessToken")

    if (isLoggedIn) {

        page.appendChild(createPostPageButton)

        createPostPageButton.addEventListener('click', function(event) {
            event.preventDefault()
            const uri = `/create-post/${clubName}`
            newPage(uri)
        })
    } else {
        const mustLoginText = document.createElement('p')
        mustLoginText.innerText = "You must be logged in to create a post."
        mustLoginText.classList.add("invalid")
        page.appendChild(mustLoginText)
    }



    for (const post of club.posts) {

        const card = document.createElement('div')
        card.classList.add('card')

        const cardContent = document.createElement('div')
        cardContent.classList.add('cardContent')

        const title = document.createElement('p')
        title.classList.add('title')
        title.innerText = post.title

        const subtitle = document.createElement('p')
        subtitle.classList.add('subtitle')
        subtitle.innerText = post.content

        const errorCardSection = document.createElement('div');


        const user = localStorage.getItem("idToken")

        if (user == post.userOfPost) {

            const editButton = document.createElement("button")
            editButton.innerText = "Edit post"
            editButton.classList.add("button")
            editButton.classList.add("is-warning")

            editButton.addEventListener('click', (event) => {
                event.preventDefault()
                const uri = `/edit-post/${clubName}/${post.id}`
                localStorage.setItem("title", post.title)
                localStorage.setItem("content", post.content)
                newPage(uri)
            })

            const removeButton = document.createElement("button")
            removeButton.innerText = "remove post"
            removeButton.classList.add("button")
            removeButton.classList.add("is-danger")

            removeButton.addEventListener('click', async function(event) {
                event.preventDefault()
                const id = post.id
                const userOfPost = post.userOfPost
                const verifyUser = user
                const postDelete = {
                    id,
                    userOfPost,
                    verifyUser
                }

                try {

                    const response = await Delete(`api/posts/${clubName}/${post.id}`, postDelete)

                    if (response.errors) {
                        HandleErrors(response.errors, errorCardSection)
                    } else {
                        page.removeChild(card)
                    }
                } catch (error) {
                    page.appendChild(errorCardSection)
                }
                const uri = "/posts/" + clubName
                newPage(uri)
            })
            cardContent.appendChild(editButton)
            cardContent.appendChild(removeButton)
        }

        cardContent.appendChild(title)
        cardContent.appendChild(subtitle)
        cardContent.appendChild(errorCardSection)
        card.appendChild(cardContent)
        page.appendChild(card)
    }

}