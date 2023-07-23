import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // specific for our API - telling waht we gonna sent. Write exactly - 'Content-Type'!!
          },
          body: JSON.stringify(uploadData), // actual data
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // win the race either fetch or timeout
    const data = await res.json(); // we still need the data, because API could send something back on POST request
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err; // here we re-throwing error futher to the next catch block
  }
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // win the race either fetch or timeout
    const data = await res.json(); // converting from json returned data from fetch
    if (!res.ok) throw new Error(`${data.message} ${res.status}`); // here we creating custom Error that then catch in catch block
    return data;
  } catch (err) {
    throw err; // here we re-throwing error futher to the next catch block
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // specific for our API - telling waht we gonna sent. Write exactly - 'Content-Type'!!
      },
      body: JSON.stringify(uploadData), // actual data
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json(); // we still need the data, because API could send something back on POST request
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err; //
  }
};
