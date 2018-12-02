let image
const
    sideLength =  Math.ceil(72.0 / $device.info.screen.scale),
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
    getSnapshot = function () {
        return $("viewMain").snapshot;
    },
    compare = function (imageT) {
        let avgColor = imageT.averageColor,
            avgComponents = avgColor.components,
            red = avgComponents.red,
            green = avgComponents.green,
            blue = avgComponents.blue,
            sum = red + green + blue;
        return function (w, h) {
            let color = imageT.colorAtPixel($point(w, h)),
                components = color.components,
                r = components.red,
                g = components.green,
                b = components.blue,
                sumT = r + g + b;
            if (sumT > sum) {
                return true
            } else {
                return false
            }
        }
    },
    buttonSave = {
        type: "button",
        props: {
            title: "save"
        },
        layout: function (make, view) {
            make.centerX.equalTo(view.super).multipliedBy(1.4)
            make.centerY.equalTo(view.super).multipliedBy(1.5)
            make.width.equalTo(view.super).multipliedBy(0.15)
        },
        events: {
            tapped: function () {                
                    let data = $("canvasView").snapshot.png,
                    path="shared://iconMake/"
                    if ( $file.isDirectory(path)) {
                        
                    } else {
                      $file.mkdir(path)
                    }
                    var success =$file.write({
                      data: data,
                      path: path+"icon.png"
                    })
                    if (success) {
                        $ui.alert({
                            title: "",
                            message: "存储成功,地址:\n"+ path+"icon.png",
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
            title: "select"
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
                        image = getSnapshot()
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
                                    let compareWH = compare(image)
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
                        $quicklook.open({ image: getSnapshot() });
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
    ],
    ui = {
        type: "view",
        props: {
            id: "main"
        },
        layout: $layout.fill,
        views: mainViews
    };
$ui.render(ui);
