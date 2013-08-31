var Table = require("cli-table");

var table = new Table({
    head: ["ID", "Name", "Gold"]
});

table.push(
    ["0", "Player1", "500"],
    ["1", "Player2", "34135"]
);

console.log(table.toString());