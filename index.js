
var express = require('express');
var app = express();
const bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1";

const {ObjectId} = require('mongodb');


//tesr

var path = require('path');
var public = path.join(__dirname, 'public');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', express.static(public));

 

app.post("/restaurant/menu/add",function(req,res) {
   
  var item = req.body

   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
    
     
      var dbo = db.db("resturant");
      dbo.collection("menu").insertOne(item,function(err, result) {
        if (err) throw err;
        console.log(result);

        res.send(result)
        db.close();
      });
   });
});

app.get("/restaurant/menu/list",function(req,res){

   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
     
    
      var dbo = db.db("resturant");
      dbo.collection("menu").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);

        res.send(result)
        db.close();
      });
   });
})

app.delete("/restaurant/menu/item/:id",function(req,res){

  

   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
     
      var dbo = db.db("resturant");
      dbo.collection("menu").deleteOne({_id : ObjectId(req.params.id)},function(err, result) {
        if (err) throw err;
        console.log(result);

        res.send(result)
        db.close();
      });
   });
})

app.post("/restaurant/table/add",function(req,res) {
   
   var item = req.body

   console.log(item)
 
    MongoClient.connect(url, function(err, db) {
       if (err) throw err;
        
      
       var dbo = db.db("resturant");
       dbo.collection("table").insertOne(item,function(err, result) {
         if (err) throw err;
         console.log(result);
 
         res.send(result)
         db.close();
      });
   });
});

 app.get("/restaurant/table/list",function(req,res){

   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
     
    
      var dbo = db.db("resturant");
      dbo.collection("table").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);

        res.send(result)
        db.close();
      });
   });
})

app.delete("/restaurant/table/:id",function(req,res){

   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
     
    
      var dbo = db.db("resturant");
      dbo.collection("table").deleteOne({_id : ObjectId(req.params.id)},function(err, result) {
        if (err) throw err;
        console.log(result);

        res.send(result)
        db.close();
      });
   });
})


app.post("/restaurant/waiter/add",function(req,res) {
   
   var item = req.body

 
    MongoClient.connect(url, function(err, db) {
       if (err) throw err;
       console.log("Database created!");
      
     
       var dbo = db.db("resturant");
       dbo.collection("waiter").insertOne(item,function(err, result) {
         if (err) throw err;
         console.log(result);
 
         res.send(result)
         db.close();
      });
   });
});

 app.get("/restaurant/waiter/list",function(req,res){

   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
     
    
      var dbo = db.db("resturant");
      dbo.collection("waiter").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);

        res.send(result)
        db.close();
      });
   });
})

app.delete("/restaurant/waiter/:id",function(req,res){

   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
     
    
      var dbo = db.db("resturant");
      dbo.collection("waiter").deleteOne({_id : ObjectId(req.params.id)},function(err, result) {
        if (err) throw err;
        console.log(result);

        res.send(result)
        db.close();
      });
   });
})

app.post("/restaurant/reservations/list",function(req,res) {
   
   var occupants = req.body.occupants
 
    MongoClient.connect(url, function(err, db) {
       if (err) throw err;  
      
     
       var dbo = db.db("resturant");
       dbo.collection("table").find({ capacity : { $gte : occupants }  }).toArray(function(err, availableTables) {
         console.log("found some tables with capacity  " ,availableTables)
         var availableTableIds = []
         for(var each in availableTables){
            availableTableIds.push(availableTables[each]._id.toString())
         }

         console.log("their ids are  ", availableTableIds)

         //We will see if these tables are empty or not
         dbo.collection("occupancy").find({ tableId : {$in :   availableTableIds}, booked : true   })
         .toArray(function(err2, occupancyData) {

            console.log("found some occupancy data  " ,occupancyData,err2)
            if (err2) throw err;
            var response = []
            var flag = false
             for(var j in availableTables){
                  for(var i in occupancyData){
                     if(availableTables[j]._id == occupancyData[i].tableId) {
                        flag = true
                        continue
                     } 
                  }
               if(flag == false) response.push(availableTables[j])
               flag = false
                
            }
            res.send(response)
            db.close();

         })

      });
   });
});

// app.put("/restaurant/table/availability/:id", function(req, res) {
//    var occupants = req.body.occupants
 
//     MongoClient.connect(url, function(err, db) {
//        if (err) throw err;  
      
     
//        var dbo = db.db("resturant");
//        dbo.collection("customer").updateOne(item,function(err, result) {
//          if (err) throw err;
//          console.log(result);
 
//          res.send(result)
//          db.close();
//       });
//    });
// });

app.post("/restaurant/customer/add",function(req,res) {
   
   var item = req.body
 
    MongoClient.connect(url, function(err, db) {
       if (err) throw err;  
      
     
       var dbo = db.db("resturant");
       dbo.collection("customer").insertOne(item,function(err, result) {
         if (err) throw err;
         console.log(result);
 
         res.send(result)
         db.close();
      });
   });
});

app.get("/restaurant/customer/list",function(req,res){

   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
     
    
      var dbo = db.db("resturant");
      dbo.collection("customer").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);

        res.send(result)
        db.close();
      });
   });
})

app.delete("/restaurant/customer/:id",function(req,res){

   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
     
    
      var dbo = db.db("resturant");
      dbo.collection("customer").deleteOne({_id : ObjectId(req.params.id)},function(err, result) {
        if (err) throw err;
        console.log(result);

        res.send(result)
        db.close();
      });
   });
})

app.post("/restaurant/occupancy/add", function(req, res) {
   var item = req.body
 
    MongoClient.connect(url, function(err, db) {
       if (err) throw err;  
      
       var dbo = db.db("resturant");
       dbo.collection("occupancy").insertOne(item,function(err, result) {
         if (err) throw err;
         console.log(result);
 
         res.send(result)
         db.close();
      });
   }); 
})

app.get("/restaurant/occupancy/list",function(req,res){

   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
     
     
    
      var dbo = db.db("resturant");
      dbo.collection("occupancy").find({}).toArray(function(err, result) {
        if (err) throw err;
     

        res.send(result)
        db.close();
      });
   });
})

// app.delete("/restaurant/occupancy/:id",function(req,res){

//    MongoClient.connect(url, function(err, db) {
//       if (err) throw err;
//       console.log("Database created!");
     
    
//       var dbo = db.db("resturant");
//       dbo.collection("occupancy").deleteOne({_id : ObjectId(req.params.id)},function(err, result) {
//         if (err) throw err;
//         console.log(result);

//         res.send(result)
//         db.close();
//       });
//    });
// })

app.put("/restaurant/occupancy/unbook/:id", function(req, res) {
   
   console.log("putting status",req.params)
 
    MongoClient.connect(url, function(err, db) {
       if (err) throw err;  
      
       var dbo = db.db("resturant");
       dbo.collection("occupancy").updateOne({_id : ObjectId(req.params.id)},{$set: {booked : false}},function(err, result) {
         if (err) throw err;

         res.send(result)
         db.close();
      });
   });
});

// app.post("/restaurant/customer",function(req,res) {
   
//    var occupants = req.body.occupants
 
//     MongoClient.connect(url, function(err, db) {
//        if (err) throw err;  
      
     
//        var dbo = db.db("resturant");
//        dbo.collection("customer").insertOne(item,function(err, result) {
//          if (err) throw err;
//          console.log(result);
 
//          res.send(result)
//          db.close();
//       });
//    });
// });


app.listen(8080);
