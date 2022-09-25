const ul = document.querySelector('ul');
let hasFocus = "";
let currentFocusPosition = 1;
let btnNext = "";
let btnPrevious = "";
let allpages = 53;
let initialPage = 1;
var cont=0;
let isFirstload = true;
let afterPages = 0;
let paginationRange = 5;

if(isFirstload) {
  isFirstload = false;

  loadPagination(initialPage, paginationRange, allpages, currentFocusPosition);
}

function loadPagination(startingPosition, currentLength, totalPages, focusPosition) {
  let paginationButtonList = '';
  let activeButtonClass;

  initialPage = startingPosition;

  afterPages = initialPage + (currentLength - 1);

  if(focusPosition > 1) {
    paginationButtonList += `<li class="btn-enabled" id="previous" onclick="previousButtonFocus()"><i class="fas fa-angle-left"></i></li>`;
  } 
  else {
    paginationButtonList += `<li class="btn-disabled" id="previous" onclick=""><i class="fas fa-angle-left"></i></li>`;
  }

  for (let pagelength = initialPage; pagelength <= afterPages; pagelength++){
    
    if (focusPosition==pagelength) {
      activeButtonClass = 'active';
    } else { 
      activeButtonClass = '';
    }
  
  paginationButtonList += `<li name="numb ${activeButtonClass}"class="numb ${activeButtonClass}" id="${pagelength}" onclick="chagePagination(${pagelength})" ><span>${pagelength}</span></li>`;
  
  }
  
  if (focusPosition < totalPages) {
    paginationButtonList += `<li class="btn-enabled" id="next" onclick="nextButtonFocus()"><i class="fas fa-angle-right"></i></li>`;
   } 
   else {
    paginationButtonList += `<li class="btn-disabled" id="next" onclick=""><i class="fas fa-angle-right"></i></li>`;

   }
  
  ul.innerHTML = paginationButtonList;

  hasFocus = ul.children["numb active"];
  btnNext = document.getElementById("next");
  btnPrevious = document.getElementById("previous");

}

const focusAttributes = {
  focus: {
    name: "numb active",
    class: "numb active",
  },
  defocus: {
    name: "numb",
    class: "numb"},
}
/* Preguntar si es correcto que esta constante vaya aca o en cada funcion en donde se utilice*/
const {focus, defocus} = focusAttributes;

function disablePaginationButton(button, disable, nameFunction) {
  button.setAttribute("class", `${disable}`);
  button.setAttribute("onclick", `${nameFunction}`);
}

function enablePaginationButton (button, enable, nameFunction) {
  button.setAttribute("class", `${enable}`);
  button.setAttribute("onclick", `${nameFunction}`);
}

function chageFocusPosition (getsFocus, losesFocus) {
  losesFocus.setAttribute("name", defocus.name);
  losesFocus.setAttribute("class", defocus.class);
  
  getsFocus.setAttribute("name", focus.name);
  getsFocus.setAttribute("class", focus.class);
}


function nextButtonFocus() {

  enablePaginationButton(btnPrevious, "btn-enabled", "previousButtonFocus()");

  let nextFocusPosition = 0;
  currentFocusPosition = Number(hasFocus.id);

  if (currentFocusPosition === afterPages && currentFocusPosition < allpages) {
    /* se transfiere tambien el valor a currentFocusPosition */
    nextFocusPosition = currentFocusPosition += 1;

    let initialPositionOfPagination = nextFocusPosition - (Math.ceil(paginationRange/2)-1);

    // currentFocusPosition === allpages ? initialPositionOfPagination = allpages - (paginationRange -1): " ";
    (initialPositionOfPagination + paginationRange) > allpages ? initialPositionOfPagination = allpages - (paginationRange -1): " ";

    loadPagination(initialPositionOfPagination, paginationRange, allpages, currentFocusPosition);
  }
  else {
    nextFocusPosition = currentFocusPosition + 1;
    let willHaveFocus = document.getElementById(`${nextFocusPosition}`);
    
    chageFocusPosition(willHaveFocus, hasFocus);

    hasFocus = willHaveFocus;
    
    if (nextFocusPosition === Number(allpages)) {
      disablePaginationButton(btnNext, "btn-disabled", "");
    }
  }

}

function previousButtonFocus() {

  enablePaginationButton(btnNext, "btn-enabled", "nextButtonFocus()");

  currentFocusPosition = hasFocus.id;
  console.log(currentFocusPosition);
  let previousFocusPosition = currentFocusPosition - 1;

  if(previousFocusPosition < initialPage && previousFocusPosition > 1) {
    
    let initialPositionOfPagination = previousFocusPosition - (Math. floor(paginationRange/2));
    console.log(`initialPositionOfPagination ${initialPositionOfPagination}`);

    initialPositionOfPagination < 1 ? initialPositionOfPagination = 1: " ";

    loadPagination(initialPositionOfPagination, paginationRange, allpages, previousFocusPosition);
    previousFocusPosition = currentFocusPosition -= 1;
  }
  else {
    
    previousFocusPosition = currentFocusPosition -= 1;
    let willHaveFocus = document.getElementById(`${previousFocusPosition}`);
    
    chageFocusPosition(willHaveFocus, hasFocus);

    if (previousFocusPosition === 1) {
      disablePaginationButton(btnPrevious, "btn-disabled", "");
      // console.log(previousFocusPosition);
    }
    hasFocus = willHaveFocus;
  }

}

function chagePagination(positionButton) {

  positionButton == 1 ? disablePaginationButton(btnPrevious, "btn-disabled", "") : enablePaginationButton(btnPrevious, "btn-enabled", "previousButtonFocus()");
  
  positionButton == allpages ? disablePaginationButton(btnNext, "btn-disabled", "") : enablePaginationButton(btnNext, "btn-enabled", "nextButtonFocus()");
  

  let willHaveFocus = document.getElementById(`${positionButton}`);

  hasFocus.setAttribute("name", defocus.name);
  hasFocus.setAttribute("class", defocus.class);
  
  willHaveFocus.setAttribute("name", focus.name);
  willHaveFocus.setAttribute("class", focus.class);

  hasFocus = willHaveFocus;
}


