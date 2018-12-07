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
    sideLength = require("scripts/const/sideLength.js"),
    getSnapshot = (id) => {
        return $(id).snapshot;
    },
    sumId = (color) => {
        let components = color.components,
            r = components.red,
            g = components.green,
            b = components.blue,
            sum = r + g + b;
        return sum;
    },
    maxId = (color) => {
        let components = color.components,
            r = components.red,
            g = components.green,
            b = components.blue,
            max = Math.max(r, g, b);
        return max;
    },
    avgId = (color) => {
        let components = color.components,
            r = components.red,
            g = components.green,
            b = components.blue,
            sum = r + g + b,
            avg = sum / 3;
        return avg;
    },
    minId = (color) => {
        let components = color.components,
            r = components.red,
            g = components.green,
            b = components.blue,
            min = Math.min(r, g, b);
        return min;
    },
    grayId = (color) => {
        let components = color.components,
            r = components.red,
            g = components.green,
            b = components.blue,
            gray = (r * 0.299 + g * 0.587 + b * 0.114)
        return gray;
    },
    saturationId = (color) => {
        let components = color.components,
            r = components.red,
            g = components.green,
            b = components.blue,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        return max ? (1 - min / max) : max;
    },
    compareByFunc = (idFunc) => {
        return (imageT, colorC) => {
            let
                id = idFunc(colorC);
            return function (w, h) {
                let color = imageT.colorAtPixel($point(w, h)),
                    idT = idFunc(color)
                if (idT > id) {
                    return true
                } else {
                    return false
                }
            }
        }
    },
    compareAvgBySum = function (imageT) {
        return compareByFunc(sumId)(imageT, imageT.averageColor);
    },
    compareAvgByMax = function (imageT) {
        return compareByFunc(maxId)(imageT, imageT.averageColor);
    },
    buttonSave = {
        type: "button",
        props: {
            title: $l10n("save")
        },
        layout: function (make, view) {
            make.centerX.equalTo(view.super).multipliedBy(1.4)
            make.centerY.equalTo(view.super).multipliedBy(1.5)
            make.width.equalTo(view.super).multipliedBy(0.15)
        },
        events: {
            tapped: function () {
                let data = $("canvasView").snapshot.resized($size(72, 72)).png,
                    path = "shared://iconMake/"
                if ($file.isDirectory(path)) {

                } else {
                    $file.mkdir(path)
                }
                var success = $file.write({
                    data: data,
                    path: path + "icon.png"
                })
                if (success) {
                    $ui.alert({
                        title: "",
                        message: "存储成功,地址:\n" + path + "icon.png",
                    });
                } else {
                    $ui.alert({
                        title: "",
                        message: "存储失败",
                    });
                }
                //$quicklook.open({ image: $("canvasView").snapshot });
            }
        }
    },
    buttonSelect = {
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
            tapped: function () {
                if ($("canvasView")) {
                    $("canvasView").remove()
                }

                let viewMain = $("viewMain")
                $photo.pick().then(function (resp) {
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
    },
    mainViews = [
        view,
        buttonSave,
        buttonSelect
    ]
module.exports = mainViews