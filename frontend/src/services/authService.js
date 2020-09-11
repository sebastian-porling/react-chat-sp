import { auth, database, googleProvider } from "../config/init-firebase";

/**
 * Login via google window popup
 */
const loginWithGoogle = async () => {
    return auth.signInWithPopup(googleProvider).then(writeAdditionalUserData);
};

/**
 * Logout from firebase
 */
const logout = async () => {
    auth.signOut();
};

/**
 * Check if we are logged in
 */
const loggedIn = async () => {
    return auth.currentUser ? true : false;
};

/**
 * receive the jwt token of the current user from firebase
 */
const getUserToken = async () => {
    return auth.currentUser.getIdToken(true);
};

/**
 * receive the current logged in used
 */
const getCurrentUser = async () => {
    return auth.currentUser;
};

/**
 * Add information about the color for the user
 * When logged in for the first time
 */
const writeAdditionalUserData = async () => {
    const user = await getCurrentUser();
    const ref = database.ref(`users/${user.uid}`);
    ref.once("value", (snapshot) => {
        if (!snapshot.exists()) {
            const color = { color: "white" };
            database.ref(`users/${user.uid}`).set(color);
        }
    });
};

/**
 * Receive the user color and send it to callback
 * @param {Function} cb Callback
 */
const getUserColor = async (cb) => {
    const user = await getCurrentUser();
    const ref = database.ref(`users/${user.uid}`);
    ref.once("value", (snapshot) => {
        if (snapshot.exists()) {
            cb(snapshot.val());
        } else {
            cb({ color: "white" });
        }
    });
};

/**
 * Change the current users color
 * @param {String} color One of the colors in colors.js
 */
const changeUserColor = async (color) => {
    const user = await getCurrentUser();
    database.ref(`/users/${user.uid}/color/`).set(color);
};

export default {
    loginWithGoogle,
    logout,
    loggedIn,
    getUserToken,
    getCurrentUser,
    changeUserColor,
    getUserColor,
};
