// import mongoose from 'mongoose';
import Projects from '../model/projects';
import Users from '../model/users';

class ProjectController {
    constructor(username, projectName) {
        this.username = username;
        this.projectName = projectName;
        this.checkUsername();
        this.checkProject();
    }

    checkUsername() {
        Users.find({ username: this.username }, (err, user) => {
            if (err) throw err;
            this.userId = user.id;
            this.userExists = true;
            console.log(`userId = ${this.userId}`);
        });
    }

    checkProject() {
        Projects.find({ name: this.projectName }, (err, project) => {
            if (err) throw err;
            this.projectPreviousUsers = project.users;
            this.projectExists = true;
            console.log(`projectPreviousUsers = ${project.users}`);
        });
    }

    setUser() {
        // if (!(this.projectExists && this.userExists)) throw ReferenceError;

        // if ()
    }
}

export {
    ProjectController as default,
};
