import * as Const from "../component/Const";
import axios from "axios";

// export function GetCategories () {
//     let headers = {
//         'Token':`${Const.Token}`,
//         'Id': `${Const.ID}`
//     };
//      axios.get(`${Const.Amin_URL}categories` , {headers:headers}).then(responsive=>
//     {
//         const {Description}= responsive.data;
//         // console.log(Description);
//         let DES=JSON.parse(Description);
//         console.log(DES);
//         if (DES!==undefined) {
//             console.log('aaaaaaaaaaaaaaa')
//             return DES
//         }
//
//         // console.log(this.state.modes);
//
//     }).catch(error=>{console.log(error)
//     return 'false'});
// }

//
// export function GetCategories () {
//
//
//         if (responsive.ok) {
//             const {Description}= responsive.data;
//             // console.log(Description);
//             let DES=JSON.parse(Description);
//             console.log(DES);
//             if (DES!==undefined) {
//                 console.log('aaaaaaaaaaaaaaa')
//                 return DES
//             }
//         }
//
//
//         // console.log(this.state.modes);
//
//
// }


//
// let headers = {
//     'Token':`${Const.Token}`,
//     'Id': `${Const.ID}`
// };
// GetCategories = async () => {
//     let res = await axios.get(`${Const.Amin_URL}categories` , {headers:headers});
//     let { data } = res.data;
//     return data
//     // this.setState({ users: data });
// };