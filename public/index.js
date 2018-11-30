var tutorHolder = {
    table: []
};

var body = document.body;

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


//Dynamic tutor adding
/*
  tutorHolder.table.push({photoURL: "http://placekitten.com/320/320/",
  profile: "kitty",
  price: "5",
  subject: "Math",
  name: "John Cena"});

  var json = JSON.stringify(tutorHolder);
  fs.readFile()
*/
var photoContainer = document.getElementById('posts');

function insertNewPost(description, photoURL, price, city, condition) {
    var context = {
      photoURL: photoURL,
      description: description,
      price: price,
      city: city,
      condition: condition,
    }
    var photoCardHTML = Handlebars.templates.postTemplate(context);
    var photoContainer = document.getElementById('posts');
    photoContainer.insertAdjacentHTML('beforeend', photoCardHTML);
  }
