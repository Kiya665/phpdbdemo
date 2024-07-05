function getAllStudents() {
    fetch('./list.php')
    .then((response) => {
        if (!response.ok) {
            document.getElementById('list').innerText = 'データが取得できませんでした。';    
            throw new Error("エラーが発生しました");
        } 
        return response.json();
    })
    .then((json) => {
        let html = '<table border="1"><tr><th><button type="button" onclick="deleteStudent()">削除</button></th><th>番号</th><th>氏名</th><th>メールアドレス</th><th>誕生日</th></tr>';
        json.forEach(student => {
            html += '<tr class="table" onclick="deleteCheckClick(' + student.no + ')"><td><input type="checkbox" id="deleteCheck' + student.no + '" name="' + student.no + '" onclick="this.click();"></td><td>' + student.no + '</td><td>' + student.name + '</td><td>' + student.mail + '</td><td>' + student.birthday + '</td></tr>';
        })
        html += '</table>'
        document.getElementById('list').innerHTML = html;    
    })
    .catch((error) => {
        console.log(error);
    });
    document.getElementById('addButton').innerHTML = '<button type="button" onclick="addStudent()">登録</button>';
    document.getElementById('updateButton').innerHTML = '<button type="button" onclick="textAllStudents()">更新画面を表示</button>';
    document.getElementById('searchBox').innerHTML = '<input type="text" id="search" name="keyword" placeholder="名前検索"/>';
}
function deleteCheckClick(no){
    var clickNo = 'deleteCheck' + no;
    document.getElementById(clickNo).click();
}
function getNo(){
    fetch('./getNo.php')
    .then((response) => {
        if (!response.ok) {
            document.getElementById('list').innerText = 'データが取得できませんでした。';    
            throw new Error("エラーが発生しました");
        } 
        return response.json();
    })
    .then((json) =>{
        let html = "";
        let i = 1;
        for(var no in json){
            if(i == json[no].no) i++;
            else{
                html += 'ID：<input type="number" name="no" value="' + i + '"required/><button type="button" onclick="getNo()">番号取得</button><br>氏名：<input type="text" name="name" required/><br>メールアドレス：<input type="email" name="mail" required/><br>生年月日：<input type="date" name="birthday" required/><br><button type="button" onclick="addStudent()">登録</button>';
                break;
            }
        }
        document.getElementById('student').innerHTML = html;
    })
}
function textAllStudents(){
    const formData = new FormData(document.getElementById('searchBox'));
    fetch('./search.php', {
        method: 'POST',
        body: formData 
    })
    .then((response) => {
        if (!response.ok) {
            document.getElementById('list').innerText = 'データが取得できませんでした。';    
            throw new Error("エラーが発生しました");
        }
        return response.json();
    })
    .then((json) => {
        let html = '<table border="1"><tr><th>番号</th><th>氏名</th><th>メールアドレス</th><th>誕生日</th></tr>';
        var i = 1;
        json.forEach(student => {
            html += '<tr><td><input type="text" class="notxt" name="student[' + i + '][no]" value="'+ student.no + '" readonly /></td><td><input type="text" class="nametxt" name="student[' + i + '][name]" value="' + student.name + '" required /></td><td><input type="text" class="mailtxt" name="student[' + i + '][mail]" value="' + student.mail + '" required /></td><td><input type="date" name="student[' + i++ + '][birthday]" value="' + student.birthday + '" required/></td></tr>';
        })
        html += '</table>';
        document.getElementById('list').innerHTML = html;
    })
    .catch((error) => {
        console.log(error);
    })
    document.getElementById('updateButton').innerHTML = '<button type="button" onclick="confUpdate()">確定</button><button type="button" onclick="getAllStudents()">キャンセル</button>';
}
function confUpdate(){
    const formData = new FormData(document.getElementById('list'));
    fetch('./update.php', {
        method: 'POST',
        body: formData
    })
    .then((response) => {
        if (!response.ok) {
            document.getElementById('message').innerText = 'データが更新できませんでした。';    
            throw new Error("エラーが発生しました");
        } else {
            getAllStudents();
            document.getElementById('message').innerText = 'データが更新されました。';
        }
    })
    .catch((error) => {
        console.log(error);
    });
}
function addStudent() {
    const formData = new FormData(document.getElementById('student'));
    fetch('./add.php', {
        method: 'POST',
        body: formData 
    })
    .then((response) => {
        if (!response.ok) {
            document.getElementById('message').innerText = 'データが登録できませんでした。';    
            throw new Error("エラーが発生しました");
        } else {
            getAllStudents();
            document.getElementById('message').innerText = 'データが登録されました。';
        }
    })
    .catch((error) => {
        console.log(error);
    });
}
function deleteStudent() {
    const formData = new FormData(document.getElementById('list'));
    fetch('./delete.php', {
        method: 'POST',
        body: formData 
    })
    .then((response) => {
        if (!response.ok) {
            document.getElementById('message').innerText = 'データが削除できませんでした。';    
            throw new Error("エラーが発生しました");
        } else {
            getAllStudents();
            document.getElementById('message').innerText = 'データが削除されました。';
        }
    })
    .catch((error) => {
        console.log(error);
    });
}
function nameSearch(){
    const formData = new FormData(document.getElementById('searchBox'));
    fetch('./search.php', {
        method: 'POST',
        body: formData 
    })
    .then((response) => {
        if (!response.ok) {
            document.getElementById('message').innerText = '検索できませんでした。';    
            throw new Error("エラーが発生しました");
        }
        return response.json();
    })
    .then((json) => {
        let html = "";
        if(document.getElementById('button').innerHTML == '<button type="button" onclick="confUpdate()">確定</button><button type="button" onclick="getAllStudents()">キャンセル</button>'){
            html += '<table border="1"><tr><th>番号</th><th>氏名</th><th>メールアドレス</th><th>誕生日</th></tr>';
            var i = 1;
            json.forEach(student => {
                html += '<tr class="table"><td><input type="text" class="notxt" name="student[' + i + '][no]" value="'+ student.no + '" readonly /></td><td><input type="text" class="nametxt" name="student[' + i + '][name]" value="' + student.name + '" required /></td><td><input type="text" class="mailtxt" name="student[' + i + '][mail]" value="' + student.mail + '" required /></td><td><input type="date" name="student[' + i++ + '][birthday]" value="' + student.birthday + '" required/></td></tr>';
        })
        }else{
            html += '<table border="1"><tr><th><button type="button" onclick="deleteStudent()">削除</button></th><th>番号</th><th>氏名</th><th>メールアドレス</th><th>誕生日</th></tr>';
            json.forEach(student => {
                html += '<tr class="table" onclick="deleteCheckClick(' + student.no + ')"><td><input type="checkbox" id="deleteCheck' + student.no + '" name="' + student.no + '" onclick="this.click();"></td><td>' + student.no + '</td><td>' + student.name + '</td><td>' + student.mail + '</td><td>' + student.birthday + '</td></tr>';
            })
        }
        html += '</table>'
        document.getElementById('list').innerHTML = html;    
    })
    .catch((error) => {
        console.log(error);
    });
}

let searchBox = document.getElementById('searchBox');
searchBox.addEventListener('keyup', nameSearch);
window.addEventListener("load",getAllStudents);
