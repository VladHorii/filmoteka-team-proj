import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import shortid from 'shortid';

class Authorization {
  constructor() {
    this.user = {};
    this.isAuth = false;
    this.init();
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

    document.querySelector('.auth-status').textContent = `Вы не авторизованы`;

    firebase.auth().onAuthStateChanged(this.setUser.bind(this));
  }

  async setUser() {
    if (!this.isAuth && this.getUserID()) {
      this.user = {
        name: await this.getUserName(),
        uid: this.getUserID(),
      };
      document.querySelector('.auth-status').textContent = `Вы авторизованы как ${this.user.name}`;

      this.isAuth = true;
    }
  }

  async register() {
    const email = document.querySelector('.auth-email').value;
    const name = document.querySelector('.auth-name').value;
    const pass = document.querySelector('.auth-pass').value;
    console.log('REGISTER', email, name, pass);

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass);

      const uid = this.getUserID();

      await firebase.database().ref(`/users/${uid}/info`).set({
        name,
      });
      this.isAuth = true;
      this.setUser();
    } catch (error) {
      console.log(error);
    }
  }

  async auth() {
    const email = document.querySelector('.auth-email').value;
    const pass = document.querySelector('.auth-pass').value;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass);

      await this.setUser();

      console.log(`Вы авторизовались как ${authorization.user.name}`);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    firebase.auth().signOut();
    this.user = {};
    this.isAuth = false;
  }
}

const authorization = new Authorization();

document
  .querySelector('.js-auth-submit-register')
  .addEventListener('click', authorization.register.bind(authorization));
document
  .querySelector('.js-auth-submit-logout')
  .addEventListener('click', authorization.logout.bind(authorization));

document
  .querySelector('.js-auth-submit-auth')
  .addEventListener('click', authorization.auth.bind(authorization));

document.querySelector('.js-auth-submit-myname').addEventListener('click', async e => {
  console.log(authorization.user);
});
//
//
//
//
//
// Добавление и просмотр списка просмотренных фильмов
//

document.querySelector('.js-lib-add-watched').addEventListener('click', e => {
  const uid = authorization.user.uid;
  const sid = shortid.generate();
  firebase.database().ref(`/users/${uid}/info/watched`).push(sid);

  console.log('click to add-watched');
});
document.querySelector('.js-lib-add-queue').addEventListener('click', e => {
  const uid = authorization.user.uid;
  const sid = shortid.generate();
  firebase.database().ref(`/users/${uid}/info/queue`).push(sid);

  console.log('click to add-queue');
});
document.querySelector('.js-lib-queue').addEventListener('click', async e => {
  const uid = authorization.user.uid;
  const queue = (await firebase.database().ref(`/users/${uid}/info/queue`).once('value')).val();

  for (let key in queue) {
    console.log(queue[key]);
  }
  console.log('click to queue');
});
document.querySelector('.js-lib-watched').addEventListener('click', async e => {
  const uid = authorization.user.uid;
  const watched = (await firebase.database().ref(`/users/${uid}/info/watched`).once('value')).val();

  for (let key in watched) {
    console.log(watched[key]);
  }

  console.log('click to watched');
});
{
  /* <p class="auth-status">1</p>
<label>email<input class="auth-email" id="auth-email" type="text" /></label>
<label>name<input class="auth-name" id="auth-name" type="text" /></label>
<label>pass<input class="auth-pass" id="auth-pass" type="text" /></label>
<button class="js-auth-submit-register" type="button">reg</button>
<button class="js-auth-submit-auth" type="button">auth</button>
<button class="js-auth-submit-myname" type="button">getmyname</button>
<button class="js-auth-submit-logout" type="button">logout</button>
<div></div>
<button class="js-lib-add-watched" type="button">Add to watched</button>
<button class="js-lib-add-queue" type="button">Add to queue</button>
<button class="js-lib-watched" type="button">watched</button>
<button class="js-lib-queue" type="button">queue</button> */
}
