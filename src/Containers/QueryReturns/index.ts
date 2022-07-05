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