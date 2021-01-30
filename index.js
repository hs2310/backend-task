const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())

const port = 3001

// DATA STRUCTURE TO MAINTAIN TRACK OF TRANSACTION AND BALANCE OF USERS
let transaction = [];
let balance = {}

// FUNCTION TO DEDUCT POINTS
let deductTransaction = (amount) => {

    // DATA STRUCTURE TO TRACK POINTS TO DEDUCT
    let deduct = {};

    // DEDUCTION LOGIC
    while(amount != 0){

        if (amount < transaction[0][1] ){
            
            // UPDATE BALANCE
            balance[transaction[0][0]] -= amount;
            
            // UPDATE THE FIRST TRANSACTION
            transaction[0][1] -= amount;
            
            // UPDATE DEDUCT
            if (transaction[0][0] in deduct){
                deduct[transaction[0][0]] -= amount;
            } else {
                deduct[transaction[0][0]] = -amount;
                
            }
            
            // STOP CONDITION
            amount = 0 ;

        } else {

            // UPDATE BALANCE
            balance[transaction[0][0]] -= transaction[0][1];
            
            // DEDUCT TRANSACTION VALUE FROM AMOUNT
            amount -= transaction[0][1];

            // UPDATE DEDUCT
            if (transaction[0][0] in deduct){
                deduct[transaction[0][0]] -= transaction[0][1];
            } else {
                deduct[transaction[0][0]] = -transaction[0][1];
            }

            // REMOVE THE FIRST TRANSACTION
            transaction.shift();
        }

    }

    return deduct;
}

//FUNCTION TO ADD POINTS
let addTransaction = (t) => {

    if (t[1] < 0){ // IF -VE VALUE PASSED 
        
        _ = deductTransaction(-t[1]);
    
    } else { // IF +VE VALUE PASSED

        // APPEND TO TRASACTION ARRAY
        transaction.push(t);

        // UPDATE BALANCE
        if (t[0] in balance){

            // OLD USER 
            balance[t[0]] += t[1]; 

        } else {

            // NEW USER
            balance[t[0]] = t[1];

        }
        
        // ADD SORT IF TRASACTIONS WITH PREVIOUS TIMESTAMPS ARE CONSIDERED VALID
        // transaction.sort((a,b) => a[2] - b[2]);
    }

}


// API TO ADD A TRANSACTION
app.post('/add', (req, res) => {

	let t = req.body.transaction;
	t[2] = Date.parse(t[2]);

	// PUSH THE TRANSACTION 
	addTransaction(t);

	console.table(transaction);

	res.send("Transaction Successful");
})

// API TO DEDUCT BALANCE WITH CONSTRAINTS
app.get('/deduct', (req, res) => {

	let amount = req.query.deduct; // TOTAL AMOUNT TO BE DEDUCTED
	
    let deduct = deductTransaction(amount);
        
    let response = [];
    
    for (let i in deduct){
        response.push(Array(i, deduct[i] , "now"));
    }


	console.log("DEDUCTION : ");
    console.table(response);
    
	console.log("UPDATED TRANSACTIONS : ");
	console.table(transaction);
    
    res.send(response);
})

// API TO CHECK BALANCE OF USERS IN THE SYSTEM
app.get('/balance', (req, res) => {

	// JUST TRAVERSE OVER THE BALANCE NO NEED TO RE-TRAVERSE TRANSACTION ARRAY FOR BALANCE COUNTING

	let response = []

	// PREPARE RESPONSE LIST
	for (let i in balance)
		response.push(Array(i, balance[i]))

	console.log("BALANCE : ")
	console.table(response)

	res.send(response)
})
app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`)
})