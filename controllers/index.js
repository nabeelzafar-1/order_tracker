// ------- Service Selector ------- //

const BASE_PATH = global.PATHS.controllers;

module.exports = {
    /**
     * @param servicePath: Ex. 'Twillio.Lookup'
     */
    get(controllerPath) {
        controllerPath = controllerPath.replace(/\./g, '/');
        return require(`${BASE_PATH}/${controllerPath}`);
    },
};