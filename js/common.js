function ajaxTest(url,type,param,callback) {
    $.ajax({
        url:url,
        type:type,
        data:param,
        datatype:"JSON",
        success:function (data) {
            callback(data);
        },
        error:function () {
            alert("请求失败");
        }
    })
}