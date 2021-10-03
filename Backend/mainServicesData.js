export const data = {
    services:

        [
            {
                id: 100,
                title: "Electronics",
                imgLink: "https://source.unsplash.com/random/200x100",
                details: ["Repairing", "Servicing", "Installation"],
                // options: ["Refrigerator", "Fan", "Geyser", "Television"],
                options: [
                    {
                        _id: 10001,
                        item: "Refrigerator",
                        services: [
                            {
                                _id: 1000101,
                                name: "Installation",
                                price: 500,
                                availability: "yes",
                                details: "It is a short description about the work. It is a short description about the work. It is a short description about the work."
                            },
                            {
                                _id: 1000102,
                                name: "Uninstallation",
                                price: 300,
                                availability: "yes",
                                details: "It is a short description about the work. It is a short description about the work. It is a short description about the work."
                            },
                            {
                                _id: 1000103,
                                name: "Repairing",
                                price: 200,
                                details: "It is a short description about the work. It is a short description about the work. It is a short description about the work."
                            },
                        ]
                    },
                    {
                        _id: 10002,
                        item: "Air Conditioner",
                        services: [
                            {
                                _id: 1000201,
                                name: "Installation",
                                price: 500,
                                details: "It is a short description about the work. It is a short description about the work. It is a short description about the work."
                            },
                            {
                                _id: 1000202,
                                name: "Uninstallation",
                                price: 300,
                                details: "It is a short description about the work. It is a short description about the work. It is a short description about the work."
                            },
                            {
                                _id: 1000203,
                                name: "Repairing",
                                price: 200,
                                details: "It is a short description about the work. It is a short description about the work. It is a short description about the work."
                            },
                        ]
                    },
                    {
                        _id: 10003,
                        item: "Fan",
                        services: [
                            {
                                _id: 1000301,
                                name: "Installation",
                                availability: "yes",
                                price: 500,
                                details: "It is a short description about the work. It is a short description about the work. It is a short description about the work."
                            },
                            {
                                _id: 1000302,
                                name: "Uninstallation",
                                availability: "yes",
                                price: 300,
                                details: "It is a short description about the work. It is a short description about the work. It is a short description about the work."
                            },
                            {
                                _id: 1000303,
                                name: "Repairing",
                                availability: "yes",
                                price: 200,
                                details: "It is a short description about the work. It is a short description about the work. It is a short description about the work."
                            },
                        ]
                    },
                    {
                        _id: 10004,
                        item: "LED-LCD TV",
                        services: [
                            {
                                _id: 1000401,
                                name: "Installation",
                                price: 500,
                                availability: "yes",
                                details: "It is a short description about the work. It is a short description about the work. It is a short description about the work."
                            },
                            {
                                _id: 1000402,
                                name: "Uninstallation",
                                price: 300,
                                availability: "no",
                                details: "It is a short description about the work. It is a short description about the work. It is a short description about the work."
                            },
                            {
                                _id: 1000403,
                                name: "Repairing",
                                price: 200,
                                availability: "yes",
                                details: "It is a short description about the work. It is a short description about the work. It is a short description about the work."
                            },
                        ]
                    }
                ]
            },
            {
                _id: 101,
                title: "Plumbing",
                imgLink: "https://source.unsplash.com/random",
                details: ["Repairing", "Servicing", "Installation"],
                options: ["Refrigerator", "Fan", "Geyser", "Television"]
            },
            {
                _id: 102,
                title: "Home Cleaning",
                imgLink: "https://source.unsplash.com/random",
                details: ["Repairing", "Servicing", "Installation"],
                options: ["Refrigerator", "Fan", "Geyser", "Television"]
            },
            {
                _id: 102,
                title: "Security",
                imgLink: "./vault.jpg",
                details: ["Repairing", "Servicing", "Installation"],
                options: ["Refrigerator", "Fan", "Geyser", "Television"]
            }
        ]
}