function filtrarPosts() {
    const termoPesquisa = document.getElementById('search').value.toLowerCase();
    const posts = document.querySelectorAll('.postagem');
    posts.forEach(post => {
        
        const titulo = post.querySelector('.PostCont h2')?.textContent.toLowerCase() || '';
        const texto = post.querySelector('.PostCont p')?.textContent.toLowerCase() || '';
        
        if (titulo.includes(termoPesquisa) ) {
            post.style.display = 'flex'; 
        } else {
            post.style.display = 'none'; 
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const inputPesquisa = document.getElementById('search');
    inputPesquisa.addEventListener('input', filtrarPosts);
});