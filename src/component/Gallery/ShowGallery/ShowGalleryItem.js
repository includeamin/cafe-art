import React, {Component} from 'react';
import * as Const from "../../Const";
import axios from "axios";
import RowShowCategories from "../../Categories/sub/RowShowCategories";
import breakfast from "../../new/cookie-dough-milkshake.jpg";
// import Row from "reactstrap/src/Row";
import LiShowGallery from "./LiShowGallery";


class ShowGalleryItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:'',Description:''
        }
    }

    componentWillReceiveProps(props){
        let {ID}=props;
        console.log(ID)
        this.setState({
            id:ID
        });
        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };

        axios.get(`${Const.Amin_URL}item/gallery/${ID}` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            console.log(Description);
            this.setState({
                Description:JSON.parse(Description)
            })
            // let categories=JSON.parse(Description);
            // let index;
            //
            //
            // let  option=[];
            // categories.map(item => {
            //     option.push({name: item.Title})
            // });
            // console.log(option);
            //
            // let categoriesList = {};
            //
            // for (index in categories){
            //     let id =categories[index].Title;
            //     let Value =categories[index]._id;
            //     // dict[id] = Value;
            //     categoriesList[Value] = id;
            // }
            //
            // this.setState({
            //     categoriesList,categories,option
            // })
            // console.log(categoriesList);

        }).catch(error=>{console.log(error)});
        // console.log(this.state.categories)
    }
    render() {
        let{Description,id}=this.state;
        console.log(Description)
        return (
            <div className=' ' >
                {Description?Description.map((todo ,index)=><LiShowGallery id={todo.Id} key={index} index={index} src={todo.ImageUrl}  itemId={id} classname=' col-sm-12 col-md-4 col-lg-3 mt-3 float-left mr-2'/>  ):""}

            </div>
        );
    }
}

export default ShowGalleryItem;