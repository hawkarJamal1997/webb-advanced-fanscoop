document.addEventListener("DOMContentLoaded",function(event){
    event.preventDefault()

    /*************CREATE ONE POST***********/
    createPost = function(description){
        if(!localStorage.getItem("accessToken"))
            return
        
        fetch("/apiposts/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                postDescription: encodeURI(description.value)
            })
        }).then(function(response){
            return response.json()
        }).then(function(body){
            if(body.errors.lenght > 0){
                document.getElementById("homeErrorField").innerText = body.errors[0]
            }else{
                updateHome()
            }
        })
    }

    /*************READ ONE POST***********/
    generatePost = function(post,place){
        const parentDiv = document.createElement("div")
        parentDiv.classList.add("container","postContainer")

            const childDiv = document.createElement("div")
            childDiv.classList.add("media","has-background-light")
            parentDiv.appendChild(childDiv)

                const figure = document.createElement("figure")
                figure.classList.add("media-left","image","is-64x64")
                childDiv.appendChild(figure)

                    const img = document.createElement("img")
                    img.src = "/images/" + post.profileImagePath
                    img.setAttribute("style","width:64px;height:64px;")
                    figure.appendChild(img)

                const grandChildDiv = document.createElement("div")
                grandChildDiv.classList.add("content")
                childDiv.appendChild(grandChildDiv)

                    const usernameStrong = document.createElement("strong")
                    usernameStrong.innerText = post.username
                    usernameStrong.onclick = function(){
                        updateProfile(usernameStrong.innerText)
                        document.getElementById("index").classList.add("hidden")
                        document.getElementById("following").classList.add("hidden")
                        document.getElementById("profile").classList.remove("hidden")
                    }
                    grandChildDiv.appendChild(usernameStrong)

                    const description = document.createElement("p")
                    description.classList.add("postDescription")
                    description.innerText = post.postDescription
                    grandChildDiv.appendChild(description)

                const grandChildNav = document.createElement("nav")
                grandChildNav.classList.add("level")
                childDiv.appendChild(grandChildNav)

                    const grandChildsChildDiv = document.createElement("div")
                    grandChildsChildDiv.classList.add("level-left")
                    grandChildDiv.appendChild(grandChildsChildDiv)

                        if(post.isOwner){

                            const updateButton = document.createElement("button")
                            updateButton.classList.add("button","is-outlined","is-info")
                            updateButton.innerText = "Update"
                            updateButton.onclick = function(){
                                updateButton.disabled = true
                                updatePost(post,grandChildsChildDiv,description,updateButton)
                              
                            }
                            grandChildsChildDiv.appendChild(updateButton)

                            const deleteButton = document.createElement("button")
                            deleteButton.classList.add("button","is-danger","is-outlined")
                            deleteButton.innerText = "Delete"
                            deleteButton.onclick = function(){deletePost(post,parentDiv,place)}
                            grandChildsChildDiv.appendChild(deleteButton)

                        }
                        
        place.appendChild(parentDiv)
    }

    
    /*************UPDATE ONE POST***********/
    updatePost = function(currentPost,div,descriptionField,updateButton){
        const textArea = document.createElement("input")
        textArea.setAttribute("type","text")
        textArea.value = currentPost.postDescription

        const saveUpdate = document.createElement("button")
        saveUpdate.innerText = "save"
        saveUpdate.setAttribute("style","float:none")
        const breakPoint = document.createElement("br")
        
        const cancelUpdate = document.createElement("button")
        cancelUpdate.innerText = "cancel"
        cancelUpdate.setAttribute("style","float:none")

        div.appendChild(textArea)
        div.appendChild(saveUpdate)
        div.appendChild(cancelUpdate)

        saveUpdate.addEventListener("click",function(){
            postDescription = textArea.value
            fetch("/postApi/post",{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                },
                body: JSON.stringify({
                    postId: encodeURI(currentPost.id),
                    ownerId: encodeURI(currentPost.ownerId),
                    postDescription:encodeURI(textArea.value)
                })
            }).then(function(response){
                return response.json()
            }).then(function(body){
                
                if(body.errors.length < 1){
                    descriptionField.innerText = textArea.value
                    currentPost.postDescription = textArea.value
                    updateButton.disabled = false
                    cancelUpdate.click()
                }else{
                    for(const error of body.errors){
                        const pError = document.createElement("p")
                        pError.innerText = error
                        pError.setAttribute("style","color:red;")
                        cancelUpdate.appendChild(pError)
                    }
                }
            }).catch(function(error){
                console.log(error)
            })
        })
        
        cancelUpdate.addEventListener("click",function(){
            for(let i = 0; i < 3 ; i++){
                div.removeChild(div.lastChild)
            }
            updateButton.disabled = false
        })
    }

    /*************DELETE ONE POST***********/
    deletePost = function(post,parentDiv,place){
        console.log(post)
        fetch("/postApi/post" ,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                postId: encodeURI(post.id),
                ownerId: encodeURI(post.ownerId)
            })
        }).then(function(response){
            return response.json()
        }).then(function(body){
            if(body.errors.length < 1){
                place.removeChild(parentDiv)
            }
        })
    }

    
    
})