export const ENV = {
  NEXT_PUBLIC_SERVER_ENDPOINT:
    process.env.NEXT_PUBLIC_SERVER_ENDPOINT || 'http://18.224.177.10/es/api',
  NEXT_PUBLIC_FIREBASE_API_KEY:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyADX8Vtq5CUa1D4h2Tz5aJTwVBl4lF03sA',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'testfirestore-4dfbb.firebaseapp.com',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'testfirestore-4dfbb',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'testfirestore-4dfbb.appspot.com',
  NEXT_PUBLIC_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || '228224772980',
  NEXT_PUBLIC_APP_ID:
    process.env.NEXT_PUBLIC_APP_ID ||
    '1:228224772980:web:ae9919420a066bcc191a21',
};