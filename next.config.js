/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // START OF FIREBASE ENV_VARS
    FIREBASE_PUBLIC_API_KEY: 'AIzaSyCwPoDB1RW6syYjAgwjjdbxMx_g8yUSd6w',
    FIREBASE_AUTH_DOMAIN: 'themoviebakery.firebaseapp.com',
    FIREBASE_PROJECT_ID: 'themoviebakery',
    FIREBASE_STORAGE_BUCKET: 'themoviebakery.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '456985856502',
    FIREBASE_APP_ID: '1:456985856502:web:c46fb6c765e32f4fbe1fd7',
    FIREBASE_MEASUREMENT_ID: 'G-MFJBJC43KR',
    // END OF FIREBASE ENV_VARS
    TMDB_POSTER_HOST: 'https://image.tmdb.org/t/p/w500',
    GO_CRUD: 'https://backend.themoviebakery.com',
    RECOMMENDER: 'SOME_IP:5000',
  },
}

module.exports = nextConfig
