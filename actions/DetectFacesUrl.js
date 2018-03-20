const classify = {
    getFaceClassificationUrl: async (url) =>
        await fetch(`http://watson.drerandaci.com/api/prediction/DetectFacesUrl?url=${url}`, {
            method: 'POST'
        })
};

export default classify;