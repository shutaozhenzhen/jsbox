//$ui.alert($file.list("shared://../Icons"))
let image
const
    mainViews = require("./scripts/const.js"),
    ui = {
        type: "view",
        props: {
            id: "main"
        },
        layout: $layout.fill,
        views: mainViews
    };
$ui.render(ui);