export const data = {
    services:

        [
            {
                id: 1,
                title: "Electronics",
                imgLink: "https://source.unsplash.com/random/200x100",
                details: ["Repairing", "Servicing", "Installation"],
                // options: ["Refrigerator", "Fan", "Geyser", "Television"],
                options: [
                    {
                        item: "Refrigerator",
                        services: [
                            {
                                name: "Installation",
                                price: 500
                            },
                            {
                                name: "Uninstallation",
                                price: 300
                            },
                            {
                                name: "Repairing",
                                price: 200
                            },
                        ]
                    },
                    {
                        item: "Air Conditioner",
                        services: [
                            {
                                name: "Installation",
                                price: 500
                            },
                            {
                                name: "Uninstallation",
                                price: 300
                            },
                            {
                                name: "Repairing",
                                price: 200
                            },
                        ]
                    },
                    {
                        item: "Fan",
                        services: [
                            {
                                name: "Installation",
                                price: 500
                            },
                            {
                                name: "Uninstallation",
                                price: 300
                            },
                            {
                                name: "Repairing",
                                price: 200
                            },
                        ]
                    },
                    {
                        item: "LED-LCD TV",
                        services: [
                            {
                                name: "Installation",
                                price: 500
                            },
                            {
                                name: "Uninstallation",
                                price: 300
                            },
                            {
                                name: "Repairing",
                                price: 200
                            },
                        ]
                    }
                ]
            },
            {
                id: 1,
                title: "Plumbing",
                imgLink: "https://source.unsplash.com/random",
                details: ["Repairing", "Servicing", "Installation"],
                options: ["Refrigerator", "Fan", "Geyser", "Television"]
            },
            {
                id: 1,
                title: "Home Cleaning",
                imgLink: "https://source.unsplash.com/random",
                details: ["Repairing", "Servicing", "Installation"],
                options: ["Refrigerator", "Fan", "Geyser", "Television"]
            },
            {
                id: 1,
                title: "Security",
                imgLink: "./vault.jpg",
                details: ["Repairing", "Servicing", "Installation"],
                options: ["Refrigerator", "Fan", "Geyser", "Television"]
            }
        ]
}