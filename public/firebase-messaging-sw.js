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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background message:", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message.",
    icon: "/logo192.png",
    badge: "/favicon.ico",
    data: payload.data || {},
    vibrate: [200, 100, 200],
    requireInteraction: true,
    actions: [
      { action: "open_app", title: "Open App" },
      { action: "dismiss", title: "Dismiss" },
    ],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data.url || "/";

  if (event.action === "open_app") {
    event.waitUntil(
      clients.matchAll({ type: "window" }).then((windowClients) => {
        for (const client of windowClients) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});

self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("[SW] Installed");
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  console.log("[SW] Activated");
});
