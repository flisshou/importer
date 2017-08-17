// import mongoose from 'mongoose';
// import Random from 'meteor-random';
import winston from 'winston';
import parallel from 'async/parallel';
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

        console.log(`this.projectExists = ${this.projectExists}\tthis.userExists = ${this.userExists}`);
    }

    addProject() {
        const newProject = Projects({
            name: this.projectName,
            created: new Date(),
            users: [],
        });
        newProject.save((err) => {
            if (err) throw err;
            console.log(`Created Project - ${this.projectName}`);
        });
    }

    removeProject() {
        Projects.findOneAndRemove({ name: this.projectName }, (err) => {
            if (err) throw err;
            console.log(`Removed Project - ${this.projectName}`);
        });
    }
}

export {
    ProjectController as default,
};
