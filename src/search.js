var searchInput = document.getElementById("searchValue");
searchInput.oninput = function () {
    if(searchInput.value.length>2){
        XHR("/src/data.json", function (data) {
            var s=search(searchInput.value, JSON.parse(data));
            if(s.goods.length!==0||s.typeOfGoods.length!==0){
                document.getElementById("search-result").style.display = 'block';
                showSearchResults(s);
            }
            else{
                document.getElementById("search-result").style.display = 'none';
            }
        });
    }
    else{
        document.getElementById("search-result").style.display = 'none';
    }
};

function showSearchResults(searchResults){
    var res="";
    console.log(searchResults);
    for(var i=0;i<2&&i<searchResults.typeOfGoods.length;i++){
        res+='<div class="search-category search-result"><a href="'+searchResults.typeOfGoods[i].link+'">'+searchResults.typeOfGoods[i].name+'<a></div>'
    }
    for(var j=0;j<8&&j<searchResults.goods.length;j++){
        res+='<div class="search-goods search-result"><a href="'+searchResults.goods[j].link+'">'+searchResults.goods[j].name+'<a></div>'
    }
    document.getElementById("search-result").innerHTML=res;
}

function search(searchValue, db) {
    var searchResults={
        goods:[],
        typeOfGoods:[]
    };
    var s=searchValue.toUpperCase();
    for(var j=0; j<db.category.length;j++){
        if((db.category[j].categoryName).toUpperCase().indexOf(s)>=0){
            searchResults.typeOfGoods.push({"name":db.category[j].categoryName,"link":db.category[j].url})
        }
    }
    for (var i = 0; i < db.goods.length; i++) {
        if((db.goods[i].name).toUpperCase().indexOf(s)>=0){
            searchResults.goods.push({"name":db.goods[i].name, "link":db.goods[i].url+"#id"+db.goods[i].id})
        }
    }
    return searchResults;
}

function XHR(file, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.open('GET', file, true);
    xhr.send();
}