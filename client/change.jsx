const helper = require('./helper.js');
const React = require('react');
const {createRoot} = require('react-dom/client');

const handleChange = (e) => {
    e.preventDefault();
    //helper.hideError();

    const oldPass = e.target.querySelector('#oldPass').value;
    const newPass = e.target.querySelector('#newPass').value;

    if(!oldPass || !newPass) {
        helper.handleError('A field is empty');
        return false;
    }

    helper.sendPost(e.target.action, { oldPass, newPass });
    return false;
};


const ChangeWindow = () => {
    return (
        <form id="loginForm" name="loginForm" onSubmit={handleChange} action="/changePass" method="POST" className="mainForm">
            <label htmlFor="oldPass">Old Password: </label>
            <input id="oldPass" type="password" name="oldPass" placeholder="password" />
            <label htmlFor="newPass">New Password: </label>
            <input id="newPass" type="password" name="pass" placeholder="password" />
            <input className="formSubmit" type="submit" value="Change Password" />
        </form>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('content'));
    root.render(<ChangeWindow />);
};

window.onload = init;