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
    Repos(userNome).then(reposData => {
        console.log(reposData)
    })

    Usuario(userNome).then(dadosUser => {
        let dadosImagem = dadosUser.avatar_url
        let imgusuario = document.querySelector(`#imagem`)
        imgusuario.src = dadosImagem

        let dadosNome = document.querySelector("#NomeUsuario")
        let dadosname = dadosUser.name
        dadosNome.innerHTML = dadosname

        document.querySelector('#Aparecer').style.display = 'block'

        let dadosBioUser = document.querySelector('#bio')
        let dadosBio = dadosUser.bio
        dadosBioUser.innerHTML = `${dadosBio ?? 'Usuário não tem Bio 😪'} `
    })
}

async function Repos(userNome) {
    const response = await fetch(`https://api.github.com/users/${userNome}/repos`)
    return await response.json()
}