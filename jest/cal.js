function cal(num1, num2, type) {
    var result;
    switch (parseInt(type)) {
        case 0:
            result = num1 + num2;
            break;
        case 1:
            result = num1 - num2;
            break;
        case 2:
            result = num1 * num2;
            break;
        case 3:
            result = num1 / num2;
            break;
    }
    return result;
}
module.exports = cal;