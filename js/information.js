var seat = [];
var seatId = [];

function getSeat() {
    var table = document.getElementById("info_table");
    var seatString = window.location.search.split('=')[1];
    seat = seatString.split('_');

    console.log(seat);

    for(var i=0; i<seat.length-1; i++) {
        var row = table.insertRow(i+1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = "2022.03.18 (五) 18:30PM";
        cell2.innerHTML = "JAMSIL INDOOR STADIUM 蠶室室內體育館";
        cell3.innerHTML = seat[i];

        if(Number(seat[i].substring(1)) > 5 && Number(seat[i].substring(1) < 16))
            cell4.innerHTML = "1000 元";
        else
            cell4.innerHTML = "500 元";
    }
}

function checkInput() {
    var name = document.getElementById("name");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");

    let phoneFormat = /^0[0-9]{9}$/;
    let emailFormet = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

    if(name.value == "") {
        alert("姓名部分不得為空");
        return;
    }        

    if(phone.value == "") {
        alert("連絡電話不得為空");
        return;
    }
    else if(!phoneFormat.test(phone.value)) {
        alert("連絡電話格式有誤");
        return;
    }
        
    if(email.value == "") {
        alert("聯絡信箱不得為空");
        return;
    }
    else if(!emailFormet.test(email.value)) {
        alert("聯絡信箱格式有誤");
        return;
    }

    orderSubmit();
}

function orderSubmit() {
    var name = document.getElementById("name");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");

    $.getJSON("http://34.71.35.187/retrieve/seat",function(result){
        $.each(result, function(i, position){
            var s = String(position.area) + String(position.num);

            for(var i=0; i<seat.length-1; i++) {
                if(s == seat[i])
                    seatId.push(String(position.id));
            }
        });
        
        var settings = {
            "url": "http://34.71.35.187/create/transaction",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "email": email.value,
                "name": name.value,
                "phone": phone.value,
                "seat": seatId
            })
        };

        $.ajax(settings).done(function (response) {
            console.log(response.id);

            var url = window.location.href.split('information.html')[0];
            window.location.href = url + 'result.html?transactionId=' + response.id;
        }).fail(function(xhr, status, error) {
            console.log(error);
            alert("選取的位置已被預訂，請重新選位！");
        });
    });
}