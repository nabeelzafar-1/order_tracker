// ------- Service Selector ------- //

const BASE_PATH = global.PATHS.queries;

module.exports = {
  /**
   * @param servicePath: Ex. 'Twillio.Lookup'
   */
  get(queryPath) {
    queryPath = queryPath.replace(/\./g, "/");
    return require(`${BASE_PATH}/${queryPath}`);
  },
};
