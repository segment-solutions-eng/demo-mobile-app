// config.js

const config = {
    header: {
        logo: "assets/logo.png",
        bannerText: "Welcome to our mobile app!"
    },
    footer: {
        navLinks: [
            {
                label: "Home",
                url: "#home",
                icon: "fas fa-home"
            },
            {
                label: "Catalog",
                url: "#catalog",
                icon: "fas fa-th-large"
            },
            {
                label: "Resources",
                url: "#resources",
                icon: "fas fa-book"
            },
            {
                label: "Profile",
                url: "#profile",
                icon: "fas fa-user"
            }
        ]
    },
    colors: {
        headerColor: "#000000",
        footerColor: "#000000",
        bannerColor: "#197049",
        bannerTextColor: "#FFFFFF",
        buttonColor: "#197049"
    },
    resources: [
        { title: "Resource 1", url: "https://example.com/resource1", description: "Description of Resource 1" },
        { title: "Resource 2", url: "https://example.com/resource2", description: "Description of Resource 2" },
        { title: "Resource 3", url: "https://example.com/resource2", description: "Description of Resource 3" },
        { title: "Resource 4", url: "https://example.com/resource2", description: "Description of Resource 4" },
        { title: "Resource 5", url: "https://example.com/resource2", description: "Description of Resource 5" }
    ]
};
