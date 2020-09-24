function scheduleHtmlParser(html) {
    let wyl_result = { courseInfos: [], sectionTimes: [] };
    let wyl_data = JSON.parse(html.replace('<div>', '').replace('</div>', ''));
    //console.log(wyl_data);
    for (let wyl_i = 0; wyl_i < wyl_data.length; wyl_i++) {
        let wyl_raw = wyl_data[wyl_i];
        let wyl_re = { weeks: [] };
        //单双周 0 正常 1 单 2 双
        let wyl_weekds = 0;

        wyl_re.name = wyl_raw.classname;
        wyl_re.position = wyl_raw.classroom;
        wyl_re.teacher = wyl_raw.classteacher;

        // console.log(wyl_re.name)
        // console.log(wyl_re.position)
        // console.log(wyl_re.teacher)

        let wyl_weeks = wyl_raw.classweek.match("第\\d+-\\d+周")[0].replace("第", "").replace("周", "").split('-');
        if (wyl_raw.classweek.split('|')[1] != undefined) {
            let wyl_ds = wyl_raw.classweek.split('|')[1][0];
            if (wyl_ds == "单") wyl_weekds = 1;
            else if (wyl_ds == "双") wyl_weekds = 2;
        }

        //console.log(wyl_weeks);
        if (wyl_weekds == 0) {
            for (let wyl_j = Number(wyl_weeks[0]); wyl_j <= Number(wyl_weeks[1]); wyl_j++) {
                wyl_re.weeks.push(Number(wyl_j));
            }
        } else if (wyl_weekds == 1) {
            for (let wyl_j = Number(wyl_weeks[0]); wyl_j <= Number(wyl_weeks[1]); wyl_j++) {
                if (wyl_j % 2 == 1) {
                    wyl_re.weeks.push(Number(wyl_j));
                }
            }
        } else if (wyl_weekds == 2) {
            for (let wyl_j = Number(wyl_weeks[0]); wyl_j <= Number(wyl_weeks[1]); wyl_j++) {
                if (wyl_j % 2 == 0) {
                    wyl_re.weeks.push(Number(wyl_j));
                }
            }
        }

        //console.log(wyl_re.weeks);

        wyl_re.day = wyl_raw.classweek[1] == "一" ? 1 : wyl_raw.classweek[1] == "二" ? 2 : wyl_raw.classweek[1] == "三" ? 3 : wyl_raw.classweek[1] == "四" ? 4 : wyl_raw.classweek[1] == "五" ? 5 : wyl_raw.classweek[1] == "六" ? 6 : 7;

        //console.log(wyl_re.day);

        let wyl_sections = wyl_raw.classweek.match("第\\d+,\\d+节");

        wyl_re.sections = new Array();
        for (let wyl_j = Number(wyl_sections[0].replace("第", "").replace("节", "").split(',')[0]); wyl_j <= Number(wyl_sections[0].replace("第", "").replace("节", "").split(',')[1]); wyl_j++) {
            wyl_re.sections.push(Number(wyl_j));
        }
        //console.log(wyl_re.sections);

        wyl_result.courseInfos.push(wyl_re);
    }

    wyl_result.sectionTimes = [{
            "section": 1,
            "startTime": "08:20",
            "endTime": "09:05"
        },
        {
            "section": 2,
            "startTime": "09:10",
            "endTime": "09:55"
        },
        {
            "section": 3,
            "startTime": "10:10",
            "endTime": "10:55"
        },
        {
            "section": 4,
            "startTime": "11:00",
            "endTime": "11:45"
        },
        {
            "section": 5,
            "startTime": "13:15",
            "endTime": "14:00"
        },
        {
            "section": 6,
            "startTime": "14:05",
            "endTime": "14:50"
        },
        {
            "section": 7,
            "startTime": "15:00",
            "endTime": "15:45"
        },
        {
            "section": 8,
            "startTime": "15:50",
            "endTime": "16:35"
        },
        {
            "section": 9,
            "startTime": "17:30",
            "endTime": "18:15"
        },
        {
            "section": 10,
            "startTime": "18:25",
            "endTime": "19:10"
        }
    ];
    return wyl_result
}