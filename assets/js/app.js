function fillWithChilds(el, N){
    function rand(n){
        /* weight=100 means no random
           weight=0 means totally random  */
        var weight = 50;
        return ((weight*n/2+n*(100-weight)*Math.random())|0)/100;
    }
    function main(N, x, y, hei, wid){
        if(N===1){
            var child = document.createElement('div');
            child.className = 'grid';
            child.setAttribute('style', 'top:'+y+'px; left:'+x+'px; height:'+hei+'px; width:'+wid+'px');
            el.appendChild(child);
            return;
        }
        var halfN = N/2|0;
        if(wid > hei){
            var newWid = rand(wid);
            if(2*newWid > wid) halfN = N-halfN;
            main(halfN, x, y, hei, newWid);
            main(N-halfN, x+newWid, y, hei, wid-newWid);
        }else{
            var newHei = rand(hei);
            if(2*newHei > hei) halfN = N-halfN;
            main(halfN, x, y, newHei, wid);
            main(N-halfN, x, y+newHei, hei-newHei, wid);
        }
    }
    main(N, 0, 0, el.clientHeight, el.clientWidth);
}

fillWithChilds(document.getElementById('board'), 4);


function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'assets/js/album.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }

var pictures = [];
var album_dir = 'assets/images/album/'
loadJSON(function(response) {
  // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    pictures = actual_JSON.images;
    for (var i = 0; i < pictures.length; i++) {
        pictures[i] = album_dir + pictures[i];
    };
    load_random_pics(pictures);
});

function load_random_pics(pictures) {
    var grids = $('.grid');
    grids.each(function(index) {
        image = pictures[getRandomIntInclusive(0, pictures.length-1)];
        $(grids[index]).addClass('grid-photo');
        $(grids[index]).css('background-image', 'url('+image+')');
    });
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
