window.onload=function() {
    XHR("/data.json", function (data) {
        addContent(JSON.parse(data));
    });
};

document.getElementById("min_price").oninput = function () {
    filter();
};
document.getElementById("max_price").oninput = function () {
    filter();
};
document.getElementById("All").onclick = function () {
    filter();
};
document.getElementById("New").onclick = function () {
    filter();
};
document.getElementById("Used").onclick = function () {
    filter();
};
document.getElementById("all_time").onclick = function () {
    filter();
};
document.getElementById("less_then3_day").onclick = function () {
    filter();
};
document.getElementById("more_then3_day").onclick = function () {
    filter();
};
document.getElementById("more_day").onclick = function () {
    filter();
};
function filter(){
    var minPrice = document.getElementById("min_price").value||0;
    var maxPrice = document.getElementById("max_price").value||10000000;
    var condition= document.querySelector('input[name="condition"]:checked').value;
    var time     = document.querySelector('input[name="end_time"]:checked').value;
    console.log(time);
    XHR("/data.json", function (data) {
        var parsedData = JSON.parse(data);
        var sortDate = parsedData.goods.filter(function (item) {
            return (item.history[item.history.length - 1].price > minPrice)&&(item.history[item.history.length - 1].price < maxPrice);
        }).filter(function (item) {
            switch (condition) {
                case "All":
                    return true;
                case "New":
                    return item.used;
                case "Used":
                    return !item.used;
                default:
                    return true;
            }
        }).filter(function (item){
            switch (time) {
                case "all":
                    return true;
                case "less_then3_day":
                    return differenceDate( Date.parse(item.endTime),new Date ).day<3;
                case "more_then3_day":
                    return differenceDate( Date.parse(item.endTime),new Date ).day<7&&differenceDate( Date.parse(item.endTime),new Date ).day>=3;
                case "more_day":
                    return differenceDate( Date.parse(item.endTime),new Date ).day>=7;
                default:
                    return true;
            }
        });
        if (sortDate.length > 1) {
            addContent({goods: sortDate});
        }
        else{
            document.getElementById("goods").innerHTML="<p>No mutch found</p>";
            document.getElementById("pages").innerHTML="";
        }
    });
}

function addContent(db) {
    var addList=[];
    for(var i=0;i<db.goods.length/10;i++)
    {
        addList.push(db.goods.slice(i*10,10*i+10));
    }
    document.getElementById("pages").onclick = function(selectButton) {
        showCarts(addList[selectButton.target.value-1]);
    };
    showCarts(addList[0]);
    if(Math.ceil(db.goods.length/10)>0){
        addPageButton(Math.ceil(db.goods.length/10));
    }
}

function addPageButton(n){
    var res="";
    for(var i=1;i<=n&&n>1;i++){
        res+="<button class=\"pageButton\" id=\"pages"+i+"\" value=\""+i+"\">"+i+"</button>\n"
    }
    document.getElementById("pages").innerHTML=res;
}

function showCarts(db){
    var res="";
    for(var i=0;i<db.length;i++){
        res+=craateCarts(db[i]);
    }
    document.getElementById("goods").innerHTML=res;
}

function craateCarts(goods){
    var time=differenceDate(Date.parse(goods.endTime),new Date);
    return "<div class=\"card\"> " +
    "    <div class=\"pic\"><img src="+goods.pic[0]+" alt=\""+goods.name+"\"></div> " +
    "    <div class=\"name\"><a href=\""+goods.url+"#id"+goods.id+"\" terget=\"_self\">"+goods.name+"</a></div> " +
    "    <div class=\"timer\">"+time.day+"d "+time.hours+"h "+time.minutes+"m"+"</div> " +
    "    <div class=\"price_now\">"+goods.history[goods.history.length-1].price+"$"+"</div> " +
    "    <div><p></p></div> " +
    "</div>";
}

function differenceDate(firstDate,secondDate){
    var difference=Math.abs(firstDate- secondDate);
    var day=Math.floor(difference/(86400000));
    var hours=Math.floor((difference-day*86400000)/(3600000));
    var minutes=Math.floor((difference-day*86400000-hours*3600000)/(60000));
    return {
        "day":day,
        "hours":hours,
        "minutes":minutes
    }
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