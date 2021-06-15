import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Authorization from '../auth';

const auth = new Authorization();

export class AddToDataBase {
  constructor() {
    this.uid = null;
    this._init = false;
  }
  init() {
    if (!this._init) {
      this._init = true;
      this.uid = auth.getUserID();
    }
  }

  writeToBase(folder, id) {
    this.init();

    firebase.database().ref(`/users/${this.uid}/info/${folder}`).push(id);
  }
  async addToWatched(id) {
    await this.getListWatched().then(watched => {
      if (watched.find(film => film === id)) {
        throw new Error('this film is already recorded in the database');
      }
    });
    this.writeToBase('watched', id);
  }

  async addToQueue(id) {
    await this.getListQueue().then(queue => {
      if (queue.find(film => film === id)) {
        throw new Error('this film is already recorded in the database');
      }
    });
    this.writeToBase('queue', id);
  }

  async getListWatched() {
    this.init();

    const watched = (
      await firebase.database().ref(`/users/${this.uid}/info/watched`).once('value')
    ).val();

    const result = [];

    for (let key in watched) {
      result.push(watched[key]);
    }
    return result;
  }
  async getListQueue() {
    this.init();

    const queue = (
      await firebase.database().ref(`/users/${this.uid}/info/queue`).once('value')
    ).val();

    const result = [];

    for (let key in queue) {
      result.push(queue[key]);
    }
    return result;
  }
}

const addToBase = new AddToDataBase();

document.querySelector('.js-get-watched').addEventListener('click', e => {
  addToBase.getListWatched().then(r => {
    console.log(r);
  });
});
document.querySelector('.js-get-queue').addEventListener('click', e => {
  addToBase.getListQueue().then(r => {
    console.log(r);
  });
});

// Добавление и просмотр списка просмотренных фильмов
//

// document.querySelector('.js-lib-add-watched').addEventListener('click', e => {
//   const uid = authorization.user.uid;
//   const sid = shortid.generate();
//   firebase.database().ref(`/users/${uid}/info/watched`).push(sid);

//   console.log('click to add-watched');
// });
// document.querySelector('.js-lib-add-queue').addEventListener('click', e => {
//   const uid = authorization.user.uid;
//   const sid = shortid.generate();
//   firebase.database().ref(`/users/${uid}/info/queue`).push(sid);

//   console.log('click to add-queue');
// });
// document.querySelector('.js-lib-queue').addEventListener('click', async e => {
//   const uid = authorization.user.uid;
//   const queue = (await firebase.database().ref(`/users/${uid}/info/queue`).once('value')).val();

//   for (let key in queue) {
//     console.log(queue[key]);
//   }
//   console.log('click to queue');
// });
// document.querySelector('.js-lib-watched').addEventListener('click', async e => {
//   const uid = authorization.user.uid;
//   const watched = (await firebase.database().ref(`/users/${uid}/info/watched`).once('value')).val();

//   for (let key in watched) {
//     console.log(watched[key]);
//   }

//   console.log('click to watched');
// });
