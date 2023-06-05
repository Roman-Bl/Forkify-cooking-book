import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // win the race either fetch or timeout
    const data = await res.json(); // converting from json returned data from fetch
    //   console.log(res, data);
    if (!res.ok) throw new Error(`${data.message} ${res.status}`); // here we creating custom Error that then catch in catch block
    return data;
  } catch (err) {
    throw err; // here we re-throwing error futher to the next catch block
  }
};
