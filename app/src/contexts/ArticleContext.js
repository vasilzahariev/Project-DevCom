import React from 'react';

const ArticleContext = React.createContext({
    article: {
        title: String,
        path: String,
        coverImageUrl: String,
        content: String,
        tags: String
    },
    articleErr: {
        titleErr: String,
        pathErr: String,
        coverImageUrlErr: String,
        contentErr: String,
        tagsErr: String
    }
});

export default ArticleContext;
