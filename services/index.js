// ------- Service Selector ------- //

const BASE_PATH = global.PATHS.services;

module.exports = {
    /**
     * @param servicePath: Ex. 'Twillio.Lookup'
     */
    get(servicePath) {
        servicePath = servicePath.replace(/\./g, '/');
        return require(`${BASE_PATH}/${servicePath}`);
    },
};