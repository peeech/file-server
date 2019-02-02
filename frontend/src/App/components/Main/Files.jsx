import React from 'react';
import { getExtension, getImageAsUrl, canPreview } from '../../hc_api/file_handler';

const printFile = (file) => {
    // Print nice picture if file is an image
    if (canPreview(file.preview && file.meta.type)) {
        return (
            <div className="file-preview"><img alt="loading..." src={getImageAsUrl(file)}/></div>
        )
    }

    let myClass = "file-extension";
    myClass += (file.status === 2) ? ' success' : (file.status === 0) ? ' error' : '';
    return (
        <div className={myClass}>{getExtension(file.meta.name.toLowerCase())}</div>
    )
}

const isSelectedClass = (hash, selectedHash) => {
    return (selectedHash === hash) ? "file-list-item selected" : "file-list-item";
}

export default (props) => (
    <div>
        <ul className="file-list-group">
            {Object.keys(props.folders).map((k, i) => {
                let el = props.folders[k];
                return (
                <li 
                    className={isSelectedClass(el.hash, props.selected)} 
                    key={i} 
                    onClick={props.handleEntryClick.bind(this, el.hash)}
                    onDoubleClick={props.handleEntryDblClick.bind(this, el.hash)}
                    >
                    {printFile(el)}
                    <div className="file-name" title={el.meta.name}>{el.meta.name}</div>
                </li>
            )})}

            {Object.keys(props.files).map((k, i) => {
                let el = props.files[k];
                return (
                <li 
                    className={isSelectedClass(el.hash, props.selected)} 
                    key={i} 
                    onClick={props.handleEntryClick.bind(this, el.hash)}
                    onDoubleClick={props.handleEntryDblClick.bind(this, el.hash)}
                    >
                    {printFile(el)}
                    <div className="file-name" title={el.meta.name}>{el.meta.name}</div>
                </li>
            )})}
        </ul>
    </div>
)