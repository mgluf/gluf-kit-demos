// Filter Group IDs
const dataIDs = {
  cgid: '',
  refinementColor: {},
  size: {},
  fit: {},
  featuresFilter: {},
  fabric: {},
  collections: {},
  productTagShoeStyle: {},
}

// NOTE: constant for isPlp or hasCgid

// NOTE: this runs on load
// build the data object based on the given keys in `dataIDs`
// In order to add support for a new filter, add it as key above. It MUST match the [data-id] value in prod.
function buildKeys() {
  Object.entries(dataIDs).forEach(([key]) => {
    let all = document.querySelectorAll(`li[data-id*="${key}-"]`);
    all.forEach(element => {
      buildKey(element, key);
    })
  });

  // Grab the cgid of the category for use in removeExisting()
  const cgidElement = document.querySelector('[data-querystring]')
  if (!cgidElement) {
    return;
  }
  const cgidEquals = cgidElement.dataset.querystring.split("&")[0];
  dataIDs.cgid = cgidEquals.split("=")[1];
}

// Helper function for buildKeys
function buildKey(element, key) {
  let name = element.dataset.id;

  if (name.includes("-mobile")) {
    return;
  }

  // Remove "-desktop" from certain keys
  let short = name.replace("-desktop", "");

  dataIDs[key][short] = `[data-id='${element.dataset.id}']`;
}

buildKeys()
// NOTE: .fitler-toggle? -trigger? -btn? have to use in our component right?
const triggers = document.querySelectorAll('.filter-trigger')

// On load, get all of the present filter button components and update their state based on the url params
// Add event listener for all the filter button components to fire synth clicks
triggers.forEach(element => {
  const filter = element.dataset.filter;
  const value = element.dataset.value;
  const panel = element.dataset.panel;

  element.addEventListener('click', (e) => synthClick(filter, value, panel));
  // Sync toggle state to filters obj
  updateButton(filter, value);
});

// Fallback function that sets the location.href
function setLocation(filter, value) {
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const rootBase = origin + pathname;

  if (filterExists(filter, value)) {
    window.location.href = rootBase + '?' + removeExisting(filter, value);
  } else {
    window.location.href = rootBase + '?' + buildParams(filter, value);
  }
}

// Constructs URL params based on the given filter/value pair
function buildParams(filter, value, panel) {
  // Dynamically construct the URL without any params (even if there are active ones)
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const rootBase = origin + pathname

  let newParams = new URLSearchParams();
  
  if (filterExists(filter, value)) {
    // Assume that when a user clicks an already toggled button, they are wanting to remove that filter
    newParams = removeExisting(filter, value)
    return newParams.toString()
  }

  // NOTE: This only supports "resetting"
  newParams.set("prefn1", filter);
  newParams.set("prefv1", value);
  newParams.set("cgid", dataIDs.cgid)
  
  if (panel === "closed") {
    newParams.set("filterPanelOpen", "false")
  } else {
    newParams.set("filterPanelOpen", "true")
  }

  // toString() encodes spaces, so need to manually replace them back to + but leave the encoding for everything else.
  let newParamsString = newParams.toString().replace(/%20/g, '+');
  return newParamsString;
}

// Toggles the `.toggled` class on a given filter button based on if the filter is present in the URL params
function updateButton(filter, value) {
  
  const filterButton = document.querySelector(`[data-filter="${filter}"][data-value="${value}"]`)

  if (filterExists(filter, value)) {
  
    const toggledClassName = 'kit-filter-toggled';
    // NOTE: .toggled vs .filter-trigger-toggled?
    if (filterButton.classList.contains(toggledClassName)) {
      return;
    } else {
      filterButton.classList.add(toggledClassName);
    }

  } else {
    if (filterButton.classList.contains(toggledClassName)) {
      filterButton.classList.remove(toggledClassName);
    }
  }

}

// This check prevents the ajaxSuccess listener from trying to run in dev (where it will fail)
if (dataIDs.cgid !== '') {
  // When the refinementSidebar is updated, update the button states
  // This works because the pre-existing code works based of ajax requests. When the sidebar is updated it fires a global ajax success event
  $(document).ajaxSuccess(function() {
    triggers.forEach(element => {
      const filter = element.dataset.filter;
      const value = element.dataset.value;
      updateButton(filter, value);
    });
  });
}

// helper function that checks if a filter is currently on based on the current URL params 
// returns true/false
function filterExists(filter, value) {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)


  let encodedValue = customEncode(value)

  if (params.toString().includes(filter) && params.toString().includes(encodedValue)){
    return true
  } else {
    return false
  }
}

// NOTE: rename this to refer to the outcome (toggling off)

// removes the given filter/values from the current URL Params and re-orders the ones we want to keep so the ajax request doesn't error
// returns the corrected params
function removeExisting(filter, value) {
  // Get the current URL parameters
  const url = new URL(window.location.href);
  // NOTE: consider renaming this to something like filterParams or newParams or just params? consider how this is being operated on
  let existingParams = new URLSearchParams(url.search);
  // NOTE: consider calling "other" params
  let paramsToKeep = [];
  let nextPrefNumber = 1;

  // NOTE: consider optimizing, but think this is probably the most efficient bc we 
  // know what we need to remove, but we don't know which params they're associated with (so we have to iterate on all)

  // Iterate through existing parameters and keep those that do not match the given filter and value
  existingParams.forEach((paramValue, paramKey) => {
    // Check if the current parameter is a 'prefn' parameter (indicating a filter) and its value matches the provided 'filter',
    // and if the corresponding 'prefv' parameter's value (using 'customEncode') matches the provided 'value'.
    // If any of these conditions are false, it means the parameter does not correspond to the filter and value that need to be removed.
    // In such cases, include this parameter in the list of parameters to be kept in the final URL.

    // NOTE: initialize some of these as boolean variables to make the condition more readable
    if (!(paramKey.includes('prefn') && paramValue === filter && existingParams.get(`prefv${paramKey.charAt(5)}`) === customEncode(value))) {
      // NOTE: can this condition be in the first if? or put it outside?
      if (paramKey.includes('prefn') || paramKey.includes('prefv')) {
        // If it's a pref parameter, remove both prefn and prefv

        // NOTE: WTF?
        delete existingParams.delete(`prefn${paramKey.charAt(5)}`);
        delete existingParams.delete(`prefv${paramKey.charAt(5)}`);
      } else {
        // If it's not a pref parameter, keep it in the final params list
        paramsToKeep.push([paramKey, paramValue]);
      }
    }
  });

  // Add cgid parameter manually
  paramsToKeep.push(['cgid', dataIDs.cgid]);


  // Reorder the parameters starting with prefn1 and prefv1
  paramsToKeep.forEach(([key, value]) => {
    // NOTE: Shoulde be 'pref' ?
    if (key.includes('prefn')) {
      // If it's a prefn parameter, update the number
      const prefNumber = key.charAt(5);
      existingParams.set(`prefn${nextPrefNumber}`, value);
      existingParams.set(`prefv${nextPrefNumber}`, paramsToKeep.find(([k, _]) => k === `prefv${prefNumber}`)[1]);
      nextPrefNumber++;
    } else {
      // If it's not a prefn parameter, add it as is
      existingParams.set(key, value);
    }
  });

  // Construct the final URLSearchParams object
  let finalParams = new URLSearchParams(existingParams);
  return finalParams.toString().replace(/%20/g, '+');
}


// alters the data-href attribute of the give sidebar filter button to be the correct future state based on current and given url params
// if it can't find the proper button, it will set the location.href as a fallback to refresh the page
// updates the button states of the component filter-buttons
function synthClick(filter, value) {

  let decodedValue = decode(value);

  //build the key for referencing dataIDs object to get the actual querySelector for synthClick
  let _key = filter + "-" + decodedValue;

  let filterElement = document.querySelector(dataIDs[filter][_key]);

  if (!filterElement) {
    console.log("Can't Find Filter Ele", "dataIDs." + filter + "." + _key);
    setLocation(filter, value);
  }

  let sitePrefix = '';
  
  if (window.location.pathname.startsWith('/s/PM/')) {
    sitePrefix = '/s/PM';
  } else if (window.location.pathname.startsWith('/s/PM-UK/')) {
    sitePrefix = '/s/PM-UK';
  }

  if (filterExists(filter, value)) {
    // if filter is already on, remove it from the ajax
    console.log("remove:", filter, value, "ajax:", `${sitePrefix}/search-ajax?${removeExisting(filter, value)}`);
    filterElement.firstElementChild.setAttribute('data-href', `${sitePrefix}/search-ajax?${removeExisting(filter, value)}`);
  } else {
    // else add it to ajax
    console.log("build:", filter, value, "ajax:", `${sitePrefix}/search-ajax?${buildParams(filter, value)}`);
    filterElement.firstElementChild.setAttribute('data-href', `${sitePrefix}/search-ajax?${buildParams(filter, value)}`);
  }

  // covers use case when a filter removes a pre-existing button from the dom
  // (select color: red and then Collections is removed from the sidebar)
  if (!filterElement.firstElementChild) {
    console.log("can't find filterElement.firstElementChild");
    setLocation(filter, value);
  }

  //synthetically click the filter button
  filterElement.firstElementChild.click();
  updateButton(filter, value);
}


// decode + symbols and other encoded values back to 'plain-text'
function decode(value) {
  return decodeURIComponent(value);
}

function customEncode(value) {
  // Encode the value, then replace spaces with '+'
  return encodeURIComponent(value).replace(/%20/g, '+');
}

