$(document).ready(function () {
    let url = "http://localhost:8080/three/province";
    ajaxTest(url,"GET",{},function(data){
        function provin(pro){
            return `<option value="${pro.provinceid}">${pro.provincename}</option>`;
        }
        console.log(data);
        data = JSON.parse(data);
        data.forEach(function(pro){
            $("#one").append(provin(pro));
        })
    });

    $("#one").click(function(){
        $("#two").find("option").not(":first").remove();
        $("#three").find("option").not(":first").remove();
    })

    $("#two").click(function() {
        let city = $("#one").val();
        console.log(city);
        let obj = {
            provinceid :city
        }
        if(city!=0)
        {
            ajaxTest("http://localhost:8080/three/city","GET",obj,function(data){
                function city(cit){
                    return `<option value="${cit.cityid}">${cit.cityname}</option>`;
                }
                console.log(data);
                data = JSON.parse(data);
                console.log(data);
                data.forEach(function(cit){
                    $("#two").append(city(cit));
                })
            })
        }
    })

    $("#btoo").click(function(){
        const th = `<tr>
                        <th>学号</th>
                        <th>姓名</th>
                        <th>手机号</th>
                        <th>年龄</th>
                    </tr>`;
        let arr = [];
        let city = $("#two").val();
        let obj = {
            cityid :city
        }
        if(city!=0)
        {
            ajaxTest("http://localhost:8080/three/stu","GET",obj,function(data){
                arr.push(th);
                console.log(data);
                data = JSON.parse(data);
                console.log(data);
                data.forEach(function(stu){
                    arr.push(`<tr>
                                <td>${stu.stuid}</td>
                                <td>${stu.stuname}</td>
                                <td>${stu.phone}</td>
                                <td>${stu.age}</td>
                            </tr>`);
                })
                $("#table").html(arr.join(""));
            })
        }
    })

    $("#three").click(function() {
        let county = $("#two").val();
        console.log(county);
        let obj = {
            cityid :county
        }
        if(county!=0)
        {
            ajaxTest("http://localhost:8080/three/county","GET",obj,function(data){
                function county(coun){
                    return `<option value="${coun.countyid}">${coun.countyname}</option>`;
                }
                console.log(data);
                data = JSON.parse(data);
                console.log(data);
                data.forEach(function(coun){
                    $("#three").append(county(coun));
                })
            })
        }
    })
})