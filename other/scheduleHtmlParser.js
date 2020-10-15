function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9


    let result = []
    let bbb = $('#table1 .timetable_con')


    for (let u = 0; u < bbb.length; u++) {
        let re = { sections: [], weeks: [] }
        let aaa = $(bbb[u]).find('span')
        let week = $(bbb[u]).parent('td')[0].attribs.id

        if (week) {
            re.day = week.split('-')[0]
        }
        for (let i = 0; i < aaa.length; i++) {

            if (aaa[i].attribs.title == '上课地点') {

                for (let j = 0; j < $(aaa[i]).next()[0].children.length; j++) {
                    re.position = $(aaa[i]).next()[0].children[j].data
                }
            }
            if (aaa[i].attribs.title == '节/周') {

                // for (let j = 0; j < $(aaa[i]).next()[0].children.length; j++) {

                //     let lesson = $(aaa[i]).next()[0].children[j].data

                //     for (let a = Number(lesson.split(')')[0].split('(')[1].split('-')[0]); a < Number(lesson.split(')')[0].split('(')[1].split('-')[1].split('节')[0]) + 1; a++) {

                //         re.sections.push({ section: a })
                //     }
                //     //如果这个是空的，就不再到下边进行计算
                //     //这里需要特判一下周六的形式政策

                //     let wylt0 = lesson.split(')')[1].split(',')[0]
                //     let wylt1 = lesson.split(')')[1].split(',')[1]

                //     if (wylt1 == undefined) {
                //         let wylfir = Number(lesson.split(')')[1].split('-')[1].split('周')[0]);
                //         console.log("look!")

                //         console.log(lesson.split(')')[1])
                //         for (let a = Number(lesson.split(')')[1].split('-')[0]); a < wylfir + 1; a++) {
                //             re.weeks.push(a)
                //         }
                //     }
                //     if (lesson[8] == '周' && lesson[9] == ',') {
                //         re.weeks.push(Number(lesson.split(')')[1].split('周,')[0]))
                //         re.weeks.push(Number(lesson.split(')')[1].split('周,')[1].split('周')[0]))
                //     }
                //     if (lesson[9] == '周' && lesson[10] == ',') {
                //         re.weeks.push(Number(lesson.split(')')[1].split('周,')[0]))
                //         re.weeks.push(Number(lesson.split(')')[1].split('周,')[1].split('周')[0]))
                //     }
                //     if (lesson.split(')')[1].split('-')[1] == null) continue;
                // }

                for (let j = 0; j < $(aaa[i]).next()[0].children.length; j++) {
                    let lesson = $(aaa[i]).next()[0].children[j].data
                    for (let a = Number(lesson.split(')')[0].split('(')[1].split('-')[0]); a < Number(lesson.split(')')[0].split('(')[1].split('-')[1].split('节')[0]) + 1; a++) {
                        re.sections.push({ section: a })
                    }
                    // console.log(lesson)

                    //wyly0为周
                    let wylt0 = lesson.split(')')[1].split(',')[0]
                    let wylt1 = lesson.split(')')[1].split(',')[1]

                    // console.log("look0!")
                    // console.log(wylt0)

                    // console.log(wylt0.length)

                    //>=4代表把单周扔出去
                    if (wylt0.length >= 4) {
                        let wylevenday = wylt0.split('(')[1]

                        //console.log(wylevenday)
                        if (wylevenday === undefined) {
                            let wylfir = Number(wylt0.split('-')[1].split('周')[0]);
                            // console.log("look1!")

                            // console.log(wylfir)
                            for (let a = Number(wylt0.split('-')[0]); a < wylfir + 1; a++) {
                                re.weeks.push(a)
                            }
                        } else {
                            if (wylevenday === '单') {
                                let wylfir = Number(wylt0.split('-')[1].split('周')[0]);
                                for (let a = Number(wylt0.split('-')[0]); a < wylfir + 1; a++) {
                                    if (a % 2) re.weeks.push(a)
                                }
                            } else if (wylevenday === '双') {
                                let wylfir = Number(wylt0.split('-')[1].split('周')[0]);
                                for (let a = Number(wylt0.split('-')[0]); a < wylfir + 1; a++) {
                                    if (!(a % 2)) re.weeks.push(a)
                                }
                            }
                        }

                    }

                    //处理第二个连贯周
                    if (wylt1 !== undefined && wylt1.length >= 4) {
                        let wylfir = Number(wylt1.split('-')[1].split('周')[0]);
                        // console.log("look2!")
                        // console.log(wylt1.split('-')[0]);
                        // console.log(wylfir)
                        for (let a = Number(wylt1.split('-')[0]); a < wylfir + 1; a++) {
                            re.weeks.push(a)
                        }
                    }

                    //处理形势与政策
                    if (wylt1 !== undefined && wylt1.indexOf('-') === -1 && wylt0.indexOf('-') === -1) {
                        re.weeks.push(wylt0[0])
                        re.weeks.push(wylt1[0])
                    }

                    //处理单周
                    if (wylt1 === undefined && wylt0.indexOf('-') === -1) {
                        re.weeks.push(wylt0.split('周')[0])
                    }


                    // for (let a = Number(lesson.split(')')[1].split('-')[0]); a < Number(lesson.split(')')[1].split('-')[1].split('周')[0]) + 1; a++) {

                    //     re.weeks.push(a)
                    // }
                }


            }

            if (aaa[i].attribs.title == '教师') {

                for (let j = 0; j < $(aaa[i]).next()[0].children.length; j++) {
                    re.teacher = $(aaa[i]).next()[0].children[j].data
                }
            }

            if (aaa[i].attribs.class == 'title') {

                for (let j = 0; j < $(aaa[i]).children()[0].children.length; j++) {
                    re.name = $(aaa[i]).children()[0].children[j].data

                }
            }

        }
        result.push(re)
    }
    console.log(result)

    var myDate = new Date();
    myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    console.log(myDate.getMonth());
    //设置课程表时间
    let wyl_sectionTime = [{
            "section": 1,
            "startTime": "08:00",
            "endTime": "08:45"
        },
        {
            "section": 2,
            "startTime": "08:50",
            "endTime": "09:35"
        },
        {
            "section": 3,
            "startTime": "09:50",
            "endTime": "10:35"
        },
        {
            "section": 4,
            "startTime": "10:40",
            "endTime": "11:25"
        },
        {
            "section": 5,
            "startTime": "11:30",
            "endTime": "12:15"
        },
        {
            "section": 6,
            "startTime": "14:00",
            "endTime": "14:45"
        },
        {
            "section": 7,
            "startTime": "14:50",
            "endTime": "15:35"
        },
        {
            "section": 8,
            "startTime": "15:50",
            "endTime": "16:35"
        },
        {
            "section": 9,
            "startTime": "16:40",
            "endTime": "17:25"
        },
        {
            "section": 10,
            "startTime": "19:00",
            "endTime": "19:45"
        },
        {
            "section": 11,
            "startTime": "19:50",
            "endTime": "20:35"
        },
        {
            "section": 12,
            "startTime": "20:40",
            "endTime": "21:25"
        }
    ]
    let wyl_sectionTime1 = [{
            "section": 1,
            "startTime": "08:00",
            "endTime": "08:45"
        },
        {
            "section": 2,
            "startTime": "08:50",
            "endTime": "09:35"
        },
        {
            "section": 3,
            "startTime": "09:50",
            "endTime": "10:35"
        },
        {
            "section": 4,
            "startTime": "10:40",
            "endTime": "11:25"
        },
        {
            "section": 5,
            "startTime": "11:30",
            "endTime": "12:15"
        },
        {
            "section": 6,
            "startTime": "13:30",
            "endTime": "14:15"
        },
        {
            "section": 7,
            "startTime": "14:20",
            "endTime": "15:05"
        },
        {
            "section": 8,
            "startTime": "15:20",
            "endTime": "16:05"
        },
        {
            "section": 9,
            "startTime": "16:10",
            "endTime": "16:55"
        },
        {
            "section": 10,
            "startTime": "18:30",
            "endTime": "19:15"
        },
        {
            "section": 11,
            "startTime": "19:20",
            "endTime": "20:05"
        },
        {
            "section": 12,
            "startTime": "20:10",
            "endTime": "20:55"
        }
    ]
    wyl_sectionTime2 = [];
    //浙农林专属作息时间表匹配
    if (myDate.getMonth() == 5 || myDate.getMonth() == 6 || myDate.getMonth() == 7 || myDate.getMonth() == 8 || myDate.getMonth() == 4) {
        wyl_sectionTime2 = wyl_sectionTime;
    } else {
        wyl_sectionTime2 = wyl_sectionTime1;
    }
    return {
        courseInfos: result,
        sectionTimes: wyl_sectionTime2
    }
}