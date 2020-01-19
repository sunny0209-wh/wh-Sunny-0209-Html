$(document).ready(function () {
	let toggle = true;
	$("#png").click(function () {
		if(toggle)
		{
			$(this).attr("src","/img/向下箭头.png");
			toggle = false;
		}
		else
		{
			$(this).attr("src","/img/箭头-左.png");
			toggle = true;
		}
	})

	$("#zhuxiao").mouseover(function(){
		$(this).css("background-color","crimson");
	}).mouseout(function(){
		$(this).css("background-color","blueviolet");
	});

	$("#png1").click(function () {
		if(toggle)
		{
			$(this).attr("src","/img/向下箭头.png");
			toggle = false;
		}
		else
		{
			$(this).attr("src","/img/箭头-左.png");
			toggle = true;
		}
	})
	$("#png2").click(function () {
		if(toggle)
		{
			$(this).attr("src","/img/向下箭头.png");
			toggle = false;
		}
		else
		{
			$(this).attr("src","/img/箭头-左.png");
			toggle = true;
		}
	})
	$("#png3").click(function () {
		if(toggle)
		{
			$(this).attr("src","/img/向下箭头.png");
			toggle = false;
		}
		else
		{
			$(this).attr("src","/img/箭头-左.png");
			toggle = true;
		}
	})
	$("#png4").click(function () {
		if(toggle)
		{
			$(this).attr("src","/img/向下箭头.png");
			toggle = false;
		}
		else
		{
			$(this).attr("src","/img/箭头-左.png");
			toggle = true;
		}
	})
	
	$(".head-nav-item").click(function(){
		$(this).children(".item-childs").toggle();
	})

	$(".item-child").mouseover(function(){
		$(this).css("background-color","white");
	}).mouseout(function(){
		$(this).css("background-color","#e3e7ec");
	})

	$("#zhuxiao").click(function(){
		$(this).css("box-shadow","inset 0 2px 6px darkgrey");
		window.location.href="/html/denglu.html";
	})

	$("#titleImg").click(function(){
		cover.style.display="block";
		userInfo.style.display="block";
	})

	let username = sessionStorage.getItem('username');
	console.log(username);
	let url = "http://localhost:8080/emp/one";
	let obj = {
		userName: username
	}
	$.ajax({
		type: "GET",
		url: url,
		data: obj,
		dataType: "JSON",
		success: function (data) {
			console.log(data);
			if(data != null)
			{
				$("#azx").html(data.name);
				$("#xinxi").html("工号："+data.id);
				if(data.headImg != null)
				{
					$("#titleImg").attr("src",data.headImg);
				}
				$("#name").val(data.name);
				$("#gender").val(data.gender);
				$("#age").val(data.age);
				$("#mail").val(data.userMail);
			}
		},
		error: function(){
			console.log("请求失败");
		}
	});

	$("#mm").click(function(){
		cover.style.display="none";
		userInfo.style.display="none";
	})

	$("#huan").click(function(){
		let ty = $("#titleImg").attr('src');

		sessionStorage.setItem('img', ty);
		window.location.href = "/html/titleImg.html";
	})

	$("#infoo").click(function(){
		cover.style.display="none";
		userInfo.style.display="none";
		let name = $("#name").val();
		let gender = $("#gender").val();
		let age = $("#age").val();
		let mail = $("#mail").val();

		let username1 = username;
		let url = "http://localhost:8080/emp/update";
		let obj = {
			name: name,
			gender: gender,
			age: age,
			userName: username1,
			userMail: mail
		}

		$.ajax({
			type: "PUT",
			url: url,
			data: obj,
			dataType: "JSON",
			success: function (data) {
				console.log(data);
				if(data == 1)
				{
					alert("修改成功");
					window.location.href="http://127.0.0.1:5500/html/user.html";
				}
			},
			error: function(){
				alert("请求失败");
			}
		});
	})

	$("#cha").mouseover(function(){
		$("#mm").attr("src","/img/叉.png");
	}).mouseout(function(){
		$("#mm").attr("src","/img/叉(1).png");
	});
});
