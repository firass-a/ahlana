const ar = require("./ar-flat.json");
const fr = require("./fr-flat.json");
console.log("FR", fr["landing.heroEm"]);
console.log("AR", ar["landing.heroEm"]);
console.log("AR hosts", ar["nav.hosts"]);
console.log("has eastern?", /[\u0660-\u0669]/.test(JSON.stringify(ar)));
