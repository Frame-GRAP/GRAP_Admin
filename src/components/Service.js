import axios from "axios";

export async function insertGame(game) {
    const dto = new Object();
    dto.name = game.name;
    dto.description = game.description;
    dto.price = game.price;
    dto.developer = game.developer;
    dto.publisher = game.publisher;
    dto.releaseDate = game.releaseDate;
    dto.downloadUrl = game.downloadUrl;

    const formData = new FormData();
    formData.append("img", game.img[0]);
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
    dto.price = game.price;
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

export async function deleteVideo(videoId) {
    const videoDeleteUrl = `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/video/${videoId}`;

    await axios({
        method: "delete",
        url: videoDeleteUrl,
    }).then((res)=>{
        console.log(res);
    })
}

export async function registerVideo(videoId) {
    const videoRegisterUrl = `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/video/${videoId}`;

    await axios({
        method: "put",
        url: videoRegisterUrl
    }).then((res)=>{
        console.log(res.data);
    })
}

export async function deleteUser(userId) {
    const userDeleteUrl = `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/user/${userId}`;

    await axios({
        method: "delete",
        url: userDeleteUrl
    }).then((res)=>{
        console.log(res.data);
    })
}

export async function updateUser(data) {

}


export async function deleteReview(reviewId) {
    const reviewDeleteUrl = `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/review/${reviewId}`;

    await axios({
        method: "delete",
        url: reviewDeleteUrl
    }).then((res)=>{
        console.log(res.data);
    })
}


export async function deleteReport(reportId) {
    const reportDeleteUrl = `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/report/${reportId}`;

    await axios({
        method: "delete",
        url: reportDeleteUrl
    }).then((res)=>{
        console.log(res.data);
    })
}


export async function insertCoupon(coupon, gameId) {
    const couponInsertUrl = `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/game/${gameId}/coupon`;

    const dto = new Object();
    dto.name = coupon.name;
    dto.expirationDate = coupon.expirationDate;

    const json = JSON.stringify(dto);

    await axios({
        method: "post",
        url: couponInsertUrl,
        headers:{
            "Content-Type": "application/json"
        },
        data: json,
    }).then((res) => {
        console.log(res);
    })
}


export async function updateCoupon(coupon) {
    const couponUpdateUrl = `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/coupon/${coupon.couponId}`;

    const dto = new Object();
    dto.name = coupon.name;
    dto.expirationDate = coupon.expirationDate;

    const json = JSON.stringify(dto);

    await axios({
        method: "put",
        url: couponUpdateUrl,
        headers:{
            "Content-Type": "application/json"
        },
        data: json,
    }).then((res) => {
        console.log(res);
    })
}

export async function deleteCoupon(couponId) {
    const couponDeleteUrl = `http://ec2-3-35-250-221.ap-northeast-2.compute.amazonaws.com:8080/api/coupon/${couponId}`;

    await axios({
        method: "delete",
        url: couponDeleteUrl
    }).then((res)=>{
        console.log(res.data);
    })
}
