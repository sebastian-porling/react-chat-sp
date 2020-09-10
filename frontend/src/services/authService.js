import {auth, googleProvider} from '../init-firebase';

const loginWithGoogle = async () => {
    return auth.signInWithPopup(googleProvider);
}

const logout = async () => {
    auth.signOut();
}

const loggedIn = async () => {
    return auth.currentUser ? true : false;
}

const getUserToken = async () => {
    return auth.currentUser.getIdToken(true);
}

const getCurrentUser = async () => {
    return auth.currentUser;
};

export default {loginWithGoogle, logout, loggedIn, getUserToken, getCurrentUser}
