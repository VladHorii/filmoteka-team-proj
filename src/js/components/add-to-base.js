import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Authorization from '../auth';

// import { defaults, info, success, error } from '@pnotify/core';

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

  async addFilm(folder, filmID) {
    const isExits = await this.isExits(folder, filmID);
    if (isExits) {
      throw new Error('this film is already recorded in the database');
    }
    this.writeToBase(folder, filmID);
  }

  async getList(path) {
    this.init();

    return (await firebase.database().ref(`/users/${this.uid}/info/${path}`).once('value')).val();
  }

  async removeFrom(path, id) {
    const list = await this.getList(path);
    const key = this.getKeyFromId(list, id);
    firebase.database().ref(`/users/${this.uid}/info/${path}/${key}`).remove();
  }

  async isExits(path, filmID) {
    const list = await this.getList(path);
    if (list) {
      return this.findInList(list, filmID);
    }
    return undefined;
  }

  writeToBase(folder, id) {
    this.init();

    firebase.database().ref(`/users/${this.uid}/info/${folder}`).push(id);
  }

  getKeyFromId(arr, id) {
    for (let key in arr) {
      if (arr[key] === id) {
        return key;
      }
    }
  }

  getIdsFromArr(arr) {
    const result = [];

    for (let key in arr) {
      result.push(arr[key]);
    }

    return result;
  }

  findInList(list, filmID) {
    const response = this.getIdsFromArr(list);
    return response.find(film => film === filmID);
  }
}

const addToBase = new AddToDataBase();
