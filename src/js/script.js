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

  //### CLASSES AND FUNCTIONS
  // const _URL = 'https://rickandmortyapi.com/api/character'; // general character url
  // const _URL20 = _URL + `?page=${1}`; // return 1 page with arr and 20 characters
  // const _URLID = _URL + `${888}`; // return character with id 888

  // const dbInfo = fetch(_URL + '?page=1')
  // .then(data => data.json())
  // .then(data => {
  //   console.log(data);
  // })
  // .catch(err => console.error(err));



  // const filterSearch = (arr, value) => arr.filter(item => item.toLowerCase().includes(value));

  // const arr = ['Marta', 'Mar', 'joni', 'joel', 'User', 'user33'];
  // const val = 'joye';

  // console.log(filterSearch(arr, val));

});
