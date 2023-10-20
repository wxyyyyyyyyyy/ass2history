const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "calculator"
});

connection.connect((error) => {
    if (error) {
        console.error("Error connecting to database: " + error.stack);
        return;
    }
    console.log("Connected to database");
});

app.all("*", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", req.get("Origin")); // 添加这一行代码，代理配置不成功
    res.setHeader("Access-Control-Allow-Methods", 'POST, GET, OPTIONS, DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since")
    next();
})
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post("/saveResult", (req, res) => {
    console.log(req.body, 'bod');
    const expression = req.body.expression;
    const result = eval(expression);

    // 将输入字符串和结果存储在数据库中
    const sql = "INSERT INTO history (expression, result) VALUES (?, ?)";
    connection.query(sql, [expression, result], (error, results) => {
        if (error) {
            console.error("Error inserting into database: " + error.stack);
            res.sendStatus(500);
            return;
        }
        res.send(result.toString());
    });
});

app.get("/getPreviousResults", (req, res) => {
    // 从数据库中获取历史记录
    const sql = "SELECT * FROM history ORDER BY id DESC LIMIT 10";
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error selecting from database: " + error.stack);
            res.sendStatus(500);
            return;
        }
        res.send(results);
    });
});

app.post("/removePreviousResults", (req, res) => {
    const sql = "TRUNCATE TABLE history"
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error selecting from database: " + error.stack);
            res.sendStatus(500);
            return;
        }
        res.send(results)
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
