$(document).ready((function(){$("body").on("mouseup",(function(e){$(e.target).hasClass("dropdown-menu")||$(".dropdown-menu").each((function(){$(this).removeClass("show")}))})),$(".mdb-select").material_select(),$(".button-collapse").sideNav({breakpoint:1023}),$("#toggle").on("click",(function(){$("#slide-out").hasClass("slim")?($("main").removeClass("thin").addClass("wide"),$(this).find("i").removeClass("fa-angle-double-left").addClass("fa-angle-double-right")):($("main").removeClass("wide").addClass("thin"),$(this).find("i").removeClass("fa-angle-double-right").addClass("fa-angle-double-left"))})),$(".collapsible-header").on("click",(function(){"toggle"!=$(this).attr("id")&&$("#slide-out").hasClass("slim")&&($("#toggle").trigger("click").removeClass("active"),$(this).trigger("click"))})),$(".multi-auth-option-link, .multi-auth-option-external").on("mousedown",(function(e){if(e.preventDefault(),1!==e.which)return!1;var t='<form id="multi_auth_form" action="https://'+$(this).parent().attr("data-remote-room-url")+'/api/login/token_login.php" method="post" target="replace-target"><input type="hidden" name="src_uid" value="'+$("body").data("current_user_id")+'"><input type="hidden" name="src_roomid" value="'+$("body").data("room_id")+'"><input type="hidden" name="orig_user_id" value="'+$(this).parent().attr("data-orig_user_id")+'"><input type="hidden" name="token" value="'+$(this).parent().attr("data-token")+'"><input type="hidden" name="path" value="'+window.location.pathname+'"></form>';return $(this).hasClass("multi-auth-option-link")?(t=t.replace("replace-target","_self"),$.ajax({url:"services/logout.php",type:"post",cache:!1,success:function(){return $("body").append(t),$("#multi_auth_form").submit(),!1}})):(t=t.replace("replace-target","_blank"),$("body").append(t),$("#multi_auth_form").submit().remove()),!1})),$(".own-balance").click((function(){update_own_balance()})),$("#ChangeLanguage").on("click",(function(e){e.preventDefault();var t='<select class="mdb-select colorful-select dropdown-primary md-form" id="RequestLanguageSelect"><option value="" selected disabled class="dark-text">'+$("body").data("item_select")+'</option><option value="es" data-icon="'+$("body").data("cdn_url")+'images/flags/es.png" class="align-left"> Español</option><option value="en" data-icon="'+$("body").data("cdn_url")+'images/flags/us.png" class="align-left"> English</option><option value="pt" data-icon="'+$("body").data("cdn_url")+'images/flags/pt.png" class="align-left"> Português</option><option value="cn" data-icon="'+$("body").data("cdn_url")+'images/flags/cn.png" class="align-left"> 中文</option><option value="kr" data-icon="'+$("body").data("cdn_url")+'images/flags/kr.png" class="align-left"> 한국어</option></select>';$("#RequestLanguage").children().html(t),$("#RequestLanguageSelect").material_select(),$("#ModalChangeLanguage").modal("show")})),$("#ModalChangeLanguage").on("shown.bs.modal",(function(){$("#RequestLanguage").focus()})),$("#ModalChangeLanguage").on("hidden.bs.modal",(function(){$("#RequestLanguageSelect").material_select("destroy"),$("#RequestLanguage").children().html("")})),$("#ModalChangeLanguage").on("change","#RequestLanguageSelect",(function(e){e.preventDefault();var t=$(this).val(),a=new Date;a.setDate(a.getDate()+3650),document.cookie="language_selected="+t+"; max-age=315360000; expires="+a.toUTCString()+"; domain="+location.host+"; path=/;",window.location.reload(!0)})),$("#MyAccount").on("click",(function(e){e.preventDefault(),$("#ModalMyAccountQr").attr("src","https://api.qrserver.com/v1/create-qr-code/?size=250x250&data="+$("body").data("rtoken")),$("#ModalMyAccount").modal("show")})),$("#ModalMyAccountLinkCopy").on("click",(function(){copyToClipboard($("body").data("rtoken"),$(this).attr("id"))})),$("#ModalMyAccountQrDownload").on("click",(function(){window.location.href="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data="+$("body").data("rtoken")})),$("#ChangeOwnPassword").on("click",(function(e){e.preventDefault();var t=$(this).attr("data-user-id");$("#ChangePasswordId").val(t),$("#ModalChangePassword").modal("show")})),$("#ModalChangePassword").on("shown.bs.modal",(function(){$(".change-password-toggle").each((function(){"password"!==$(this).attr("type")&&$(this).attr("type","password").siblings("i").removeClass("fa-eye-slash").addClass("fa-eye")})),$("#ChangePasswordNew1").focus()})),$("#ModalChangePassword").on("hidden.bs.modal",(function(){$(".modal-clear-val").val("").removeClass("invalid"),$(".change-password-toggle").each((function(){"password"==$(this).attr("type")&&$(this).attr("type","text").siblings("i").removeClass("fa-eye-slash").addClass("fa-eye")})),$(".modal-clear-hide").hide()})),$(".change-password-input").on("keyup",(function(){13!=event.keyCode||$("#ModalChangePasswordSubmit").hasClass("disabled")?($(this).removeClass("invalid").siblings("small").fadeOut(),$("#ModalChangePasswordSubmit").removeClass("disabled")):$("#ModalChangePasswordSubmit").trigger("click")})),$(".change-password-reveal").click((function(){var e=$(this).siblings("input");"password"===e.attr("type")?(e.attr("type","text"),$(this).removeClass("fa-eye").addClass("fa-eye-slash")):(e.attr("type","password"),$(this).removeClass("fa-eye-slash").addClass("fa-eye"))})),$("#ModalChangePasswordSubmit").click((function(){var e=$(this);if(e.hasClass("disabled"))return!1;$("#ChangePasswordError").hide();var t=0,a=$("#ChangePasswordNew1"),i=$("#ChangePasswordNew2");if((a.val().length<4||a.val().length>16)&&(a.addClass("invalid"),$("#ChangePasswordFormat1").css("display","table-cell"),t=1),a.val()!==i.val()&&(i.addClass("invalid"),$("#ChangePasswordFormat2").css("display","table-cell"),t=1),1===t)return e.removeClass("disabled"),!1;e.addClass("disabled"),$("#ChangePasswordLoading").fadeIn(),$.ajax({url:"services/operation_change_password.php",type:"post",cache:!1,data:{user_id:$("#ChangePasswordId").val(),new_password:a.val(),token:$("body").data("session_token")},success:function(){$("#ChangePasswordLoading").fadeOut(),$("#ModalChangePassword").modal("hide"),SuccessAlert("users_modal_change_password_success")},error:function(e){$("#ChangePasswordLoading").fadeOut(),ModalPasswordError(e.responseText)}})})),$("#pre_date").on("change",(function(){var e=new Date;switch(e=new Date(e.getTime()+60*(e.getTimezoneOffset()-180)*1e3),$(this).val()){case"today":var t=0,a=86400;break;case"yesterday":t=-86400,a=0;break;case"thisWeek":t=(e.getDay()+6)%7*-1*24*60*60,a=-1*((e.getDay()+6)%7-7)*24*60*60;break;case"lastWeek":t=-1*((e.getDay()+6)%7+7)*24*60*60,a=(e.getDay()+6)%7*-1*24*60*60;break;case"thisMonth":t=-1*(e.getDate()-1)*24*60*60,a=24*(-1*(e.getDate()-1)+new Date(e.getFullYear(),(e.getMonth()+1)%12,0).getDate())*60*60;break;case"lastMonth":t=-1*(e.getDate()-1+new Date(e.getFullYear(),e.getMonth(),0).getDate())*24*60*60,a=-1*(e.getDate()-1)*24*60*60;break}if(void 0!==t){var i=1e3*(Math.round(e.getTime()/1e3)+t);$("#start_date").pickadate().pickadate("picker").set("select",i),$("#start_time").val("00:00:00")}if(void 0!==a){var o=1e3*(Math.round(e.getTime()/1e3)+a);$("#end_date").pickadate().pickadate("picker").set("select",o),$("#end_time").val("00:00:00")}})),$("#ModalNewTicket").on("hidden.bs.modal",(function(){$(".modal-clear-val").val(""),$("#ModalNewTicketMessage").val(""),$("#ModalNewTicketSubject").parent().show(),$("#ModalNewTicketError").hide(),$("#ModalNewTicketAttachCount").hide(),$("#ModalNewTicketAttach").val(""),$("#ModalHistory").css("z-index",1050),$(".modal-ticket-alert").hide()})),$("#ModalNewTicketSubmit").on("click",(function(){var e=$(this);if(e.hasClass("disabled"))return!1;if(0===$("#ModalNewTicketProviderId").val().length&&0===$("#ModalNewTicketTransactionId").val().length&&0===$("#ModalNewTicketSubject").val().length)return!1;e.addClass("disabled");var t=new FormData;t.append("token",$("body").data("session_token")),t.append("provider_id",$("#ModalNewTicketProviderId").val()),t.append("transaction_id",$("#ModalNewTicketTransactionId").val()),t.append("subject",$("#ModalNewTicketSubject").val()),t.append("message",$("#ModalNewTicketMessage").val()),$.each($("#ModalNewTicketAttach")[0].files,(function(e,a){t.append("attach"+e,$("#ModalNewTicketAttach")[0].files[e])})),$.ajax({url:"services/support_new_ticket.php",type:"post",cache:!1,data:t,contentType:!1,processData:!1,success:function(t){e.removeClass("disabled"),SuccessAlert("users_modal_new_ticket_success"),update_own_balance()},error:function(t){e.removeClass("disabled"),ErrorAlert(t.responseText)}})})),$("#ModalNewTicketAttach").on("change",(function(){$("#ModalNewTicketError").hide();var e=$(this)[0].files.length;if(e>5)return $("#ModalNewTicketError").show(),$("#ModalNewTicketAttachCount").hide(),$(this).val(""),!1;$.each($(this)[0].files,(function(){if($(this)[0].size>8e6)return $("#ModalNewTicketError").show(),$("#ModalNewTicketAttachCount").hide(),$(this).val(""),!1})),$("#ModalNewTicketAttachCount").children("span").text(e),e>0?$("#ModalNewTicketAttachCount").show():$("#ModalNewTicketAttachCount").hide()})),$(".user-notifications-dropdown").on("click",".dropdown-item",(function(e){e.preventDefault(),$("#ModalNotificationsId").val($(this).attr("data-id")),$("#ModalNotificationsStatus").val($(this).attr("data-status")),$("#ModalNotification").modal("show")})),$("#ModalNotification").on("shown.bs.modal",(function(){$.ajax({url:"services/notification_get.php",type:"post",cache:!1,data:{id:$("#ModalNotificationsId").val(),token:$("body").data("session_token")},success:function(e){$("#ModalNotificationsLoading").hide();var t=$.parseJSON(e);$("#ModalNotificationsContent").html(t),"new"===$("#ModalNotificationsStatus").val()&&notification_update_status($("#ModalNotificationsId").val())},error:function(e){ErrorAlert(e.responseText)}})})),$("#ModalNotification").on("hidden.bs.modal",(function(){$(".input-clear-val").val(""),$("#ModalNotificationsContent").empty(),$("#ModalNotificationsLoading").show(),setTimeout((function(){FindNextNotification()}),1e3)})),$(".user-support-dropdown").on("click",".support-item",(function(e){e.preventDefault(),$("#ModalReplyTicketId").val($(this).attr("data-id")),$("#ModalReplyTicket").modal("show")})),$(".user-support-dropdown").on("click",".support-new",(function(e){e.preventDefault();var t=$("body").data("brand_support");1===t?($("#ModalNewTicketSubject").show(),$("#ModalNewTicket").modal("show")):($("#ModalSupportMailContent").html("<a href='mailto:"+t+"'>"+t+"</a>"),$("#ModalSupportMail").modal("show"))})),$(".user-support-dropdown").on("click",".support-item-none",(function(e){e.preventDefault()})),$("#ModalReplyTicket").on("shown.bs.modal",(function(){$.ajax({url:"services/support_get_ticket.php",type:"post",cache:!1,data:{ticket_id:$("#ModalReplyTicketId").val(),token:$("body").data("session_token")},success:function(e){var t=['<path fill="#4FC3F7" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>','<path fill="#92A58C" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>'],a='<li class="d-flex justify-content-between mb-4"><div class="col-2"></div><div class="col-10 chat-body chat-own-message white p-2 mr-2 z-depth-1"><div class="header"></div><p class="mb-0">{replace-message}</p><div class"d-flex"><div class="gallery gallery{replace-gallery-id}">{replace-images}</div><small class="float-right"><svg class="message-check" data-message-id="{replace-check-id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">{replace-check}</svg>  {replace-date}</small></div></div></li>',i='<li class="d-flex justify-content-between mb-4"><div class="col-10 chat-body white p-2 z-depth-1"><div class="header"><strong>{replace-username}</strong></div><hr class="w-100"><p class="mb-0">{replace-message}</p><div class"d-flex"><div class="gallery gallery{replace-gallery-id}">{replace-images}</div><small class="float-right"> {replace-date}</small></div></div></li>',o="",s=jQuery.parseJSON(e);if(s.length>0){last_support_message=0;var n=[];$.each(s,(function(e,t){var s="";null!==t.images&&0!==t.images.length&&(s="<hr>",t.images=t.images.split(","),$.each(t.images,(function(e,a){s=s+'<a alt="" title="" href=services/view_support_image.php?token='+$("body").data("session_token")+"&code="+a+"><img class=custom-width-"+t.images.length+" src=services/view_support_image.php?token="+$("body").data("session_token")+"&code="+a+"></a>&nbsp;"})),n.push(e)),t.user_id>=10&&t.user_id<100?(o+=i.replace("{replace-username}",$("body").data("support_nickname")).replace("{replace-date}",t.date).replace("{replace-message}",t.message).replace("{replace-gallery-id}",e).replace("{replace-images}",s),last_support_message=e):o+=a.replace("{replace-username}",t.username).replace("{replace-date}",t.date).replace("{replace-message}",t.message).replace("{replace-check-id}",e).replace("{replace-gallery-id}",e).replace("{replace-images}",s)})),$("#ModalReplyTicketLoading").hide(),$(".list-unstyled.chat").prepend(o).slideDown(300,(function(){$(".message-check").each((function(){$(this).attr("data-message-id")<last_support_message?$(this).html(t[0]):$(this).html(t[1])})),n.length>0&&$.each(n,(function(e,t){$(".gallery"+t+" a").simpleLightbox()})),$("#ModalReplyTicketAttachDiv").show(),$("#ModalReplyTicketReply").show()})),$.ajax({url:"services/support_update_ticket_status.php",type:"post",cache:!1,data:{ticket_id:$("#ModalReplyTicketId").val(),token:$("body").data("session_token")},success:function(e){update_own_balance()},error:function(e){ErrorAlert(e.responseText)}})}},error:function(e){ErrorAlert(e.responseText)}})})),$("#ModalNewTicket, #ModalReplyTicket").on("show.bs.modal",(function(){var e=new Date,t=e.getTimezoneOffset()/60;e.setHours(e.getHours()+t-3),11===e.getMonth()&&(25===e.getDate()||e.getHours()>12&&(24===e.getDate()||31===e.getDate()))||0===e.getMonth()&&1===e.getDate()?$(".modal-ticket-alert-holidays").slideDown():e.getHours()<12&&(0===e.getDay()||6===e.getDay())||e.getHours()<11?$(".modal-ticket-alert").slideDown():$(".modal-ticket-alert").hide()})),$("#ModalReplyTicket").on("hidden.bs.modal",(function(){$(".list-unstyled.chat").empty().hide(),$("#ModalReplyTicketLoading").show(),$("#ModalReplyTicketReply").hide(),$("#ModalReplyTicketId").val(""),$("#ModalReplyTicketMessage").val(""),$("#ModalReplyTicketError").hide(),$("#ModalReplyTicketAttachCount").hide(),$("#ModalReplyTicketAttach").val(""),$(".modal-ticket-alert").hide()})),$("#ModalReplyTicketAttach").on("change",(function(){$("#ModalReplyTicketError").hide();var e=$(this)[0].files.length;if(e>5)return $("#ModalReplyTicketError").show(),$("#ModalReplyTicketAttachCount").hide(),$(this).val(""),!1;$.each($(this)[0].files,(function(){if($(this)[0].size>8e6)return $("#ModalReplyTicketError").show(),$("#ModalReplyTicketAttachCount").hide(),$(this).val(""),!1})),$("#ModalReplyTicketAttachCount").children("span").text(e),e>0?$("#ModalReplyTicketAttachCount").show():$("#ModalReplyTicketAttachCount").hide()})),$("#ModalReplyTicketSubmit").on("click",(function(){var e=$(this);if(e.hasClass("disabled"))return!1;if($("#ModalReplyTicketMessage").val().length<2)return $("#ModalReplyTicketReply").addClass("invalid"),!1;e.addClass("disabled");var t=new FormData;t.append("token",$("body").data("session_token")),t.append("ticket_id",$("#ModalReplyTicketId").val()),t.append("message",$("#ModalReplyTicketMessage").val()),$.each($("#ModalReplyTicketAttach")[0].files,(function(e,a){t.append("attach"+e,$("#ModalReplyTicketAttach")[0].files[e])})),$.ajax({url:"services/support_reply_ticket.php",type:"post",cache:!1,data:t,contentType:!1,processData:!1,success:function(t){e.removeClass("disabled"),SuccessAlert("users_modal_reply_ticket_success")},error:function(t){e.removeClass("disabled"),ErrorAlert(t.responseText)}})})),$("#ModalReplyTicketMessage").on("keyup",(function(){$("#ModalReplyTicketReply").removeClass("invalid")})),$("#BrowserChrome").on("click",(function(){window.location.href="https://www.google.com/chrome/"})),$("#BrowserFirefox").on("click",(function(){window.location.href="https://www.mozilla.org/firefox/new/"})),$("#BrowserAdviceClose").on("click",(function(){var e=new Date;e.setDate(e.getDate()+30),document.cookie="browser_advice=1; max-age=30; expires="+e.toUTCString()+"; domain="+location.host+"; path=/;",$("#BrowserAdvice").fadeOut()}));var e,t=document.querySelector(".custom-scrollbar");Ps.initialize(t),(e=$("#sidemenu_global_ul").find('a[href$="'+location.href.split("/").slice(-1)+'"]')).addClass("active"),(e=e.parent().parent().parent()).hasClass("collapsible-body")&&e.show().siblings("a").addClass("active"),(e=e.parent().parent().parent()).hasClass("collapsible-body")&&e.show().siblings("a").addClass("active"),$("#LoginHistory").on("click",(function(e){e.preventDefault(),$("#ModalLoginHistory").modal("show")})),$("#ModalLoginHistory").on("shown.bs.modal",(function(){a.draw()})),$("#ModalLoginHistory").on("hidden.bs.modal",(function(){$("#ModalLoginHistory tbody").empty()}));var a=$("#LoginHistoryTable").DataTable({responsive:!0,sort:!1,filter:!1,autoWidth:!0,processing:!0,serverSide:!0,paging:!1,info:!1,lengthMenu:[[100],[100]],displayStart:0,deferLoading:0,ajax:{url:"services/get_login_history.php",type:"post",cache:!1,data:function(e){e.token=$("body").data("session_token")},error:function(e){ErrorAlert(e.responseText),$("#LoginHistoryTable_processing").hide()}},dom:'<"top">rt<"bottom">p<"clear">',language:{url:"lang/datatables/"+$("body").data("current_language")+".json"},columns:[{title:$("body").data("datatable_title_date"),className:"dt-date text-center"},{title:$("body").data("datatable_title_action"),className:"dt-action text-center"},{title:$("body").data("datatable_title_ip"),className:"dt-ip text-center"},{title:$("body").data("datatable_title_agent"),className:"dt-agent d-none d-sm-table-cell text-center"},{className:"d-none"}],initComplete:function(){$("#LoginHistoryTable_wrapper").find("label").each((function(){$(this).parent().append($(this).children())})),$("#LoginHistoryTable_wrapper .bottom").addClass("row")},fnRowCallback:function(e,t){$("td:eq(1)",e).removeClass("text-center").addClass("text-left"),$("td:eq(3)",e).html("<div data-toggle='popover' title='' data-html='true' data-animation='true' data-content='"+t[4]+"'><i class='fas fa-"+("1"==t[3]?"mobile-alt":"desktop")+"' aria-hidden='true'></i></div>")},fnDrawCallback:function(e){$('[data-toggle="popover"]').popover({trigger:"hover"}),a.columns.adjust()}});"1"==$("body").data("force_change_passwd")&&($("#ChangePasswdForce").show(),$("#ChangeOwnPassword").trigger("click")),$("#NotificationsToast").on("mousedown",".close, .toast",(function(e){if(e.preventDefault(),$(this).hasClass("close")){var t=$(this).parent().parent().attr("data-id"),a=$(this).parent().parent().attr("data-priority");return DeleteNotificationToast(t),notification_update_status(t+"."+a),!1}NotificationPosXreset=$(this).offset().left,NotificationPosX=e.originalEvent.clientX,NotificationCurrentId=$(this).attr("id")})),$("#NotificationsToast").on("mouseup mouseleave",".toast",(function(e){if($(this).attr("id")===NotificationCurrentId){e.preventDefault();var t=$(this).attr("data-id"),a=$(this).attr("data-priority"),i=$(this).offset().left;if(i==NotificationPosXreset)return DeleteNotificationToast(t,!0),$(".notification-item.support-item-new[data-id='"+t+"."+a+"']").trigger("click"),NotificationCurrentId="none",!1;i>NotificationPosXreset+50*$(this).width()/100?(DeleteNotificationToast(t),notification_update_status(t+"."+a)):($(this).animate({left:0},300),NotificationCurrentId="none")}})),$("#NotificationsToast").on("mousemove",".toast",(function(e){if($(this).attr("id")===NotificationCurrentId){e.preventDefault();var t=e.originalEvent.clientX,a=$(this).offset().left,i=a-(NotificationPosX-t);i>a&&(NotificationPosX=t,$(this).offset({left:i}))}})),$("#NotificationsToast").on("touchstart",".close, .toast",(function(e){if(e.preventDefault(),$(this).hasClass("close")){var t=$(this).parent().parent().attr("data-id"),a=$(this).parent().parent().attr("data-priority");return DeleteNotificationToast(t),notification_update_status(t+"."+a),!1}NotificationPosYreset=$(this).offset().top,NotificationPosY=e.originalEvent.touches[0].clientY,NotificationCurrentId=$(this).attr("id")})),$("#NotificationsToast").on("touchend",".toast",(function(e){if($(this).attr("id")===NotificationCurrentId){e.preventDefault();var t=$(this).attr("data-id"),a=$(this).attr("data-priority"),i=$(this).offset().top;if(i==NotificationPosYreset)return DeleteNotificationToast(t,!0),$(".notification-item.support-item-new[data-id='"+t+"."+a+"']").trigger("click"),!1;i+50*$(this).height()/100<0?(DeleteNotificationToast(t),notification_update_status(t+"."+a)):($(this).animate({top:NotificationPosYreset},300),NotificationCurrentId="none")}})),$("#NotificationsToast").on("touchmove",".toast",(function(e){if($(this).attr("id")===NotificationCurrentId){e.preventDefault();var t=e.originalEvent.touches[0].clientY,a=$(this).offset().top-(NotificationPosY-t);a<=1&&(NotificationPosY=t,$(this).offset({top:a}))}}));t=document.querySelector(".custom-scrollbar");Ps.initialize(t),update_own_balance_data(own_balance_init);window.setInterval(update_own_balance,3e5)}));var AlertTimeout="",NotificationsList=[],NotificationPosX=0,NotificationPosXreset=0,NotificationPosY=0,NotificationPosYreset=0,NotificationCurrentId="none",NotificationTimeout=0;function LoadTree(show_hidden=!1){$.ajax({url:"services/get_affiliates_tree.php",type:"post",cache:!1,data:{show_hidden:!0===show_hidden?1:0,token:$("body").data("session_token")},success:function(data){if("none"===data)return!1;screen.width>=992?($("#affiliates_tree").remove(),tree_template_aux=tree_template.replace("tree py-3","tree card py-3"),$("#affiliates_tree_container").html(tree_template_aux),tree_template_aux=null):($("#affiliates_tree").remove(),$("#affiliates_tree_modal_container").html(tree_template)),PrintTree(eval("["+data+"]"),show_hidden)}})}function PrintTree(e,t){$("#affiliates_tree").jstree({core:{data:e,multiple:!1},plugins:["sort","types"],sort:function(e,t){var a=this.get_node(e),i=this.get_node(t);return a.icon==i.icon?a.text>i.text?1:-1:a.icon>i.icon?1:-1}}),$("#affiliates_tree").prepend('<div class="switch font-size-custom"><label>Incluir ocultos<input id="TreeShowHidden" type="checkbox" '+(!0===t?"checked":"")+'><span class="lever"></span></label></div>'),LoadTreeListener()}function FindNextNotification(e=null){0!==NotificationsList.length?CreateNotificationToast(NotificationsList[0]):null===e&&update_own_balance(!0)}function CreateNotificationToast(e){var t=e.id.split("."),a='<div class="toast" id="NotificationsToast'+t[0]+'" data-id="'+t[0]+'" data-priority="'+t[1]+'" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false"><div class="toast-header cursor-pointer"><i class="fas fa-bell mr-2" aria-hidden="true""></i><strong class="mr-auto">'+$("body").data("users_notification")+"</strong><small>"+e.time+'</small><button type="button" class="ml-2 mb-1 close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="toast-body notification-item cursor-pointer">'+e.subject+"</div></div>";$("#NotificationsToast").append(a).css("z-index","1100");var i=$("#NotificationsToast"+t[0]);1==$("body").data("is_mobile")?i.offset({top:0-i.height()}).show().css("opacity","1").animate({top:2},300,(function(){NotificationTimeout=setTimeout((function(){DeleteNotificationToast(t[0])}),3e3)})):i.offset({left:i.width()}).show().css("opacity","1").animate({left:0},200,(function(){NotificationTimeout=setTimeout((function(){DeleteNotificationToast(t[0])}),3e3)})),NotificationsList.shift()}function DeleteNotificationToast(e,t=null){if(clearTimeout(NotificationTimeout),1==$("body").data("is_mobile")){var a=0-$("#NotificationsToast"+e).height();$("#NotificationsToast"+e).animate({top:a},200,(function(){$(this).parent().css("z-index","0"),$(this).remove(),null===t&&FindNextNotification()}))}else{a=$("#NotificationsToast"+e).width();$("#NotificationsToast"+e).animate({left:a},200,(function(){$(this).parent().css("z-index","0"),$(this).remove(),null===t&&FindNextNotification()}))}}function notification_update_status(e){$.ajax({url:"services/notification_update.php",type:"post",cache:!1,data:{notification_id:e,token:$("body").data("session_token")},error:function(e){ErrorAlert(e.responseText)}})}function copyToClipboard(e,t){var a=document.createElement("textarea");a.style.top="-1px",a.style.left="-1px",a.style.width="0px",a.style.height="0px",a.style.position="fixed",a.value=e,document.getElementById(t).parentNode.appendChild(a),a.select(),document.execCommand("copy"),a.remove()}function ModalPasswordError(e){$.ajax({type:"GET",url:"lang/"+$("body").data("current_language")+".xml",dataType:"xml",cache:!1,success:function(t){var a=$(t).find("error_"+e).text();a||(a="Unknown error"),$("#ChangePasswordError").text(a).fadeIn(),100==e&&(window.location.href=$("body").data("base_server_path")+"/login.php")}})}function update_own_balance(e=null){$.ajax({url:"services/get_own_balance.php",type:"post",cache:!1,data:{token:$("body").data("session_token")},success:function(t){update_own_balance_data(t,e)},error:function(e){0!==e.readyState&&($(".own-balance").text(""),ErrorAlert(e.responseText))}})}function update_own_balance_data(e,t=null){var a=$.parseJSON(e);$(".own-balance").text(-1==a.balance?"":a.balance);var i="",o=0;if(i='<a class="dropdown-item support-new" href="#"><i class="fas fa-paper-plane mr-2" aria-hidden="true"></i><span>'+$("body").data("support_new_ticket")+'</span><span class="float-right"></span></a>',a.support.length>0){var s='<a class="dropdown-item support-item {replace-class}" href="#" data-id="{replace-id}"><i class="far fa-share-square mr-2" aria-hidden="true"></i><span>Ticket #{replace-id2}</span><span class="float-right"> {replace-time} <i class="far fa-clock" aria-hidden="true"></i></span></a>';$.each(a.support,(function(e,t){var a="support-item-"+t.status;i+=s.replace("{replace-id}",t.id).replace("{replace-id2}",t.id).replace("{replace-time}",t.time).replace("{replace-class}",a),"new"===t.status&&o++})),$(".user-support-dropdown").html(i),$("#SupportCount").text(0!==o?o:"")}else $(".user-support-dropdown").html(i),$("#SupportCount").text("");a=JSON.parse(e),i="",o=0;if(a.notifications.length>0){s='<a class="dropdown-item notification-item {replace-class}" data-id="{replace-id}" data-status="{replace-status}"><i class="far fa-money-bill-alt mr-2" aria-hidden="true"></i><span>{replace-subject}</span><span class="float-right"> {replace-time} <i class="far fa-clock" aria-hidden="true"></i></span></a>';$.each(a.notifications,(function(e,t){var a="support-item-"+t.status;i+=s.replace("{replace-id}",t.id).replace("{replace-subject}",t.subject).replace("{replace-status}",t.status).replace("{replace-time}",t.time).replace("{replace-class}",a),"new"===t.status&&(NotificationsList.push(t),o++)})),$("#NotificationsCount").text(0!==o?o:""),null===t&&setTimeout((function(){FindNextNotification(!0)}),1e3)}else $("#NotificationsCount").text("");$(".user-notifications-dropdown").html(i)}function SuccessAlert(e){$("#UsersAlert").hide("fade"),$("#SuccessAlert").hide("fade"),$.ajax({type:"GET",url:"lang/"+$("body").data("current_language")+".xml",dataType:"xml",cache:!1,success:function(t){var a=$(t).find(e).text();a||(a="Unknown message"),$("#SuccessAlert").find(".alert-span").text(a),$("#SuccessAlert").fadeIn(),clearTimeout(AlertTimeout),AlertTimeout=setTimeout((function(){$("#SuccessAlert").fadeOut(),100==e&&(window.location.href=$("body").data("base_server_path")+"/login.php")}),3e3),$(".modal").modal("hide")}})}function check_ie_browser(){if(ua=navigator.userAgent,ua.indexOf("MSIE ")>-1||ua.indexOf("Trident/")>-1)$("#BrowserAdvice").fadeIn(500);else if(ua.indexOf("Edge/")>-1){for(var e=decodeURIComponent(document.cookie).split(";"),t=0;t<e.length;t++){for(var a=e[t];" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf("browser_advice="))return!1}$("#BrowserAdvice").fadeIn(500)}}function PercentFormat(){new AutoNumeric.multiple(".percent-format",{currencySymbol:"%",currencySymbolPlacement:"s",decimalCharacter:",",decimalCharacterAlternative:".",decimalPlaces:"2",decimalPlacesRawValue:"2",digitGroupSeparator:"",maximumValue:"100",minimumValue:"0",modifyValueOnWheel:"false",negativePositiveSignPlacement:"r",onInvalidPaste:"clamp",overrideMinMaxLimits:null,roundingMethod:"U",caretPositionOnFocus:"decimalLeft"})}function create_overlay(){$("main").append('<div id="section_overlay" class="text-center"> <div class="preloader-wrapper big active">  <div class="spinner-layer spinner-blue-only">  <div class="circle-clipper left"><div class="circle"></div></div>  <div class="gap-patch"><div class="circle"></div></div>  <div class="circle-clipper right"><div class="circle"></div></div> </div></div>'),$("#section_overlay").fadeIn("fast")}function remove_overlay(){$("#section_overlay").fadeOut("fast",(function(){$(this).remove()}))}check_ie_browser();