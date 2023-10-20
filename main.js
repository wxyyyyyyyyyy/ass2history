function calculate() {
    var expressionInput = document.getElementById("expression");
    var expression = expressionInput.value;

    // 使用AJAX将输入字符串发送到后端
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/calculate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            var resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Result: " + result;
        }
    };
    xhr.send(JSON.stringify({ expression: expression }));
}

function retrieveHistory() {
    // 使用AJAX从后端获取历史记录
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/history", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var history = JSON.parse(xhr.responseText);
            var historyDiv = document.getElementById("history");
            historyDiv.innerHTML = ""; // 清空历史记录

            for (var i = 0; i < history.length; i++) {
                var item = history[i];
                var expression = item.expression;
                var result = item.result;

                var historyItemDiv = document.createElement("div");
                historyItemDiv.innerHTML = "Expression: " + expression + ", Result: " + result;
                historyDiv.appendChild(historyItemDiv);
            }
        }
    };
    xhr.send();
}
