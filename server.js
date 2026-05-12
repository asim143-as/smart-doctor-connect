const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ In-Memory Database (No SQLite needed for Vercel!)
let doctors = [
  {
    id: 1,
    name: 'Dr. Ahmed Khan',
    specialization: 'Cardiologist',
    location: 'Lahore',
    consultationType: 'Online/Physical',
    experience: 15,
    rating: 4.8,
    email: 'ahmed@doctorconnect.com',
    phone: '+92-300-1234567',
    bio: 'Experienced cardiologist with 15 years of practice. Specializes in heart disease management.'
  },
  {
    id: 2,
    name: 'Dr. Fatima Ali',
    specialization: 'Dermatologist',
    location: 'Karachi',
    consultationType: 'Online',
    experience: 10,
    rating: 4.9,
    email: 'fatima@doctorconnect.com',
    phone: '+92-300-2345678',
    bio: 'Skin specialist with expertise in acne, eczema, and cosmetic dermatology.'
  },
  {
    id: 3,
    name: 'Dr. Muhammad Hassan',
    specialization: 'Orthopedic',
    location: 'Islamabad',
    consultationType: 'Physical',
    experience: 12,
    rating: 4.7,
    email: 'hassan@doctorconnect.com',
    phone: '+92-300-3456789',
    bio: 'Orthopedic surgeon specializing in joint replacements and sports injuries.'
  },
  {
    id: 4,
    name: 'Dr. Ayesha Malik',
    specialization: 'Neurologist',
    location: 'Lahore',
    consultationType: 'Online/Physical',
    experience: 14,
    rating: 4.8,
    email: 'ayesha@doctorconnect.com',
    phone: '+92-300-4567890',
    bio: 'Neurologist with experience in treating migraine, epilepsy, and neurological disorders.'
  },
  {
    id: 5,
    name: 'Dr. Usman Raza',
    specialization: 'Pediatrician',
    location: 'Karachi',
    consultationType: 'Online/Physical',
    experience: 9,
    rating: 4.6,
    email: 'usman@doctorconnect.com',
    phone: '+92-300-5678901',
    bio: 'Child health specialist with expertise in pediatric care and vaccination.'
  },
  {
    id: 6,
    name: 'Dr. Rabia Hassan',
    specialization: 'General Practitioner',
    location: 'Rawalpindi',
    consultationType: 'Online',
    experience: 8,
    rating: 4.5,
    email: 'rabia@doctorconnect.com',
    phone: '+92-300-6789012',
    bio: 'General practitioner providing comprehensive primary care services.'
  }
];

let nextId = 7;

// Symptom to Specialization Mapping
const symptomMap = {
  'chest pain': ['Cardiologist', 'General Practitioner'],
  'heart': ['Cardiologist'],
  'cardiac': ['Cardiologist'],
  'blood pressure': ['Cardiologist'],
  'heart disease': ['Cardiologist'],
  'palpitation': ['Cardiologist'],
  'breathlessness': ['Cardiologist', 'General Practitioner'],
  'acne': ['Dermatologist'],
  'skin': ['Dermatologist'],
  'rash': ['Dermatologist'],
  'allergy': ['Dermatologist', 'General Practitioner'],
  'eczema': ['Dermatologist'],
  'psoriasis': ['Dermatologist'],
  'itching': ['Dermatologist'],
  'pimple': ['Dermatologist'],
  'fungal': ['Dermatologist'],
  'wound': ['Dermatologist', 'General Practitioner'],
  'back pain': ['Orthopedic', 'General Practitioner'],
  'joint pain': ['Orthopedic'],
  'fracture': ['Orthopedic'],
  'bone': ['Orthopedic'],
  'arthritis': ['Orthopedic'],
  'sports injury': ['Orthopedic'],
  'neck pain': ['Orthopedic'],
  'knee pain': ['Orthopedic'],
  'shoulder pain': ['Orthopedic'],
  'sprain': ['Orthopedic'],
  'dislocation': ['Orthopedic'],
  'headache': ['Neurologist', 'General Practitioner'],
  'migraine': ['Neurologist'],
  'neurological': ['Neurologist'],
  'epilepsy': ['Neurologist'],
  'seizure': ['Neurologist'],
  'tremor': ['Neurologist'],
  'dizziness': ['Neurologist', 'General Practitioner'],
  'brain': ['Neurologist'],
  'nerve pain': ['Neurologist'],
  'numbness': ['Neurologist'],
  'tingling': ['Neurologist'],
  'child': ['Pediatrician'],
  'baby': ['Pediatrician'],
  'kids': ['Pediatrician'],
  'children': ['Pediatrician'],
  'vaccination': ['Pediatrician'],
  'fever': ['General Practitioner', 'Pediatrician'],
  'cough': ['General Practitioner'],
  'cold': ['General Practitioner'],
  'flu': ['General Practitioner'],
  'general': ['General Practitioner'],
  'checkup': ['General Practitioner'],
  'consultation': ['General Practitioner']
};

// ─────────────────────────────────────────
// API Routes
// ─────────────────────────────────────────

// Get all doctors
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

// Get single doctor
app.get('/api/doctors/:id', (req, res) => {
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));
  if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
  res.json(doctor);
});

// Search doctors
app.get('/api/doctors/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const results = doctors.filter(doc =>
    doc.name.toLowerCase().includes(query) ||
    doc.specialization.toLowerCase().includes(query) ||
    doc.location.toLowerCase().includes(query)
  ).sort((a, b) => b.rating - a.rating);
  res.json(results);
});

// Filter doctors
app.post('/api/doctors/filter', (req, res) => {
  const { specialization, location, consultationType } = req.body;

  let results = [...doctors];

  if (specialization && specialization !== 'All') {
    results = results.filter(d => d.specialization === specialization);
  }
  if (location && location !== 'All') {
    results = results.filter(d => d.location === location);
  }
  if (consultationType && consultationType !== 'All') {
    results = results.filter(d => d.consultationType.includes(consultationType));
  }

  results.sort((a, b) => b.rating - a.rating);
  res.json(results);
});

// AI Doctor Recommendation (FREE - No API charges!)
app.post('/api/recommend-doctor', (req, res) => {
  const { symptoms, location } = req.body;

  if (!symptoms) {
    return res.status(400).json({ error: 'Please describe your symptoms' });
  }

  const lowerSymptoms = symptoms.toLowerCase();
  let matchedSpecializations = [];

  Object.keys(symptomMap).forEach(keyword => {
    if (lowerSymptoms.includes(keyword)) {
      matchedSpecializations = [...matchedSpecializations, ...symptomMap[keyword]];
    }
  });

  matchedSpecializations = [...new Set(matchedSpecializations)];

  if (matchedSpecializations.length === 0) {
    matchedSpecializations = ['General Practitioner'];
  }

  let recommended = doctors.filter(doc => {
    const specMatch = matchedSpecializations.includes(doc.specialization);
    const locationMatch = !location || doc.location.toLowerCase().includes(location.toLowerCase());
    return specMatch && locationMatch;
  });

  if (recommended.length === 0) {
    recommended = doctors.filter(doc => matchedSpecializations.includes(doc.specialization));
  }

  const topRecommendations = recommended
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map(doc => ({
      doctorName: doc.name,
      specialization: doc.specialization,
      location: doc.location,
      rating: doc.rating,
      reason: `Specialist in ${doc.specialization} - ${doc.experience} years experience`,
      id: doc.id
    }));

  res.json({
    recommendations: topRecommendations,
    matchedSpecializations
  });
});

// Add new doctor
app.post('/api/doctors', (req, res) => {
  const { name, specialization, location, consultationType, experience, email, phone, bio } = req.body;

  if (!name || !specialization || !location || !consultationType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newDoctor = {
    id: nextId++,
    name, specialization, location, consultationType,
    experience: experience || 0,
    rating: 0,
    email: email || '',
    phone: phone || '',
    bio: bio || ''
  };

  doctors.push(newDoctor);
  res.status(201).json({ id: newDoctor.id, message: 'Doctor added successfully' });
});

// Get supported symptoms
app.get('/api/symptoms', (req, res) => {
  res.json({
    symptoms: Object.keys(symptomMap),
    message: 'Type any of these symptoms for AI recommendation'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Smart Doctor Connect running on http://localhost:${PORT}`);
  console.log(`✅ NO DATABASE needed - Works on Vercel!\n`);
});

module.exports = app;
