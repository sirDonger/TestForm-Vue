var express = require('express')
var bodyParser = require('body-parser')

var admin = require('firebase-admin')

// var serviceAccount = require('./node-firebase-intro-firebase-adminsdk-r73z4-d28579f9a0.json')

var firebaseAdmin = admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testform-5f4a5.firebaseio.com"
})

var database = firebaseAdmin.database()

var app = express()


app.get('/', function(request, response){
    var restaurantsRef = database.ref("/contacts")
    
    restaurantsRef.once('value', function(snapshot){
        var data = snapshot.val()
        
        if ( !data ) {
            data = {}
        }
        
        response.render('App.vue', { restaurants: data })        
    })
})

app.get('/mncxjPCBxpoW48DFpCF4', (req, res) => {
    var userId = req.params.userId
    
    var user = firebaseAdmin.getAllUsersData(userId)
    
    res.render('Form.vue', { user: user })
})

var port = process.env.PORT || 8080

app.listen(port, function(){
    console.log('App running on port ' + port)
})


