/* storage.js — camada de persistência local */
const KEY = 'marmitas-v2';

const Storage = {
  save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e) { console.warn('storage save error', e); }
  },
  load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch(e) { return null; }
  },
  clear() { localStorage.removeItem(KEY); }
};
