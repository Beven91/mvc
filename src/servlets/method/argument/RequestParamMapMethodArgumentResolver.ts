/**
 * @module RequestParamMapMethodArgumentResolver
 * @description urlencode参数解析器
 */
import ServletContext from '../../http/ServletContext';
import MethodParameter from "../../../interface/MethodParameter";
import HandlerMethodArgumentResolver from "./HandlerMethodArgumentResolver";
import MessageConverter from '../../http/converts/MessageConverter';

export default class RequestParamMapMethodArgumentResolver implements HandlerMethodArgumentResolver {

  supportsParameter(paramater: MethodParameter, servletContext: ServletContext) {
    return paramater.paramType === 'query';
  }

  async resolveArgument(parameter: MethodParameter, servletContext: ServletContext): Promise<any> {
    const { request } = servletContext;
    const name = parameter.value;
    const query = request.query;
    const body = await this.resolveBody(servletContext);
    return name in query ? query[name] : body[name];
  }

  resolveBody(servletContext: ServletContext) {
    const { request } = servletContext;
    const mediaType = request.mediaType.name;
    switch (mediaType) {
      case 'multipart/form-data':
      case 'application/x-www-form-urlencoded':
        return MessageConverter.read(servletContext);
      default:
        return {};
    }
  }
}