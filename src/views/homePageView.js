'use strict';

import { LIST,
    SHOW_MORE_BTN
} from "../constants.js";



export const makeCards = (result) => {
    const element = document.createElement("li");
    element.classList.add("list-element");
    LIST.appendChild(element);
    
    element.innerHTML = String.raw`
    
    <div class="book-div">
        
        <img class="list-img" src="${result.volumeInfo.imageLinks.thumbnail}" alt="${result.volumeInfo.title}">
        
        <div class="book-info-div">

            <h3>${result.volumeInfo.title}</h3>

            <h4>Author/Authors: <span>${result.volumeInfo.authors}</span></h4>
            
            <button type="button" class="${SHOW_MORE_BTN}">Show More</button>
        
        </div>

    </div>
  `;
  console.log(element);
  element.querySelector(`.${SHOW_MORE_BTN}`).addEventListener('click', () => {
    const redirect = result.volumeInfo.infoLink;
    window.open(redirect, '_blank');
  });
  return element;
};





