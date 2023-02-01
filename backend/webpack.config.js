module.exports = {
    resolve:{
        fallback:{
            "util": require.resolve("util/") ,
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "url": require.resolve("url/")
        }
    }
};