const
    sideLength = require("scripts/const/sideLength.js"),
    view = {
        type: "view",
        props: {
            id: "viewMain"
        },
        layout: function (make, view) {
            make.center.equalTo(view.super)
            make.size.equalTo($size(sideLength, sideLength))
        }
    },
    mainViews = [
        view,
        buttonSave,
        buttonSelect
    ]
module.exports = mainViews