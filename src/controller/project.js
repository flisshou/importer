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

    setUser() {
        this.checkArguments((err, ret) => {
            if (err) throw err;
            const uLength = ret.existsUser.length;
            const pLength = ret.existsProject.length;
            this.logger.debug(`Project_${this.projectName} --- (uLength, pLength) = (${uLength}, ${pLength})`);

            if (uLength !== 1 || pLength !== 1) {
                if (uLength === 0) {
                    this.logger.info(`Project ${this.projectName} cannot find match username ${this.username}`);
                    return;
                } else if (pLength === 0) {
                    this.logger.info(`Database does not exist Project ${this.projectName}`);
                    return;
                } else if (uLength > 1 || pLength > 1) {
                    this.logger.info('Project or Username is not unique');
                    return;
                }
            }

            const condition = { name: this.projectName };
            const update = { $addToSet: { users: ret.existsUser[0].id } };
            Projects.findOneAndUpdate(condition, update, () => {
                this.logger.info(`Updated Project - ${this.projectName}`);
            });
            console.log(ret);
        });
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
        const condition = { name: this.projectName };
        Projects.findOneAndRemove(condition, (err) => {
            if (err) throw err;
            console.log(`Removed Project - ${this.projectName}`);
        });
    }
}

export {
    ProjectController as default,
};
