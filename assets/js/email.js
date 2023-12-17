
emailjs.init('UnTNQRYshapGvH0aj')

const btn = document.getElementById('button');

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.disabled = true;
        btn.innerHTML = 'Sending...';

        const serviceID = 'service_fzc3b9j',
            templateID = 'template_9hwmqts';
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                alert("Thank you for contacting us!");

                ['sender_name', 'sender_email', 'message'].forEach(field => document.getElementById(field).value = '');
                btn.disabled = false;
                btn.innerHTML = 'Send Message';

            }, (err) => {
                console.log(JSON.stringify(err));
                alert('Something went wrong. Please try again later!');
                btn.disabled = false;
                btn.innerHTML = 'Send Message';
            });
    });