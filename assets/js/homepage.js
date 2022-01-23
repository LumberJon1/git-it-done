var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/"+user+"/repos";
    
    fetch(apiUrl)
        .then(function(response) {
            //If the response was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            }
            else {
                alert("Error: GitHub User Not Found");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to GitHub.  Check Internet connection.");
        });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a valid GitHub username");
    }
};

var displayRepos = function(repos, searchTerm) {

    //Check whether the user has any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found for this user.";
        return;
    }

    //If the user has repos, create and append the items to the page.
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    console.log(repos);
    console.log(searchTerm);

    for (var i = 0; i < repos.length; i++) {
        //Format repo name
        var repoName = repos[i].owner.login+"/"+repos[i].name;

        //Create container for each repo and add necessary classes
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //Create span to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //Create issue status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //Check whether the repo has issues
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>"+repos[i].open_issues_count+" issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to DOM
        repoEl.appendChild(titleEl);
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);