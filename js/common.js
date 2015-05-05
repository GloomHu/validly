/*
*异步加载脚本
*eg:
*   var script = 'scripts/alert.js';
*   loadjs(script);
*/
function loadjsFn(scriptFilename) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', scriptFilename);
    script.setAttribute('id', 'script-id');

    var scriptElement = document.getElementById('script-id');
    if (scriptElement) {
        document.getElementsByTagName('head')[0].removeChild(scriptElement);
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}
/*
*过滤换行
*/
function stripscript(s) {
    //var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
    var pattern = new RegExp("[\n\r]");
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/*
*格式化日期
*/
function dateboxformatter(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}
/*
*获取当前默认日期
*/
function GetCurDate() {
    //填写默认日期
    var time = new Date();
    var year = time.getYear() < 1900 ? 1900 + time.getYear() : time.getYear();
    var month = time.getMonth() + 1; //系统当前月
    var days = time.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (days < 10) {
        days = "0" + days;
    }
    return year + "-" + month + "-" + days;
}
function createSltAndSetHeightFn(objId, xap, height) {
    $("#" + objId).html("<object  data=\"data:application/x-silverlight-2,\" type=\"application/x-silverlight-2\" style=\"height: "+height+"px; width: 100%\"><param name=\"source\" value=\"" + xap + "\" /><param name=\"onError\" value=\"onSilverlightError\" /><param name=\"background\" value=\"white\" /><param name=\"minRuntimeVersion\" value=\"5.0.61118.0\" /><param name=\"onLoad\" value=\"onSilverlightLoad\" /><param name=\"autoUpgrade\" value=\"true\" /> <param name=\"windowless\" value=\"true\" /><a href=\"http://go.microsoft.com/fwlink/?LinkID=149156&v=5.0.61118.0\" style=\"text-decoration: none\"><img src=\"http://go.microsoft.com/fwlink/?LinkId=161376\" alt=\"获取 Microsoft Silverlight\" style=\"border-style: none\" /></a></object>");
}