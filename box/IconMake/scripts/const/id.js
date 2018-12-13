const
    getRGB = (color) => {
        let components = color.components,
            r = components.red,
            g = components.green,
            b = components.blue
        return [r, g, b]
    },
    sumId = (color) => {
        let [r,g,b]=getRGB(color),
            sum = r + g + b;
        return sum;
    },
    maxId = (color) => {
        let [r,g,b]=getRGB(color),
            max = Math.max(r, g, b);
        return max;
    },

    minId = (color) => {
        let [r,g,b]=getRGB(color),
            min = Math.min(r, g, b);
        return min;
    },
    avgId = (color) => {
        let [r,g,b]=getRGB(color),
            sum = r + g + b,
            avg = sum / 3;
        return avg;
    },
    grayId = (color) => {
        let [r,g,b]=getRGB(color),
            gray = (r * 0.299 + g * 0.587 + b * 0.114)
        return gray;
    },
    saturationId = (color) => {
        let [r,g,b]=getRGB(color),
            max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        return max ? (1 - min / max) : max;
    }
module.exports = {
    sumId: sumId,
    maxId: maxId,
    minId: minId,
    avgId: avgId,
    grayId: grayId,
    saturationId: saturationId
}