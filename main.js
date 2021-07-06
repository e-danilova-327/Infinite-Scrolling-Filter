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

const postListing = () => {
    fetch(postsUrl)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            for (let i = 0; i < 3; i++) {
                /*title.innerText = `${response[i].title}`;
                body.innerText = `${response[i].body}`;*/
                const e = document.createElement('div');
                e.classList.add('div-class');
                e.innerHTML = `<h2>${response[i].title}</h2> <p>${response[i].body}</p>`;
                document.body.appendChild(e);
                const load = document.getElementById('load');
                document.body.appendChild(load);
            }
        });
};

postListing();

filtering();

document.addEventListener('scroll', () => {
    postListing();
    const load = document.getElementById('load');
    document.body.removeChild(load);
});
