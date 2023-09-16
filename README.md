# Firebase Realtime Database Demo
This project demonstrates reading data in realtime from a Firebase Realtime Database using the Node.js Admin SDK.

Overview
The Firebase Realtime Database is a cloud-hosted NoSQL database that allows storing and syncing data between users in realtime. This project shows how to connect to a Realtime DB from a Node.js server using the Firebase Admin SDK.

The key components:

firebase-admin - Used to initialize app and get database reference
Realtime DB rules - Defines read/write access
value listener - Listens for changes at a database path
onCreate/onUpdate/onDelete listeners - Listen for specific data change events
Usage
Clone the repo

Run npm install
Add your Firebase service account credentials
Deploy DB rules
Run node index.js to start listening for changes
The index.js file contains examples of:

Querying data
Listening for value changes
Listening for create/update/delete events
Further Reading
Firebase Realtime Database Docs
Admin SDK Reference
Let me know if you would like me to expand or modify this README!
