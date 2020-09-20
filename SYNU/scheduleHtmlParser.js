function scheduleHtmlParser(html) {
    let frg2089_result = { courseInfos: [] };
    const frg2089_Unknown = 'Unknown';

    let frg2089_data = JSON.parse(html.replace('<div>', '').replace('</div>', ''));
    for (let frg2089_i = 0; frg2089_i < frg2089_data.length; frg2089_i++) {
        let frg2089_raw = frg2089_data[frg2089_i];
        let frg2089_re = { weeks: [] };

        frg2089_re.name = frg2089_raw.name;
        frg2089_re.position = frg2089_raw.place;
        frg2089_re.teacher = frg2089_raw.teacher;

        if (frg2089_re.position == 'undefined' || !frg2089_re.position) {
            frg2089_re.position = frg2089_Unknown;
        }

        let frg2089_weeks = frg2089_raw.time.match("第\\d+-\\d+周")[0].replace("第", "").replace("周", "").split('-');
        for (let frg2089_i = Number(frg2089_weeks[0]); frg2089_i <= Number(frg2089_weeks[1]); frg2089_i++) frg2089_re.weeks.push(Number(frg2089_i));
        let frg2089_sections = frg2089_raw.time.match("第\\d+,\\d+节");
        if (frg2089_sections != null) {
            frg2089_re.sections = new Array();
            for (let frg2089_i = Number(frg2089_sections[0].replace("第", "").replace("节", "").split(',')[0]); frg2089_i <= Number(frg2089_sections[0].replace("第", "").replace("节", "").split(',')[1]); frg2089_i++) frg2089_re.sections.push(Number(frg2089_i));
        }

        frg2089_re.day = frg2089_raw.time.substr(0, 2);
        if (frg2089_re.day.match('周.') == null) frg2089_re.day = '周日';

        if (frg2089_result.courseInfos.length > 0 && frg2089_result.courseInfos[frg2089_result.courseInfos.length - 1].name === frg2089_re.name && frg2089_result.courseInfos[frg2089_result.courseInfos.length - 1].day === frg2089_re.day) {
            frg2089_re.weeks.forEach(i => frg2089_result.courseInfos[frg2089_result.courseInfos.length - 1].weeks.push(i));
        } else {
            frg2089_result.courseInfos.push(frg2089_re);
        }
    }
    console.info(frg2089_result);
    return frg2089_result;
}