    // TODO: Want to remember the access token across page reloads?
    // You could for example store it in local storage, although that
    // would be really bad if your website contains a XSS vulnerability.

    
    let accessToken = ""

    document.addEventListener("DOMContentLoaded", function(){
        
        showPage(location.pathname)
        
        // TODO: Write comment explaining why we listen for click on links
        // this very strange way.
        document.body.addEventListener("click", function(event){
            
            const clickedElement = event.target

            console.log(clickedElement.hostname + " " + clickedElement.tagName)
            
            if(clickedElement.tagName == "A" || clickedElement.tagName == "BUTTON"){
                if(clickedElement.hostname == location.hostname){
                    event.preventDefault()
                    
                    const uri = clickedElement.getAttribute("href")
                    
                    if(location.pathname != uri){
                        
                        hideCurrentPage()
                        showPage(uri)
                        
                        history.pushState({}, "", uri)
                        
                    }
                    
                }
                
            }
            
        })
        
    })

    window.addEventListener("popstate", function(event){
        
        const uri = location.pathname
        hideCurrentPage()
        showPage(uri)
        
    })

    function showPage(uri){
        
        let newPageId = ""
        
        switch(uri){
            
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

                if(uri.startsWith("/posts/")){
                    newPageId = "club-posts-page"
                    const clubName = uri.split("/")[2]
                    loadAllPosts(clubName)
                }else if(uri.startsWith("/create-post/")){
                    newPageId = "create-post-page"
                    const clubName = uri.split("/")[2]
                    createPost(clubName)
                }else{
                    newPageId = "not-found-page"
                }
                
            
        }
        
        document.getElementById(newPageId).classList.add("current-page")

    }

    function hideCurrentPage(){
        document.querySelector(".current-page").classList.remove("current-page")
    }
	