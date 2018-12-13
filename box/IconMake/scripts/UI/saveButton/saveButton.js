const
    saveButton = {
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
    }
module.exports = saveButton