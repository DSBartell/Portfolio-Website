let pokeURL = 'http://pokeapi.co/api/v2/pokemon/';

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(document.getElementById('helpModal'), '');
  });

function findPokemon()
{
  let pokeSearch = document.getElementById('pokeName').value.toLowerCase();
  let finalURL = pokeURL + pokeSearch;

  var xhr = new XMLHttpRequest();
  xhr.open('GET',finalURL, true);
  xhr.onload = function()
  {
    if(this.status == 200)
    {
      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});
      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      var output = '';
      var pokemonData = JSON.parse(this.responseText);
      console.log(pokemonData);

      if(pokemonData.types.length == 1)
      {
        M.toast({html: 'Found it!'});
        output +=
        `<div class="pokeCard ${pokemonData.types[0].type.name} flow-text z-depth-2">
          <h1>${pokemonData.name}</h1>
          <ul>
            <li><p>Type: ${pokemonData.types[0].type.name}</p></li>

            <div class="row">
              <div class="col s3">
                <li><img src="${pokemonData.sprites.front_default}"></li>
              </div>
              <div class="col s3">
                <li><img src="${pokemonData.sprites.back_default}"></li>
              </div>
              <div class="col s3">
                <li><img src="${pokemonData.sprites.front_shiny}"></li>
              </div>
              <div class="col s3">
                <li><img src="${pokemonData.sprites.back_shiny}"></li>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div id="${pokemonData.name}_chart_div" class="statChart"></div>
              </div>
              <div class="col">
                <ul id="characteristics">
                  <li>Weight: ${pokemonData.weight}kgs.</li>
                  <li>Height: ${pokemonData.height}m</li>
                  <li><img class="responsive-img" id="pokeball" src="masterball.png"></li>
                  <li>Avg. Stat: ${averageStat(pokemonData.stats[0].base_stat,pokemonData.stats[1].base_stat,pokemonData.stats[2].base_stat,pokemonData.stats[3].base_stat,pokemonData.stats[4].base_stat,pokemonData.stats[5].base_stat)}</li>
                </ul>
              </div>
            </div>
          </ul>
         </div>
        `;
      }
      else
      {
        M.toast({html: 'Found it!'});
        output +=
        `<div class="pokeCard dual-type flow-text z-depth-2">
          <h1>${pokemonData.name}</h1>
          <ul>
            <li><p>Types: ${pokemonData.types[0].type.name}, ${pokemonData.types[1].type.name}</p></li>

            <div class="row">
              <div class="col s3">
                <li><img class="responsive-img" src="${pokemonData.sprites.front_default}"></li>
              </div>
              <div class="col s3">
                <li><img class="responsive-img" src="${pokemonData.sprites.back_default}"></li>
              </div>
              <div class="col s3">
                <li><img class="responsive-img" src="${pokemonData.sprites.front_shiny}"></li>
              </div>
              <div class="col s3">
                <li><img class="responsive-img" src="${pokemonData.sprites.back_shiny}"></li>
              </div>
            </div>
          </ul>
          <div class="row">
            <div class="col">
              <div id="${pokemonData.name}_chart_div" class="statChart"></div>
            </div>
            <div class="col">
              <ul id="characteristics">
                <li>Weight: ${pokemonData.weight}kgs.</li>
                <li>Height: ${pokemonData.height}m</li>
                <li>Avg. Stat: ${averageStat(pokemonData.stats[0].base_stat,pokemonData.stats[1].base_stat,pokemonData.stats[2].base_stat,pokemonData.stats[3].base_stat,pokemonData.stats[4].base_stat,pokemonData.stats[5].base_stat)}</li>
                <li><img class="responsive-img" id="pokeball" src="masterball.png"></li>
              </ul>
            </div>
          </div>
         </div>
        `;
      }

      //Add new content
      document.getElementById('content').innerHTML += output;
      scrollDown();
      //drawStatChart();
      function drawChart() {
        let nameCorrection = capitalizeFirstLetter(pokemonData.name);
        // Create the data table.
        var data = google.visualization.arrayToDataTable([
          ['Stat', 'Base Points', { role: 'style' }, { role: 'annotation' } ],
          ['Speed', pokemonData.stats[0].base_stat, '#FF0000', 'Spd' ],
          ['Special Defense', pokemonData.stats[1].base_stat, '#00FF00', 'SpD' ],
          ['Special Attack', pokemonData.stats[2].base_stat, '#0000FF', 'SpA' ],
          ['Defense', pokemonData.stats[3].base_stat, '#FFFF00', 'Def' ],
          ['Attack', pokemonData.stats[4].base_stat, '#00FFFF', 'Atk' ],
          ['Hit Points', pokemonData.stats[5].base_stat, '#FF00FF', 'HP' ]
       ]);
       var options = {'title':nameCorrection + ' Stat Chart',
                         'max-width':300,
                         'max-height':450};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById(pokemonData.name + '_chart_div'));
        chart.draw(data, options);
      }

    }
    else if(this.status == 301)
    {
      M.toast({html: '301: The Request Timed Out'});
    }
    else if(this.status == 403)
    {
      M.toast({html: '403: Access Forbidden'});
      console.log('Access Forbidden: 403');
    }
    else if(this.status == 404)
    {
      M.toast({html: '404: Pokemon not found.'});
      console.log('This page does not exist: 404');
    }
    else
    {
      M.toast({html: 'Something went wrong!'})
    }
  }
  xhr.send();
}

function averageStat(num1, num2, num3, num4, num5, num6)
{
  return ((num1 + num2 + num3 + num4 + num5 + num6)/6).toFixed(2);
}

function capitalizeFirstLetter(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function scrollDown()
{
  //Scroll Down
  window.scrollTo(0,document.body.scrollHeight);
}
