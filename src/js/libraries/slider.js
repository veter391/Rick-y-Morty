class Slider{
  constructor({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field, rows = 2, spaceBetwen = 30}) {

    this.container = document.querySelector(container);
    this.wrapper = this.container.querySelector(wrapper);
    this.inner = this.container.querySelector(field);

    this.slides = this.container.querySelectorAll(slide);
    this.prev = this.container.querySelector(prevArrow);
    this.next = this.container.querySelector(nextArrow);
    this.total = this.container.querySelector(totalCounter);
    this.current = this.container.querySelector(currentCounter);

    // space betwen slides
    this.spaceBetwen = spaceBetwen;

    this.rows = rows;

    // check wrapper width
    this.width = window.getComputedStyle(this.wrapper).width;

    // index and offset
    this.index = 1;
    this.offset = 0;
    // check slide variavles
    this.offsetWidth = +this.width.replace(/[^\d\.]/g, '');
    // this.offsetWidth = +this.width.slice(0, this.width.length - 2);
    this.lastSlide = this.offsetWidth * (this.divideByRows(this.slides.length) - 1);
    // this.lastSlide = 2880;

    // create elements
    this.dots = document.createElement('div');
    this.dotsArray = [];
    // console.log(this.width)//720
    // console.log(this.lastSlide)//1440
  }

  start() {
    this.inner.style.transform = `translateX(0)`;

    this.total.textContent = this.getZero(this.slides.length);
    this.current.textContent = this.getZero(this.index);

    // container styles
    this.container.style.position = 'relative';

    // wrapper styles
    this.wrapper.style.overflow = 'hidden';

    // inner styles
    this.inner.style.width = `${100 * this.divideByRows(this.slides.length)}%`;
    this.inner.style.display = 'grid';
    this.inner.style.gap = `${this.spaceBetwen}px`;
    // if columns
    this.inner.style.gridAutoFlow = 'column';
    this.inner.style.gridTemplateRows = 'auto '.repeat(this.rows);
    this.inner.style.transition = `all .5s`;


    // check if exist dots box and remove it before the create a new!
    if(document.querySelector('.carusel-indicators')) {
      document.querySelector('.carusel-indicators').remove()
    }


    // dots styles
    this.dots.classList.add('carusel-indicators');
    this.dots.style.cssText = `
      position: static;
      display: flex;
      flex-wrap:wrap;
      row-gap:10px;
      justify-content: center;
      list-style: none;
    `;
    // add dots tu container and add dots inside list
    this.container.append(this.dots);

    // let newI = 0;

    for(let i = 1; i <= (this.slides.length); i++) {
      // create item

      // check dots and delete unused bullets
      // check if exists the requaired number of rows and watch if it need to cereate the bullets
      if(this.slides.length <= this.rows) {
        break;

        // skip the unused bullets
      }else if(i !== 1 && i % this.rows !== 0 || (i === this.slides.length && i % this.rows == 0) ) {
        continue;
      }

      // create bullet
      const dot = document.createElement('button');

      // add atributes and styles to item
      dot.setAttribute('data-slide-to', i);


      // bullet styles
      dot.style.cssText = `
        box-sizing: border-box;
        flex: 0 1 auto;
        // width: 25px;
        // height: 25px;
        // margin:0 5px;
        // padding:5px;
        // font-size:14px;
        text-align: center;
        cursor: pointer;
        // color:blue;
        // background-color: #fff;
        // border-radius: 50%;
        // opacity: .5;
        // transition: opacity .6s ease;
      `;

      // add index
      dot.textContent = this.divideByRows(i) + 1;


      // add class to current dot
      if (i === this.index) {
        dot.classList.add('bullet-active');
      }


      // add item tu list
      this.dots.append(dot);

      // create array with dots
      this.dotsArray.push(dot);

    }


    // add focus to first pack of slides
    this.addFocus2Slide(0);


    // add width to slides
    this.slides.forEach((item, i) => {
      // if grid gap not support
      if (!this.inner.style.gap) {
        item.style.marginRight = `${this.spaceBetwen}px`;

        // if item is last remove margin-bottom
        item.style.marginBottom = (i + 1) % this.rows !== 0 ? `${this.spaceBetwen}px` : '0';
      }

      item.style.width = this.width;
    });



    window.addEventListener('resize', () => {
      this.slides.forEach(item => item.style.width = window.getComputedStyle(this.wrapper).width);

      this.offsetWidth = +window.getComputedStyle(this.wrapper).width.replace(/[^\d\.]/g, '');
    })

  }


  // adds zero before number
  getZero(num){

    if (num >= 0 && num < 10) {

      return `0${num}`;

    }

    return num;

  }

  // show slide
  showSlide(state) {

    // check pass +1 or -1
    if(state === 'next') {

      // if to go next
      if(this.offset === this.lastSlide) {
        this.offset = 0;
      } else {
        this.offset += this.offsetWidth;
      }

      // add index
      if (this.index >= this.slides.length) {
        this.index = 1;
      } else {
        this.index++;
      }

    } else if (state === 'prev') {

      // if to go prev
      if(this.offset === 0) {
        this.offset = this.lastSlide;
      } else {
        this.offset -= this.offsetWidth;
      }

      // add index
      if (this.index <= 1) {
        this.index = this.slides.length;
      } else {
        this.index--;
      }

    }


    // change styles for active bullet and others
    this.inner.style.transition = 'none';
    this.inner.style.opacity = 0;
    this.inner.style.transform = `translateX(-${this.offset}px)`;
    this.current.textContent = this.getZero(this.index);


    // check active dot
    this.dotsArray.forEach(dot => dot.classList.remove('bullet-active'));
    this.dotsArray[this.divideByRows(this.index)].classList.add('bullet-active');
    // this.dotsArray.forEach(dot => dot.style.opacity = '.5');
    // this.dotsArray[this.index].style.opacity = 1;


    // add fade effect to slide, if you need to use the carusel comment it-)
    setTimeout(() => {

      this.inner.style.transition = 'opacity .2s ease';
      this.inner.style.opacity = 1;

    }, 200);

  }

  divideByRows(num) {
    return Math.floor(num / this.rows)
  }

  // add tabindex and do focusible the pack of slides, indexPack = index of boolet.
  addFocus2Slide(indexOfPack) {
    this.slides.forEach((el, i) => {

      let min = indexOfPack * this.rows,  // min value for.ex 0
          max = (indexOfPack + 1) * this.rows;  // max value for.ex 5

      // remove tabindex all elements
      el.removeAttribute('tabindex');


      // check min and max and add atribute to focus item
      if( i+1 > min && i < max) {
        el.setAttribute('tabindex', '0');
      }

    })

  }

  // run function, starts all functions
  run() {
    // run start function
    this.start();

    // check the bullets array
    this.dotsArray.forEach((dot, i) => {
      // add click event to dot and change it
      dot.addEventListener('click', e => {
        const slideDot = this.divideByRows(e.target.getAttribute('data-slide-to'))

        this.index = e.target.getAttribute('data-slide-to');

        this.offset = (this.offsetWidth + this.spaceBetwen) * slideDot;
        // call custom changes from function

        this.showSlide();

        // add focus to pack when click boolet
        this.addFocus2Slide(i);
      })

    });

    //
    this.next.addEventListener('click', () => {

      this.showSlide('next')

    });

    this.prev.addEventListener('click',() => {

      this.showSlide('prev')

    });

  }
}

export default Slider;



