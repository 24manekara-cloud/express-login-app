const validateUser = (userData) => {
    const {  email, password } = userData;

    if (!email || !password) {
        return { valid: false, message: "All fields are required." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { valid: false, message: "Invalid email format." };
    }

    if (password.length < 6) {
        return { valid: false, message: "Password must be at least 6 characters long." };
    }

    if (!/^[a-zA-Z0-9]+$/.test(password)) {
        return { valid: false, message: "Password must be alphanumeric." };
    }

    return { valid: true, message: "Validation successful" };
};

module.exports = validateUser;