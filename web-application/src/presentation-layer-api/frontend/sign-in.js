async function signIn() {
    
    document.getElementById("sign-in-form").addEventListener("submit", async function(event){
        console.log("whahaat")
                    
        event.preventDefault()

        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        // TODO: Can add client-side validation here.

        const data = {
            username,
            password,
            grant_type: "password"
        }
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }

        const response = await fetch(`api/${BACKEND_URI}/accounts/sign-up`,{
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body = new URLSearchParams(data)
        })

        switch(response.status){
            
            case 200:
                
                const body = await response.json()
                
                accessToken = body.access_token
                
                document.body.classList.remove("is-logged-out")
                document.body.classList.add("is-logged-in")
                
                console.log(accessToken)
                // TODO: Show feedback to the user (did the login succeed?).
                
            break
            case 400:
                
                // TODO.
                
            break
            case 500:
            default:
                
                // TODO.
            
        }

    })
    
}    