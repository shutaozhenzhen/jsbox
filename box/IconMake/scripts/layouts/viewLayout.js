const
    sideLength = require("scripts/const/sideLength.js"),
    viewLayout = (make, view) => {
        make.center.equalTo(view.super)
        make.size.equalTo($size(sideLength, sideLength))
    }
module.exports = viewLayout