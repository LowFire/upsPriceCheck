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

  if (typeofmail == "lettersstamped") {
    total = .40 + (weight * .15);
    if (weight > 3)
      total = 1;
  }
  else if (typeofmail == "lettersmetered") {
    total = 0.35 +  (weight * .15);
    if (weight > 3)
      total = 0.95
  }
  else if (typeofmail == "largeenvelopes")
    total = 0.80 + (weight * 0.20);
  else if (typeofmail == "firstclass") {
    if (weight <= 4)
      total = 4.20
    else if (weight > 4 && weight <= 8)
      total = 5;
    else if (weight > 8 && weight <= 12)
      total = 5.75;
    else total = 6.5;
  }

  console.log(total);
  let params = { cost: total, typeofmail: typeofmail, weight: weight};
  res.render("pages/result", params);
}

function displayForm(req, res) {
  res.render("pages/form");
}

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));