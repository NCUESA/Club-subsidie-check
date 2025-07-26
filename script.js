$(document).ready(function () {
    // --- Google Sheets API 設定 ---
    var spreadsheet_id = ""; // 填入試算表 ID
    var tab_name = "";       // 填入工作表名稱
    var api_key = "";        // 填入 API 金鑰
    var url = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheet_id + "/values/" + tab_name + "?key=" + api_key;

    var data = [];

    // --- 取得 Google Sheets 資料 ---
    $.getJSON(url, function (json) {
        if (json.values) {
            data = json.values; // 所有試算表資料
        }
    }).fail(function(){
        // 如果 API 無法載入，給予提示
        $("#error-message").text("無法載入資料，請檢查 API 金鑰或網路連線。");
    });

    var resultIndexes = [];

    // --- 搜尋函式 ---
    function search(data, target) {
        resultIndexes = []; // 重設結果
        // 從第三行開始搜尋 (索引值為 2)
        for (let i = 2; i < data.length; i++) {
            // 假設密碼在第 21 欄 (索引值 20)
            if (data[i][20] === target) {
                resultIndexes.push(i);
            }
        }
        return resultIndexes.length > 0;
    }

    // --- 檢查密碼並顯示表格 ---
    function check() {
        var password = $("#password").val();
        var errorMessage = $("#error-message");
        var resultsContainer = $("#results-container");
        var table = $("#checkStatus");

        errorMessage.text(""); // 清除舊的錯誤訊息

        if (!password) {
            errorMessage.text("請輸入密碼。");
            return;
        }

        if (search(data, password)) {
            // 密碼正確，開始建立表格
            table.empty(); // 清空舊的表格內容

            const thead = $('<thead>').append(
                $('<tr>').append($('<th colspan="5">').text('初審（財務部）')),
                $('<tr>').append($('<th colspan="3">').text('複審（會長部）')),
                $('<tr>').append($('<th colspan="5">').text('活動資料')),
                $('<tr>').append(
                    $('<th>').text('審核人'),
                    $('<th>').text('審核日期'),
                    $('<th>').text('審核結果'),
                    $('<th>').text('通過金額'),
                    $('<th>').text('實際核銷金額'),
                    $('<th>').text('審核人'),
                    $('<th>').text('審核日期'),
                    $('<th>').text('審核結果'),
                    $('<th>').text('申請進度'),
                    $('<th>').text('匯款金額'),
                    $('<th>').text('備註'),
                    $('<th>').text('活動名稱'),
                    $('<th>').text('活動日期')
                )
            );
            table.append(thead);

            const tbody = $('<tbody>');
            resultIndexes.forEach(function (rowIndex) {
                const rowData = data[rowIndex];
                const tr = $('<tr>');

                const columns = [
                    { data: rowData[0], label: "初審-審核人" },
                    { data: rowData[1], label: "初審-審核日期" },
                    { data: rowData[2], label: "初審-審核結果" },
                    // 跳過索引 3
                    { data: rowData[4], label: "通過金額" },
                    { data: rowData[5], label: "實際核銷金額" },
                    { data: rowData[6], label: "複審-審核人" },
                    { data: rowData[7], label: "複審-審核日期" },
                    { data: rowData[8], label: "複審-審核結果" },
                     // 跳過索引 9
                    { data: (rowData[10] || "尚未審核"), label: "申請進度" },
                    { data: rowData[11], label: "匯款金額" },
                    { data: rowData[12], label: "備註" },
                    { data: rowData[18], label: "活動名稱" },
                    { data: rowData[19], label: "活動日期" }
                ];
                
                columns.forEach(col => {
                    tr.append($('<td>').attr('data-label', col.label).text(col.data || ''));
                });

                tbody.append(tr);
            });
            table.append(tbody);

            // 顯示結果區
            resultsContainer.slideDown().removeClass('hidden');

        } else {
            // 密碼錯誤
            errorMessage.text("密碼輸入錯誤或查無資料。");
            resultsContainer.slideUp(); // 隱藏結果
        }
    }

    // 按下確認按鈕
    $("#sub").click(function () {
        check();
    });

    // 在密碼框按下 Enter 鍵
    $("#password").keyup(function (event) {
        if (event.which === 13) { // 13 是 Enter 鍵的 keycode
            $("#sub").click();
        }
    });
});