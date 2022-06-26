$("#radio_name").click(function() {
    $('input[name="user_name"]').removeAttr("disabled").focus()
    $('input[name="cpf_number"]').attr("disabled", "").val("")
    $('input[name="phone_number"]').attr("disabled", "").val("")
})

$("#radio_cpf").click(function() {
    $('input[name="cpf_number"]').removeAttr("disabled").focus()
    $('input[name="user_name"]').attr("disabled", "").val("")
    $('input[name="phone_number"]').attr("disabled", "").val("")
})

$("#radio_phone").click(function() {
    $('input[name="phone_number"]').removeAttr("disabled").focus().mask('(99)99999-9999')
    $('input[name="user_name"]').attr("disabled", "").val("")
    $('input[name="cpf_number"]').attr("disabled", "").val("")
})

// Aceitando letras e espaços somente
$('input[name="user_name"]').keyup(function() {
    let _value = event.target.value
    _value = _value.replace(/[^[( )a-z]/gi, "")
    $(this).val(_value)
})

//Aceitando somente numeros
$('input[name="cpf_number"]').keyup(function() {
    let _value = event.target.value
    _value = _value.replace(/[^[0-9_-]|[^\w\s]/gi, "")
    $(this).val(_value)
})

function search() {
    data = {
        userName: $('input[name="user_name"]').val(),
        cpfNumber: $('input[name="cpf_number"]').val(),
        phoneNumber: $('input[name="phone_number"]').val().replace(/[^[0-9_-]|[^\w\s]/gi, "")
    }

    if (data.userName == '' && data.cpfNumber == '' && data.phoneNumber == '') {
        alert("Campo selecionado vazio.")
    } else if (data.cpfNumber.length < 11 && $("#radio_cpf").is(":checked") == true) {
        alert("Campo CPF inválido.")
    } else if (data.phoneNumber.length < 11 && $("#radio_phone").is(":checked") == true) {
        alert("Numero de celular inválido.")
    } else {
        console.log(data)

        // $.ajax({ type: "GET", url: "URL", data: {data}, dataType: "json"})
        //     .done(function(data) { window.location.href = "API" })
        //     .fail(function(error) { throw error })
    }


}
