//usuario
function createUser(user) {
    const _user =
        /* html */
    `<table width="100%" class="border border-1">
        <thead class="thead-1">
            <tr>
                <th colspan="2">
                   <span class="material-symbols-outlined">person </span>
                   <span class="px-5"> Cadastro do usuário </span>
                </th>
            </tr>
        </thead>
        <tbody class="tbody-1">
            <tr>
                <td class="px-5">
                    <div class="photo mb-3 mt-1"></div>
                </td>
                <td>
                    <a href="/html/editPermissions.html">
                        <input type="button" class="btn btn-info" value="Editar Permições">
                    </a>
                    <a href="/html/editPassword.html">
                        <input type="button" class="btn btn-info" value="Alterar Senha do usúario">
                    </a>
                </td>
            </tr>
            <tr>
                <td width="50%" class="px-5">Nome:</td>
                <td>${user.name}</td>
            </tr>
            <tr>
                <td class="px-5">RG:</td>
                <td>${user.rg}</td>
            </tr>
            <tr>
                <td class="px-5">CPF:</td>
                <td>${user.cpf}</td>
            </tr>
            <tr>
                <td class="px-5">Nascimento:</td>
                <td>${user.birthdate}</td>
            </tr>
            <tr>
                <td class="px-5">Endereço:</td>
                <td>${user.address.street}</td>
            </tr>
            <tr>
                <td class="px-5">Número:</td>
                <td>${user.address.number}</td>
            </tr>
            <tr>
                <td class="px-5">Bairro:</td>
                <td>${user.address.district}</td>
            </tr>
            <tr>
                <td class="px-5">Cidade:</td>
                <td>${user.address.city}</td>
            </tr>
            <tr>
                <td class="px-5">UF:</td>
                <td>${user.address.state}</td>
            </tr>
            <tr>
                <td class="px-5">CEP:</td>
                <td>${user.address.zipCode}</td>
            </tr>
            <tr>
                <td class="px-5">Telefone:</td>
                <td>${user.phone !== null ? user.phone : '-' }</td>
            </tr>
            <tr>
                <td class="px-5">Celular:</td>
                <td>${user.cellphone !== null ? user.cellphone : '-' }</td>
            </tr>
            <tr>
                <td class="px-5">E-mail:</td>
                <td>${user.email !== null ? user.email : '-' }</td>
            </tr>
        </tbody>
    </table>`

    return _user
}

//Compras do usuario
function createPurchases(purchases) {

    const _purchases = purchases.reduce((previous, current, index) => {

        return previous + /* html */ `
        <tr>
            <td  class="px-5" width="45%"> Valor:</td>
            <td>${current.amount+",00"}</td>
        </tr>
        <tr>
            <td  class="px-5"> Número de Compra mensal:</td>
            <td>${current.monthlyPurchaseNumber}</td>
        </tr>
        <tr>
            <td  class="px-5"> Ocorreu em:</td>
            <td>${current.occurredAt}</td>
        </tr>
        <tr>
            <td  class="px-5"> Produto:</td>
            <td>${current.product} </td>
        </tr>
        ${ purchases.length !== index +1 ? `<tr><td colspan="2"><hr></td></tr>` : '' }
        `

    }, '')
    return /* html */ `
    <table width="100%" class="border border-1">
        <thead class="thead-2">
            <tr>
                <th colspan="2">
                    <span class="material-symbols-outlined">add_circle</span>
                    <span class="px-5"> Compras do usuário </span>
                </th>
            </tr>
        </thead>
        <tbody class="tbody-2">
            ${_purchases}
        </tbody>
    </table>
        `
}

//Imagem base64
function createImg(imgString) {

    image = new Image();
    image.src = `data:image/png;base64,${imgString}`

    console.log(image)
    $('.photo').html(`<img class='student-photo' src='${image.src}' alt="Base64 Image"/>`)
}

// Content
function createContent(data) {
    $(".show-table").html(createUser(data.user))

    $(".pagination").pagination({
        dataSource: data.purchases,
        pageSize: 3,
        // showPrevious: false,//ceta direita
        // showNext: false,//ceta esquerda
        callback: function(data, pagination) {
            console.log(data)
            $(".purchases-list").html(createPurchases(data));
        },
    });

    $(".thead-1").on('click', () => { $(".tbody-1").toggle()})
    $(".thead-2").on('click', () => { $(".tbody-2").toggle(); $(".pagination").toggle(); })
}


// Hide it after 3 seconds
// Esse hide do LoadingOverlay pode ser chamado no done da chamada Ajax, aqui ilustramos o efeito do LoadingOverlay
$.LoadingOverlay("show");

setTimeout(function(){
    $.LoadingOverlay("hide");
}, 200)

// Chamada AJAX
$.ajax({ type: "GET", url: "/assets/js/mock/user.json", dataType: "json"})
    .done(function (data) {
      createContent(data)
      createImg(data.user.photo)
    })
     .fail(function (error) { throw error })
