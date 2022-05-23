export async function registerUserInfo(familyName, firstName, nickName, email, password) {

    var SHA256 = require("crypto-js/sha256");
    const hash = SHA256(password).toString();

    const params = new URLSearchParams()
    params.append('firstName', firstName)
    params.append('familyName', familyName)
    params.append('nickName', nickName)
    params.append('imageUrl', '')
    params.append('email', email)
    params.append('password', hash)

    const url = "http://localhost:8000/api/user";

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            //  'Access-Control-Allow-Origin': 'http://localhost:8000'
        },
        body: params
    }

    const response = await fetch(url, request);
    const posts = await response.json()
    return posts
}

export async function Login(email, password, setStatusCode) {

    console.log("email:" + email);
    var SHA256 = require("crypto-js/sha256");
    const hash = SHA256(password).toString();

    const params = new URLSearchParams()
    params.append('email', email)
    params.append('password', hash)

    const url = "http://localhost:8000/api/login";

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            //  'Access-Control-Allow-Origin': 'http://localhost:8000'
        },
        body: params
    }

    const response = await fetch(url, request);

    const body = await response.json();
    const statusCode = response.status
    setStatusCode(statusCode);
    if (statusCode === 200 || statusCode === 201) {
        localStorage.setItem('token', body.Login.token);
        localStorage.setItem('userId', body.Login.userId);
        return body.Login
    } else {
        return body.message
    }
}

export async function Logout() {
    const url = "http://localhost:8000/api/logout";

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
            //  'Access-Control-Allow-Origin': 'http://localhost:8000'
        },

    }
    const response = await fetch(url, request);
    const posts = await response.status
    return posts
}


export async function getPosts() {
    const url = "http://localhost:8000/api/post/userId/null?count=5&lastPostId=null";
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // 'Access-Control-Allow-Origin': 'http://localhost:8000'
        },
    };
    const response = await fetch(url, params);
    const posts = await response.json()
    return posts
}

export async function getPostsLogin() {
    const userId = localStorage.getItem('userId')

    const url = "http://localhost:8000/api/post/userId/" + userId + "?count=5&lastPostId=null";
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
            // 'Access-Control-Allow-Origin': 'http://localhost:8000'
        },
    };
    const response = await fetch(url, params);
    const posts = await response.json()
    return posts
}
export async function getPostDetail(id) {

    const userId = localStorage.getItem('userId')

    const url = "http://localhost:8000/api/post/postId/" + id + "/userId/" + userId;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
            // 'Access-Control-Allow-Origin': 'http://localhost:8000'
        },
    };
    const response = await fetch(url, params);
    const posts = await response.json()
    return posts
}

export async function postFavo(id) {
    const userId = localStorage.getItem('userId')
    const url = "http://localhost:8000/api/favo/postId/" + id + "/userId/" + userId;

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
            // 'Access-Control-Allow-Origin': 'http://localhost:8000'
        },
    }


    const response = await fetch(url, request);
    const posts = await response.status

    return posts
}

export async function deleteFavo(id) {

    const userId = localStorage.getItem('userId')
    const url = "http://localhost:8000/api/favo/postId/" + id + "/userId/" + userId;

    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
            // 'Access-Control-Allow-Origin': 'http://localhost:8000'
        },
    }

    const response = await fetch(url, request);
    const posts = await response.status

    return posts
}