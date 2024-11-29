import Dexie from 'dexie'

export const useStorage = () => {
  const storage = new Dexie('SignalIntegrity')
  // storage.version(1)
}
