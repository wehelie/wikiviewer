const word = document.getElementById('qi');

word.addEventListener('keyup', (evt) => {
  const div = $('.content');
  div.html('')
  if (evt.keyCode == 13) {
    const queryString = word.value;
    const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${word.value}&limit=3&namespace=0&format=json`;
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    fetch(proxyurl + url)
      .then(response => response.json())
      .then((data) => {
        const rv = {};
        for (var i = 0; i < data.length; ++i)
          rv[i] = data[i];
        let str = JSON.stringify(rv);
        str = str.replace(/0/g, 'query');
        str = str.replace(/1/g, 'matches');
        str = str.replace(/2/g, 'text');
        str = str.replace(/3/g, 'link');
        const result = JSON.parse(str);

        for (var i = 0; i < result.matches.length; i++) {
          console.log(result)
          const html = `
            <div class="row">
              <div class="col">
                <h4 class="card-title"><mark> ${result.matches[i] }</mark></h4>
                <p class="card-text">${result.text[i]}</p>
                <a href="${result.link[i]}" class="card-link">Read More...</a>
              </div>
            </div>
            `
        div.append(html)
        }
      })
  }
});
