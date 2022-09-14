const API_SEARCH = "https://api.github.com/search/repositories?sort=stars&order=desc&q=in%3Ain%3Aname%2Cdescription+" // api de pesquisa do github

document.addEventListener("DOMContentLoaded", function(event) {



    const div1 = document.getElementById("div1");
    const form = document.getElementById("form");
    const search = document.getElementById("search");
    const next = document.getElementById("next");
    const back = document.getElementById("back");


    var pag_atual = 1

    async function repoS(seek_search){
        div1.innerHTML = "";
        const answer = await fetch(API_SEARCH + seek_search + "&page=" + pag_atual);
        const answerJSON = await answer.json();
        answerJSON.items.forEach(block);    
    }

    function block(repo){

        const data = new Date(repo.updated_at);     
        const data_certa = data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

        var descr_limit = new String(repo.description);
            if (descr_limit.length > 400){
            descr_limit.text(descr_limit.text().substring(0,400)+("[...]"));
            }
            
        

        const blocoHTML = `
        <div class="block">
            <h2><a href="${repo.html_url}" target=_blank" >${repo.name}</a></h2>
            <p>${descr_limit} por <a href="${repo.owner.html_url}" target="_blank">${repo.owner.login}</a></p>
            <h3>${repo.language} language </h3>
            <h4>Stars:${repo.stargazers_count} Forks:${repo.forks_count} </h4>
            <p> Editado em: ${data_certa} (Horário padrão de Brasília) <\p>
        </div>
    `
    div1.innerHTML += blocoHTML;

    }



    form.addEventListener("submit", (e) => {
        e.preventDefault();
        search_now = encodeURIComponent(search.value);
        if(search_now){
            repoS(search_now);
            search.value = "";
        }
        Array.from(document.querySelectorAll('form .hidden')).forEach((el) => el.classList.remove('hidden'));
        next.classList.remove('hidden');
    })

    
    next.addEventListener("click", () => {
        pag_atual ++;
        repoS(search_now);
        back.classList.remove('hidden');
    })

    back.addEventListener("click", () => {
        pag_atual --;
        repoS(search_now);
        if (pag_atual == 1) back.classList.add('hidden');
    })
});

