"use strict";
// import diferents modules:
import {isWebp, Modal, burger , Tabs, Accordion, mobileCheck,
  isMobile, isTablet, isDesktop, getHeaderHeight,
  createPopper, right, scrollingAnim, consoleText} from "./imports.js";
// import Swiper from 'swiper';
// import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
// Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);
import {fade, unfade} from "./libraries/fade-unfade.js";
import LazyLoad from "vanilla-lazyload";
import "focus-visible";
import { validateForms } from './libraries/validate-form.js';
import Slider from './libraries/slider.js';
import { data, error, event } from "jquery";
// import "simplebar";
// import * as myfun from "./modules/functions.js"

window.addEventListener('DOMContentLoaded', function () {
  // check webp
  isWebp();
  // connect lazy load
  new LazyLoad({
    elements_selector: '.lazy' ,
  });
  // my js code
  console.log('Script connected...');

  // burger initialitzation
  // burger();

  // global variables
  const _URL = 'https://rickandmortyapi.com/api/character'; // general character url
  const characterList = document?.querySelector('.characters__list'); // general list
  const btnMore = document?.querySelector('.characters__btn'); // btn to add more characters

  let charactersPage = 1; // _URL + `?page=${1}` => page of characters from Api last page 42! default = 1

  characterList.innerHTML = ''; // clear list


  //### CLASSES AND FUNCTIONS
  async function getCharacters(url) {
    await fetch(url)
          .then(data => data.json())
          .then(data => {

            console.log(data);

            data.results.forEach(item => {
              // characters__item_active
              characterList.innerHTML += `
                <li class="characters__item">
                  <img class="characters__img" src="${ item.image }" alt="${ item.name }">
                  <h3 class="characters__name">${ item.name}</h3>
                  <div class="characters__specie ${item.species !== 'Human' ? '.characters__specie_other' : ''} ">${ item.species }</div>
                  <div class="characters__origin">${ item.origin.name }</div>
                </li>
              `;
            })

          })
          .catch(err => console.error(err));


  }

  // add 20 characters in the begining
  getCharacters(_URL + `?page=${charactersPage}`)


  // add event to btn
  btnMore.onclick = () => {
    
    // when click call this function to add next page of characters to list.
    getCharacters(_URL + `?page=${++charactersPage}`); // !* I NEED TO CHANGE IT THAT DONT CALL IT WHEN PAGES > charactersPage

    // check last page
    if (charactersPage >= 42) {
      btnMore.setAttribute('disabled', true);
      btnMore.classList.add('disabled')
    }

  };

  // const filterSearch = (arr, value) => arr.filter(item => item.toLowerCase().includes(value));

  // const arr = ['Marta', 'Mar', 'joni', 'joel', 'User', 'user33'];
  // const val = 'joye';

  // console.log(filterSearch(arr, val));

});
