var express = require('express');
var router = express.Router();
var d3 = require('d3-sparql');

/* GET games listing. */
router.get('/', async(req, res) => {
  try {
    var Query = `
    prefix : <http://www.ihsansteamgames.com/ontologies/2022/4/steam-games#>
    prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?name ?publisher_name ?developer_name
    WHERE{
      ?id a :Games .
      ?id :name ?name .
      ?id :publishedBy ?publisher .
      ?id :developedBy ?developer .
      ?developer :developer-name ?developer_name .
      ?publisher :publisher-name ?publisher_name .
    } LIMIT 1000
    `;
    var sparqlEndpoint = 'http://localhost:3030/steam/sparql';
    
    d3.sparql(sparqlEndpoint, Query).then((results) => {
      console.log(results);
      res.render('steamgames', {title : 'Data', games: results});
    });
  } catch(err){
    if(err.response){
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request){
      console.log(err.response.request);
    } else{
      console.error('Error', err.message);
    }
  }
});

router.post('/', async(req, res) => {
  let find = req.body.find;
  try{
    var QueryFind =  `
    prefix : <http://www.ihsansteamgames.com/ontologies/2022/4/steam-games#>
    prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?name ?publisher_name ?developer_name
    WHERE{
      ?id a :Games .
      ?id :name ?name .
      ?id :publishedBy ?publisher .
      ?id :developedBy ?developer .
      ?developer :developer-name ?developer_name .
      ?publisher :publisher-name ?publisher_name .
      FILTER regex(?name, "${find}", "i")
    } LIMIT 1000
    `
    var sparqlEndpoint = 'http://localhost:3030/steam/sparql';

    d3.sparql(sparqlEndpoint, QueryFind).then((results) => {
      console.log(results);
      res.render('find', {title : 'Data', games: results});
    });
  }
  catch(err){
    if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
    } else if (err.request) {
        console.log(err.request);
    } else {
        console.error('Error', err.message);
    }
  }
});

module.exports = router;
