import React from 'react';
import { getExtension, getImageAsUrl, canPreview } from '../../hc_api/file_handler';

const printFile = (file) => {
    // Print nice picture if file is an image
    if (canPreview(file.meta.type)) {
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

export default (props) => (
    <div>
        <ul className="file-list-group">
            {Object.keys(props.files).map((k, i) => {
                return (
                <li className="file-list-item" key={i}>
                    {printFile(props.files[k])}
                    <div className="file-name" title={props.files[k].meta.name}>{props.files[k].meta.name}</div>
                </li>
            )})}
        </ul>
    </div>
)