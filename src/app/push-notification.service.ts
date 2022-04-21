import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDuPLCkFAhiMrGyY76QJKXuue10ByNlgJE",
      authDomain: "chat-1996.firebaseapp.com",
      databaseURL: "https://chat-1996.firebaseio.com",
      projectId: "chat-1996",
      storageBucket: "chat-1996.appspot.com",
      messagingSenderId: "393246949880",
      appId: "1:393246949880:web:fc7836429a7530011b160d"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  }

}
