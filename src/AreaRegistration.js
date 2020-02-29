/**
 * 名称：mvc域支持(Area)
 * 描述：提供一个registerAllAreas函数来注册指定目录下所有的域(Area)
 */
const path = require('path');
const fs = require('fs');
const AreaRegistrationContext = require('./AreaRegistrationContext');
const ControllerFactory = require('./ControllerFactory');
const RouteCollection = require('./RouteCollection');
const logger = console;

class AreaRegistration {

  /**
   * 获取指定目录下所有area目录
   * @static
   * @param {String} areasRoot 指定所有域(Area)的存放目录
   * @memberof AreaRegistration
   */
  static getAllAreaRegistrations(areasRoot) {
    const registrations = [];
    if (!fs.existsSync(areasRoot)) {
      return [];
    }
    fs.readdirSync(areasRoot).forEach((name) => {
      const file = path.resolve(areasRoot, name, 'areaRegistration.js');
      if (!fs.existsSync(file)) {
        return;
      }
      const maybeRegistration = require(file);
      if (maybeRegistration && maybeRegistration.prototype instanceof AreaRegistration) {
        maybeRegistration.areaDir = path.dirname(file);
        registrations.push(maybeRegistration);
      } else {
        logger.warn(`${file} the module  exports is not a AreaRegistration ?\n check code: module.exports = XXXAreaRegistration ?`);
      }
    })
    return registrations;
  }

  /**
   * 注册指定目录下
   * @static
   * @param {String} areasRoot 指定所有域(Area)的存放目录
   * @memberof AreaRegistration
   */
  static registerAllAreas(areasRoot) {
    const registrations = this.getAllAreaRegistrations(areasRoot);
    registrations.forEach((Registration) => {
      const registration = new Registration();
      const controllerDir = path.join(Registration.areaDir, 'controllers');
      const registrationContext = new AreaRegistrationContext(registration.areaName);
      logger.info('Register area:');
      logger.info('AreaName: ' + registration.areaName);
      logger.info('AreaDir: ' + Registration.areaDir);
      this.registerAreaViews(path.join(Registration.areaDir, 'views'))
      registration.registerArea(registrationContext);
      ControllerFactory.registerAreaControllers(registration.areaName, controllerDir);
    })
  }

  /**
   * 注册MVC域(Area)视图引擎搜索目录
   * @static
   * @param {String} areasRoot 指定所有域(Area)的存放目录 
   * @memberof AreaRegistration
   */
  static registerAreaViews(areasRoot) {
    const { app } = RouteCollection;
    const views = app.get('views') || [];
    views.concat(areasRoot);
    app.set('views', views);
  }

  /**
   * 获取域名称
   * @readonly
   * @memberof AreaRegistration
   */
  get areaName() {
    throw new Error('please implenments areaName');
  }

  /**
   * 注册(Area)域
   * @param {RegistrationContext}
   * @memberof AreaRegistration
   */
  registerArea() {
    throw new Error('please implenments registerArea');
  }
}

module.exports = AreaRegistration;