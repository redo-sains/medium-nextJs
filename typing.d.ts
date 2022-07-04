export interface Post {
    _id: string | key;
    _createdAt: string;
    title: string;
    description: string;
    author: {
        name: string;
        image: string;
    };
    comments: [Comment];   
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    body: [object];
}

export interface Comment {
    approved: boolean;
    comment: string;
    email: string;
    name: string;
    post: {
        _ref: string;
        _type: string;
    };
    _createdAt: string;
    _id: string | key;
    _rev: string;
    _type: string;
    _updatedAt: string;
}