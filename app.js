const list = document.getElementById("resultsList");
const url = 'https://www.googleapis.com/books/v1/volumes';
const queryParam = '?q=';
const apiKey = 'AIzaSyDHCVvn21hvUh7qg-UF6bl5k9rW4xOVpys';
const radios = document.getElementsByName("search-choice");
const selected = Array.from(radios).find(radio => radio.checked);
const lookFor = `+${selected.value}&key=`;




const searchBook = (query) => {
  query = query.replace(' ','%20');
  const endpoint = `${url}${queryParam}${query}${lookFor}${apiKey}`; 
  console.log(endpoint);

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
    renderResults(results);
  })
  .catch(error => {
    console.log(`Render Error: ${error}`);
  });
}

const renderResults = (results) => {
  list.innerHTML = "";
  results.forEach(result => {
    makeCards(result);
  });
}
 
const makeCards = (result) => {
  const element = document.createElement("li");
  element.classList.add("list-element");
  list.appendChild(element);
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
  showMoreBtn.classList.add("show-more-btn")
  showMoreBtn.textContent = "Show More";
  bookInfoDiv.appendChild(showMoreBtn);
  showMoreBtn.addEventListener('click', () => {
    const redirect = result.volumeInfo.infoLink;
    window.open(redirect, '_blank');
  });
}

window.onload = () => {
  const searchFieldElement = document.getElementById('search');
  const searchBtn = document.getElementById('submit-btn');
  function handleChange() {
    
      if (searchFieldElement.value.trim().length === 0) {
        return;
      }
    
      const timeout = setTimeout(()=> {
        searchBook(searchFieldElement.value);
      }, 0) 
    };
    
  searchBtn.addEventListener('click', (e) => {
    handleChange();
  });
}