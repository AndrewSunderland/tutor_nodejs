
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

    

    }else{
        alert("Please enter all of the information");
    }
  }
  function storeDatainDB(photoURL, profile, price, subject, name){
      var request = new XMLHttpRequest();
      var requestURL = '/';
      request.open('POST', requestURL);

      var context = {
        photoURL: photoURL,
        profile: profile,
        price: price,
        subject: subject,
        name: name
      }
      var requestBody = JSON.stringify(context);
      request.setRequestHeader(
          'Content-Type', 'application/json'
      );
      request.addEventListener('load', function(event){
        if(event.target.status !== 200){
            var message = event.target.response;
            alert("Error ", message);
        }else{
            context.photoURL = photoURL.value;
            context.description = profile.value;
            context.price = price.value;
            context.subject = subject.value;
            context.name = name.value;
        
        
            var photoCardHTML = Handlebars.templates.postTemplate(context);
            var photoContainer = document.getElementById('posts');
            photoContainer.insertAdjacentHTML('beforeend', photoCardHTML);
        }
      });
      request.send(requestBody);
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
buttonAccept.addEventListener('click', storeDatainDB);