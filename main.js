const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const filterUrl = 'https://jsonplaceholder.typicode.com/posts?title=';

const filtering = () => {
    const input = document.getElementById('filter').value;
    fetch(`${filterUrl}${input}`)
        .then((response) => response.json())
        .then((response) => console.log(response));
};

const filter = document.getElementById('filter');
filter.addEventListener('input', filtering);

let postsLimit = 3;
let pageNr = 1;

const postListing = () => {
    const urlToFetch = `${postsUrl}?_limit=${postsLimit}&_page=${pageNr}`;
    fetch(urlToFetch)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            response.forEach((response) => {
                const postsDiv = document.getElementById('forPosts');
                const e = document.createElement('div');
                e.classList.add('div-class');
                e.innerHTML = `<div class="numerotation">${response.id}</div> <h2>${response.title}</h2> <p>${response.body}</p>`;
                postsDiv.appendChild(e);
            });
        });
};

const loader = document.getElementById('loader');

const showLoader = async () => {
    loader.style.display = 'block';
    pageNr++;
    await postListing();
    loader.style.display = 'none';
};

postListing();

document.addEventListener('scroll', () => {
    showLoader();
    //Scroll down, show loader and fetch next set of posts
    if (
        document.body.scrollTop + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
    ) {
        showLoader();
    } else {
        loader.classList.remove('show');
    }
});
