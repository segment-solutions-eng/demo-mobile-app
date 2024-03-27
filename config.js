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
        headerColor: "#121C2D",
        footerColor: "#121C2D",
        bannerColor: "#6ADDB2",
        bannerTextColor: "#FFFFFF",
        buttonColor: "#0263E0",
        modalDetailsBackground: "#F5F6FC"
    },
    resources: [
        {
            category: "Segment For...",
            items: [
                { title: "Marketing", url: "https://segment.com/marketing/", description: "Personalized and real-time customer experiences" },
                { title: "Product", url: "https://segment.com/product/", description: "Data-driven decision making teams" },
                { title: "Engineering", url: "https://segment.com/engineering/", description: "The single platform to collect and manage your data" },
            ]
        },
        {
            category: "Products",
            items: [
                { title: "Connections", url: "https://segment.com/product/connections/", description: "Integrate web and mobile app data with a single API" },
                { title: "Protocols", url: "https://segment.com/product/protocols/", description: "Protect the integrity of your data" },
                { title: "Unify", url: "https://segment.com/product/unify/", description: "Get a complete view of your customer" },
                { title: "Engage", url: "https://segment.com/product/engage/", description: "Design personalized omnichannel campaigns" },
            ]
        },
        {
            category: "Features",
            items: [
                { title: "Journeys", url: "https://segment.com/product/twilio-engage/journeys/", description: "Design cross-channel engagement" },
                { title: "Functions", url: "https://segment.com/product/connections/functions/", description: "Customize your customer data pipeline" },
                { title: "Warehouses", url: "https://segment.com/product/warehouses/", description: "Easily transform & load customer data" },
                { title: "Privacy", url: "https://segment.com/product/privacy-portal/", description: "Protect users' privacy" },
                { title: "Profiles Sync", url: "https://segment.com/product/profiles-sync/", description: "Sync customer profiles to the warehouse" },
                { title: "Reverse ETL", url: "https://segment.com/product/reverse-etl/", description: "Move warehouse data to your applications" },
                { title: "Developer Toolkit", url: "https://segment.com/product/developer-toolkit/", description: "Build on Twilio Segment" },
            ]
        }
    ]
};
