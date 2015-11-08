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

var mogobizExtension = {
    fn_payment_status: pay
}


