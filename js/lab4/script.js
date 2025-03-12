const buttons = document.getElementsByClassName('task-button');

// Task 1.
function fruitsArray() {
    let fruits = ['яблуко', 'банан', 'апельсин'];
    console.log(fruits);
    fruits.pop();
    console.log(fruits);
    fruits.unshift('ананас');
    fruits.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
    console.log(fruits);
    console.log("Індекс яблука: ", fruits.findIndex(str => str === 'яблуко'));
}

buttons[0].addEventListener('click', fruitsArray);

// Task 2.
function colorsArray() {
    let colors = ['білий', 'чорний', 'синій', 'темно-синій', 'світло-синій', 'червоний', 'зелений'];
    let max, min;
    for(let str of colors) {
        if(!max || str.length > max) max = str.length;
        if(!min || str.length < min) min = str.length;
    }
    
    console.log('Найдовший елемент у масиві: ', colors.find(str => str.length === max));
    console.log('Найдовший елемент у масиві: ', colors.find(str => str.length === min));
    
    colors = colors.filter(str => str.includes('синій'));
    const colorsStr = colors.join(',');
    console.log(colorsStr);
}

buttons[1].addEventListener('click', colorsArray);

// Task 3.
function workersArray() {
    let workers = [
        {
            name: 'Біллі',
            age: 48,
            profession: 'актор',
        },
        {
            name: 'Вен',
            age: 52,
            profession: 'стрімер',
        },
        {
            name: 'Артем',
            age: 19,
            profession: 'розробник',
        },
        {
            name: 'Джон',
            age: 54,
            profession: 'розробник'
        }
    ];
    workers.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    console.log('Всі розробники в масиву: ', workers.filter(worker => worker.profession === 'розробник').map(worker => worker.name).join(','));
    workers = workers.filter(worker => worker.age > 30);
    
    workers.push({
        name: 'Марк',
        age: 53,
        profession: 'актор',
    });
    console.log(workers);
}

buttons[2].addEventListener('click', workersArray);

// Task 4.
function studentsArray() {
    let students = [
        {
            name: 'Артем',
            age: 19,
            course: 2,
        },
        {
            name: 'Богдан',
            age: 18,
            course: 1,
        },
        {
            name: 'Олексій',
            age: 21,
            course: 4,
        },
        {
            name: 'Едуардо',
            age: 20,
            course: 3,
        },
        {
            name: 'Ігор',
            age: 53,
            course: 10,
        }
    ];
    
    for(let i = 0; i < students.length; i++) {
        if(students[i].name === 'Олексій') {
            students.splice(i, 1);
            break;
        }
    }
    
    students.push({
        name: 'Денис',
        age: 19,
        course: 2,
    });

    students.sort((a, b) => b.age - a.age);
    
    console.log(students);
    console.log(students.find(student => student.course === 3));
}

buttons[3].addEventListener('click', studentsArray);

// Task 5.
function numbersArray() {
    let numbers = [1, 2, 3, 4, 5, 19230];
    numbers = numbers.map(num => num * num);

    const even = numbers.filter(num => num % 2 === 0);
    console.log(even);

    const sum = numbers.reduce((sum, num) => sum + num, 0);
    console.log(sum);

    let moreNumbers = [6, 7, 8, 9, 100];
    numbers = numbers.concat(moreNumbers);

    numbers.splice(0, 3);
    console.log(numbers);
}

buttons[4].addEventListener('click', numbersArray);

// Task 6.
function libraryManagement() {
    const books = [
        {
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          genre: "Classic",
          pages: 281,
          isAvailable: true
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Dystopian",
          pages: 328,
          isAvailable: false
        },
        {
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          genre: "Classic",
          pages: 180,
          isAvailable: true
        },
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          genre: "Fantasy",
          pages: 310,
          isAvailable: true
        },
        {
          title: "Pride and Prejudice",
          author: "Jane Austen",
          genre: "Romance",
          pages: 279,
          isAvailable: false
        }
    ];
    
    const addBook = (title, author, genre, pages) => {
        books.push({
            title,
            author,
            genre,
            pages,
            isAvailable: true,
        });
    };
    
    const removeBook = title => {
        const index = books.map(book => book.title).indexOf(title);
        if(index != -1) {
            books.splice(index, 1);
        }
    };

    const findBooksByAuthor = author => {
        return books.filter(book => book.author === author);
    };
    
    const toggleBookAvailability = (title, isBorrowed) => {
        for(const book of books) {
            if(book.title === title) {
                book.isAvailable = !isBorrowed;
                break;
            }
        }
    };
    
    const sortBooksByPages = () => {
        books.sort((a, b) => a.pages - b.pages);
    };
    
    const getBooksStatistics = () => {
        return {
            booksAmount: books.length,
            booksAvailable: books.filter(book => book.isAvailable).length,
            booksBorrowed: books.filter(book => !book.isAvailable).length,
            pagesAverage: Math.round(books.reduce((sum, book) => sum + book.pages, 0) / books.length),
        };
    };
    
    console.log([...books]);
    sortBooksByPages();
    console.log(books);
    console.log(getBooksStatistics());
}

buttons[5].addEventListener('click', libraryManagement);

// Task 7.
function studentObject() {
    const student = {
        name: 'Artem',
        age: 19,
        course: 2,
    };
    
    student.subjects = [
        'Python/C#',
        'Web',
        'UI/UX'
    ];
    
    delete student.age;
    
    console.log(student);
}

buttons[6].addEventListener('click', studentObject);