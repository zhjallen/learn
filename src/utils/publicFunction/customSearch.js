// add zhaohj 20160923
/**
 * 自定义查询（后端由白尚兵提供）
 * @export
 * @param {any} column 列名
 * @param {any} columnType 数量类型
 * @param {any} operator  like,=
 * @param {any} value 查询的值
 * @returns 一个查询条件对象
 */
export function getSearchCond(column, columnType, operator, value) {
  let searchCond = {
    column: column,
    columnType: columnType,
    operator: operator,
    value: value
  }
  return searchCond
}
/**
 * 自定义查询(后端由苏雷娜提供)生成一个查询对象
 * @export
 * @param {any} columnName 列名
 * @param {any} join 连接方式（and,or)
 * @param {any} query =
 * @param {any} value 查询的值
 * @returns 一个查询条件对象
 */
export function getSearchCon(columnName, join, query, value) {
  let searchCon = {
    column: columnName,
    join: join,
    query: query,
    value: value
  }
  return searchCon
}
/**
 * 自定义根据权限编号查询具有一定权限员工对象
 * @export
 * @param {any} pno 权限编号
 * @param {any} query 连接方式
 * @returns 查询条件
 */
export function getPrivCond(pno, query) {
  let pc = {
    pno: pno,
    query: query
  }
  return pc
}
/**
 * 自定义排序 后端由白尚并提供
 * @export
 * @param {any} column 排序列名
 * @param {any} columnType 数据类型 取值范围 = ['STRING', 'NUM', 'DATE']
 * @param {any} order  升序排序, 升序or降序, 取值范围 = ['ASC', 'DESC']
 * @returns 一个排序对象
 */
export function sorter(column, columnType, order) {
  let sorter = {
    column: column,
    columnType: columnType,
    order: order
  }
  return sorter
}
/**
 * 生成一个查询条件（sql拼接，由白尚兵提供）
 * @export
 * @param {any} join 连接方式 [and,or]
 * @param {any} column 列名
 * @param {any} query 查询方式 [like,=,...]
 * @param {any} value 查询值
 * @param {any} isNum 是否是数字
 * @returns
 */
export function searchSql(join, column, query, value, isNum) {
  var querySql = new Array();
  querySql.push(join, ' ', column, ' ', query)
  if (isNum) { // 是数字
    querySql.push(value)
  } else {
    if (query === 'like') {

      querySql.push(' ', '\'%', value, '%\'')
    } else {
      querySql.push(' ', '\'', value, '\'')
    }
  }
  return querySql.join('')
}



