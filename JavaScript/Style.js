document.querySelector("#btn-search").addEventListener('click',() =>{
    let usuario = document.querySelector('#input-search').value
    if(usuario == 0){
        window.alert('Digite um Usuário para continuar')
    }else{
        BuscarDados(usuario)
    }
})

document.querySelector('#input-search').addEventListener('keyup', (e) => {
    const userNome = e.target.value
    const key = e.which || e.keyCode
    const isEnterkeypressed = key === 13
    if(isEnterkeypressed){
        BuscarDados(userNome)
    }
})


async function Usuario(userNome) {
    const response = await fetch(`https://api.github.com/users/${userNome}`)
    return await response.json()
}

async function BuscarDados(userNome){
    Usuario(userNome).then(dadosUser => {
        let userInfo = `<div class="info">
                            <img src="${dadosUser.avatar_url}" alt="Foto do Perfil do Usuário">
                            <div class="data">
                                <h1>${dadosUser.name ?? `Não possui nome cadastrado 😪`}</h1>
                                <p>${dadosUser.bio ?? `Não possui bio cadastrado 😪`}</p>
                            </div>
                        <div/>` 
        document.querySelector('.profile-data').innerHTML = userInfo

        BuscarRepos(userNome)
    })
}

async function Repos(userNome) {
    const response = await fetch(`https://api.github.com/users/${userNome}/repos`)
    return await response.json()
}

function BuscarRepos(userNome){
    Repos(userNome).then(reposData => {
        let repositoriositens = ""
        reposData.forEach(repos => {
            repositoriositens += `<li><a href="${repos.html_url}" target="_blank">${repos.name}</a></li>`
        })
        document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
                                                                    <h2>Repositórios</h2>
                                                                    <ul>${repositoriositens}</ul>
                                                               </div>`
    })
}