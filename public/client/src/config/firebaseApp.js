import firebaseApp from 'firebase/compat';
import 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAcq0mUBTBg_kMnQIKTUJFPwEzzkD-4N98',
  authDomain: 'reactclonesns.firebaseapp.com',
  databaseURL: 'https://reactclonesns-default-rtdb.firebaseio.com',
  projectId: 'reactclonesns',
  storageBucket: 'reactclonesns.appspot.com',
  messagingSenderId: '338215819443',
  appId: '1:338215819443:web:4824beeb2681f533a3f8c6',
  measurementId: 'G-S8WG2P9Z2E'
};

// Initialize Firebase
const FBA = firebaseApp.initializeApp(firebaseConfig);

export default FBA;
