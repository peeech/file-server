import React from 'react';

export default (props) => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a className="navbar-brand" href="https://github.com/HoloDen/mutual-rating">hcfs proto</a>
                <div className="navbar-path">{props.location}</div>
                <div className="navbar-buttons">
                    <button type="button" className="btn btn-secondary float-right" onClick={props.handleNewFolder}>New folder</button>
                </div>
            </div>
        </nav>
    );
}