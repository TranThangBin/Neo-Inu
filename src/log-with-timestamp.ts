export default (...args: any[]) => {
    const date = new Date();
    const options = { timeZone: "Asia/Ho_Chi_Minh" };
    const now = date.toLocaleString("en-US", options);
    console.log(`[${now}]`, ...args);
};
