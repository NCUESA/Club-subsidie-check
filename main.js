var spreadsheet_id = "", // 填入試算表 ID
    tab_name = "", // 填入工作表名稱
    api_key = "", // 填入 API 金鑰
    url = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheet_id + "/values/" + tab_name + "?key=" + api_key;
var data = [];
$.getJSON(url, function (json) {
    var values = json.values; // 所有試算表資料
    values.forEach(function (rows) {
        var datarow = [];
        rows.forEach(function (item) {
            datarow.push(item);
        });
        data.push(datarow);
    });
});
var result = [];
function search(data, target) {
    //宣告變日數都是 索引值 index
    result = []
    let start = 2
    for (start = 2; start < data.length; start++) {
        if (target == data[start][20])
            result.push(start)
    }
    if (result.length === 0)
        return -1  //未找到回傳 -1
    else
        return 0
}
function check() {
    var inputdata = document.getElementById("password").value;
    if (search(data, inputdata) == -1)
        alert('密碼輸入錯誤。')
    else {
        html = ""
        html += "<table border=\"1\">" +
            "<tbody>" +
            "<tr>" +
            "<td colspan=\"5\" style=\"text-align: center;background-color: orange;\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">初審（財務部）</span></span></strong></span></td>" +
            "<td colspan=\"3\" style=\"text-align: center;background-color: orange;\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">複審（會長部）</span></span></strong></span></td>" +
            "<td colspan=\"5\" style=\"text-align: center;background-color: orange;\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">活動資料</span></span></strong></span></td>" +
            "</tr>" +
            "<tr>" +
            "<td width=\"85px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">審核人</span></span></strong></span></td>" +
            "<td width=\"120px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">審核日期</span></span></strong></span></td>" +
            "<td width=\"120px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">審核結果</span></span></strong></span></td>" +
            "<td width=\"70px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">通過金額</span></span></strong></span></td>" +
            "<td width=\"70px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">實際核銷金額</span></span></strong></span></td>" +
            "<td width=\"85px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">審核人</span></span></strong></span></td>" +
            "<td width=\"120px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">審核日期</span></span></strong></span></td>" +
            "<td width=\"120px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">審核結果</span></span></strong></span></td>" +
            "<td width=\"100px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">申請進度</span></span></strong></span></td>" +
            "<td width=\"100px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">匯款金額</span></span></strong></span></td>" +
            "<td width=\"100px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">備註</span></span></strong></span></td>" +
            "<td width=\"110px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">活動名稱</span></span></strong></span></td>" +
            "<td width=\"110px\" style=\"text-align: center;background-color: rgb(217, 210, 233);\"><span style=\"color:#000000;\"><strong><span style=\"font-size:16px;\"><span style=\"font-family:times new roman,標楷體;\">活動日期</span></span></strong></span></td>" +
            "</tr>"
        for (i = 0; i < result.length; i++) {
            html += "<tr>";
            for (j = 0; j < 13; j++) {
                if (j == 3 || j == 9)
                    continue
                if (j == 10 && data[result[i]][j] === "")
                    data[result[i]][j] = "尚未審核"
                html += "<td><span style=\"font-size:16px;\"><span style=\"color:#000000;\"><span style=\"font-family:times new roman,標楷體;\">" + data[result[i]][j] + "</span></span></span></td>";
            }
            html += "<td><span style=\"font-size:16px;\"><span style=\"color:#000000;\"><span style=\"font-family:times new roman,標楷體;\">" + data[result[i]][18] + "</span></span></span></td>";
            html += "<td><span style=\"font-size:16px;\"><span style=\"color:#000000;\"><span style=\"font-family:times new roman,標楷體;\">" + data[result[i]][19] + "</span></span></span></td>";
            html += "</tr>";
        }
        html += "</tbody></table>"
        $("#checkStatus").html(html);
    }
}
$(document).ready(function () {
    $("#password").keyup(function (event) {
        if (event.which === 13) {
            $("#sub").click();
        }
    });

    $("#sub").click(function () {
        check();
    })
});