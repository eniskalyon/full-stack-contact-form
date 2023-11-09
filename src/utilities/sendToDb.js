
const sendToDb = (event,  state, setState, setResult) => {





    event.preventDefault();

    fetch('http://localhost:8000/submitForm.php', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(state).toString(),
    })
    .then(response => {
        console.log('Raw response:', response);
        console.log("Response headers: ", response.headers.get('Content-Type'));

        return response.json();
    })
    .then(data => {
        console.log('Parsed data:', data);
        console.log("About to set result:", data);

        setResult(data);
        setState({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    })
    .catch(error => {
        console.log('Fetch error:', error);
        setResult({
            success: false,
            message: 'Something went wrong. Try again later',
        });
    });
};

export default sendToDb