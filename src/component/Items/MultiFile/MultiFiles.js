import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import Files from 'react-files'
class MultiFiles extends Component {
    constructor (props) {
        super(props)
        this.state = {
            files: [],imagFile:[]
        }
    }


    onFilesChange = (files) => {
        let index; let imagFile=[]


        function getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }


        //
        for (index in files) {

            getBase64(files[index]).then(
                data => {
                    imagFile.push(data)
                }
            );

            // var reader = new FileReader();
            // reader.readAsDataURL(files[index]);
            // reader.onload = function () {
            //     // return reader.result
            //     // console.log(reader.result);
            //
            //     imagFile.push(reader.result)
            //
            // };
            // reader.onerror = function (error) {
            //     console.log('Error: ', error);
            // };


            // let file = files[index];
            // let base=getBase64(file);
            // console.log(base)

        }
        // console.log(imagFile);


        this.setState({
            files,imagFile
        }, () => {
            // console.log(this.state.files)
        });
        this.props.MultiFile(imagFile)
    };

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    };

    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    };
    render() {
        return (

            <div>
                <h1>Example 2 - Gallery</h1>
                <Files
                    ref='files'
                    className='files-dropzone-gallery'
                    onChange={this.onFilesChange}
                    onError={this.onFilesError}
                    accepts={['image/*']}
                    multiple
                    clickable={true}
                >
                    {
                        this.state.files.length > 0
                            ? <div className='files-gallery'>
                                {this.state.files.map((file) =>
                                    <img className='files-gallery-item' src={file.preview.url} key={file.id} />
                                )}
                            </div>
                            : <div>Drop images here</div>
                    }
                </Files>
                <button onClick={this.filesRemoveAll}>Remove All Files</button>
            </div>



        );
    }
}

export default MultiFiles;