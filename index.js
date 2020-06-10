const apiKey = 'd6caa3198ff0486db3244380c7899b9f';

const searchURL = 'https://newsapi.org/v2/everything';

//watch for the form submission
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNews(searchTerm, maxResults);
  });
}

$(watchForm);

function getNews(query, maxResults = 10) {
  //create the query parameters
  const params = {
    apiKey,
    q: query,
    language: "en",
    pageSize: maxResults
  };
  //create a string with the original URL and the new parameters
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
    // the new code starts here
      if (response.ok) {
        return response.json();
      }
      console.log(response)
      throw new Error(response.status);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message} error!`);
    });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.articles.length & i < maxResults; i++) {
    $('#results-list').append(
      `<li><h3><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
      <p>${responseJson.articles[i].source.name}</p>
      <p>By ${responseJson.articles[i].author}</p>
      <p>${responseJson.articles[i].description}</p>
      <img src='${responseJson.articles[i].urlToImage}'>
      </li>`
    )
  };
  $('#results').removeClass('hidden');
};



