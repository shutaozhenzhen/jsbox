const 
    mainViews =
        require("./mainViews"),
    ui = {
        type: "view",
        props: {
            id: "main"
        },
        layout: $layout.fill,
        views: mainViews
    };
module.exports =
    ui;