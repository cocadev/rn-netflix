import Cache from './utils/cache';
import * as config from './utils/config';
import UtilService from './utils/utils';

module.exports = {
  async fetchData(url, request, cb) {
    try {
      let response = await fetch(url, request);
      let responseJson = await response.json();
      if (response.status == 200) {
        cb(null, responseJson);
      } else {
        cb(responseJson);
      }
    } catch (error) {
      console.log('----', url);
      cb(error);
    }
  },
  async middleware(url, request, cb) {
    this.fetchData(url, request, cb);
  },
  baseApi(sub_url, method, json_data, cb) {
    let request = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' +
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc2OTIyNjg5LCJqdGkiOiJlOGFhM2NkODliMDc0NTc2YWMyNWUyZmVmYTdhZWY1MSIsInVzZXJfaWQiOjF9.i3uNfxjwM1mYMF-siN4fTlZznOmmOVK2wH2fLCmkyvk',
      },
    };
    if (method == 'POST' || method == 'PUT') {
      request['body'] = JSON.stringify(json_data);
    } else {
      // sub_url += '&t='+(new Date()).getTime()
    }

    this.middleware(config.SERVICE_API_URL + sub_url, request, cb);
  },

  async init(cb) {
    //check if current user exists or not
    let user = await UtilService.getLocalStringData('currentUser');
    Cache.clientID = await UtilService.getLocalStringData('client');
    if (user == null) {
      cb('err');
    } else {
      Cache.currentUser = JSON.parse(user);

      let locationHeader = await UtilService.getLocalStringData('locationHeader');
      let locations = await UtilService.getLocalStringData('locations');

      Cache.locationHeader = JSON.parse(locationHeader);
      Cache.locations = JSON.parse(locations);
      cb(null);
    }
  },

  login(ClientID, PhoneNumber, Password, cb) {
    Cache.PhoneNumber = PhoneNumber;
    Cache.Password = Password;
    Cache.clientID = ClientID;
    this.baseApi('/api/appLogin', 'POST', { PhoneNumber, Password }, cb);
  },

  logout() {
    UtilService.removeLocalObjectData('currentUser');
  },

  async uploadImage(file, cb) {
    // console.log('uploadImage',file)
    if (!Cache.hasInternetConnection) {
      cb(null, '');
      return;
    }
    try {
      // let image = {
      //   uri: file,
      //   type: "image/jpeg",
      //   name: "file.jpeg"
      // };

      let formData = new FormData();
      formData.append('file', file);
      console.log(file);
      // console.log('uploadImage',file)
      let response = await fetch(config.SERVICE_API_URL + '/api/common/files/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization:
            'Bearer ' +
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc2Mzk2NTQ2LCJqdGkiOiI4MzMxYzA4OWE1MTE0MDk2OTNmMGYzOTQwMDFjNzc2MiIsInVzZXJfaWQiOjF9.Ygp6xr2K3h9eIZ8eaJWvP-dL7Dxf5NBBCNjfDwUoO-c',
        },
        body: formData,
      });
      let status = response.status;

      let responseJson = await response.json();
      if (status == 200 || status == 201) {
        cb(null, responseJson);
      } else {
        cb(responseJson.message);
      }
    } catch (error) {
      cb(error);
    }
  },

  async baseUploadApi(sub_url, file) {
    // console.log('baseUploadApi', file)
    if (!Cache.hasInternetConnection) {
      return null;
    }
    let image = {
      uri: file,
      type: 'image/jpeg',
      name: 'file.jpeg',
    };
    try {
      let formData = new FormData();
      formData.append('file', image);
      let response = await fetch(config.SERVICE_API_URL + sub_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          client: 'c001',
        },
        body: formData,
      });
      let status = response.status;
      let responseJson = await response.json();
      // console.log('status',status, 'responseJson', responseJson)
      return {
        status,
        data: JSON.parse(responseJson.Result),
      };
    } catch (error) {
      // console.log(error)
      return error;
    }
  },

  async uploadAllData(cb) {
    if (Cache.locationHeader) {
      this.uploadLocations(async (err, res) => {
        if (err == null) {
          Cache.locationHeader = null;
          Cache.locations = [];
          await UtilService.removeLocalObjectData('locationHeader');
          await UtilService.removeLocalObjectData('locations');
        }
      });
    }
    if (Cache.requestStack.length > 0) {
      async.mapSeries(
        Cache.requestStack,
        async ({ url, request }, cb) => {
          try {
            let response = await fetch(url, request);
            let responseJson = await response.json();
            if (response.status == 200) {
              cb(null, responseJson);
            } else {
              cb(responseJson);
            }
          } catch (error) {
            cb(error);
          }
        },
        async (error, results) => {
          Cache.requestStack.splice(0, results.length);
          await UtilService.removeLocalObjectData('requests');
          if (error != null) {
            await UtilService.saveLocalStringData('requests', JSON.stringify(Cache.requestStack));
          }
          cb(err, results);
        }
      );
    }
  },

  //////////////////////////////
  //////////////////////////////

  login(email, password, cb) {
    Cache.Email = email;
    Cache.Password = password;
    this.baseApi('members/login', 'POST', { email, password }, cb);
  },

  //////////////////////////////
  getAllItems(type, count, cb) {
    this.baseApi('Appointment/GetAll' + type + '?PageIndex=0&PageSize=' + count, 'GET', {}, cb);
  },

  onRequestCounts(ad_id, view_time, timestamp, user, cb) {
    this.baseApi('adview', 'POST', { ad_id, view_time, timestamp, user }, cb);
  },
  getAllCountries(cb) {
    this.baseApi('countries', 'GET', {}, cb);
  },
  getAllTV(cb) {
    this.baseApi('televisions', 'GET', {}, cb);
  },
};
