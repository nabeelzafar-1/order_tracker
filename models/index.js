// ------- Service Selector ------- //

const BASE_PATH = (__dirname);

module.exports = {
    /**
     * @param servicePath: Ex. 'Twillio.Lookup'
     */
    get(modelPath) {
        modelPath = modelPath.replace(/\./g, '/');
        return require(`${BASE_PATH}/${modelPath}`);
    },
};