import React from 'react';
import { getExtension } from '../../hc_api/file_handler';

export default (props) => (
    <div>
        <ul className="file-list-group">
            {Object.keys(props.files).map((k, i) => {
                let myClass = "file-extension";
                myClass += (props.files[k].status === 2) ? ' success' : (props.files[k].status === 0) ? ' error' : '';
                return (
                <li className="file-list-item" key={i}>
                    <div className={myClass}>{getExtension(props.files[k].meta.name.toLowerCase())}</div>
                    <div className="file-name">{props.files[k].meta.name}</div>
                </li>
            )})}
        </ul>
    </div>
)