const classify = {
    getClassification: async (url) =>
        await fetch(`http://watson.drerandaci.com/api/prediction/DetectFacesUrl?url=${url}`, {
            method: 'POST',
            // headers: {
            // 'Accept': 'application/json',
            // // 'Content-Type': 'application/json;'
            // },
            // body: url
        })
};

export default classify;