fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(users => {
    const firstUserId = users[0].id;
    return fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${firstUserId}`
    );
  })
  .then(res => res.json())
  .then(posts => {
    posts.slice(0, 5).forEach(post => {
      console.log(post.title);
    });
  })
  .catch(error => {
    console.error("Xatolik:", error);
  });
