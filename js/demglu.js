$(document).ready(function () {
    var img = "http://127.0.0.1:5500/img/%E8%AE%B0%E4%BD%8F%E5%AF%86%E7%A0%81(1).png";
    var qwer=false;

    let toggle = true;
    $("#ma").click(function () {
        if(toggle)
        {
            $(this).attr("src","/img/记住密码(1).png");
            toggle = false;
        }
        else
        {
            $(this).attr("src","/img/记住密码.png");
            toggle = true;
        }
        let sd = $('#ma')[0].src;
        if(sd==img)
        {
            qwer=true;
        }
    });
    
    $("#buuu").mouseover(function () { 
        $(this).css({"font-size":"16px","color":"cornflowerblue"});
    }).mouseout(function () { 
        $(this).css({"font-size":"15px","color":"deepskyblue"});
    })

    $("#deng").mouseover(function () { 
        $(this).css("background-color","cornflowerblue");
    }).mouseout(function () { 
        $(this).css("background-color","deepskyblue");
    });

    $("#buuu").click(function(){
        window.location.href = "/html/deng.html";
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
		let patrn=/^(\w){6,20}$/;
		
		if(patrn.test(g)==false)
		{
			$divDiv1.html("格式：6~20位任意英文、数字包括下划线！");
			return false;
		}
		else{
			$divDiv1.html("");
			return true;
		}
    })
    
    $("#deng").click(function(){
        let name = $("#userId").val();
        let pass = $("#password").val();
        let b = /^[0-9]{11}$/;
        let patrn=/^(\w){6,20}$/;
        console.log(name,pass);
        if(name.length==0 || pass.length==0)
        {
            alert("账号或密码不能为空！");
            return false;
        }
        else if(b.test(name)==false || patrn.test(pass)==false)
        {
            alert("账号或密码不符合规范！");
            return false;
        }
        else
        {
            let url = "http://localhost:8080/shiro/denglu"; 
            let obj = null;
            console.log("qwer的值是："+qwer);
            if(qwer==true)
            {
                $.cookie('rememberme','yes',{ expires: 1 , path: '/' });
                obj = {
                    rememberme: qwer,
                    userName: name,
                    passWord: pass
                }
            }
            else
            {
                obj = {
                    userName: name,
                    passWord: pass
                }
            }
            $.ajax({
                type: "GET",
                url: url,
                data: obj,
                dataType: "JSON",
                success: function (data) {
                    console.log(data);
                    console.log(data.token)
                    if(data.status==200)
                    {
                        sessionStorage.setItem('token', data.token);
                        sessionStorage.setItem('username', data.userName);
                        window.location.href="/html/maintitle.html";
                    }
                    else if(data.status==400)
                    {
                        alert(data.msg);
                    }
                    else if(data.status==401)
                    {
                        alert(data.msg);
                    }
                    else
                    {
                        alert(data.msg);
                    }
                },
                error: function(){
                    alert("请求失败");
                }
            });
        } 
    })

    let value = $.cookie('rememberme');
    console.log("----------"+value);
    if(value=="yes")
    {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/shiro/rememberi",
            data: "",
            dataType: "JSON",
            success: function (data) {
                console.log(data);
                $("#userId").val(data.userName);
                $("#password").val(data.passWord);
                if(data.rememberme)
                {
                    $("#ma").attr("src","/img/记住密码(1).png");
                }
                sessionStorage.setItem('username', data.userName);
            },
            error: function(){
                alert("请求失败");
            }
        });
    }
});