function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    //输出数组
    let wyl_output = "";
    //拿到表格dom
    let wyl_alldom = dom.getElementById('iframeautoheight').contentDocument.body.getElementsByTagName('table')[1].getElementsByTagName('td');
    //把表头扔了，从16开始
    for (let wyl_i = 16; wyl_i < wyl_alldom.length; wyl_i++) {
        //拿到每个课，从br截断
        let wyl_data = wyl_alldom[wyl_i].innerHTML.split('<br>');
        while (1) {
            //如果br下一个不是空的话，代表有地点，直接写入
            if (wyl_data[1] != undefined) {
                wyl_output += '{"classname":"' + wyl_data.shift() + '",';
                wyl_output += '"classattribute":"' + wyl_data.shift() + '",';
                wyl_output += '"classweek":"' + wyl_data.shift() + '",';
                wyl_output += '"classteacher":"' + wyl_data.shift() + '",';
                wyl_output += '"classroom":"' + wyl_data.shift() + '"},';
            }
            //如果返回的是空的话，跳出循环
            if (wyl_data.shift() == undefined) break;
        }
    }
    //返回html
    return ('<div>[' + wyl_output + ']</div>').replace('},]', '}]');
}