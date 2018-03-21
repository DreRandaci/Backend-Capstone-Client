const classify = {
    getClassification: async (url) =>
        await fetch(`http://watson.drerandaci.com/api/prediction/ClassifyGenericUrl?url=${url}`, {
            method: 'POST'
        })
};

export default classify;