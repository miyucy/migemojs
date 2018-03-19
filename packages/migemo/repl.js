const repl = require("repl");
const migemo = require("./dist").default;
const r = repl.start('> ');
r.context.migemo = migemo;
