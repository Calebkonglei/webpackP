var path=require('path');
var HtmlwebpackPlugin=require('html-webpack-plugin');

//定义文件夹路径
var ROOT_PATH=path.resolve(__dirname);
var APP_PATH=path.resolve(ROOT_PATH,'app');
var BULID_PATH=path.resolve(ROOT_PATH,'bulid');

module.exports={
	entry:APP_PATH,
    output:{
    	path:BULID_PATH,
    		filename:'bundle.js'
    },
    devtool:'eval-source-map',
    //添加插件，会自动生成一个html文件
    plugins:[
     new HtmlwebpackPlugin({
     	title:'hello world app'
     })
    ],
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        proxy:{
            '/api/*':{
                target:'http://localhost:5000',
                secure:false
            }
        }
    },
    module:{
        loaders:[
         {
            test:/\.scss$/,
            loaders:['style','css','sass'],
            include:APP_PATH
         },
         {
            test:/\.(png|jpg)$/,
            loader:'url?limit=40000',

         },
         {
            test:/\.jsx?$/,
            loader:'babel',
            include:APP_PATH,
            query:{
                presets:['es2015','react']
            }
         }                  
        ],
        perLoaders:[
         {
           test:/\.jsx?$/,
           include:APP_PATH,
           loader:'jshint-loader'
        }]
    },
    jshint:{
    "esnext":true
   }
}

