$.ajax({
    type: "GET",
    url: "../assets/js/mock/user.json",
    dataType: "json",
})
.done(function(data) { $('.user-name').html(data.user.name) })
.fail(function(error) { throw error })


$('input[name="alterar"]').click(function() {
    var password = $('input[name="password"]').val()
    var password_again = $('input[name="password_again"]').val()
    if (password !== password_again) {
        alert('As senhas informadas não são iguais.')
    } else if (password.length <= 5 || password_again.length <= 5) {
        alert('A senha deve ter no mínimo 6 caracteres.')
    } else {
        var modal = confirm("Deseja realmente alterar sua senha?");
        if (modal == true) { sendData(password) }
    }
})

$('input[name="cancelar"]').click(function() {
    window.location.href = '/'
})

function sendData(password) {

    data = { password: password }

    console.log(data)

    // $.ajax({
    //     type: "POST",
    //     url: "url",
    //     data: {data},
    //     dataType: "json",
    // })
    // .done(function(data) {
    //     console.log(data);
    // })
    // .fail(function(error) {
    //     throw error;
    // });
}

