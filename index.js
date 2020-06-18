const express = require('express')
const PORT = process.env.PORT || 5000
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('views','views')
app.set('view engine', 'ejs')

app.post('/process', calculateCost);
app.get("/", displayForm);

function calculateCost(req, res) {
  console.log(req.body);
  let typeofmail = req.body.typeofmail;
  let weight = req.body.weight;
  let total = 0;

  console.log(typeofmail);
  console.log(weight);

  if (typeofmail == "lettersstamped")
    total = weight;
  else if (typeofmail == "lettersmetered")
    total = weight * 1.5;
  else if (typeofmail == "largeenvelopes")
    total = weight * 2;
  else
    total = weight * 4;

  console.log(total);
  let params = { cost: total };
  res.render("pages/result", params);
}

function displayForm(req, res) {
  res.render("pages/form");
}

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));