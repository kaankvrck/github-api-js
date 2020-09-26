//Tüm Elementleri Seçme
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

//Tüm Eventleri Çağırma
eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

//Github Api Çağırma Fonksiyonu
function getData(e){
    let username = nameInput.value.trim();

    if(username === ""){
        alert("Lütfen geçerli bir kullanıcı adı giriniz.");
    }
    else{
        github.getGithubData(username)
        .then(response =>{
            if(response.user.message ==="Not Found"){
                ui.showError("Kullanıcı Bulunamadı!!")
            }
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }
    ui.clearInputs();
    e.preventDefault();
}

//Bütün Arama Geçmişini Temizleme Fonksiyonu
function clearAllSearched(){
    if(confirm("Arama geçmişinizi silmek istediğinize emin misiniz ?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }
}

//Arama Geçmişini Storagedan Alıp Arayüze Ekleme
function getAllSearched(){
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`;
    });

    lastUsers.innerHTML = result;
}