const usersPromise = Promise.resolve(
    Array(10).fill({})
);

const postsPromise = Promise.resolve(
    Array(50).fill({})
);

const commentsPromise = Promise.resolve(
    Array(100).fill({})
);

Promise.all([usersPromise, postsPromise, commentsPromise])
    .then(([users, posts, comments]) => {
        console.log("Users:", users.length);
        console.log("Posts:", posts.length);
        console.log("Comments:", comments.length);
    })
    .catch(err => {
        console.error("Xatolik:", err);
    });
