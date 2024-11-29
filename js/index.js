var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var btnSubmit = document.getElementById("btnSubmit");
var content = document.getElementById("content");
var closeModel = document.getElementById("close");
var errorModal = document.getElementById("errorModal");

var currentIndex = 0;
var bookmarkList = [];

window.onload = function() {
    if (localStorage.getItem("bookmarkList")) {
      bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
      DisplayData(bookmarkList);
    }
  };

function addBookmark() {

    if(validateName() && validateUrl()){

        var bookmark = {
          siteName: siteName.value,
          siteUrl: siteUrl.value,
        };
      
        bookmarkList.push(bookmark);
        localStorage.setItem("bookmarkList",JSON.stringify(bookmarkList))
        DisplayData(bookmarkList);
        console.log(bookmarkList);
        clearBookmark();

    }
    else {
        showModal();
        siteName.classList.remove("is-invalid")
      }
}

btnSubmit.addEventListener('click',addBookmark)

function clearBookmark() {
  siteName.value = null;
  siteUrl.value = null;

  siteUrl.classList.remove("is-valid")
  siteName.classList.remove("is-valid")
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarkList",JSON.stringify(bookmarkList))

  DisplayData(bookmarkList);
}

function visitWebsite(index) {
    currentIndex = index
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarkList[currentIndex].siteUrl)) {
      open(bookmarkList[currentIndex].siteUrl);
    } else {
      open(`https://${bookmarkList[currentIndex].siteUrl}`);
    }
  }
  

function DisplayData() {
  var cartoona = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    cartoona +=  `
    <tr>
      <td>${i + 1}</td>
      <td>${bookmarkList[i].siteName}</td>              
      <td>
        <button onclick="visitWebsite(${i})" class="btn btn-warning" data-index="${i}">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
      </td>
      <td>
        <button onclick="deleteBookmark(${i})" class="btn btn-danger pe-2" data-index="${currentIndex}">
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button>
      </td>
  </tr>
  `
  }

  content.innerHTML = cartoona;
}


function validateUrl(){
    var regix = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/

    var text = siteUrl.value;


  if(regix.test(text)){
    siteUrl.classList.remove("is-invalid")
    siteUrl.classList.add("is-valid")

    return true
  }
  else{
    siteUrl.classList.add("is-invalid")
    siteUrl.classList.remove("is-valid")

    return false
  }
}

function validateName(){
    var regix = /^[A-Za-z\s\-]{3,50}$/

    var text = siteName.value;


  if(regix.test(text)){
    siteName.classList.remove("is-invalid")
    siteName.classList.add("is-valid")

    return true
  }
  else{
    siteName.classList.add("is-invalid")
    siteName.classList.remove("is-valid")


    return false
  }
}


// Show Modal for Validation Errors 
function showModal() {
    errorModal.classList.remove("d-none");
    errorModal.classList.add("d-block")
  }
  
  // Close Modal
  function closeModal() {
    errorModal.classList.remove("d-block");
    errorModal.classList.add("d-none")
}
  
  
  closeModel.addEventListener('click',closeModal)
  errorModal.addEventListener('click',function(e){
    if(e.target === errorModal){
        closeModal() 
    }
    
  })

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
        closeModal();
    }
});