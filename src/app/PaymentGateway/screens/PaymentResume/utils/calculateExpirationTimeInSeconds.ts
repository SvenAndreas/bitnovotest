export const calculateExpirationTimeInSeconds = (expirationTime: string) => {
    const expirationDate = new Date(expirationTime);
    const now = new Date();
    const timeDifference = expirationDate.getTime() - now.getTime();
    return Math.floor(timeDifference / 1000);
};