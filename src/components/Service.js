import axios from "axios";

export async function insertGame(data) {
    const dto = new Object();
    dto.name = data.name;
    dto.description = data.description;
    dto.developer = data.developer;
    dto.publisher = data.publisher;
    dto.releaseDate = data.releaseDate;
    dto.downloadUrl = data.downloadUrl;

    const formData = new FormData();
    formData.append("img", data.img[0]);
    formData.append("dto", new Blob([JSON.stringify(dto)], {type: "application/json"}));

    const gamePostUrl = "http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game"

    await axios({
        method: "post",
        url: gamePostUrl,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
    }).then((res)=>{
        console.log(res);
    })
}

export async function updateGame(game) {
    const gameUpdateUrl = `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${game.id}`;
    const dto = new Object();
    //dto.id = game.id;
    dto.name = game.name;
    dto.description = game.description;
    //dto.developer = game.developer;
    //dto.publisher = game.publisher;
    //dto.releaseDate = game.releaseDate;
    //dto.headerImg = game.headerImg;
    dto.downloadUrl = game.downloadUrl;
    //dto.lastVideoCrawled = game.lastVideoCrawled;
    //dto.videosId = game.videosId;

    const json = JSON.stringify(dto);

    await axios({
        method: "put",
        url: gameUpdateUrl,
        headers:{
            "Content-Type": "application/json"
        },
        data: json,
    }).then((res) => {
        console.log(res);
    })
}

export async function deleteGame(gameId) {
    const gamePostUrl = `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}`;

    await axios({
        method: "delete",
        url: gamePostUrl,
    }).then((res)=>{
        console.log(res);
    })

}

export async function deleteVideo(videoId, gameId) {
    const videoDeleteUrl = `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/${videoId}`;

    await axios({
        method: "delete",
        url: videoDeleteUrl,
    }).then((res)=>{
        console.log(res);
    })
}

export async function registerVideo(videoId, gameId) {
    const videoRegisterUrl = `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/video/${videoId}`;

    await axios({
        method: "put",
        url: videoRegisterUrl
    }).then((res)=>{
        console.log(res.data);
    })
}



export async function insertUser(data) {

}


export async function updateUser(data) {

}


export async function deleteUser(data) {

}
