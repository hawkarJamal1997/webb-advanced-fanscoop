const BACKEND_URI = "http://localhost"

const Get = (url) => {
    return new Promise( (resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`)
        .then( res => res.json())
        .then( data => resolve(data))
        .catch( error => reject(error))
    })
}

const Post = (url, body) => {
    return new Promise( (resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then( res => res.json())
        .then( data => resolve(data))
        .catch( error => reject(error))
    })
}


const Put = (url, body) => {
    return new Promise( (resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then( res => res.json())
        .then( data => resolve(data))
        .catch( error => reject(error))
    })
}


const Delete = (url, body) => {
    return new Promise( (resolve, reject) => {
        fetch(`${BACKEND_URI}/${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then( res => res.json())
        .then( data => resolve(data))
        .catch( error => reject(error))
    })
}