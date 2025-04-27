document.getElementById('mudar-tema').addEventListener('click', function() {
    event.preventDefault();
   document.body.classList.toggle('light-mode');
   document.querySelector('header').classList.toggle('light-mode');
   document.querySelectorAll('.postagem').forEach(post => {
        post.classList.toggle('light-mode');    
    });
    document.querySelectorAll('.PostCont').forEach(cont => {
        cont.classList.toggle('light-mode');
    });
    document.querySelectorAll('.a').forEach(link => {
        link.classList.toggle('light-mode');
    });
    document.querySelectorAll('.h6').forEach(h6 => {
        h6.classList.toggle('light-mode');
    });
    document.querySelectorAll('.bolinha').forEach(bolinha => {
        bolinha.classList.toggle('light-mode');
    });
});

