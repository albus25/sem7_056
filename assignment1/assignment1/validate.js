	$(document).on("click","#btnSub",function () {
		var txtName = $("#txtName").val();
		var txtAge = $("#txtAge").val();
		var txtEmail = $("#txtEmail").val();

		$.ajax({
			type : 'post',
			url : '/submitForm',
			data : {txtName : txtName,txtAge : txtAge,txtEmail : txtEmail},
			success:function (result) 
			{
				alert("Inserted");
			},
			error:function(result)
			{
				var res = JSON.parse(result.responseText);
				
				console.log(res);
				for(var data in res)
				{
					if(res[data].param == "txtName")
					{
						$("#name").html(res[data].msg);
					}	
					else if(res[data].param == "txtAge")
					{
						$("#age").html(res[data].msg);						
					}
					else
					{
						$("#email").html(res[data].msg);												
					}
				}
			}
		});
		return false;
	});