


class User {
    constructor(id, firstname,lastname,address,phoneNumber,gender, email, password) {
        this.id = id;      
        this.firstname = firstname;  
        this.lastname = lastname;   
        this.address = address;  
        this.phoneNumber=phoneNumber; 
        this.gender=gender;
        this.email = email; 
        this.password = password; 
    }
    
      getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    // Setter methods
    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setEmail(email) {
        this.email = email;
    }

    setPassword(password) {
        this.password = password;
    }
}

// Export the User class so it can be used in other parts of the application
module.exports = User;
