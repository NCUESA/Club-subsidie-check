$(document).ready(function () {
    // --- Google Sheets API 設定 ---
    var spreadsheet_id = "1HPZ6lbAu615E3JEnxIO4SHDVUWQu2FtZvGtXDQC9rhM",
        tab_name = "sheet2",
        api_key = "AIzaSyD4Oxgb4ZMw6zt-41DZXQZzyxquiAKd1yc",
        url = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheet_id + "/values/" + tab_name + "?key=" + api_key;

    var data = [];

    $.getJSON(url, function (json) {
        if (json.values) {
            data = json.values;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        let errorText = "無法載入資料，請檢查網路連線。";
        const errorElement = $(".club-subsidy-inquiry-app #error-message");
        if (errorThrown && errorThrown.includes("API key not valid")) {
            errorText = "無法載入資料，API 金鑰設定錯誤或權限不足。";
        }
        errorElement.text(errorText).css('visibility', 'visible');
    });

    var resultIndexes = [];

    function search(data, target) {
        resultIndexes = [];
        for (let i = 2; i < data.length; i++) {
            if (data[i] && data[i][20] === target) {
                resultIndexes.push(i);
            }
        }
        return resultIndexes.length > 0;
    }

    function buildResultsTable(table, indexes, data) {
        table.empty();
        const thead = $('<thead>');
        thead.append(
            $('<tr class="super-header">').append(
                $('<th colspan="5">').text('初審（財務部）'),
                $('<th colspan="3">').text('複審（會長部）'),
                $('<th colspan="5">').text('活動資料')
            )
        );
        thead.append(
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
        indexes.forEach(function (rowIndex) {
            const rowData = data[rowIndex];
            const tr = $('<tr>');
            const columns = [
                { data: rowData[0] }, { data: rowData[1] },
                { data: rowData[2] }, { data: rowData[4] },
                { data: rowData[5] }, { data: rowData[6] },
                { data: rowData[7] }, { data: rowData[8] },
                { data: (rowData[10] || "尚未審核") },
                { data: rowData[11] }, { data: rowData[12] },
                { data: rowData[18] }, { data: rowData[19] }
            ];
            columns.forEach(col => {
                tr.append($('<td>').text(col.data || ''));
            });
            tbody.append(tr);
        });
        table.append(tbody);
    }

    function check() {
        var password = $("#password").val();
        var errorMessage = $("#error-message");
        var resultsContainer = $("#results-container");
        var table = $("#checkStatus");
        errorMessage.text("").css('visibility', 'hidden');

        if (!password) {
            errorMessage.text("請輸入密碼。").css('visibility', 'visible');
            return;
        }
        if (search(data, password)) {
            buildResultsTable(table, resultIndexes, data);
            resultsContainer.slideDown().removeClass('hidden');
        } else {
            errorMessage.text("密碼輸入錯誤或查無資料。").css('visibility', 'visible');
            resultsContainer.slideUp();
        }
    }

    $("#sub").click(check);
    $("#password").keyup(function (event) {
        if (event.which === 13) {
            $("#sub").click();
        }
    });
});