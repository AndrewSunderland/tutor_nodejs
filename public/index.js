
var body = document.body;

var allPosts = []; //object to keep track of all posts even when filtered out. From assignment-5 code

var profileTextHolder = "";
function handleProfile(event){
  profileTextHolder = event.target.value;
}
var photoUrlHolder = "";
function handlePhotoUrl(event){
  photoUrlHolder = event.target.value;
}
var priceHolder = "";
function handlePrice(event){
  priceHolder = event.target.value;
}
var subjectHolder = "";
function handleSubject(event){
  subjectHolder = event.target.value;
}
var phoneHolder = "";
function handlePhone(event){
  phoneHolder = event.target.value;
}
var nameHolder = "";
function handleName(event){
  nameHolder = event.target.value;
}

var modalBackdrop = document.getElementById('modal-backdrop');
var sellButton = document.getElementById('become-button');

//when someone clicks the become tutor button

function handleBecomeClick(event){
    console.log("clicked button");
    modalBackdrop.style.display = "block";
    modalPage.style.display = "block";
}
var modalPage = document.getElementById('become-tutor-modal');
sellButton.addEventListener('click', handleBecomeClick);


//for cancel/exit on modal
function handleCancel(event){
    console.log("Clicked cancel")
    modalBackdrop.style.display = "none";
    modalPage.style.display = "none";
}

function handleExitClick(event){
    console.log("Clicked exit");
    modalBackdrop.style.display = "none";
    modalPage.style.display = "none";
}

var buttonCancel = document.getElementById('modal-cancel');
buttonCancel.addEventListener('click', handleCancel);

var exitButtonModal = document.getElementById('modal-close');
exitButtonModal.addEventListener('click', handleExitClick);


//Dynamic tutor appending to JSON


var photoContainer = document.getElementById('posts');

function insertNewPost(event) {
    if(photoUrlInput && profileInput && priceInput && subjectInput && nameInput){
    var context = {
      photoURL: photoUrlHolder,
      profile: profileTextHolder,
      price: priceHolder,
      subject: subjectHolder,
      name: nameHolder
    }

    context.photoURL = photoUrlInput.value;
    context.description = profileInput.value;
    context.price = priceInput.value;
    context.subject = subjectInput.value;
    context.name = nameInput.value;


    /*code to add created tutor to allPosts*/
    var tempPhotoURL = document.getElementById('post-url-input').value.trim();
    var tempDescription = document.getElementById('post-description-input').value.trim();
    var tempPrice = document.getElementById('post-price-input').value.trim();
    var tempSubject = document.getElementById('post-subject-input').value.trim();
    var tempName = document.getElementById('post-text-input').value.trim();
    allPosts.push({

      photoURL: tempPhotoURL,
      description: tempDescription,
      price: tempPrice,
      subject: tempSubject,
      name: tempName
    });
    /**************************************/


    var photoCardHTML = Handlebars.templates.postTemplate(context);
    var photoContainer = document.getElementById('posts');
    photoContainer.insertAdjacentHTML('beforeend', photoCardHTML);
    //add post to DOM since we wont see unless refreshed
    //once refreshed, won't be in DOM but will be loaded from JSON db

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/server');

    xhr.setRequestHeader("Content-Type", 'application/json');
    var requestBody = JSON.stringify(context);
    xhr.send(requestBody);



    }else{
        alert("Please enter all of the information");
    }
  }


  //Input holders for modal inputs

//
var subjectInput = document.getElementById('post-subject-input');
subjectInput.addEventListener('change', handleSubject);

var priceInput = document.getElementById('post-price-input');
priceInput.addEventListener('change', handlePrice);

var photoUrlInput = document.getElementById('post-url-input');
photoUrlInput.addEventListener('change', handlePhotoUrl);

var phoneInput = document.getElementById('post-phone-input');
phoneInput.addEventListener('change', handlePhone);

var nameInput = document.getElementById('post-text-input');
nameInput.addEventListener('change', handleName);

var profileInput = document.getElementById('post-description-input');
profileInput.addEventListener('change', handleProfile);

var buttonAccept = document.getElementById('modal-accept');
buttonAccept.addEventListener('click', insertNewPost);


//filter button//

var filterButton = document.getElementsByClassName("filter-button");


for (var i = 0; i < filterButton.length; i++) {
  filterButton[i].addEventListener("click", function() {
    console.log("Clicked Button");


    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}



function filterTutors(){
  var filterValues = {
    name: document.getElementById('filter-input-name').value,
    subject: document.getElementById('filter-input-subject').value,
    min: document.getElementById('filter-input-min').value,
    max: document.getElementById('filter-input-max').value
  }
  console.log("Remove posts");
  var removePosts = document.getElementById('posts');

  console.log(removePosts);

  while(removePosts.lastChild){
    removePosts.removeChild(removePosts.lastChild);
  }

  for(var i = 0; i < allPosts.length; i++){
    console.log(allPosts[i].subject.innerText);

    if(filterValues.subject.innerText){
      if(allPosts[i].subject.contains(filterValues.subject.innerText)){
          console.log("Should remove post");
        var photoCardHTML = Handlebars.templates.postTemplate(allPosts[i]);
        removePosts.insertAdjacentHTML('beforeend', photoCardHTML);
      }
    }

    /*if(filterValues.min){
      if(allPosts[i].price < filterValues.min){
        continue;
      }
    }

    if(filterValues.max){
      if(allPosts[i].price > filterValues.max){
        continue;
      }
    }
    */

    /*ADD POST TO DOM*/

  }

  var filterName, table, subjectText;
  filterName = name.toUpperCase();
  table = document.getElementsByClassName('post');
  tableSubject = document.getElementsByClassName("post-subject");
  if(filterValues.subject == ""){
    console.log("Ignore");
  }
  else{
    for(var i = 0; i < tableSubject.length; i++){
      subjectText = tableSubject[i].innerText;
      console.log(subjectText);
      console.log(filterValues.subject);
      if(subjectText.toUpperCase() != filterValues.subject.toUpperCase()){
        console.log("Didn't match");
        //tableSubject[i].style.display = "";
      //  table[i].style.visibility = 'hidden';
        console.log("Got here");
      }

    }
  }

}

function clearFilter(){
  document.getElementById('filter-input-name').value = "";
  document.getElementById('filter-input-subject').value = "";
  document.getElementById('filter-input-min').value = "min";
  document.getElementById('filter-input-max').value = "max";
  for(var i = 0; i < allPosts.length; i++){
    console.log(allPosts[i].subject.innerText);
  }
}


var clearFilterButton = document.getElementById("clear-filter-button");
var acceptFilterButton = document.getElementById("accept-filter-button");

acceptFilterButton.addEventListener('click', filterTutors);
clearFilterButton.addEventListener('click', clearFilter);



window.addEventListener('DOMContentLoaded', function () {
  console.log("Filling DOM....");
  var postElems = document.getElementsByClassName('post');
  for (var i = 0; i < postElems.length; i++) {
    allPosts.push({
      //photoURL: context.photoURL,
      //description: context.description,
      //price: context.price,
      subject: document.getElementsByClassName('post-subject')[i]
      //name: context.name
    });
  }
});
