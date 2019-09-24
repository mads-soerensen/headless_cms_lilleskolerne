
// Token til storyblok
let token = "ZnH1grA7PBl4CEBiRWGo3wtt"

// Den sidste del af URL'en
let path = "information"

// Lave et GET request
let request = new XMLHttpRequest()
request.open('GET', `https://api.storyblok.com/v1/cdn/stories/${path}?version=draft&token=${token}`, true)
// Nedenstående er en anden måde at sætte det ovenstående op på - De gør begge to det samme, det handler om hvad der giver mest mening for en selv
//request.open('GET', 'https://api.storyblok.com/v1/cdn/stories/' + path + '?version=draft&token=uEo2DCnrMLPTh9grH9ejSQtt', true)
request.onload = function () {
  if (request.status >=200 && request.status <400) {
    let data = JSON.parse(request.responseText)
    console.log(data);
    contentPage(data);
  } else {
    console.log("Har forbindelse til serveren, men returnerede en fejl");
  }
  request.onerror = function () {
    console.log("Connection Error")
  };
}
request.send()

function contentPage(data) {
  let navHTMLString = "";
  let frontpageHTMLString = "";

  // Lave et forloop, som kører igennem hele siden (home)
  for (i = 0; i < data.story.content.body.length; i++){
    navHTMLString = "";
    //Laver en switch for at kunen vælge i mellem forskellige komponenter. Jeg ser på de forskellige komponenter, i stedet for hele body 
    switch (data.story.content.body[i].component){
        case "nav_btn" :
        //Henter de nødvendige komponenter
      navHTMLString += "<ul>";
      navHTMLString += "<li><a href='http://des-iis.ucn.dk/mmda0918/1074182/Lilleskolerne/index.html'>" + data.story.content.body[i].nav_li1 + "</a></li>";
      navHTMLString += "<li><a href='#'>" + data.story.content.body[i].nav_li2 + "</a></li>";
      navHTMLString += "<li><a class='active' href='http://des-iis.ucn.dk/mmda0918/1074182/Lilleskolerne/information/information.html'>" + data.story.content.body[i].nav_li3 + "</a></li>";
      navHTMLString += "</ul>";      

      //Kigger efter ID'et newsFeed (i div'en) og importere værdierne fra newsHTMLString
      document.getElementById("contentPage").innerHTML += navHTMLString;
      break;

    }
    
  }

  for (i = 0; i < data.story.content.body.length; i++){
    frontpageHTMLString = "";
    
    switch (data.story.content.body[i].component){

      case "index" :
      frontpageHTMLString += "<h1 class='textarea'>" + data.story.content.body[i].headline + "</h1>";
      frontpageHTMLString += "<p class='textarea'>" + data.story.content.body[i].infotext + "</p>";
      frontpageHTMLString += "<h2 class='textarea'>" + data.story.content.body[i].text + "</h2>";
      
      document.getElementById("contentPage").innerHTML += frontpageHTMLString;
      break;

    

    }
    
  }
}

// Eksikverer token
storyblok.init({
  accessToken: token
 })
 // Ser på ændringer i Storyblok
 storyblok.on(['published', 'change'], function() {
  location.reload(true)
 })
 // Ser på handlinger 
 storyblok.pingEditor(function() {
  if (storyblok.inEditor) {
   storyblok.enterEditmode()
  }
 })

 window.addEventListener("load", function (event) {
   console.log("All resources finished loading!");
 });
