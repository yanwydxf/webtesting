var webdriver = require('selenium-webdriver'),
    By = webdriver.By

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// 检测脚本1:检测鼠标单击后div背景颜色改变
async function checkClick() {
    driver.get('http://127.0.0.1:8080');
    let item;
    await driver.findElements(By.id('item')).then(
        function(val) {
            //判断元素是否存在
            if (val.length == 0) {
                console.log("没有找到元素，检测失败");
                process.exit(1);
            }
            item = val[0];
        })
    item.click();
    await item.getCssValue("background-color").then(
        function(val) {
            if (val != "rgba(255, 239, 161, 1)") {
                console.log("检测失败")
                process.exit(1);
            } else {
                console.log("检测成功")
            }
        })
    driver.quit();
}
// checkClick();

// 检测脚本2:鼠标移入和移出背景颜色改变
async function checkMouseover() {
    driver.get('http://127.0.0.1:8080/index2.html');
    let item;
    await driver.findElements(By.id('item')).then(
        function(val) {
            //判断元素是否存在
            if (val.length == 0) {
                console.log("没有找到元素，检测失败");
                process.exit(1);
            }
            item = val[0];
        })
    await driver.executeScript("document.getElementById('item').onmouseover()")
        //判断鼠标移入后颜色是否变化
    await item.getCssValue("background-color").then((val) => {
        if (val != "rgba(216, 248, 135, 1)") {
            console.log("检测失败")
            process.exit(1);
        } else {
            console.log("检测成功");

        }
    })
    driver.executeScript("document.getElementById('item').onmouseout()")
        //判断鼠标移出后颜色是否变化
    await item.getCssValue("background-color").then((val) => {
        if (val != "rgba(184, 181, 255, 1)") {
            console.log("检测失败")
            process.exit(1);
        } else {
            console.log("检测成功")
        }
    })
    driver.quit();
}
checkMouseover();