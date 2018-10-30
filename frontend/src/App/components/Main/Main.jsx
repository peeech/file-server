import React from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Dropzone from './Dropzone';
import Files from './Files';
import Modal from '../common/Modal';
import { UPLOAD_FILE } from '../../ducks/data';

const Main = (props) => {
    let { files, ...fileMethods} = props;

        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto highlight">
                            <Modal />
                            <Dropzone {...fileMethods} />
                            <Files files={files} />
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
        files: state.data.files
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
        }
    }
}

// Actual maping of Redux components to React props for "Main" component
export default connect (
    mapStateToProps, 
    mapDispatchToProps
)(Main);