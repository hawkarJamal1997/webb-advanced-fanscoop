document.addEventListener("DOMContentLoaded", function(event) {

    event.preventDefault()

    const editTitle = document.getElementById("editTitle")
    const editContent = document.getElementById("editContent")
    editTitle.value = localStorage.getItem("title")
    editContent.innerText = localStorage.getItem("content")

})

document.addEventListener("DOMContentLoaded", function() {
    const editPostForm = document.getElementById("edit-post-form")
    editPostForm.addEventListener("submit", async function(event) {

        event.preventDefault()

        var title = document.getElementById("editTitle").value
        var content = document.getElementById("editContent").value

        const uri = window.location.href
        const id = uri.substring(uri.lastIndexOf('/') + 1)
        const clubName = uri.split('/')[4]

        const post = {
            title,
            content,
            clubName
        }

        const response = await Put(`api/posts/${clubName}/${id}`, post)

        if (response.errors) {
            HandleErrors(response.errors, errorSection)
            editPostForm.appendChild(errorSection)
            return;
        } else {
            const uri = "/posts/milan"
            newPage(uri)
        }

    })
})