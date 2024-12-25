type ValidKeys = "order_created" | "order_detail" | "order_created_concept";

export const useLocalStorage = (key: ValidKeys) => {
  if (typeof localStorage !== "undefined") {
    const setItem = (value: unknown) => {
      localStorage.setItem(key, JSON.stringify(value));
    };

    const getItem = () => {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    };

    const removeItem = () => {
      localStorage.removeItem(key);
    };

    return { setItem, getItem, removeItem };
  }
  return {
    setItem: () => {
      console.warn("localStorage no available");
    },
    getItem: () => {
      console.warn("localStorage no available");
      return null;
    },
    removeItem: () => {
      console.warn("localStorage no available");
    },
  };
};
