export const apiURL = `$url('RequestProductBatch-RequestProductBatch')$`
import pageData from '$lib/pageData';
import csvToProductList from '$lib/helpers/csvToProductList';
import csvData from '$lib/csvData';

// working project: Masters Scripting S24

let stlData = pageData.stlData;
let csvProducts = csvToProductList ? csvToProductList(csvData).filter(p => p.id != '0') : [];
  // console.log("csvprod: ", csvProducts)

  // reduce csv data to request data format with no duplicates
  let requestList = [];
  for (let p of csvProducts) {
    if (p.pid != 0 && p.color != 0 && p.pid != "???" && p.color != "???") {
      requestList.push({
        pid: p.pid,
        color: p.color,
        key: p.id
      })
    }
  }
  // for (let p of csvProducts) {
  //   if (!requestList.some(obj => obj.pid === p.pid && obj.color === p.color)) {
  //     if (p.pid != 0 && p.color != 0 && p.pid != "???" && p.color != "???") {
  //       requestList.push({
  //         pid: p.pid,
  //         color: p.color
  //       })
  //     }
  //   }
  // }

  // request product data with the requestList
  let productData = null;
  // if (requestList.length > 0) {
  //   getProductData(requestList, apiURL);
  // }

  export async function getProductData(requestArray = requestList, api = apiURL, key = undefined) {
    try {
      // console.log("key: ", key)
      if (key) {
        // console.log("filtering: ", requestArray, key)
        requestArray = requestArray.filter(r => r.key === key );
        // console.log("filtered: ", requestArray)
      }
      let requestBody = JSON.stringify({products: requestArray});
      const rawResponse = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: requestBody
      });

      // get async data
      const content = await rawResponse.json();

      // handle return & errors array, redistribute keys, update productData
      console.log("fetch response: ", content);
      let apiData = content.products;
      if (apiData && apiData.length > 0) {
        // init data obj with keys
        let productObj = {};
        for (let key of Object.keys(stlData)) {
          productObj[key] = [];
        }

        // assign api data to corresponding array buckets
        for (let p of csvProducts) {
          let value = apiData.filter(obj => 
            obj.pid.toLowerCase() === p.pid.toLowerCase() && 
            obj.color.toLowerCase() === p.color.toLowerCase()
          );

          if (value && value.length > 0) {
            // reassign non api values and push to obj.id
            let finalObj = {
              ...value[0], 
              comingSoon: p.comingSoon == "TRUE" ? true : false, 
              shopSimilar: p.shopSimilar == "TRUE" ? true : false
            }

            productObj[p.id].push(finalObj);
          }
        }

        console.log("final productData Obj: ", productObj)
        productData = productObj;
        return productData
      } else {
        // default to all empty
        let productObj = {};
        for (let key of Object.keys(stlData)) {
          productObj[key] = [];
        }
        productData = productObj
        return productData
      }

    } catch (error) {
      console.log("fetch error: ", error)

      // create and empty product structure to exit the loading condition
      // and render and empty result
      let productObj = {};
      for (let key of Object.keys(stlData)) {
        productObj[key] = [];
      }
      productData = productObj
      return productData
    }
  }
  export function setProductData(val = null) {
    // console.log("setting product data to: ", val)
    productData = val;
    return productData
  }