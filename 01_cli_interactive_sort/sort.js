const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function sortData(data, sortBy) {
  switch (sortBy) {
    case '1':
      return data.sort();
    case '2':
      return data.filter(item => !isNaN(item)).sort((a, b) => a - b);
    case '3':
      return data.filter(item => !isNaN(item)).sort((a, b) => b - a);
    case '4':
      return data.sort((a, b) => a.length - b.length);
    case '5':
      return [...new Set(data)];
    case '6':
      return [...new Set(data.filter(item => !isNaN(item)))];
    default:
      return data;
  }
}

function startSorting() {
  rl.question('Enter words or numbers separated by space: ', input => {
    const dataArray = input.split(' ');
    
    rl.question(
      'What operation do you want to perform?\n' +
        '1 - Sort words alphabetically\n' +
        '2 - Show numbers from lesser to greater\n' +
        '3 - Show numbers from bigger to smaller\n' +
        '4 - Display words in ascending order by number of letters in the word\n' +
        '5 - Show only unique words\n' +
        '6 - Display only unique values\n' +
        'To exit, type "exit"\n',
      operation => {
        if (operation.toLowerCase() === 'exit') {
          rl.close();
        } else {
          const result = sortData(dataArray, operation.toLowerCase());
          console.log('Result:', result.join(' '));
          startSorting();
        }
      }
    );
  });
}

startSorting();

