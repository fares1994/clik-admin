export const account = [
    "email",
    "username",
    // "facebookId",
    // "googleId",
    // "twitterId",
    // "instagramId",
    "gender",
    "dob",
    "name",
    "city",
    "country",
    "personalBio",
    "id",
    // "created_at",
    // "updated_at",
    // "token",
    {
        myLinks: [

            // {
            //     gobalLink: [
            //         "_id",

            //         "type",
            //         "title",
            //         "redirectionType",
            //         "pla    ceholder",
            //         {
            //             image: [
            //                 "_id",
            //                 "type",
            //                 "filename",
            //                 "created_at"
            //             ]
            //         },
            //         "created_at",
            //         "updated_at",
            //         "deleted"
            //     ]
            // },
            "value",
            "show",
        ],

    },
    // {
    //     profileImage: [
    //         "_id",
    //         "type",
    //         "filename",
    //         "created_at"
    //     ]
    // },
    // {
    //     coverImage: [
    //         "_id",
    //         "type",
    //         "filename",
    //         "created_at"
    //     ]
    // },
    // {
    //     title: [
    //         "_id",
    //         "title",
    //         "category",
    //         "updated_at",
    //         "deleted",
    //     ]
    // },
    // {
    //     customLinks: [
    //         "id",
    //         "title",
    //         // {
    //         //     image: [
    //         //         "_id",
    //         //         "type",
    //         //         "filename",
    //         //         "created_at"
    //         //     ]
    //         // },
    //         "value",
    //         "show",
    //     ]
    // },
    // {
    //     direct: [
    //         "isOn",
    //         "linkId"
    //     ]
    // }
]

export const order = [
    "_id",
    "name",
    "email",
    "location",
    "phonenumber",
    // "created_at",
    "updated_at",
    "deleted",
    "driver_name",
    "order_status",
    {
        products: [
            {
                product: [
                    "_id",
                    "name",
                    {
                        choices: [
                            // {
                            //     image: [
                            //         "_id",
                            //         "type",
                            //         "filename",
                            //         "created_at"
                            //     ],
                            // },
                            "colorsHex",
                        ],
                    },
                    "price",
                    "description",
                    "created_at",
                    "updated_at",
                    "deleted",
                ],
            },
            "quantity",
            "color"
        ]
    }
]


export const products = [
    "_id",
    "name",
    "price",
    "description",
    "created_at",
    "updated_at",
    "deleted",
    {
        choices: [
            // {
            //     image: [
            //         "_id",
            //         "type",
            //         "filename",
            //         "created_at"
            //     ],
            // },
            "colorsHex",
        ]
    }
]


export const admins = [
    "id",
    "name",
    "email",
    "username",
    "role",
]