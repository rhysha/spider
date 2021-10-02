/** Crawl wikipedia and use jquery syntax to extract information from the page **/
 
var huntsman = require('huntsman');
var spider = huntsman.spider();
var spider = huntsman.spider({
  throttle: 1, // maximum requests per second
  timeout: 5000 // maximum gap of inactivity before exiting (in milliseconds)
}); 
spider.extensions = [
  huntsman.extension( 'recurse' ), // load recurse extension & follow anchor links
  huntsman.extension( 'cheerio' ) // load cheerio extension
];
 
// follow pages which match this uri regex
spider.on( "https://bdnews24.com/*", function ( err, res ){
 
  // use jquery-style selectors & functions
  var $ = res.extension.cheerio;
  if( !$ ) return; // content is not html
 
  // extract information from page body
  var wikipedia = {
    uri: res.uri,
  };
 
  console.log( wikipedia );
 
});
 
spider.queue.add( 'https://bdnews24.com/' );
spider.start();
