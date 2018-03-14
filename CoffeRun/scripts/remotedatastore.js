(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var order = new Object();
  var order1 = new Object();

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }
    this.serverUrl = url;
  }
  RemoteDataStore.prototype.add = function(key, val) {
    order.key = key;
    order.val = val;
    console.log(JSON.stringify(order));
    $.ajax(this.serverUrl, {
      type: 'POST',
      contentType: "application/json",
      data: JSON.stringify(order),
    });
  }
  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };
  RemoteDataStore.prototype.get = function(key, cb) {
    key = '?' + 'key=' + key;
    $.get(this.serverUrl + '/' + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };
  RemoteDataStore.prototype.remove = function(key) {
    key = '?' + 'key=' + key;
    var url = this.serverUrl;
    $.get(this.serverUrl + key, function(serverResponse) {
      $.ajax(url + '/' + serverResponse[0].id, {
        type: "DELETE",
      });
    });
  };
  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
