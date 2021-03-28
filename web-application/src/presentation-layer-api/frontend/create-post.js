document.addEventListener("DOMContentLoaded", function() {

    const createPostForm = document.getElementById("create-post-form")
    const errorSection = document.getElementById("errorSection")

    createPostForm.addEventListener("submit", async function(event) {

        event.preventDefault()

        var title = document.getElementById("title").value
        var content = document.getElementById("content").value

        const uri = window.location.href
        const clubName = uri.substring(uri.lastIndexOf('/') + 1)

        const post = {
            title,
            content,
            clubName
        }

        const response = await Post(`api/posts/${clubName}`, post)
        if (response.errors) {
            HandleErrors(response.errors, errorSection)
            createPostForm.appendChild(errorSection)
            return;
        } else {
            const uri = "/posts/milan"
            newPage(uri)
        }

    })

})