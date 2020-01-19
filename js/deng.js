$(document).ready(function(){

    $("#deng").mouseover(function () { 
        $(this).css("background-color","cornflowerblue");
    }).mouseout(function () { 
        $(this).css("background-color","deepskyblue");
    });

    $("#ma").mouseover(function () { 
        $(this).css("background-color","cornflowerblue");
    }).mouseout(function () { 
        $(this).css("background-color","deepskyblue");
    });
    
    $("#buuu").mouseover(function () { 
        $(this).css({"font-size":"16px","color":"cornflowerblue"});
    }).mouseout(function () { 
        $(this).css({"font-size":"15px","color":"deepskyblue"});
    });

    $("#booo").mouseover(function () { 
        $(this).css({"font-size":"16px","color":"cornflowerblue"});
    }).mouseout(function () { 
        $(this).css({"font-size":"15px","color":"deepskyblue"});
    });

    $("#booo").click(function(){
        window.location.href = "/html/denglu.html";
    });

    $("#buuu").click(function(){
        window.location.href = "/html/zhuce.html";
    });

    $("#ma").click(function(){
        let name = $("#userId").val();
        console.log(name);
        let url = "http://localhost:8080/sms/send";
        let obj = {
            userName :name
        }
        $.ajax({
            type: "POST",
            url: url,
            data: obj,
            dataType: "JSON",
            success: function (data)
            {
                if(data == true)
                {
                    alert("验证码发送成功，请注意查收！");
                }
                else
                {
                    alert("验证码发送失败，请查看手机号是否有误！");
                }
            },
            error: function() 
            {
                alert("请求失败");
            }
        });
    })

    $("#deng").click(function(){
        let name = $("#userId").val();
        let pass = $("#password").val();
        let b = /^[0-9]{11}$/;
        let patrn=/^[0-9]{6}$/;
        console.log(name,pass);
        if(name.length==0 || pass.length==0)
        {
            alert("账号或密码不能为空！");
            return false;
        }
        else if(b.test(name)==false || patrn.test(pass)==false)
        {
            alert("账号或验证码不符合规范！");
            return false;
        }
        else
        {  
            let url = "http://localhost:8080/sms/testing";
            let obj = {
                userName :name,
                value :pass
            }
            $.ajax({
                type: "POST",
                url: url,
                data: obj,
                dataType: "JSON",
                success: function (data) {
                    console.log(data);
                    if(data == true)
                    {
                        window.location.href="/html/maintitle.html";
                    }
                    else{
                        alert("验证失败，请检查手机号和验证码是否正确！");
                    }
                },
                error : function()
                {
                    alert("请求失败");
                }
            })	
        }
    });

    $("#userId").blur(function(){
        let a = $(this).val();
        let $divDiv = $("#divDiv");
        let b = /^[0-9]{11}$/;
        
        if(b.test(a)==false)
        {
            $divDiv.html("格式：11位手机号码");
            return false;
        }
        else{
            $divDiv.html("");
            return true;
        }
    })

    $("#password").blur(function(){
        let g = $(this).val();
        let $divDiv1 = $("#divDiv1");
        let patrn=/^[0-9]{6}$/;
        
        if(patrn.test(g)==false)
        {
            $divDiv1.html("格式：6位验证码");
            return false;
        }
        else{
            $divDiv1.html("");
            return true;
        }
    })
});