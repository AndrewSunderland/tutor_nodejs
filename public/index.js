
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
    photoUrlInput.value = "";
    profileInput.value = "";
    priceInput.value = "";
    subjectInput.value = "";
    nameInput.value = "";
    phoneInput.value = "";
    modalBackdrop.style.display = "none";
    modalPage.style.display = "none";
}

function handleExitClick(event){
    console.log("Clicked exit");
    photoUrlInput.value = "";
    profileInput.value = "";
    priceInput.value = "";
    subjectInput.value = "";
    nameInput.value = "";
    phoneInput.value = "";
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
    if(photoUrlInput.value && profileInput.value && priceInput.value && subjectInput.value && nameInput.value && phoneInput.value){
    var context = {
      photoURL: photoUrlHolder,
      profile: profileTextHolder,
      price: priceHolder,
      subject: subjectHolder,
      name: nameHolder,
      phone: phoneHolder
    }

    context.photoURL = photoUrlInput.value;
    context.description = profileInput.value;
    context.price = priceInput.value;
    context.subject = subjectInput.value;
    context.name = nameInput.value;
    context.phone = phoneInput.value;


    /*code to add created tutor to allPosts*/
    var tempPhotoURL = document.getElementById('post-url-input').value.trim();
    var tempDescription = document.getElementById('post-description-input').value.trim();
    var tempPrice = document.getElementById('post-price-input').value.trim();
    var tempSubject = document.getElementById('post-subject-input').value.trim();
    var tempName = document.getElementById('post-text-input').value.trim();


    allPosts.push({

      photoURL: photoUrlInput.value,
      profile: profileInput.value,
      price: priceInput.value,
      subject: subjectInput.value,
      name: nameInput.value,
      phone: phoneInput.value
    });
    
    console.log("UPDATED allposts == " , allPosts);
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
    handleExitClick();


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
    console.log(allPosts[i].name.toUpperCase());
    console.log("compared to ", filterValues.name.toUpperCase());

    if(filterValues.name){
      if(allPosts[i].name.toUpperCase().includes(filterValues.name.toUpperCase())){
        console.log("Should be hitting this on testing name");
      }

      else{
        continue;
      }
    }

    if(filterValues.subject){
      console.log("Should not get here if subject field is empty");
      if(allPosts[i].subject.innerText.toUpperCase().includes(filterValues.subject.toUpperCase())){
      }
      else{
        continue;
      }
    }

    if(filterValues.min){
      var minString = allPosts[i].price.innerText;
      minString = minString.replace(/\D/g,'');
      console.log("MINVALUE: ", minString)
      if(+minString < +filterValues.min){
          continue;
      }
    }

    if(filterValues.max){
      var maxString = allPosts[i].price.innerText;
      maxString = maxString.replace(/\D/g,'');

      if(+maxString > +filterValues.max){
        continue;
      }
    }





    /*REinsert post*/
    //if(allPosts[i].subject.innerText.includes(filterValues.subject)){

    console.log("Re-insert");
    var context = {
      photoURL: photoUrlHolder,
      profile: profileTextHolder,
      price: priceHolder,
      subject: subjectHolder,
      name: nameHolder,
      phone: phoneHolder
    }
    console.log(allPosts[i].photoURL);
    console.log("Innertext Subject for allpost[i] == ", allPosts[i].subject.innerText);

    context.photoURL = allPosts[i].photoURL;

    //context.photoURL = allPosts[i].photoURL.src;
    var constString = allPosts[i].price.innerText;
    constString = constString.replace(/\D/g,'');
    context.profile = allPosts[i].profile.innerText;
    context.price = constString;
    context.subject = allPosts[i].subject.innerText;
    context.phone = allPosts[i].phone.innerText;
    context.name = allPosts[i].name.innerText;

    console.log("All posts:", allPosts)

    console.log("context.subject",context.subject);
    console.log("allPosts[i].price", allPosts[i].price);
    console.log("context.subject.innerText",context.subject.innerText);
    console.log("allPosts[i].price.innerText", allPosts[i].price.innerText);
    console.log("allPosts[i].price",allPosts[i].price);
    console.log("allPosts[i].price.value", allPosts[i].price.value);
    var photoCardHTML = Handlebars.templates.postTemplate(context);
    var photoContainer = document.getElementById('posts');
    photoContainer.insertAdjacentHTML('beforeend', photoCardHTML);

  //}
  }

}

function clearFilter(){
  document.getElementById('filter-input-name').value = "";
  document.getElementById('filter-input-subject').value = "";
  document.getElementById('filter-input-min').value = "min";
  document.getElementById('filter-input-max').value = "max";

  location.reload();
}


var clearFilterButton = document.getElementById("clear-filter-button");
var acceptFilterButton = document.getElementById("accept-filter-button");

acceptFilterButton.addEventListener('click', filterTutors);
clearFilterButton.addEventListener('click', clearFilter);



window.addEventListener('DOMContentLoaded', function () {
  console.log("Filling DOM....");
  var postElems = document.getElementsByClassName('post');
  var postImageElem = document.getElementsByClassName('post-image-container'); //gets the first url

  //var postImageElem = postElems.getElementsByClassName('post-image-container img src');
  for (var i = 0; i < postElems.length; i++) {
    //var postImageElem = postElems[i].getElementsByClassName('post-image-container img');

    //console.log(postImageElem[i].firstElementChild.src);
    console.log(i);
    allPosts.push({
    //  photoURL: imgElems[i].src,
      photoURL: postImageElem[i].firstElementChild.src,
      profile: document.getElementsByClassName('post-profile')[i],
      price: document.getElementsByClassName('post-price')[i],
      subject: document.getElementsByClassName('post-subject')[i],
      name: postImageElem[i].firstElementChild.alt,
      phone: document.getElementsByClassName('post')[i].getAttribute('data-phone')
    });
  }
});
