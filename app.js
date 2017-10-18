const url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
const xhr = document.querySelector('#xhr');
const goFetch = document.querySelector('#fetch');
const goAxios = document.querySelector('#axios');
const quote = document.querySelector('#quote');

//XHR Request
xhr.addEventListener('click', function() {
  console.log('XHR Clicked');
  let XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200) {
      let xResponse = JSON.parse(XHR.responseText);
      console.log(xResponse);
      quote.innerHTML = xResponse;
    }
  };

  XHR.open('GET', url);
  XHR.send();
});

//Fetch Request
goFetch.addEventListener('click', function() {
  console.log('Fetch Clicked');
  fetch(url)
    .then(handleErrors)
    .then(getData)
    .catch(printError);
});

let handleErrors = res => {
  if (!res.ok) {
    throw Error(404);
  }
  return res.json();
};

let getData = data => {
  quote.innerHTML = data;
};

let printError = error => console.log(error);

//jQuery Request
$('#jquery').click(function() {
  $.getJSON(url)
    .done(function(data) {
      console.log('JQ Clicked');
      quote.innerHTML = data;
    })
    .fail(function() {
      console.log('ERROR!');
    });
});

//AXIOS
goAxios.addEventListener('click', function() {
  axios
    .get(url)
    .then(function(res) {
      console.log(res);
      quote.innerHTML = res.data[0];
    })
    .catch(function(e) {
      console.log('ERROR', e);
    });
});
