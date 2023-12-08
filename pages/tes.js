const { parseInt } = require("lodash");
const { parse } = require("next/dist/build/swc");
const { parseUrl } = require("next/dist/shared/lib/router/utils/parse-url");
function calc(str) {
    let newStr = ``;
    const bucket = {};

    str.split(" ").forEach((element, index) => {
        if (element == "*" || element == "/" || element == "+" || element == "-") {
            if (bucket[element] == undefined) {
                bucket[element] = [{ sign: element, str: str.charAt(index) }]
            } else {
                bucket[element].push({ sign: element, index })
            }
        }
        if (element !== "*" || element !== "/" || element !== "+" || element !== "-") {
            console.log(element);
            newStr += `${element},`;
        }
    });
    console.log(bucket);
    return { newStr }
}
let result = calc("5 - 22 * 1*4");
console.log(result);

