import axios from "axios";

export function insertGame(data) {
    const dto = new Object();
    dto.name = data.name;
    dto.description = data.description;
    dto.developer = data.developer;
    dto.publisher = data.publisher;
    dto.releaseDate = data.releasedDate;
    dto.downloadUrl = data.downloadUrl

    const formData = new FormData();
    formData.append("img", data.img[0]);
    formData.append("dto", new Blob([JSON.stringify(dto)], {type: "application/json"}));


    const gamePostUrl = "http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game"

    axios({
        method: "post",
        url: gamePostUrl,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
    }).then((res)=>{
        console.log(res);
    })

}
