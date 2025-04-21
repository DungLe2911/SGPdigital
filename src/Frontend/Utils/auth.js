const authCheck = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 500);
    });
  };
  
  export { authCheck };
  