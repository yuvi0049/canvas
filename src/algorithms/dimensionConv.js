import dimensions from '../constants/dimensions';

export default function dimensionConv(data) {
    const templateJSON = data.templateJSON && JSON.parse(data.templateJSON);
    let resultTemplate = [];

    if (templateJSON && templateJSON.children) {
        let width = templateJSON.width;
        let height = templateJSON.height;

        let updatedWidth,
            updatedHeight;

        switch (data.dimension) {
            case 1:
                updatedWidth = dimensions.vertical.width;
                updatedHeight = dimensions.vertical.height;
                break;
            case 2:
                updatedWidth = dimensions.horizontal.width;
                updatedHeight = dimensions.horizontal.height;
                break;
            case 3:
                updatedWidth = dimensions.square.width;
                updatedHeight = dimensions.square.height;
                break;
            default:
                updatedWidth = dimensions.square.width;
                updatedHeight = dimensions.square.height;
                break;
        };

        resultTemplate = templateJSON.children && templateJSON.children.map(element => {
            let X = (element.x / width) * updatedWidth;
            let Y = (element.y / width) * updatedHeight;

            const newWidth = (element.width / width) * updatedWidth;
            const newHeight = (element.height / width) * updatedHeight;

            const fontSize = element.fontSize ? (element.fontSize / width) * updatedWidth : 0;

            if (element.type === 'Image' && data.dimension != 3) {
                const widthRatio = newWidth / element.width;
                const heightRatio = newHeight / element.height;

                if (widthRatio < heightRatio) {
                    Y = Y + Math.abs((newHeight - Y) / 2);
                } else {
                    X = X + Math.abs((newWidth - X) / 2);
                }
            }

            return {...element,
                    text: element.text ? element.text.replace(/(\r\n|\n|\r)/gm,"") : '',
                    fontSize: parseInt(fontSize),
                    x: parseFloat(X.toFixed(2)),
                    y: parseFloat(Y.toFixed(2)),
                    left: parseFloat(X.toFixed(2)),
                    top: parseFloat(Y.toFixed(2)),
                    width: parseFloat(newWidth.toFixed(2)),
                    height: parseFloat(newHeight.toFixed(2)),
                    src: element.exportedAsset ? element.exportedAsset : ''
                };
        }).filter(elem => elem.type != 'rect');  // remove this when rectangle issue is sorted.
    } else {
        resultTemplate = {...data.templateJSON};
    }

    return {
        objects: resultTemplate
    };
}