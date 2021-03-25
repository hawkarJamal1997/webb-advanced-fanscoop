const BACKEND_URI = "http://localhost"

const Get = function(url){
    return new Promise( (resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`)
        .then( res => res.json())
        .then( data => resolve(data))
        .catch( error => reject(error))
    })
}

const Post = function(url, headers, body){
    return new Promise( (resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })
        .then( res => res.json())
        .then( data => resolve(data))
        .catch( error => reject(error))
    })
}



const Put = function(url, body, accesstoken = null){
    return new Promise( (resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accesstoken}`
            },
            body: JSON.stringify(body)
        })
        .then( res => res.json())
        .then( data => resolve(data))
        .catch( error => reject(error))
    })
}


const Delete = function(url, body, accesstoken = null) {
    return new Promise( (resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accesstoken}`
            },
            body: JSON.stringify(body)
        })
        .then( res => res.json())
        .then( data => resolve(data))
        .catch( error => reject(error))
    })
}

const HandleErrors = function(errors, page) {
    for(const error of errors) {
        const p = document.createElement("p")
        p.innerText = error
        page.appendChild(p)
    }
}
