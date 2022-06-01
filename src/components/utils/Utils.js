export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};

export const getRandomInt = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min)) + min);
}

export const wait = (duration = 1000 ) => {
    return new Promise((resolve) => {
        window.setTimeout(resolve,duration);
    })
}

export const filter_array = (filter = [], array = []) => {

    if(filter === "all"){
        return array;
    }

    let filter_array = array.filter(function(data) {
        if(data.language === filter){
            return data.language === filter
        }else if(data.editorName === filter){
            return data.editorName === filter
        }
    });

    return filter_array;
}

