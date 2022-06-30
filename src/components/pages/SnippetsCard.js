import React from 'react';

const SnippetsCard = ({title, addSnippet}) => {
    return (
        <div className="component-snippets-card">
            <div className="title-snippets">{title}</div>
            <img onClick={() => addSnippet} src="/assets/logo/add.svg" alt="add"/>
        </div>
    );
};

export default SnippetsCard;