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

    SELECT ?name ?release_date  ?category ?publisher_name ?publisher_location ?developer_name ?developer_location
    WHERE{
      ?id a :Games .
      ?id :name ?name .
      ?id :publishedBy ?publisher .
      ?id :developedBy ?developer .
  	  ?id :release_date ?release_date .
  	  ?id :category ?category .
      ?developer :developer-name ?developer_name .
  	  ?developer :developer-location ?developer_location .
      ?publisher :publisher-name ?publisher_name .
  	  ?publisher :publisher-location ?publisher_location .
    } 
	ORDER BY ?publisher_name
	LIMIT 1000
    `;
    var sparqlEndpoint = 'http://localhost:3030/steamgames/sparql';
    
    d3.sparql(sparqlEndpoint, Query).then((results) => {
      console.log(results);
      res.render('pubname', {title : 'Data', games: results});
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

module.exports = router;