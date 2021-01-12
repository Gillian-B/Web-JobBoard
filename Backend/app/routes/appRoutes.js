module.exports = function(app) {
    let JobBoard = require('../controller/appController');

    app.route('/Advertisements/:advId')
        .get(JobBoard.read_an_ad);

    app.route('/Job/:jobId')
        .get(JobBoard.read_a_jobinfo); 

    app.route('/listAdvertisements/')
        .get(JobBoard.list_ad);

    app.route('/People/')
        .post(JobBoard.create_people);

    app.route('/Relation/')
        .post(JobBoard.create_relation);

    app.route('/Peopleincharge/:advId')
        .get(JobBoard.read_incharge_ad);

    app.route('/Signup/')
        .post(JobBoard.signup);

    app.route('/Login/')
        .post(JobBoard.login);

    app.route('/Session/')
        .get(JobBoard.session);

    app.route('/Applied/:advId/:pplId')
        .get(JobBoard.applied);

    app.route('/Loginchange/')
        .post(JobBoard.loginchange);

    //ADMIN
    app.route('/Admin/Advertisements/')
        .get(JobBoard.read_Advertisements);

    app.route('/Admin/Companies/')
        .get(JobBoard.read_Companies);

    app.route('/Admin/Job/')
        .get(JobBoard.read_Job);

    app.route('/Admin/People')
        .get(JobBoard.read_People);
    
    app.route('/Admin/Relation')
        .get(JobBoard.read_Relation);

    app.route('/Admin/Advertisements/:advId')
        .get(JobBoard.read_an_Advertisement);

    app.route('/Admin/Companies/:compId')
        .get(JobBoard.read_a_Company);

    app.route('/Admin/Job/:jobId')
        .get(JobBoard.read_a_Job);

    app.route('/Admin/People/:pplId')
        .get(JobBoard.read_a_People);

    app.route('/Admin/Relation/:advId/:pplId')
        .get(JobBoard.read_a_Relation);

    app.route('/Admin/Advertisements/')
        .post(JobBoard.create_an_Advertisement);

    app.route('/Admin/Companies/')
        .post(JobBoard.create_a_Company);

    app.route('/Admin/Job/')
        .post(JobBoard.create_a_Job);

    app.route('/Admin/People/')
        .post(JobBoard.create_a_People);
    
    app.route('/Admin/Relation/')
        .post(JobBoard.create_a_Relation);

    app.route('/Admin/Advertisements/:advId')
        .put(JobBoard.update_an_Advertisement);

    app.route('/Admin/Companies/:compId')
        .put(JobBoard.update_a_Company);

    app.route('/Admin/Job/:jobId')
        .put(JobBoard.update_a_Job);

    app.route('/Admin/People/:pplId')
        .put(JobBoard.update_a_People);

    app.route('/Admin/Relation/:advId/:pplId')
        .put(JobBoard.update_a_Relation);

    app.route('/Admin/Advertisements/:advId')
        .delete(JobBoard.delete_an_Advertisement);
    
    app.route('/Admin/Companies/:compId')
        .delete(JobBoard.delete_a_Company);

    app.route('/Admin/Job/:jobId')
        .delete(JobBoard.delete_a_Job);

    app.route('/Admin/People/:pplId')
        .delete(JobBoard.delete_a_People);

    app.route('/Admin/Relation/:advId/:pplId')
        .delete(JobBoard.delete_a_Relation);
};