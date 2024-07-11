export class StorageUtils {
  public static saveData(key: string, value: string) {
    window?.localStorage?.setItem(key, value);
  }

  public static getData<T>(key: string): T | undefined {
    const value = localStorage.getItem(key) as T | undefined;
    return value;
  }

  public static removeData(key: string) {
    localStorage.removeItem(key);
  }
}
