function getTransaction(){
    var transactionId = window.location.search.split('=')[1];

    var settings = {
        "url": "http://34.71.35.187/get/transaction",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "id": transactionId
        })
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

        var name = document.getElementById("username");
        name.innerText = String(response.name);
        var phone = document.getElementById("userphone");
        phone.innerText = String(response.phone);
        var email = document.getElementById("useremail");
        email.innerText = String(response.email);
        var id = document.getElementById("transactionid");
        id.innerText = String(response.id);

        var table = document.getElementById("info_table");

        $.getJSON("http://34.71.35.187/retrieve/seat",function(result){
            $.each(result, function(i, position){
                for(var j=0; j<response.seat.length; j++) {
                    if(position.id == response.seat[j]) {
                        var row = table.insertRow(j+1);

                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);

                        cell1.innerHTML = "2022.03.18 (五) 18:30PM";
                        cell2.innerHTML = "JAMSIL INDOOR STADIUM 蠶室室內體育館";
                        cell3.innerHTML = String(position.area)+String(position.num);

                        if(Number(position.num) > 5 && Number(position.num) < 16)
                            cell4.innerHTML = "1000 元";
                        else
                            cell4.innerHTML = "500 元";
                    }
                }
            });
        });
    }).fail(function(xhr, status, error) {
        alert("查無此訂單，請重新訂購！");
    });
 }