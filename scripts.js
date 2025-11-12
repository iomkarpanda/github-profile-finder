
document.getElementById("submit-btn").addEventListener('click',()=>{
    const usernameElement = document.getElementById('input').value

    if(usernameElement){
        fetch_userdata(usernameElement)
        fetch_repodata(usernameElement)
    }
    else{
        document.getElementById("profile").innerText = "Enter Correct Username"
    }
})


async function fetch_userdata(username) {
    try {
        let response = await fetch(`https://api.github.com/users/${username}`)
        const {login,avatar_url,html_url,location,bio,followers,following,public_repos} = await response.json()
        const profileElement = document.getElementById("profile")
        profileElement.innerHTML = `
                                        <img src = ${avatar_url} id = 'profile-image'/>
                                        <p>User Name : ${login}</p>
                                        <label> Profile url </label>
                                        <a href = ${html_url}>${html_url}</a>
                                        <p>Bio:${bio}</p>
                                        <p>Location :${location}
                                        <p>follwers:${followers}
                                        <p>following :${following}
                                        <p>public_repos:${public_repos}

                                        `
        profileElement.style.display = 'block'
        document.getElementsByClassName('username')[0].style.display = 'none'
    } catch  {
        console.log("Error in Username")
    }
    
}

async function fetch_repodata(username) {
    try{
        let response = await fetch(`https://api.github.com/users/${username}/repos`)
        console.log(response)
        let json = await response.json()
        console.log(json)
        if(response.status === 200){
            const repoElement = document.getElementById("repo")
           
            for(let i=0;i<json.length;i++){
                const element = document.createElement('div')
                element.innerHTML = `<p>Repo Name : ${json[i].full_name}</p>
                                    <p> Repo Link:</p>
                                    <a href = ${json[i].html_url} class = 'repo-links'>${json[i].html_url}</a>
                                    <p>Created at = ${json[i].created_at}`
                element.className = 'repo-items'
                repoElement.appendChild(element)
            }
        }
        

    }
    catch{
        document.getElementById("profile").innerText = "Something Wrong"
    }
}


