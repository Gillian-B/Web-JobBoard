$(document).ready(function () {
    //verify admin
    if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:3000/Session/', { headers: { "Authorization": `Bearer ${token}` } })
            .then(function (res) {
                console.log(res);
                if (res.status === 200 && res.data[0]) {
                    if (res.data[0].admin === false) {
                        window.location.href = "index.html";
                    }
                } else if (res.data.name === "TokenExpiredError") {
                    window.location.href = "index.html";
                }
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(function () {
                console.log("END");
            });
    } else {
        window.location.href = "index.html";
    };

    //handle checkboxes changes
    $("#c-adv").change(function () {
        $("#adv").toggle();
    });

    $("#c-comp").change(function () {
        $("#comp").toggle();
    })

    $("#c-job").change(function () {
        $("#job").toggle();
    })

    $("#c-ppl").change(function () {
        $("#ppl").toggle();
    })

    $("#c-rel").change(function () {
        $("#rel").toggle();
    })

    //handle persistent checkboxes & check/uncheck all
    let formValues = JSON.parse(sessionStorage.getItem('formValues')) || {};
    let checkboxes = $("#selectTable :checkbox");
    let btnCheck = $("#selectTable button");

    function allChecked() {
        return checkboxes.length === checkboxes.filter(":checked").length;
    };
    function updateButtonStatus() {
        btnCheck.text(allChecked()? "Uncheck all" : "Check all");
    };
    function handleButtonClick() {
        checkboxes.prop("checked", allChecked()? false : true)
    };
    function updateStorage() {
        checkboxes.each(function() {
            formValues[this.id] = this.checked;
        });

        formValues["buttonText"] = btnCheck.text();
        sessionStorage.setItem("formValues", JSON.stringify(formValues));
    }
    btnCheck.on("click", function() {
        handleButtonClick();
        updateButtonStatus();
        updateStorage();
        $.each(formValues, function(key, value) {
            $("#" +key).prop('checked', value);
            if(value === true) {
                $("#" +key.split("-")[1]).show();
            }else if(value === false) {
                $("#" +key.split("-")[1]).hide();
            }
        });
    });
    checkboxes.on("change", function() {
        updateButtonStatus();
        updateStorage();
    });

    $.each(formValues, function(key, value) {
        $("#" +key).prop('checked', value);
        if(value === true) {
            $("#" +key.split("-")[1]).show();
        }else if(value === false) {
            $("#" +key.split("-")[1]).hide();
        }
    });
    btnCheck.text(formValues["buttonText"]);
    
    //GET requests to display tables
    axios.get('http://localhost:3000/Admin/Advertisements/')
        .then(function (res) {
            console.log(res);
            res.data.forEach(element => {
                console.log(element);
                let tr =
                    '<tr>\
                    <th scope="row">-</th>\
                    <td>'+ element.id + '</td>\
                    <td>'+ element.title + '</td>\
                    <td>'+ element.summary + '</td>\
                    <td>'+ element.company + '</td>\
                    <td><button id="'+ element.id + '" class="btn btn-outline-warning rounded-circle update_adv" data-toggle="modal" data-target="#modalAdvertisementsForm"><i class="fa fa-pencil"></i></button></td>\
                    <td><button id="'+ element.id + '" class="btn btn-outline-danger rounded-circle delete_adv" data-toggle="modal" data-target="#dataConfirmDelModal"><i class="fa fa-close"></i></button></td>\
                </tr>'
                $("#adv tbody").append(tr);
            });
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {
            console.log("END get Advertisements")
        });

    axios.get('http://localhost:3000/Admin/Companies/')
        .then(function (res) {
            console.log(res);
            res.data.forEach(element => {
                console.log(element);
                let tr =
                    '<tr>\
                    <th scope="row">-</th>\
                    <td>'+ element.id + '</td>\
                    <td>'+ element.name + '</td>\
                    <td><button id="'+ element.id + '" class="btn btn-outline-warning rounded-circle update_comp" data-toggle="modal" data-target="#modalCompaniesForm"><i class="fa fa-pencil"></i></button></td>\
                    <td><button id="'+ element.id + '" class="btn btn-outline-danger rounded-circle delete_comp" data-toggle="modal" data-target="#dataConfirmDelModal"><i class="fa fa-close"></i></button></td>\
                </tr>'
                $("#comp tbody").append(tr);
            });
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {
            console.log("END get Companies")
        });

    axios.get('http://localhost:3000/Admin/Job/')
        .then(function (res) {
            console.log(res);
            res.data.forEach(element => {
                console.log(element);
                let tr =
                    '<tr>\
                    <th scope="row">-</th>\
                    <td>'+ element.id_job + '</td>\
                    <td>'+ element.description + '</td>\
                    <td>'+ element.wage + '</td>\
                    <td>'+ element.place + '</td>\
                    <td>'+ element.working_time + '</td>\
                    <td><button id="'+ element.id_job + '" class="btn btn-outline-warning rounded-circle update_job" data-toggle="modal" data-target="#modalJobForm"><i class="fa fa-pencil"></i></button></td>\
                    <td><button id="'+ element.id_job + '" class="btn btn-outline-danger rounded-circle delete_job" data-toggle="modal" data-target="#dataConfirmDelModal"><i class="fa fa-close"></i></button></td>\
                </tr>'
                $("#job tbody").append(tr);
            });
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {
            console.log("END get Job")
        });

    axios.get('http://localhost:3000/Admin/People/')
        .then(function (res) {
            console.log(res);
            res.data.forEach(element => {
                console.log(element);
                let tr =
                    '<tr>\
                    <th scope="row">-</th>\
                    <td>'+ element.id + '</td>\
                    <td>'+ element.first_name + '</td>\
                    <td>'+ element.last_name + '</td>\
                    <td>'+ element.email + '</td>\
                    <td>'+ element.phone + '</td>\
                    <td>'+ element.password + '</td>\
                    <td><button id="'+ element.id + '" class="btn btn-outline-warning rounded-circle update_ppl" data-toggle="modal" data-target="#modalPeopleForm"><i class="fa fa-pencil"></i></button></td>\
                    <td><button id="'+ element.id + '" class="btn btn-outline-danger rounded-circle delete_ppl" data-toggle="modal" data-target="#dataConfirmDelModal""><i class="fa fa-close"></i></button></td>\
                </tr>'
                $("#ppl tbody").append(tr);
            });
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {
            console.log("END get People")
        });

    axios.get('http://localhost:3000/Admin/Relation/')
        .then(function (res) {
            console.log(res);
            res.data.forEach(element => {
                console.log(element);
                let tr =
                    '<tr>\
                    <th scope="row">-</th>\
                    <td>'+ element.id_ad + '</td>\
                    <td>'+ element.id_people + '</td>\
                    <td>'+ element.is_in_charge + '</td>\
                    <td>'+ element.data_mail + '</td>\
                    <td><button id="'+ element.id_ad + '-' + element.id_people + '" class="btn btn-outline-warning rounded-circle update_rel" data-toggle="modal" data-target="#modalRelationForm"><i class="fa fa-pencil"></i></button></td>\
                    <td><button id="'+ element.id_ad + '-' + element.id_people + '" class="btn btn-outline-danger rounded-circle delete_rel" data-toggle="modal" data-target="#dataConfirmDelModal""><i class="fa fa-close"></i></button></td>\
                </tr>'
                $("#rel tbody").append(tr);
            });
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {
            console.log("END get Relation")
        });

    //handle button click to open form create
    $("#create_adv").click(function () {
        $("#modalAdvertisementsForm .modal-title").html("Create Advertisement");
        $("#modalAdvertisementsForm .modal-footer button").html("Create");
        $("#modalAdvertisementsForm .modal-footer button").attr("id", "create");
        $("#modalAdvertisementsForm #adv-id").val("");
        $("#modalAdvertisementsForm .id").hide();
    });

    $("#create_comp").click(function () {
        $("#modalCompaniesForm .modal-title").html("Create Company");
        $("#modalCompaniesForm .modal-footer button").html("Create");
        $("#modalCompaniesForm .modal-footer button").attr("id", "create");
        $("#modalCompaniesForm #comp-id").val("");
        $("#modalCompaniesForm .id").hide();
    });

    $("#create_job").click(function () {
        $("#modalJobForm .modal-title").html("Create Job");
        $("#modalJobForm .modal-footer button").html("Create");
        $("#modalJobForm .modal-footer button").attr("id", "create");
        $("#modalJobForm #job-id_job").val("");
        $("#modalJobForm #job-id_job").attr("readonly", false);
    });

    $("#create_ppl").click(function () {
        $("#modalPeopleForm .modal-title").html("Create People");
        $("#modalPeopleForm .modal-footer button").html("Create");
        $("#modalPeopleForm .modal-footer button").attr("id", "create");
        $("#modalPeopleForm #ppl-id").val("");
        $("#modalPeopleForm .id").hide();
        $("#modalPeopleForm #password").show();
    });

    $("#create_rel").click(function () {
        $("#modalRelationForm .modal-title").html("Create Relation");
        $("#modalRelationForm .modal-footer button").html("Create");
        $("#modalRelationForm .modal-footer button").attr("id", "create");
        $("#modalRelationForm #rel-id_ad").val("");
        $("#modalRelationForm #rel-id_people").val("");
        $("#modalRelationForm #rel-id_ad").attr("readonly", false);
        $("#modalRelationForm #rel-id_people").attr("readonly", false);
    });

    //handle button click to open form update and GET request by id to display in form
    $(document).on("click", ".update_adv", function () {
        $("#modalAdvertisementsForm .modal-title").html("Update Advertisement");
        $("#modalAdvertisementsForm .modal-footer button").html("Update");
        $("#modalAdvertisementsForm .modal-footer button").attr("id", $(this).attr("id"));
        $("#modalAdvertisementsForm #adv-id").val($(this).attr("id"));
        $("#modalAdvertisementsForm .id").show();

        axios.get(`http://localhost:3000/Admin/Advertisements/${$(this).attr("id")}`)
            .then(function (res) {
                console.log(res.data[0]);
                $("input#adv-title").val(res.data[0].title);
                $("textarea#adv-summary").val(res.data[0].summary);
                $("input#adv-company").val(res.data[0].company);
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(function () {
                console.log("END get Advertisements by Id")
            });
    });

    $(document).on("click", ".update_comp", function () {
        $("#modalCompaniesForm .modal-title").html("Update Company");
        $("#modalCompaniesForm .modal-footer button").html("Update");
        $("#modalCompaniesForm .modal-footer button").attr("id", $(this).attr("id"));
        $("#modalCompaniesForm #comp-id").val($(this).attr("id"));
        $("#modalCompaniesForm .id").show();

        axios.get(`http://localhost:3000/Admin/Companies/${$(this).attr("id")}`)
            .then(function (res) {
                console.log(res.data[0]);
                $("input#comp-name").val(res.data[0].name);
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(function () {
                console.log("END get Companies by Id")
            });
    });

    $(document).on("click", ".update_job", function () {
        $("#modalJobForm .modal-title").html("Update Job");
        $("#modalJobForm .modal-footer button").html("Update");
        $("#modalJobForm .modal-footer button").attr("id", $(this).attr("id"));
        $("#modalJobForm #job-id_job").val($(this).attr("id"));
        $("#modalJobForm #job-id_job").attr("readonly", true);

        axios.get(`http://localhost:3000/Admin/Job/${$(this).attr("id")}`)
            .then(function (res) {
                console.log(res.data[0]);
                $("textarea#job-description").val(res.data[0].description);
                $("input#job-wage").val(res.data[0].wage);
                $("input#job-place").val(res.data[0].place);
                $("input#job-working_time").val(res.data[0].working_time);
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(function () {
                console.log("END get Job by Id")
            });
    });

    $(document).on("click", ".update_ppl", function () {
        $("#modalPeopleForm .modal-title").html("Update People");
        $("#modalPeopleForm .modal-footer button").html("Update");
        $("#modalPeopleForm .modal-footer button").attr("id", $(this).attr("id"));
        $("#modalPeopleForm #ppl-id").val($(this).attr("id"));
        $("#modalPeopleForm .id").show();
        $("#modalPeopleForm #password").hide();

        axios.get(`http://localhost:3000/Admin/People/${$(this).attr("id")}`)
            .then(function (res) {
                console.log(res.data[0]);
                $("input#ppl-first_name").val(res.data[0].first_name);
                $("input#ppl-last_name").val(res.data[0].last_name);
                $("input#ppl-email").val(res.data[0].email);
                $("input#ppl-phone").val(res.data[0].phone);
                $("input#ppl-password").val(res.data[0].password);
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(function () {
                console.log("END get People by Id")
            });
    });

    $(document).on("click", ".update_rel", function () {
        $("#modalRelationForm .modal-title").html("Update Relation");
        $("#modalRelationForm .modal-footer button").html("Update");
        $("#modalRelationForm .modal-footer button").attr("id", $(this).attr("id"));
        $("#modalRelationForm #rel-id_ad").val(($(this).attr("id")).split('-')[0]);
        $("#modalRelationForm #rel-id_people").val(($(this).attr("id")).split('-')[1]);
        $("#modalRelationForm #rel-id_ad").attr("readonly", true);
        $("#modalRelationForm #rel-id_people").attr("readonly", true);

        axios.get(`http://localhost:3000/Admin/Relation/${($(this).attr("id")).split('-')[0]}/${($(this).attr("id")).split('-')[1]}`)
            .then(function (res) {
                console.log(res.data[0]);
                if (res.data[0].is_in_charge === 1) {
                    $("input#rel-is_in_charge").prop("checked", true);
                } else if (res.data[0].is_in_charge === 0) {
                    $("input#rel-is_in_charge").prop("checked", false);
                }
                $("textarea#rel-data_mail").val(res.data[0].data_mail);
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(function () {
                console.log("END get Relation by Id")
            });
    });

    //handle submit form: create with POST request and update with PUT request
    $("form#advertisementsForm").submit(function () {
        let adv_data = $("form#advertisementsForm").serializeJSON();
        console.log(adv_data);
        if ($("#modalAdvertisementsForm .modal-footer button").attr("id") === "create") {
            console.log("on create");
            axios.post('http://localhost:3000/Admin/Advertisements/', adv_data)
                .then(function (res) {
                    if (res.data.errno === 1452) {
                        console.log(res);
                        window.alert("There isn't any company with this id\n\n" +res.data.sqlMessage);
                    }else{
                        console.log(res);
                        window.location.reload();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END post Advertisements");
                });
        } else {
            console.log("on update");
            axios.put(`http://localhost:3000/Admin/Advertisements/${$("#advertisementsForm .modal-footer button").attr("id")}`, adv_data)
                .then(function (res) {
                    if (res.data.errno === 1452) {
                        window.alert("There isn't any company with this id\n\n" +res.data.sqlMessage);
                    }else{
                        console.log(res);
                        window.location.reload();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END put Advertisements");
                });
        }
        return false;
    });

    $("form#companiesForm").submit(function () {
        let comp_data = $("form#companiesForm").serializeJSON();
        console.log(comp_data);
        if ($("#modalCompaniesForm .modal-footer button").attr("id") === "create") {
            console.log("on create");
            axios.post('http://localhost:3000/Admin/Companies/', comp_data)
                .then(function (res) {
                    console.log(res);
                    window.location.reload();
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END post Companies");
                });
        } else {
            console.log("on update");
            axios.put(`http://localhost:3000/Admin/Companies/${$("#companiesForm .modal-footer button").attr("id")}`, comp_data)
                .then(function (res) {
                    console.log(res);
                    window.location.reload();
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END put Companies");
                });
        }
        return false;
    });

    $("form#jobForm").submit(function () {
        let job_data = $("form#jobForm").serializeJSON();
        console.log(job_data);
        if ($("#modalJobForm .modal-footer button").attr("id") === "create") {
            console.log("on create");
            axios.post('http://localhost:3000/Admin/Job/', job_data)
                .then(function (res) {
                    if (res.data.errno === 1062) {
                        window.alert("There is already a job linked to this advertisement id\n\n" +res.data.sqlMessage);
                    }else if (res.data.errno === 1452){
                        window.alert("There isn't any advertisement with this id\n\n" +res.data.sqlMessage);
                    }else {
                        console.log(res);
                        window.location.reload();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END post Job");
                });
        } else {
            console.log("on update");
            axios.put(`http://localhost:3000/Admin/Job/${$("#jobForm .modal-footer button").attr("id")}`, job_data)
                .then(function (res) {
                    console.log(res);
                    window.location.reload();
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END put Job");
                });
        }
        return false;
    });

    $("form#peopleForm").submit(function () {
        let ppl_data = $("form#peopleForm").serializeJSON();
        if (ppl_data.password === "") {
            ppl_data.password = null;
        }
        console.log(ppl_data);
        if ($("#modalPeopleForm .modal-footer button").attr("id") === "create") {
            console.log("on create");
            axios.post('http://localhost:3000/Admin/People/', ppl_data)
                .then(function (res) {
                    if (res.data.errno === 1062) {
                        window.alert("This email is already used\n\n" +res.data.sqlMessage);
                    }else {
                        console.log(res);
                        window.location.reload();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END post People");
                });
        } else {
            console.log("on update");
            axios.put(`http://localhost:3000/Admin/People/${$("#peopleForm .modal-footer button").attr("id")}`, ppl_data)
                .then(function (res) {
                    if (res.data.errno === 1062) {
                        window.alert("This email is already used\n\n" +res.data.sqlMessage);
                    }else {
                        console.log(res);
                        window.location.reload();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END put People");
                });
        }
        return false;
    });

    $("form#relationForm").submit(function () {
        let rel_data = $("form#relationForm").serializeJSON();
        if (rel_data.is_in_charge) {
            rel_data.is_in_charge = 1;
        } else {
            rel_data.is_in_charge = 0;
        }
        if (rel_data.data_mail === "") {
            rel_data.data_mail = null;
        }
        console.log(rel_data);
        if ($("#modalRelationForm .modal-footer button").attr("id") === "create") {
            console.log("on create");
            axios.post('http://localhost:3000/Admin/Relation/', rel_data)
                .then(function (res) {
                    if (res.data.errno === 1062) {
                        window.alert("This people already applied to this advertisement\n\n" +res.data.sqlMessage);
                    }else if (res.data.errno === 1452){
                        window.alert("There is no advertisement or people with this id\n\n" +res.data.sqlMessage);
                    }else {
                        console.log(res);
                        window.location.reload();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END post Relation");
                });
        } else {
            console.log("on update");
            axios.put(`http://localhost:3000/Admin/Relation/${($("#relationForm .modal-footer button").attr("id")).split("-")[0]}/${($("#relationForm .modal-footer button").attr("id")).split("-")[1]}`, rel_data)
                .then(function (res) {
                    console.log(res);
                    window.location.reload();
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END put Relation");
                });
        }
        return false;
    });

    //handle forms reset when modal hide
    $("#modalAdvertisementsForm").on('hidden.bs.modal', function () {
        $("form#advertisementsForm")[0].reset();
    });

    $("#modalCompaniesForm").on('hidden.bs.modal', function () {
        $("form#companiesForm")[0].reset();
    });

    $("#modalJobForm").on('hidden.bs.modal', function () {
        $("form#jobForm")[0].reset();
    });

    $("#modalPeopleForm").on('hidden.bs.modal', function () {
        $("form#peopleForm")[0].reset();
    });

    $("#modalRelationForm").on('hidden.bs.modal', function () {
        $("form#relationForm")[0].reset();
    });

    //handle button click to delete (open validation)
    $(document).on("click", ".delete_adv", function () {
        $(".dataConfirmDel").attr("id", $(this).attr("id"));
        $(".dataConfirmDel").removeClass("delete_adv delete_comp delete_job delete_ppl delete_rel").addClass("delete_adv");
    });

    $(document).on("click", ".delete_comp", function () {
        $(".dataConfirmDel").attr("id", $(this).attr("id"));
        $(".dataConfirmDel").removeClass("delete_adv delete_comp delete_job delete_ppl delete_rel").addClass("delete_comp");
    });

    $(document).on("click", ".delete_job", function () {
        $(".dataConfirmDel").attr("id", $(this).attr("id"));
        $(".dataConfirmDel").removeClass("delete_adv delete_comp delete_job delete_ppl delete_rel").addClass("delete_job");
    });

    $(document).on("click", ".delete_ppl", function () {
        $(".dataConfirmDel").attr("id", $(this).attr("id"));
        $(".dataConfirmDel").removeClass("delete_adv delete_comp delete_job delete_ppl delete_rel").addClass("delete_ppl");
    });

    $(document).on("click", ".delete_rel", function () {
        $(".dataConfirmDel").attr("id", $(this).attr("id"));
        $(".dataConfirmDel").removeClass("delete_adv delete_comp delete_job delete_ppl delete_rel").addClass("delete_rel");
    });

    //handle button click DELETE request
    $("#dataConfirmDelModal button.dataConfirmDel").click(function () {
        if ($(this).hasClass("delete_adv")) {
            console.log("delete adv");
            axios.delete(`http://localhost:3000/Admin/Advertisements/${$(this).attr("id")}`)
                .then(function (res) {
                    if (res.data.errno === 1451){
                        window.alert("There are some jobs or relations linked to this advertisement that prevent you from deleting it\n\n" +res.data.sqlMessage);
                    } else{
                        console.log(res);
                        window.location.reload();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END del Advertisement by Id")
                });
        }
        else if ($(this).hasClass("delete_comp")) {
            console.log("delete comp");
            axios.delete(`http://localhost:3000/Admin/Companies/${$(this).attr("id")}`)
                .then(function (res) {
                    if (res.data.errno === 1451){
                        window.alert("There are some advertisements linked to this company that prevent you from deleting it\n\n" +res.data.sqlMessage);
                    } else{
                        console.log(res);
                        window.location.reload();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END del Companies by Id")
                });
        }
        else if ($(this).hasClass("delete_job")) {
            console.log("delete job");
            axios.delete(`http://localhost:3000/Admin/Job/${$(this).attr("id")}`)
                .then(function (res) {
                    console.log(res);
                    window.location.reload();
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END del Job by Id")
                });
        }
        else if ($(this).hasClass("delete_ppl")) {
            console.log("delete ppl");
            axios.delete(`http://localhost:3000/Admin/People/${$(this).attr("id")}`)
                .then(function (res) {
                    if (res.data.errno === 1451){
                        window.alert("There are some relations linked to this person that prevent you from deleting it\n\n" +res.data.sqlMessage);
                    } else{
                        console.log(res);
                        window.location.reload();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END del People by Id")
                });
        }
        else if ($(this).hasClass("delete_rel")) {
            console.log("delete rel");
            axios.delete(`http://localhost:3000/Admin/Relation/${($(this).attr("id")).split('-')[0]}/${($(this).attr("id")).split('-')[1]}`)
                .then(function (res) {
                    console.log(res);
                    window.location.reload();
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    console.log("END del Relation by Id")
                });
        }
    });

    //handle search input in tables
    $("div#adv input.myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("div#adv tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("div#comp input.myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("div#comp tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("div#job input.myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("div#job tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("div#ppl input.myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("div#ppl tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("div#rel input.myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("div#rel tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});