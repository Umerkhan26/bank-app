importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const NOTIFICATION_ICON = "/logo192.png";
const NOTIFICATION_BADGE = "/badge.png";

messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Received background message:", {
    notification: payload.notification,
    data: payload.data,
  });

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message",
    icon: NOTIFICATION_ICON,
    badge: NOTIFICATION_BADGE,
    data: payload.data || {},
    vibrate: [200, 100, 200],
    requireInteraction: true,
    actions: [
      { action: "open_app", title: "Open App" },
      { action: "dismiss", title: "Dismiss" },
    ],
  };

  try {
    self.registration.showNotification(notificationTitle, notificationOptions);
    console.log("[SW] Notification displayed:", notificationTitle);
  } catch (error) {
    console.error("[SW] Error displaying background notification:", error);
  }
});

self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification click:", event.notification);
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        const matchingClient = windowClients.find(
          (client) => client.url === urlToOpen
        );

        if (matchingClient) {
          return matchingClient.focus();
        } else {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker");
  event.waitUntil(clients.claim());
});
