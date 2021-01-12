$(document).ready(function(){

    $("#apply-btn").click(function(){
        $("#apply-form").show();
    });

    $("form#myForm").submit(function() {
        if (!$('#dataConfirmModal').length) {
            $('body').append('<div id="dataConfirmModal" class="modal" role="dialog" aria-labelledby="dataConfirmLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h3 id="dataConfirmLabel">Please confirm</h3><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button></div><div class="modal-body"></div><div class="modal-footer"><button class="btn btn-light" data-dismiss="modal" aria-hidden="true">No</button><button class="btn btn-success" id="dataConfirmOk" data-dismiss="modal" aria-hidden="true">Yes</button></div></div></div></div>');
        }
        $('#dataConfirmModal').find('.modal-body').text($("#submit-btn").attr('data-confirm'));
        $('#dataConfirmModal').modal({ show: true });

        return false;
    })

    $(document).on("click", "#dataConfirmOk", function(event) {
        event.preventDefault();
        let data_msg = $("#message").serializeJSON();
        let data_user = $("form#myForm").serializeJSON();
        delete data_user["message"];
        console.log(data_user);
        console.log(data_msg);
        axios.post('http://localhost:3000/People/', data_user)
            .then(function (res) {
                console.log(res.data);
                let rlt = JSON.parse('{"id_ad":' + id + ', "id_people":' + res.data + ', "is_in_charge":false}');
                $.extend(data_msg, rlt);
                console.log(data_msg);
                axios.post('http://localhost:3000/Relation/', data_msg)
                    .then(function (res) {
                        console.log(res);
                        if (res.status === 200) {
                            $(".alert-success").show();
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
                    .then(function () {
                        console.log("END");
                    });
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(function () {
                console.log("END");
            });
        $("#fname").val("");
        $("#lname").val("");
        $("#email").val("");
        $("#message").val("");
        $("#phone").val("");
    })

    let id = location.search.substring(1);
    console.log(id);

    axios.get(`http://localhost:3000/Job/${id}`)
        .then(function (res) {
            console.log(res.data[0]);
            $("#offer .card-title").html(res.data[0].title +" at " +res.data[0].name);
            $("#offer .card-text:first").html(res.data[0].description);
            $("#offer li#wage").html("wage: " +res.data[0].wage)
            $("#offer li#place").html("place: " +res.data[0].place)
            $("#offer li#w-time").html("working time: " +res.data[0].working_time)
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {
            console.log("END");
        });

    axios.get(`http://localhost:3000/Peopleincharge/${id}`)
        .then(function (res) {
            console.log(res.data[0]);
            $("#offer #inCharge").html("In charge: ");
            for (let i=0; i<res.data.length; i++) {
                if (i === 0) {
                    $("#offer #inCharge").append(res.data[i].first_name +" " +res.data[i].last_name);
                } else {
                    $("#offer #inCharge").append(" | "+res.data[i].first_name +" " +res.data[i].last_name);
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {
            console.log("END");
        });

    $("form#registerForm").submit(function () {
        let register_data = $("form#registerForm").serializeJSON();
        console.log(register_data);
        axios.post('http://localhost:3000/Signup/', register_data)
            .then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    if (res.data.affectedRows === 1) {
                        $("#register-fail").hide();
                        $("#register-success").show();
                    }
                    else {
                        $("#register-success").hide();
                        $("#register-fail").show();
                    }
                    console.log("registered");
                    window.location.reload();
                }
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(function () {
                console.log("END");
            });
        return false;
    });

    $("form#loginForm").submit(function () {
        let login_data = $("form#loginForm").serializeJSON();
        console.log(login_data);
        axios.post('http://localhost:3000/Login/', login_data)
            .then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    $("#login-fail").hide();
                    $("#login-success").show();
                    console.log("logged in");
                    localStorage.setItem('token', res.data.token);
                    window.location.reload();
                }
            })
            .catch(function (err) {
                console.log(err);
                if (err.response.status === 401) {
                    $("#login-success").hide();
                    $("#login-fail").show();
                }
            })
            .then(function () {
                console.log("END");
            });
        return false;
    });

    $("#btn-register").click(function () {
        $("#register-success").hide();
        $("#register-fail").hide();
    });

    $("#btn-login").click(function () {
        $("#login-success").hide();
        $("#login-fail").hide();
    });

    if(localStorage.getItem('token')) {
        console.log("connected");
        let token = localStorage.getItem('token');
        axios.get('http://localhost:3000/Session/', { headers: {"Authorization" : `Bearer ${token}`} })
        .then(function (res) {
            console.log(res);
            if (res.status === 200 && res.data[0]) {
                console.log(res.data[0]);
                $("ul#nav1").hide();
                let nav2 =
                '<ul id="nav2" class="nav">\
                    &nbsp;&nbsp;\
                    <li class="nav-item">\
                        <h5 class="text-primary">'+res.data[0].first_name+" "+res.data[0].last_name+'</h5>\
                        <h6 class="mb-2 text-muted">'+res.data[0].email+'</h6>\
                    </li>\
                </ul>\
                <ul id="nav3" class="nav">\
                    &nbsp;&nbsp;\
                    <li class="nav-item">\
                        <button type="button" class="btn btn-outline-primary rounded-pill" data-toggle="modal" data-target="#modalSettings" id="btn-settings"><i class="fa fa-cog"></i> Settings</button>\
                    </li>\
                    &nbsp;&nbsp;\
                    <li class="nav-item">\
                        <button type="button" class="btn btn-outline-primary rounded-pill" id="btn-logout">Logout</button>\
                    </li>\
                </ul>';
                $("nav.navbar").append(nav2);
                $("form#settingsForm input#s-email").val(res.data[0].email);
                if(res.data[0].admin === true) {
                    let db_mon =
                        '&nbsp;&nbsp;\
                        <li class="nav-item">\
                            <button type="button" class="btn btn-outline-primary rounded-pill" id="btn-admin"><i class="fa fa-database"></i> DB Monitoring</button>\
                        </li>';
                    $("nav ul#nav3").append(db_mon);
                } else {
                    $("form#myForm input#fname").attr("readonly", true);
                    $("form#myForm input#lname").attr("readonly", true);
                    $("form#myForm input#email").attr("readonly", true);
                    $("form#myForm input#phone").attr("readonly", true);
                    $("form#myForm input#fname").val(res.data[0].first_name);
                    $("form#myForm input#lname").val(res.data[0].last_name);
                    $("form#myForm input#email").val(res.data[0].email);
                    $("form#myForm input#phone").val(res.data[0].phone);

                    axios.get(`http://localhost:3000/Applied/${id}/${res.data[0].id}`)
                        .then(function (res) {
                            console.log(res.data);
                            if(res.data){
                                console.log("already applied")
                                $("#apply-btn").off();
                                $("#apply-btn").html("Applied");
                                $("#apply-btn").attr("class", "btn btn-success")
                            }else{
                                console.log("not applied")
                            }
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                        .then(function () {
                            console.log("END");
                        });
                }
            } else if (res.data.name === "TokenExpiredError") {
                localStorage.removeItem('token');
            }
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {
            console.log("END");
        });
    }else{
        console.log("not connected");
    };

    $(document).on("click", "#btn-logout", function () {
        localStorage.removeItem('token');
        window.location.reload();
    });

    $("form#settingsForm").submit(function() {
        let loginchange_data = $("form#settingsForm").serializeJSON();
        console.log(loginchange_data);
        axios.post('http://localhost:3000/Loginchange/', loginchange_data)
                    .then(function (res) {
                        console.log(res);
                        if (res.status === 200) {
                            $("#loginchange-fail").hide();
                            $("#loginchange-success").show();
                            window.location.reload();
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        if (err.response.status === 401) {
                            $("#loginchange-success").hide();
                            $("#loginchange-fail").show();
                        }
                    })
                    .then(function () {
                        console.log("END");
                    });
        return false;
    });
    $(document).on("click", "#btn-settings", function() {
        $("#loginchange-success").hide();
        $("#loginchange-fail").hide();
    });

    $(document).on("click", "#btn-admin", function() {
        window.location.href="admin.html";
    });

    $("#modalRegisterForm").on('hidden.bs.modal', function() {
        $("form#registerForm")[0].reset();
    });

    $("#modalLoginForm").on('hidden.bs.modal', function() {
        $("form#loginForm")[0].reset();
    });

    $("#modalSettings").on('hidden.bs.modal', function() {
        $("form#settingsForm")[0].reset();
    });
});
