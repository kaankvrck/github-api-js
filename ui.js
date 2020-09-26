class UI {
    constructor() {
        this.profileDiv = document.getElementById("profile");
        this.repoDiv = document.getElementById("repos");
        this.lastUsers = document.getElementById("last-users");
        this.inputField = document.getElementById("githubname");
        this.cardBody = document.querySelectorAll(".card-header")[0];
    }

    //Inputu temizleme fonksiyonu
    clearInputs() {
        this.inputField.value = "";
    }

    //Kullanıcının verilerini gösterme fonksiyonu
    showUserInfo(user) {
        this.profileDiv.innerHTML = `
    <div class="card card-header">
        <h3>Araştırılan Profil</h3>
    </div>
    <div class="card card-body mb-3">
        <div class="row">
            <div class="col-md-4">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}"
                        class="img-fluid mb-2" width="200px" height="200px">
                </a>
                <hr>
                <div id="fullName"><strong>${user.name}</strong></div>
                <hr>
                <div id="bio">${user.bio}</div>
            </div>
            <div class="col-md-8">
                <button class="btn btn-secondary">
                    Takipçi <span class="badge badge-dark">${user.followers}</span>
                </button>
                <button class="btn btn-info">
                    Takip Edilen <span class="badge badge-dark">${user.following}</span>
                </button>
                <button class="btn btn-danger">
                    Repo Sayısı <span class="badge badge-dark">${user.public_repos}</span>
                </button>
                <hr>
                <li class="list-group">
                <li class="list-group-item">
                    <img src="images/company.png" width="30px" style="margin-right: 10px;"><span id="company">
                    ${user.company}</span>
                </li>
                <li class="list-group-item">
                    <img src="images/location.png" width="30px" style="margin-right: 10px;"><span id="company">
                    ${user.location}</span>
                </li>
                <li class="list-group-item">
                    <img src="images/mail.png" width="30px" style="margin-right: 10px;"><span id="company">
                    ${user.email}</span>
                </li>
                </li>
            </div>
        </div>
    </div>`;
    }

    //Hata mesajı yazdırma fonksiyonu
    showError(message){
        const div = document.createElement("div");

        div.className = "alert alert-danger";
        div.textContent = message;

        this.cardBody.appendChild(div);

        setTimeout(()=>{
            div.remove;
        },2000);
    }

    //Kullanıcının repolarını görüntüleme fonksiyonu
    showRepoInfo(repos){
        this.repoDiv.innerHTML = "";

        repos.forEach(repo =>{
            this.repoDiv.innerHTML += `
            <div class="col-md-6 row mr-2 mb-4">
                    <div class="col-md-6">
                        <a href="${repo.html_url}" target="_blank" id="repoName">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                        <button class="btn  btn-secondary">
                            Yıldız <span class="badge badge-dark" id="repoStar">${repo.stargazers_count}</span>
                        </button>
                        <button class="btn  btn-info">
                            Fork <span class="badge badge-dark" id="repoFork">${repo.forks_count}</span>
                        </button>
                    </div>
                </div>`;
        });
    }

    //Aranmış kullanıcıları arayüze ekleme fonksiyonu
    addSearchedUserToUI(username){
        let users = Storage.getSearchedUsersFromStorage();

        if(users.indexOf(username)===-1){
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = username;
            this.lastUsers.appendChild(li);
        }
    }

    //Tüm aranmış kullanıcıları arayüzden silme fonksiyonu
    clearAllSearchedFromUI(){
        while(this.lastUsers.firstElementChild !== null){
            this.lastUsers.removeChild(this.lastUsers.firstElementChild);
        }
    }
}