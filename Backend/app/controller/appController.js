const {Advertisement, Job, Company, People, Relation, Signup, Login, Loginchange, ad_Advertisements, ad_Companies, ad_Job, ad_People, ad_Relation} = require('../model/appModel.js');
const JobBoard = require('../model/appModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.read_an_ad = function(req, res) {
    JobBoard.Advertisement.getAdvById(req.params.advId, function(err, adv) {
        if(err)
            res.send(err);
        res.json(adv);
    });
};

exports.read_a_jobinfo = function(req, res) {
    JobBoard.Job.getJobById(req.params.jobId, function(err, job) {
        if(err)
            res.send(err);
        res.json(job);
    });
};

exports.list_ad = function(req, res) {
    JobBoard.Advertisement.getListAdv(function(err, adv) {
        if(err)
            res.send(err);
        res.json(adv);
    });
};

exports.create_people = function (req, res) {
    let new_Ppl = new People(req.body);

    if(!new_Ppl.last_name || !new_Ppl.first_name || !new_Ppl.email || !new_Ppl.phone) {
        res.status(400).send({error:true, message:'Incomplete'});
    }
    else {
        JobBoard.People.createPeople(new_Ppl, function(err, ppl) {
            if(err)
                res.send(err);
            res.json(ppl);
        });
    };
};

exports.create_relation = function (req, res) {
    let new_Rlt = new Relation(req.body);
    if(!new_Rlt.id_ad || !new_Rlt.id_people || !new_Rlt.hasOwnProperty("is_in_charge") || !new_Rlt.data_mail) {
        res.status(400).send({error:true, message:'Incomplete'});
    }
    else {
        JobBoard.Relation.createRelation(new_Rlt, function(err, rlt) {
            if(err)
                res.send(err);
            res.json(rlt);
        });
    };
};

exports.read_incharge_ad = function (req, res) {
    JobBoard.People.readInChargeByAd(req.params.advId, function(err, adv) {
        if(err)
            res.send(err);
        res.json(adv);
    });
};

exports.signup = function (req, res) {
    let new_Su;
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        new_Su = new Signup({
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            email: req.body.email,
            phone: req.body.phone,
            password: hash
        });
        if (err) {
            res.send(err);
        }
        else {
            if(!new_Su.last_name || !new_Su.first_name || !new_Su.email || !new_Su.phone || !new_Su.password) {
                res.status(400).send({error:true, message:'Incomplete'});
            }
            else {
                JobBoard.Signup.Signup(new_Su, function(err, su) {
                    if(err)
                        res.send(err);
                    res.json(su);
                });
            };
        };
    });
};

exports.login = function (req, res) {
    let new_Li = new Login(req.body);
    if(!new_Li.email || !new_Li.password) {
        res.status(400).send({error:true, message:'Incomplete'});
    }
    else {
        JobBoard.Login.Login(new_Li, function(err, li) {
            if(err)
                return res.send(err);
            if(!li) {
                return res.status(401).send({error:true, message:'User not found'});
            }
            bcrypt.compare(new_Li.password, li.password, function (err, valid) {
                if (err)
                    res.send(err);
                if (!valid) {
                    return res.status(401).send({error:true, message:'Incorrect password'});
                }
                let token;
                if (li.email === "Admin@Admin") {
                    token = jwt.sign({
                        id: li.id,
                        admin: true
                    }, 'SECRET_KEY', { expiresIn: '24h' });
                } else {
                    token = jwt.sign({
                        id: li.id,
                        admin: false
                    }, 'SECRET_KEY', { expiresIn: '24h' });
                }
                res.status(200).json({
                    id: li.id,
                    token: token
                });
            });
        });
    };
};

exports.session = function (req, res) {
    let token = req.header("Authorization")
    if (token) {
        token = token.replace("Bearer ", "");
        jwt.verify(token, 'SECRET_KEY', function(err, decoded) {
            if(err) {
                return res.send(err);
            }
            JobBoard.People.getPplById(decoded.id, function(err, ppl) {
                if(err) {
                    return res.send(err);
                }
                Object.assign(ppl[0], { "admin": decoded.admin });
                res.json(ppl);
            });
        });
    }else{
        res.status(401).send({error:true, message:'No token found'});
    };
};

exports.applied = function (req, res) {
    JobBoard.Relation.getIfAppliedById(req.params.advId, req.params.pplId, function(err, appl) {
        if(err)
            res.send(err);
        res.json(appl);
    });
};

exports.loginchange = function (req, res) {
    let new_Lic = new Loginchange(req.body);
    if(!new_Lic.email || !new_Lic.actual_password || !new_Lic.new_password) {
        res.status(400).send({error:true, message:'Incomplete'});
    }
    else {
        JobBoard.Login.Login(new_Lic, function(err, li) {
            if(err)
                return res.send(err);
            if(!li) {
                return res.status(401).send({error:true, message:'User not found'});
            }
            bcrypt.compare(new_Lic.actual_password, li.password, function (err, valid) {
                if (err)
                    res.send(err);
                if (!valid) {
                    return res.status(401).send({error:true, message:'Incorrect password'});
                }else{
                    bcrypt.hash(new_Lic.new_password, 10, function(err, hash) {
                        if (err) {
                            res.send(err);
                        }else{
                            new_Lic.new_password = hash;
                            JobBoard.Loginchange.Loginchange(new_Lic, function(err, lic) {
                                if(err)
                                    res.send(err);
                                res.json(lic);
                            });
                        }
                    });
                }
            });
        });
    };
};

//ADMIN
exports.read_Advertisements = function (req, res) {
    JobBoard.ad_Advertisements.getAdvertisements(function(err, adv) {
        if(err)
            res.send(err);
        res.json(adv);
    });
};

exports.read_Companies = function (req, res) {
    JobBoard.ad_Companies.getCompanies(function(err, comp) {
        if(err)
            res.send(err);
        res.json(comp);
    });
};

exports.read_Job = function (req, res) {
    JobBoard.ad_Job.getJob(function(err, job) {
        if(err)
            res.send(err);
        res.json(job);
    });
};

exports.read_People = function (req, res) {
    JobBoard.ad_People.getPeople(function(err, ppl) {
        if(err)
            res.send(err);
        res.json(ppl);
    });
};

exports.read_Relation = function (req, res) {
    JobBoard.ad_Relation.getRelation(function(err, rel) {
        if(err)
            res.send(err);
        res.json(rel);
    });
};

exports.read_an_Advertisement = function (req, res) {
    JobBoard.ad_Advertisements.getAdvertisementsById(req.params.advId, function(err, adv) {
        if(err)
            res.send(err);
        res.json(adv);
    });
};

exports.read_a_Company = function (req, res) {
    JobBoard.ad_Companies.getCompaniesById(req.params.compId, function(err, comp) {
        if(err)
            res.send(err);
        res.json(comp);
    });
};

exports.read_a_Job = function (req, res) {
    JobBoard.ad_Job.getJobById(req.params.jobId, function(err, job) {
        if(err)
            res.send(err);
        res.json(job);
    });
};

exports.read_a_People = function (req, res) {
    JobBoard.ad_People.getPeopleById(req.params.pplId, function(err, ppl) {
        if(err)
            res.send(err);
        res.json(ppl);
    });
};

exports.read_a_Relation = function (req, res) {
    JobBoard.ad_Relation.getRelationById(req.params.advId, req.params.pplId, function(err, rel) {
        if(err)
            res.send(err);
        res.json(rel);
    });
};

exports.create_an_Advertisement = function (req, res) {
    let newAd = new ad_Advertisements(req.body);
    delete newAd.id;
    if(!newAd.title || !newAd.summary || !newAd.company) {
        res.status(400).send({error:true, message:'Incomplete'});
    }
    else {
        JobBoard.ad_Advertisements.createAdvertisements(newAd, function(err, adv) {
            if(err)
                return res.send(err);
            res.json(adv);
        });
    };
};

exports.create_a_Company = function (req, res) {
    let newComp = new ad_Companies(req.body);
    delete newComp.id;
    if(!newComp.name) {
        res.status(400).send({error:true, message:'Incomplete'});
    }
    else {
        JobBoard.ad_Companies.createCompanies(newComp, function(err, comp) {
            if(err)
                return res.send(err);
            res.json(comp);
        });
    };
};

exports.create_a_Job = function (req, res) {
    let newJob = new ad_Job(req.body);
    if(!newJob.id_job || !newJob.description || !newJob.wage || !newJob.place || !newJob.working_time) {
        res.status(400).send({error:true, message:'Incomplete'});
    }
    else{
        JobBoard.ad_Job.createJob(newJob, function(err, job) {
            if(err)
                return res.send(err);
            res.json(job);
        });
    };
};

exports.create_a_People = function (req, res) {
    let newPpl;
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        newPpl = new ad_People({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: hash
        });
        delete newPpl.id;
        if (err) {
            res.send(err);
        }
        else {
            if(!newPpl.first_name || !newPpl.last_name || !newPpl.email || !newPpl.phone) {
                res.status(400).send({error:true, message:'Incomplete'});
            }
            else {
                JobBoard.ad_People.createPeople(newPpl, function(err, ppl) {
                    if(err)
                        return res.send(err);
                    res.json(ppl);
                });
            };
        };
    });
};

exports.create_a_Relation = function (req, res) {
    let newRel = new ad_Relation(req.body);
    if(!newRel.id_ad || !newRel.id_people || !newRel.hasOwnProperty("is_in_charge")) {
        res.status(400).send({error:true, message:'Incomplete'});
    }
    else{
        JobBoard.ad_Relation.createRelation(newRel, function(err, rel) {
            if(err)
                return res.send(err);
            res.json(rel);
        });
    };
};

exports.update_an_Advertisement = function (req, res) {
    let newAd = new ad_Advertisements(req.body);
    delete newAd.id;
    JobBoard.ad_Advertisements.updateAdvertisements(newAd, req.params.advId, function(err, adv) {
        if(err)
            return res.send(err);
        res.json(adv);
    });
};

exports.update_a_Company = function (req, res) {
    let newComp = new ad_Companies(req.body);
    delete newComp.id;
    JobBoard.ad_Companies.updateCompanies(newComp, req.params.compId, function(err, comp) {
        if(err)
            return res.send(err);
        res.json(comp);
    });
};

exports.update_a_Job = function (req, res) {
    let newJob = new ad_Job(req.body);
    delete newJob.id_job;
    JobBoard.ad_Job.updateJob(newJob, req.params.jobId, function(err, job) {
        if(err)
            return res.send(err);
        res.json(job);
    });
};

exports.update_a_People = function (req, res) {
    let newPpl = new ad_People(req.body);
    delete newPpl.id;
    delete newPpl.password;
    JobBoard.ad_People.updatePeople(newPpl, req.params.pplId, function(err, ppl) {
        if(err)
            return res.send(err);
        res.json(ppl);
    });
};

exports.update_a_Relation = function (req, res) {
    let newRel = new ad_Relation(req.body);
    delete newRel.id_ad;
    delete newRel.id_people;
    JobBoard.ad_Relation.updateRelation(newRel, req.params.advId, req.params.pplId, function(err, rel) {
        if(err)
            return res.send(err);
        res.json(rel);
    });
};

exports.delete_an_Advertisement = function (req, res) {
    JobBoard.ad_Advertisements.deleteAdvertisements(req.params.advId, function(err, adv) {
        if(err)
            return res.send(err);
        res.json(adv);
    });
};

exports.delete_a_Company = function (req, res) {
    JobBoard.ad_Companies.deleteCompanies(req.params.compId, function(err, comp) {
        if(err)
            return res.send(err);
        res.json(comp);
    });
};

exports.delete_a_Job = function (req, res) {
    JobBoard.ad_Job.deleteJob(req.params.jobId, function(err, job) {
        if(err)
            return res.send(err);
        res.json(job);
    });
};

exports.delete_a_People = function (req, res) {
    JobBoard.ad_People.deletePeople(req.params.pplId, function(err, ppl) {
        if(err)
            return res.send(err);
        res.json(ppl);
    });
};

exports.delete_a_Relation = function (req, res) {
    JobBoard.ad_Relation.deleteRelation(req.params.advId, req.params.pplId, function(err, rel) {
        if(err)
            return res.send(err);
        res.json(rel);
    });
};