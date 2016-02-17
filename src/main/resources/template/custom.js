function pay() {
    return function (text, render) {
        if (render(text) == 'PAYMENT_CONFIRMED') {
            return 'Payment Succeeded';
        }
        else {
            return 'Payment Failed';
        }
    }
}

function formatDate() {
    return function (text, render) {
        var patternList = ["yyyy", "yy", "MM", "dd", "HH", "mm", "ss"]
        var s = render(text);
        var index = s.indexOf("|")
        if (index == -1) return s
        else {
            var dateStr = s.substring(0, index)
            var pattern = s.substring(index + 1)
            var d = new Date(parseInt(dateStr))
            var r = pattern
            var hasChange = true
            while (hasChange) {
                hasChange = false
                for (var i = 0; !hasChange && i < patternList.length; i++) {
                    var p = patternList[i]
                    var index = r.indexOf(p)
                    if (index > -1) {
                        hasChange = true
                        var v = ""
                        if ("yyyy" == p) v = d.getFullYear()
                        else if ("yy" == p) v = d.getYear()
                        else if ("MM" == p && d.getMonth() < 10) v = "0" + d.getMonth()
                        else if ("MM" == p && d.getMonth() >= 10) v = d.getMonth()
                        else if ("dd" == p && d.getDate() < 10) v = "0" + d.getDate()
                        else if ("dd" == p && d.getDate() >= 10) v = d.getDate()
                        else if ("HH" == p && d.getHours() < 10) v = "0" + d.getHours()
                        else if ("HH" == p && d.getHours() >= 10) v = d.getHours()
                        else if ("mm" == p && d.getMinutes() < 10) v = "0" + d.getMinutes()
                        else if ("mm" == p && d.getMinutes() >= 10) v = d.getMinutes()
                        else if ("ss" == p && d.getSeconds() < 10) v = "0" + d.getSeconds()
                        else if ("ss" == p && d.getSeconds() >= 10) v = d.getSeconds()
                        r = r.substring(0, index) + v + r.substring(index + p.length)
                    }
                }
            }
            return r
        }
    }
}

var mogobizExtension = {
    fn_payment_status: pay,
    fn_format_date: formatDate
}


