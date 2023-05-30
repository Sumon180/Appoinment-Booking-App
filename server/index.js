const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firebase Firestore instance
const db = admin.firestore();

// Routes
app.get("/appointments", async (req, res) => {
  try {
    const appointmentsRef = db.collection("appointments");
    const snapshot = await appointmentsRef.get();
    const appointments = [];
    snapshot.forEach((doc) => {
      const appointment = {
        id: doc.id,
        name: doc.data().title,
        doctor: doc.data().doctor,
        date: doc.data().date,
      };
      appointments.push(appointment);
    });
    res.json(appointments);
  } catch (error) {
    console.error("Error getting appointments", error);
    res.status(500).json({ error: "Error getting appointments" });
  }
});

app.post("/appointments", async (req, res) => {
  try {
    const { id } = req.body.id;
    const { name } = req.body.name;
    const { doctor } = req.body.doctor;
    const { date } = req.body.date;
    if (!name && !doctor && !date) {
      return res.status(400).json({ error: "Whole field is required" });
    }
    const appointment = {
      id,
      name,
      date,
      doctor,
      date,
    };
    const docRef = await db.collection("appointments").add(appointment);
    res.json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
