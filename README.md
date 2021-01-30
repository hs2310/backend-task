# backend-task

The task is implemented with node.js and express.js.

Few Assumptions :

* Total points in the system are always greater than deduct amount.
* Transactions with previous timestamps are not added to system / not considered valid (for performance purpose). If want to consider valid remove comment for <a href="https://github.com/hs2310/backend-task/blob/main/index.js#L92">this</a> line.
* Whenever a transaction with -ve value is added, System internally call deductTransaction method.

To run the app :
* cd backend-task
* node server.js

To test the app we can use postman:

* Add Points :

![Add Points](https://user-images.githubusercontent.com/29951473/106351556-eebbd800-6291-11eb-827f-7a74eb30c8c1.png)

* Deduct Points :

![Deduct Points](https://user-images.githubusercontent.com/29951473/106351555-ee234180-6291-11eb-88b1-32a16d122a24.png)

* Check Balance :

![Check Balance](https://user-images.githubusercontent.com/29951473/106351558-efed0500-6291-11eb-894a-256504caf744.png)

Console Output:

![Screenshot (202)](https://user-images.githubusercontent.com/29951473/106351557-ef546e80-6291-11eb-9f09-2f7bab71a822.png)
