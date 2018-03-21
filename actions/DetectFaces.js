const classify = {
    getFaceClassification: async (formData) =>
        await fetch(`http://watson.drerandaci.com/api/prediction/DetectFaces`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data;'
            },
            body: formData
        })
};

export default classify;