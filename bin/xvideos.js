#!/usr/bin/env node

var Jetty = require("jetty"),
    optimist = require("optimist"),
    xv = require("xvideos");

var argv = optimist.argv,
    keywords = argv._;

var tty = new Jetty(process.stdout);

if (Object.hasOwnProperty.call(argv, "help") || Object.hasOwnProperty.call(argv, "h") || !argv._.length) {
  tty.text("\n");
  tty.bold().text("Usage: ").normal().text("xvideos [--sort <sort>] [--date <date filter>] [--duration <duration filter>] <keywords ...>\n");
  tty.text("\n");
  tty.bold().text("--sort ").normal().text("    <rating/relevance/uploaddate>           (default: uploaddate)\n");
  tty.bold().text("--date ").normal().text("    <all/today/week/month>                  (default: all)\n");
  tty.bold().text("--duration ").normal().text("<allduration/1-3min/3-10min/10min_more> (default: allduration)\n");
  tty.text("\n");
  tty.bold().text("Note: ").normal().text("You must supply at least one keyword.\n");
  tty.text("\n");
} else {
  var options = {
    k: keywords.join(" "),
    sort: argv.sort || "uploaddate",
    datef: argv.date || "all",
    durf: argv.duration || "allduration",
  };

  xv.search(options, function(err, res) {
    if (err) {
      return console.warn(err);
    }
    
    console.log( JSON.stringify( res ) );
  });
}
