export const merge = (...objs: any) => {
    const extended: any = {};
    const merge = function (obj: any) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                extended[prop] = obj[prop];
            }
        }
    };

    for (let i = 0; i < objs.length; i++) {
        merge(objs[i]);
    }

    return extended;
};
