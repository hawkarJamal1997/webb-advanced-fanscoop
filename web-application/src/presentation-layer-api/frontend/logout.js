document.addEventListener("DOMContentLoaded", function() {

    const logoutButton = document.getElementById("logout-button")
    logoutButton.addEventListener("submit", function(event) {
        event.preventDefault()

        const signUpButton = document.getElementById("is-sign-up")
        signUpButton.classList.add("is-sign-up")
        signUpButton.classList.remove("is-logged-in")

        const signInButton = document.getElementById("is-sign-in")
        signInButton.classList.add("is-sign-in")
        signInButton.classList.remove("is-logged-in")


        const logoutButton = document.getElementById("is-logout")
        logoutButton.classList.add("is-logout")
        logoutButton.classList.remove("show-logout")

        localStorage.clear()

        const uri = "/"
        newPage(uri)
    })

})