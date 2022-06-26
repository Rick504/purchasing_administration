function createPermissions(data) {
    permissionsAll = []

    data.map(data => {
        var space = '&nbsp;'
        permissionsAll.push(/*html*/ `
            <tr title="${data.name}">
                <td>
                    <span name="${data.parent}">
                        <input
                            type="checkbox"
                            name="permission_id"
                            value="${data.id}"
                            ${data.check? 'checked' : ''}
                        >
                        ${data.name}
                        <br>
                    </span>
                </td>
            </tr>
        `)

        function createChildren(value, initSpace) {
            if (value.length > 0) {
                value.map((value) => {
                    permissionsAll.push(/*html*/`
                    <tr title="${value.name}">
                        <td>
                            ${space + space.repeat(initSpace)}
                            <span name="${value.parent}">
                                <input
                                    type="checkbox"
                                    name="permission_id"
                                    value="${value.id}"
                                    ${value.check? 'checked' : ''}
                                >
                                ${value.name}
                                <br>
                            </span>
                        </td>
                    </tr>
                    `)
                    value.children.length > 0 ? createChildren(value.children, initSpace + 6) : false
                })

            }
        }
        createChildren(data.children, 0)
    })

    return permissionsAll
 }

 function save() {

    var permissions = []
    $("input[name='permission_id']:checked").each(function () { permissions.push($(this).val()) })

    console.log(permissions)

    // $.ajax({ type: "POST", url: "url", data: {permissions},  dataType: "json"})
    //     .done(function() { window.location.href = "msgSuccess.html" })
    //     .fail(function(error) { throw error })
 }

// Contents
function createContent(data) {
    const permissionsHtml = createPermissions(data.permissions)
    $('.show-permissions').html(permissionsHtml)
}

$.ajax({ type: "GET", url: "../assets/js/mock/editPermissions.json", dataType: "json"})
    .done(function(data) { createContent(data) })
    .fail(function(error) { throw error })
