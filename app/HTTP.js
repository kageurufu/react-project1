/* @flow */

function checkResponse(response: any): any {
  if (response.status < 200 || response.status >= 300) {
    var error = new Error(response.statusText);
    error.response = response;
    error.status = response.status;
    throw error;
  }
  return response;
}

function paramString(params: ?object): string {
  if(!params) return '';
  var paramStr = '?';

  for(let i of params) {
    if(paramStr !== '?') {
      paramStr += "&";
    }
    paramStr += encodeURIComponent(i) + "=" + encodeURIComponent(params[i]);
  }

  return paramStr;
}

var HTTP = {
  headers: { 'Accept': 'application/json' },

  request: function(method: string, url: string, data: ?object) {
    var req = {method: method, headers: Object.assign({}, HTTP.headers)};
    if (data != null) {
      req.headers['Content-Type'] = 'application/json';
      req.body = JSON.stringify(data);
    }

    return fetch(url, req)
      .then(checkResponse)
      .then((response) => { return response.json(); });
  },
  get: function(url: string, params: ?object): promise {
    return HTTP.request("get", url + paramStr());
  },
};

['post','put','patch','delete'].forEach(function(method: string) {
  HTTP[method] = function (url: string, data: ?object) : promise { return HTTP.request(method, url, data); }
});

export default HTTP;
