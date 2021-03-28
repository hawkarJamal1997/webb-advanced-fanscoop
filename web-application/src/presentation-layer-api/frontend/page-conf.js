// TODO: Want to remember the access token across page reloads?
// You could for example store it in local storage, although that
// would be really bad if your website contains a XSS vulnerability.


let accessToken = ""

document.addEventListener("DOMContentLoaded", function() {

    showPage(location.pathname)

    // By listening to the body it can listen for anything inside the body
    // and anytime a new element is created
    document.body.addEventListener("click", function(event) {

        const clickedElement = event.target

        if (clickedElement.tagName == "A") {
            if (clickedElement.hostname == location.hostname) {
                event.preventDefault()

                const uri = clickedElement.getAttribute("href")

                if (location.pathname != uri) {

                    hideCurrentPage()
                    showPage(uri)

                    history.pushState({}, "", uri)

                }
            }
        }
    })
})

window.addEventListener("popstate", function(event) {
    const uri = location.pathname
    hideCurrentPage()
    showPage(uri)
})

function showPage(uri) {
    const errorSection = document.getElementById("errorSection")

    let newPageId = ""

    switch (uri) {
        case "/":
            newPageId = "home-page"
            break
        case "/about":
            newPageId = "about-page"
            break
        case "/sign-up":
            newPageId = "sign-up-page"
            break
        case "/sign-in":
            newPageId = "sign-in-page"
            break
        case "/clubs":
            newPageId = "clubs-page"
            loadAllClubs()
            break
        default:

            if (uri.startsWith("/posts/")) {
                newPageId = "club-posts-page"
                const clubName = uri.split("/")[2]
                loadAllPosts(clubName)
            } else if (uri.startsWith("/create-post/")) {
                newPageId = "create-post-page"
            } else if (uri.startsWith("/edit-post/")) {
                newPageId = "edit-post-page"
            } else {
                newPageId = "not-found-page"
            }
    }


    if (localStorage.getItem("accessToken")) {
        const signUpButton = document.getElementById("is-sign-up")
        signUpButton.classList.remove("is-sign-up")
        signUpButton.classList.add("is-logged-in")

        const signInButton = document.getElementById("is-sign-in")
        signInButton.classList.remove("is-sign-in")
        signInButton.classList.add("is-logged-in")

        const logoutButton = document.getElementById("is-logout")
        logoutButton.classList.remove("is-logout")
        logoutButton.classList.add("show-logout")
    }

    errorSection.innerHTML = ""
    document.getElementById(newPageId).classList.add("current-page")
}

function hideCurrentPage() {
    document.querySelector(".current-page").classList.remove("current-page")
}