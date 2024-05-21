export enum StorageKey {
  CartCount = 'cartCount',
  OrderData = 'orderData',
  PayOrderData = 'payOrderData',
  RefreshToken = 'refreshToken',
  LoginToken = 'loginToken',
}

class WebStorage {
  storage = localStorage;

  getItem(key: StorageKey) {
    return this.storage.getItem(key);
  }

  logout() {
    this.storage.removeItem(StorageKey.RefreshToken);
    this.storage.removeItem(StorageKey.LoginToken);
  }
}

export const getItem = (key: StorageKey) => {
  localStorage.getItem(key);
};

export const logout = () => {
  localStorage.removeItem(StorageKey.RefreshToken);
  localStorage.removeItem(StorageKey.LoginToken);
};

export default new WebStorage();
