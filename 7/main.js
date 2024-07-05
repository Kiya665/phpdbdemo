
function functiontest(){
    document.getElementById('test').innerHTML = '<button type="button" onclick="functiontest2()">b</button>';
}
function functiontest2(){
    document.getElementById('test').innerHTML = '<button type="button" onclick="functiontest()">a</button>';
}
var_dump($_POST);