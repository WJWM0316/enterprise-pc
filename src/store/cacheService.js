/**
 * 管理本地存储
 */

import Cache from 'web-storage-cache';

const lsCache = new Cache;
const ssCache = new Cache({ storage: 'sessionStorage' });

// 所有存储键
const KEYS = {
  token: 'zike',
  userInfo: {
    avatarId: null,
    email: null,
    gender: 1,
    genderDesc: '男',
    id: null,
    mobile: null,
    nickname: null,
    occupation: null,
    realname: null,
    status: null,
    statusDesc: null,
    token: null,
    vkey: null,
    wechat: null,
    avatarInfo: {
      smallUrl: ''
    }
  }
}

const namespace = 'zike';

/* eslint-disable */
// 为存储键增加命名空间
for (const i in KEYS) {
  if (KEYS.hasOwnProperty(i)) {
    KEYS[i] = `${namespace}:${KEYS[i]}`.toUpperCase();
  }
}
/* eslint-disable */

/**
 * 本地缓存构造类
 * @class
 */
class CommonStorage {
  /**
   * 创建一个本地缓存
   * @param  {String} key - 存储键
   * @param  {String} exp - 过期时长，单位秒，默认永久，即不过期
   * @param  {String} type - 类型，决定存储介质，默认 localStorage, 可选 sessionStorage
   */
  constructor(key, exp = null, type = 'localStorage') {
    this.key = key
    this.exp = exp
    this.storage = (type === 'sessionStorage') ? ssCache : lsCache;
  }

  save(value) {
    // 判断是否设置过期选项了
    const options = this.exp ? { exp: this.exp } : null;
    this.storage.set(this.key, value, options);
  }

  load() {
    return this.storage.get(this.key);
  }

}

export function saveAccessToken(token, expiredIn) {
  lsCache.set(KEYS.token, token, { exp: expiredIn })
}

export function getAccessToken() {
  return lsCache.get(KEYS.token)
}

export function removeAccessToken() {
  lsCache.delete(KEYS.token)
  ssCache.delete(KEYS.userInfo)
}

export function saveUserInfo(userInfos, expiredIn) {
  lsCache.set(KEYS.userInfo, userInfos, { exp: expiredIn })
}

export function getUserInfo(userInfos, expiredIn) {
  return lsCache.get(KEYS.userInfo)
}

export const cachedUserInfo = new CommonStorage(KEYS.userInfo, 60 * 60 * 24 * 7 * 1000, 'sessionStorage')
