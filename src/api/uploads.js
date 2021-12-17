const starUploadURL = "http://localhost:4000/api/uploads/star";
const deleteUploadURL = "http://localhost:4000/api/uploads/delete";
const listUploadsURL = "http://localhost:4000/api/uploads/listUploads";
const getUploadURL="http://localhost:4000/api/uploads/getUpload";

/***********POST REQUESTS **************/
export async function star(id, new_value) {
    const res = await fetch(starUploadURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            new_value
        })
    })
    let uploads = (await res.json()).uploads;
    return uploads;
  }

export async function deleted(id, new_value) {
    const res = await fetch(deleteUploadURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            new_value
        })
    })
    let uploads = (await res.json()).uploads;
    return uploads;
}

export async function getUpload (id) {
    const res = await fetch(getUploadURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
    })
    let upload = (await res.json());
    return upload;
}

/***********GET REQUESTS **************/
export async function listUploads () {

    const response = await fetch(listUploadsURL);
    let uploads = (await response.json()).uploads;

    return uploads;
}

export async function getUploadFile (uploadFileURL) {

    const response = await fetch(uploadFileURL);
    let uploadFile= (await response.json());

    return uploadFile;
}