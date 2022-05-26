

export function DataChange(data) {

    const postedData = new Date(data);
    const currentDate = new Date();

    const diffTime = currentDate.valueOf() - postedData.valueOf()
    if (diffTime > 172800000) {
        return postedData.getFullYear() + "年" + postedData.getMonth() + "月" + postedData.getDate() + "日"
    } else if (diffTime > 86400000) {
        return diffTime / 3600000 + "時間前"
    } else if (diffTime > 3600000) {
        return diffTime / 60000 + "分前"
    } else {
        return "数秒前"
    }

}