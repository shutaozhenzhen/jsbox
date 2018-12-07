$photo.pick({
    handler: function(resp) {        
        if (resp.image) {
            let image = resp.image;
            return image;
        } else {
            $ui.alert({
                title: "提醒",
                message: "你没有选择图片",
            });
            $app.close();
        }
    }
  })
const
    canvas = {
        type: "canvas",
        layout: function (make, view) {
            make.center.equalTo(view.super)
            make.size.equalTo($size(72, 72))
        },
        events: {
            draw: function (view, ctx) {
                let width = view.frame.width
                var height = view.frame.height
                ctx.drawImage($rect(0, 0, width, height), image);
            }
        }
    },
    button = {
        type: "button",
        props: {
            title: "Click"
        },
        layout: function (make, view) {
            make.centerX.equalTo(view.super)
            make.centerY.equalTo(view.super).multipliedBy(1.5)
        }
    },
    mainViews = [
        canvas,
        button
    ]
module.exports =
    mainViews;