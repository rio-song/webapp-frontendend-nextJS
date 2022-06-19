

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

export async function ImageChangeDataUrl(data) {
    let files = data.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
}
