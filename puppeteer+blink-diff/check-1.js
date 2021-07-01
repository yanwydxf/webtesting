const puppeteer = require('puppeteer'),
    BlinkDiff = require('blink-diff'),
    imgUrl = __dirname + "/images/";

try {
    (async () => {
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 945 });
        await page.goto('http://127.0.0.1:8081');
        await page.screenshot({ path: imgUrl + 'Screenshots.png', fullPage: true });

        const diff = new BlinkDiff({
            imageAPath: imgUrl + 'example.png', // 设计图
            imageBPath: imgUrl + 'Screenshots.png',//页面截图
            threshold: 0.02, // 1% threshold
            imageOutputPath: imgUrl + 'Diff.png'//Diff路径
        });

        diff.run(function (error, result) {
            if (error) {
                throw error;
            } else {
                let rel = Math.round((result.differences / result.dimension) * 100)
                console.log(diff.hasPassed(result.code) ? '通过' : '失败');
                console.log('总像素:' + result.dimension);
                console.log('发现:' + result.differences + ' 差异，差异占比' + rel + "%");
                if (rel > 20) {
                    process.exit(1);
                }
            }
        });
        //关闭puppeteer
        await browser.close();
    })();
} catch (err) {
    console.log(err)
}