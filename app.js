const LIST = document.getElementById("resultsList");
const URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const API_KEY = 'AIzaSyDHCVvn21hvUh7qg-UF6bl5k9rW4xOVpys';
const RADIOS = document.getElementsByName("search-choice");
const selected = Array.from(RADIOS).find(radio => radio.checked);
const lookFor = `+${selected.value}&key=`;
const SEARCH_FIELD_ELEMENT = document.getElementById('search');
const SEARCH_BTN = document.getElementById('submit-btn');


const searchBook = (query) => {
  query = query.replace(' ','%20');
  const endpoint = `${URL}${query}${lookFor}${API_KEY}`; 

  fetch(endpoint)
  .then(async response => {
    try{
      const jsonResponse = await response.json();
      console.log('response jsonResponse?', jsonResponse)
      if (response.ok) {  
        return jsonResponse;
      } throw new Error('Request failed!');
    } catch(error) {
      console.log(`Oops.. something went wrong! check the endpoint at ${error}`);
    }
  })
  .then(jsonData => {
    const results = jsonData.items.map((x) => x);
    localStorage.setItem("results", JSON.stringify(results));
    renderResults(results);
  })
  .catch(error => {
    console.log(`Render Error: ${error}`);
  });
}


const renderResults = (results) => {
 LIST.innerHTML = "";
  results.forEach(result => {
    makeCards(result);
  });
}
 
const makeCards = (result) => {
  const element = document.createElement("li");
  element.classList.add("list-element");
  LIST.appendChild(element);
  const bookDiv = document.createElement("div")
  element.appendChild(bookDiv);
  bookDiv.classList.add("book-div");
  const img = document.createElement("img");
  img.classList.add("list-img");
  img.src = result.volumeInfo.imageLinks.thumbnail;
  img.alt = result.volumeInfo.title;
  bookDiv.appendChild(img);
  const bookInfoDiv = document.createElement("div")
  bookDiv.appendChild(bookInfoDiv);
  bookInfoDiv.classList.add("book-info-div");
  const bookName = document.createElement("h3")
  bookInfoDiv.appendChild(bookName);
  bookName.textContent = result.volumeInfo.title;
  const authorName = document.createElement("h4")
  bookInfoDiv.appendChild(authorName);
  authorName.textContent = `Author/Authors: ${result.volumeInfo.authors}`;
  const showMoreBtn = document.createElement("button");
  showMoreBtn.type = "button";
  showMoreBtn.classList.add("SHOW_MORE_BTN")
  showMoreBtn.textContent = "Show More";
  bookInfoDiv.appendChild(showMoreBtn);
  showMoreBtn.addEventListener('click', () => {
    const redirect = result.volumeInfo.infoLink;
    window.open(redirect, '_blank');
  });
}


window.onload = () => {
  function handleChange() {
    
      if (SEARCH_FIELD_ELEMENT.value.trim().length === 0) {
        return;
      }
    
      setTimeout(()=> {
        searchBook(SEARCH_FIELD_ELEMENT.value);
      }, 0) 
    };
    
  SEARCH_BTN.addEventListener('click', (e) => {
    handleChange();
  });
  renderResults(JSON.parse(localStorage.getItem('results')));
  console.log(renderResults(JSON.parse(localStorage.getItem('results'))));
};

