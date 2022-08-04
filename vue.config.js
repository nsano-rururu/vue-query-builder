module.exports = {
    runtimeCompiler: true,
    chainWebpack: config => {
        config.resolve.alias.set('vue', '@vue/compat');
    
        config.module
        .rule('vue')
        .use('vue-loader')
        .tap(options => ({
            ...options,
            compilerOptions: {
            compatConfig: {
                MODE: 2
            }
            }
        }));
    }
}