var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.use("/", function(request, response) {
  let urlParam = request.originalUrl.substr(1);
  let natural;
  let unix = null;
  if (urlParam !== 'client.js') {
    let dateFormat = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    if (isNaN(urlParam)) {
      natural = urlParam.replace(/%20/g, " ");
      natural = new Date(natural).toLocaleDateString('en-us', dateFormat);
      unix = new Date(natural).getTime()/1000;
    } else {
      unix = urlParam;
      natural = new Date(unix * 1000).toLocaleDateString('en-us', dateFormat);
    }
    if (natural === "Invalid Date") natural = null;
    response.json( {natural: natural, unix: unix} );
  } else {
    response.end();
  }

});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port ' + listener.address().port);
});
