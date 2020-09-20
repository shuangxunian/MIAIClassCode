function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    let frg2089_courses = "";
    let frg2089_allItem = dom.getElementById('iframeautoheight').contentDocument.body.getElementsByTagName('table')[1].getElementsByTagName('td');
    for (let frg2089_i = 0; frg2089_i < frg2089_allItem.length; frg2089_i++) {
        let frg2089_raw = frg2089_allItem[frg2089_i].innerHTML;

        let frg2089_data = frg2089_raw.split('<br>');
        while (frg2089_data.length >= 4) {
            let frg2089_name;
            while (frg2089_name == 'undefined' || !frg2089_name) frg2089_name = frg2089_data.shift();
            frg2089_courses += '{"name":"' + frg2089_name + '",';
            frg2089_courses += '"time":"' + frg2089_data.shift() + '",';
            frg2089_courses += '"teacher":"' + frg2089_data.shift() + '",';
            frg2089_courses += '"place":"' + frg2089_data.shift() + '"},';

            if (frg2089_data.length >= 7) {
                frg2089_data.shift();
                frg2089_data.shift();
                frg2089_data.shift();
            } else
                break;
        }

    }

    return ('<div>[' + frg2089_courses + ']</div>').replace('},]', '}]');
}