document.addEventListener("DOMContentLoaded", function() {

    const signUpForm = document.getElementById("sign-up-form")
    const errorSection = document.getElementById("errorSection")

    signUpForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const username = document.getElementsByName("username")[0].value
        const password = document.getElementsByName("password")[0].value

        // TODO: Can add client-side validation here.
        const data = {
            username,
            password,
            grant_type: "password"
        }

        const response = await Post("api/accounts/sign-up", data)
        if (response.errors) {
            HandleErrors(response.errors, errorSection)
            signUpForm.appendChild(errorSection)
            return;
        } else {
            const uri = "/sign-in"
            newPage(uri)
        }
    })
})