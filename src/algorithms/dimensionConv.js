import dimensions from '../constants/dimensions';

export default function dimensionConv(data) {
    const templateJSON = data.templateJSON && JSON.parse(data.templateJSON);
    let resultTemplate = [];

    if (templateJSON) {
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

            if (element.type === 'Image') {
                const originalAspectRatio = element.width / element.height;
                const changedAspectRatio = newWidth / newHeight;

                if ((originalAspectRatio / changedAspectRatio) > 1) {
                    Y = Y + (newHeight - Y) / 2;
                } else {
                    X = X + (newWidth - X) / 2;
                }
            }

            return {...element,
                    left: X,
                    top: Y,
                    width: newWidth,
                    height: newHeight,
                    src: element.exportedAsset && element.exportedAsset
                };
        });
    }

    return {
        objects: resultTemplate
    };
}