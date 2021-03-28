document.addEventListener("DOMContentLoaded", function() {

    const signInForm = document.getElementById("sign-in-form")
    const errorSection = document.getElementById("errorSection")

    signInForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const username = document.getElementsByName("username")[1].value
        const password = document.getElementsByName("password")[1].value

        const data = {
            username,
            password,
            grant_type: "password"
        }

        const response = await loginPost("api/accounts/sign-in", data)

        if (response.errors) {
            HandleErrors(response.errors, errorSection)
            signInForm.appendChild(errorSection)
            return;
        } else {

            const signUpButton = document.getElementById("is-sign-up")
            signUpButton.classList.remove("is-sign-up")
            signUpButton.classList.add("is-logged-in")

            const signInButton = document.getElementById("is-sign-in")
            signInButton.classList.remove("is-sign-in")
            signInButton.classList.add("is-logged-in")

            const logoutButton = document.getElementById("is-logout")
            logoutButton.classList.remove("is-logout")
            logoutButton.classList.add("show-logout")

            localStorage.setItem("accessToken", response.access_token)
            localStorage.setItem("idToken", response.id_token.username)

            const uri = "/"
            newPage(uri)
        }
    })
})