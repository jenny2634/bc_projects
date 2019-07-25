//모듈화 => 누구나 사용할 수 있다
//npm i --save mysql를 반드시 수행할것
var mysql = require('mysql');

exports.selectLogin = (uid,upw,cb) =>{

    //개발디비
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'nodedb'
    });
    //상용디비
    // var connection = mysql.createConnection({
    //         host: 'node-db.cgo1t78667uf.ap-northeast-2.rds.amazonaws.com',
    //         user: 'root',
    //         password: 'mysql1234',
    //         database: 'nodedb'
    //      });
    connection.connect((err) => {
        if (err) {
            console.log('db 접속 오류', err)
        }
        else {
            let sql =`SELECT * FROM users WHERE uid=? AND upw=?;`
            connection.query(sql, [uid,upw],(err,rows)=>{
                //console.log(err,rows[0].name)
                cb(err,rows)
                connection.end();
            })
        
        }  
    });
}
//불매 상품 목록 이름순으로 전부다 가져오기 함수
exports.selectNoSellData = (cb) =>{
    //개발디비
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'nodedb'
    });
    connection.connect((err) => {
        if (err) {
            //console.log('db 접속 오류', err)
            cb(err,[])
        }
        else {
            let sql =`SELECT * FROM nosell ORDER BY NAME ASC;`
            connection.query(sql,(err,rows)=>{
                cb(err,rows)
                connection.end();
            })
        }  
    });
}
//검색어를 포함한 데이터를 획득하는 쿼리 수행
//cb:콜백함수 -> js상 비동기 프로그램에서 결과를 돌려줄때 함수를 인자로 받는다
//keyword:검색어
exports.selectItemsByKeyword = (keyword, cb) =>{
    //개발디비
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'nodedb'
    });
    connection.connect((err) => {
        if (err) {
            cb(err,[])
        }
        else {
            // ? => '값'
            // sql 완성에 반드시 파라미터를 전달해서 완성할 필요는 없다.
            // 문자열을 완성시키는것만으로도 동일한 결과를 낸다.
            let sql =`SELECT * FROM nosell
            WHERE chgName LIKE '%${keyword}%' 
            or NAME LIKE '%${keyword}%' 
            or HASH LIKE '%${keyword}%'
            ORDER BY NAME ASC;`
            connection.query(sql,(err,rows)=>{
                cb(err,rows)
                connection.end();
            })
        }  
    });
}

exports.selectItemsByNo = (no, cb) =>{
    //개발디비
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'nodedb'
    });
    connection.connect((err) => {
        if (err) {
            cb(err,[])
        }
        else {
            let sql =`SELECT * FROM nosell WHERE NO = ?;`
            connection.query(sql,[no],(err,rows)=>{
                cb(err,rows)
                connection.end();
            })
        }  
    });
}



