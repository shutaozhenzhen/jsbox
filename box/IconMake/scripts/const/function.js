const
    getSnapshot = (id) => {
        return $(id).snapshot;
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
    }
module.exports = {
    getSnapshot: getSnapshot,
    compareByFunc: compareByFunc
}