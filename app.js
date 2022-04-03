const searchBook = (query) => {
  const url = 'https://www.googleapis.com/books/v1/volumes';
  const queryParam = '?q=';
  const apiKey = 'AIzaSyDHCVvn21hvUh7qg-UF6bl5k9rW4xOVpys';
  const lookFor = '+intitle&key='
  query = query.replace(' ','%20');
  const endpoint = `${url}${queryParam}${query}${lookFor}${apiKey}`; 
  //console.log(endpoint);

  fetch(endpoint)
  .then(async response => {
    try{
      const jsonResponse = await response.json();
      console.log('response jsonResponse?', jsonResponse)
      if (response.ok) {  
        return jsonResponse;
      } throw new Error('Request failed!');
    } catch(error) {
      console.log(`Oops.. something went wrong! ${error}`);
    }
  })
  .then(jsonData => {
    const results = jsonData.items.map((x) => x);
    renderResults(results);
  })
  .catch(error => {
    console.log(error);
  });
}

const renderResults = (results) => {
  const list = document.getElementById("resultsList");
  list.innerHTML = "";
  results.forEach(result => {
    const element = document.createElement("li");
    element.classList.add("list-element");
    list.appendChild(element);
    const bookName = document.createElement("h4")
    element.appendChild(bookName);
    bookName.textContent = result.volumeInfo.title;
    const img = document.createElement('img');
    img.classList.add("list-img");
    img.src = result.volumeInfo.imageLinks.thumbnail;
    img.alt = result.volumeInfo.title;
    element.appendChild(img);
    const showMoreBtn = document.createElement("button");
    showMoreBtn.type = "button";
    showMoreBtn.textContent = "Show More";
    element.appendChild(showMoreBtn);
    showMoreBtn.addEventListener('click',showInfo(result));
  });
}

const showInfo = (result) => {
  const infoBox = document.createElement("div");
      infoBox.classList.add("info-box");
      document.body.appendChild(infoBox);
      infoBox.style.visibility = 'visible';
      const descriptionBox = document.createElement("div");
      descriptionBox.classList.add("description-box");
      infoBox.appendChild(descriptionBox);
      descriptionBox.textContent = result.volumeInfo.description;
      const bookTitle = document.createElement("h3");
      bookTitle.classList.add("book-title");
      infoBox.appendChild(bookTitle);
      bookTitle.textContent = result.volumeInfo.title;
}
//const redirect = result.volumeInfo.infoLink;
//window.open(redirect, '_blank');

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