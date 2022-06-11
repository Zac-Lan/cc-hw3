var row = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var choose_record = [];
var choose_count = 0;

function positionChoose(position) {
  var choose = document.getElementById(String(position)).checked;
  var div = document.getElementById("choose_seat");
  var choose_text = "", choose_detail = "";
  var block;

  if (choose) {
    choose_record.push(position);
    choose_count += 1;

    if(choose_count == 4) {
      for(var i=1; i<21; i++)
        row.forEach(function(r) {
          var seat = String(r) + String(i);
          document.getElementById(seat).disabled = true;
        });

      choose_record.forEach(function(p) {
        document.getElementById(String(p)).disabled = false;
      });
    }
  } else {
    choose_record = choose_record.filter(function(p) {
      return p !== position;
    });

    if(choose_count == 4) {
      for(var i=1; i<21; i++)
        row.forEach(function(r) {
          var seat = String(r) + String(i);
          document.getElementById(seat).disabled = false;
        })
    }

    choose_count -= 1;
  }

  choose_record.forEach(function(p) {
    choose_text = choose_text + p + " ";

    if(Number(p.substring(1)) > 5 && Number(p.substring(1) < 16))
      choose_detail = choose_detail + "中間2區　" + p + "\n";
    else if(Number(p.substring(1)) < 6)
      choose_detail = choose_detail + "左側1區　" + p + "\n";
    else
      choose_detail = choose_detail + "右側3區　" + p + "\n";
  });

  for(var i=1; i<4; i++) {
    block = document.getElementById("information_" + i);
    block.innerText = "已選擇座位：" + String(choose_text);
  }
  div.innerText = String(choose_detail);
}

function seatSubmit() {
  var seat = "";
  var url = window.location.href.split('position.html')[0];

  choose_record.forEach(function(p) {
    seat = seat + p + "_";
  });
  window.location.href = url + 'information.html?seat=' + seat;
}

function setSeatStatus() {
  $.getJSON("http://34.71.35.187/retrieve/seat",function(result){
    $.each(result, function(i, position){
      //console.log(position);

      if(position.transactionId != '') {
        var seat = String(position.area) + String(position.num);
        console.log(seat);
        document.getElementById(seat).disabled = true;
      }
    });
  });
}