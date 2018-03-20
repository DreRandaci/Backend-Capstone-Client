const classify = {
    getClassification: (formData) =>
        fetch(`http://watson.drerandaci.com/api/prediction/classifyGeneric`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data;'
            },
            body: formData
        })
};

export default classify;