var netwin;$(document).ready((function(){$.ajax({url:"services/dashboard_get_graph_data.php",type:"post",cache:!1,data:{token:$("body").data("session_token")},success:function(a){var e=$.parseJSON(a);if(e.Netwin){$("#Netwin_container").html('<canvas id="Netwin"></canvas>');var t=document.getElementById("Netwin").getContext("2d");netwin=new Chart(t,{type:"line",data:{labels:[],datasets:[{data:[],backgroundColor:["rgba(54, 162, 235, 0.2)"],borderColor:["rgba(54, 162, 235, 1)"],borderWidth:1},{data:[],backgroundColor:["rgba(54, 162, 235, 0)"],borderColor:["rgba(0, 0, 0, 0.2)"],borderWidth:1,borderDash:[3,2]}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0,callback:function(a){return Intl.NumberFormat().format(a)}}}]},tooltips:{callbacks:{label:function(a){return Intl.NumberFormat().format(a.yLabel)}}},legend:{display:!1}}});var r=0,n=Object.keys(e.Netwin.data).length,o=new Date(date.getFullYear(),date.getMonth()+1,0);$.each(e.Netwin.data,(function(a,t){if(netwin.data.labels[r]=t.label,netwin.data.datasets[0].data[r]=t.value,n-1==r){var d=new Date(1e3*e.Netwin.last_update);d=60*(24*(d.getDate()-1)+d.getHours()-3)+d.getMinutes();var l=24*o.getDate()*60;netwin.data.datasets[1].data[r]=t.value/d*l}else netwin.data.datasets[1].data[r]=t.value;netwin.update(),r++})),1==$("body").data("HideValues")&&(netwin.options.scales.yAxes[0].display=status,netwin.update())}if(e.NetwinDaily){$("#NetwinDaily_container").html('<canvas id="NetwinDaily"></canvas>');var d=document.getElementById("NetwinDaily").getContext("2d");netwinDaily=new Chart(d,{type:"line",data:{labels:[],datasets:[{data:[],backgroundColor:["rgba(54, 162, 235, 0.2)"],borderColor:["rgba(54, 162, 235, 1)"],borderWidth:1},{data:[],backgroundColor:["rgba(54, 162, 235, 0)"],borderColor:["rgba(0, 0, 0, 0.2)"],borderWidth:1,borderDash:[3,2]}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0,callback:function(a){return Intl.NumberFormat().format(a)}}}]},tooltips:{callbacks:{label:function(a){return Intl.NumberFormat().format(a.yLabel)}}},legend:{display:!1}}});r=0,n=Object.keys(e.NetwinDaily.data).length,o=new Date(date.getFullYear(),date.getMonth()+1,0);$.each(e.NetwinDaily.data,(function(a,t){if(netwinDaily.data.labels[r]=t.label,netwinDaily.data.datasets[0].data[r]=t.value,n-1==r){var o=new Date(1e3*e.NetwinDaily.last_update);o=60*(o.getHours()-3)+o.getMinutes(),netwinDaily.data.datasets[1].data[r]=t.value/o*1440}else netwinDaily.data.datasets[1].data[r]=t.value;netwinDaily.update(),r++})),1==$("body").data("HideValues")&&(netwinDaily.options.scales.yAxes[0].display=status,netwinDaily.update())}if(e.NetwinApi){$("#NetwinApi_container").html('<canvas id="NetwinApi"></canvas>');var l=document.getElementById("NetwinApi").getContext("2d"),i=new Chart(l,{type:"radar",data:{labels:[],datasets:[{label:[$("body").data("dashboard_current_month")],data:[],backgroundColor:["rgba(0, 250, 220, .5)"],borderColor:["rgba(0, 213, 132, .8)"],borderWidth:2},{label:[$("body").data("dashboard_previous_month")],data:[],backgroundColor:["rgba(100, 100, 100, .1)"],borderColor:["rgba(0, 0, 0, .3)"],borderWidth:2}]},options:{responsive:!0,legend:{position:"right"},tooltips:{callbacks:{label:function(a,e){return e.labels[a.index]+": "+e.datasets[0].data[a.index]+"%"}}},scale:{ticks:{beginAtZero:!0,display:!1}}}});r=0;$.each(e.NetwinApi.data,(function(a,e){var t=0;$.each(e,(function(a,e){i.data.labels[t]=a,i.data.datasets[r].data[t]=e,t++})),i.update(),r++}))}if(e.ActiveUsers){$("#ActiveUsers_container").html('<canvas id="ActiveUsers"></canvas>');var s=document.getElementById("ActiveUsers").getContext("2d"),b=new Chart(s,{type:"bar",data:{labels:[],datasets:[{data:[],backgroundColor:bgcolor_monthly12,borderColor:bordercolor_monthly12,borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0,callback:function(a){return Intl.NumberFormat().format(a)}}}]},legend:{display:!1},tooltips:{callbacks:{label:function(a){return Intl.NumberFormat().format(a.yLabel)}}}}});r=0;$.each(e.ActiveUsers.data,(function(a,e){b.data.labels[r]=e.label,b.data.datasets[0].data[r]=e.value,b.update(),r++}))}if(e.ActiveUsersDaily){$("#ActiveUsersDaily_container").html('<canvas id="ActiveUsersDaily"></canvas>');s=document.getElementById("ActiveUsersDaily").getContext("2d");var g=new Chart(s,{type:"bar",data:{labels:[],datasets:[{data:[],backgroundColor:bgcolor_daily,borderColor:bordercolor_daily,borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0,callback:function(a){return Intl.NumberFormat().format(a)}}}]},legend:{display:!1},tooltips:{callbacks:{label:function(a){return Intl.NumberFormat().format(a.yLabel)}}}}});r=0;$.each(e.ActiveUsersDaily.data,(function(a,e){g.data.labels[r]=e.label,g.data.datasets[0].data[r]=e.value,g.update(),r++}))}if(e.TopAffiliates){$("#TopAffiliates_container").html('<canvas id="TopAffiliates"></canvas>');s=document.getElementById("TopAffiliates").getContext("2d");var c=new Chart(s,{type:"pie",data:{labels:[],datasets:[{data:[],backgroundColor:["#F7464A","#46BFBD","#FDB45C","#949FB1","#4D5360"],hoverBackgroundColor:["#FF5A5E","#5AD3D1","#FFC870","#A8B3C5","#616774"]}]},options:{responsive:!0,legend:{position:"right"},tooltips:{callbacks:{label:function(a,e){return Intl.NumberFormat().format(e.datasets[a.datasetIndex].data[a.index])}}}}});r=0;$.each(e.TopAffiliates.data,(function(a,e){c.data.labels[r]=e.label,c.data.datasets[0].data[r]=e.value,c.update(),r++}))}if(e.MonthlyEarning){$("#MonthlyEarning_container").children("div").toggleClass("d-none"),1==$("body").data("HideValues")?($("body").data("HiddenValue-MonthlyEarningCurrent",e.MonthlyEarning.data[1]),$("body").data("HiddenValue-MonthlyEarningPrevious",e.MonthlyEarning.data[0]),$("#MonthlyEarningCurrent, #MonthlyEarningPrevious").text("********")):($("#MonthlyEarningCurrent").text(e.MonthlyEarning.data[1]),$("#MonthlyEarningPrevious").text(e.MonthlyEarning.data[0]));var u=new Date(1e3*e.MonthlyEarning.last_update);u=60*(24*(u.getDate()-1)+u.getHours()-3)+u.getMinutes();o=new Date(date.getFullYear(),date.getMonth(),0);hour2=24*o.getDate()*60;var h=e.MonthlyEarning.data[1].replaceAll(".","")/u,y=e.MonthlyEarning.data[0].replaceAll(".","")/hour2,p=((h-y)/y*100).toFixed(2);h<y?($("#MonthlyEarningTrend").addClass("red").children("i").addClass("fa-arrow-circle-down"),$("#MonthlyEarningTrend").text(p+" %")):($("#MonthlyEarningTrend").addClass("green").children("i").addClass("fa-arrow-circle-up"),$("#MonthlyEarningTrend").text("+"+p+" %"))}},error:function(a){alert("Error: "+a.responseText)}}),$(".hide-values").on("click",(function(){$(this).hasClass("hidden")?HideValues(!0):HideValues(!1)}))}));var cookies=document.cookie.split(";");for(i=0;i<cookies.length;i++)cookieName=cookies[i].split("=")[0].trim(),"dashboard_hidden_values"==cookieName&&($("body").data("HideValues",1),$(".hide-values").removeClass("fa-eye-slash").addClass("fa-eye hidden"));function HideValues(a){!0===a?($(".hide-value").each((function(a){$(this).text($("body").data("HiddenValue-"+$(this).attr("id")))})),$(".hide-values").removeClass("fa-eye hidden").addClass("fa-eye-slash"),document.cookie="dashboard_hidden_values=0; max-age=-1; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain="+location.host+"; path=/;"):($(".hide-value").each((function(a){$("body").data("HiddenValue-"+$(this).attr("id"),$(this).text()),$(this).text("********")})),$(".hide-values").removeClass("fa-eye-slash").addClass("fa-eye hidden"),date.setDate(date.getDate()+3650),document.cookie="dashboard_hidden_values=1; max-age=315360000; expires="+date.toUTCString()+"; domain="+location.host+"; path=/;"),netwin.options.scales.yAxes[0].display=a,netwin.update()}function ErrorAlert(a){$("#UsersAlert").hide("fade"),$("#SuccessAlert").hide("fade"),$.ajax({type:"GET",url:"lang/"+$("body").data("current_language")+".xml",dataType:"xml",cache:!1,success:function(e){var t=$(e).find("error_"+a).text();t||(t="Unknown error"),$("#UsersAlert").find(".alert-span").text(t),$("#UsersAlert").fadeIn(),clearTimeout(AlertTimeout),AlertTimeout=setTimeout((function(){$("#UsersAlert").fadeOut(),100==a&&(window.location.href=$("body").data("base_server_path")+"/login.php")}),3e3),$(".modal").modal("hide")}})}var AlertTimeout="",date=new Date,bgcolor_monthly12=["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],bordercolor_monthly12=["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)","rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],bgcolor_daily=["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)","rgba(201, 203, 207, 0.2)","rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)","rgba(201, 203, 207, 0.2)","rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)","rgba(201, 203, 207, 0.2)","rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)","rgba(201, 203, 207, 0.2)","rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)"],bordercolor_daily=["rgba(255,99,132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)","rgba(201, 203, 207, 1)","rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)","rgba(201, 203, 207, 1)","rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)","rgba(201, 203, 207, 1)","rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)","rgba(201, 203, 207, 1)","rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)"];