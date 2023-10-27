"use strict";
// import diferents modules:
import {isWebp} from "./imports.js";
import LazyLoad from "vanilla-lazyload";
import "focus-visible";
import { validateForms } from './libraries/validate-form.js';

window.addEventListener('DOMContentLoaded', function () {
  // check webp
  isWebp();
  // connect lazy load
  new LazyLoad({elements_selector: '.lazy'});
  // my js code
  console.log('Script connected...');

  // global variables
  const _URL = 'https://rickandmortyapi.com/api/character';           //! Api url dont touch!
  const characterList = document?.querySelector('.characters__list'); // list of characters
  const btnMore = document?.querySelector('.characters__btn');        // btn to add more characters
  const form = document?.querySelector('.form');                      // search form

  const loader = document?.querySelector('.loading');
  loader.innerHTML = `<img style="width:320px; margin:0 auto;" class="loader" src="files/loading.png" alt="loader">`; // create loader and delete it when fetch respond

  let charactersPage = 1; // set first page of characters
  let charactersLastPage = 42; // set last page of characters

  characterList.innerHTML = ''; // clear list


  //### CLASSES AND FUNCTIONS
  // this function get all characters from Api
  async function getCharacters(url) {
    await fetch(url)
          .then(data => {

            loader.innerHTML = '';

            if (!data.ok) {
              throw new Error(data.status + ' Not found')
            }

            return data.json();
          })
          .then(data => {

            // add total pages to variable
            charactersLastPage = data.info.pages;

            // change btn display when exist one page or not
            btnMore.style.display = charactersLastPage > 1 ? 'block' : 'none'

            data.results.forEach(item => {
              // characters__item_active
              characterList.innerHTML += `
                <li class="characters__item">
                  <img class="characters__img" src="${ item.image }" alt="${ item.name }">
                  <h3 class="characters__name">${ item.name}</h3>
                  <div class="characters__specie ${item.species !== 'Human' ? 'characters__specie_other' : ''} ">${ item.species }</div>
                  <div class="characters__origin">${ item.origin.name }</div>
                </li>
              `;
            })

          })
          .catch(err => {
            // block btn
            btnMore.style.display = 'none';
            btnMore.style.visibility = 'hidden';
            // add error block
            characterList.innerHTML = `
                <li class="server-error">
                  <picture class="server-error-picture">
                    <source srcset="img/error.webp 1x, img/error@2x.webp 2x" type="image/webp">
                    <img class="server-error-img" src="img/error.png" srcset="img/error.png 1x, img/error@2x.png 2x" alt="error">
                  </picture>
                  <p>${err}</p>
                </li>
              `;
          });
  }

  // add 20 characters in the begining
  getCharacters(_URL + `?page=${charactersPage}`);

  // add event to btn
  btnMore.onclick = () => {
    // when click call this function to add next page of characters to list.
    if(charactersPage < charactersLastPage) {
      getCharacters(_URL + `?page=${++charactersPage}`);
    }

    // check last page
    if (charactersPage >= charactersLastPage) {
      btnMore.setAttribute('disabled', true);
      btnMore.classList.add('disabled');
    }

  };

  const findCharacter = e => {
    // delete default settings of form
    e.preventDefault();

    loader.innerHTML = `<img style="width:320px; margin:0 auto;" class="loader" src="files/loading.png" alt="loader">`; // create loader and delete it when fetch respond
    characterList.innerHTML = ''; // clear list

    const name = form.search.value;

    // calling getCharacters() and filtering it by name
    getCharacters(_URL + `?name=${name}&page=${charactersPage}`);
  };

  //check always when input something or submit form using callback
  form.addEventListener('input', findCharacter);
  form.addEventListener('submit', findCharacter);


});
