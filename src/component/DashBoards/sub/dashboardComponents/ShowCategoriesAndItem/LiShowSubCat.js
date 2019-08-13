import React, {Component} from 'react';
import LiShowCategoriesAndItems from "./LiShowCategoriesAndItems";

class LiShowSubCat extends Component {

    render() {
        let{todo}=this.props;
        console.log(todo);
        return (
                <p className='catsub d-flex  mr-5 fontFamimily11em text-bold' >{todo}</p>
        );
    }
}

export default LiShowSubCat;