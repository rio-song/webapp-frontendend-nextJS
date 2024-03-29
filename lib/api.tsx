
//const domain = "http://localhost:8000"
const domain = "https://api.rioswebapp.tk"

export async function registerUserInfo(familyName, firstName, nickName, email, password, setStatusCode) {

    var SHA256 = require("crypto-js/sha256");
    const hash = SHA256(password).toString();

    const params = new URLSearchParams()
    params.append('firstName', firstName)
    params.append('familyName', familyName)
    params.append('nickName', nickName)
    params.append('imageUrl', '')
    params.append('email', email)
    params.append('password', hash)

    const url = domain + "/api/user";

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params
    }

    const response = await fetch(url, request);
    const statusCode = response.status
    setStatusCode(statusCode);
    if (statusCode === 200 || statusCode === 201) {
        return
    } else {
        const body = await response.json();
        return body.message
    }
}

export async function Login(email, password, setStatusCode) {

    var SHA256 = require("crypto-js/sha256");
    const hash = SHA256(password).toString();

    const params = new URLSearchParams()
    params.append('email', email)
    params.append('password', hash)

    const url = domain + "/api/login";

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
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
    const url = domain + "/api/logout";

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
        },

    }
    const response = await fetch(url, request);
    const posts = await response.status
    return posts
}


export async function getPosts(setStatusCode) {
    const url = domain + "/api/post/userId/null?count=5&lastPostId=null";
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    const response = await fetch(url, params);
    const body = await response.json();
    const statusCode = response.status
    setStatusCode(statusCode);
    if ((statusCode === 200 || statusCode === 201) && body.Post.length > 0) {
        return body
    } else if (statusCode === 503) {
        return "サーバーが混雑しています。何回かリトライしてください。"
    } else if (body.length = 0) {
        return "投稿がありません"
    } else {
        return body.message
    }
}

export async function getPostsLogin(setStatusCode) {
    const userId = localStorage.getItem('userId')

    const url = domain + "/api/post/userId/" + userId + "?count=5&lastPostId=null";
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
        },
    };
    const response = await fetch(url, params);
    const body = await response.json();
    const statusCode = response.status
    setStatusCode(statusCode);
    if ((statusCode === 200 || statusCode === 201) && body.Post.length > 0) {
        return body
    } else if (statusCode === 503) {
        return "サーバーが混雑しています。何回かリトライしてください。"
    } else if (body.length = 0) {
        return "投稿がありません"
    } else {
        return body.message
    }
}

export async function getUserAllPosts(userId, setStatusCode) {
    const url = domain + "/api/post/user/userId/" + userId + "?count=5&lastPostId=null";

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const response = await fetch(url, params);
    const body = await response.json();
    const statusCode = response.status
    setStatusCode(statusCode);
    if ((statusCode === 200 || statusCode === 201) && body.Post.length > 0) {
        return body
    } else if (statusCode === 503) {
        return "サーバーが混雑しています。何回かリトライしてください。"
    } else if (body.length = 0) {
        return "投稿がありません"
    } else {
        return body.message
    }
}
export async function getPostDetail(id, setStatusCode) {
    const userId = localStorage.getItem('userId')

    const url = domain + "/api/post/postId/" + id + "/userId/" + userId;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
        },
    };
    const response = await fetch(url, params);
    const body = await response.json();
    const statusCode = response.status
    setStatusCode(statusCode);
    if (statusCode === 200 || statusCode === 201) {
        return body
    } else {
        return body.message
    }
}
export async function deletePost(postId, setStatusCode) {

    const url = domain + "/api/post/postId/" + postId;

    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
        },
    }

    const response = await fetch(url, request);
    const statusCode = response.status
    setStatusCode(statusCode);
    if (statusCode === 200 || statusCode === 201) {
        return
    } else {
        const body = await response.json();
        return body.message
    }
}

export async function PostImage(_imgUrl, _title, _comment, setStatusCode) {

    const params = new URLSearchParams()
    params.append('imageUrl', _imgUrl)
    params.append('title', _title)
    params.append('text', _comment)

    const userId = localStorage.getItem('userId')
    const url = domain + "/api/post/userId/" + userId;

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
        },
        body: params
    }

    const response = await fetch(url, request);
    const statusCode = response.status
    setStatusCode(statusCode);
    if (statusCode === 200 || statusCode === 201) {
        return "投稿しました"
    } else {
        const body = await response.json();
        return body.message
    }
}

export async function postFavo(id) {
    const userId = localStorage.getItem('userId')
    const url = domain + "/api/favo/postId/" + id + "/userId/" + userId;

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
        },
    }

    const response = await fetch(url, request);
    const posts = await response.status

    return posts
}

export async function deleteFavo(id) {

    const userId = localStorage.getItem('userId')
    const url = domain + "/api/favo/postId/" + id + "/userId/" + userId;

    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
        },
    }

    const response = await fetch(url, request);
    const posts = await response.status

    return posts
}

export async function getComment(id, setStatusCode) {

    const url = domain + "/api/comment/postId/" + id;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
        },
    };
    const response = await fetch(url, params);
    const body = await response.json();
    const statusCode = response.status
    setStatusCode(statusCode);
    if (statusCode === 200 || statusCode === 201) {
        return body
    } else {
        return body.message
    }
}

export async function postComment(id, comment, setPostCommentStatusCode) {

    const userId = localStorage.getItem('userId')
    const url = domain + "/api/comment/postId/" + id + "/userId/" + userId;

    const params = new URLSearchParams()
    params.append('comment', comment)

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
        },
        body: params
    }

    const response = await fetch(url, request);
    setPostCommentStatusCode();
    const statusCode = response.status
    setPostCommentStatusCode(statusCode);
    if (statusCode === 200 || statusCode === 201) {
        return
    } else {
        const body = await response.json();
        return body.message
    }
}
// export async function putComment(id, commentId, comment, setStatusCode) {

//     const userId = localStorage.getItem('userId')
//     const url = domain + "/api/favo/postId/" + id + "/userId/" + userId + "/commentId/" + commentId;

//     const params = new URLSearchParams()
//     params.append('comment', comment)

//     const request = {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             "token": localStorage.getItem('token'),
//             // 'Access-Control-Allow-Origin': 'http://localhost:8000'
//         }, body: params
//     }

//     const response = await fetch(url, request);
//     const body = await response.json();
//     const statusCode = response.status
//     setStatusCode(statusCode);
//     if (statusCode === 200 || statusCode === 201) {
//         return body.Login
//     } else {
//         return body.message
//     }
// }

export async function deleteComment(commentId, setDeleteStatusCode) {

    const url = domain + "/api/comment/commentId/" + commentId;

    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
        },
    }

    const response = await fetch(url, request);
    setDeleteStatusCode();
    const statusCode = response.status
    setDeleteStatusCode(statusCode);
    if (statusCode === 200 || statusCode === 201) {
        return
    } else {
        const body = await response.json();
        return body.message
    }
}
export async function getUser(setStatusCode) {

    const userId = localStorage.getItem('userId')
    const url = domain + "/api/user/userId/" + userId;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
        },
    }

    const response = await fetch(url, params);
    const body = await response.json();
    const statusCode = response.status
    setStatusCode(statusCode);
    if (statusCode === 200 || statusCode === 201) {
        return body
    } else {
        return body.message
    }
}

export async function putUser(familyName, firstName, nickName, imageUrl, email, password, profileText, setStatusCode) {
    var SHA256 = require("crypto-js/sha256");
    const hash = SHA256(password).toString();

    const userId = localStorage.getItem('userId')
    const url = domain + "/api/user/userId/" + userId;

    const params = new URLSearchParams()
    params.append('firstName', firstName)
    params.append('familyName', familyName)
    params.append('nickName', nickName)
    params.append('imageUrl', imageUrl)
    params.append('profileText', profileText)
    params.append('email', email)
    params.append('password', hash)
    const request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
        }, body: params
    }

    const response = await fetch(url, request);
    const body = await response.json();
    const statusCode = response.status
    setStatusCode(statusCode);
    if (statusCode === 200 || statusCode === 201) {
        return body.User
    } else {
        return body.message
    }
}