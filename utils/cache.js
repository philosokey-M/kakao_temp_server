const cache = new Map();

const setCache = (key, data) => {
    cache.set(key, data);
    // 선택: 5분 뒤 자동 삭제
    setTimeout(() => cache.delete(key), 5 * 60 * 1000);
};

const getCache = (key) => cache.get(key);

module.exports = { setCache, getCache };