var app = function(){
  //listen for search button to be clicked
  var button = document.querySelector('button');
  button.onclick = handleButtonClick;
}  

var handleButtonClick = function() {
    var inputBox = document.querySelector('input');
    var search = inputBox.value
    var url = 'http://www.omdbapi.com/?s=' + search + '&page=1';
    makeRequest(url,requestComplete);
  }

var makeRequest = function(url, callback){
  //create a new XMLHttpRequest object
  var request = new XMLHttpRequest();
  //set the type of request we want with the url we want to call
  request.open("GET", url);
  //set the callback we want it to use when it has completed the call
  request.onload = callback;
  //send the request!
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var omdb = JSON.parse(jsonString);
  var movies = omdb.Search;
  console.log(movies);
  populateList(movies);
}

var populateList = function(movies){
  console.log(movies);
  var div = document.getElementById('movies');
  div.innerHTML = "";
  movies.forEach(function(movie){
    // movie title-------------------------------
    var li = document.createElement('li');
    li.innerText = movie.Title;
    div.appendChild(li);

    // movie year-------------------------------
    var li = document.createElement('li');
    li.innerText = movie.Year;
    div.appendChild(li);

    // movie tag-------------------------------
    var li = document.createElement('li');
    li.innerText = movie.imdbID;
    div.appendChild(li);

    // movie link-------------------------------
    var movieLink = document.createElement('a');
    movieLink.innerText = "link";
    // movieLink.href = album.external_urls.spotify;
    div.appendChild(movieLink);

    // movie image-------------------------------
    var movieImage = document.createElement('img');
    movieImage.src = movie.Poster;
    div.appendChild(movieImage);

  });
}

window.onload = app;