import React from 'react';
import Dropzone from 'react-dropzone';
import { fromEvent } from 'file-selector';


class FolderDropzone extends React.Component {
    onDrop(files) {
        // Handle upload of each file in a separate action
        // because this can be sh*t loads of work to handle
        // one big file upload
        for (let i = 0; i< files.length; i++) 
            this.props.handleFileUpload(files[i]);
    }

    render() {
        return (
            <div className="dropzone">
                <Dropzone
                    className="dropzone-bkgd"
                    activeClassName="active"
                    getDataTransferItems={evt => fromEvent(evt)}
                    onDrop={this.onDrop.bind(this)}
                >
                    <div className="dropzone-text">Drop files and folders here.</div>
                </Dropzone>
            </div>
        )
    }
}

export default FolderDropzone;