var twit = require('./process/app.js');

twit.getData({
    query:'Leeds',
    since:1
}).then(function(results){
   console.log(results); 
});