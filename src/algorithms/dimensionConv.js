import dimensions from '../constants/dimensions';

export default function dimensionConv(data, defaultRender) {
    const templateJSON = data.templateJSON && JSON.parse(data.templateJSON);
    let resultTemplate = [];

    if (templateJSON && templateJSON.children) {
        let width = templateJSON.width;

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
                updatedWidth = 1;
                updatedHeight = 1;
                break;
        };

        resultTemplate = templateJSON.children && templateJSON.children.map(element => {
            let X, Y, newWidth, newHeight;

            let fontSize = 0,
                type = element.type ? element.type : '';

            if (defaultRender && updatedWidth === 1 && updatedHeight === 1) {
                X = element.x;
                Y = element.y;
                newWidth = width;
                newHeight = width;
            } else{
                X = (element.x / width) * updatedWidth;
                Y = (element.y / width) * updatedHeight;
                newWidth = (element.width / width) * updatedWidth;
                newHeight = (element.height / width) * updatedHeight;

                if (element.type === 'Image' && data.dimension != 3) {
                    const widthRatio = newWidth / element.width;
                    const heightRatio = newHeight / element.height;
    
                    if (widthRatio < heightRatio) {
                        Y = Y + Math.abs((newHeight - Y) / 2);
                    } else {
                        X = X + Math.abs((newWidth - X) / 2);
                    }
                }
            };

            // @ Specific Cases

            if (element.subType === "TEXT") {
                fontSize = element.fontSize ? (element.fontSize / width) * updatedWidth : 0;
            }

            if (element.name === "Rectange") {
                type = "rect";
            }

            if (element.name === "Image") {
                type = "Image";
            }

            return {...element,
                    type: type,
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
        });
    } else {
        resultTemplate = {...data.templateJSON};
    }

    return {
        objects: resultTemplate
    };
}