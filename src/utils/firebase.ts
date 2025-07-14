import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
  MessagePayload,
  Messaging,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDBMPdu0IDUvRODcVEjhrfvUS3aTZw3xpI",
  authDomain: "banks-2acd4.firebaseapp.com",
  projectId: "banks-2acd4",
  storageBucket: "banks-2acd4.appspot.com",
  messagingSenderId: "968623475695",
  appId: "1:968623475695:web:dc189e9498247bea6f441a",
  measurementId: "G-632GTJBXF2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let messaging: Messaging;

const initMessaging = async (): Promise<Messaging | null> => {
  try {
    const isSupportedBrowser = await isSupported();
    if (!isSupportedBrowser) {
      console.warn("FCM not supported in this browser.");
      return null;
    }
    messaging = getMessaging(app);
    return messaging;
  } catch (error) {
    console.error("Messaging init error:", error);
    return null;
  }
};

const messagingPromise = initMessaging();

export const requestNotificationPermission = async (): Promise<
  string | null
> => {
  try {
    const messagingInstance = await messagingPromise;
    if (!messagingInstance) return null;

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      { scope: "/" }
    );

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission denied");
      return null;
    }

    const token = await getToken(messagingInstance, {
      vapidKey:
        "BIsmCNy-LfpUp9Ph5OYephVUe_rPytEnrupacP505O2nD63ieW6Tnd1g-gTQBx4d9mE6IXr-JIcDNHG2M3EJx1I",
      serviceWorkerRegistration: registration,
    });

    console.log("✅ FCM Token:", token);
    return token;
  } catch (error) {
    console.error("❌ Error getting FCM token:", error);
    return null;
  }
};

export const onForegroundMessage = (
  callback: (payload: MessagePayload) => void
) => {
  messagingPromise.then((messagingInstance) => {
    if (messagingInstance) {
      onMessage(messagingInstance, callback);
    }
  });
};

export { messagingPromise, auth };
