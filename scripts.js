
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
                                <img src="${avatar_url}" id="profile-image" />

                                <p class="profile-name">${login}</p>
                                <p class="profile-label"><a href="${html_url}" target="_blank">View Profile</a></p>

                                <div class="profile-divider"></div>

                                <p class="profile-section-title">Bio</p>
                                <p class="profile-bio">${bio ? bio : "No bio available"}</p>

                                <div class="profile-divider"></div>

                                <p class="profile-info">📍 ${location ? location : "Unknown"}</p>
                                <p class="profile-info">👥 Followers: ${followers}</p>
                                <p class="profile-info">➡️ Following: ${following}</p>
                                <p class="profile-info">📦 Public Repos: ${public_repos}</p>
                            `;
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
                element.innerHTML = `<p>${json[i].name}</p>
                                    <a href = ${json[i].html_url} class = 'repo-links'>Repo</a>
                                    <p>Forks: ${json[i].forks}</p>
                                    `
                element.className = 'repo-items'
                repoElement.appendChild(element)
            }
        }
        

    }
    catch{
        document.getElementById("profile").innerText = "Something Wrong"
    }
}


