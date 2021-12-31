/*******************************************************
* Copyright (C) 2020 Vedant Upmanyue and Viraj Patel maqigy@gmail.com
* 
* This file is part of project.
* 
* project can not be copied and/or distributed without the express
* permission of Vedant Upmanyue and Viraj Patel
*******************************************************/

class className {
    constructor (x, y, r, g, b, sizeX, sizeY=sizeX) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
    update() {
        
    }
}

class Array2D {
    constructor (p1 = 8, p2 = 8, p3 = null) {
        this.initFill = p3;
        this.p1 = p1;
        if (Array.isArray(this.p1)) {
            this.array = p1;
            this.sizeX = this.array.length;
            this.sizeY = this.array[0].length;
        }
        else {
            this.sizeX = p1;
            this.sizeY = p2;
            this.array = [];
            for (let y = 0; y < this.sizeY; y++) {
                this.array.push([]);
                for (let x = 0; x < this.sizeX; x++) {
                    this.array[y].push(this.initFill);
                }
            }
        }
    }

    // Indexes into the array with x and y and returns the values. Optional replace parameter - if used, it returns the values before replacement.
    index(indexes, replace) {
        let values = [];
        for (let coord = 0; coord < indexes.length; coord++) {
            try {
                values.push(this.array[indexes[coord].y][indexes[coord].x]);
                if (replace) {
                    this.array[indexes[coord].y][indexes[coord].x] = replace;
                }
            }
            catch (err) {
                console.log("array2d -", err);
            }
        }
        return values;
    }

    // Finds a specific value in the array and returns a 2d array of their indexes. Optional replace parameter.
    find(val, replace = false) {
        let indexes = [];
        for (let y = 0; y < this.array.length; y++) {
            for (let x = 0; x < this.array[y].length; x++) {
                if (this.array[y][x] === val) {
                    indexes.push({x: x, y: y});
                }
            }
        }

        if (replace) {
            for (let coordinate = 0; coordinate < indexes.length; coordinate++) {
                this.index(indexes[coordinate].x, indexes[coordinate].y, replace);
            }
        }

        return indexes;
    }

    // Nicely prints the array to the console.
    tabulate() {
        console.table(this.array);
    }

    // Counts how many of a value there are in the 2d array.
    count(value) {
        let counter = 0;
        if (value) {
            counter = this.find(value).length;
        }
        else {
            for (let y = 0; y < this.array.length; y++) {
                counter += this.array[y].length;
            }
        }
        return counter;
    }

    // Returns true/false if a value is present in the 2d array.
    includes(value) {
        return this.find(value).length != 0;
    }

    shuffle() {
        // Fisher-Yates shuffle from https://javascript.info/task/shuffle
        // Iterate backwards through the array and swap with a random one before it
        
        // Stack overflow I Hate Lucy https://stackoverflow.com/a/13756775
        let copy = this
        var array = copy.array;

        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        
            // Swap elements array[i] and array[j]
            [array[i], array[j]] = [array[j], array[i]];
        }

        // Shuffle the items of each y in the 2d array
        for (let y = 0; y < array.length; y++) {
            for (let i = array[y].length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            
                // Swap elements array[i] and array[j]
                [array[y][i], array[y][j]] = [array[y][j], array[y][i]];
            }
        }

        return copy;
    }

    shuffled() {
        // Fisher-Yates shuffle from https://javascript.info/task/shuffle
        // Iterate backwards through the array and swap with a random one before it
        
        // Stack overflow I Hate Lucy https://stackoverflow.com/a/13756775
        let copy = this.copy()
        var array = copy.array;

        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        
            // Swap elements array[i] and array[j]
            [array[i], array[j]] = [array[j], array[i]];
        }

        // Shuffle the items of each y in the 2d array
        for (let y = 0; y < array.length; y++) {
            for (let i = array[y].length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            
                // Swap elements array[i] and array[j]
                [array[y][i], array[y][j]] = [array[y][j], array[y][i]];
            }
        }
        
        return copy;
    }

    // Returns a copy of the instance rather than a reference.
    copy() {
        let arrayCopy = [];
        for (let row = 0; row < this.array.length; row++) {
            arrayCopy.push(JSON.parse(JSON.stringify(this.array[row])))
        }
        return new Array2D(arrayCopy);
    }

    // Executes the function in parameter for every index in the 2d array.
    // Function params (this, row, col)
    loop(action) {
        console.log(action)
        
        for (let row = 0; row < this.array.length; row++) {
            for (let col = 0; col < this.array[row].length; col++) {
                action(this, row, col);
            }
        }
    }

    // Returns the length of the 2d array based on parameters.
    // ignoreInitFill - bool determining whether to count the value if it is the initial fill.
    // direction - "row" or "col".
    // n - the index of which row/col to return the length of.
    length(ignoreInitFill = false, direction, n = 0) {
        if (direction == "row") {
            if (ignoreInitFill) {
                let counter = 0;
                for (let col = 0; col < this.array[n].length; col++) {
                    if (this.array[n][col] != this.initFill) {
                        counter += 1;
                    }
                }
                return counter;
            }
            else {
                return this.array[n].length;
            }
        }
        else if (direction == "col") {
            if (ignoreInitFill) {
                let counter = 0;
                for (let row = 0; row < this.array.length; row++) {
                    if (this.array[row][n] != this.initFill) {
                        counter += 1;
                    }
                }
                return counter;
            }
            else {
                return this.array.length;
            }
        }
        else {
            if (ignoreInitFill) {
                let counter = 0;
                for (let row = 0; row < this.array.length; row++) {
                    for (let col = 0; col < this.array[row].length; col++) {
                        if (this.array[row][col] != this.initFill) {
                            counter += 1.;
                        }
                    }
                }
                return counter;
            }
            else {
                let counter = 0;
                for (let row = 0; row < this.array.length; row++) {
                    for (let cl = 0; col < this.array[row].length; col++) {
                        counter += 1;
                    }
                }
                return counter;
            }
        }
    }
}