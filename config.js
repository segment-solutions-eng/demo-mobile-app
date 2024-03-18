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
        bannerColor: "#FF4C00",
        bannerTextColor: "#FFFFFF",
        buttonColor: "#FF4C00",
        modalDetailsBackground: "#EFEFEF"
    },
    resources: [
        {
            category: "Worklife Blog",
            items: [
                { title: "5 Ways to Ease Financial Anxiety", url: "https://get.dailypay.com/worklife/#", description: "Financial anxiety might be more common than you think. One study of over 19,000 adults found that 60% of respondents felt anxious when thinking about their..." },
                { title: "5 Tips for Saving on Pet Care", url: "https://get.dailypay.com/worklife/#", description: "Raising fur babies isn't always cheap. The average pet owner spends $111 each month on their pets, according to one survey. That doesn't include initial..." },
                { title: "Is Going Back to School Worth It?", url: "https://get.dailypay.com/worklife/#", description: "Feeling stuck in your career? If so, you probably aren’t alone. Roughly 55% of workers say they’ll probably look for a new job this year, according..." },
                { title: "7 Ways to Stop Overspending on Food", url: "https://get.dailypay.com/worklife/#", description: "Looking to curb your food budget? We’ve rounded up seven simple ways to prevent overspending on grub." },
            ]
        },
        {
            category: "Upcoming Webinars",
            items: [
                { title: "Navigating Your Financial Journey to a Secure Future", url: "https://dailypay.zoom.us/webinar/register/WN_AjpRcqY1S42wNhgDzZvr4w#/registration", description: "Join us during America Saves Week to discover strategies for building a savings plan. Learn how to automate your savings, and take control of your financial future." },
                { title: "Demystifying Credit: How to Win the Credit Game", url: "https://get.dailypay.com/webinars/", description: "Do you know how to read a credit report or how credit scores are calculated? Join us to learn what you need to know about credit, how you can make it work for you, and how to achieve better credit." },
                { title: "Money Matters: Navigating Financial Success", url: "https://get.dailypay.com/webinars/", description: "April is Financial Literacy Month. Join us to learn budgeting basics, how to build a strong financial foundation, and how to save and build for the future." },
                { title: "Millionaire Mindset: A Path to Financial Abundance", url: "https://get.dailypay.com/webinars/", description: "Join us to unlock the secrets of millionaire living. In this webinar we'll discuss how to develop better spending habits, how to manage expenses, and explore useful tools to aid you on your journey." },
                { title: "Mastering Your Money: A Journey to Financial Wellness", url: "https://get.dailypay.com/webinars/", description: "January is Financial Wellness Month. Join us to discover how DailyPay can aid you in your journey to achieving greater financial wellness." },
            ]
        },
        {
            category: "Other Resources",
            items: [
                { title: "Coursera", url: "https://www.coursera.org/", description: "Coursera offers online courses from top universities." },
                { title: "Udemy", url: "https://www.udemy.com/", description: "An online learning and teaching marketplace with over 130,000 courses." }
            ]
        }
    ]
};
