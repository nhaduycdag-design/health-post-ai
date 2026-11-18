// Dán cấu hình Web App từ Firebase Console vào đây.
// Chỉ bật đồng bộ khi đã cấu hình Firebase Authentication, Firestore và Security Rules.
// Firebase web config không phải mật khẩu, nhưng KHÔNG đưa private key hay service-account vào đây.
window.HEALTH_POST_FIREBASE_CONFIG = {
  apiKey: "AIzaSyC0trGoI52-VxUEc0QpW3egQHV7tCEGwkE",
  authDomain: "health-post-ai.firebaseapp.com",
  projectId: "health-post-ai",
  storageBucket: "health-post-ai.firebasestorage.app",
  messagingSenderId: "482342789505",
  appId: "1:482342789505:web:a5f2d659c4fac4601c4880"
};
// Ví dụ:
// window.HEALTH_POST_FIREBASE_CONFIG = {
//   apiKey: '...', authDomain: 'your-project.firebaseapp.com',
//   projectId: 'your-project', appId: '...'
// };
