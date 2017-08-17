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
        this.setLogger();
    }

    checkArguments(callback) {
        parallel({
            checkUsername: (cb) => {
                Users.find({ username: this.username }, (err, user) => {
                    cb(err, user);
                });
            },
            checkProject: (cb) => {
                Projects.find({ name: this.projectName }, (err, project) => {
                    cb(err, project);
                });
            },
        }, (err, result) => {
            const ret = {
                existsUser: result.checkUsername,
                existsProject: result.checkProject,
            };
            callback(err, ret);
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
