let onRequest = indexedDB.open('cart', 1);
onRequest.onsuccess = () => {
  console.log('Success creating or accessing db');
};
onRequest.onupgradeneeded = () => {
  const database = onRequest.result;
  database.createObjectStore('carts');
  database.createObjectStore('order');
};
onRequest.onerror = () => {
  console.log('Error creating or accessing db');
};
