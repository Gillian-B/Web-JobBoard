const sql = require('./db.js');

//str.replace( /(<([^>]+)>)/ig, '') strip html tags

let Advertisement = function(adv) {
    this.title = adv.title;
    this.summary = adv.summary;
    this.company = adv.company;
};

let Job = function(job) {
    this.id_job = job.id_job;
    this.description = job.description;
    this.wage = job.wage;
    this.place = job.place;
    this.working_time = job.working_time;
}

let Company = function(cmp) {
    this.name = cmp.name;
};

let People = function(ppl) {
    this.first_name = ppl.first_name;
    this.last_name = ppl.last_name;
    this.email = ppl.email;
    this.phone = ppl.phone;
};

let Relation = function(rlt) {
    this.id_ad = rlt.id_ad;
    this.id_people = rlt.id_people;
    this.is_in_charge = rlt.is_in_charge;
    this.data_mail = rlt.data_mail;
};

let Signup = function (su) {
    this.first_name = su.first_name;
    this.last_name = su.last_name;
    this.email = su.email;
    this.phone = su.phone;
    this.password = su.password;
};

let Login = function(li) {
    this.email = li.email;
    this.password = li.password;
};

let Loginchange = function (lic) {
    this.email = lic.email;
    this.actual_password = lic.actual_password;
    this.new_password = lic.new_password;
};

Advertisement.getListAdv = function(result) {
    sql.query("SELECT id from Advertisements", function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    })
}

Advertisement.getAdvById = function (advId, result) {
    sql.query("SELECT Advertisements.id, title, summary, name FROM Advertisements JOIN Companies ON Advertisements.company=Companies.id WHERE Advertisements.id = ?", advId, function(err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Job.getJobById = function (jobId, result) {
    sql.query("SELECT Advertisements.id, title, summary, name, description, wage, place, working_time FROM Advertisements JOIN Job ON Advertisements.id=Job.id_job JOIN Companies ON Advertisements.company=Companies.id WHERE Advertisements.id = ?", jobId, function(err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

People.createPeople = function (newPpl, result) {
    sql.query("SELECT EXISTS(SELECT * FROM People WHERE email = ?)", newPpl.email, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            let bool;
            for (const property in res[0]) {
                bool = (res[0])[property];
            }
            if(!bool) {
                sql.query("INSERT INTO People SET ?", newPpl, function (err, res) {
                    if(err) {
                        console.log(`error: ${err}`);
                        result(err, null);
                    }
                    else {
                        console.log(res.insertId);
                        result(null, res.insertId);
                    }
                });
            } else {
                sql.query("SELECT id FROM People WHERE first_name = ? AND last_name = ? AND email = ? AND phone = ?", [newPpl.first_name, newPpl.last_name, newPpl.email, newPpl.phone], function (err, res) {
                    if(err) {
                        console.log(`error: ${err}`);
                        result(err, null);
                    }
                    else {
                        result(null, res[0].id);
                    }
                });
            }
        }
    });
};

Relation.createRelation = function (newRlt, result) {
    sql.query("INSERT IGNORE INTO Relation SET ?", newRlt, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
;}

People.readInChargeByAd = function (advId, result) {
    sql.query("SELECT id, first_name, last_name FROM People JOIN Relation ON People.id=Relation.id_people WHERE Relation.id_ad = ? AND Relation.is_in_charge = 1", advId, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Signup.Signup = function (newSu, result) {
    sql.query("SELECT EXISTS(SELECT * FROM People WHERE email = ?)", newSu.email, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            let bool;
            for (const property in res[0]) {
                bool = (res[0])[property];
            }
            if(!bool) {
                sql.query("INSERT INTO People SET ?", newSu, function (err, res) {
                    if(err) {
                        console.log(`error: ${err}`);
                        result(err, null);
                    }
                    else {
                        console.log(res);
                        result(null, res);
                    }
                });
            } else {
                sql.query("UPDATE People SET first_name = ?, last_name = ?, phone = ?, password = ? WHERE email = ? AND password IS NULL", [newSu.first_name, newSu.last_name, newSu.phone, newSu.password, newSu.email], function (err, res) {
                    if(err) {
                        console.log(`error: ${err}`);
                        result(err, null);
                    }
                    else {
                        result(null, res);
                    }
                });
            }
        }
    });
};

Login.Login = function (newLi, result) {
    sql.query("SELECT id, first_name, last_name, phone, email, password FROM People WHERE email = ?", newLi.email, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res[0]);
        }
    });
};

People.getPplById = function (pplId, result) {
    sql.query("SELECT id, first_name, last_name, phone, email FROM People WHERE id = ?", pplId, function(err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Relation.getIfAppliedById = function (advId, pplId, result) {
    sql.query("SELECT EXISTS(SELECT * FROM Relation WHERE id_ad = ? AND id_people = ? AND is_in_charge = 0)", [advId, pplId], function(err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            let bool;
            for (const property in res[0]) {
                bool = (res[0])[property];
            }
            result(null, bool);
        }
    });
};

Loginchange.Loginchange = function (newLic, result) {
    sql.query("UPDATE People SET password = ? WHERE email = ?", [newLic.new_password, newLic.email], function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

//ADMIN
let ad_Advertisements = function (adv) {
    this.id = adv.id;
    this.title = adv.title;
    this.summary = adv.summary;
    this.company = adv.company;
};

let ad_Companies = function (comp) {
    this.id = comp.id;
    this.name = comp.name;
};

let ad_Job = function (job) {
    this.id_job = job.id_job;
    this.description = job.description;
    this.wage = job.wage;
    this.place = job.place;
    this.working_time = job.working_time;
};

let ad_People = function (ppl) {
    this.id = ppl.id;
    this.first_name = ppl.first_name;
    this.last_name = ppl.last_name;
    this.email = ppl.email;
    this.phone = ppl.phone;
    this.password = ppl.password;
}

let ad_Relation = function (rel) {
    this.id_ad = rel.id_ad;
    this.id_people = rel.id_people;
    this.is_in_charge = rel.is_in_charge;
    this.data_mail = rel.data_mail;
}

ad_Advertisements.getAdvertisements = function(result) {
    sql.query("SELECT * FROM Advertisements", function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Companies.getCompanies = function(result) {
    sql.query("SELECT * FROM Companies", function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Job.getJob = function(result) {
    sql.query("SELECT * FROM Job", function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_People.getPeople = function(result) {
    sql.query("SELECT * FROM People", function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Relation.getRelation = function(result) {
    sql.query("SELECT * FROM Relation", function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Advertisements.getAdvertisementsById = function(advId, result) {
    sql.query("SELECT * FROM Advertisements WHERE id = ?", advId, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Companies.getCompaniesById = function(compId, result) {
    sql.query("SELECT * FROM Companies WHERE id = ?", compId, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Job.getJobById = function(jobId, result) {
    sql.query("SELECT * FROM Job WHERE id_job = ?", jobId, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_People.getPeopleById = function(pplId, result) {
    sql.query("SELECT * FROM People WHERE id = ?", pplId, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Relation.getRelationById = function(advId, pplId, result) {
    sql.query("SELECT * FROM Relation WHERE id_ad = ? AND id_people = ?", [advId, pplId], function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Advertisements.createAdvertisements = function(newAd, result) {
    sql.query("INSERT INTO Advertisements SET ?", newAd, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

ad_Companies.createCompanies = function(newComp, result) {
    sql.query("INSERT INTO Companies SET ?", newComp, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

ad_Job.createJob = function(newJob, result) {
    sql.query("INSERT INTO Job SET ?", newJob, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

ad_People.createPeople = function (newPpl, result) {
    sql.query("INSERT INTO People SET ?", newPpl, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

ad_Relation.createRelation = function (newRel, result) {
    sql.query("INSERT INTO Relation SET ?", newRel, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

ad_Advertisements.updateAdvertisements = function (newAd, advId, result) {
    sql.query("UPDATE Advertisements SET ? WHERE id = ?", [newAd, advId], function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Companies.updateCompanies = function (newComp, compId, result) {
    sql.query("UPDATE Companies SET ? WHERE id = ?", [newComp, compId], function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Job.updateJob = function (newJob, jobId, result) {
    sql.query("UPDATE Job SET ? WHERE id_job = ?", [newJob, jobId], function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_People.updatePeople = function (newPpl, pplId, result) {
    sql.query("UPDATE People SET ? WHERE id = ?", [newPpl, pplId], function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Relation.updateRelation = function (newRel, advId, pplId, result) {
    sql.query("UPDATE Relation SET ? WHERE id_ad = ? AND id_people = ?", [newRel, advId, pplId], function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Advertisements.deleteAdvertisements = function (advId, result) {
    sql.query("DELETE FROM Advertisements WHERE id = ?", advId, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Companies.deleteCompanies = function (compId, result) {
    sql.query("DELETE FROM Companies WHERE id = ?", compId, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Job.deleteJob = function (jobId, result) {
    sql.query("DELETE FROM Job WHERE id_job = ?", jobId, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_People.deletePeople = function (pplId, result) {
    sql.query("DELETE FROM People WHERE id = ?", pplId, function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

ad_Relation.deleteRelation = function (advId, pplId, result) {
    sql.query("DELETE FROM Relation WHERE id_ad = ? AND id_people = ?", [advId, pplId], function (err, res) {
        if(err) {
            console.log(`error: ${err}`);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = {Advertisement, Job, Company, People, Relation, Signup, Login, Loginchange, ad_Advertisements, ad_Companies, ad_Job, ad_People, ad_Relation};