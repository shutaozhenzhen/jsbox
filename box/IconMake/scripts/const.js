let image
const
    viewLayout = require("./layouts/viewLayout.js"),
    view = {
        type: "view",
        props: {
            id: "viewMain"
        },
        layout: viewLayout
    }
const
    buttonSave = require("./UI/saveButton/saveButton.js"),
    buttonSelect = require("./UI/selectButton/selectButton.js"),
    mainViews = [
        view,
        buttonSave,
        buttonSelect
    ]
module.exports = mainViews