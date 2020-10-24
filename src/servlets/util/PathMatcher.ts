/**
 * @module PathMatcher
 * @descriptionn 路径匹配器
 */
import * as matcher from "path-to-regexp";

export interface MatchResult {
  params: object
}

export default class PathMatcher {
  /**
   * 匹配传入规则与路径
   * @param pattern 规则
   * @param path 路径
   */
  match(pattern: string, path: string): boolean {
    return this.matchPattern(pattern, path) !== null;
  }

  /**
   * 匹配传入规则与路径，并且返回匹配结果信息，
   * 如果匹配失败，则返回 null
   * @param pattern 规则
   * @param path 路径
   */
  matchPattern(pattern: string, path: string): MatchResult {
    pattern = pattern.replace('**', '(.*)');
    return matcher.match(pattern)(path) as MatchResult;
  }
}