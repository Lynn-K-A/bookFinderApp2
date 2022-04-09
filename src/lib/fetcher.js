'use strict';

import {
    URL,
    API_KEY,
    RADIOS,
    LIST
} from '../constants.js'
import { makeCards } from '../views/homePageView.js';
import { setVal } from './Db.js'


export const selected = Array.from(RADIOS).find(radio => radio.checked);
const lookFor = `+${selected.value}&key=`;
console.log(selected);

export const searchBook = (query) => {
    query = query.replace(' ','%20');
    const endpoint = `${URL}${query}${lookFor}${API_KEY}`; 

  
    fetch(endpoint)
    .then(async response => {
      try{
        const jsonResponse = await response.json();
        if (response.ok) {  
          return jsonResponse;
        } throw new Error('Request failed!');
      } catch(error) {
        console.log(`Oops.. something went wrong! check the endpoint at ${error}`);
      }
    })
    .then(jsonData => {
      const results = jsonData.items;
      setVal('books', results);
      renderResults(results);
    })
    .catch(error => {
      console.log(`Render Error: ${error}`);
    });
  }


export const renderResults = (results) => {
    LIST.innerHTML = "";
    results.forEach(result => {
      makeCards(result);
    });
  }
  