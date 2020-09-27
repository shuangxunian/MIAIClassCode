function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改
    // //大一
    // const wyl_startTime1 = ["08:00", "08:50", "09:45", "10:35", "13:00", "13:50", "14:45", "15:35", "18:30", "19:20"]
    // const wyl_endTime1 = ["08:45", "09:35", "10:30", "11:20", "13:45", "14:35", "15:30", "16:20", "19:15", "20:05"]

    // //大二
    // const wyl_startTime2 = ["08:10", "09:00", "10:00", "10:50", "13:10", "14:00", "15:00", "15:50", "18:30", "19:20"]
    // const wyl_endTime2 = ["08:55", "09:45", "10:45", "11:35", "13:55", "14:45", "15:45", "16:35", "19:15", "20:05"]

    // //大三
    // const wyl_startTime3 = ["08:20", "09:10", "10:15", "11:05", "13:20", "14:10", "15:15", "16:05", "18:30", "19:20"]
    // const wyl_endTime3 = ["09:05", "09:55", "11:00", "11:50", "14:05", "14:55", "16:00", "16:50", "19:15", "20:05"]

    // //大四
    // const wyl_startTime4 = ["08:30", "09:20", "10:30", "11:20", "13:30", "14:20", "15:30", "16:20", "18:30", "19:20"]
    // const wyl_endTime4 = ["09:15", "10:05", "11:15", "12:05", "14:15", "15:05", "16:15", "17:05", "19:15", "20:05"]

    //算的头疼，没觉得code能力变强，倒是觉得心算能力增强了

    const wyl_startTime = ["08:20", "09:15", "10:20", "11:15", "13:30", "14:25", "15:30", "16:25", "18:10", "19:05"]
    const wyl_endTime = ["09:05", "10:00", "11:05", "12:00", "14:15", "15:10", "16:15", "17:10", "18:55", "19:50"]

    let result = []
    let bbb = $('#table1 .timetable_con')

    //学号头两位，取消分年级上课以后这个就没用了- -
    //let wyl_id = $('.timetable_title h6')[1].children[0].data.split('：')[1]

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
                    //
                    let wylt0 = lesson.split(')')[1].split(',')[0]
                    let wylt1 = lesson.split(')')[1].split(',')[1]

                    // console.log("look0!")
                    // console.log(wylt0)
                    // console.log(wylt0.length)

                    //>=4代表把单周扔出去
                    if (wylt0.length >= 4) {
                        let wylfir = Number(wylt0.split('-')[1].split('周')[0]);
                        // console.log("look1!")

                        // console.log(wylfir)
                        for (let a = Number(wylt0.split('-')[0]); a < wylfir + 1; a++) {
                            re.weeks.push(a)
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

    let wyl_sectionTime = [{
            "section": 1,
            "startTime": wyl_startTime[0],
            "endTime": wyl_endTime[0]
        },
        {
            "section": 2,
            "startTime": wyl_startTime[1],
            "endTime": wyl_endTime[1]
        },
        {
            "section": 3,
            "startTime": wyl_startTime[2],
            "endTime": wyl_endTime[2]
        },
        {
            "section": 4,
            "startTime": wyl_startTime[3],
            "endTime": wyl_endTime[3]
        },
        {
            "section": 5,
            "startTime": wyl_startTime[4],
            "endTime": wyl_endTime[4]
        },
        {
            "section": 6,
            "startTime": wyl_startTime[5],
            "endTime": wyl_endTime[5]
        },
        {
            "section": 7,
            "startTime": wyl_startTime[6],
            "endTime": wyl_endTime[6]
        },
        {
            "section": 8,
            "startTime": wyl_startTime[7],
            "endTime": wyl_endTime[7]
        },
        {
            "section": 9,
            "startTime": wyl_startTime[8],
            "endTime": wyl_endTime[8]
        },
        {
            "section": 10,
            "startTime": wyl_startTime[9],
            "endTime": wyl_endTime[9]
        }
    ];
    // if (wyl_id[0] == 1) {
    //     if (wyl_id[1] == 7) {
    //         wyl_sectionTime = [{
    //                 "section": 1,
    //                 "startTime": wyl_startTime4[0],
    //                 "endTime": wyl_endTime4[0]
    //             },
    //             {
    //                 "section": 2,
    //                 "startTime": wyl_startTime4[1],
    //                 "endTime": wyl_endTime4[1]
    //             },
    //             {
    //                 "section": 3,
    //                 "startTime": wyl_startTime4[2],
    //                 "endTime": wyl_endTime4[2]
    //             },
    //             {
    //                 "section": 4,
    //                 "startTime": wyl_startTime4[3],
    //                 "endTime": wyl_endTime4[3]
    //             },
    //             {
    //                 "section": 5,
    //                 "startTime": wyl_startTime4[4],
    //                 "endTime": wyl_endTime4[4]
    //             },
    //             {
    //                 "section": 6,
    //                 "startTime": wyl_startTime4[5],
    //                 "endTime": wyl_endTime4[5]
    //             },
    //             {
    //                 "section": 7,
    //                 "startTime": wyl_startTime4[6],
    //                 "endTime": wyl_endTime4[6]
    //             },
    //             {
    //                 "section": 8,
    //                 "startTime": wyl_startTime4[7],
    //                 "endTime": wyl_endTime4[7]
    //             },
    //             {
    //                 "section": 9,
    //                 "startTime": wyl_startTime4[8],
    //                 "endTime": wyl_endTime4[8]
    //             },
    //             {
    //                 "section": 10,
    //                 "startTime": wyl_startTime4[9],
    //                 "endTime": wyl_endTime4[9]
    //             }
    //         ];
    //     } else if (wyl_id[1] == 8) {
    //         wyl_sectionTime = [{
    //                 "section": 1,
    //                 "startTime": wyl_startTime3[0],
    //                 "endTime": wyl_endTime3[0]
    //             },
    //             {
    //                 "section": 2,
    //                 "startTime": wyl_startTime3[1],
    //                 "endTime": wyl_endTime3[1]
    //             },
    //             {
    //                 "section": 3,
    //                 "startTime": wyl_startTime3[2],
    //                 "endTime": wyl_endTime3[2]
    //             },
    //             {
    //                 "section": 4,
    //                 "startTime": wyl_startTime3[3],
    //                 "endTime": wyl_endTime3[3]
    //             },
    //             {
    //                 "section": 5,
    //                 "startTime": wyl_startTime3[4],
    //                 "endTime": wyl_endTime3[4]
    //             },
    //             {
    //                 "section": 6,
    //                 "startTime": wyl_startTime3[5],
    //                 "endTime": wyl_endTime3[5]
    //             },
    //             {
    //                 "section": 7,
    //                 "startTime": wyl_startTime3[6],
    //                 "endTime": wyl_endTime3[6]
    //             },
    //             {
    //                 "section": 8,
    //                 "startTime": wyl_startTime3[7],
    //                 "endTime": wyl_endTime3[7]
    //             },
    //             {
    //                 "section": 9,
    //                 "startTime": wyl_startTime3[8],
    //                 "endTime": wyl_endTime3[8]
    //             },
    //             {
    //                 "section": 10,
    //                 "startTime": wyl_startTime3[9],
    //                 "endTime": wyl_endTime3[9]
    //             }
    //         ];
    //     } else if (wyl_id[1] == 9) {
    //         wyl_sectionTime = [{
    //                 "section": 1,
    //                 "startTime": wyl_startTime2[0],
    //                 "endTime": wyl_endTime2[0]
    //             },
    //             {
    //                 "section": 2,
    //                 "startTime": wyl_startTime2[1],
    //                 "endTime": wyl_endTime2[1]
    //             },
    //             {
    //                 "section": 3,
    //                 "startTime": wyl_startTime2[2],
    //                 "endTime": wyl_endTime2[2]
    //             },
    //             {
    //                 "section": 4,
    //                 "startTime": wyl_startTime2[3],
    //                 "endTime": wyl_endTime2[3]
    //             },
    //             {
    //                 "section": 5,
    //                 "startTime": wyl_startTime2[4],
    //                 "endTime": wyl_endTime2[4]
    //             },
    //             {
    //                 "section": 6,
    //                 "startTime": wyl_startTime2[5],
    //                 "endTime": wyl_endTime2[5]
    //             },
    //             {
    //                 "section": 7,
    //                 "startTime": wyl_startTime2[6],
    //                 "endTime": wyl_endTime2[6]
    //             },
    //             {
    //                 "section": 8,
    //                 "startTime": wyl_startTime2[7],
    //                 "endTime": wyl_endTime2[7]
    //             },
    //             {
    //                 "section": 9,
    //                 "startTime": wyl_startTime2[8],
    //                 "endTime": wyl_endTime2[8]
    //             },
    //             {
    //                 "section": 10,
    //                 "startTime": wyl_startTime2[9],
    //                 "endTime": wyl_endTime2[9]
    //             }
    //         ];
    //     }
    // } else if (wyl_id[0] == 2) {
    //     if (wyl_id[1] == 0) {
    //         wyl_sectionTime = [{
    //                 "section": 1,
    //                 "startTime": wyl_startTime1[0],
    //                 "endTime": wyl_endTime1[0]
    //             },
    //             {
    //                 "section": 2,
    //                 "startTime": wyl_startTime1[1],
    //                 "endTime": wyl_endTime1[1]
    //             },
    //             {
    //                 "section": 3,
    //                 "startTime": wyl_startTime1[2],
    //                 "endTime": wyl_endTime1[2]
    //             },
    //             {
    //                 "section": 4,
    //                 "startTime": wyl_startTime1[3],
    //                 "endTime": wyl_endTime1[3]
    //             },
    //             {
    //                 "section": 5,
    //                 "startTime": wyl_startTime1[4],
    //                 "endTime": wyl_endTime1[4]
    //             },
    //             {
    //                 "section": 6,
    //                 "startTime": wyl_startTime1[5],
    //                 "endTime": wyl_endTime1[5]
    //             },
    //             {
    //                 "section": 7,
    //                 "startTime": wyl_startTime1[6],
    //                 "endTime": wyl_endTime1[6]
    //             },
    //             {
    //                 "section": 8,
    //                 "startTime": wyl_startTime1[7],
    //                 "endTime": wyl_endTime1[7]
    //             },
    //             {
    //                 "section": 9,
    //                 "startTime": wyl_startTime1[8],
    //                 "endTime": wyl_endTime1[8]
    //             },
    //             {
    //                 "section": 10,
    //                 "startTime": wyl_startTime1[9],
    //                 "endTime": wyl_endTime1[9]
    //             }
    //         ];
    //     }
    // }
    console.log(wyl_sectionTime)
    return {
        courseInfos: result,
        sectionTimes: wyl_sectionTime
    }
}