
var body = document.body;

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


    var photoCardHTML = Handlebars.templates.postTemplate(context);
    var photoContainer = document.getElementById('posts');
    photoContainer.insertAdjacentHTML('beforeend', photoCardHTML);

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
  /*
  console.log("Remove posts");
  var removePosts = document.getElementById('posts');
  while(removePosts.lastChild){
    removePosts.removeChild(removePosts.lastChild);
  }
  */

  var filterName, table, subjectText;
  filterName = name.toUpperCase();
  table = document.getElementById('posts');
  tableSubject = document.getElementsByClassName("post-subject");
  for(var i = 0; i < tableSubject.length; i++){
    console.log("Got here");
    subjectText = tableSubject[i].innerText;
    console.log(subjectText);
  }

}

function clearFilter(){
  document.getElementById('filter-input-name').value = "";
  document.getElementById('filter-input-subject').value = "";
  document.getElementById('filter-input-min').value = "min";
  document.getElementById('filter-input-max').value = "max";
}


var clearFilterButton = document.getElementById("clear-filter-button");
var acceptFilterButton = document.getElementById("accept-filter-button");

acceptFilterButton.addEventListener('click', filterTutors);
clearFilterButton.addEventListener('click', clearFilter);

//filter json data//
