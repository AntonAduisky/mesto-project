// webpack.config.js
const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключить плагин
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); // подключить плагин 
// подключите к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: {
        main: './src/components/index.js'
        // указали первое место, куда заглянет webpack, — файл index.js в папке src 
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
        // указали в какой файл будет собираться весь js и дали ему имя 
        // переписали точку выхода, используя утилиту path 
    },
    mode: 'development', // добавили режим разработчика
    devServer: {
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

        open: true // сайт будет открываться сам при запуске npm run dev
    },
    module: {
        //если тебе попадётся файл с расширением .js, сначала отдай этот файл модулю babel-loader,
        // а затем добавляй в сборку. Но не применяй это правило к пакетам, скачанным из NPM, которые лежат в папке node_modules
        rules: [ // rules — это массив правил
            // добавим в него объект правил для бабеля
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: 'babel-loader',
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            },
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                // применять это правило только к CSS-файлам
                test: /\.css$/,
                // при обработке этих файлов нужно использовать
                // MiniCssExtractPlugin.loader и css-loader
                use: [MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        // добавьте объект options
                        options: {
                            importLoaders: 1
                        }
                    },
                    // Добавьте postcss-loader
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(), // использовали плагин
        new MiniCssExtractPlugin() // подключение плагина для объединения файлов
    ]
};

// module.exports — это синтаксис экспорта в Node.js 