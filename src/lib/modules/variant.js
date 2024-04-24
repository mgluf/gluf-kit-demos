// update the targetVariant per each variation in Convert
export default function updateVariants(targetVariant, targetTest) {

  let variants = document.querySelectorAll('[data-kit-variant]')

  // if no targetVariant is provided render the control
  if(!targetVariant) {
    targetVariant = "control"
  }

  // if no target test is provided, update targetVariant on all tests
  if(!targetTest) {
    targetTest = "all"
  }

  // init tests registration object
  let tests = {}

  // handle errors
  try {
    registerTests(variants)
  } catch (e) {
    console.error(e)
  }

  function registerTests(variants) {

    //iterate on all Variant.svelte dom elements
    variants.forEach((variant, i) => {

      // init props
      const test = variant.dataset.kitVariantTest
      const control = variant.dataset.kitVariantControl
      const currentVariant = variant.dataset.kitVariant
      
      // init test 
      if(!tests[test]) {
        tests[test] = {}
      }
      
      // register controls for each test
      if(control === "true") {
        
        // prevent duplicate controls
        if(tests[test].control) {
          throw console.error(
            `You cannot have multiple controls for a single test:`,
            {
              test: test,
              elem: variant,
            }
          )
        } else {
          // init control variant
          tests[test].control = {
            test: test,
            control: control,
            variant: "control",
            element: variant,
          }
        }
      
      // register non-control variants
      } else {
        
        // handle duplicate variant IDs in a single test
        if(tests[test][currentVariant]) {
          throw console.error(
            `You cannot have duplicate variant IDs for a single test:`,
            {
              test: test,
              duplicateID: currentVariant,
              elem: variant
            }
          )
        } else {
          // init non-control variants
          tests[test][currentVariant] = {
            test: test,
            control: control,
            variant: currentVariant,
            element: variant,
          }
        }
  
  
      }
      
      // once all tests are registered...
      if(variants.length === i + 1) {

        // console.log("all tests registered", tests)

        // // targetTest is not provided, attempt to update all tests
        if(targetTest === "all") {
          // console.log(`Updating All Tests to show Variant ${targetVariant}`)
          Object.keys(tests).forEach(test => {
            // If the provided targetVariant does not exist on the test, show the control
            if(!tests[test][targetVariant]) {
              updateTest(test, "control")
            } else {
              updateTest(test, targetVariant)
            }
          })
        } else {
          // console.log(`Updating ${targetTest} to show Variant ${targetVariant}`)
          updateTest(targetTest, targetVariant)
        }

      }
    
    });
  }
  

  function updateTest(targetTest, targetVariant) {
    const test = tests[targetTest]
    //iterate through variants of the test
    Object.keys(test).forEach(variant => {
      const _variant = test[variant].variant
      const element = test[variant].element
      updateVariant(_variant, element, targetVariant)
    }) 

  }

  function updateVariant(variant, element, targetVariant) {
    // if the variant is the targetVariant, show it
    if(variant === targetVariant && element.classList.contains("hide")) {
      element.classList.remove("hide")
    // if the variant is NOT the targetVariant, hide it
    } else if (variant != targetVariant && !element.classList.contains("hide")) {
      element.classList.add("hide")
    }
  }
  
  
}