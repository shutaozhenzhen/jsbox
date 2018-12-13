const
    sideLength = require("scripts/const/sideLength.js"),
    idFunc = require("scripts/const/id.js"),
    compareByFunc = require("scripts/const/function.js").compareByFunc,
    compareAvgBySum = function (imageT) {
        return compareByFunc(idFunc.sumId)(imageT, imageT.averageColor);
    }
    getSnapshot = require("scripts/const/function.js").getSnapshot,
    selectButton = {
        type: "button",
        props: {
            title: $l10n("select")
        },
        layout: function (make, view) {
            make.centerX.equalTo(view.super).multipliedBy(0.6)
            make.centerY.equalTo(view.super).multipliedBy(1.5)
            make.width.equalTo(view.super).multipliedBy(0.15)
        },
        events: {
            tapped: () => {
                if ($("canvasView")) {
                    $("canvasView").remove()
                }
                let viewMain = $("viewMain")
                $photo.pick().then((resp) => {
                    if (resp.image) {
                        image = resp.image;
                        viewMain.add({
                            type: "canvas",
                            props: {
                                id: "canvasView"
                            },
                            layout: $layout.fill,
                            events: {
                                draw: function (view, ctx) {
                                    ctx.drawImage(view.frame, image)
                                }
                            }
                        })
                        image = getSnapshot("viewMain")
                        $("canvasView").remove()
                        viewMain.add({
                            type: "canvas",
                            props: {
                                id: "canvasView"
                            },
                            layout: $layout.fill,
                            events: {
                                draw: function (view, ctx) {
                                    let gray = $color("gray"),
                                        clear = $color("clear")
                                    let compareWH = compareAvgBySum(image)
                                    for (let w = 0; w < sideLength; w++) {
                                        for (let h = 0; h < sideLength; h++) {
                                            if (compareWH(w, h)) {
                                                ctx.fillColor = gray;
                                            } else {
                                                ctx.fillColor = clear;
                                            }
                                            ctx.fillRect($rect(w, h, 1, 1))
                                        }
                                    }
                                }
                            }
                        })
                        $quicklook.open({ image: getSnapshot("viewMain") });
                    } else {
                        $ui.alert({
                            title: "提醒",
                            message: "你没有选择图片",
                        });
                        $app.close();
                    }
                });
            }
        }
    }
module.exports = selectButton