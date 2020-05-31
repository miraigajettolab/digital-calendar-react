const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('users');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.addToUsersIndex = functions.firestore.document('users/{userId}')
    .onCreate(snapshot => {
        const data = snapshot.data();
        const objectID = snapshot.id;
        return index.saveObject({...data, objectID});
    });

exports.updateUsersIndex = functions.firestore.document('users/{userId}')
    .onUpdate(change => {
        const newData = change.after.data();
        const objectID = change.after.id;
        return index.saveObject({...newData, objectID});
    });

exports.deleteFromUsersIndex = functions.firestore.document('users/{userId}')
    .onDelete(snapshot => {
        index.deleteObject(snapshot.id)
    });

exports.addEvent = functions.region('europe-west1').firestore.document('events/{eventId}')
    .onCreate(snapshot => {
        const data = snapshot.data();
        const objectID = snapshot.id;
        //console.log("data:\n" + JSON.stringify(data));
        let unifiedTasks = [];
        data.tasks.map(task => {
            task.assignedWorkers.map(worker => {
                const isUserCounted = unifiedTasks.filter(function(wt){ //counts the number of array elements where name == worker
                    return wt.name == worker;
                }) 
                if(isUserCounted.length == 0){ //if there is no elements where name == worker let's create one
                    let workerFormat = {
                        name: worker,
                        tasks: []
                    }
                    unifiedTasks.push(workerFormat)
                }
                let myTask = {
                    eventID: objectID,
                    eventTitle: data.eventTitle,
                    eventPlace: data.eventPlace,
                    eventDate: data.eventDate,
                    eventManager: data.eventManager,
                    taskDescription: task.taskDescription,
                    taskName: task.taskName,
                    taskDate: task.taskDate
                }
                let workerIndex = unifiedTasks.findIndex(wt => wt.name == worker);
                unifiedTasks[workerIndex].tasks.push(myTask)
            })
        })
        //at this point all the tasks are stored in unifiedTasks array
        //each element of this array contains all the tasks of the event for one worker
        //format of this elemet is defined as {name: user_email, tasks: []}
        
        //let hehehe = {stuff: unifiedTasks}
        //console.log("hehehe" + JSON.stringify(hehehe));

        unifiedTasks.map(workerTasks => {
            let worker = workerTasks.name;

            const docRef = db.collection("user_tasks").doc(worker)
            docRef.get().then(function(doc) { //getting existing user info
                if (doc.exists) {
                    userdata = doc.data();
                    let newTasks = []
                    if(userdata.tasks){ //copying existing tasks
                        userdata.tasks.map(copytask => {
                           newTasks.push(copytask)
                        })
                    }
                    //adding new tasks
                    workerTasks.tasks.map(taskToAdd => {
                        newTasks.push(taskToAdd)
                    })
                    docRef.set({
                            tasks: newTasks
                        })
                    .catch(e => console.log(e.message))  

                } else {
                        console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        })
        return 0;
    });

exports.updateEvent = functions.region('europe-west1').firestore.document('events/{eventId}')
    .onUpdate(snapshot => {
        const data = snapshot.after.data();
        const objectID = snapshot.after.id;
        //console.log("UPDATED data:\n" + JSON.stringify(data));
        let unifiedTasks = [];
        data.tasks.map(task => {
            task.assignedWorkers.map(worker => {
                const isUserCounted = unifiedTasks.filter(function(wt){ //counts the number of array elements where name == worker
                    return wt.name == worker;
                }) 
                if(isUserCounted.length == 0){ //if there is no elements where name == worker let's create one
                    let workerFormat = {
                        name: worker,
                        tasks: []
                    }
                    unifiedTasks.push(workerFormat)
                }
                let myTask = {
                    eventID: objectID,
                    eventTitle: data.eventTitle,
                    eventPlace: data.eventPlace,
                    eventDate: data.eventDate,
                    eventManager: data.eventManager,
                    taskDescription: task.taskDescription,
                    taskName: task.taskName,
                    taskDate: task.taskDate
                }
                let workerIndex = unifiedTasks.findIndex(wt => wt.name == worker);
                unifiedTasks[workerIndex].tasks.push(myTask)
            })
        })
        //at this point all the tasks are stored in unifiedTasks array
        //each element of this array contains all the tasks of the event for one worker
        //format of this elemet is defined as {name: user_email, tasks: []}
        
        //let hehehe = {stuff: unifiedTasks}
        //console.log("hehehe" + JSON.stringify(hehehe));

        unifiedTasks.map(workerTasks => {
            let worker = workerTasks.name;

            const docRef = db.collection("user_tasks").doc(worker)
            docRef.get().then(function(doc) { //getting existing user info
                if (doc.exists) {
                    userdata = doc.data();
                    let newTasks = []
                    if(userdata.tasks){ //copying existing tasks
                        userdata.tasks.map(copytask => {
                            if(copytask.eventID != objectID){ //BUT WE DON'T COPY THE ONES FROM MODIFIED EVENT
                                newTasks.push(copytask)
                            }
                        })
                    }
                    //adding new tasks
                    workerTasks.tasks.map(taskToAdd => {
                        newTasks.push(taskToAdd)
                    })
                    docRef.set({
                            tasks: newTasks
                        })
                    .catch(e => console.log(e.message))  

                } else {
                        console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        })
        return 0;
    });

exports.deleteEvent = functions.region('europe-west1').firestore.document('events/{eventId}')
    .onDelete(snapshot => {
        const data = snapshot.data();
        const objectID = snapshot.id;
        //console.log("DELETED data:\n" + JSON.stringify(data));
        let unifiedTasks = [];
        data.tasks.map(task => {
            task.assignedWorkers.map(worker => {
                const isUserCounted = unifiedTasks.filter(function(wt){ //counts the number of array elements where name == worker
                    return wt.name == worker;
                }) 
                if(isUserCounted.length == 0){ //if there is no elements where name == worker let's create one
                    let workerFormat = {
                        name: worker,
                        tasks: []
                    }
                    unifiedTasks.push(workerFormat)
                }
                let myTask = {
                    eventID: objectID,
                    eventTitle: data.eventTitle,
                    eventPlace: data.eventPlace,
                    eventDate: data.eventDate,
                    eventManager: data.eventManager,
                    taskDescription: task.taskDescription,
                    taskName: task.taskName,
                    taskDate: task.taskDate
                }
                let workerIndex = unifiedTasks.findIndex(wt => wt.name == worker);
                unifiedTasks[workerIndex].tasks.push(myTask)
            })
        })
        //at this point all the tasks are stored in unifiedTasks array
        //each element of this array contains all the tasks of the event for one worker
        //format of this elemet is defined as {name: user_email, tasks: []}
        
        //let hehehe = {stuff: unifiedTasks}
        //console.log("hehehe" + JSON.stringify(hehehe));

        unifiedTasks.map(workerTasks => {
            let worker = workerTasks.name;

            const docRef = db.collection("user_tasks").doc(worker)
            docRef.get().then(function(doc) { //getting existing user info
                if (doc.exists) {
                    userdata = doc.data();
                    let newTasks = []
                    if(userdata.tasks){ //copying existing tasks
                        userdata.tasks.map(copytask => {
                            if(copytask.eventID != objectID){ //BUT WE DON'T COPY THE ONES WE'RE DELETING
                                newTasks.push(copytask)
                            }
                        })
                    }
                    docRef.set({
                            tasks: newTasks
                        })
                    .catch(e => console.log(e.message))  

                } else {
                        console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        })
        return 0;
    });

