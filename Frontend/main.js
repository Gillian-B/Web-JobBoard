$(document).ready(function(){
    let ad = 
    '<article>\
        <div class="card border-secondary">\
            <div class="card-header text-white bg-primary">\
                <h5 class="card-title">Card title</h5>\
            </div>\
            <div class="card-body">\
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>\
                <a href="offer.html" class="card-link learn_more">Learn more</a>\
            </div>\
        </div>\
    </article>';
    
    axios.get('http://localhost:3000/listAdvertisements/')
        .then(function (res) {
            let cpt = 1;
            res.data.forEach(element => {
                let id = element.id;
                console.log(id);
                $("#main").append(ad);
                $("#main article:nth-child("+cpt+") div:first").attr("id", "card"+id);
                $("#main article:nth-child("+cpt+") a").attr("href", "offer.html?"+id);
                cpt++;
                console.log("cpt:"+cpt);
                axios.get(`http://localhost:3000/Advertisements/${id}`)
                    .then(function(res) {
                        console.log(res.data[0]);
                        $("#card"+id+" .card-title").html(res.data[0].title +" at " +res.data[0].name);
                        $("#card"+id+" .card-text").html(res.data[0].summary);
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
                    .then(function() {
                        console.log("END");
                    });
            });
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {
            console.log("END");
        });

    $("form#registerForm").submit(function() {
        let register_data = $("form#registerForm").serializeJSON();
        console.log(register_data);
        axios.post('http://localhost:3000/Signup/', register_data)
                    .then(function (res) {
                        console.log(res);
                        if (res.status === 200) {
                            if(res.data.affectedRows===1){
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

    $("form#loginForm").submit(function() {
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

    $("#btn-register").click( function(){
        $("#register-success").hide();
        $("#register-fail").hide();
    });

    $("#btn-login").click( function(){
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
                    <li class="nav-item">\
                        &nbsp;&nbsp;\
                        <button type="button" class="btn btn-outline-primary rounded-pill" data-toggle="modal" data-target="#modalSettings" id="btn-settings"><i class="fa fa-cog"></i> Settings</button>\
                    </li>\
                    <li class="nav-item">\
                        &nbsp;&nbsp;\
                        <button type="button" class="btn btn-outline-primary rounded-pill" id="btn-logout">Logout</button>\
                    </li>\
                </ul>';
                $("nav.navbar").append(nav2);
                $("form#settingsForm input#s-email").val(res.data[0].email);
                if(res.data[0].admin === true) {
                    let db_mon =
                        '<li class="nav-item">\
                            &nbsp;&nbsp;\
                            <button type="button" class="btn btn-outline-primary rounded-pill" id="btn-admin"><i class="fa fa-database"></i> DB Monitoring</button>\
                        </li>';
                    $("nav ul#nav3").append(db_mon);
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

    $(document).on("click", "#btn-logout", function() {
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