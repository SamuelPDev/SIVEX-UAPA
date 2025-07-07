import React, { useEffect, useState } from "react";

const Navdata = () => {
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isEcommerce, setIsEcommerce] = useState(false);
    const [isLearning, setIsLearning] = useState(false);
    const [isCourses, setIsCourses] = useState(false);
    const [isStudents, setIsStudents] = useState(false);
    const [isInstructors, setIsInstructors] = useState(false);
    const [isSupportTicket, setIsSupportTicket] = useState(false);
    const [isRealEstate, setIsRealEstate] = useState(false);
    const [isAuthentication, setIsAuthentication] = useState(false);
    const [isPages, setIsPages] = useState(false);
    const [isagent, setIsAgent] = useState(false);
    const [isagencies, setIsAgencies] = useState(false);

    // Components
    const [isBootstrapUi, setIsBootstrapUi] = useState(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState(false);
    const [isCustomUi, setIsCustomUi] = useState(false);
    const [isWidgets, setIsWidgets] = useState(false);
    const [isForms, setIsForms] = useState(false);
    const [isTables, setIsTables] = useState(false);
    const [isCharts, setIsCharts] = useState(false);
    const [isIcons, setIsIcons] = useState(false);
    const [isMaps, setIsMaps] = useState(false);

    const [isOrder, setIsOrder] = useState(false);
    const [isInvoice, setIsInvoice] = useState(false);
    const [isShipping, setIsShipping] = useState(false);
    const [isLocalization, setIsLocalization] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isMultiLevel, setIsMultiLevel] = useState(false);

    // Authentication
    const [isError, setIsError] = useState(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState(false);
    const [isLevel2, setIsLevel2] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e: any) {
        if (e && e.target && e.target.getAttribute("sub-items")) {
            const ul: any = document.getElementById("two-column-menu");
            const iconItems: any = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id: any = item.getAttribute("sub-items");
                var menusId = document.getElementById(id);
                if (menusId){
                    (menusId.parentElement as HTMLElement).classList.remove("show");
                }
            });
            e.target.classList.add("active");
        }
    }
    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');

        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Ecommerce') {
            setIsEcommerce(false);
        }
        if (iscurrentState !== 'Learning') {
            setIsLearning(false);
        }
        if (iscurrentState !== 'Invoice') {
            setIsInvoice(false);
        }
        if (iscurrentState !== 'Support Ticket') {
            setIsSupportTicket(false);
        }
        if (iscurrentState !== 'Real Estate') {
            setIsRealEstate(false);
        }
        if (iscurrentState !== 'Authentication') {
            setIsAuthentication(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'Bootstrap UI') {
            setIsBootstrapUi(false);
        }
        if (iscurrentState !== 'AdvanceUi') {
            setIsAdvanceUi(false);
        }
        if (iscurrentState !== 'Custom UI') {
            setIsCustomUi(false);
        }
        if (iscurrentState !== 'Widgets') {
            setIsWidgets(false);
        }
        if (iscurrentState !== 'Forms') {
            setIsForms(false);
        }
        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Charts') {
            setIsCharts(false);
        }
        if (iscurrentState !== 'Icons') {
            setIsIcons(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }

        if (iscurrentState !== 'Orders') {
            setIsOrder(false);
        }
        // if (iscurrentState !== 'Sellers') {
        //     setIsSellers(false);
        // }
        if (iscurrentState !== 'Shipping') {
            setIsShipping(false);
        }
        if (iscurrentState !== 'Localization') {
            setIsLocalization(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
    }, [
        iscurrentState,
        isDashboard,
        isLearning,
        isRealEstate,
        isEcommerce,
        isSupportTicket,
        isOrder,
        isInvoice,
        isShipping,
        isLocalization,
        isAuth,
        isMultiLevel,
        isAuthentication,
        isPages,
        isBootstrapUi,
        isAdvanceUi,
        isWidgets,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isMaps
    ]);

    const menuItems: any = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboards",
            icon: "ph-gauge",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
            stateVariables: isDashboard,
            subItems: [
                {
                    id: "analytics",
                    label: "Analytics",
                    link: "#",
                    parentId: "dashboard",
                },
                {
                    id: "crm",
                    label: "CRM",
                    link: "#",
                    parentId: "dashboard",
                },
                {
                    id: "ecommerce",
                    label: "Ecommerce",
                    link: "#",
                    parentId: "dashboard",
                },
                {
                    id: "learning",
                    label: "Learning",
                    link: "#",
                    parentId: "dashboard",
                },
                {
                    id: "real-estate",
                    label: "Real Estate",
                    link: "#",
                    parentId: "dashboard",
                },
            ],
        },
        {
            label: "Apps",
            isHeader: true,
        },
        {
            id: "apps-calendar",
            label: "Calendar",
            icon: "ph-calendar",
            link: "#",
        },
        {
            id: "apps-chat",
            label: "Chat",
            icon: "ph-chats",
            link: "#",
        },
        {
            id: "apps-email",
            label: "Email",
            icon: "ph-envelope",
            link: "#",
        },
        {
            id: "ecommerce",
            label: "Ecommerce",
            icon: "ph-storefront",
            link: "#",
            click: function (e: any) {
                e.preventDefault();
                setIsEcommerce(!isEcommerce);
                setIscurrentState('Ecommerce');
                updateIconSidebar(e);
            },
            stateVariables: isEcommerce,
            subItems: [
                { id: 1, label: "Products", link: "#", parentId: "ecommerce" },
                { id: 2, label: "Product Grid", link: "#", parentId: "ecommerce" },
                { id: 2, label: "Product Details", link: "#", parentId: "ecommerce" },
                { id: 3, label: "Create Product", link: "#", parentId: "ecommerce" },
                { id: 4, label: "Orders", link: "#", parentId: "ecommerce" },
                { id: 5, label: "Order Overview", link: "#", parentId: "ecommerce" },
                { id: 6, label: "Customers", link: "#", parentId: "ecommerce" },
                { id: 7, label: "Shopping Cart", link: "#", parentId: "ecommerce" },
                { id: 8, label: "Checkout", link: "#", parentId: "ecommerce" },
                { id: 9, label: "Sellers", link: "#", parentId: "ecommerce" },
                { id: 10, label: "Seller Overview", link: "#", parentId: "ecommerce" },
            ],
        },
        {
            id: "apps-file-manager",
            label: "File Manager",
            icon: "ph-folder-open",
            link: "#",
        },
        {
            id: "learning",
            label: "Learning",
            icon: "ph-graduation-cap",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsLearning(!isLearning);
                setIscurrentState('Learning');
                updateIconSidebar(e);
            },
            stateVariables: isLearning,
            subItems: [
                {
                    id: "courses",
                    label: "Courses",
                    link: "/#",
                    parentId: "learning",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsCourses(!isCourses);
                    },
                    stateVariables: isCourses,
                    subItems: [
                        {
                            id: 1,
                            label: "List View",
                            link: "#",
                            parentId: "learning"
                        },
                        {
                            id: 2,
                            label: "Grid View",
                            link: "#",
                            parentId: "learning"
                        },
                        {
                            id: 3,
                            label: "Category",
                            link: "#",
                            parentId: "learning"
                        },
                        {
                            id: 4,
                            label: "Overview",
                            link: "#",
                            parentId: "learning"
                        },
                        {
                            id: 5,
                            label: "Create Course",
                            link: "#",
                            parentId: "learning"
                        },
                    ]
                },
                {
                    id: "students",
                    label: "Students",
                    link: "/#",
                    parentId: "learning",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsStudents(!isStudents);
                    },
                    stateVariables: isStudents,
                    subItems: [
                        {
                            id: 1,
                            label: "My Subscriptions",
                            link: "#",
                            parentId: "learning"
                        },
                        {
                            id: 2,
                            label: "My Courses",
                            link: "#",
                            parentId: "learning"
                        },
                    ]
                },
                {
                    id: "instructors",
                    label: "Instructors",
                    link: "/#",
                    parentId: "learning",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsInstructors(!isInstructors);
                    },
                    stateVariables: isInstructors,
                    subItems: [
                        {
                            id: 1,
                            label: "List View",
                            link: "#",
                            parentId: "learning"
                        },
                        {
                            id: 2,
                            label: "Grid View",
                            link: "#",
                            parentId: "learning"
                        },
                        {
                            id: 3,
                            label: "Overview",
                            link: "#",
                            parentId: "learning"
                        },
                        {
                            id: 4,
                            label: "Create Instructors",
                            link: "#",
                            parentId: "learning"
                        },
                    ]
                },
            ],
        },
        {
            id: "invoice",
            label: "Invoice",
            icon: "ph-file-text",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsInvoice(!isInvoice);
                setIscurrentState('Invoice');
                updateIconSidebar(e);
            },
            stateVariables: isInvoice,
            subItems: [
                {
                    id: "listview",
                    label: "List View",
                    link: "#",
                    parentId: "invoice",
                },
                {
                    id: "overview",
                    label: "Overview",
                    link: "#",
                    parentId: "invoice",
                },
                {
                    id: "createinvoice",
                    label: "Create Invoice",
                    link: "#",
                    parentId: "invoice",
                },
            ],
        },
        {
            id: "support-ticket",
            label: "Support Ticket",
            icon: "ph-ticket",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsSupportTicket(!isSupportTicket);
                setIscurrentState('Support Ticket');
                updateIconSidebar(e);
            },
            stateVariables: isSupportTicket,
            subItems: [
                {
                    id: "listview",
                    label: "List View",
                    link: "#",
                    parentId: "support-ticket",
                },
                {
                    id: "overview",
                    label: "Overview",
                    link: "#",
                    parentId: "support-ticket",
                },
            ],
        },
        {
            id: "real-estate",
            label: "Real Estate",
            icon: "ph-buildings",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsRealEstate(!isRealEstate);
                setIscurrentState('Real Estate');
                updateIconSidebar(e);
            },
            stateVariables: isRealEstate,
            subItems: [
                {
                    id: "sign in",
                    label: "Listing Grid",
                    link: "#",
                    parentId: "real-estate",
                },
                {
                    id: "listinglist",
                    label: "Listing List",
                    link: "#",
                    parentId: "real-estate",
                },
                {
                    id: "listingmap",
                    label: "Listing Map",
                    link: "#",
                    parentId: "real-estate",
                },
                {
                    id: "property-overview",
                    label: "Property Overview",
                    link: "#",
                    parentId: "real-estate",
                },
                {
                    id: "agent",
                    label: "Agent",
                    link: "/#",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsAgent(!isagent);
                    },
                    stateVariables: isagent,
                    subItems: [
                        { id: 1, label: "List View", link: "#" },
                        { id: 2, label: "Grid View", link: "#" },
                        { id: 3, label: "Overview", link: "#" },
                    ]
                },
                {
                    id: "agencies",
                    label: "Agencies",
                    link: "/#",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsAgencies(!isagencies);
                    },
                    stateVariables: isagencies,
                    subItems: [
                        { id: 1, label: "List View", link: "#" },
                        { id: 3, label: "Overview", link: "#" },
                    ]
                },
                {
                    id: "add-property",
                    label: "Add Property",
                    link: "#",
                    parentId: "real-estate",
                },
                {
                    id: "earnings",
                    label: "Earnings",
                    link: "#",
                    parentId: "real-estate",
                },
            ],
        },
        {
            label: "Pages",
            isHeader: true,
        },
        {
            id: "authentication",
            label: "Authentication",
            icon: "ph-user-circle",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsAuthentication(!isAuthentication);
                setIscurrentState('Authentication');
                updateIconSidebar(e);
            },
            stateVariables: isAuthentication,
            subItems: [
                {
                    id: "signin",
                    label: "Sign In",
                    link: "#",
                    parentId: "authentication"
                },
                {
                    id: "sign up",
                    label: "Sign Up",
                    link: "#",
                    parentId: "authentication"
                },
                {
                    id: "password-reset",
                    label: "Password Reset",
                    link: "#",
                    parentId: "authentication"
                },
                {
                    id: "password-create",
                    label: "Password Create",
                    link: "#",
                    parentId: "authentication"
                },
                {
                    id: "lockscreen",
                    label: "Lock Screen",
                    link: "#",
                    parentId: "authentication"
                },
                {
                    id: "logout",
                    label: "Logout",
                    link: "#",
                    parentId: "authentication"
                },
                {
                    id: "successmessage",
                    label: "Success Message",
                    link: "#",
                    parentId: "authentication"
                },
                {
                    id: "verification",
                    label: "Two Step Verification",
                    link: "#",
                    parentId: "authentication"
                },
                {
                    id: "error",
                    label: "Error",
                    link: "/#",
                    parentId: "authentication",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsError(!isError);
                    },
                    stateVariables: isError,
                    subItems: [
                        {
                            id: 1,
                            label: "404 Error",
                            link: "#",
                            parentId: "authentication"
                        },
                        {
                            id: 2,
                            label: "500",
                            link: "#",
                            parentId: "authentication"
                        },
                        {
                            id: 3,
                            label: "503",
                            link: "#",
                            parentId: "authentication"
                        },
                        {
                            id: 4,
                            label: "Offline Page",
                            link: "#",
                            parentId: "authentication"
                        },
                    ]
                },
            ],
        },
        {
            id: "pages",
            label: "Pages",
            icon: "ph-address-book",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsPages(!isPages);
                setIscurrentState('Pages');
                updateIconSidebar(e);
            },
            stateVariables: isPages,
            subItems: [
                {
                    id: "starter",
                    label: "Starter",
                    link: "#",
                    parentId: "pages"
                },
                {
                    id: "profile",
                    label: "Profile",
                    link: "#",
                    parentId: "pages"
                },
                {
                    id: "profilesettings",
                    label: "Profile Settings",
                    link: "#",
                    parentId: "pages"
                },
                {
                    id: "contacts",
                    label: "Contacts",
                    link: "#",
                    parentId: "pages"
                },
                {
                    id: "timeline",
                    label: "Timeline",
                    link: "#",
                    parentId: "pages"
                },
                {
                    id: "faqs",
                    label: "FAQs",
                    link: "#",
                    parentId: "pages"
                },
                {
                    id: "pricing",
                    label: "Pricing",
                    link: "#",
                    parentId: "pages"
                },
                {
                    id: "maintenace",
                    label: "Maintenance",
                    link: "#",
                    parentId: "pages"
                },
                {
                    id: "comingsoon",
                    label: "Coming Soon",
                    link: "#",
                    parentId: "pages"
                },
                {
                    id: "privacypolicy",
                    label: "Privacy Policy",
                    link: "#",
                    parentId: "pages"
                },
                {
                    id: "terms",
                    label: "Terms & Conditions",
                    link: "#",
                    parentId: "pages"
                }
            ]
        },
        {
            label: "Components",
            isHeader: true,
        },
        {
            id: "bootstrapui",
            label: "Bootstrap UI",
            icon: "ph-bandaids",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsBootstrapUi(!isBootstrapUi);
                setIscurrentState('Bootstrap UI');
                updateIconSidebar(e);
            },
            stateVariables: isBootstrapUi,
            subItems: [
                {
                    id: "alerts",
                    label: "Alerts",
                    link: "#",
                    parentId: "boostrapui",
                },
                { id: 2, label: "Badges", link: "#", parentId: "boostrapui" },
                { id: 3, label: "Buttons", link: "#", parentId: "boostrapui" },
                { id: 4, label: "Colors", link: "#", parentId: "boostrapui" },
                { id: 5, label: "Cards", link: "#", parentId: "boostrapui" },
                { id: 6, label: "Carousel", link: "#", parentId: "boostrapui" },
                { id: 7, label: "Dropdowns", link: "#", parentId: "boostrapui" },
                { id: 8, label: "Grid", link: "#", parentId: "boostrapui" },
                { id: 9, label: "Images", link: "#", parentId: "boostrapui" },
                { id: 10, label: "Tabs", link: "#", parentId: "boostrapui" },
                { id: 11, label: "Accordions & Collapse", link: "#", parentId: "boostrapui" },
                { id: 12, label: "Modals", link: "#", parentId: "boostrapui" },
                { id: 13, label: "Offcanvas", link: "#", parentId: "boostrapui" },
                { id: 14, label: "Placeholder", link: "#", parentId: "boostrapui" },
                { id: 15, label: "Progress", link: "#", parentId: "boostrapui" },
                { id: 16, label: "Notifications", link: "#", parentId: "boostrapui" },
                { id: 17, label: "Media Object", link: "#", parentId: "boostrapui" },
                { id: 18, label: "Embed Video", link: "#", parentId: "boostrapui" },
                { id: 19, label: "Typography", link: "#", parentId: "boostrapui" },
                { id: 20, label: "Lists", link: "#", parentId: "boostrapui" },
                { id: 21, label: "Links", link: "#", parentId: "boostrapui" },
                { id: 22, label: "General", link: "#", parentId: "boostrapui" },
                { id: 23, label: "Utilities", link: "#", parentId: "boostrapui" },


            ],
        },
        {
            id: "advanceui",
            label: "Advance UI",
            icon: "bi bi-layers",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsAdvanceUi(!isAdvanceUi);
                setIscurrentState('AdvanceUi');
                updateIconSidebar(e);
            },
            stateVariables: isAdvanceUi,
            subItems: [

                { id: "Scrollbar", label: "Scrollbar", link: "#", parentId: "advanceui" },
                { id: 2, label: "Swiper Slider", link: "#", parentId: "advanceui" },
                { id: 3, label: "Ratings", link: "#", parentId: "advanceui" },
                { id: 4, label: "Highlight", link: "#", parentId: "advanceui" },
            ],
        },
        {
            id: "customui",
            label: "Custom UI",
            icon: "ph-wrench",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsCustomUi(!isCustomUi);
                setIscurrentState('Custom UI');
                updateIconSidebar(e);
            },
            stateVariables: isCustomUi,
            subItems: [
                {
                    id: "ribbons",
                    label: "Ribbons",
                    link: "#",
                    parentId: "customui",
                },
                { id: 2, label: "Profile", link: "#", parentId: "customui" },
                { id: 3, label: "Counter", link: "#", parentId: "customui" },
            ],
        },
        {
            id: "widgets",
            label: "Widgets",
            icon: "ph-paint-brush-broad",
            link: "#",
        },
        {
            id: "forms",
            label: "Forms",
            icon: "ri-file-list-3-line",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsForms(!isForms);
                setIscurrentState('Forms');
                updateIconSidebar(e);
            },
            stateVariables: isForms,
            subItems: [
                {
                    id: "basicElements",
                    label: "Basic Elements",
                    link: "#",
                    parentId: "forms",
                },
                { id: 2, label: "Form Select", link: "#", parentId: "forms" },
                { id: 3, label: "Checkbox & Radio", link: "#", parentId: "forms" },
                { id: 4, label: "Pickers", link: "#", parentId: "forms" },
                { id: 5, label: "Input Masks", link: "#", parentId: "forms" },
                { id: 6, label: "Form Advanced", link: "#", parentId: "forms" },
                { id: 7, label: "Validation", link: "#", parentId: "forms" },
                { id: 8, label: "Wizard", link: "#", parentId: "forms" },
                { id: 9, label: "Editors", link: "#", parentId: "forms" },
                { id: 10, label: "File Upload", link: "#", parentId: "forms" },
                { id: 11, label: "Form Layout", link: "#", parentId: "forms" },
            ],
        },
        {
            id: "tables",
            label: "Tables",
            icon: "ph-table",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsTables(!isTables);
                setIscurrentState('Tables');
                updateIconSidebar(e);
            },
            stateVariables: isTables,
            subItems: [
                {
                    id: "basicTables",
                    label: "Basic Tables",
                    link: "#",
                    parentId: "tables",
                },
                { id: 2, label: "React Tables", link: "#", parentId: "tables" },
                { id: 3, label: "Datatables", link: "#", parentId: "tables" },
            ],
        },
        {
            id: "apexcharts",
            label: "Apexcharts",
            icon: "ph-chart-pie-slice",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsCharts(!isCharts);
                setIscurrentState('Charts');
                updateIconSidebar(e);
            },
            stateVariables: isCharts,
            subItems: [
                {
                    id: "line",
                    label: "Line",
                    link: "#",
                    parentId: "apexcharts",
                },
                { id: 2, label: "Area", link: "#", parentId: "apexcharts" },
                { id: 3, label: "Column", link: "#", parentId: "apexcharts" },
                { id: 4, label: "Bar", link: "#", parentId: "apexcharts" },
                { id: 5, label: "Mixed", link: "#", parentId: "apexcharts" },
                { id: 6, label: "Timeline", link: "#", parentId: "apexcharts" },
                { id: 7, label: "Range Area", link: "#", parentId: "apexcharts" },
                { id: 8, label: "Funnel", link: "#", parentId: "apexcharts" },
                { id: 9, label: "Candlestick", link: "#", parentId: "apexcharts" },
                { id: 10, label: "Boxplot", link: "#", parentId: "apexcharts" },
                { id: 11, label: "Bubble", link: "#", parentId: "apexcharts" },
                { id: 12, label: "Scatter", link: "#", parentId: "apexcharts" },
                { id: 13, label: "Heatmap", link: "#", parentId: "apexcharts" },
                { id: 14, label: "Treemap", link: "#", parentId: "apexcharts" },
                { id: 15, label: "Pie", link: "#", parentId: "apexcharts" },
                { id: 16, label: "Radialbar", link: "#", parentId: "apexcharts" },
                { id: 17, label: "Radar", link: "#", parentId: "apexcharts" },
                { id: 18, label: "Polar", link: "#", parentId: "apexcharts" },
            ],
        },
        {
            id: "icons",
            label: "Icons",
            icon: "ph-traffic-cone",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsIcons(!isIcons);
                setIscurrentState('Icons');
                updateIconSidebar(e);
            },
            stateVariables: isIcons,
            subItems: [
                {
                    id: "remix",
                    label: "Remix",
                    link: "#",
                    parentId: "icons",
                },
                { id: 2, label: "BoxIcons", link: "#", parentId: "icons" },
                { id: 3, label: "Material Design", link: "#", parentId: "icons" },
                { id: 4, label: "Bootstrap", link: "#", parentId: "icons" },
                { id: 5, label: "Phosphor", link: "#", parentId: "icons" },
            ],
        },
        {
            id: "googleMaps",
            label: "Google Map",
            icon: "ph-map-trifold",
            link: "#",
        },
        {
            id: "multilevel",
            label: "Multi Level",
            icon: "bi bi-share",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsMultiLevel(!isMultiLevel);
                setIscurrentState('MuliLevel');
                updateIconSidebar(e);
            },
            stateVariables: isMultiLevel,
            subItems: [
                { id: "level1.1", label: "Level 1.1", link: "#", parentId: "multilevel" },
                {
                    id: "level1.2",
                    label: "Level 1.2",
                    link: "#",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsLevel1(!isLevel1);
                    },
                    stateVariables: isLevel1,
                    subItems: [
                        { id: 1, label: "Level 2.1", link: "#" },
                        {
                            id: "level2.2",
                            label: "Level 2.2",
                            link: "#",
                            isChildItem: true,
                            click: function (e: any) {
                                e.preventDefault();
                                setIsLevel2(!isLevel2);
                            },
                            stateVariables: isLevel2,
                            subItems: [
                                { id: 1, label: "Level 3.1", link: "#" },
                                { id: 2, label: "Level 3.2", link: "#" },
                            ]
                        },
                    ]
                },
            ],
        },

    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};

export default Navdata;