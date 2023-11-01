"use strict";
// import diferents modules:
import { isWebp } from "./imports.js";
import LazyLoad from "vanilla-lazyload";
import "focus-visible";

window.addEventListener('DOMContentLoaded', function () {
  // ### VARIABLES ###
  // variables
  const _URL = 'https://rickandmortyapi.com/api/character',         //! Api url dont touch!

  charactersList = document?.querySelector('.characters__list'),    // list of characters
  btnMore = document?.querySelector('.characters__btn'),            // btn to add more characters
  form = document?.querySelector('.form'),                          // search form
  scrollToTopBtn = document?.querySelector('.aditional__totop'),    // btn for scroll to top
  changeThemeBtn = document?.querySelector('.aditional__theme'),    // btn for change the theme
  loader = document?.querySelector('.loading');                     // loading when wait to fetch

  let charactersPage = 1, // set first page of characters
      charactersLastPage = 42; // set last page of characters


  //### CLASSES AND FUNCTIONS
  // this function get all characters from Api
  async function getCharacters(url) {
    // await to response
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


        // check last page
        if (charactersPage >= charactersLastPage) {
          btnMore.setAttribute('disabled', true);
          btnMore.classList.add('disabled');
        } else {
          btnMore.removeAttribute('disabled');
          btnMore.classList.remove('disabled');
        }

        // hide btn more when exist only one page or no pages
        btnMore.style.cssText = charactersLastPage > 1
                              ? `display: block; visibility: visible`
                              : `display: none; visibility: hidden`;

        data.results.forEach(item => {

          const { image, name, status, species, origin } = item;

          // characters__item_active
          charactersList.innerHTML += `
            <li class="characters__item">
              <div class="characters__title">
                <img class="characters__img" src="${ image }" alt="${ name }">
                <h3 class="characters__name">${ name }</h3>
              </div>

              <p class="characters__info">
                <span class="characters__status ${ status !== 'Alive' ? 'characters__status_dead' : '' } ">
                  <span class="colored">Status: </span>
                  ${ status }
                </span>
                <span class="characters__specie">
                  <span class="colored">Specie: </span>
                  ${ species }
                </span>
                <span class="characters__origin">
                  <span class="colored">Last location: </span>
                  ${ origin.name }
                </span>
              </p>
            </li>
          `;
        })

      })
      .catch(err => {
        // block btn
        btnMore.style.display = 'none';
        btnMore.style.visibility = 'hidden';
        // add error block
        charactersList.innerHTML = `
            <li class="server-error">
              <picture class="server-error-picture">
                <source srcset="img/error.webp" type="image/webp">
                <img class="server-error-img" src="img/error.png" srcset="img/error.png" alt="error">
              </picture>
              <p>${err}</p>
            </li>
          `;
      });
  }

  // smooth scroll function
  function scrollTo(element) {
    // if element not exist throw error
    if(!element) throw new Error(`Parameter(element) is: ${element}`);

    // if element exists add scroll
    document.querySelector(element).scrollIntoView({
      behavior: 'smooth'
    });
  }

  // get character and validete input
  function getValidCharacters(characterPage) {
    // simple validate for input
    const name = form.search.value.replace(/[^a-zA-Z0-9 ]/g, "");

    // calling getCharacters() and filtering it by name
    getCharacters(_URL + `?page=${characterPage}&name=${name}`);
  }

  // get character and validete input
  function getValidCharacters(characterPage) {
    // simple validate for input
    const name = form.search.value.replace(/[^a-zA-Z0-9 ]/g, "");

    // calling getCharacters() and filtering it by name
    getCharacters(_URL + `?page=${characterPage}&name=${name}`);
  }

  function findCharacter(e){
    // delete default settings of form
    e.preventDefault();

    // reset first pack of characters
    charactersPage = 1;

    // clear characters list and reset loader
    resetList();

    // Validate input and get characters
    getValidCharacters(charactersPage);

  };

  function resetList() {
    // create loader and delete it when fetch respond
    loader.innerHTML = `<img style="width:320px; margin:0 auto;" class="loader" src="files/loading.png" alt="loader">`;
    // clear characters list
    charactersList.innerHTML = '';
  }

  function start() {
    // check webp suport
    isWebp();

    // connect lazy load
    new LazyLoad({ elements_selector: '.lazy' });

    // log scripr connected
    console.log('Script connected...');

    // clear characters list and reset loader
    resetList();

    // add 20 characters in the begining
    getCharacters(_URL + `?page=${charactersPage}`);
  }


  // ### START ###
  start();


  // ### EVENTS ###
  // when click call this function to add next page of characters to list.
  btnMore.onclick = () => { if(charactersPage < charactersLastPage) getValidCharacters(++charactersPage)};

  // scroll to Top => get data-to='...' from current btn
  scrollToTopBtn.onclick = e => scrollTo(e.currentTarget.dataset.to);

  // change theme
  changeThemeBtn.addEventListener('click', e => {
    // toggle active class to btn
    e.currentTarget.classList.toggle('light')

    // check current btn to active class and change theme
    if (e.currentTarget.classList.contains('light')) {
      document.documentElement.style.cssText = `
      --light-theme: #333;
      --dark-theme: wheat;
      --primary: rgb(199, 245, 179);
      --hover: #14ddc9;
      --pasive: #008d88`;
    } else {
      document.documentElement.style.cssText = `
      --light-theme: #EEEEEE;
      --dark-theme: #005956;
      --primary: #008d88;
      --hover: #14dd3f;
      --pasive: rgb(199, 245, 179)`;
    }
  });

  //check always when input something or submit form using callback
  form.addEventListener('input', findCharacter);
  form.addEventListener('submit', e => {
    // change placeholder when submit clear input
    form.search.placeholder = e.target.search.value.trim() ? 'Search...' : 'Enter your character!';
    findCharacter(e);
  });


});
