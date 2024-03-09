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
        buttonColor: "#197049",
        modalDetailsBackground: "#EFEFEF"
    },
    resources: [
        {
            category: "Development Tools",
            items: [
                { title: "Visual Studio Code", url: "https://code.visualstudio.com/", description: "Free. Built on open source. Runs everywhere." },
                { title: "GitHub", url: "https://github.com/", description: "GitHub is where over 65 million developers shape the future of software, together." }
            ]
        },
        {
            category: "Design Resources",
            items: [
                { title: "Figma", url: "https://www.figma.com/", description: "Figma helps teams create, test, and ship better designs from start to finish." },
                { title: "Adobe XD", url: "https://www.adobe.com/products/xd.html", description: "XD is your UI/UX design solution for designing websites and mobile apps." }
            ]
        },
        {
            category: "Educational Platforms",
            items: [
                { title: "Coursera", url: "https://www.coursera.org/", description: "Coursera offers online courses from top universities." },
                { title: "Udemy", url: "https://www.udemy.com/", description: "An online learning and teaching marketplace with over 130,000 courses." }
            ]
        }
    ]
};
