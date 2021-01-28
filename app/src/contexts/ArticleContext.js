import React from 'react';

const ArticleContext = React.createContext({
    article: {
        title: String,
        path: String,
        content: String,
        tags: String
    },
    articleErr: {
        titleErr: String,
        pathErr: String,
        contentErr: String,
        tagsErr: String
    }
});

export default ArticleContext;
