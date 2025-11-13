
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
        let response = await fetch(`https://api.github.com/users/${username}`);
        const profileElement = document.getElementById("profile");

        if (response.status === 200) {
            const {login, avatar_url, html_url, location, bio, followers, following, public_repos} = await response.json();

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

            profileElement.style.display = "block";
            document.getElementsByClassName("username")[0].style.display = "none";
        } 
        else {
            profileElement.style.display = "block";
            profileElement.innerHTML = "<p>Please check the username</p>";
        }
    } 
    catch {
        console.log("Error in Username");
    }
}


async function fetch_repodata(username) {
    try {
        const repoElement = document.getElementById("repo");
        repoElement.innerHTML = ""; // clear old repos

        let response = await fetch(`https://api.github.com/users/${username}/repos`);
        let json = await response.json();

        if (response.status === 200) {
            for (let i = 0; i < json.length; i++) {
                const element = document.createElement("div");
                element.className = "repo-items";

                element.innerHTML = `
                    <p>${json[i].name}</p>
                    <a href="${json[i].html_url}" class="repo-links" target="_blank">Repo</a>
                    <p>Forks: ${json[i].forks}</p>
                `;

                repoElement.appendChild(element);
            }
        } 
        else {
            const profileElement = document.getElementById("profile");
            profileElement.style.display = "block";
            profileElement.innerHTML = "<p>Please check the username</p>";

            repoElement.innerHTML = "<div class='repo-items'>No repositories found</div>";
        }
    } 
    catch {
        document.getElementById("profile").innerHTML = "<p>Something went wrong</p>";
    }
}


