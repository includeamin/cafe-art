import React, {Component} from 'react';
import LiShowSubCat from "./LiShowSubCat";

class LiShowCategoriesAndItems extends Component {
    render() {
        let {categories}=this.props;

        return (
            <div className='d-flex  flex-column'>
                <div dir='rtl' >
                    <div>
                        <p className='float-right fontFamimily13vw text-bold'>- {categories.title}</p>
                    </div>
                    <div className='clearfix'> </div>
                    <div>
                        <div className='d-flex flex-column '>
                            {categories.sub?categories.sub.map((todo ,index)=><LiShowSubCat key={index} todo={todo}/>):""}
                        </div>
                    </div>



                </div>

            </div>
        );
    }
}

export default LiShowCategoriesAndItems;