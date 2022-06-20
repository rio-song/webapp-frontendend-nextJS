

export function DataChange(data) {

    const postedData = new Date(data);
    const currentDate = new Date();

    const diffTime = currentDate.valueOf() - postedData.valueOf()
    if (diffTime >= 86400000) {
        return postedData.getFullYear() + "年" + postedData.getMonth() + "月" + postedData.getDate() + "日"
    } else if (diffTime >= 3600000) {
        return (diffTime / 3600000 | 0) + "時間前"
    } else if (diffTime >= 60000) {
        return (diffTime / 60000 | 0) + "分前"
    } else {
        return "数秒前"
    }
}

export async function fileListToBase64(fileList) {

    function getBase64(file) {
        const reader = new FileReader()
        return new Promise(resolve => {
            reader.onload = ev => {
                resolve(ev.target.result)
            }
            reader.readAsDataURL(file)
        })
    }
    const promises = []
    for (let i = 0; i < fileList.length; i++) {
        promises.push(getBase64(fileList[i]))
    }
    return await Promise.all(promises)
}
