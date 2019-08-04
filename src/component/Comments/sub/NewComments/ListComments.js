import React, {Component, Fragment} from 'react';
import {
    Collapse,
    Button,
    Row,
    Card,
    CardSubtitle,
    CardBody,
    CardTitle
} from "reactstrap";
import CommentsRow from "./sub/CommentsRow";

class ListComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            accordion: [true],Description:null
        };
    }
    // componentDidMount(){
    componentWillReceiveProps(props){
        let {Description}=props;
        // console.log(Description);
        let i;let list=[];
        // console.log(Description.length);
        for(i in Description){
            console.log(Description[i]);
            list.push(false)
        }
        this.setState({
            Description:Description
        });


        // console.log(list);


        this.setState(state => {
            const accordion = state.accordion.concat(list);
            return {
                accordion
            };
        },()=>{
            console.log(this.state.accordion)
        });
    }

    toggleAccordion = tab => {
        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => (tab === index ? !x : false));
        this.setState({
            accordion: state
        });
    };

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    };
    render() {
        let{Description,accordion}=this.state
        return (
            <div>
                <Fragment>
                    {Description?Description.map((todo ,index)=><CommentsRow key={index} accordion={accordion[index]} toggleAccordion={this.toggleAccordion.bind(this)} index={index}  input={todo} Name={this.props.Name}/>):""}



                    {/*<div className="border">*/}
                        {/*<Button*/}
                            {/*block*/}
                            {/*color="link"*/}
                            {/*className="text-left"*/}
                            {/*onClick={() => this.toggleAccordion(1)}*/}
                            {/*aria-expanded={this.state.accordion[1]}*/}
                        {/*>*/}
                            {/*Collapsible Group Item #2*/}
                        {/*</Button>*/}
                        {/*<Collapse isOpen={this.state.accordion[1]}>*/}
                            {/*<div className="p-4">*/}
                                {/*2. Anim pariatur cliche reprehenderit, enim eiusmod high*/}
                                {/*life accusamus terry richardson ad squid. 3 wolf moon*/}
                                {/*officia aute, non cupidatat skateboard dolor brunch.*/}
                                {/*Food truck quinoa nesciunt laborum eiusmod. Brunch 3*/}
                                {/*wolf moon tempor, sunt aliqua put a bird on it squid*/}
                                {/*single-origin coffee nulla assumenda shoreditch et.*/}
                                {/*Nihil anim keffiyeh helvetica, craft beer labore wes*/}
                                {/*anderson cred nesciunt sapiente ea proident. Ad vegan*/}
                                {/*excepteur butcher vice lomo. Leggings occaecat craft*/}
                                {/*beer farm-to-table, raw denim aesthetic synth nesciunt*/}
                                {/*you probably haven't heard of them accusamus labore*/}
                                {/*sustainable VHS.*/}
                            {/*</div>*/}
                        {/*</Collapse>*/}
                    {/*</div>*/}


                    {/*<div className="border">*/}
                        {/*<Button*/}
                            {/*block*/}
                            {/*color="link"*/}
                            {/*className="text-left"*/}
                            {/*onClick={() => this.toggleAccordion(2)}*/}
                            {/*aria-expanded={this.state.accordion[2]}*/}
                        {/*>*/}
                            {/*Collapsible Group Item #3*/}
                        {/*</Button>*/}
                        {/*<Collapse isOpen={this.state.accordion[2]}>*/}
                            {/*<div className="p-4">*/}
                                {/*3. Anim pariatur cliche reprehenderit, enim eiusmod high*/}
                                {/*life accusamus terry richardson ad squid. 3 wolf moon*/}
                                {/*officia aute, non cupidatat skateboard dolor brunch.*/}
                                {/*Food truck quinoa nesciunt laborum eiusmod. Brunch 3*/}
                                {/*wolf moon tempor, sunt aliqua put a bird on it squid*/}
                                {/*single-origin coffee nulla assumenda shoreditch et.*/}
                                {/*Nihil anim keffiyeh helvetica, craft beer labore wes*/}
                                {/*anderson cred nesciunt sapiente ea proident. Ad vegan*/}
                                {/*excepteur butcher vice lomo. Leggings occaecat craft*/}
                                {/*beer farm-to-table, raw denim aesthetic synth nesciunt*/}
                                {/*you probably haven't heard of them accusamus labore*/}
                                {/*sustainable VHS.*/}
                            {/*</div>*/}
                        {/*</Collapse>*/}
                    {/*</div>*/}

                </Fragment>
            </div>
        );
    }
}

export default ListComments;