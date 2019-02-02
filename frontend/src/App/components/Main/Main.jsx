import React from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Dropzone from './Dropzone';
import Files from './Files';
import Modal from '../common/Modal';
import { UPLOAD_FILE } from '../../ducks/data';
import { CHANGE_MODAL, UPDATE_SELECTED } from '../../ducks/ui';

const Main = (props) => {
    let { files, ...fileMethods} = props;

    return (
        <div>
            <Header {...props}/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto highlight">
                        <Modal />
                        <Dropzone {...fileMethods} />
                        <Files {...props} />
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

// Mapping of Redux state to Component's props
const mapStateToProps = ( state ) => {
    return {
        files: state.data.files,
        folders: state.data.folders,
        selected: state.ui.selected,
        location: state.ui.location
    }
};

// Functions dispatching Redux actions for later consumption by middleware and reducers
// Those functions are passed to Component as props with help of connect() below
const mapDispatchToProps = ( dispatch ) => {
    return {
        handleFileUpload: (file) => {
            dispatch({
                type: UPLOAD_FILE,
                payload: file
            });
        },
        handleNewFolder: () => {
            dispatch({
                type: CHANGE_MODAL, 
                payload: {
                    isShowing: true,
                    error: false,
                    text: "This will create a new folder"
                }
            });
        },
        handleEntryClick: (hash) => {
            dispatch({
                type: UPDATE_SELECTED, 
                payload: hash
            });
        },
        handleEntryDblClick: (hash) => {
            dispatch({
                type: CHANGE_MODAL, 
                payload: {
                    isShowing: true,
                    error: false,
                    text: "Acting on hash " + hash
                }
            });
        }
    }
}

// Actual maping of Redux components to React props for "Main" component
export default connect (
    mapStateToProps, 
    mapDispatchToProps
)(Main);