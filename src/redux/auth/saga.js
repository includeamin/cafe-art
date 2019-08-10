
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from '../../helpers/Firebase';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER
} from '../actions';

import {
    loginUserSuccess,
    registerUserSuccess
} from './actions';
import axios from "axios";
import * as Const from "../../component/Const";

// function LoginCustomCafeArt(email, password){
//     console.log(email)
//     console.log(password)
//     let BODY={'UserName ':email,
//         'Password': password,
//     };
//     axios.post(`${Const.Amin_URL}admin/login`,BODY ).then(responsive=>
//     {
//         const {Description}=responsive.data;
//         console.log(Description);
//         return(Description)
//     }).catch(error=>{console.log(error)
//     return error
//     });
//
// }

const loginWithEmailPasswordAsync = async (email, password) =>{
    console.log(email);
    console.log(password);
    let BODY={'UserName':email,
        'Password': password,
    };
    // axios.post(`${Const.Amin_URL}admin/login`,BODY ).then(responsive=>
    // {
    //     const {Description}=responsive.data;
    //     console.log(Description);
    //     return(JSON.parse(Description) )
    // }).catch(error=>{console.log(error)
    //     return error
    // });
    const data = await axios.post(`${Const.Amin_URL}admin/login`,BODY )


    // {code: "auth/user-not-found", message: "There is no user record corresponding to this identifier. The user may have been deleted."}



    //
    // await auth.signInWithEmailAndPassword(email, password)
    // //
    // //
    // // await LoginCustomCafeArt(email, password)
    //     // .then(authUser => authUser)
        .then(function(authUser) {
            let {Description,State}=authUser.data;

            // console.log(authUser.data)
            // console.log(JSON.parse(Description))
            console.log(Description);
            if (State){
                let ma={code: Description.ID, message: Description.Token}
                return ma
            }else{
                let ma={code: 'dasjfhdskjfhdkjs', message: Description}
                return ma
            }

        })
        // .catch(error => error);
        .catch(function(error) {
            console.log(error)
           var errorCode = error.code;
           var errorMessage = error.message;
           console.log(errorCode) ;
           console.log(errorMessage) ;
           if (errorCode === 'auth/wrong-password') {
                 // alert('Wrong password.');
              } else {
                 // alert(errorMessage);
              }
          console.log(error);
         });;

};






// function* loginWithEmailPassword({ payload }) {
//     const { email, password } = payload.user;
//     // console.log(payload.user);
//     const { history } = payload;
//     try {
//         const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
//         console.log(loginUser);
//         if (!loginUser.message) {
//             // localStorage.setItem('user_id', loginUser.user.uid);
//             localStorage.setItem('user_id', loginUser.Id);
//             localStorage.setItem('user_Token', loginUser.Token);
//             // yield put(loginUserSuccess(loginUser));
//             history.push('/');
//         } else {
//             // console.log('login failed :', loginUser.message)
//             console.log('login failed :', loginUser)
//         }
//     } catch (error) {
//         console.log('login error : ', error)
//     }
// }
function setitem(Id,Token) {
    localStorage.setItem('user_id',Id);
    localStorage.setItem('user_Token',Token);
    if (localStorage.getItem('user_Token')) {
        console.log('we can set localstorage ')
        return true
    } else {
        return false
    }
}

async  function loginWithEmailPassword({ payload }) {
    const {email, password} = payload.user;
    const {history} = payload;
    let BODY = {
        'UserName': email,
        'Password': password,
    };
    const data = await axios.post(`${Const.Amin_URL}admin/login`,BODY );
    const Description = JSON.parse(data.data.Description) ;
    const oprator=await setitem(Description.Id,Description.Token);
    console.log( localStorage.getItem('user_id'));
    if (oprator) {
        console.log('we are in ');
        await put(registerUserSuccess(Description.Id));
        history.push('/');
        console.log('after push');
    }else {
        console.log('fuck!!')
    }
    console.log(Description);
}

const registerWithEmailPasswordAsync = async (email, password) =>
    await auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);

function* registerWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;
    try {
        const registerUser = yield call(registerWithEmailPasswordAsync, email, password);
        if (!registerUser.message) {
            localStorage.setItem('user_id', registerUser.user.uid);
            yield put(registerUserSuccess(registerUser));
            history.push('/')
        } else {
            console.log('register failed :', registerUser.message)
        }
    } catch (error) {
        console.log('register error : ', error)
    }
}



const logoutAsync = async (history) => {
    await auth.signOut().then(authUser => authUser).catch(error => error);
    history.push('/')
}

function* logout({payload}) {
    const { history } = payload
    try {
        yield call(logoutAsync,history);
        localStorage.removeItem('user_id');
    } catch (error) {
    }
}



export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}


export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser)
    ]);
}