$(document).ready(function () { 
    const th = `<tr>
                    <th>工号</th>
                    <th>用户名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>手机号</th>
                    <th>电子邮箱</th>
                    <th>密码</th>
                    <th>角色名称</th>
                    <th>权限名称</th>
                    <th>操作</th>
                </tr>`;

    let pageSize=10;
    let pageN0=1;
    $("#emp").empty();
    let url = "http://localhost:8080/emp/page";

    function page() {
        let obj = {
            pageSize :pageSize,
            pageNo :pageN0
        }
        console.log(obj);
        ajaxTest(url,"GET",obj,function (data){
            //截取JSON字符串的值
            let emps = eval("("+data+")");
            $("#total").html("总数据:"+emps.pageNum*pageSize > emps.total ? emps.total : emps.pageNum*pageSize+"/"+emps.total+"条");
            // $("#pages").html("总页数:"+emps.pages+"页");
            $("#pages").val(emps.pages);
            $("#pageNum").html("当前页码:"+emps.pageNum+"/"+emps.pages+"页");
            $("#pageNum").val(emps.pageNum);
            // $("#size").html("页面容量:"+emps.size+"条");
            let wh = emps.list;
            console.log(wh);
            let arr = [];
            arr.push(th);
            wh.forEach(function (emp){
                arr.push(`<tr>
                            <td>${emp.id}</td>
                            <td>${emp.name}</td>
                            <td>${emp.gender}</td>
                            <td>${emp.age}</td>
                            <td>${emp.userName}</td>
                            <td>${emp.userMail}</td>
                            <td>${emp.passWord}</td>
                            <td>${emp.roleName}</td>
                            <td>${emp.perName}</td>
                            <td><a data-id="${emp.id}" id="ad" class="item-childs">删除人员</a></td>
                        </tr>`);
            });
            $("#table").html(arr.join(""));
        })
    }
    page();
    //删除
    $("#table").on("click", "[data-id]", function () {
        let token = sessionStorage.getItem('token');
        console.log(token);
        $.ajax({
            type: "Delete",
            url: "http://localhost:8080/shiro/delete",
            headers: {'Authorization': token},
            data: {id: $(this).data("id")},
            dataType: "JSON",
            success: function (data) {
                console.log(data);
                alert(data == 1 ? "删除成功" : "删除失败");
                if(data == 1)
                {
                    page();
                }
            },
            error: function () {
                alert("请求失败");
            }
        });
    })
    //下一页
    $("#boot").click(function() {
        pageN0++;
        $("#butt").attr("disabled",false);
        let dang = $("#pageNum").val();
        let a = $("#pages").val();
        // console.log(dang,a);
        if(dang==a-1)
        {
            $("#boot").attr('disabled',true);
        }
        page();
    })
    // 上一页
    $("#butt").click(function(){
        pageN0--;
        $("#boot").attr("disabled",false);
        let dang = $("#pageNum").val();
        // console.log(dang);
        if(dang==1+1)
        {
            $("#butt").attr('disabled',true);
        }
        page();
    })
    //首页
    $("#shou").click(function(){
        //关闭上一页按钮
        $("#boot").attr("disabled",false);
        //开启下一页按钮
        $("#butt").attr('disabled',true);
        pageN0=1;
        page();
    })
    //尾页
    $("#wei").click(function(){
        //开启上一页按钮
        $("#butt").attr("disabled",false);
        //关闭下一页按钮
        $("#boot").attr('disabled',true);
        let ao = $("#pages").val();
        pageN0 = ao;
        page();
    })

//增加用户信息
    $("#bbba").click(function(){
        let name = $("#put").val();
        let gen = $("#put1").val();
        let age = $("#put2").val();
        let phone = $("#put3").val();
        let mail = $("#put4").val();
        let pass = $("#put5").val();
        let role = $("#put6").val();

        let url = "http://localhost:8080/shiro/add";
        let obj = {
            name: name,
            gender: gen,
            age: age,
            userName: phone,
            userMail: mail,
            passWord: pass,
            roleId: role
        }

        let token = sessionStorage.getItem('token');
        console.log(token);

        $.ajax({
            type: "POST",
            url: url,
            headers: {'Authorization': token},
            data: obj,
            dataType: "JSON",
            success: function (data) {
                console.log(data);
                if(data==1)
                {
                    alert("添加成功");
                }
                else{
                    alert("添加失败");
                }
            },
            error: function () {
                alert("请求失败")
              }
        });
    })

    $("blll").click(function(){
        $("#update").toggle();
    })

    // $("#userInfo").click(function(){

    // })
});











