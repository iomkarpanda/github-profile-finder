
document.getElementById("submit-btn").addEventListener('click',()=>{
    const usernameElement = document.getElementById('input').value

    if(usernameElement){
        fetch_data(usernameElement)
    }
    else{
        document.getElementById("profile").innerText = "Enter Correct Username"
    }
})

async function fetch_data(username) {
    try{
        let response = await fetch(`https://api.github.com/users/${username}/repos`)
        let json = await response.json()
        console.log(json)
        if(response.status === 200){
            const repoElement = document.getElementById("repo")
            repoElement.innerHTML = ''
            for(let i=0;i<json.length;i++){
                const element = document.createElement('div')
                element.innerHTML = `<p>Repo Name : ${json[i].full_name}</p>
                                    <p> Repo Link:</p>
                                    <a href = ${json[i].html_url} class = 'repo-links'>${json[i].html_url}</a>`
                element.className = 'repo-items'
                repoElement.appendChild(element)
            }
        }
        

    }
    catch{
        document.getElementById("profile").innerText = "Something Wrong"
    }
}