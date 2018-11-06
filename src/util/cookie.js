class Cookie {
	get(name, subName) {
      let subCookies = this.getAll(name);
      if (subCookies) {
          return subCookies[subName];
      } else {
          return null;
      }
  }
  getAll(name) {
    let cookieName = encodeURIComponent(name) + '',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null,
      cookieEnd,
      subCookies,
      i,
      len,
      parts,
      result = {};
    if(cookieStart > -1) {
      cookieEnd = document.cookie.indexOf(';', cookieStart)
      if(cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
      if (cookieValue.length > 0) {
        subCookies = cookieValue.split('&')
        for(i = 0, len = subCookies.length; i < len; i++) {
          parts = subCookies[i].split('=')
          result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
        }
        return result
      }
    }
    return null
  }
  set(name, subName, value, expires, path, domain, secure) {
    let subcookies = this.getAll(name) || {}
    subcookies[subName] = value
    this.setAll(name, subcookies, expires, path, domain, secure)
  }
  setAll(name, subcookies, expires, path, domain, secure) {
    let cookieText = encodeURIComponent(name) + '=',
      subcookieParts = new Array(),
      subName
    for (subName in subcookies) {
      if (subName.length > 0 && subcookies.hasOwnProperty(subName)) {
        subcookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subcookies[subName]))
      }
    }
    if(subcookieParts.length > 0) {
      cookieText+=subcookieParts.join('&')
      if(expires instanceof Date) {
        cookieText +="; expires="+expires.toGMTString()
      }
      if(path) {
        cookieText +="; path=" + path
      }
      if(domain) {
        cookieText +="; domain=" + domain
      }
      if(secure) {
        cookieText +="; secure"
      }
    } else {
        cookieText +="; expires="+(new Date(0)).toGMTString()
    }
    document.cookie = cookieText
  }
  unset(name,subName,path,domian,secure) {
    let subcookies=this.getAll(name)
    if(subcookies){
        delete subcookies[subName]
        this.setAll(name,subcookies,null,path,domian,secure)
    }
  }
  unsetAll(name,path,domian,secure) {
    this.setAll(name,null,new Date(0),path,domian,secure)
  }
}

export default new Cookie();