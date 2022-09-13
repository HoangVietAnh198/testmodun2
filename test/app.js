let search = document.getElementById("search");
let tableBox = document.getElementById("tableBox");
let box = document.getElementById("box");
let outPut = document.getElementById("outPut");
outPut.onclick = () => {
  outPut.innerHTML = `<a href="https://vi.wikipedia.org/w/index.php?search=${search.value}&title=%C4%90%E1%BA%B7c_bi%E1%BB%87t%3AT%C3%ACm_ki%E1%BA%BFm&ns0=1">
    <i class="fa-solid fa-magnifying-glass"></i>
</a>`;
};
search.onchange = () => {
  function getData(url, fn) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          fn(undefined, JSON.parse(xhr.responseText));
        } else {
          fn(new Error(xhr.statusText), undefined);
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }
  getData(
    `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${search.value}`,
    function hh(err, res) {
      let state = true;
      if (state == false) {
        console.log(err);
      } else {
        let result = res[1].filter((cor) => {
          return cor.toLowerCase().startsWith(search.value);
        });
        result.forEach((e) => {
          console.log(e);
          getData(
            `https://en.wikipedia.org/w/api.php?
            origin=*&action=query&prop=pageprops|pageimages&format=json&titles=${e}`,
            (err2, res2) => {
              if (err2) {
                console.log(err2);
              } else {
                console.log(res2);
              }
              let name = Object.keys(res2.query.pages);
              let cmt = "wikibase-shortdesc";
              box.innerHTML += `<div class="box">
                    <div class="image">
                        <img src="${res2.query.pages[name].thumbnail.source}" alt="">
                    </div>
                    <div>
                        <h3>${e}</h3>
                        <p>${res2.query.pages[name].pageprops[cmt]}</p>
                    </div>
                </div>`;

              if (search.value === "") {
                tableBox.innerHTML = "";
              }
              box.onclick = () => {
                window.location.href = `https://vi.wikipedia.org/wiki/${e}`;
              };
            }
          );
        });
      }
    }
  );
};
