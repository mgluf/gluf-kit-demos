export default function initCarousels() {

  const carousels = document.querySelectorAll('[data-kit-slick-options]')
  let carouselStates = {}

  carousels.forEach((carousel, i) => {
    //assign ids
    const id = `carousel-${i}`
    const slickId = `slick-entry-${i}`
    const nextId = `next-${i}`
    const prevId = `prev-${i}`
    const dotsId = `dots-${i}`
    //parent element gets `id`
    carousel.id = id
    // slick options
    const options = JSON.parse(carousel.dataset.kitSlickOptions)
    // hideAbove/Below props
    const hide = {
      above: carousel.dataset.kitCarouselHideAbove,
      below: carousel.dataset.kitCarouselHideBelow
    }

    // element we will init slick on
    const slickEntry = document.querySelector(`#${id} .slick-kit-entry`)
    // inject slickId to slick-entry element
    slickEntry.id = slickId

    // get next and prev buttons
    const prev = document.querySelector(`#${id} button[aria-label=previous]`)
    const next = document.querySelector(`#${id} button[aria-label=next]`)
    // inject arrow ids if the elements are present
    if(prev) {
      prev.classList.add(prevId)
      // init arrow selectors in slick config
      options.prevArrow = `.${prevId}`
    }
    if (next) {
      next.classList.add(nextId)
      options.nextArrow = `.${nextId}`
    }

    // enable arrows if arrows are present
    if(prev || next && !options.arrows) {
      options.arrows = true
    } else if(!prev && !next && !options.arrow) {
      options.arrows = false
    }

    const dots = document.querySelector(`#${id} .slick-dots-entry`)
    if(dots) {
      dots.classList.add(dotsId)
      options.dotsClass = dotsId
      options.appendDots = `.${dotsId}`
      if(!options.dots) {
        options.dots = true
      }
    }

    
    // init internal carouselStates Obj
    if(!carouselStates[id]) {
      carouselStates[id] = {
        id: id,
        slickEntry: slickId,
        destroyed: true,
        options: options,
        hide: hide,
      }
    }

    // only init carousels if they pass above/below prop check, else destroy
    if(aboveBelow(carouselStates[id], window.innerWidth) === true) {
      initCarousel(carouselStates[id], carouselStates)
    } else {
      //only hide here, non-initialized carousels cannot be destroyed
      carouselStates[id].destroyed = true
      updateHide(carouselStates[id])
    }

  });

  // re-validate initialized and destroyed carousels
  window.addEventListener("resize",debounce(function(e){
    const vw = window.innerWidth
    carousels.forEach(carousel => {

      const id = carousel.id
      const state = carouselStates[id]

      if(aboveBelow(carouselStates[id], vw) === true) {
        initCarousel(state, carouselStates)
      } else if (aboveBelow(carouselStates[id], vw) === false) {
        destroyCarousel(state, carouselStates)
      }
      
    });
  }));

}

// only run resize code when 300ms have passed since the last resize event
function debounce(func){
  var timer;
  return function(event){
    if(timer) clearTimeout(timer);
    timer = setTimeout(func,300,event);
  };
}

// init carousel and update carouselStates
function initCarousel(state, carouselStates) {
  const id = state.id
  const slickEntry = state.slickEntry
  const options = state.options
  $(`#${slickEntry}`).slick(options)
  carouselStates[id].destroyed = false
  updateHide(state)
  console.log(`initialized ${id}`, state)
}

// unslick carousel and update carouselStates
function destroyCarousel(state, carouselStates) {
  const id = state.id
  const slickEntry = state.slickEntry
  $(`#${slickEntry}`).slick('unslick')
  carouselStates[id].destroyed = true
  updateHide(state)
  console.log(`destroyed ${id}`, state)
}

// hide/show carousel based on state
function updateHide(state) {
  const carousel = document.querySelector(`#${state.id}`)
  if(state.destroyed && !carousel.classList.contains('destroyed')) {
    carousel.classList.add('destroyed')
  } else if (!state.destroyed && carousel.classList.contains('destroyed')) {
    carousel.classList.remove('destroyed')
  }
}

// check if carousel should be rendered or not based on hideAbove or hideBelow props
function aboveBelow(state, vw) {
  const hideAbove = state.hide.above
  const hideBelow = state.hide.below
  const destroyed = state.destroyed

  if(!hideAbove && !hideBelow && destroyed === true) {
    return true
  }


  if(hideAbove && vw < hideAbove && destroyed === true){
    // console.log(`init ${state.id}`)
    return true
  } else if (hideAbove && vw > hideAbove && destroyed === false) {
    // console.log(`destroy ${state.id}`)
    return false
  }
  
  if(hideBelow && vw > hideBelow && destroyed === true){
    // console.log(`init ${state.id}`)
    return true
  } else if (hideBelow && vw < hideBelow && destroyed === false) {
    // console.log(`destroy ${state.id}`)
    return false
  }
}