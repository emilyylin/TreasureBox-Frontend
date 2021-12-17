/***********POST REQUESTS **************/
async function signin (email, password) {
    const res = await fetch('http://localhost:4000/api/users/signin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
	})
    const json = await res.json()
    return json;
}

async function signup () {
    const res = await fetch('http://localhost:4000/api/users/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user:{email,password, password2}})
    })
    
    const json = await res.json()
    return json;
}