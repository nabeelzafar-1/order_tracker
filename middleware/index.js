// ------- Service Selector ------- //

const BASE_PATH = global.PATHS.middlewares;

module.exports = {
    /**
     * @param servicePath: Ex. 'Twillio.Lookup'
     */
    get(middlewarePath) {
        middlewarePath = middlewarePath.replace(/\./g, '/');
        return require(`${BASE_PATH}/${middlewarePath}`);
    },
};