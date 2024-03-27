// products.js

const products = [
    {
        id: "1", // Don't edit the ID Number. Used for dynamic content organization
        basicInformation: {
            title: "Segment Sloth Stuffed Animal",
            subtitle: "$15.99",
            image: "assets/product1.webp",
            actionButtonTitle: "View Product",
            actionButtonTrackName: "Product Viewed" // Custom track name for the action button
        },
        productDetailsCard: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            tags: ["No Fees!"],
            features: ["Feature 1", "Feature 2", "Feature 3"],
            intentButtonLabel: "Add to Cart",
            intentButtonTrackName: "Product Added to Cart" // Custom track name for the intent button
        },
        conversionModal: {
            convertButtonLabel: "Order",
            convertButtonTrackName: "Order Submitted", // Custom track name for the convert button
            confirmationTrackName: "Order Completed" // Custom track name for viewing the confirmation page
        },
        // Additional Properties used for track calls. Not exposed in website UI
        trackProperties: {
            product: "Sloth Stuffed Animal",
            color: "natural",
            plush_level: "Premium",
            seasonalPromo: "Spring2024",
            sku: "10720983",
            property5: "Value 5"
        }
    },
    {
        id: "2", // Don't edit the ID Number. Used for dynamic content organization
        basicInformation: {
            title: "Get a Product Demo",
            subtitle: "",
            image: "assets/product2.png",
            actionButtonTitle: "Request Demo",
            actionButtonTrackName: "Button Clicked" // Custom track name for the action button
        },
        productDetailsCard: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            tags: ["See the value Segment brings to your tech stack!", "Tag 2"],
            features: ["Feature 1", "Feature 2"],
            intentButtonLabel: "Request Demo",
            intentButtonTrackName: "Configured Demo Request" // Custom track name for the intent button
        },
        conversionModal: {
            convertButtonLabel: "Submit Request",
            convertButtonTrackName: "Demo Requested", // Custom track name for the convert button
            confirmationTrackName: "Demo Confirmed" // Custom track name for viewing the confirmation page
        },
        trackProperties: {
            productType: "Segment Demo",
            time: "3:00pm ET",
            notes: "N/A",
            delivery_window: "Instant"
        }
    },
    {
        id: "3", // Don't edit the ID Number. Used for dynamic content organization
        basicInformation: {
            title: "Apply for Platinum Card",
            subtitle: "Segment Platinum",
            image: "assets/product3.webp",
            actionButtonTitle: "Learn More",
            actionButtonTrackName: "Direct Deposit Button Clicked" // Custom track name for the action button
        },
        productDetailsCard: {
            description: "Quis blandit turpis cursus in hac habitasse platea dictumst. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Pulvinar etiam non quam lacus.",
            tags: ["Most Popular", "No Fees!"],
            features: ["Feature 1", "Feature 2", "Feature 3"],
            intentButtonLabel: "Continue",
            intentButtonTrackName: "Direct Deposit Setup Started" // Custom track name for the intent button
        },
        conversionModal: {
            convertButtonLabel: "Confirm",
            convertButtonTrackName: "Direct Deposit Setup Confirmed", // Custom track name for the convert button
            confirmationTrackName: "Direct Deposit Configuration Completed" // Custom track name for viewing the confirmation page
        },
        trackProperties: {
            productType: "Direct Deposit",
            seasonalPromo: "Spring2024",
            property4: "Value 4",
            property5: "Value 5"
        }
    },
    {
        id: "4", // Don't edit the ID Number. Used for dynamic content organization
        basicInformation: {
            title: "Transfer Money",
            subtitle: "No Fees!",
            image: "assets/product4.webp",
            actionButtonTitle: "Learn More",
            actionButtonTrackName: "Transfer Button Clicked" // Custom track name for the action button
        },
        productDetailsCard: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            tags: ["No Fees!", "Most Popular"],
            features: ["Feature 1", "Feature 2", "Feature 3"],
            intentButtonLabel: "Transfer",
            intentButtonTrackName: "Transfigure Configuration Started" // Custom track name for the intent button
        },
        conversionModal: {
            convertButtonLabel: "Begin Transfer",
            convertButtonTrackName: "Transfer Initiated", // Custom track name for the convert button
            confirmationTrackName: "Transfer Completed" // Custom track name for viewing the confirmation page
        },
        trackProperties: {
            productType: "Financial Service",
            transfer_amount: 100,
            fee_applied: false,
            fee_amount: null,
            transfer_method: "Debit Card",
            delivery_window: "1 Business Day"
        }
    }

]
