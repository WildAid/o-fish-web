const AUTH_INFO_KEY = "auth_info";

class lStorage{
  setItem(key, value){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key){
    return JSON.parse(localStorage.getItem(key));
  }

  setAuthInfo(value){
    return this.setItem(AUTH_INFO_KEY, value);
  }

  getAuthInfo(){
    return this.getItem(AUTH_INFO_KEY);
  }
  
  clear(){
      localStorage.clear();
  }
}

const instance = new lStorage();

export default instance;
