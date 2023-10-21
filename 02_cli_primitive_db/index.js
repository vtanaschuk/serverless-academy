const fs = require('fs');
const inquirer = require('inquirer');

const databasePath = 'users_database.txt';

function saveUser(user) {
    const users = loadUsers();
    users.push(user);
    fs.writeFileSync(databasePath, JSON.stringify(users, null, 2));
}

function loadUsers() {
    try {
        const data = fs.readFileSync(databasePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function searchUser(name) {
    const users = loadUsers();
    const foundUser = users.find(user => user.name.toLowerCase() === name.toLowerCase());
    return foundUser;
}

async function startApp() {
    while (true) {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the user (press ENTER to stop adding users):',
            },
        ]);

        if (!answers.name) {
            break;
        }

        const newUser = {
            name: answers.name,
            gender: (await inquirer.prompt({
                type: 'list',
                name: 'gender',
                message: 'Choose gender:',
                choices: ['Male', 'Female'],
            })).gender,
            age: (await inquirer.prompt({
                type: 'input',
                name: 'age',
                message: 'Enter age:',
            })).age,
        };

        saveUser(newUser);
        console.log('User added successfully!');
    }

    const searchAnswer = await inquirer.prompt({
        type: 'input',
        name: 'searchName',
        message: 'Enter the name of the user you want to search for (press ENTER to display all users):',
    });

    if (!searchAnswer.searchName) {
        // Display all users
        const allUsers = loadUsers();
        console.log('All users:');
        console.log(allUsers);
        return;
    }

    const foundUser = searchUser(searchAnswer.searchName);

    if (foundUser) {
        console.log('User found:');
        console.log(foundUser);
    } else {
        console.log('User not found.');
    }
}

startApp();
