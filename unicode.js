list = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "←", "↑", "↓"]
function init() {
  $ui.render({
    views: [{
      type: "input",
      props: {
        id: "text-input",
        text: "0000"
      },
      layout: function (make, view) {
        make.left.top.inset(10);
        make.height.equalTo(32);
        make.right.inset(100);
      },
      events: {
        ready: function (sender) {
          sender.focus()
        },
        returned: function (sender) {
          sender.blur()
        },
        didEndEditing: function (sender) {
          if (sender.text.split("").length > 4) {
            var t = [], l = sender.text.split("");
            for (var k = 0; k < 4; k++) {
              t[k] = l[k];
            }
            $("text-input").text = t.join("");
          }
        }
      }
    },
    {
      type: "button",
      props: {
        title: "send"
      },
      layout: function (make, view) {
        make.top.right.inset(10);
        make.height.equalTo(32);
        make.left.equalTo($("text-input").right).offset(10)
      },
      events: {
        tapped: function (sender) {
          if ($app.env == $env.keyboard) {
            var
              txt = $("text-input").text;
            $keyboard.insert(String(eval('"\\u' + txt + '"')));
          } else {
            var
              txt = $("text-input").text;
            $clipboard.text = String(eval('"\\u' + txt + '"'));
          }
        }

      }
    },
    {
      type: "matrix",
      props: {
        columns: 4,
        itemHeight: 50,
        spacing: 25,
        template: {
          views: [
            {
              type: "label",
              props: {
                id: "label",
                align: $align.center,
                font: $font(36)
              },
              layout: $layout.fill
            }
          ]
        },
        data: list.map(function (item) {
          return {
            label: {
              text: item
            }
          }
        })
      },
      layout: function (make, view) {
        make.top.equalTo($("text-input").bottom)
        make.left.bottom.right.equalTo(0)
      },
      events: {
        didSelect: function (sender, indexPath) {
          var t = list[indexPath.row];
          if (t == "←") {
            var k = $("text-input").text.split("")
            k.pop();
            $("text-input").text = "0" + k.join("");
          } else if (t == "↑") {
            var k = parseInt($("text-input").text, 16);
            k++;
            k=k%(16*16*16*16);
            k = k.toString(16).split("");
            if (k.length < 4) {
              do {
                k = k.join("");
                k = "0" + k;
                k = k.split("")
              } while (k.length < 4)
            } 
            $("text-input").text=k.join("")
          } else if (t == "↓") {
            var k = parseInt($("text-input").text, 16);
            k--;
            k=(k+16*16*16*16)%(16*16*16*16);
            k = k.toString(16).split("");
            if (k.length < 4) {
              do {
                k = k.join("");
                k = "0" + k;
                k = k.split("")
              } while (k.length < 4)
            } 
            $("text-input").text=k.join("")
          } else {
            var k = $("text-input").text.split("")
            if (k.length == 4) {
              k.shift();
              $("text-input").text = k.join("") + t;
            } else {
              $("text-input").text = k.join("") + t;
            }

          }
          var txt = String(eval('"\\u' + $("text-input").text + '"'))
          $("button").title = "send:" + txt
        }
      }
    }
    ]
  })
}
init();
