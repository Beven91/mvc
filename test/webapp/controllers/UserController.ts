import { RequestMapping, PostMapping, ExceptionHandler, ApiOperation, GetMapping, RestController } from '../../../src/index';
import ApiImplicitParams from '../../../src/swagger/annotations/ApiImplicitParams';
import RequestParam from '../../../src/servlets/annotations/params/RequestParam';
import UserInfo, { score } from '../models/UserInfo';

@RequestMapping('/user')
@RestController
export default class UserController {

  private user = null

  @ApiOperation({ value: '新增用户' })
  @PostMapping('/addUser')
  addUser() {
    return { "name":"ok" }
  }

  @ApiOperation({ value: '设置用户信息' })
  @ApiImplicitParams([
    RequestParam('name')
  ])
  @PostMapping('/setUser')
  setUser(name:string) {
    this.user = {
      name: name
    }
    return this.user;
  }

  @ApiOperation({ value: '获取用户信息' })
  @GetMapping('/getUser')
  getUser() {
    return this.user || {
      score: score,
      desc: UserInfo.desc,
      name: '李白'
    };
  }

  @ApiOperation({ value: '异常测试' })
  @PostMapping('/business')
  doBusiness() {
    throw new Error('出错啦');
  }

  @ExceptionHandler
  handleException(ex) {
    console.log(UserInfo);
    return { code: -99, message: ex.message };
  }

}