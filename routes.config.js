const routes = [
    {
        path: '/index', name: 'index', component: "Home"
    },
    {
        path: '/about', name: 'about', component: "About",
        children: [
            {
                name: 'about-1',
                children: [
                    {
                        "name": "inner-about-1"
                    },
                    {
                        "name": "inner-about-1"
                    },
                ]
            },
            {
                name: 'about-2'
            }
        ]
    },
]

// it must be export
exports.routes = routes