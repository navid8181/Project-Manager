 module.exports =  class Application {
    #express = require('express');
    #app = this.#express();
    constructor(PORT, DB_URL) {

        this.#configDataBase(DB_URL);
        this.#configApplication();
        this.#createServer(PORT);
        this.#createRoute();
        this.#errorHandler();
    }


    #configApplication() {
        const path = require('path');
        this.#app.use(this.#express.json());

        this.#app.use(this.#express.urlencoded({extended: true}));

        this.#app.use(this.#express.static(path.join(__dirname, '..', 'public')));
    }

    #createServer(PORT) {

        const http = require('http');

        const serverExpress = http.createServer(this.#app);
        serverExpress.listen(PORT, () => {
            console.log(`server run -> http://localhost:${PORT}`);
        })

    }

    async #configDataBase(DB_URL) {
        const mongoose = require('mongoose');

        try {
            const result =  mongoose.connect(DB_URL);
            console.log("connect to db is Successful");
        } catch (error) {
            throw error;
        }
       

    }

    #errorHandler() {

        this.#app.use((req, res, nex) => {

            return res.status(400).json({statusCode: 400, succeed: false, message: "!!صفحه ی مورد نظر یافت نشد"});

        });

        this.#app.use((err, req, res, nex) => {

            const status = err ?. status || 500;

            const message = err ?. message || "internal server error";
            return res.status(status).json({statusCode, succeed: false, message});

        })
    }

    #createRoute() {

        this.#app.get('/', (req, res, nex) => {
            res.json({
                message: "this is a express app"
            })
        })
    }
}
