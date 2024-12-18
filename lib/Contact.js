//PUT/ADD
exports.addContact =  function(PortfolioDB,qs,cb){ 
    let sql = "Call PortfolioDB.addContact(?,?,?,?,?,@msg); Select @msg";
    PortfolioDB.query(sql, [qs.U_FName,qs.U_LName,qs.U_email,qs.U_date, qs.U_message],(err,results)=>{
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
exports.updateContact =  function(PortfolioDB,qs,cb){ 
    let sql = "Call PortfolioDB.updateContact(?,?,?,?,?,@msg); Select @msg";
    PortfolioDB.query(sql, [qs.U_Id, qs.U_FName,qs.U_LName,qs.U_email,qs.U_date, qs.U_message],(err,results)=>{
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
exports.displayContact = function(PortfolioDB, qs, cb) {
    let sql = "Call PortfolioDB.displayContact(?, @msg); Select @msg;";
    PortfolioDB.query(sql, [qs.U_Id], (err, results) => {
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
exports.deleteContact =  function(PortfolioDB,qs,cb){ 
    let sql = "Call PortfolioDB.deleteContact(?,@msg); Select @msg";
    PortfolioDB.query(sql, [qs.U_Id],(err,results)=>{
        if(err){
            let message = 'Internal Server Error';
            cb(500,message, message);
        }else{
            console.log(results[1][0]['@msg']);
            cb(200, 'OK' , results[1][0]['@msg']);
        }
    })
};