//v7.1.6 2021-04-21
function _webpushrExecuteHooks(e = "") {
    0 != WebPushr.execute_hooks && q.forEach(function(t) {
        t[0] == e ? window.webpushr.apply(this, t) : e || "debug" == t[0] || "init" == t[0] || "setup" == t[0] || window.webpushr.apply(this, t)
    })
}

function _webpushrSetCookie(e, t, o) {
    var i = new Date;
    i.setTime(i.getTime() + 24 * o * 60 * 60 * 1e3);
    var n = "expires=" + i.toUTCString();
    document.cookie = e + "=" + t + ";" + n + ";path=/;SameSite=Lax"
}

function _webpushrGetCookie(e) {
    var t = e + "=";
    if (!document.cookie) return !1;
    for (var o = document.cookie, i = o.split(";"), n = 0; n < i.length; n++) {
        for (var s = i[n];
            " " == s.charAt(0);) s = s.substring(1);
        if (0 == s.indexOf(t)) return s.substring(t.length, s.length)
    }
    return ""
}

function _webpushrBrowserSupport() {
    if (navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) return _webpushrSessionLogs("session_pushnotsupported"), !1;
    if (localStorage.getItem("_webpushrPromptAction")) {
        let e = JSON.parse(localStorage.getItem("_webpushrPromptAction")),
            t = new Date;
        if ("Dismiss" == e.action && e.expiry > t.getTime()) return _webpushrSessionLogs("session_prev_dismissed"), 1 != WebPushr.notificationCenter.enabled && null != WebPushr.notificationCard && 1 != WebPushr.notificationCard.enabled || ("default" == Notification.permission ? _webpushrGetPrompt("get_info").then(e => {
            _webpushrGetPromptDisplayTime(e)
        }) : _webpushrGetPrompt("bell").then(e => {
            _webpushrShowSubscriptionBell(e, Notification.permission)
        })), !1
    }
    return "safari" in window && "pushNotification" in window.safari ? "safari" : -1 != window.location.href.indexOf("http://") || "http" == WebPushr.integrationType ? "http" : "serviceWorker" in navigator ? "PushManager" in window ? "showNotification" in ServiceWorkerRegistration.prototype ? "denied" === Notification.permission ? (console.warn("WEBPUSHR: Notifications are denied by the user"), _webpushrGetPrompt("bell").then(e => {
        _webpushrShowSubscriptionBell(e, "denied")
    }), _webpushrSessionLogs("session_prev_denied"), !1) : (_wp_debug && console.log("Webpushr: Browser supports web push notifications"), !0) : (console.warn("WEBPUSHR: Notifications are not supported by this browser"), _webpushrSessionLogs("session_pushnotsupported"), !1) : (console.warn("WEBPUSHR: Push notifications are not supported by this browser"), _webpushrSessionLogs("session_pushnotsupported"), !1) : (console.warn("WEBPUSHR: Service workers are not supported by this browser"), _webpushrSessionLogs("session_pushnotsupported"), !1)
}

function _wp_registerServiceWorker() {
    "none" != WebPushr.swPath ? navigator.serviceWorker.register(WebPushr.swPath, {
        scope: WebPushr.swScope
    }).then(function(e) {
        _wp_debug && console.log("Service worker has been registered successfully!"), _webpushrCheckPermission()
    }, e => {
        console.log("Failed to register primary service worker, trying to register with alternative service worker"), navigator.serviceWorker.register("/webpushr-sw.js", {
            scope: "/"
        }).then(function(e) {
            _wp_debug && console.log("Alternative service worker has been registered successfully!"), _webpushrCheckPermission()
        }, e => {
            console.error("[SW] Service worker registration failed", e), console.warn("Cannot access service worker file. Please confirm you have service worker file at  " + WebPushr.swPath)
        })
    }) : _webpushrCheckPermission()
}

function _webpushrCheckPermission() {
    if (-1 != window.location.href.indexOf("http://") || "http" == WebPushr.integrationType) 
    return _webpushrGetCookie("_webpushrSubscriberID") ? (WebPushr.endpoint = 
        _webpushrGetCookie("_webpushrSubscriberID"), _webpushrExecuteHooks(), 
        void("undefined" != typeof _webpushrScriptReady && "function" ==
         typeof _webpushrScriptReady && _webpushrScriptReady())) : void _webpushrGetPrompt("get_info").then(e => {
        _webpushrGetPromptDisplayTime(e)
    });
    "default" == Notification.permission ? (_webpushrGetPrompt("get_info").then(e => {
        _webpushrGetPromptDisplayTime(e)
    }), _webpushrSessionLogs("session_new_to_push")) : "granted" == 
    Notification.permission && (_wp_debug && console.log("User has previously granted push permission"),
     WebPushr.welcomeNotification = 0, _webpushrSessionLogs("session_subscribed"), 
     _wpCheckSubscription(), _webpushrGetPrompt("bell").then(e => {
        _webpushrShowSubscriptionBell(e, "granted")
    }))
}
async function _webpushrGetPrompt(e) {
    const t = await fetch("https://bot.webpushr.com/prompt/" + e, {
        body: JSON.stringify({
            site_id: applicationServerKey,
            browser: WebPushr.userBrowser
        }),
        method: "POST"
    });
    return _wp_prompt_info = await t.json(), localStorage.setItem("_webpushrNotificationCenter", JSON.stringify({
        ...WebPushr.notificationCenter,
        enabled: _wp_prompt_info.notification_center
    })), WebPushr.notificationCenter = {
        ...WebPushr.notificationCenter,
        enabled: _wp_prompt_info.notification_center
    }, localStorage.setItem("_webpushrNotificationCard", JSON.stringify({
        ...WebPushr.notificationCard,
        enabled: _wp_prompt_info.notification_card.enabled
    })), WebPushr.notificationCard = {
        ...WebPushr.notificationCard,
        enabled: _wp_prompt_info.notification_card.enabled
    }, _wp_prompt_info
}

function _webpushrNotificationPermission() {
    _webpushrShowPrompt(_wp_prompt_info)
}

function _webpushrGetPromptDisplayTime(e) {
    _webpushrShowNotificationCenter(), 
    _webpushrRenderCard(), "Immediately" == e.show_prompt ? 
    (_wp_debug && console.log("Show prompt immediately"), 
    _webpushrShowPrompt(e)) : "Visits" == e.show_prompt ? 
    (_wp_debug && console.log("Show prompt after x page views", 
    _webpushrGetCookie("_webpushrPageViews"), +e.page_views), 
    _webpushrGetCookie("_webpushrPageViews") >= +e.page_views ? 
    _webpushrShowPrompt(e) : _webpushrSetCookie("_webpushrPageViews", +
    _webpushrGetCookie("_webpushrPageViews") + 1, 90)) : "Time" == e.show_prompt && 
    (_wp_debug && console.log("Show prompt after x seconds"), WebPushr.promptDelay = setTimeout(function() {
        _webpushrShowPrompt(e)
    }, 1e3 * e.time_delay))
}

function _webpushrShowNotificationCenter() {
    prompt_wrapper = document.createElement("div"), 
    prompt_wrapper.setAttribute("id", "webpushr-prompt-wrapper"),
     document.body.appendChild(prompt_wrapper), 1 == _wp_prompt_info.notification_center 
     && 3 != _wp_prompt_info.display_position && 
     (prompt_wrapper.innerHTML = _wp_prompt_info.notification_center_code, 
        document.getElementsByTagName("popup_notifications_wrapper")[0] && 1 == 
        WebPushr.notificationCenter.enabled && WebPushr.notificationCenter.notification_id == 
        document.getElementsByTagName("promptnotificationicon")[0].dataset.id && 
        (document.getElementsByTagName("promptnotificationicon")[0].style.display = "none"), 
    _webpushrBindBellEvent(), _webpushrNotificationTimeToLocal("#webpushr-bell-optin .notification_time"))
}

function _webpushrShowPrompt(e) {
    1 != e.prompt_type || _wp_is_safari ? _webpushrShowCustomPrompt(e) : (_wp_debug && console.log("Show native prompt"), _webpushrRequestPermission())
}

function _webpushrShowCustomPrompt(e) {
    if (_wp_debug && console.log("Show custom prompt"), _webpushrGetCookie("_webpushrSubscriberID")) return;
    let t = JSON.parse(localStorage.getItem("_webpushrPromptAction")),
        o = new Date;
    (!t || "Dismiss" == t.action && t.expiry < o.getTime()) && (prompt_wrapper = document.getElementById("webpushr-prompt-wrapper"), prompt_wrapper.innerHTML += e.code, _webpushrCustomPromptEvents(e)), void 0 !== document.getElementsByTagName("promptglowingcircle")[0] && _webpushrPromptImpressions("bell")
}

function _webpushrShowSubscriptionBell(e, t) {
    prompt_wrapper = document.getElementById("webpushr-prompt-wrapper"), 
    null == prompt_wrapper && (prompt_wrapper = document.createElement("div"), 
    prompt_wrapper.setAttribute("id", "webpushr-prompt-wrapper")), "denied" === t ? 
    prompt_wrapper.setAttribute("class", "webpushr-subscribed webpushr-notification-denied") : 
    "granted" === t && ("off" == localStorage.getItem("_webpushrBellNotification") ? 
    prompt_wrapper.setAttribute("class", "webpushr-subscribed webpushr-notification-off") : 
    prompt_wrapper.setAttribute("class", "webpushr-subscribed webpushr-notification-on")), 
    prompt_wrapper.innerHTML = e.code, document.body.appendChild(prompt_wrapper), 
    "denied" == t && _webpushrPermissionResetInstructions(), _webpushrBindBellEvent(), 
    void 0 !== document.getElementsByTagName("promptnotificationicon")[0] && 
    ((WebPushr.notificationCenter.enabled = WebPushr.notificationCenter.notification_id == document.getElementsByTagName("promptnotificationicon")[0].dataset.id) ? 
    document.getElementsByTagName("promptnotificationicon")[0].style.display = "none" : 
    (document.getElementsByTagName("prompticon3")[0].style.transform = "scale(.9)",
     document.getElementsByTagName("prompticon3")[0].style.opacity = "1"), 
     _webpushrNotificationTimeToLocal("#webpushr-bell-optin .notification_time")), 
     _webpushrRenderCard(), document.getElementsByClassName("webpushr-toggle-bell-popup")[0] && 
     document.getElementsByClassName("webpushr-toggle-bell-popup")[0].addEventListener("click", function() {
        _webpushrNotificationCardLogs("bell_opened")
    })
}

function _webpushrRenderCard() {
    if (1 == _wp_prompt_info.notification_card.enabled && (void 0 === WebPushr.notificationCard.id || WebPushr.notificationCard.id != _wp_prompt_info.notification_card.id)) {
        if (null == _wp_prompt_info.notification_card.id) return;
        card_wrapper = document.createElement("div"), card_wrapper.setAttribute("id", "webpushr-notification-card-wrapper"), document.body.appendChild(card_wrapper), card_wrapper.innerHTML = _wp_prompt_info.notification_card.code, cardImg = document.getElementById("webpushr-notification-card-img"), cardImg ? cardImg.addEventListener("load", function() {
            _webpushrShowCard(_wp_prompt_info.notification_card.id)
        }, !1) : _webpushrShowCard(_wp_prompt_info.notification_card.id), document.getElementById("webpushr-card-notification").addEventListener("click", function() {
            _webpushrNotificationCardLogs("clicked"), popup_notification_clicked(this)
        }), _webpushrNotificationTimeToLocal("#webpushr-notification-card-wrapper .notification_time")
    }
}

function _webpushrShowCard(e) {
    let t = document.getElementById("webpushr-notification-card-wrapper");
    t.className = "show-webpushr-notification-card", 1 == _wp_prompt_info.notification_card.auto_hide && setTimeout(function() {
        t.className = ""
    }, 1e3 * _wp_prompt_info.notification_card.auto_hide_delay), localStorage.setItem("_webpushrNotificationCard", JSON.stringify({
        enabled: "1",
        id: e
    })), WebPushr.notificationCard = {
        enabled: "1",
        id: e
    }, document.getElementById("webpushr-close-card").addEventListener("click", function() {
        t.className = "", _webpushrNotificationCardLogs("closed")
    }, !1), _webpushrNotificationCardLogs("impression")
}

function _webpushrNotificationTimeToLocal(e) {
    webpushrNotificationTime = document.querySelectorAll(e), webpushrNotificationTime && webpushrNotificationTime.forEach(e => {
        var t = new Date(e.innerText + " UTC");
        diffInMinutes = Math.round((new Date(Date.now()) - t) / 6e4), diffInMinutes < 1 ? e.innerText = "Just now" : diffInMinutes < 60 ? e.innerText = diffInMinutes + " minute" + (diffInMinutes > 1 ? "s" : "") + " ago" : diffInMinutes > 59 && diffInMinutes < 1440 ? e.innerText = Math.round(diffInMinutes / 60) + " hour" + (Math.round(diffInMinutes / 60) > 1 ? "s" : "") + " ago" : e.innerText = Math.round(diffInMinutes / 1440) + " day" + (Math.round(diffInMinutes / 1440) > 1 ? "s" : "") + " ago"
    })
}

function _webpushrPermissionResetInstructions() {
    denied_image_ele = document.getElementById("webpushrDeniedImg"), 
    denied_image_ele && (document.getElementById("webpushr-prompt-wrapper").className = "webpushr-subscribed webpushr-notification-denied",
     navigator.userAgent.match(/Android/i) ? 
     denied_image_ele.src = "https://webpushrapp-3744.kxcdn.com/assets/images/mobile.gif" : "safari" in window ? 
     denied_image_ele.src = "https://webpushrapp-3744.kxcdn.com/assets/images/safari-reset.gif" : 
     denied_image_ele.src = "https://webpushrapp-3744.kxcdn.com/assets/images/allow_notifications.001-min.png")
}

function _webpushrPromptAction(e) {
    if (_wp_debug && console.log("Prompt action : " + e), 
    _webpushrPromptImpressions(e), 
    "function" == typeof webpushrPermissionAction && webpushrPermissionAction(e), 
    document.getElementById("webpushr-lightbox-optin") && 
    document.getElementById("webpushr-lightbox-optin").remove(), 
    clearTimeout(WebPushr.promptDelay), "Dismiss" == e) {
        let t = new Date;
        expiry = t.getTime() + 24 * _wp_prompt_info.re_show_prompt * 60 * 60 * 1e3, 
        localStorage.setItem("_webpushrPromptAction", JSON.stringify({
            action: e,
            expiry: expiry
        }))
    }
    if ("Approve" == e)
        if (_wp_is_safari) {
            _wp_debug && console.log("Show safari prompt");
            var t = window.safari.pushNotification.permission(WebPushr.applePushID);
            checkRemotePermission(t)
        } else _wp_prompt_info.domain_label ? window.open(_wp_prompt_info.domain_label + "/subscribe?public_key=" + applicationServerKey, "wpushr-subscribe-dialog", "width=626, height=436, resizable=0, scrollbars=0, status=0, titlebar=0, left=" + (screen.width - 626) / 2 + ", top=" + (screen.height - 436) / 2) : _webpushrRequestPermission()
}

function _webpushrToggleEditNotificationPopup() {
    document.getElementById("webpushr-prompt-wrapper").classList.remove("webpushr-ackn", "webpushr-server-success", "webpushr-server-error"), document.getElementsByTagName("promptPopup")[0].classList.toggle("promptPopup-show"), document.getElementsByTagName("prompticon3")[0].classList.toggle("promptBellLarge"), void 0 !== document.getElementsByTagName("promptnotificationicon")[0] && (document.getElementsByTagName("promptnotificationicon")[0].style.display = "none", document.getElementsByTagName("prompticon3")[0].removeAttribute("style"), webpushrNotificationImg = document.querySelectorAll(".webpushr-notification-img"), webpushrNotificationImg && webpushrNotificationImg.forEach(e => {
        e.dataset.src && (e.src = e.dataset.src)
    }), localStorage.setItem("_webpushrNotificationCenter", JSON.stringify({
        ...WebPushr.notificationCenter,
        notification_id: document.getElementsByTagName("promptnotificationicon")[0].dataset.id
    })), WebPushr.notificationCenter = {
        ...WebPushr.notificationCenter,
        notification_id: document.getElementsByTagName("promptnotificationicon")[0].dataset.id
    })
}

function _webpushrTrunNotification(e, t, o = !0) {
    t && (t.className += " webpushrBtnWaiting"), fetch("https://bot.webpushr.com/subscribe/status/" + e, {
        body: JSON.stringify({
            site_id: applicationServerKey,
            endpoint: WebPushr.endpoint
        }),
        method: "POST"
    }, 1e3).then(e => e.json()).then(function(e) {
        if ("success" != e.response) throw "failed";
        localStorage.setItem("_webpushrBellNotification", e.status), 
        document.getElementById("webpushr-prompt-wrapper").className = "webpushr-ackn webpushr-server-success webpushr-subscribed webpushr-notification-" + e.status, document.getElementsByClassName("webpushrBtnWaiting")[0].classList.remove("webpushrBtnWaiting"), o && setTimeout(_webpushrToggleEditNotificationPopup, 500)
    }).catch(e => {
        document.getElementById("webpushr-prompt-wrapper").className = "webpushr-ackn webpushr-subscribed webpushr-server-error"
    })
}

function _wpCheckSubscription() {
    navigator.serviceWorker.ready.then(e => e.pushManager.getSubscription()).then(e => 
        (_wp_debug && console.log("Check subscription"), e ? (_wp_debug && console.log("Previous subscription found"), 
        _webpushrSubscribeNow(e), _webpushrOldEndPoint = 
        localStorage.getItem("_webpushrEndPoint"), 
        _webpushrOldEndPoint || (localStorage.setItem("_webpushrEndPoint", e.endpoint), 
        _webpushrSetCookie("_webpushrEndPoint", e.endpoint, 90), _webpushrOldEndPoint = 
        localStorage.getItem("_webpushrEndPoint")), _webpushrGetCookie("_webpushrEndPoint") ||
         _webpushrSetCookie("_webpushrEndPoint", e.endpoint, 90), _webpushrOldEndPoint != e.endpoint ? 
         (WebPushr.execute_hooks = !1, _wp_debug && 
            console.log("existing user, endpoint change detected,  update subscription object and last visit in database & update new endpoint in local storage"), 
            e.old_endpoint = _webpushrOldEndPoint, localStorage.removeItem("_webpushrCustomAttribute"), 
            localStorage.setItem("_webpushrEndPoint", e.endpoint), _webpushrSetCookie("_webpushrEndPoint", e.endpoint, 90), 
            _webpushrSetCookie("_webpushrLastVisit", today, 3), _webpushrSendSubscriptionToServer(e, "PUT", "update")) : 
            (_webpushrLastVisit = _webpushrGetCookie("_webpushrLastVisit"), _webpushrLastVisit ? void 0 : 
            (_webpushrSetCookie("_webpushrLastVisit", today, 3), _wp_debug && console.log("Send last visit update request"), 
            localStorage.removeItem("_webpushrCustomAttribute"), WebPushr.execute_hooks = !1,
             _webpushrSendSubscriptionToServer(e, "PUT")))) : (_wp_debug && console.log("No previous subscription found"),
              WebPushr.silentSubscribed = 1, _webpushrPromptImpressions("resubscribed"), void _webpushrRequestPermission()))).catch(e => {
        console.log(e)
    })
}

function _webpushrRequestPermission() {
    Notification.requestPermission().then(e => {
        switch (e) {
            case "default":
                console.log("Permission unknown");
                break;
            case "denied":
                console.log("Permission denied"), "function" == typeof webpushrPermissionAction && webpushrPermissionAction("denied"), WebPushr.subscriptionButton && (WebPushr.subscriptionButton.style.display = "none", document.getElementById("webpushr-subscriber-count") && (document.getElementById("webpushr-subscriber-count").style.display = "none")), _webpushrGetPrompt("bell").then(e => {
                    _webpushrShowSubscriptionBell(e, "denied")
                }), _webpushrPermissionResetInstructions();
                let t = document.getElementById("webpushrSubscriptionToggleButton");
                t && (t.disabled = !0, t.checked = !1), _webpushrSendSubscriptionToServer("", "DELETE");
                break;
            case "granted":
                "function" == typeof webpushrPermissionAction && webpushrPermissionAction("granted"), WebPushr.subscriptionButton && (WebPushr.subscriptionButton.style.display = "none", document.getElementById("webpushr-subscriber-count") && (document.getElementById("webpushr-subscriber-count").style.display = "none")), _webpushrGetPrompt("bell").then(e => {
                    _webpushrShowSubscriptionBell(e, "granted")
                }), localStorage.removeItem("_webpushrBellNotification"), localStorage.removeItem("_webpushrPromptAction"), _webpushrSubscribeNow()
        }
        WebPushr.silentSubscribed || _webpushrPromptImpressions(e)
    })
}

function _webpushrSubscribeNow(e = null) {
    navigator.serviceWorker.ready.then(function(t) {
        t.pushManager.subscribe({
            userVisibleOnly: !0,
            applicationServerKey: _wp_urlBase64ToUint8Array(applicationServerKey)
        }).then(t => {
            if (WebPushr.endpoint = t.endpoint, null == e) return _wp_debug && console.log("New subscriber, store in localstorage and database"), localStorage.removeItem("_webpushrCustomAttribute"), localStorage.setItem("_webpushrEndPoint", t.endpoint), _webpushrSetCookie("_webpushrEndPoint", t.endpoint, 90), _webpushrSetCookie("_webpushrLastVisit", today, 3), _webpushrSendSubscriptionToServer(t, "POST");
            _webpushrExecuteHooks(), "undefined" != typeof _webpushrScriptReady && "function" == typeof _webpushrScriptReady && _webpushrScriptReady()
        }).catch(t => {
            e ? e.unsubscribe().then(function(e) {
                WebPushr.silentSubscribed = 1, _webpushrPromptImpressions("transfer"), _webpushrRequestPermission()
            }) : console.error(t)
        })
    })
}

function _wp_urlBase64ToUint8Array(e) {
    const t = "=".repeat((4 - e.length % 4) % 4),
        o = (e + t).replace(/\-/g, "+").replace(/_/g, "/"),
        i = window.atob(o),
        n = new Uint8Array(i.length);
    for (let e = 0; e < i.length; ++e) n[e] = i.charCodeAt(e);
    return n
}

function _webpushrSendSubscriptionToServer(e, t, o = "") {
    if (e && !_wp_is_safari) {
        const o = e.getKey("p256dh"),
            n = e.getKey("auth");
        var i = {
            endpoint: e.endpoint,
            key: o ? btoa(String.fromCharCode.apply(null, new Uint8Array(o))) : null,
            token: n ? btoa(String.fromCharCode.apply(null, new Uint8Array(n))) : null,
            site_id: applicationServerKey,
            type: t,
            old: "old_endpoint" in e ? e.old_endpoint : "",
            welcome_notification: WebPushr.welcomeNotification,
            timezone: (new Date).getTimezoneOffset()
        }
    } else e && _wp_is_safari ? (WebPushr.endpoint = e, i = {
        type: "POST",
        site_id: applicationServerKey,
        endpoint: e,
        timezone: (new Date).getTimezoneOffset()
    }) : i = {
        type: "DELETE",
        site_id: applicationServerKey
    };
    fetch("https://bot.webpushr.com/subscribe/" + o, {
        body: JSON.stringify(i),
        method: "POST"
    }).then(function(e) {
        if (e.ok) return e.text()
    }).then(function(e) {
        WebPushr.execute_hooks = !0, _webpushrExecuteHooks(), "undefined" != typeof _webpushrScriptReady && "function" == typeof _webpushrScriptReady && _webpushrScriptReady()
    })
}

function _webpushrPromptImpressions(e) {
    e && (data = {
        status: e,
        site_id: applicationServerKey
    }, fetch("https://analytics.webpushr.com/impression/prompt", {
        body: JSON.stringify(data),
        method: "POST"
    }).then(function(e) {
        if (e.ok) return e.text()
    }))
}

function _webpushrNotificationCardLogs(e) {
    data = {
        status: e,
        site_id: applicationServerKey
    }, fetch("https://analytics.webpushr.com/notification_card/" + e, {
        body: JSON.stringify(data),
        method: "POST"
    }).then(function(e) {
        if (e.ok) return e.text()
    }).then(function(e) {})
}

function _webpushrSessionLogs(e) {
    e && (sessionStorage.getItem("_webpushrSessionLog") || (data = {
        status: e,
        site_id: applicationServerKey
    }, fetch("https://analytics.webpushr.com/impression/session", {
        body: JSON.stringify(data),
        method: "POST"
    }).then(function(e) {
        if (e.ok) return e.text()
    }).then(function(e) {
        sessionStorage.setItem("_webpushrSessionLog", data.status)
    })))
}

function _webpushrDisplayPrompt() {
    document.getElementById("_prompt_overlay").style.display = "block", _webpushrPromptImpressions("custom_prompt")
}

function _webpushrCustomPromptEvents(e) {
    elePromptLogo = document.getElementById("webpushr-prompt-logo"), elePromptLogo && elePromptLogo.addEventListener("load", _webpushrDisplayPrompt(), !1), eleApproveBtn = document.getElementById("webpushr-approve-button"), eleApproveBtn && eleApproveBtn.addEventListener("click", function() {
        _webpushrPromptAction("Approve")
    }), eleDenyBtn = document.getElementById("webpushr-deny-button"), eleDenyBtn && eleDenyBtn.addEventListener("click", function() {
        _webpushrPromptAction("Dismiss")
    }), eleCookieInfo = document.getElementById("webpushr-cookie-info"), eleCookieInfo && eleCookieInfo.addEventListener("click", function() {
        return document.getElementsByTagName("cookieDiscloser")[0].className = "_showCookieDiscloser", document.getElementsByTagName("webpushrPromptConatiner")[0].className = "_hideWebpushrPromptConatiner", !1
    }), eleCookieGoback = document.getElementById("webpushr-cookie-goback"), eleCookieGoback && eleCookieGoback.addEventListener("click", function() {
        return document.getElementsByTagName("cookieDiscloser")[0].className = "_hideCookieDiscloser", document.getElementsByTagName("webpushrPromptConatiner")[0].className = "", !1
    }), eleClickinfoCookie = document.getElementById("webpushr-clickinfo-cookie"), eleClickinfoCookie && eleClickinfoCookie.addEventListener("click", function() {
        return ele = document.getElementById("more-info-cookie"), ele.classList.contains("_showcookiemoreinfo") ? (ele.classList.remove("_showcookiemoreinfo"), document.getElementById("webpushr-clickinfo-cookie").innerText = "Show cookie info") : (ele.className += " _showcookiemoreinfo", document.getElementById("webpushr-clickinfo-cookie").innerText = "Hide cookie info"), !1
    }), eleCookieinfoData = document.getElementById("webpushr-cookieinfo-data"), eleCookieinfoData && eleCookieinfoData.addEventListener("click", function() {
        return ele = document.getElementById("more-info-storage"), ele.classList.contains("_showcookiemoreinfo") ? (ele.classList.remove("_showcookiemoreinfo"), document.getElementById("webpushr-cookieinfo-data").innerText = "Show data info") : (ele.className += " _showcookiemoreinfo", document.getElementById("webpushr-cookieinfo-data").innerText = "Hide data info"), !1
    }), _webpushrBindBellEvent()
}

function _webpushrBindBellEvent() {
    eleBellPopup = document.querySelectorAll(".webpushr-toggle-bell-popup"), eleBellPopup && eleBellPopup.forEach(e => {
        e.addEventListener("click", function() {
            _webpushrToggleEditNotificationPopup()
        })
    }), webpushrUnknownBtn = document.getElementById("webpushrUnknownBtn"), webpushrUnknownBtn && webpushrUnknownBtn.addEventListener("click", function() {
        _webpushrToggleEditNotificationPopup(), _webpushrPromptAction("Approve")
    }), webpushrOffBtn = document.getElementById("webpushrOffBtn"), webpushrOffBtn && webpushrOffBtn.addEventListener("click", function() {
        _webpushrTrunNotification("on", webpushrOffBtn)
    }), webpushrOnBtn = document.getElementById("webpushrOnBtn"), webpushrOnBtn && webpushrOnBtn.addEventListener("click", function() {
        _webpushrTrunNotification("off", webpushrOnBtn)
    }), document.querySelectorAll(".webpushr-notification").forEach(e => e.addEventListener("click", function() {
        _webpushrNotificationCardLogs("bell_notification_clicked"), popup_notification_clicked(this)
    }))
}

function popup_notification_clicked(e) {
    let t = e,
        o = {
            type: "cl",
            campaign_id: t.dataset.id,
            server: t.dataset.server,
            sid: t.dataset.site
        };
    t.insertAdjacentHTML("beforeend", "<img style='box-sizing:border-box; margin: 0 auto;position: absolute;width: 100%;height: 100%;top: 0;background: #908c8c7a;padding:10px; left: 0;border-radius: 10px;' src='data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHN0eWxlPSIiIHdpZHRoPSIxMDVweCIgaGVpZ2h0PSI1MHB4IiBjbGFzcz0ic3ZnLWxvYWRlciIgYmFja2dyb3VuZD0iIiBmaWxsPSIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjEwcHgiIHk9IjEwMHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHhtbDpzcGFjZT0iIj48cGF0aCB3aWR0aD0iNTBweCIgaWQ9InNwaW5uZXIiIGZpbGw9IiMwYzAxYTciIHBhZGRpbmc9IjUwcHgiIGQ9Ik00MCw3MkMyMi40LDcyLDgsNTcuNiw4LDQwQzgsMjIuNCwyMi40LDgsNDAsOGMxNy42LDAsMzIsMTQuNCwzMiwzMmMwLDEuMS0wLjksMi0yLDJzLTItMC45LTItMmMwLTE1LjQtMTIuNi0yOC0yOC0yOFMxMiwyNC42LDEyLDQwczEyLjYsMjgsMjgsMjhjMS4xLDAsMiwwLjksMiwyUzQxLjEsNzIsNDAsNzJ6Ij48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVUeXBlPSJ4bWwiIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBmcm9tPSIwIDQwIDQwIiB0bz0iMzYwIDQwIDQwIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9wYXRoPjwvc3ZnPg=='>"), fetch("https://notevents.webpushr.com/notification/lg/", {
        body: JSON.stringify(o),
        method: "POST"
    }).then(function(e) {
        window.location.href = t.dataset.url
    })
}

function _webpushrShowSubscriberCount(e) {
    const t = sessionStorage.getItem("_webpushrSubscriberCount");
    WebPushr.subscriptionButton.insertAdjacentHTML("afterend", '<div id="webpushr-subscriber-count">' + t + " " + (e || "Users already subscribed") + "</div>")
}

function webpushr_display_button() {
    if (WebPushr.subscriptionButton = document.getElementById("webpushr-subscription-button"), 
    button_data = WebPushr.subscriptionButton.dataset, button_style = WebPushr.subscriptionButton.style, 
    "default" != Notification.permission) return button_style.display = "none", !1;
    document.head.insertAdjacentHTML("beforeend", 
    '<style>\t#webpushr-subscription-button{background-color: #0078ff; font-size:16px; color: #fff; display: inline-flex; align-items: center; gap: 6px; position:relative; padding: 10px; border-radius: 4px; font-family: Arial,Helvetica Neue,Helvetica,sans-serif; cursor: pointer; box-sizing: content-box; box-shadow:0 2px 5px rgba(0, 0, 0, .2);}\t#webpushr-subscription-button span{position:relative; display:inline-flex;}\t#webpushr-subscription-button:focus,#webpushr-subscription-button:active{top:1px; outline:none}\t#webpushr-subscription-button:hover:before{content: " ";background: #000;width: 100%;height: 100%;position: absolute;left: 0;opacity: 0.1;}\t#webpushr-subscriber-count{color:#333; font-size: 12px;font-family: Arial,Helvetica Neue,Helvetica,sans-serif;margin-top: 3px; margin-left:3px;}\t#webpushr-subscription-button[data-size="medium"]{font-size:14px; padding:7px 10px;}\t#webpushr-subscription-button[data-size="medium"] span svg{width:15px !important; height: 22px !important}\t#webpushr-subscription-button[data-size="small"]{font-size:12px; padding:5px 10px;}\t#webpushr-subscription-button[data-size="small"] span svg{width:13px !important; height: 20px !important}\t#webpushr-subscription-button[data-theme="dark"]{box-shadow:none}\t#webpushr-subscription-button[data-theme="dark"]+#webpushr-subscriber-count{color:#fff !important}\t</style>'), 
    WebPushr.subscriptionButton.innerHTML = '<span><svg version="1.1" id="webpushr_btn_bell_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 440.832 440.832" style="width:18px; height:18px; fill:#fff" xml:space="preserve"><g><g><path d="M381.44,265.728V161.792C381.44,72.192,309.248,0,219.648,0S58.368,72.192,58.368,161.792v103.936l-41.984,82.944h408.064 L381.44,265.728z"></path></g></g><g><g><path d="M151.552,372.736c0,37.376,30.72,68.096,68.096,68.096c37.376,0,68.096-30.72,68.096-68.096H151.552z"></path></g></g></svg></span><span>' + 
    (button_data.buttonText ? button_data.buttonText : "Subscribe to notifications") + "</span>", 
    "false" !== button_data.showSubscriberCount && (sessionStorage.getItem("_webpushrSubscriberCount") ? _webpushrShowSubscriberCount(button_data.subscriberCountText) : fetch("https://bot.webpushr.com/get_subscriber_count/", {
        body: JSON.stringify({
            site_id: applicationServerKey,
            time: Date.now()
        }),
        method: "POST"
    }).then(function(e) {
        if (e.ok) return e.text()
    }).then(function(e) {
        sessionStorage.setItem("_webpushrSubscriberCount", e), _webpushrShowSubscriberCount(button_data.subscriberCountText)
    }));
    for (const [e, t] of Object.entries(button_data)) button_style[e] = t;
    button_data.color && (document.getElementById("webpushr_btn_bell_icon").style.fill = button_data.color), WebPushr.subscriptionButton.addEventListener("click", _webpushrRequestPermission)
}

function webpushr_display_toggle_button() {
    let e = document.getElementById("webpushr-subscription-toggle-button"),
        t = e.dataset.color ? e.dataset.color : "#2c7be5";
    document.head.insertAdjacentHTML("beforeend", '<style>\t#webpushr-subscription-toggle-button{transform-origin: left center;    position: relative; width:30px; height:18px; display:inline-block; box-sizing:content-box; line-height:1;}\t#webpushr-subscription-toggle-button img{position:absolute; top:0; left: 33px; display:none}\t#webpushr-subscription-toggle-button label{position:relative; line-height: 1.45rem;    margin: 0;vertical-align: top;font-size: .83333rem;font-weight: 500!important;font-family: Poppins,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";display: inline-flex;    box-sizing: content-box; width:30px; height:18px; transform-origin:left center; }\t#webpushrSubscriptionToggleButton{visibility:hidden; padding:0; margin:0; display:none;}\t#webpushr-subscription-toggle-button label::before{display: block;height: 14px;content: "";background-color: #fff;border: ' +
     t + ' solid 1px;-webkit-transition: background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;width: 1.75rem;pointer-events: all;border-radius: .5rem;    color: #fff;}\t#webpushr-subscription-toggle-button label:active::before{border-color: #9ec2f3;}\t#webpushr-subscription-toggle-button label::after{content:"";position: absolute; top: 2px;left:3px;width: calc(1rem - 4px);height: calc(1rem - 4px);background-color: ' + 
     t + ";border-radius: .5rem;    transition: transform .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-transform .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;}\t#webpushrSubscriptionToggleButton:checked+label:before{color: #fff;border-color: " + t + ";background-color: " + t + 
     ';}\t#webpushrSubscriptionToggleButton:disabled+label:before{background-color: #eeeeee;}\t#webpushrSubscriptionToggleButton:checked+label:after{background-color: #fff;transform: translateX(0.8rem);}\t#webpushr-subscription-toggle-button tooltip{box-sizing:content-box; display:block;transition: all .15s ease;position: absolute;background: #000;color: #fff;border: 1px solid #000;padding: 10px;pointer-events: none;font-size: 14px;line-height: 18px;font-weight: 400;border-radius: 8px;z-index: 3;font-family: Helvetica Neue,Helvetica,Arial,sans-serif !important; width: 220px; transform:scaleX(0); transform-origin:left; text-align:left; }\t#webpushr-subscription-toggle-button tooltip::before{content:"";display: block;position: absolute;top: calc(50% - 8px);border-right: 8px solid transparent;border-top: 8px solid #000;border-left: 8px solid #000;border-bottom: 8px solid transparent;border-radius: 2px;}\t#webpushr-subscription-toggle-button tooltip::before{left:-6px;transform: rotate(-45deg);}\t#webpushr-subscription-toggle-button tooltip[data-position="left"]::before{right:-6px;transform: rotate(135deg);left:unset;}\t#webpushr-subscription-toggle-button tooltip[data-position="top"]::before{left:12px;transform: rotate(225deg); top:unset; bottom:-7px;}\t#webpushr-subscription-toggle-button tooltip[data-position="bottom"]::before{ left:12px;transform:rotate(45deg);top: -6px;}\t#webpushr-subscription-toggle-button tooltip[data-position="left"]{transform-origin:right;text-align: right;padding-right: 12px;}\t#webpushr-subscription-toggle-button tooltip.webpushr-tooltip-active{transform:scaleX(1)}\t#webpushr-subscription-toggle-button tooltip[data-position="top"].webpushr-tooltip-active{left:-6px;}\t</style>');
    let o = "";
    "default" == Notification.permission ? o = "" : "denied" == Notification.permission ? o = " disabled " : "granted" == Notification.permission && (o = "off" == localStorage.getItem("_webpushrBellNotification") ? "" : " checked "), e.innerHTML = "<input " + o + ' id="webpushrSubscriptionToggleButton" type="checkbox"><label for="webpushrSubscriptionToggleButton"></label>';
    let i = document.querySelector("#webpushr-subscription-toggle-button label"),
        n = document.getElementById("webpushrSubscriptionToggleButton");
    if (i.style.transform = "scale(" + e.dataset.size + ")",
        e.style.width = i.getBoundingClientRect().width + "px", e.style.height = i.getBoundingClientRect().height + "px", "default" == Notification.permission) n.addEventListener("click", _webpushrRequestPermission);
    else if ("denied" == Notification.permission) {
        e.innerHTML += "<tooltip>" + (e.dataset.textWhenDenied ? e.dataset.textWhenDenied : "You've blocked push notifications.") + "</tooltip>";
        let t = document.querySelector("#webpushr-subscription-toggle-button tooltip"),
            o = document.querySelector("#webpushr-subscription-toggle-button label");
        t.dataset.position = e.dataset.tooltipPosition, "left" == e.dataset.tooltipPosition ? (t.style.right = o.getBoundingClientRect().width + 12 + "px", t.style.top = "calc(50% - " + t.getBoundingClientRect().height / 2 + "px)") : "top" == e.dataset.tooltipPosition ? (t.style.bottom = o.getBoundingClientRect().height + 12 + "px", t.style.top = "unset") : "bottom" == e.dataset.tooltipPosition ? t.style.top = o.getBoundingClientRect().height + 5 + "px" : (t.style.left = o.getBoundingClientRect().width + 12 + "px", t.style.top = "calc(50% - " + t.getBoundingClientRect().height / 2 + "px)"), o.addEventListener("mouseover", function(e) {
            t.className = "webpushr-tooltip-active"
        }), o.addEventListener("mouseleave", function(e) {
            t.className = "webpushr-tooltip-inactive"
        })
    } else "granted" == Notification.permission && n.addEventListener("click", function() {
        1 == n.checked ? (webpushrOffBtn = document.getElementById("webpushrOffBtn"), _webpushrTrunNotification("on", webpushrOffBtn, !1)) : (webpushrOnBtn = document.getElementById("webpushrOnBtn"), _webpushrTrunNotification("off", webpushrOnBtn, !1)), n.disabled = !0
    })
}

    var applicationServerKey, _wp_prompt_info, q = window.webpushr.q || [],
    WebPushr = {
        userBrowser: navigator.userAgent.indexOf("Firefox") > -1 ? "Firefox" : "safari" in window ? "Safari" : "Chrome",
        integrationType: null,
        swScope: null,
        swPath: null,
        deviceToken: null,
        applePushID: null,
        endpoint: null,
        promptInfo: null,
        silentSubscribed: null,
        welcomeNotification: 1,
        execute_hooks: !0,
        subscriptionButton: !1,
        promptDelay: 0,
        notificationCenter: JSON.parse(localStorage.getItem("_webpushrNotificationCenter")),
        notificationCard: JSON.parse(localStorage.getItem("_webpushrNotificationCard"))
    },

    d1 = new Date;
    today = d1.getMonth() + 1 + "/" + d1.getDate() + "/" + d1.getFullYear() + " 00:00";
    var _wp_is_safari = !1,
    _wp_debug = !1,
    publicMethods = {
        setup: function(e) {
            publicMethods.init(e.key, e.sw, e.scope, e.integration)
        },
        init: function(e, t, o = "/", i = "https") {
            if (WebPushr.swScope = o, WebPushr.integrationType = "popup" == i ? "http" : "https", !WebPushr.swPath) 
                switch (console.log("Web Push Notifications powered by Webpushr"), applicationServerKey = e, WebPushr.swPath = t || "/webpushr-sw.js", _webpushrBrowserSupport()) {
                case !0:
                    _wp_registerServiceWorker();
                    break;
                case "safari":
                    _wp_debug && console.log("Safari browser detected"), _wp_is_safari = !0, _webpushrGetPrompt("get_info").then(e => {
                        if (WebPushr.applePushID = e.safari_push_id, !e.enable_safari_push) return _wp_debug && console.log("Safari notifications are disabled"), _webpushrSessionLogs("session_pushnotsupported"), !1;
                        var t = window.safari.pushNotification.permission(WebPushr.applePushID);
                        "granted" == t.permission ? (_webpushrSessionLogs("session_subscribed"), _webpushrGetPrompt("bell").then(e => {
                            _wp_debug && console.log("User has previously granted push permission."), 1 == e.subscriptionbell_show && _webpushrShowSubscriptionBell(e, "granted")
                        }), WebPushr.deviceToken = t.deviceToken, fetch("https://bot.webpushr.com/subscribe/safari_log", {
                            body: JSON.stringify({
                                token: WebPushr.deviceToken,
                                site_id: applicationServerKey
                            }),
                            method: "POST"
                        }).then(function(e) {
                            if (e.ok) return e.text()
                        }).then(function(e) {
                            WebPushr.endpoint = WebPushr.deviceToken, _webpushrExecuteHooks(), "undefined" != typeof _webpushrScriptReady && "function" == typeof _webpushrScriptReady && _webpushrScriptReady()
                        }), _wp_debug && console.log("Safari permission has previously been granted")) : "denied" == t.permission ? (_wp_debug && console.log("Safari permission has previously been denied"), _webpushrGetPrompt("bell").then(e => {
                            _webpushrShowSubscriptionBell(e, "denied")
                        }), _webpushrSessionLogs("session_prev_denied")) : "default" === t.permission && (_wp_debug && console.log("Ask for Safari permission"), _webpushrSessionLogs("session_new_to_push"), setTimeout(function() {
                            _webpushrGetPromptDisplayTime(e)
                        }, 4e3))
                    });
                    break;
                case "http":
                    -1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome") ? console.warn("WEBPUSHR: iPad detected. iOS does not support Web Push.") : _webpushrCheckPermission()
            }
        },
        uid: function(e) {
            data = {
                uid: e,
                sid: WebPushr.endpoint,
                site_id: applicationServerKey
            }, fetch("https://bot.webpushr.com/subscribe/uid/", {
                body: JSON.stringify(data),
                method: "POST"
            })
        },
        event: function(e) {
            return _wp_debug && console.log("Run Webpushr Custom Event hook"), e.event_name ? e.event_action ? (data = {
                ...e,
                sid: WebPushr.endpoint,
                site_id: applicationServerKey
            }, void fetch("https://bot.webpushr.com/logs/event/", {
                body: JSON.stringify(data),
                method: "POST"
            })) : console.error("Webpushr event hook: event_action is required", e) : console.error("Webpushr event hook: event_name is required", e)
        },
        attributes: function(e) {
            if (_wp_debug && console.log("Run Custom Attribute hook"), !e) return console.error("Webpushr attributes hook: minimum of 1 attribute is required", e);
            localStorage.getItem("_webpushrCustomAttribute") != JSON.stringify(e) && (_wp_debug && console.log("Attribute cookie not found. Send fetch request now"), localStorage.setItem("_webpushrCustomAttribute", JSON.stringify(e)), data = {
                ...e,
                sid: WebPushr.endpoint,
                site_id: applicationServerKey
            }, fetch("https://bot.webpushr.com/subscribe/attributes/", {
                body: JSON.stringify(data),
                method: "POST"
            }).then(function(e) {
                if (e.ok) return e.text()
            }))
        },
        debug: function(e) {
            console.log("Run dubug hook"), _wp_debug = !0
        },
        fetch_id: function(e) {
            if (!WebPushr.endpoint || !applicationServerKey) return e(!1);
            data = {
                sid: WebPushr.endpoint,
                site_id: applicationServerKey
            }, fetch("https://bot.webpushr.com/subscribe/getId/", {
                body: JSON.stringify(data),
                method: "POST"
            }).then(function(e) {
                if (e.ok) return e.text()
            }).then(function(t) {
                e(t)
            })
        }
    };
    window.webpushr = function() {
        publicMethods[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1))
    }, 
    _webpushrExecuteHooks("debug"), 
    _webpushrExecuteHooks("setup"), 
    _webpushrExecuteHooks("init"), 
    window.onmessage = function(e) {
        void 0 !== _wp_prompt_info && void 0 !== _wp_prompt_info.domain_label && _wp_prompt_info.domain_label.toLowerCase() == e.origin && 
        (   _webpushrSetCookie("_webpushrSubscriberID", e.data, 365), 
            document.getElementById("webpushr-prompt-wrapper") && document.getElementById("webpushr-prompt-wrapper").remove(), 
            WebPushr.endpoint = e.data
        )
    };
var checkRemotePermission = function(e) {
    if ("default" === e.permission) window.safari.pushNotification.requestPermission("https://bot.webpushr.com", WebPushr.applePushID, {
        host: _wp_prompt_info.host,
        site_id: applicationServerKey
    }, checkRemotePermission);
    else if ("denied" === e.permission) 
        console.log("The user declined permission."), 
        "function" == typeof webpushrPermissionAction && 
        webpushrPermissionAction("denied"), 
        _webpushrSendSubscriptionToServer("", "DELETE"), 
        _webpushrPermissionResetInstructions();
    else if ("granted" === e.permission) 
        return "function" == typeof webpushrPermissionAction && 
            webpushrPermissionAction("granted"), 
            localStorage.removeItem("_webpushrBellNotification"), 
            localStorage.removeItem("_webpushrPromptAction"), 
            webpushrPromptWrapper = document.getElementById("webpushr-prompt-wrapper"), 
            "undefined" != typeof webpushrPromptWrapper && null != webpushrPromptWrapper && 
            (webpushrPromptWrapper.className = "webpushr-subscribed webpushr-notification-on"), 
            _webpushrSendSubscriptionToServer(e.deviceToken, "POST")
};

document.getElementById("webpushr-subscription-button") && "Safari" != WebPushr.userBrowser && webpushr_display_button(), 

document.getElementById("webpushr-subscription-toggle-button") && "Safari" != WebPushr.userBrowser && webpushr_display_toggle_button();