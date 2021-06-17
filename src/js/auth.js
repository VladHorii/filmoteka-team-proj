import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { Spinner } from './components/spinner';

const spinner = new Spinner();
// spinner.open();

// import shortid from 'shortid';

export default class Authorization {
  constructor() {
    this.user = {};
    this.isAuth = false;
    // this.init();
  }

  getUserID() {
    if (firebase.auth().currentUser === null) {
      return null;
    }
    return firebase.auth().currentUser.uid;
  }

  async getUserName() {
    const uid = this.getUserID();
    if (!uid) {
      return null;
    }
    const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
    return await info.name;
  }

  async init() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC_V7LeYj0xwx_zkTQspc01pizchHhdkzY',
      authDomain: 'filmoteka-db.firebaseapp.com',
      projectId: 'filmoteka-db',
      storageBucket: 'filmoteka-db.appspot.com',
      messagingSenderId: '973288392688',
      appId: '1:973288392688:web:4619fcb721948be60e7f35',
      measurementId: 'G-0JX3NKX61J',
    });

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    firebase.auth().onAuthStateChanged(this.setUser.bind(this));
  }

  async setUser() {
    if (!this.isAuth && this.getUserID()) {
      this.user = {
        name: await this.getUserName(),
        uid: this.getUserID(),
      };
      document.querySelector('.js-auth-btn').parentNode.classList.add('visually-hidden');
      document.querySelector('.js-logout-btn').parentNode.classList.remove('visually-hidden');
      document.querySelector('.js-my-library-btn').parentNode.classList.remove('visually-hidden');
      this.isAuth = true;
    }
  }

  async register(email, name, pass) {
    try {
      spinner.open();
      await firebase.auth().createUserWithEmailAndPassword(email, pass);

      const uid = this.getUserID();

      await firebase.database().ref(`/users/${uid}/info`).set({
        name,
      });
      this.isAuth = true;
      this.setUser();
      spinner.close();
      return await email;
    } catch (error) {
      return error;
    } finally {
      spinner.close();
    }
  }

  async auth(email, pass) {
    try {
      spinner.open();
      await firebase.auth().signInWithEmailAndPassword(email, pass);

      await this.setUser();

      return await email;
    } catch (error) {
      return error;
    } finally {
      spinner.close();
    }
  }

  async logout() {
    firebase.auth().signOut();
    this.user = {};
    this.isAuth = false;
    document.querySelector('.js-auth-btn').parentNode.classList.remove('visually-hidden');
    document.querySelector('.js-logout-btn').parentNode.classList.add('visually-hidden');
    document.querySelector('.js-my-library-btn').parentNode.classList.add('visually-hidden');
  }
}
