//PUT/ADD
exports.addProject =  function(PortfolioDB,qs,cb){
    let sql = "Call PortfolioDB.addProject(?,?,?,?,?,@msg); Select @msg";
    PortfolioDB.query(sql, [qs.P_title, qs.P_description, qs.P_Catagory, qs.P_link, qs.P_start, qs.P_end],(err,results)=>{
        if(err){
            let message = 'Internal Server Error';
            cb(500,message, message);
        }else{
            console.log(results[1][0]['@msg']);
            cb(200, 'OK' , results[1][0]['@msg']);
        }
    })
};

//PUT/UPDATE
exports.updateProject =  function(PortfolioDB,qs,cb){ 
    let sql = "Call PortfolioDB.updateProject(?,?,?,?,?,@msg); Select @msg";
    PortfolioDB.query(sql, [qs.P_Id, qs.P_title,qs.P_description,qs.P_Catagory,qs.P_link, qs.P_start, qs.P_end],(err,results)=>{
        if(err){
            let message = 'Internal Server Error';
            cb(500,message, message);
        }else{
            console.log(results[1][0]['@msg']);
            cb(200, 'OK' , results[1][0]['@msg']);
        }
    })
};
//GET/DISPLAY
exports.displayProject = function(PortfolioDB, qs, cb) {
    let sql = "Call PortfolioDB.displayProject(?, @msg); Select @msg;";
    PortfolioDB.query(sql, [qs.P_Id], (err, results) => {
        if (err) {
            let message = 'Internal Server Error';
            cb(500, message, message);
        } else {
            // Check if the results contain data
            if (results[0].length === 0) {
                cb(404, "Not Found");
            } else {
                cb(200, "OK", results[0]); 
            }
        }
    });
};
//DELETE/DELETE
exports.deleteProject =  function(PortfolioDB,qs,cb){ 
    let sql = "Call PortfolioDB.deleteProject(?,@msg); Select @msg";
    PortfolioDB.query(sql, [qs.P_Id],(err,results)=>{
        if(err){
            let message = 'Internal Server Error';
            cb(500,message, message);
        }else{
            console.log(results[1][0]['@msg']);
            cb(200, 'OK' , results[1][0]['@msg']);
        }
    })  
};