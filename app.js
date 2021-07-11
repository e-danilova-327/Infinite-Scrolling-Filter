const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const filterUrl = 'https://jsonplaceholder.typicode.com/posts?title=';

const form = document.getElementById('form');
const filterInput = document.getElementById('filter');
const loader = document.getElementById('loader');
const postsDiv = document.getElementById('forPosts');

const displayPosts = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then((posts) => {
            console.log(posts);
            posts.forEach((response) => {
                const postsDiv = document.getElementById('forPosts');
                const e = document.createElement('div');
                e.classList.add('div-class');
                e.innerHTML = `<div class="numerotation">${response.id}</div> <h2>${response.title}</h2> <p>${response.body}</p>`;
                postsDiv.appendChild(e);
            });
        })
        .catch((error) => console.log(error));
};

displayPosts(postsUrl);

const showLoader = async () => {
    loader.style.display = 'block';
    await displayPosts(postsUrl);
    loader.style.display = 'none';
};

showLoader();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    postsDiv.innerHTML = '';

    const title = filterInput.value;

    if (title) {
        displayPosts(`${filterUrl}${title}`);
        title.value = '';
    }
});

window.addEventListener('scroll', (e) => {
    e.preventDefault();
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 1) {
        console.log('another round');
        showLoader();
    }
});
