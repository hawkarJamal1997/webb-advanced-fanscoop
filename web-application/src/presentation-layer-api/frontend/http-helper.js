const BACKEND_URI = "http://localhost"

const Get = function(url) {
    return new Promise((resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

const loginPost = function(url, data) {
    return new Promise((resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(data)
            })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

const Post = function(url, data) {

    return new Promise((resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}



const Put = function(url, body) {

    return new Promise((resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("accessToken")
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}


const Delete = function(url, body) {

    return new Promise((resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("accessToken")
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

const HandleErrors = function(errors, errorSection) {

    errorSection.innerText = ""
    for (const error of errors) {
        const p = document.createElement("p")
        p.classList.add("invalid")
        p.innerText = error
        errorSection.appendChild(p)
    }
}

const newPage = function(uri) {

    history.pushState({}, "", uri)
    hideCurrentPage()
    showPage(uri)
}