/* @flow */

type Response = { json: function; body: any; status: number; statusText: string; };
// type Request = { method: string; headers: any; body: any };

class HTTPError extends Error {
  response: Response;
  status: number;

  constructor(response: Response) {
    super(response.statusText);

    this.response = response;
    this.status = response.status;
  }
}
function checkResponse(response: Response): Response {
  if (response.status < 200 || response.status >= 300) {
    throw new HTTPError(response);
  }
  return response;
}

function paramString(params: ?Object): string {
  if(!params) return '';
  var paramStr = '?';

  for(var i of params) {
    if(paramStr !== '?') {
      paramStr += "&";
    }
    paramStr += encodeURIComponent(i) + "=" + encodeURIComponent(params[i]);
  }

  return paramStr;
}


var HTTP = {
  headers: { 'Accept': 'application/json' },

  request: function(method: string, url: string, data: ?Object): Promise {
    var req: any = {
      method: method,
      headers: Object.assign({}, HTTP.headers)
    };
    if (data != null) {
      req.headers['Content-Type'] = 'application/json';
      req.body = JSON.stringify(data);
    }

    return window.fetch(url, req)
      .then(checkResponse)
      .then((response) => { return response.json(); });
  },
  get: function(url: string, params: any): Promise {
    return HTTP.request("get", url + paramString(params));
  },
  post: function(url: string, data: any): Promise { return HTTP.request('post', url, data); },
  put: function(url: string, data: any): Promise { return HTTP.request('put', url, data); },
  patch: function(url: string, data: any): Promise { return HTTP.request('patch', url, data); },
  delete: function(url: string, data: any): Promise { return HTTP.request('delete', url, data); },
};

export default HTTP;
