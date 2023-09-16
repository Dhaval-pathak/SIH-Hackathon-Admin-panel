const admin = require('firebase-admin');

const serviceAccount = require('./sihtest-3f5af-firebase-adminsdk-s5x1z-fcba313d6f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const express = require('express');
const app = express();
app.use(express.static('public'));

function acceptBooking(bookingId) {
    const bookingRef = db.collection('test').doc(bookingId);
    console.log(bookingRef.status)
    return bookingRef.update({
      status: 'confirmed'
    });
  }
  
  function rejectBooking(bookingId) {
    const bookingRef = db.collection('test').doc(bookingId);
    console.log("no")
    return bookingRef.update({
      status: 'rejected'
    });
  }

app.get('/', (req, res) => {
  const bookingRef = db.collection('test').where('available', '==', 'yes');

  bookingRef.get()
    .then(snapshot => {
      const bookings = [];
      snapshot.forEach(doc => {
        bookings.push(doc.data());
        
      });
      console.log(bookings)
      res.send(renderHTML(bookings));
    })
    .catch(err => {
      res.send('Error getting documents: ' + err);
    });
});

function renderHTML(bookings) {
    let html = `
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/css/style.css">
        <script>
        function acceptBooking(id) {
          fetch('/accept/' + id)
            .then(response => response.json())
            .then(data => {
              alert("Booking Confirmed");
            });
        }

        function rejectBooking(id) {
          fetch('/reject/' + id)
            .then(response => response.json())
            .then(data => {
              alert(Booking Rejected);
            });
        }
      </script>
      </head>
      <body>
        <h1 class="booking-container ">Booking Requests</h1>
        </body>
  `;
  bookings.forEach(booking => {
    html += `<div class="request-box" >`;
    html += `<div class="request" >`;
    html += `<p>Patient Shivam is requesting a booking with Doc. Andrew.</p>`;
    html += `<button onclick="acceptBooking('${booking.id}')">Accept </button>`;
    html += `<button onclick="rejectBooking('${booking.id}')">Reject</button><br><br>`;
    html += `</div>`;
    html += `</div>`;
  });
  return html;
}

app.get('/accept/:id', (req, res) => {
    const id = req.params.id;
    console.log('Accepting booking with ID:', id);
    acceptBooking(id)
      .then(() => {
        res.json({ message: 'Booking accepted' });
      })
      .catch(error => {
        res.json({ message: 'Error accepting booking: ' + error.message });
      });
  });
  
  app.get('/reject/:id', (req, res) => {
    const id = req.params.id;
    console.log('Rejecting booking with ID:', id);
    rejectBooking(id)
      .then(() => {
        res.json({ message: 'Booking rejected' });
      })
      .catch(error => {
        res.json({ message: 'Error rejecting booking: ' + error.message });
      });
  });
  
  

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});